/**
 * Javascript behind Raine's World of Greyhawk's deity search page.
 */


/* ************************************************************************************ */
// Deity data
var arrDeities = [
{Name: "Avoreen",				Domains: ["Good", "Law", "Protection", "War"],					Alignments: ["LG", "NG", "CG", "LN"],		Races: ["Ha"],								Title: "Fiery Guardian of the Home",Location: "Village of Hommlet",			Description: "Avoreen is the nearest thing to a halfling war god. He is a god of stern defense and aggressive watchfulness, who is always preparing for incursions into halfling lands and making ready to repulse hostile creatures at the first sign of trouble. Arvoreen has cultivated good relations with most of the good and neutral deities, particularly of the dwarven, elven, gnome, and human pantheons. He is the patron god of halfling fighters and fighter/rogues. His favored weapons are two shortswords."},
{Name: "Bahamut",				Domains: ["Air", "Good", "Luck", "Protection"],					Alignments: ["LG", "NG"],					Races: [],									Title: "King of Good Dragons",		Location: "Bandit Lands (to the west)",	Description: "Bahamut is revered in many locales. Though all good dragons pay homage to Bahamut, gold, silver, and brass dragons hold him in particularly high regard. Even evil dragons respect him for his wisdom and power. Bahamut is stern and disapproving of evil and brooks no excuses for evil acts. He is one of the most compassionate beings in the multiverse with limiteless empathy for the downtrodden, dispossessed, and the helpless. He urges his followers to promote the cause of good, but to allow beings to fight their own battles as much as they can. He is typcially worshiped by dragons, but others who honor his dogma may serve."},
{Name: "Beory",					Domains: ["Animal", "Earth", "Plant"],							Alignments: ["TN"],							Races: [],									Title: "Goddess of the Oerth",		Location: "Old City in Greyhawk",		Description: "Beory is a neutral deity, primarily worshipped by druids and those that rely on the earth for a living. Favored weapon is the club."},
{Name: "Boccob",				Domains: ["Knowledge", "Magic", "Trickery"],					Alignments: ["TN", "CN", "LN", "NE", "NG"],	Races: ["El", "Gn", "He", "Ha", "Hu"],		Title: "God of Magic",				Location: "Greyhawk Guild of Wizardry",	Description: "Boccob is a very distant deity who promotes no special agenda in the world of mortals. His titles include the Uncaring, Lord of All Magics, and the Archmage of the Deities. He is typically worshiped by wizards, sorcerers, and sages. Favored weapon is the quarterstaff."},
{Name: "Clanggedin Silverbeard",Domains: ["Good", "Law", "War", "Strength"],					Alignments: ["NG", "LG", "CG"],				Races: ["Dw"],								Title: "Dwarf Deity of Battle",		Location: "Law's Forge, Shield Lands",	Description: "Clanggedin Silverbeard is known as The Father of Battle, Lord of the Twin Axes, the Giantkiller, the Goblinbane, the Wyrmslayer, the Rock of Battle. Clanggedin's realm is named Mount Clanggedin after himself, located on the plane of Arcadia. Clanggedin's priests wear silver war helms and chain mail. In battle his priests wear dwarven plate armor. He is worshipped before and during battle, and weapons are sacrificed to him in honor. The dwarven waraxe is his favored weapon."},
{Name: "Corellon",				Domains: ["Chaos", "Good", "Protection", "War"],				Alignments: ["CG", "CN", "NG"],				Races: ["El", "He"],						Title: "God of the Elves",			Location: "Welkwood",					Description: "Corellon is the governor of all things esteemed among elves. His nemesis is Gruumsh, and it is due to Corellon's battle skills that Gruumsh is called " + '"One-Eye."' + " He is known as the Creator of the Elves, the Protector, Protector and Preserver of Life, and Ruler of All Elves. Favored weapon is the longsword."},
{Name: "Ehlonna",				Domains: ["Animal", "Good", "Plant", "Sun"],					Alignments: ["NG", "CG", "LG"],				Races: ["El", "Gn", "He", "Ha", "Hu"],		Title: "Goddess of the Woodlands",	Location: "Plains outside Greyhawk",	Description: "Called Ehlonna of the Forests, she watches over all good people who live in the forest, love the woodlands, or make their livelihood there. She is favored by elves, gnomes, half-elves, halflings, and brownies. She is also worshiped by rangers and some druids. Favored weapon is the longsword."},
{Name: "Erythnul",				Domains: ["Chaos", "Evil", "Trickery", "War"],					Alignments: ["CE", "CN", "NE"],				Races: ["Dw", "Ho", "Hu"],					Title: "God of Slaughter",			Location: "Greyhawk, Old City sewers",	Description: "Erythnul is called the Many due to the various forms he takes including: that of a barbarian, gnoll, bugbear, ogre, and troll. He delights in panic and slaughter. Favored weapon is the morningstar."},
{Name: "Fharlanghn",			Domains: ["Luck", "Protection", "Travel"],						Alignments: ["CN", "LN", "NG", "TN", "NE"],	Races: ["El", "Gn", "He", "Ho", "Ha", "Hu"],Title: "God of the Roads",			Location: "The Crossroads",				Description: "Fharlanghn is called Dweller on the Horizon. His shrines are common on well-used roads. Bards and other wandering adventurers and merchants favor him. Favored weapon is the quarterstaff."},
{Name: "Garl Glittergold",		Domains: ["Good", "Protection", "Trickery"],					Alignments: ["NG", "CG", "LG"],				Races: ["Gn"],								Title: "God of the Gnomes",			Location: "Grossetgrottel",				Description: "Garl Glittergold is known as the Joker, the Watchful Protector, the Priceless Gem, and the Sparkling Wit. He discovered the gnomes and led them into the world. He governs humor, wit, gemcutting, and jewelrymaking, and is renowned for the jokes and pranks he pulls on the other deities. His favored weapon is the battleaxe."},
{Name: "Gruumsh",				Domains: ["Chaos", "Evil", "Strength", "War"],					Alignments: ["CE", "CN", "NE"],				Races: ["Ho", "Hu"],						Title: "God of Orcs",				Location: "Orcish Empire of the Pomarj",Description: "Gruumsh is known as One-Eye and He-Who-Never-Sleeps. He expects his followers to be strong, to cull the weak from their numbers, and to take all territory that Gruumsh thinks is rightfully theirs. His greatest hatred is for Corellon Larethian, Moradin, and their followers. Favored weapon is spear."},
{Name: "Heironeous",			Domains: ["Good", "Law", "War"],								Alignments: ["LG", "NG", "LN"],				Races: ["El", "He", "Ho", "Hu"],			Title: "God of Valor",				Location: "Greyhawk's River Quarter",	Description: "Heironeous, the Invincible, promotes justice, valor, chivalry, and honor. He is worshiped by paladins, good fighters, and good monks. Favored weapon is the longsword."},
{Name: "Hextor",				Domains: ["Destruction", "Evil", "Law", "War"],					Alignments: ["LE", "LN", "NE"],				Races: [],									Title: "God of Tyranny",			Location: "Suss Forest (hidden)",		Description: "Hextor is known as the Champion of Evil, Herald of #*!!, and Scourge of Battle. Hextor is the six-armed god of war, conflict, and destruction. He is worshiped by evil fighters and monks. He sends his followers to commit evils and overthrow the followers of Heironeous, his half-brother, when they are found. Favored weapon is the flail."},
{Name: "Iuz",					Domains: ["Chaos", "Evil", "Trickery"],							Alignments: ["CE"],							Races: ["Dw", "Drow", "He", "Ho", "Hu"],	Title: "Old Wicked",				Location: "Molag",						Description: "Iuz is the demi-god of deceit, pain, oppression and evil. Clerics of Iuz often are multi-classed wizards or fighters. Iuz's clergy believe in the survival of the fittest, and so battle one another as often as they battle the enemies of their lord. They travel the Flanaess in disguise, seeking powerful magic and captured creatures of great good as trophies to prove their worthiness. They adopt inconspicuous garb outside the Empire of Iuz, but among the faithful they dress in rusty black or white streaked with rust-red stains of blood. Some adorn their robes with bones. Most learn to use greatswords, though whips and flails are greatly approved of for their ability to inflict pain."},
{Name: "Kord",					Domains: ["Chaos", "Good", "Luck", "Strength"],					Alignments: ["CG", "NG", "LG"],				Races: ["Dw", "He", "Ho", "Hu"],			Title: "God of Strength",			Location: "Old City in Greyhawk",		Description: "Kord is known as the Brawler. He is the patron of athletes. His worshipers include good fighters, barbarians, and rogues. Favored weapon is the greatsword."},
{Name: "Lolth",					Domains: ["Chaos", "Destruction", "Evil", "Trickery"],			Alignments: ["CE"],							Races: ["Drow"],							Title: "Spider Goddess",			Location: "Undermountain (first room)",	Description: "Lolth is known as the Queen of the Drow and the Queen of the Demonweb Pits. She is the matron goddess of all drow. Her favored weapon is the whip."},
{Name: "Mayaheine",				Domains: ["Good", "Law", "Protection", "War"],					Alignments: ["LG", "NG"],					Races: [],									Title: "Shieldmaiden",				Location: "Critwall",					Description: "Mayaheine originally was a paladin of Pelor, but has reached deity status herself and is rising in popularity. She is the goddess of valor, protection and justice. Paladins and guards are often amongst her worshippers. Her favored weapon is a bastard sword used with one hand and a shield in the other. She is also known for her skill with a longbow."},
{Name: "Moradin",				Domains: ["Earth", "Good", "Law", "Protection"],				Alignments: ["LG", "LN", "NG"],				Races: ["Dw"],								Title: "God of Dwarves",			Location: "Grossetgrottel; Law's Forge",Description: "Moradin is known as the Soul Forger, Dwarffather, the All-Father, and the Creator. Favored weapon is the warhammer."},
{Name: "Nerull",				Domains: ["Death", "Evil", "Trickery"],							Alignments: ["NE", "CE", "LE"],				Races: ["El", "He", "Hu"],					Title: "God of Death",				Location: "Dark Arrow Forest",			Description: "Nerull is known as the Reaper, the Foe of All Good, Hater of Life, Bringer of Darkness, King of All Gloom, and Reaper of Flesh. He is the patron of those who seek the greatest evil for their own enjoyment or gain. His worshipers include evil necromancers and rogues, and he is often depicted as an almost skeletal figure cloaked and bearing a scythe. Favored weapon is the scythe."},
{Name: "Obad-Hai",				Domains: ["Air", "Animal", "Earth", "Fire", "Plant", "Water"],	Alignments: ["TN", "LN", "CN", "NE", "NG"],	Races: ["Dw", "El", "Gn", "He", "Ha", "Hu"],Title: "God of Nature",				Location: "Borderkeep Forest",			Description: "Also known as Shalm, Obad-Hai rules nature and wilderness. He is friend to all who live in harmony with the natural world. Barbarians, rangers, and druids sometimes worship him. He is a rival of Ehlonna. Favored weapon is the quarterstaff."},
{Name: "Olidammara",			Domains: ["Chaos", "Luck", "Protection", "Trickery"],			Alignments: ["CN", "CG", "CE"],				Races: ["El", "Gn", "He", "Ha", "Hu"],		Title: "God of Rogues",				Location: "Old City in Greyhawk",		Description: "Olidammara, the Laughing Rogue, delights in wine, women, and song. There are very few temples to Olidammara as his worshipers often remember him by raising a drink to his name instead. Rogues and bards are typically his worshipers. Favored weapon is the rapier."},
{Name: "Pelor",					Domains: ["Good", "Healing", "Strength", "Sun"],				Alignments: ["NG", "LG", "CG"],				Races: ["El", "He", "Ho", "Hu"],			Title: "God of the Sun",			Location: "High Quarter; Urnst",		Description: "Pelor, the Shining One, is the creator of many good things and a supporter of those in need. Pelor is an adversary of all evil. He is the most commonly worshiped deity among humans. Rangers and bards are found among his worshipers as well. Favored weapon is the mace."},
{Name: "Pholtus",				Domains: ["Good", "Knowledge", "Law", "Sun"],					Alignments: ["LG", "LN"],					Races: ["He", "Hu"],						Title: "Unyielding Law and Order",	Location: "Greyhawk's River Quarter",	Description: "Pholtus, the Provider of the One True Path, is an adversary of all chaos and provides protection to the natural order including the sun and moon. His worshipers are human and often seen as zealots by other religions. Favored weapon is the quarterstaff."},
{Name: "Pyremius",				Domains: ["Destruction", "Evil", "Fire"],						Alignments: ["NE"],							Races: [],									Title: "Fire, Poison and Murder",	Location: "Suss Forest",				Description: "Pyremius teaches that destruction by fire is the destiny of the world, and that those who are foolish enough to be poisoned or otherewise murdered by stealth deserve their fate. Pyremius urges his followers to burn those who threaten them, and to murder those who keep them from getting what they want. Pyremius is very popular in the lands ruled by the Scarlet Brotherhood, as well as among assassins and pyromaniacs. Favored weapon is the longsword."},
{Name: "Ralishaz",				Domains: ["Chaos", "Destruction", "Luck", "Trickery"],			Alignments: ["CN", "CE", "CG"],				Races: [],									Title: "Bringer of Misfortune",		Location: "Old City in Greyhawk",		Description: "Ralishaz is the god of chaos, destruction, plagues, and ill luck. He is rarely worshipped, but many people pay occasional homage to him to avoid plagues and droughts. His favored weapon is the mace."},
{Name: "Rao",					Domains: ["Good", "Healing", "Knowledge", "Law"],				Alignments: ["LG", "LN", "NG"],				Races: [],									Title: "Peaceful One",				Location: "Greyhawk's River Quarter",	Description: "Rao is the god of peace, reason and serenity. Rao is often seen as a comforter and a peacemaker and is friend to those who would seek a solution through discussion rather than arms. Monks are found among his worshipers as well. He has no favored weapon."},
{Name: "Sehanine Moonbow",		Domains: ["Knowledge", "Travel", "Trickery"],					Alignments: ["CG", "CN"],					Races: ["El", "He"],						Title: "Elven Goddess of the Moons",Location: "Welkwood",					Description: "The Lady of Dreams actively opposes the nefarious schemes of the Spider Queen and the other drow powers. She is said to be the wife of Corellon Larethian. Her preferred weapon is the Moonstaff (quarterstaff). Her symbol is a full moon topped by a crescent-shaped haze."},
{Name: "Sotillion",				Domains: ["Air", "Good", "Healing", "Plant"],					Alignments: ["CG", "CN"],					Races: [],									Title: "Summer Queen",				Location: "Isle of Ruskis",				Description: "Sotillion is the goddess of summer, the south wind, ease and comfort. She is often worshipped by high society. The occasional adventurer will worship her as some believe that to truly enjoy the good life, one has to undergo hardships. Favored weapon is the net."},
{Name: "St. Cuthbert",			Domains: ["Destruction", "Law", "Protection", "Strength"],		Alignments: ["LN", "LG"],					Races: ["El", "He", "Hu"],					Title: "God of Retribution",		Location: "High Quarter; Hommlet",		Description: "St. Cuthbert of the Cudgel exacts revenge and just punishment on those who transgress the law. Since evil creatures most often violate the law, he favors those of good a bit more than those of evil. Favored weapon is the mace."},
{Name: "Tiamat",				Domains: ["Destruction", "Evil", "Law", "Trickery"],			Alignments: ["LE", "NE"],					Races: [],									Title: "Queen of Evil Dragons",		Location: "Ruins of Safeton",			Description: "Like Bahamut, her rival, Tiamat is revered in many locales. Those who most typically worship her are the green and blue dragons. She urges her followers to spread evil, destroy good, and propagate evil dragons. She is a villain that works from the shadows, her presence often felt but seldom seen. Her following is even smaller than that of Bahamut, and the few shrines she does have are usually found in gloomy caverns."},
{Name: "Tritherion",			Domains: ["Animal", "Chaos", "Good", "War"],					Alignments: ["CG"],							Races: [],									Title: "Liberty and Retribution",	Location: "Greyhawk's River Quarter",	Description: "Trithereon is a foe of evil and oppression. His love of freedom sometimes causes him to come into conflict with other good deities, such as Pholtus and Heironeous. Bralm hates Trithereon for his promotion of individualism. He is a strong ally of the quasi-deity Krovis, and he is allied with Kurell and Pelor as well. Trithereon is pleased with Lydia's philosophy of individual empowerment through learning."},
{Name: "Wee Jas",				Domains: ["Death", "Law", "Magic"],								Alignments: ["LN", "LE", "LG"],				Races: ["El", "He", "Hu"],					Title: "Goddess of Death and Magic",Location: "High Quarter of Greyhawk",	Description: "Wee Jas is called Witch Goddess, Ruby Sorceress, Stern Lady, and Death's Guardian. She is a demanding goddess who expects obedience from her followers. There are few temples to Wee Jas, but many powerful sorcerers and wizards are among here followers. Favored weapon is the dagger."},
{Name: "Yondalla",				Domains: ["Good", "Law", "Protection"],							Alignments: ["LG", "LN", "NG"],				Races: ["Ha"],								Title: "Goddess of Halflings",		Location: "Borderkeep",					Description: "Yondalla is called the Protector and Provider, the Nurturing Matriarch, and the Blessed One. Her followers hope to lead a safe, prosperous life. Favored weapon is the short sword."},
];


