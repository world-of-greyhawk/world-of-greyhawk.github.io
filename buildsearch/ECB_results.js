// Functions for the build search results page.

// The most classes this search expects in a build.
var MAX_CLASS = 3;
// Class "names" that have special meanings:
//     any, none, selected, used


// Detector for valid races.
var RaceRE = /^(?:dwarf|elf|gnome|halfling|half-elf|half-orc|human)\??$/;


// Converts its paramter to a number, but defaults to 0
// if the result is not a finite number.
function FiniteNumber(num_str)
{
    if ( isFinite(num_str) )
        return Number(num_str);
    return 0;
}


// Checks to see if item matches an element of list (an array).
function IsInList(item, list)
{
    // Iterate through the list.
    var index = list ? list.length : 0;
    while ( index-- > 0 )
        if ( item == list[index] )
            return true;

    // Not found.
    return false;
}


// Comparison function for sorting builds by author.
function AuthorSorter(a, b)
{
    var keyA = a.author.toLowerCase();
    var keyB = b.author.toLowerCase();

    // Primary sort by author.
    if ( keyA < keyB )
        return -2;
    if ( keyA > keyB )
        return 2;

    // Secondary sort by topicNum (as strings).
    if ( a.topicNum < b.topicNum )
        return -1;
    if ( a.topicNum > b.topicNum )
        return 1;

    return 0;
}


// Comparison function for sorting builds by classes.
function ClassSorter(a, b)
{
    var keyA = null;       var keyB = null;

    // Primary sort by class (independent of order within a build).
    keyA = new Array();    keyB = new Array();
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        keyA.push(a["class" + i].toLowerCase());
        keyB.push(b["class" + i].toLowerCase());
    }
    keyA.sort();           keyB.sort();
    keyA = keyA.join("");  keyB = keyB.join("");
    if ( keyA < keyB )
        return -4;
    if ( keyA > keyB )
        return 4;

    // Secondary sort by class order within a build.
    keyA = "";    keyB = "";
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        keyA += a["class" + i].toLowerCase();
        keyB += b["class" + i].toLowerCase();
    }
    if ( keyA < keyB )
        return -3;
    if ( keyA > keyB )
        return 3;

    // Tertiary sort by level of the classes in the order within a build.
    keyA = 0;    keyB = 0;
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        keyA = 100*keyA + Number(a["level" + i]); // Recall: "9" > "10".
        keyB = 100*keyB + Number(b["level" + i]); // Recall: "9" > "10".
    }
    if ( keyA < keyB )
        return -2;
    if ( keyA > keyB )
        return 2;

    // Final sort by topicNum (as strings).
    if ( a.topicNum < b.topicNum )
        return -1;
    if ( a.topicNum > b.topicNum )
        return 1;
    return 0;
}


// Comparison function for sorting builds by class levels.
function ClassLevelSorter(a, b)
{
    var keyA = null;       var keyB = null;

    // Primary sorts: classes in order by level.
    keyA = new Array();    keyB = new Array();
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        keyA.push( (99 - Number(a["level" + i])) + // Need fixed length and decreasing.
                   a["class" + i].toLowerCase());
        keyB.push( (99 - Number(b["level" + i])) + // Need fixed length and decreasing.
                   b["class" + i].toLowerCase());
    }
    keyA.sort();                           keyB.sort();
    for ( var i = 0; i < MAX_CLASS; i++ )
    {
        // Priority to name of class with (next) most levels.
        var subkeyA = keyA[i].substring(2);
        var subkeyB = keyB[i].substring(2);
        if ( subkeyA < subkeyB )
            return -(2 + 2*MAX_CLASS - 2*i);
        if ( subkeyA > subkeyB )
            return   2 + 2*MAX_CLASS - 2*i;

        // Next comes the level of that class.
        var subkeyA = keyA[i].substring(0,2);
        var subkeyB = keyB[i].substring(0,2);
        if ( subkeyA < subkeyB )
            return -(1 + 2*MAX_CLASS - 2*i);
        if ( subkeyA > subkeyB )
            return   1 + 2*MAX_CLASS - 2*i;
    }

    // Secondary sort by class order within a build.
    keyA = "";    keyB = "";
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        keyA += a["class" + i].toLowerCase();
        keyB += b["class" + i].toLowerCase();
    }
    if ( keyA < keyB )
        return -2;
    if ( keyA > keyB )
        return 2;

    // Final sort by topicNum (as strings).
    if ( a.topicNum < b.topicNum )
        return -1;
    if ( a.topicNum > b.topicNum )
        return 1;
    return 0;
}


