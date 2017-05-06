// Functions that convert our build list from colon-separated text.

// The text format is one line per build, each line in the form
//     {topic number}: {author}: {race}: {classes}: {name}
// Any colons in "author" or "name" will be converted to ":;" to avoid ambiguity.
// The "classes" are in the format
//     {class} {level}[/ {class} {level}[/ {class} {level}]]

// The list format is an array of objects with the properties:
//     author
//     race
//     class1, class2, class3
//     level1, level2, level3
//     description
//     topicNum


// Returns the characters up to the first digit in data_string.
// Returns "" on error.
function GetToNumber(data_string)
{
    // Safety check.
    if ( !data_string )
    return "";

    // Peel off up to the first digit (or minus sign).
    var data_array = /^[^0-9\-]*/.exec(data_string);
    if ( data_array  &&  data_array.length > 0 )
        return data_array[0];

    return "";
}


// Returns the first sequence of digits in data_string.
// Returns "0" on error.
function GetFirstNumber(data_string)
{
    // Safety check.
    if ( !data_string )
    return "0";

    // Peel off up to the first digit (or minus sign).
    var data_array = /[0-9\-]+/.exec(data_string);
    if ( data_array  &&  data_array.length > 0 )
        return data_array[0];

    return "0";
}


// Creates a list of builds based on source_text.
function LoadList(source_text)
{
    var build_list = new Array();
    var line_split = null;
    var line_object = null;

    // Safety check
    if ( !source_text )
        return build_list;  // A 0-length array.

    // Split the input into lines.
    var source_lines = source_text.split( /\r(?!\n)|\r?\n/ );

    // Iterate through the lines.
    // Line 0 is to be skipped.
    var line_index = 0;
    while ( ++line_index < source_lines.length )
    {
        // Parse the input text.
        line_split = source_lines[line_index].split( /:(?!;)/ );

        // Check that this appears to be valid input.
        if ( 4 < line_split.length )
        {
            // Convert the parsed text to object properties.
            line_object = new Object();
            line_object.topicNum    = line_split.shift();
            line_object.author      = line_split.shift();
            line_object.race        = line_split.shift();
            line_object.class1      = line_split.shift();   // To be parsed later.
            line_object.description = line_split.join(":"); // In case someone added ": " in a description.

            // Restore colons.
            line_object.author = line_object.author.replace(":;", ":", "g");
            line_object.description = line_object.description.replace(":;", ":", "g");

            // Parse the class list.
            line_split = line_object.class1.split( "/" );
            line_object.class1 = GetToNumber(line_split[0]);
            line_object.class2 = GetToNumber(line_split[1]);
            line_object.class3 = GetToNumber(line_split[2]);
            line_object.level1 = GetFirstNumber(line_split[0]);
            line_object.level2 = GetFirstNumber(line_split[1]);
            line_object.level3 = GetFirstNumber(line_split[2]);

            // Trim excess leading spaces. (Want to handle this in case of human editing.)
            line_object.topicNum    = line_object.topicNum.replace( /^\s*/, "");
            line_object.author      = line_object.author.replace( /^\s*/, "");
            line_object.race        = line_object.race.replace( /^\s*/, "");
            line_object.description = line_object.description.replace( /^\s*/, "");
            line_object.class1      = line_object.class1.replace( /^\s*/, "");
            line_object.class2      = line_object.class2.replace( /^\s*/, "");
            line_object.class3      = line_object.class3.replace( /^\s*/, "");

            // Trim excess trailing spaces. (Want to handle this in case of human editing.)
            line_object.topicNum    = line_object.topicNum.replace( /\s*$/, "");
            line_object.author      = line_object.author.replace( /\s*$/, "");
            line_object.race        = line_object.race.replace( /\s*$/, "");
            line_object.description = line_object.description.replace( /\s*$/, "");
            line_object.class1      = line_object.class1.replace( /\s*$/, "");
            line_object.class2      = line_object.class2.replace( /\s*$/, "");
            line_object.class3      = line_object.class3.replace( /\s*$/, "");

            // Ensure case where it matters. (Want to handle this in case of human editing.)
            line_object.race = line_object.race.toLowerCase();
            line_object.class1 = line_object.class1.toLowerCase();
            line_object.class2 = line_object.class2.toLowerCase();
            line_object.class3 = line_object.class3.toLowerCase();
            // A few exceptions that should have upper case.
            // class1:
            if ( "champion of torm" == line_object.class1 )
                line_object.class1 = "champion of Torm";
            else if ( "harper scout" == line_object.class1 )
                line_object.class1 = "Harper scout";
            // class2:
            if ( "champion of torm" == line_object.class2 )
                line_object.class2 = "champion of Torm";
            else if ( "harper scout" == line_object.class2 )
                line_object.class2 = "Harper scout";
            // class3:
            if ( "champion of torm" == line_object.class3 )
                line_object.class3 = "champion of Torm";
            else if ( "harper scout" == line_object.class3 )
                line_object.class3 = "Harper scout";

            // Add the object to the list.
            build_list.push(line_object);
        }//if
    }//while

    return build_list;
}