/* ************************************************************************************ */
// Text processing

// Converts a one-letter alignment code to the corresponding name.
// Returns the empty string for an unrecognized code.
function align_piece(code)
{
	switch ( code ) {
		case 'E': return "evil";
		case 'G': return "good";
		case 'C': return "chaotic";
		case 'L': return "lawful";
		case 'N': return "neutral";
		case 'T': return "true"; // As in true neutral
	}

	return "";
}

// Converts a racial code to the corresponding name.
// Returns "unknown" for an empty code.
function race_name(code)
{
	switch ( code ) {
		case 'Dw': return "dwarf";
		case 'El': return "elf";
		case 'Gn': return "gnome";
		case 'Ha': return "halfling";
		case 'He': return "half-elf";
		case 'Ho': return "half-orc";
		case 'Hu': return "human";
	}

	return code.length > 0 ? code : "unknown";
}

// Converts an array of alignment abbreviations to a list of alignment names.
function getAlignmentNames(aryAligns)
{
	let alignments = "";
	let prefix = "";
	let count = aryAligns.length;

	// Generate a comma-separated list of alignment names
	for ( let i = 0; i < count; ++i ) {
		let first = align_piece(aryAligns[i].charAt(0));
		let second = align_piece(aryAligns[i].charAt(1));
		alignments += prefix + (first.length > 0  &&  second.length > 0 ?
			first + " " + second :
			"unknown");
		prefix = ", ";
	}

	return alignments;
}

