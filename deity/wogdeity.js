//global variables
var strRaceSelected="Any";
var strAlignmentSelected="Any";
var strDomainSelected="Any";
var intRaceSelected="0";
var intAlignmentSelected="0";
var strdisplay="";
var intNumOfResults=0;

//data array
var arrDeities = [
['Deity','Domain','Domain','Lawful Good','Neutral Good','Chaotic Good','Lawful Neutral','True Neutral','Chaotic Neutral','Lawful Evil','Neutral Evil','Chaotic Evil','Dwarf','Elf','Elf (Drow)','Gnome','Half-Elf','Half-Orc','Halfling','Human','Temple Location','Description'],
['Avoreen','War','Good',true,true,true,,,,,,,,,,,,,true,,'Village of Hommlet',"Avoreen the Defender, fiery guardian of the home, is the nearest thing to a halfling war god. He is a god of stern defense and aggressive watchfulness, who is always preparing for incursions into halfling lands and making ready to repulse hostile creatures at the first sign of trouble. Arvoreen has cultivated good relations with most of the good and neutral deities, particularly of the dwarven, elven, gnome, and human pantheons. He is the patron god of halfling fighters and fighter/rogues. His favored weapons are two shortswords. His domains are Law, Protection, Good and War."],
['Bahamut','Air','Good',true,true,,,,,,,,true,true,,true,true,true,true,true,'Cave near the western entrance of the Bandit Lands',"Bahamut is the King of Good Dragons. He is Lawful Good. Bahamut is revered in many locales. Though all good dragons pay homage to Bahamut, gold, silver, and brass dragons hold him in particularly high regard. Even evil dragons respect him for his wisdom and power. Bahamut is stern and disapproving of evil and brooks no excuses for evil acts. He is one of the most compassionate beings in the multiverse with limiteless empathy for the downtrodden, dispossessed, and the helpless. He urges his followers to promote the cause of good, but to allow beings to fight their own battles as much as they can. He is typcially worshiped by dragons, but others who honor his dogma may serve. His domains are Air, Good, Luck, and Protection. Favored Weapon is the Claw."],
['Beory','Earth','Plant',,,,,true,,,,,true,true,,true,true,true,true,true,'Old City in Greyhawk',"Beory is the god of the Oerth, nature and rain. She is a neutral god and is primarily worshipped by druids and those that rely on the earth for a living. Domains are animal, earth and plant. Favored Weapon is the sickle."],
['Boccob','Knowledge','Magic',,true,,true,true,true,,true,,,true,,true,true,,true,true,'Greyhawk Guild of Wizardry, first floor',"Boccob is the god of magic. He is a Neutral god. Boccob is a very distant deity who promotes no special agenda in the world of mortals. His titles include the Uncaring, Lord of All Magics, and the Archmage of the Deities. He is typically worshiped by wizards, sorcerers, and sages. Boccob's domains are Knowledge, Magic, and Trickery. Favored weapon is the Quarter Staff."],
['Clanggedin Silverbeard','Strength','War',true,true,true,,,,,,,true,,,,,,,,"Law's Forge","Clanggedin Silverbeard is the dwarf deity of battle. He is also known as The Father of Battle, Lord of the Twin Axes, the Giantkiller, the Goblinbane, the Wyrmslayer, the Rock of Battle. Clanggedin's realm is named Mount Clanggedin after himself, located on the plane of Arcadia. Clanggedin's priests wear silver war helms and chain mail.  In battle his priests wear dwarven plate armor. He is worshipped before and during battle, and weapons are sacrificed to him in honor. Clanggedin's followers can be either Lawful, Neutral or Chaotic Good. The Dwarven Waraxe is the favored weapon. His domains are Strength and War."],
['Corellon Larethian','War','Protection',,true,true,,,true,,,,,true,,,true,,,,'Southeast corner of Darkwood Forest',"Corellon Larethian is the god of the elves. He is Chaotic Good. Corellon is the governor of all things esteemed among elves. His nemesis is Gruumsh, and it is due to Corellon's battle skills that Gruumsh is called 'One-Eye.' He is known as the Creator of the Elves, the Protector, Protector and Preserver of Life, and Ruler of ALL Elves. Elves, half-elves, and bards worship him. His domains include Chaos, Good, Protection, and War. Favored weapon is the longsword."],
['Ehlonna','Animal','Plant',true,true,true,,,,,,,,true,,true,true,,true,true,'Plain area, west side, outside of the City of Greyhawk',"Ehlonna is the goddess of the woodlands. She is neutral good. She is called Ehlonna of the Forests. Ehlonna watches over all good people who live in the forest, love the woodlands, or make their livelihood there. She is favored by elves, gnomes, half-elves, halflings, and brownies. She is also worshiped by rangers and some druids. Her domains include Animal, Plant, Good, and Sun. Favored weapon is the Longsword."],
['Erythnul','War','Trickery',,,,,,true,,true,true,true,,,,,true,,true,'City of Greyhawk, Old City sewers near the center',"Erythnul is the god of slaughter. He is Choatic Evil. Erythnul is called the Many due to the various forms he takes including: that of a barbarian, gnoll, bugbear, ogre, and troll. He delights in panic and slaughter. His domains include Chaos, Evil, Trickery, and War. Favored weapon is the Morningstar."],
['Fharlanghn','Protection','Travel',,true,,true,true,true,,true,,,true,,true,true,true,true,true,'Plains -- The Crossroads, midway between the City of Greyhawk and the Village of Borderkeep',"Fharlanghn is the god of the roads. He is Neutral. He is called Dweller on the Horizon. His shrines are common on well used roads. Bards and other wandering adventurers and merchants favor him. His domains include Luck, Protection, and Travel. Favored weapon is the Quarterstaff."],
['Garl Glittergold','Protection','Trickery',true,true,true,,,,,,,,,,true,,,,,'Northern cave in the Bandit Lands',"Garl Glittergold is the god of the Gnomes. He is Netural Good in nature. He is known as the Joker, the Watchful Protector, the Priceless Gem, and the Sparkling Wit. Garl Glittergold discovered the gnomes and led them into the world. He governs humor, wit, gemcutting, and jewelrymaking. He is also renowned for the jokes and pranks he pulls on the other deities. His domains are Good, Protection, and Trickery. His favored weapon is the battleaxe."],
['Gruumsh','Strength','War',,,,,,true,,true,true,,,,,,true,,true,'Cave at the entrance of the Orc Lands',"Gruumsh is the god of orcs. He is Chaotic Evil. He is known as One-Eye and He-Who-Never-Sleeps. He expects his followers to be strong, to cull the weak from their numbers, and to take all territory that Gruumsh thinks is rightfully theirs. His greatest hatred is for Corellon Larethian, Moradin, and their followers. His domains are Chaos, Evil, Strength, and War. Favored weapon is spear."],
['Heironeous','Good','War',true,true,,true,,,,,,,true,,,true,true,,true,'River Quarter / Clerksburg in the City of Greyhawk',"Heironeous is the god of valor. He is Lawful Good. His title is the Invincible. He promotes justice, valor, chivalry, and honor. He is worshiped by paladins, good fighters, and good monks. His domains are Good, Law, and War. Favored weapon is the longsword."],
['Hextor','Destruction','War',,,,true,,,true,true,,true,true,,true,true,true,true,true,'Hidden temple in the Northwest corner of Darkwood Forest',"Hextor is the god of tyranny. He is Lawful Evil. He is known as the Champion of Evil, Herald of heck, and Scourge of Battle. Hextor is the sixarmed god of war, conflict, and destruction. He is worshiped by evil fighters and monks. He sends his followers to commit evils and overthrow the followers of Heironeous, his half brother, when they are found. His domains are Destruction, Evil, Law, and War. Favored weapon is the flail."],
['Kord','Good','Strength',true,true,true,,,,,,,true,,,,true,true,,true,'City of Greyhawk, Old City, South Section, East side',"Kord is the god of strength. He is Chaotic Good. He is known as the Brawler. Kord is patron of athletes. His worshipers include good fighters, barbarians, and rogues. His domains are Chaos, Good, Luck, and Strength. Favored weapon is the greatsword."],
['Lolth','Destruction','Evil',,,,,,,,,true,,,true,,,,,,'Off the first room of the Undermountain',"Lolth is the Spider Goddess. She is Chaotic Evil. She is known also as the Queen of the Drow and the Queen of the Demonweb Pits. Lolth is the matron goddess of the drow. Her worshipers include any and all drow. Her domains are Chaos, Destruction, Evil, and Trickery. Her favored weapon is the Whip."],
['Mayaheine','Protection','War',true,true,,,,,,,,true,true,,true,true,true,true,true,'City of Critwall across the Nyr Dyv from the City of Greyhawk',"Mayaheine is the Shieldmaiden. She is Lawful Good. She originally was a paladin of Pelor, but has reached deity status herself and is rising in popularity. She is the goddess of valor, protection and justice. Paladins and guards are often amongst her worshippers. Her favored weapon is a bastard sword used with one hand and a shield in the other. She is also known for her skill with a longbow."],
['Moradin','Earth','Good',true,true,,true,,,,,,true,,,,,,,,'Northern cave in the Bandit Lands',"Moradin is the god of dwarves. He is Lawful Good. Moradin is also known as the Soul Forger, Dwarffather, the All-Father, and the Creator. His domains are Earth, Good, Law, and Protection. Favored weapon is the warhammer."],
['Nerull','Death','Evil',,,,,,,true,true,true,,true,,,true,,,true,'Western cave in the Dark Arrow Forest',"Nerull is the god of death. Nerull is Neutral Evil. He is known as the Reaper, the Foe of All Good, Hater of Life, Bringer of Darkness, King of All Gloom, and Reaper of Flesh. He is the patron of those who seek the greatest evil for their own enjoyment or gain. His worshipers include evil necromancers, rogues, and he is often depicted as an almost skeletal figure cloaked and bearing a scythe. His domains are Death, Evil, and Trickery. Favored weapon is the scythe."],
['Obad-Hai','Air','Water',,true,,true,true,true,,true,,true,true,,true,true,,true,true,'Borderkeep Forest',"Obad-Hai is the god of nature. He is neutral. Also known as Shalm, Obad-Hai rules nature and wilderness. He is friend to all who live in harmony with the natural world. Barbarians, rangers, and druids sometimes worship him. HIs domains are Air, Animal, Earth, Fire, Plant, and Water. He is a rival of Ehlonna. Favored weapon is the quarterstaff."],
['Olidammara','Protection','Trickery',,,true,,,true,,,true,,true,,true,true,,true,true,'Old City in Greyhawk',"Olidammara is the god of rogues. He is Chaotic Neutral. His tiles is the Laughing Rogue. He delights in wine, women, and song. There are very few temples to Olidammara as his worshipers often remember him by raising a drink to his name instead. Rogues and bards are typically his worshipers. His domains include Chaos, Luck, and Trickery. Favored weapon is the rapier."],
['Pelor','Healing','Sun',true,true,true,,,,,,,,true,,,true,true,,true,'High Quarter in the City of Greyhawk',"Pelor is the god of the sun. He is Neutral Good. His title is the Shining One. Pelor is the creator of many good things and a supporter of those in need. Pelor is an adversary of all evil. He is the most commonly worshiped deity among humans. Rangers and bards are found among his worshipers as well. His domains are Good, Healing, Strength, and Sun. Favored weapon is the mace."],
['Pholtus','Knowledge','Sun',true,,,true,,,,,,,,,,true,,,true,'River Quarter / Clerksburg in the City of Greyhawk',"Pholtus is the god of unyielding law and order. He is Lawful Good. His title is the Provider of the One True Path. Pholtus is an adversary of all chaos and provides protection to the natural order including the sun and moon. His worshipers are human and often seen as zealots by other religions. His domains are Good, Knowledge, Law, and Sun. Favored weapon is the quarterstaff."],
['Pyremius','Evil','Fire',,,,,,,,true,,true,true,true,true,true,true,true,true,'Edge of Darkwood Forest near Undermountain entrance.',"Pyremius is the god of fire, poison and murder. Pyremius teaches that destruction by fire is the destiny of the world, and that those who are foolish enough to be poisoned or otherewise murdered by stealth deserve their fate. Pyremius urges his followers to burn those who threaten them, and to murder those who keep them from getting what they want. Pyremius is very popular in the lands ruled by the Scarlet Brotherhood, as well as among assassins and pyromaniacs. His domains are Fire, Destruction and Evil. Favored weapon is the longsword."],
['Ralishaz','Destruction','Trickery',,,true,,,true,,,true,true,true,,true,true,true,true,true,'Old City in Greyhawk',"Ralishaz is the god of chaos, destruction, plagues, and ill luck. He is Chaotic Neutral. His title is the Bringer of Misfortune. Ralishaz is rarely worshipped, but many people pay occasional homage to him to avoid plagues and droughts. His domains are Chaos, Destruction, Luck, and Trickery. His favored weapon is the mace."],
['Rao','Knowledge','Healing',true,true,,true,,,,,,true,true,,true,true,true,true,true,'River Quarter / Clerksburg in Greyhawk',"Rao is the god of peace, reason and serenity. He is Lawful Good. His title is the Peaceful One. Rao is often seen as a comforter and a peacemaker and is friend to those who would seek a solution through discussion rather than arms. Monks are found among his worshipers as well. His domains are Good, Knowledge, and Law. He has no favored weapon."],
['Sehanine Moonbow','Travel','Trickery',,,true,,,true,,,,,true,,,true,,,,'Southeast corner of Darkwood Forest',"Sehanine Moonbow is the Elven goddess of the Moons. The Lady of Dreams actively opposes the nefarious schemes of the Spider Queen and the other drow powers. She is said to be the wife of Corellon Larethian. Her domains include Travel and Trickery. Her preferred weapon is the Moonstaff (quarterstaff). Her symbol is a full moon topped by a crescent-shaped haze."],
['Sotillion','Air','Healing',,,true,,,true,,,,true,true,,true,true,true,true,true,'Isle of Ruskis.  Passage can be booked at the Docks of Greyhawk',"Sotillion is the goddess of summer, the south wind, ease and comfort. She is Chaotic Good. Her title is the Summer Queen. She is often worshipped by high society. The occasional adventurer will worship her as some believe that to truly enjoy the good life, one has to undergo hardships. Her domains are Air, Good, Healing, and Plant. Favored weapon is the net."],
['St. Cuthbert','Destruction','Strength',true,,,true,,,,,,,true,,,true,,,true,'High Quarter in the City of Greyhawk and the Village of Hommlet',"Saint Cuthbert is the god of retribution. He is Lawful Neutral. He is known as St. Cuthbert of the Cudgel. He exacts revenge and just punishment on those who transgress the law. Since evil creatures most often violate the law, he favors those of good a bit more than those of evil. His domains are Destruction, Law, Protection, and Strength. Favored weapon is the mace."],
['Tiamat','Destruction','Evil',,,,,,,true,true,,true,true,,true,true,true,true,true,'Southern cave near the entrance of the Kobold Lands',"Tiamat is the Queen of Evil Dragons. She is Lawful Evil. Like Bahamut, her rival, Tiamat is revered in many locales. Those who most typically worship her are the green and blue dragons. She urges her followers to spread evil, destroy good, and propagating evil dragons. She is a villain that works from the shadows, her presence often felt but seldom seen. Her following is even smaller than that of Bahamut, and the few shrines she does have are usually found in gloomy caverns. Her domains are Destruction, Evil, Law, and Trickery. Favored weapon is the Claw."],
['Wee Jas','Death','Magic',true,,,true,,,true,,,,true,,,true,,,true,'High Quarter in the City of Greyhawk',"Wee Jas is the goddess of death and magic. She is Lawful Neutral. Her titles are Witch Goddess, Ruby Sorceress, Stern Lady, and Death's Guardian. She is a demanding goddess who expects obedience from her followers. There are few temples to Wee Jas, but many powerful sorcerers and wizards are among here followers. Her domains are Death, Law, and Magic. Favored weapon is the dagger."],
['Yondalla','Good','Protection',true,true,,true,,,,,,,,,,,,true,,'Borderkeep',"Yondalla is the goddess of halflings. She is Lawful Good. Her titles include the Protector and Provider, the Nurturing Matriarch, and the Blessed One. Her followers hope to lead a safe, prosperous life. Her domains are Good, Law, and Protection. Favored weapon is the short sword."],
]