// Comparison function for sorting builds by class levels.
/* -- Replaced, but kept in case it might be useful again.
function OldClassLevelSorter(a, b)
{
    var keyA = null;       var keyB = null;

    // Primary sort by class (independent of order within a build).
    keyA = new Array();    keyB = new Array();
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        keyA.push(a["class" + i].toLowerCase());
        keyB.push(b["class" + i].toLowerCase());
    }
    keyA.sort();           keyB.sort();
    keyA = keyA.join("");  keyB = keyB.join("");
    if ( keyA < keyB )
        return -4;
    if ( keyA > keyB )
        return 4;

    // Secondary sort by levels of the classes (classes in alphabetic order).
    keyA = new Array();    keyB = new Array();
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        keyA.push(a["class" + i].toLowerCase() +
                  ( 10 + Number(a["level" + i]) )); // Because "9" > "10".
        keyB.push(b["class" + i].toLowerCase() +
                  ( 10 + Number(b["level" + i]) )); // Because "9" > "10".
    }
    keyA.sort();          keyB.sort();
    keyA = keyA.join(""); keyB = keyB.join("");
    if ( keyA < keyB )
        return -3;
    if ( keyA > keyB )
        return 3;

    // Tertiary sort by class order within a build.
    keyA = "";    keyB = "";
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        keyA += a["class" + i].toLowerCase();
        keyB += b["class" + i].toLowerCase();
    }
    if ( keyA < keyB )
        return -2;
    if ( keyA > keyB )
        return 2;

    // Final sort by topicNum (as strings).
    if ( a.topicNum < b.topicNum )
        return -1;
    if ( a.topicNum > b.topicNum )
        return 1;
    return 0;
}
*/


// Comparison function for sorting builds by topic number.
function TopicSorter(a, b)
{
    // Remember to treat topic numbers as strings!
    // (Non-digit characters are used when there are multiple builds in a topic).
    if ( a.topicNum < b.topicNum )
        return -1;
    if ( a.topicNum > b.topicNum )
        return 1;
    return 0;
}


// Tests a build to make sure it is not "deleted".
// This will also handle any standardization of build values.
// Returns true if the build is acceptable.
function ValidBuild(build)
{
    return ("" != build.author);
}


// Tests a build to make sure its race matches one in the provided list.
// Returns true if the build is acceptable.
function MatchRace(build, race_list)
{
    // Standard check.
    if ( IsInList(build.race, race_list) )
    	return true;

    // See if we should check unknown races.
    if ( IsInList("unknown", race_list)  &&  !RaceRE.test(build.race) )
        return true;

    // The build did not match race_list.
    return false;
}


// Checks a class and level to a class criterion.
// Returns true if this is a match.
function MatchOneClass(class_name, level, min_level, max_level, goal_class, class_selection)
{
    // If the search is for a non-existent class:
    if ( "none" == goal_class )
        return ("" == class_name);
    // If the build's class does not exist:
    if ( "" == class_name )
        return (min_level <= 0);

    // Check for a level mismatch.
    if ( level < min_level  ||  max_level < level )
        return false;

    // Check that the class matches.
    if ( "any" == goal_class )
        return true;
    if ( "selected" == goal_class )
        return IsInList(class_name, class_selection);
    return (class_name == goal_class);
}