// Returns the classes corresponding to the given array of domains.
// This is a space-separated list with a leading space.
function getDomainClasses(aryDomains)
{
	let classes = "";
	let count = aryDomains.length;

	// Classes are in the form "domain" and "domain1-domain2" (alphabetical order).
	for ( let j = 0; j < count; ++j ) {
		classes += " " + aryDomains[j];
		for ( let k = j+1; k < count; ++k )
			classes += " " + (aryDomains[j] < aryDomains[k] ?
				aryDomains[j] + "-" + aryDomains[k] :
				aryDomains[k] + "-" + aryDomains[j]);
	}

	return classes;
}

// Converts an array of race abbreviations to a list of race names.
// An empty array is converted to "any".
function getRaceNames(aryRaces)
{
	let races = "";
	let prefix = "";
	let count = aryRaces.length;

	if ( count === 0 )
		return "any";

	// Generate a comma-separated list of alignment names
	for ( let i = 0; i < count; ++i ) {
		races += prefix + race_name(aryRaces[i]);
		prefix = ", ";
	}

	return races;
}


/* ************************************************************************************ */
// DOM processing

// Appends a new HTML node, populated by the info in deity, to the given parent node.
function appendDeity(deity, parent)
{
	// The deity's name gets some special markup.
	let name_span = document.createElement("span");
	name_span.textContent = deity.Name;
	name_span.className = "deity name";
	name_span.title = deity.Description;

	// Generate the element containing the deity's information.
	let entry = document.createElement("div");
	entry.innerHTML = // Deity name will be inserted here
		"<span class='deity title'>, " + deity.Title + "</span><dl>" +
			"<dt>Alignments:</dt><dd>" + getAlignmentNames(deity.Alignments) + "</dd>" +
			"<dt>Domains:</dt><dd>" + deity.Domains.join(", ").toLowerCase() + "</dd>" +
			"<dt>Races:</dt><dd>" + getRaceNames(deity.Races) + "</dd>" +
			"<dt>Temple:</dt><dd>" + deity.Location.replace(";", " &amp;") + "</dd>" +
		"</dl>";
	entry.insertBefore(name_span, entry.firstChild);

	// Create wrappers that control visibility.

	let align = document.createElement("div");
	align.className = "align " + deity.Alignments.join(" ");

	let domain = document.createElement("div");
	domain.className = "domain " + getDomainClasses(deity.Domains);

	let race = document.createElement("div");
	race.className = "race " + (deity.Races.length === 0 ? "any" : deity.Races.join(" "));

	// Combine everything together (Parent -> Race -> Align -> Domain -> Entry).
	race.appendChild(align).appendChild(domain).appendChild(entry);
	return parent.appendChild(race);
}

