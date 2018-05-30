/* This is the javascript that generates the HTML that surrounds the posts when viewing a topic. */
/* It also handles the page views. */


// This would be defined as a constant, but it appears not all browsers support that.
var PostsPerPage = 15;


// Outputs the HTML for the body down to the beginning of the post-specific stuff.
// The first parameter identifies which forum this came from, which can affect the navigational buttons.
// Supported parameter values are:
//     "build", "general", "prcbuild", and "request".
function PrintPageTop(ForumType, Build, NumPosts, NumViews)
{
    // Decide which "back" button to display.
    var ForumName = ForumType + " Forum";
    var ForumFile = ForumType + "forum.html";
    var ForumIndex = "index.html";
    var IndexName = "Build Index";
    if      ( ForumType == "build"    ) ForumName = "Build Forum";
    else if ( ForumType == "general"  ) ForumName = "General Forum";
    else if ( ForumType == "request"  ) ForumName = "Request Forum";
    else if ( ForumType == "prcbuild" ) {
        ForumName = "PRC Build Forum";
        ForumIndex = "prcindex.html";
        IndexName = "PRC Build Index";
    }

    document.writeln('  <header>');
    document.writeln('    <img src="../../images/build_title.png" alt="Epic character builds">');
    document.writeln('    <div id="menu">');
    document.writeln('        <a href="../guild.html" class="buttonlink">Guild Archive</a>');
    document.writeln('        <a href="../' + ForumFile + '" class="buttonlink">' + ForumName + '</a>');
    document.writeln('        <a href="../' + ForumIndex + '" class="buttonlink">' + IndexName + '</a>');
    document.writeln('        <a href="../../buildsearch/index.html" class="buttonlink">Build Search</a>');
    document.writeln('        <span class="menuspacer"></span>');
    document.writeln('        <a href="../../index.html" class="buttonlink">WoG Home</a>');
    document.writeln('    </div>');
    document.writeln('  </header>');
    document.writeln('');
    document.writeln('  <main>');

    // Having this statement fail is bad for presentation, so just in case, catch exceptions.
    try { InitPage(NumPosts); } catch (e) { document.writeln('<p class="warn">Warning: an error may have ' +
                                                             'reduced functionality on this page.<br />'+e+'</p>'); }

    document.writeln('    <h1>'+Build+'</h1>');
    document.writeln('    <div class="views">(Viewed '+NumViews+' times on the BioWare site.)</div>');
    document.writeln('');
    PrintNavBox(NumPosts);
    document.writeln('    <table>');
    document.writeln('      <tr>');
    document.writeln('        <th>Author</th>');
    document.writeln('        <th>Post</th>');
    document.writeln('      </tr>');
}

// Outputs the HTML that precedes the text of each post.
function PrintPostTop(PostIndex, BioNum, Author, AuthorBlurb, Timestamp)
{
    var Page = Math.floor(PostIndex/PostsPerPage)+1;

    document.writeln('      <tr class="page'+Page+'">');
    document.writeln('        <td rowspan="2"><div class="author">'+Author+'</div>');
    document.writeln('                        <div class="blurb">'+AuthorBlurb+'</div></td>');
    document.writeln('        <td class="timestamp">Posted '+Timestamp+' (GMT) <a id="'+BioNum+'"></a></td>');
    document.writeln('      </tr>');
    document.writeln('      <tr class="page'+Page+'">');
    document.writeln('        <td>');
}

// Outputs the HTML that follows the text of each post.
function PrintPostEnd(PostIndex, BioNum, Author, AuthorBlurb, Timestamp)
{
    document.writeln('        </td>');
    document.writeln('      </tr>');
}

// Outputs the HTML that follows the posts.
// The first parameter identifies which forum this came from, which can affect the navigational buttons.
// Supported parameter values are:
//     "build", "general", "prcbuild", and "request".
function PrintPageEnd(ForumType, Build, NumPosts, NumViews)
{
    document.writeln('    </table>');
    PrintNavBox(NumPosts);
    document.writeln('  </main>');
}

