// Functions for the build search page.


// Current values of the class selectors.
// (These are "previous" when they get used in the onChanged event.)
var PreviousValues = new Array("", "any", "any", "any");


// Converts its paramter to a number, but defaults to 0
// if the result is not a finite number.
function FiniteNumber(num_str)
{
	if ( isFinite(num_str) )
		return Number(num_str);
	return 0;
}


// Keeps the minimum and maximum level totals updated
// The parameter should be "min" or "max".
function LevelTotal(minmax)
{
	// Find the relevant total.
	var total_display = document.getElementById(minmax + "total");
	if ( total_display )
	{
		// Calculate the total.
		var entry1 = document.getElementById(minmax + "1");
		var entry2 = document.getElementById(minmax + "2");
		var entry3 = document.getElementById(minmax + "3");
		var total = ( entry1 ? Number(entry1.value) : 0 ) +
		            ( entry2 ? Number(entry2.value) : 0 ) +
		            ( entry3 ? Number(entry3.value) : 0 );

		// Update the display.
		total_display.value = total;
		if ( ( total > 40  &&  minmax == "min" ) ||
		     ( total < 40  &&  minmax == "max" ) )
			total_display.style.color="#FF0000";
		else
			total_display.style.color="";
	}
}


// Keeps the minimum and maximum level totals updated, as well as
// validating the value of changed.
// The changed parameter should be the form element that changed.
function LevelValidate(changed)
{
	// Safety check.
	if ( !changed )
		return;

	// Make sure the changed element has a number in the range 0 to 40.
	var was_finite = isFinite(changed.value); // Might need this later.
	changed.value = FiniteNumber(changed.value);
	if ( changed.value > 40 )
		changed.value = 40;
	else if ( changed.value < 0 )
		changed.value = 0;

	// Identify the changed element as a min or max.
	var minmax =  changed.id ? changed.id.substring(0,3) : "";

	// Enforce max >= min.
	if ( minmax == "min" )
	{
		// Check the max.
		var max_el = document.getElementById("max" + changed.id.substring(3));
		if ( max_el  &&  Number(changed.value) > Number(max_el.value) )
		{
			// Increase the max to accommodate this change.
			max_el.value = changed.value;
			LevelTotal("max");
		}
	}
	else
	{
		// Check the min.
		var min_el = document.getElementById("min" + changed.id.substring(3));
		if ( min_el  &&  Number(changed.value) < Number(min_el.value) )
		{
			// Only decrease the min if this was valid input originally.
			if ( was_finite )
			{
				min_el.value = changed.value;
				LevelTotal("min");
			}
			else
				// Probably an input error. Set changed down to minimum.
				changed.value = min_el.value;
		}
	}

	// Update the relevant total.
	LevelTotal(minmax);
}


// Converts a class name to the id of the associated checkbox.
function ClassToBox(class_name)
{
	try {
		return class_name.substring(0,3) +
		       class_name.charAt(class_name.length-1) +
		       "_box";
	}
	catch (e) {
		// Bad input? GIGO it.
		return "null_box";
	}
}