// Adds the list of deities to the document.
// @event is ignored.
function addDeities(event)
{
	let count = arrDeities.length;
	let parent = document.getElementById("divResults");

	for ( let i = 0; i < count; ++i )
		appendDeity(arrDeities[i], parent);
}

// Returns the first ancestor of element that is a fieldset
function myFieldset(element)
{
	let ancestor = element;
	while ( ancestor  &&  ancestor.localName !== 'fieldset' )
		ancestor = ancestor.parentElement;

	return ancestor;
}


/* ************************************************************************************ */
// Style manipulations

// Returns the index of a rule in the CSSRuleList with the provided selector.
// Returns -1 if not found.
function findRule(rules, selector)
{
	let count = rules.length;
	for ( let i = 0; i < count; ++i )
		if ( rules[i].type === CSSRule.STYLE_RULE  &&
		     rules[i].selectorText === selector )
			return i;

	// Not found.
	return -1;
}

// Updates the list of deities based on the provided type and button.
// The type should match the classes used in the wrapper HTML elements of appendDeity().
// (Internal function -- direct calls would go through selectAlignment/Domain/Race.
function selectCriterion(type, button)
{
	let styleSheet = document.getElementById("style-results").sheet;
	let selector = "." + type + "." + button.value;

	// Remove any existing rule for this code (even if adding, just in case).
	let oldIndex = findRule(styleSheet.cssRules, selector);
	if ( oldIndex >= 0 )
		styleSheet.deleteRule(oldIndex);

	// Add a rule if this alignment should be shown.
	if ( button.checked )
		styleSheet.insertRule(selector + " { display:inherit; }");
}