// Outputs the HTML for the navigational box.
function PrintNavBox(NumPosts)
{
    if ( NumPosts > PostsPerPage )
    {
        var MaxPage = Math.ceil(NumPosts/PostsPerPage);

        document.write('    <div class="nav">View page: ');
        for ( Page = 1; Page < MaxPage; Page++ )
            document.write('<a href="#page'+Page+'" onclick=ViewPage('+Page+','+MaxPage+') class="notpage'+Page+'">'+Page+'</a>' +
                           '<span class="page'+Page+'">'+Page+'</span>, ');
        // The last entry does not get the trailing comma, and it closes the <div>.
        document.writeln('<a href="#page'+Page+'" onclick=ViewPage('+Page+','+MaxPage+') class="notpage'+Page+'">'+Page+'</a>'+
                         '<span class="page'+Page+'">'+Page+'</span></div>');
    }
}

// Switches the view to the specified page.
// MaxPage tells us how many things need to be hidden.
function ViewPage(NewPage, MaxPage)
{
    var newStyle = "";

    // Safety checks
    if ( NewPage < 1 )
        NewPage = 1;
    else if ( NewPage > MaxPage )
        NewPage = MaxPage;

    // Construct a new style string to hide and show pages as appropriate.
    var Page;
    for ( Page = 1; Page <= MaxPage; Page++ )
        if ( Page == NewPage )
            newStyle += ".notpage"+Page+" { display:none }\n";
        else
            newStyle += ".page"+Page+" { display:none }\n";

    try { // Firefox, et al.
        document.getElementById("mystyle").innerHTML = newStyle;
        // (innerHTML is read-only in I.E.)
    }
    catch (e) { // Internet Explorer
        document.getElementById("mystyle").styleSheet.cssText = newStyle;
    }

    // Go to the top of the page, as if it had reloaded.
    window.scroll(0,0);
}

// Initializations for this page.
function InitPage(NumPosts)
{
    var MaxPage = Math.ceil(NumPosts/PostsPerPage);

    // Determine the page to initially show.
    var matches = /.*page=?(\d+)/.exec(document.URL);

    if ( matches  &&  matches[1] )
        ViewPage(matches[1], MaxPage);
    else if ( NumPosts > PostsPerPage ) // Minor efficiency check excluding short topics.
        ViewPage(1, MaxPage);
}

// Create an anchor element, compensating for moved links.
// FileName is, for example, "viewtopic.html".
function PrintAnchor(FileName, Guild, Forum, Topic, Start, RemainingURL, RemainingHTML)
{
    var newURL = "";

    // Only adjust links for viewing topics in the Epic Character Builder's guild.
    if ( Guild == "8061" )
    {
        // How to proceed depends on which file was requested.
        if ( FileName == "viewtopic.html" )
        {
            // Determine which forum was referenced.
            var Prefix = "";
            if      ( Forum == "13422" ) Prefix = "general";
            else if ( Forum == "13423" ) Prefix = "build";
            else if ( Forum == "15436" ) Prefix = "prcbuild";
            else if ( Forum == "16203" ) Prefix = "request";

            if ( Prefix != "" )
                // Change the URL to match what we are hosting.
                newURL = Prefix + Topic + ".html" +
                         ( Start != "" ? ("&amp;page=" + Math.floor(sp/PostsPerPage)+1) : "" );
        }
        else if ( FileName == "viewforum.html" )
        {
            // Viewing one of the forums.
            if      ( Forum == "13422" ) newURL = "../generalforum.html";
            else if ( Forum == "13423" ) newURL = "../buildforum.html";
            else if ( Forum == "15436" ) newURL = "../prcbuildforum.html";
            else if ( Forum == "16203" ) newURL = "../requestforum.html";
        }

        else if ( FileName == "viewguild.html" )
            newURL = "../guild.html";

    }
    if ( newURL == "" )
        // We did not intercept the URL, so reconstruct (an equivalent of) the original.
        newURL = "http://nwn.bioware.com/guilds_registry/" + FileName + "?gid=" + Guild +
                 ( Forum != "" ? ("&amp;forum=" + Forum) : "" ) +
                 ( Topic != "" ? ("&amp;topic=" + Topic) : "" ) + 
                 ( Start != "" ? ("&amp;sp="    + Start) : "" );

    // Construct the anchor element.
    document.write('<a href="'+newURL+RemainingURL+'"' + RemainingHTML + '>');
}

