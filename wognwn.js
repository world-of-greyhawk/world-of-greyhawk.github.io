/** Flags the specified element as having been selected. */
function DoSelect(elem)
{
	const SELECTED = 'target';

	let cl_list = elem.classList;
	// Performance quit if already selected.
	if ( cl_list.contains(SELECTED) )
		return false;

	// Unflag the old selection.
	let oldNodes = elem.parentNode.getElementsByClassName(SELECTED);
	for ( let i = oldNodes.length; i-- > 0; )
		oldNodes[i].classList.remove(SELECTED);

	// Flag the new selection.
	cl_list.add(SELECTED);
	return true;
}