// Recursive test to see if a build matches our class criteria.
// build, mins, maxs, classes, and class_selection are the criteria.
// crit_num specifies which criterion set to check (first, second, up to MAX_CLASS).
// used[1/2/3] keeps track of which of the build's classes have been used.
function MatchNextClass(build, mins, maxs, classes, class_selection, crit_num, used)
{
    // The idea is that we recurse through the criteria, and at each stage we loop through
    // the build's classes.
    var build_class;
    for ( build_class = 1; build_class <= MAX_CLASS; ++build_class ) {
        // See if the build's class can match the current criterion.
        if ( used[build_class] )
            continue;
        if ( !MatchOneClass(build["class" + build_class], build["level" + build_class],
                            mins[crit_num], maxs[crit_num], classes[crit_num], class_selection) )
            continue;
        // This class slot matches the current criterion.

        if ( crit_num == MAX_CLASS )
            // No more criteria to check. It's a match!
            return true;
        // Try the rest of the criteria.
        used[build_class] = true;
        if ( MatchNextClass(build, mins, maxs, classes, class_selection, crit_num + 1, used) )
        	return true;
        // Failed to match:
        used[build_class] = false;
    }
    
    // Failed to match:
    return false;
}


// Tests a build to make sure its classes match the provided criteria.
// Returns true if the build is acceptable.
function MatchClass(build, mins, maxs, classes, class_selection)
{
    var used = new Array(MAX_CLASS + 1);
    return MatchNextClass(build, mins, maxs, classes, class_selection, 1, used)
}


// Writes build_list to the document.
// Uses Sorter (a function) and grouping to determine how to group results.
// The higher grouping is the more builds get grouped together.
function WriteList(build_list, Sorter, grouping)
{
    // Some original code for linking to the BioWare site:
    //var base_url = "http://nwn.bioware.com/guilds_registry/viewtopic.html?gid=8061&forum=13423&topic=";
    //var url_suffix = "";
    // Replacement code to link to a local cache.
    var base_url = "../builds/data/build";
    var url_suffix = ".html";

    var alternator = true;

    // For a bit of simplicity/efficiency in the loop.
    document.writeln('<div style="display:none">');

    // Iterate through the list.
    for ( var index = 0; index < build_list.length; index++ )
    {
        var build = build_list[index];
        // Split off any trailing '#';
        var split_point  = build.topicNum.indexOf("#");
        var topic_num    = split_point == -1 ? build.topicNum : build.topicNum.substring(0, split_point);
        var topic_suffix = split_point == -1 ? ""             : build.topicNum.substring(split_point);

        if ( index == 0  ||  Sorter(build, build_list[index-1], build) >= grouping )
            document.writeln('</div>\n<div class="build ' +
                ( (alternator ^= true) ? 'even' : 'odd') + '">');
        else
            document.writeln('<br />');

        // Description, linked to the forum topic.
        document.write('<a class="buildlink" href="' + base_url + topic_num +
                       url_suffix + topic_suffix + '" target="BuildWindow">');
        document.write(build.description);
        document.writeln('</a>');

        // Class info.
        document.write('<span class="classinfo">');
        document.write(build.class1 + " " + build.level1);
        for ( var i = 2; i <= MAX_CLASS; i++ )
            if ( build["level" + i] > 0 )
                document.write(" / "+build["class" + i]+" "+build["level" + i]);
        document.writeln('</span>');

        // Race info.
        document.write('<span class="raceinfo">');
        document.write(" (" + build.race + ")");
        document.writeln('</span>');

        // Author info.
        document.write('<span class="authorinfo">');
        document.write(" by " + build.author);
        document.writeln('</span>');
   }
   document.writeln("</div>");
}