// Updates the list of deities based on the event's current target.
// It is assumed that the current target is checkable and its value is an alignment code.
function selectAlignment(event)
{
	selectCriterion("align", event.currentTarget);
}

// Updates the list of deities based on the event's current target.
// It is assumed that the current target is checkable and its value is a domain (Title Case).
function selectDomain(event)
{
	selectCriterion("domain", event.currentTarget);
}

// Updates the list of deities based on the event's current target.
// It is assumed that the current target is checkable and its value is a racial code.
function selectRace(event)
{
	selectCriterion("race", event.currentTarget);
}

// Selects or unselects all checkboxes in the first ancestor fieldset.
function selectAll(event, selected)
{
	let ancestor = myFieldset(event.currentTarget);
	let aryChecks = ancestor.getElementsByTagName("input");
	let count = aryChecks.length;

	for ( let i = 0; i < count; ++i ) {
		let button = aryChecks.item(i);
		if ( button.type === "checkbox"  &&  button.checked != selected )
			button.click();
	}
}

// Registers the event listeners on the checkboxes.
// @event is ignored
function initCriteria(event)
{
	let form = document.getElementById("fromCriteria");
	let buttons = form.getElementsByTagName("input");
	let count = buttons.length;

	for ( let i = 0; i < count; ++i ) {
		let which = buttons[i].name;
		switch ( which ) {
			case 'alignment': buttons[i].addEventListener("click", selectAlignment); break;
			case 'domain':    buttons[i].addEventListener("click", selectDomain);    break;
			case 'race':      buttons[i].addEventListener("click", selectRace);      break;
		}
	}
}

/* ************************************************************************************ */
// Trigger initialization.
document.addEventListener("DOMContentLoaded", addDeities);
document.addEventListener("DOMContentLoaded", initCriteria);

