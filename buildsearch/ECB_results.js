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


// Checks to see if:
// 1) criterion is "any" or class_name is in class_list, and
// 2) level is in the closed interval [min_level, max_level].
function IsMultiMatch(class_name, level, criterion, min_level, max_level, class_list)
{
    return min_level <= level  &&  level <= max_level  &&
           ( criterion == "any"  ||  IsInList(class_name, class_list) );
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


// Constructs an object, to be used in a filter array, that is associated
// with build. This is basically a light-weight clone of build or a true
// clone of another filter.
function FilterRec(build)
{
    this.topicNum = build.topicNum;
    for ( var i = 1; i <= MAX_CLASS; i++ )
    {
        this["class" + i] = build["class" + i];
        this["level" + i] = build["level" + i];
    }
}


// Removes the builds of build_list that are "deleted" and standardizes
// "unknown" race names. Returns the resulting array.
// The original array is unchanged.
function ValidBuilds(build_list)
{
    var new_list = new Array();

    // Iterate through build_list.
    var index = build_list.length;
    while ( index-- > 0 )
    {
        var build = build_list[index];

        // Skip "deleted" builds.
        if ( "" != build.author )
        {
            // Standardize missing races.
            if ( build.race != "any"  &&  !RaceRE.test(build.race) )
                build.race = "unknown";

            new_list.push(build);
        }
    }

    return new_list;
}


// Removes the builds of build_list that are "deleted" and whose race
// does not match the one in race_list. Returns the resulting array.
// The original array is unchanged.
function RaceBuilds(build_list, race_list)
{
    var new_list = new Array();

    // Determine if unrecognized races are to be included.
    var check_unknown = IsInList("unknown", race_list)

    // Iterate through build_list.
    var index = build_list.length;
    while ( index-- > 0 )
    {
        var build = build_list[index];

        // Skip "deleted" builds.
        if ( "" != build.author )
        {
            // See if the race matches.
            if ( check_unknown  &&  !RaceRE.test(build.race) )
            {
                if ( build.race != "any" )
                    build.race = "unknown";
                new_list.push(build);
            }
            else if ( IsInList(build.race, race_list) )
                new_list.push(build);
        }
    }

    return new_list;
}


// Returns a filter list (array) built from list_filter enforcing
// class class_name has between min_level and max_level levels.
function ClassNameFilter(list_filter, class_name, min_level, max_level)
{
    var new_list = new Array();

    // Iterate through list_filter;
    var index = list_filter.length;
    while ( index-- > 0 )
    {
        var filter = list_filter[index];

        // Check for this class being present.
        var position = MAX_CLASS + 1;
        while ( --position > 0 )
            if ( class_name == filter["class" + position] )
                break;

        // If we found the class.
        if ( position > 0 )
        {
            if ( min_level <= filter["level" + position]  &&
                 filter["level" + position] <= max_level )
            {
                // We have a match!
                var new_filter = new FilterRec(filter);
                new_filter["class" + position] = "used";
                new_list.push(new_filter);
            }
        }
        // Else if no levels is a possibility.
        else if ( min_level == 0 )
        {
            var new_filter = new FilterRec(filter);
            new_list.push(new_filter);
        }
    }//while (index>0)

    return new_list;
}


// Returns a filter list (array) built from list_filter enforcing the
// "selected" and "any" criteria (if any) listed in classes (with min/max
// level criteria supplied in mins amd maxs). The allowed classes for
// "selected" are those in class_list.
function ClassMultiFilter(list_filter, classes, mins, maxs, class_list)
{
    var criterion = "";
    var min_level = 0;
    var max_level = 0;

    // Determine which of the MAX_CLASS criteria are "any"/"selected".
    for ( var i = 1; i <= MAX_CLASS; i++ )
        if ( "any" == classes[i]  ||  "selected" == classes[i] )
        {
            if ( criterion != "" )
                // More than one "any"/"selected"; hand off to the 2-criteria handler.
                return ClassMultiFilter2(list_filter, classes, mins, maxs, class_list);
            else
            {
                criterion = classes[i];
                min_level = mins[i];
                max_level = maxs[i];
            }
        }
    // Do nothing if no "any"/"selected" criterion found.
    if ( criterion == "" )
        return list_filter;

    // Iterate through list_filter.
    var index = list_filter.length;
    while ( index-- > 0 )
    {
        var filter = list_filter[index];
        var class_tracker = new Object();  // For tracking which classes have more than zero levels.
        var found = 0;

        // Look for a potential match.
        for ( var i = 1; i <= MAX_CLASS  &&  0 == found; i++ )
        {
            var class_name = filter["class" + i];

            // Ignore used and non-existent class slots.
            if ( class_name  &&  class_name != "used"  &&  class_name != "" )
            {
                // Track this.
                class_tracker[class_name] = true;
                // Try to match this against the criterion.
                if ( IsMultiMatch(class_name, filter["level" + i],
                         criterion, min_level, max_level, class_list) )
                    // A match!
                    found = i;
            }
        }
        // Maybe try to match having zero levels of an acceptable class?
        if ( 0 == found  &&  min_level == 0 )
        {
            if ( criterion == "selected" )
            {
                // Look for an unused class from the list.
                var i = class_list.length;
                while ( i-- > 0  &&  0 == found )
                    if ( !class_tracker[class_list[i]] )
                        found = i;
            }
            else // criterion == "any"
                // Look for an unused class slot.
                for ( var i = 1; i <= MAX_CLASS  &&  0 == found; i++ )
                    if ( filter["class" + i] == "" )
                        found = i;
        }

        // Did we find a match of some sort?
        if ( found > 0 )
        {
            var new_filter = new FilterRec(filter);
            new_filter["class" + found] = "used";
            new_list.push(new_filter);
        }
    }//while (index)

    return new_list;
}


/// STILL NEED:
function ClassMultiFilter2(list_filter, classes, mins, maxs, class_list);


// Returns a filter list (array) whose elements correspond to those builds
// in build_list that have at most class_limit classes.
// These elements will be marked as having consumed an appropriate
// number of classes within this search algorithm.
function ClassNumFilter(build_list, class_limit)
{
    var filter_array = new Array();

    // Sanity/efficiency checks
    if ( class_limit < 1 )
        // Cannot match this criteria.
        return filter_array;
    if ( class_limit >= MAX_CLASS )
    {
        // All builds match this; no classes consumed.
        var index = build_list.length;
        while ( index-- > 0 )
            filter_array.push(new FilterRec(build_list[index]));
        return filter_array;
    }

    // Determine which field to check.
    // (In build_list, class<x> == "" implies class<x+1> == "".)
    var prop_name = "class" + (class_limit + 1);

    // Iterate through build_list.

    var index = build_list.length;
    while ( index-- > 0 )
        // Make sure there are few enough classes.
        if ( build_list[index][prop_name] == "" )
        {
            var filter = new FilterRec(build_list[index]);
            // Mark used classes.
            for ( var i = class_limit + 1; i <= MAX_CLASS; i++ )
                filter["class" + i] = "used";
            filter_array.push(filter);
        }

    return filter_array;
}


// Produces a subarray of list that contains only the elements referenced in
// filters. In this case, "referencing" means "having the same topicNum field.
// The supplied filters and list will be sorted in the process.
function ApplyFilter(filters, list)
{
    var new_list = new Array();

    // Sort the arrays.
    filters.sort(TopicSorter);
    list.sort(TopicSorter);

    // Iterate through the arrays.
    var list_index = list.length - 1;
    var filt_index = filters.length - 1;
    while ( list_index >= 0  &&  filt_index >= 0 )
    {
        // Skip what should be used or duplicate filters.
        while ( filt_index >= 0  &&
                filters[filt_index].topicNum > list[list_index].topicNum )
            filt_index--;

        // If list's element is in the filter, add it to the new list.
        if ( filt_index >= 0  &&
             filters[filt_index].topicNum == list[list_index].topicNum )
            new_list.push(list[list_index]);

        // Update the loop.
        list_index--;
    }

    return new_list;
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


// Parses the URL parameters, performs a search, and writes the results.
function ParseParams()
{
    // The criteria
    var class_selection = new Array();
    var race_selection = new Array();
    var all_race = false;
    var mins = new Array(MAX_CLASS+1);    // 1-based array
    var maxs = new Array(MAX_CLASS+1);    // 1-based array
    var classes = new Array(MAX_CLASS+1); // 1-based array
    var sortby = "";
    var i = 0;      // Used to iterate small loops.
    var tmp = null; // Storage for a value that will be used in the next statement.

    // Initialize arrays.
    for ( i = 1; i <= MAX_CLASS; i++ )
    {
        mins[i] = 0;
        maxs[i] = 0;
        classes[i] = "none"
    }


    // ********* URL decoding *********

    // Find the relevant part of the URL.
    var url_params = "";
    var token_index = document.URL.indexOf("?");
    if ( token_index >= 0 )
        url_params = document.URL.substring(token_index + 1);

    // Un-encode spaces.
    url_params = url_params.replace(/\+/g, " ");
    url_params = url_params.replace(/_/g, " ");
    // Safety measure -- legit searches should not have these characters anyway.
    url_params = url_params.replace(/</, "&lt;");
    url_params = url_params.replace(/>/, "&gt;");

    // Convert the URL tail into an array of associations.
    var param_list = url_params.split("&");
    // Iterate the array.
    var criteria_found = false;
    var index = param_list.length;
    while ( index-- > 0 )
    {
        // Make sure the association is valid.
        var param = param_list[index].split("=", 2);
        if ( param.length == 2 )
        {
            var valid_param = true;
            // Set the appropriate variable.
            switch ( param[0].substring(0, 3) )
            {
                case "min":
                        tmp = Number(param[0].substring(3));
                        if ( 0 < tmp  &&  tmp <= MAX_CLASS )
                            mins[tmp] = FiniteNumber(param[1]);
                        else
                            valid_param = false;
                        break;

                case "max":
                        tmp = Number(param[0].substring(3));
                        if ( 0 < tmp  &&  tmp <= MAX_CLASS )
                            maxs[tmp] = FiniteNumber(param[1]);
                        else
                            valid_param = false;
                        break;

                case "cla":
                        tmp = Number(param[0].substring(5));
                        if ( 0 < tmp  &&  tmp <= MAX_CLASS  &&  "ss" == param[0].substring(3,5))
                            classes[tmp] = param[1].length > 0 ? param[1] : "none";
                        else
                            valid_param = false;
                        break;

                default: // The non-indexed parameters.
                    switch ( param[0] )
                    {
                        case "selclass": class_selection.unshift(param[1]);   break;
                        case "selrace" : race_selection.unshift(param[1]);    break;
                        case "sortby":   sortby = param[1];                   break;
                        case "allrace":  all_race = param[1].length > 0    &&
                                           param[1].toLowerCase() != "no"  &&
                                           param[1].toLowerCase() != "false"; break;

                        default: valid_param = false;
                    }
            }//switch
            criteria_found = criteria_found || valid_param;
        }
    }//while (index)
    if ( !criteria_found )
        // No query found.
        return document.writeln('<p class="error">No valid query supplied.</p>');


    // ********* Criteria feedback ********* 

    document.write('<p class="criteria">Builds with ');

    // Classes
    for ( i = 1; i <= MAX_CLASS; i++ )
    {
        if ( i == MAX_CLASS )
            document.write("and ");
        if ( "none" == classes[i] )
            document.write( "no class " + i);
        else
        {
            document.write(mins[i] + " to " + maxs[i] + " levels of " + classes[i]);
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
            document.writeln("The selected classes are " +
                             class_selection.join(", ") + ".<br />");
    }

    // Races
    if ( all_race  ||  race_selection.length == 0 )
        document.writeln("All races are included.<br />");
    else
        document.writeln("The included races are " + race_selection.join(", ") + ".<br />");

    // Sort order.
    document.writeln("Builds are sorted by " +
        ("classlevel" == sortby ? "class and level" : sortby) + ".</p>");


    // ********* Searching ********* 

    // Expand the race list to allow a question mark at the end.
    for ( i = race_selection.length - 1; i >= 0; i-- )
        race_selection.push(race_selection[i] + "?");

    // Get the list of builds.
    var list_source = null;
    var list_text = null;
    try {
        list_source = parent.document.getElementById("listsource");
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
        return document.writeln('<p class="error">No database found.</p>');
    }
    var build_list = LoadList(list_text); // Will always be a valid array.


    // Apply the straight-forward criteria.
    if ( all_race  ||  race_selection.length == 0 )
        build_list = ValidBuilds(build_list);
    else
        build_list = RaceBuilds(build_list, race_selection);


    // First, handle the specific classes.
    for ( i = 1; i <= MAX_CLASS; i++ )
        if ( "none" != classes[i]  &&  "any" != classes[i]  &&  "selected" != classes[i] )
            list_filter = ClassNameFilter(list_filter, classes[i], mins[i], maxs[i]);

    // Second, handle the "selected" and "any" classes.
    list_filter = ClassMultiFilter(list_filter, classes, mins, maxs, class_selection);

    // Finally, weed out the builds with excess classes.
    // (Implies either a "none" class specified or a class allowing 0 levels.)
///
    var class_limit = MAX_CLASS;
    for ( i = 1; i <= MAX_CLASS; i++ )

        if ( "none" == classes[i] )
            class_limit--;
    var list_filter = ClassNumFilter(build_list, class_limit);

    // Apply the filter to the list to get the search results.
    build_list = ApplyFilter(list_filter, build_list);


    // ********* Sorting and display ********* 

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