function Initialize()
{
}

function getRadioSelection(radioObject) {
	var radioLength = radioObject.length;
	for(var i = 0; i < radioLength; i++) {
		if(radioObject[i].checked) {
			return(radioObject[i].value)
		}
	}
}

function Search()
{
	intNumOfResults=0;
	strRaceSelected=getRadioSelection(document.frmMain.race);
	strAlignmentSelected=getRadioSelection(document.frmMain.alignment);
	strDomainSelected=getRadioSelection(document.frmMain.domain);

	for (y=12; y<21; y++)
	{
		if (strRaceSelected!="Any")
		{
			if (strRaceSelected==arrDeities[0][y])
			{
				intRaceSelected=y;
			}
		}
		else
		{
			intRaceSelected=0;
		}
	}

	for (y=3; y<12; y++)
	{
		if (strAlignmentSelected!="Any")
		{
			if (strAlignmentSelected==arrDeities[0][y])
			{
				intAlignmentSelected=y;
			}
		}
		else
		{
			intAlignmentSelected=0;
		}
	}

	strdisplay="<fieldset><legend>Search Results:  Alignment:  "+strAlignmentSelected+".  Race:  "+strRaceSelected+".  Domain:  "+strDomainSelected+".</legend>";
	for (x=1; x<32; x++)
	{
		if (arrDeities[x][intRaceSelected] && arrDeities[x][intAlignmentSelected])
		{
			if (strDomainSelected=="Any" || arrDeities[x][1]==strDomainSelected || arrDeities[x][2]==strDomainSelected)
			{
				Display(x);
				intNumOfResults++;
			}
		}
	}

	if (intNumOfResults==0)
	{
		strdisplay+="No Results Found";
	}

	strdisplay+="</fieldset>";
	document.getElementById("divsearchresults").innerHTML=strdisplay;
}