// Extracts the raw parameters from the URL, decoding special characters.
// Returns the parameters as a string.
function ParametersFromURL()
{
    // Find the relevant part of the URL.
    var token_index = document.URL.indexOf("?");
    if ( token_index < 0 )
    	return "";
    var url_params = document.URL.substring(token_index + 1);

    // Un-encode spaces.
    url_params = url_params.replace(/\+/g, " ");
    url_params = url_params.replace(/_/g, " ");
    // Safety measure -- legit searches should not have these characters anyway.
    url_params = url_params.replace(/</, "&lt;");
    url_params = url_params.replace(/>/, "&gt;");
    
    return url_params;
}

// Extracts the parameters from the URL, converting them to internal format.
// Returns true if at least one valid parameter was found.
function DecodeURL(mins, maxs, classes, class_selection, race_selection, flags)
{
	var which_class;  // Used inside some case clauses, where variables cannot be declared.
    // Convert the URL parameters into an array of associations.
    var param_list = ParametersFromURL().split("&");
    // Iterate over the array.
    var criteria_found = false;
    var index = param_list.length;
    while ( index-- > 0 )
    {
        // Make sure the association is valid.
        var param = param_list[index].split("=", 2);
        if ( param.length == 2 )
        {
            var valid_param = false;
            // Set the appropriate variable.
            switch ( param[0].substring(0, 3) )
            {
                case "min":
                        which_class = Number(param[0].substring(3));
                        if ( 0 < which_class  &&  which_class <= MAX_CLASS ) {
                            mins[which_class] = FiniteNumber(param[1]);
                            valid_param = true;
                        }
                        break;

                case "max":
                        which_class = Number(param[0].substring(3));
                        if ( 0 < which_class  &&  which_class <= MAX_CLASS ) {
                            maxs[which_class] = FiniteNumber(param[1]);
                            valid_param = true;
                        }
                        break;

                case "cla":
                        which_class = Number(param[0].substring(5));
                        if ( 0 < which_class  &&  which_class <= MAX_CLASS  &&
                             "ss" == param[0].substring(3,5) ) {
                            classes[which_class] = param[1].length > 0 ? param[1] : "none";
                            valid_param = true;
                        }
                        break;

                default: // The non-indexed parameters.
                    valid_param = true;
                    switch ( param[0] )
                    {
                        case "selclass": class_selection.unshift(param[1]);   break;
                        case "selrace" : race_selection.unshift(param[1]);    break;
                        case "sortby":   flags.sortby = param[1];             break;
                        case "allrace":  flags.all_race = param[1].length > 0  &&
                                           param[1].toLowerCase() != "no"      &&
                                           param[1].toLowerCase() != "false"; break;

                        default: valid_param = false;
                    }
            }//switch
            criteria_found = criteria_found || valid_param;
        }//if param.length
    }//while (index)
    
    return criteria_found;
}

// Writes a human-readable interpretaion of the parameters to the document.
function WriteCriteria(mins, maxs, classes, class_selection, race_selection, flags)
{
	var i;
	
    document.write('<p class="criteria">Builds with ');

    // Classes
    for ( i = 1; i <= MAX_CLASS; ++i )
    {
        if ( i == MAX_CLASS )
            document.write("and ");
        if ( "none" == classes[i] )
            document.write( "no class " + i);
        else
        {
            document.write(mins[i] + " to " + maxs[i] + " levels of " + classes[i]);
            // Two valid values for classes[i] need a bit of prettification.
            if ( "any" == classes[i] )
                document.write(" class");
            else if ( "selected" == classes[i] )
                document.write(" classes");
        }
        if ( i < MAX_CLASS )
            document.write(", ");
        else
            document.writeln(".<br />");
    }

    // Class selection
    if ( IsInList("selected", classes) )
    {
        if ( class_selection.length == 0 )
            document.writeln('<span class="warn">No classes were selected.</span><br />');
        else
            document.writeln("The selected classes are: " +
                             class_selection.join(", ") + ".<br />");
    }

    // Races
    if ( flags.all_race  ||  race_selection.length == 0 )
        document.writeln("All races are included.<br />");
    else
        document.writeln("The included races are: " + race_selection.join(", ") + ".<br />");

    // Sort order.
    if ( "" == flags.sortby )
        document.writeln("Builds are not sorted.</p>");
    else
        document.writeln("Builds are sorted by " +
            ("classlevel" == flags.sortby ? "class and level" : flags.sortby) + ".</p>");
}