// Controls the visibility of the class selection panel.
// Also sets min/max to 0 if "changed" was changed to "none".
function ClassValidate(changed)
{
	var classet = document.getElementById("classset");

	var select1 = document.getElementById("class1");
	var select2 = document.getElementById("class2");
	var select3 = document.getElementById("class3");
	// We really care about the values, not the HTML element.
	select1 = select1 ? select1.value : "";
	select2 = select2 ? select2.value : "";
	select3 = select3 ? select3.value : "";


	if ( changed )
	{
		var changed_index = changed.id ? FiniteNumber(changed.id.substring(5)) : 0;
		var prev_value = PreviousValues[changed_index];

		// Re-enable a button that might have been disabled.
		try { document.getElementById(ClassToBox(prev_value)).disabled = false; }
		catch (e) { } // Just making sure this does not break execution.

		// Check for something changing to "none".
		if ( changed.value == "none" )
		{
			// Set this class' max levels to 0.
			var max_el = document.getElementById("max" + changed.id.substring(5));
			if ( max_el )
			{
				max_el.value = 0;
				LevelValidate(max_el);
			}
		}
		// Check for something changing to "any" or "selected".
		else if ( changed.value == "any"  ||  changed.value == "selected" )
			// Nothing special for these cases.
			;
		else
		{
			// Specific class selected. Prohibit choosing the same class twice.
			if ( ( changed_index != 1  &&  select1 == changed.value )  ||
			     ( changed_index != 2  &&  select2 == changed.value )  ||
			     ( changed_index != 3  &&  select3 == changed.value ) )
			{
				alert("You cannot select the same class twice.");
				changed.value = prev_value;
			}
			// Disable the check box for this class.
			var checkbox = document.getElementById(ClassToBox(changed.value));
			if ( checkbox )
			{
				checkbox.checked = false;
				checkbox.disabled = true;
			}
		}

		// Remember this value for when this is next changed.
		PreviousValues[changed_index] = changed.value;
	}


	// See of any of the classes are "selected".
	if ( select1 == "selected"  ||  select2 == "selected"  ||
	     select3 == "selected"  ||  changed.value == "selected" )
		// Make the panel visible.
		classet.style.display = "block";
	else
		// Make the panel invisible.
		classet.style.display = "none";
}


// Co-ordinates the "any race" button with the rest of the buttons.
// A true parameter indicates all races should be selected.
// A false parameter indiactes the "any race" button should be deselcted.
function AllRaces(all_races)
{
	if ( !all_races )
		// Deselect the "any race" button.
		document.getElementById("allracebutton").checked = false;
	else
	{
		// Iterate through all inputs (including race buttons).
		var button_list = document.getElementsByTagName("INPUT");
		var index = button_list.length;
		while ( index-- > 0 )
			// See if we found a race button.
			if ( "selrace" == button_list[index].name )
				// Select this.
				button_list[index].checked = true;
	}
}


// Handles the submission of the search form.
function ValidateSearch()
{
	// Warn if minimum total is too high.
	var total_display = document.getElementById("mintotal");
	if ( Number(total_display.value) > 40 )
		alert("Your criteria implies a build with more than 40 levels. " +
		      "Such a build is illegal, so getting no search results is likely.");

	// Warn if maximum total is too low.
	total_display = document.getElementById("maxtotal");
	if ( Number(total_display.value) <= 20 )
		alert("Your criteria implies a non-epic build. " +
		      "No search results are likely from the EPIC Character Builders guild.");
	else if ( Number(total_display.value) < 40 )
		alert("Your criteria implies a build with less than 40 levels. " +
		      "Such builds are uncommon, so getting no search results is likely.");

	// Warn if not enough classes selected for "selected classes".
	var select1 = document.getElementById("class1");
	var select2 = document.getElementById("class2");
	var select3 = document.getElementById("class3");
	var selcountA = 0 + 
	                ( select1  &&  select1.value == "selected" ? 1 : 0 ) +
	                ( select2  &&  select2.value == "selected" ? 1 : 0 ) +
	                ( select3  &&  select3.value == "selected" ? 1 : 0 );
	if ( selcountA > 0 )
	{
		var selcountB = 0;

		// Iterate through all inputs (including class buttons).
		var button_list = document.getElementsByTagName("INPUT");
		var index = button_list.length;
		while ( index-- > 0 )
			// See if we found a class button.
			if ( "selclass" == button_list[index].name  &&
			     button_list[index].checked )
				// Count this.
				selcountB++;

		// See if any classes are selected.
		if ( 0 == selcountB )
			alert('You chose "selected classes", but did not select any. ' +
			      'This will probably result in no search results.');
		else if ( selcountB < selcountA )
			alert('You chose "selected classes" ' + selcountA + ' times, ' +
			      'but only selected ' + selcountB + ' class' +
			      (selcountB == 1 ? '' : 'es') + '. ' +
			      'This will probably result in no search results.');
	}

	// Show the results panel.
	document.getElementById("resultsparent").classList.add("results");
}