function Display()
{
	//Deity Name
	strdisplay+="<span class='header'>"+arrDeities[x][0]+"</span><br />";

	//Domain
	strdisplay+="<span class='content'>Required Domains:  "
	strdisplay+="<a href='http://nwn.wikia.com/wiki/"+arrDeities[x][1]+"_domain' target='_blank'>"+arrDeities[x][1]+"</a>.  "
	strdisplay+="<a href='http://nwn.wikia.com/wiki/"+arrDeities[x][2]+"_domain' target='_blank'>"+arrDeities[x][2]+"</a>."
	strdisplay+="</span><br />";

	//Race(s)
	strdisplay+="<span class='content'>Race(s):  ";
	for (y=12; y<20; y++)
	{
		if (arrDeities[x][y])
		{
			strdisplay+=arrDeities[0][y]+".  ";
		}
	}
	strdisplay+="</span><br />";

	//Alignments
	strdisplay+="<span class='content'>Alignment(s):  ";
	for (y=3; y<12; y++)
	{
		if (arrDeities[x][y])
		{
			strdisplay+=arrDeities[0][y]+".  ";
		}
	}
	strdisplay+="</span><br />";

	//Temple Locations
	strdisplay+="<span class='content'>Temple Location:  "+arrDeities[x][20]+"</span><br />";

	//Description
	strdisplay+="<span class='content'><br />"+arrDeities[x][21]+"</span><br /><br />";
}