// Retrieves the (textual) list of builds.
function GetBuildsAsText()
{
    var list_text = "";
    try {
        var list_source = parent.document.getElementById("listsource");
        if ( list_source.contentDocument )
            // Most browsers.
            list_source = list_source.contentDocument.body;
        else
            // Interrupted-Education browsers
            list_source = list_source.Document.body;

        if ( list_source.textContent )
            // Most browsers.
            list_text = list_source.textContent;
        else
            // Idiot-Extraordinaire browsers
            list_text = list_source.outerText;
    }
    catch (e) {
        document.writeln('<p class="error">No database found.</p>');
    }
    
    return list_text;
}

// Performs the actual search of builds.
function DoSearch(mins, maxs, classes, class_selection, race_selection, all_race)
{
	var i, index;
	var match_list = new Array();
	
    // Expand the race list to allow a question mark at the end.
	var race_list = new Array();
    for ( i = 0; i < race_selection.length; ++i ) {
        race_list.push(race_selection[i]);
        race_list.push(race_selection[i] + "?");
    }

    // Loop over the list of known builds.
    var build_list = LoadList(GetBuildsAsText()); // Will always be a valid array.
    for ( index = 0; index < build_list.length; ++index ) {
        var build = build_list[index];

        // Continue with the next build if the current one fails to match our crtieria.
        if ( !ValidBuild(build) )
            continue;
        if ( !all_race )
            if ( !MatchRace(build, race_list) )
                continue;
        if ( !MatchClass(build, mins, maxs, classes, class_selection) )
            continue;

        // We found a match!
        match_list.push(build);
    }

    return match_list;
}

// Writes the list of builds to the document.
function WriteResults(build_list, sortby)
{
    document.writeln('<span class="matches">Matches found: ' +
                      build_list.length + '</span><br />');

    switch ( sortby )
    {
        case "author": build_list.sort(AuthorSorter)
                       WriteList(build_list, AuthorSorter, 2);
                       break;

        case "class": build_list.sort(ClassSorter)
                      WriteList(build_list, ClassSorter, 4);
                      break;

        case "classlevel": build_list.sort(ClassLevelSorter)
                           WriteList(build_list, ClassLevelSorter, 3);
                           break;

        default: WriteList(build_list, TopicSorter, 1);
    }
}

// Parses the URL parameters, performs a search, and writes the results.
function ParseParams()
{
    // The criteria
    var class_selection = new Array();
    var race_selection = new Array();
    var mins = new Array(MAX_CLASS+1);    // 1-based array
    var maxs = new Array(MAX_CLASS+1);    // 1-based array
    var classes = new Array(MAX_CLASS+1); // 1-based array
    var flags = { all_race:false, sortby:"" };

    // Initialize arrays.
    for ( i = 1; i <= MAX_CLASS; i++ )
    {
        mins[i] = 0;
        maxs[i] = 0;
        classes[i] = "none"
    }


    // Get the search parameters.
    if ( !DecodeURL(mins, maxs, classes, class_selection, race_selection, flags) ) {
        // No query found.
        alert("No valid query supplied.");
        return document.writeln('<p class="error">No valid query supplied.</p>');
	}
    WriteCriteria(mins, maxs, classes, class_selection, race_selection, flags);

    // Search
    var build_list = DoSearch(mins, maxs, classes, class_selection, race_selection, flags.all_race);
    // Display the results.
    WriteResults(build_list, flags.sortby)
}

