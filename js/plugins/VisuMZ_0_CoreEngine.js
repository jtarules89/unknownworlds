//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.13] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB wait: Time Progress Battle (Wait)
 *     - -
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Outline Color:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 *
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @max 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @max 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @max 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @max 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"2","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"NameInput":"","EnableNameInput:eval":"true","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress the \\\\c[5]arrow keys\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFromt(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Outline Color
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress the \\c[5]arrow keys\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0] to use to keyboard."
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x4ac1=['XUDcp','CoreEngine','OutlineColor','_stored_deathColor','Sprite_Button_initialize','ImprovedAccuracySystem','imageSmoothingEnabled','min','gaugeHeight','drawGameVersion','XParamVocab1','button','FontSize','_shouldPreventDefault','Game_Actor_paramBase','InputBgType','playMiss','WIN_OEM_FINISH','picture','WIN_OEM_COPY','TitleCommandList','startShake','getButtonAssistLocation','goldWindowRect','itemHit','JCOwk','buttonAssistOffset4','IconXParam3','faces','CONTEXT_MENU','changeClass','inbounce','buttonAssistOk','text','parameters','isNextScene','targetScaleX','WindowLayer_render','printError','wholeDuration','catchNormalError','ARRAYNUM','isItemStyle','buttonAssistKey2','yedHO','VisuMZ_2_BattleSystemSTB','Window_Base_drawCharacter','NUMPAD5','sin','qeONV','wkyFj','hideButtonFromView','QUESTION_MARK','Scene_MenuBase_mainAreaTop','BoxMargin','isKeyItem','contentsOpacity','IconParam0','itemWindowRect','vertical','Input_clear','bEnVa','expGaugeColor1','batch','CallHandlerJS','aAZTx','isBeingTouched','ATK','mJVhG','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','updateCoreEasing','HiVQj','GcSbo','_defaultStretchMode','setClickHandler','hit','scaleMode','DamageColor','traitObjects','Window_Base_drawIcon','isArrowPressed','ParseTilesetNotetags','cVkxE','_lastPluginCommandInterpreter','cTtrr','ZOOM','determineSideButtonLayoutValid','SParamVocab8','isOpen','_context','GoldBgType','SellRect','isNwjs','playTestF7','exit','MAXHP','xparamPlus1','WIN_OEM_ATTN','updateFauxAnimations','createCancelButton','EnableJS','COLON','makeTargetSprites','fAuwh','setActorHomeRepositioned','Renderer','font-smooth','VOLUME_UP','loadWindowskin','successRate','WIN_OEM_ENLW','SHIFT','filters','eSfQH','Game_Screen_initialize','makeEncounterCount','_hideButtons','PA1','GameEnd','INQUART','laSpr','_repositioned','Input_onKeyDown','ALWAYS','SideView','initialize','IconSParam5','updateKeyText','onMouseExit','processTimingData','battlebacks2','height','volume','areButtonsOutsideMainUI','qlwgJ','CDUko','processTouchModernControls','sv_enemies','BACK_QUOTE','StatusParamsBgType','WVPYh','itemBackColor1','_pagedownButton','SParamVocab1','GDCnK','cUtCs','PGDN','Scene_Menu_create','EjGLm','version','ItemBackColor2','CrisisRate','Linear','areTileShadowsHidden','darwin','setActionState','sparamPlusJS','titles2','BACK_SLASH','LevelUpFullMp','ActorHPColor','Scene_Base_createWindowLayer','_realScale','mainAreaHeight','_screenX','type','SLEEP','IconXParam1','F16','RowSpacing','Icon','Duration','Window_Selectable_processCursorMove','none','xparamFlat2','helpWindowRect','_moveEasingType','loadPicture','prototype','_cache','_coreEasing','F23','VOLUME_MUTE','useDigitGroupingEx','TILDE','right','_CoreEngineSettings','update','waiting','Scene_GameEnd_createBackground','sparamPlus2','isMaskingEnabled','CLOSE_CURLY_BRACKET','addChild','mTEYF','WeBbp','smoothSelect','HGnsp','_baseTexture','match','push','updatePositionCoreEngineShakeRand','dVCSq','ysfrg','updateOrigin','Window_Selectable_processTouch','erasePicture','_stored_ctGaugeColor1','_stored_powerUpColor','updateOpacity','HBxmA','_menuButton','isHandled','bgsVolume','UKcQp','LoadError','drawGameSubtitle','PictureEasingType','rqbfX','KFZuQ','numActions','ParseAllNotetags','paramY','setSideButtonLayout','mainAreaHeightSideButtonLayout','BlurFilter','name','isRepeated','Gold','setAction','numberWindowRect','TextFmt','Sprite_Picture_updateOrigin','EJDqR','exp','applyCoreEasing','buttonAssistText2','avuXB','ExtJS','cancel','ReSWF','_digitGrouping','forceOutOfPlaytest','Padding','addLoadListener','initCoreEngine','wZEHH','Game_Action_itemEva','paramName','makeFontSmaller','MAXMP','_centerElementCoreEngine','MEpas','helpAreaTopSideButtonLayout','boxWidth','option','_helpWindow','iFSvc','innerHeight','KRzne','powerDownColor','_storedStack','bind','_numberWindow','platform','ParseActorNotetags','KeyItemProtect','ParseArmorNotetags','_stored_tpCostColor','retreat','isCancelled','setHome','style','_number','processKeyboardDigitChange','toLowerCase','_hideTileShadows','TosLG','isOpenAndActive','dQvxs','Game_Interpreter_command355','mmp','IconXParam6','_setupEventHandlers','destroyCoreEngineMarkedBitmaps','processAlwaysEscape','processKeyboardBackspace','inBattle','Plus1','FHGZz','isTriggered','reservePlayTestNewGameCommonEvent','ParseWeaponNotetags','ColorMaxLvGauge2','get','buttonAssistWindowSideRect','_dimmerSprite','strokeRect','itemSuccessRate','ParamChange','currencyUnit','commandWindowRect','rEhiG','sv_actors','save','Window','equips','vuOpT','SceneManager_initialize','isAnimationForEach','Location','WIN_OEM_FJ_MASSHOU','_itemWindow','ColorCrisis','KANA','processCursorMove','Spriteset_Battle_createEnemies','drawCurrentParam','Control\x20Variables\x20Script\x20Error','StatusMenu','isPressed','calcCoreEasing','onKeyDownKeysF6F7','refresh','setupCoreEasing','F11','openness','BattleManager_processEscape','sparamFlat2','isRightInputMode','PictureFilename','loadGameImagesCoreEngine','DimColor2','itemHitImprovedAccuracy','EISU','ImgLoad','normal','EVA','QUmzl','hvEQx','LoadMenu','ItemStyle','itemRect','tpGaugeColor2','_changingClass','pageup','paramFlatBonus','clone','charCode','_stored_ctGaugeColor2','Scene_Equip_create','HelpRect','RQKzn','ACCEPT','Total','targetBackOpacity','includes','children','blxtu','OAzEM','createCustomParameter','INOUTEXPO','yoqlk','StatusBgType','displayX','mev','RiOvS','measureTextWidth','NUMPAD6','_animation','GoldMax','F6key','FontShadows','title','_forcedTroopView','INEXPO','Plus2','YNRgL','Window_Base_update','Window_NumberInput_processDigitChange','getCustomBackgroundSettings','destroy','dwOJf','VdRaX','worldTransform','pTTdw','replace','ShowJS','ColorHPGauge2','OPEN_BRACKET','EXECUTE','_coreEngineShakeStyle','Graphics_printError','level','SParameterFormula','xiJlz','MRF','NUM_LOCK','IconSParam4','MDF','ctGaugeColor2','cursorPagedown','Plus','Rqdym','loadTitle2','refreshDimmerBitmap','targetContentsOpacity','xdg-open','OXHqY','EsijG','_stored_tpGaugeColor2','Graphics_defaultStretchMode','AutoStretch','xparamRateJS','_playtestF7Looping','background','OS_KEY','phDxo','buttonAssistOffset1','_colorCache','EQUAL','VOLUME_DOWN','INBOUNCE','characters','ButtonAssist','TRAIT_PARAM','FadeSpeed','HCnwg','_isPlaytest','SlotRect','Sprite_Actor_setActorHome','move','encounterStepsMinimum','SCROLL_LOCK','vscMl','Game_BattlerBase_refresh','csnDk','createEnemies','FaPvG','mainFontSize','MenuLayout','isClosed','drawParamText','Sprite_destroy','IconSParam2','MAX_SAFE_INTEGER','_digitGroupingEx','UicYA','Scene_Boot_updateDocumentTitle','adjustSprite','CEV','setSkill','open','OPEN_CURLY_BRACKET','stencilOp','ZnwVm','Script\x20Call\x20Error','BackOpacity','isFullDocumentTitle','smallParamFontSize','gGMUc','luiNl','LGOpm','atbActive','updatePositionCoreEngine','ItemBgType','_customModified','ColorTPCost','drawCurrencyValue','createChildSprite','_opening','hVHzD','listWindowRect','isPlaytest','length','isUseModernControls','startNormalGame','_stored_powerDownColor','EXR','Window_NameInput_cursorPageup','paramchangeTextColor','EscapeAlways','Game_Temp_initialize','NameInputMessage','randomInt','ButtonHeight','Window_NameInput_cursorLeft','note','tpGaugeColor1','Scene_Boot_loadSystemImages','_actor','opacity','anchorCoreEasing','kmmxZ','CTRL','KruJW','vkrJh','fadeSpeed','CeDue','HASH','GoldChange','ColorDeath','width','gold','lIJUn','reduce','skipBranch','dbPKY','ColorNormal','setFrame','xWiQc','isNumpadPressed','animations','toLocaleString','IconSParam3','FDR','OptionsBgType','_mainSprite','GroupDigits','_cancelButton','CTB','createJsQuickFunction','ItemRect','wMNRX','GoaQN','Window_NameInput_processTouch','targetSpritePosition','skillId','isItem','Tilemap_addShadow','IconParam5','makeDocumentTitle','drawCharacter','_mp','Abbreviation','_dummyWindow','DECIMAL','currentExp','mpCostColor','isSpecialCode','_stored_mpCostColor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','NumberRect','updateTransform','LzHTd','MEV','_internalTextures','XtxkO','F22','Sprite_Battler_startMove','IconParam6','updatePlayTestF7','SystemSetSideView','OMnTE','RepositionActors','blt','HRG','_data','process_VisuMZ_CoreEngine_Notetags','CONVERT','Window_Base_drawText','_drawTextShadow','%2%1%3','isCollidedWithEvents','DummyBgType','(\x5cd+)>','Window_NameInput_cursorRight','Game_Actor_changeClass','makeFontBigger','gTgia','Wait','uAAaB','#%1','rowSpacing','VisuMZ_2_BattleSystemCTB','statusWindowRect','getBackgroundOpacity','removeChild','process_VisuMZ_CoreEngine_RegExp','AccuracyBoost','SPACE','sqrt','Window_ShopSell_isEnabled','keyboard','BaseTexture','OUTCIRC','ColorHPGauge1','ScwPt','ForceNoPlayTest','animationShouldMirror','XParamVocab4','drawActorExpGauge','Flat1','contentsBack','SCALE_MODES','CIRCUMFLEX','BuyBgType','parse','JUNJA','Game_Action_updateLastTarget','updateMainMultiply','Window_StatusBase_drawActorLevel','INOUTQUINT','context','ColorMaxLvGauge1','expGaugeColor2','INOUTSINE','dimColor1','CodeJS','transform','hztMX','_fauxAnimationQueue','ColorCTGauge2','PixelateImageRendering','_tempActor','fillRect','setAnchor','subject','getLastPluginCommandInterpreter','gysbU','Enable','down','Type','FUNC','makeActionList','PRINTSCREEN','powerUpColor','YmnOC','PLUS','setSideView','keyMapper','outbounce','_listWindow','ShopMenu','currentValue','oBkzT','buttonAssistWindowRect','xparamPlus','JWABM','MultiKeyFmt','buttonAssistText4','bJZkm','buttonAssistText%1','VCHcW','JwOIC','_mode','MAT','_onKeyDown','render','param','_shakeSpeed','OUTELASTIC','DigitGroupingGaugeSprites','titles1','_shakePower','RegExp','maxLvGaugeColor1','currentClass','createTextState','DEF','uosEX','vwiQw','F19','gaugeRate','drawGauge','(\x5cd+)([%％])>','onClick','Window_Gold_refresh','removeFauxAnimation','NONCONVERT','ColorMPGauge1','CustomParamAbb','nickname','targetScaleY','miUqS','pictures','pictureId','guardSkillId','Scene_Item_create','Sprite_Gauge_gaugeRate','tpCostColor','isSmartEventCollisionOn','Param','OoeaW','pixelated','_stored_maxLvGaugeColor1','Scene_Map_updateMainMultiply','INBACK','updatePositionCoreEngineShakeVert','UxSQK','XParamVocab3','ColorMPCost','keypress','wait','isNormalPriority','asin','_drawTextOutline','ColorExpGauge1','NUMPAD0','markCoreEngineModified','catchLoadError','sparamRate1','command122','initButtonHidden','EndingID','IGrjf','hide','aKqtw','_targetOffsetY','SceneManager_onKeyDown','isExpGaugeDrawn','shift','updatePadding','hpColor','keyCode','BgFilename1','_statusEquipWindow','textSizeEx','LnDmx','ColorExpGauge2','drawActorLevel','pop','Window_NameInput_processHandling','drawItem','Game_Picture_updateMove','IconSet','FunctionName','initCoreEngineScreenShake','TimeProgress','buttonAssistWindowButtonRect','NUMPAD3','Window_Selectable_drawBackgroundRect','HYPHEN_MINUS','_pageupButton','_maxDigits','rkjXB','cursorRight','SCnRw','encounterStep','xparamRate1','jqcnq','WIN_OEM_FJ_LOYA','tBxbg','initBasic','SystemSetWindowPadding','AXYoW','_backgroundFilter','anchor','PictureEraseRange','GREATER_THAN','drawActorClass','split','traitsPi','MAX_GL_TEXTURES','Sprite_Button_updateOpacity','OUTQUART','STRUCT','XqrDY','ENTER_SPECIAL','OLdyH','textWidth','FlLbk','drawBackgroundRect','start','ModernControls','uDLnC','pictureButtons','cursorUp','yiSHU','maxCols','EquipMenu','_movementWholeDuration','KSuXc','StartID','bPgFE','img/%1/','isBottomHelpMode','itemBackColor2','optSideView','animationId','setBattleSystem','QqLpD','WIN_OEM_CUSEL','Csbwn','Flat','performEscape','onButtonImageLoad','setBackgroundOpacity','ShowButtons','clamp','CancelText','_registerKeyInput','translucentOpacity','OUTQUINT','paramPlusJS','SideButtons','buttonAssistOffset%1','itypeId','cos','backspace','isMVAnimation','DigitGroupingLocale','NUMPAD4','defineProperty','loadSystem','endAnimation','Scene_Map_createMenuButton','BACKSPACE','HRKmN','addCommand','terms','focus','max','onDatabaseLoaded','xparam','XParameterFormula','animationBaseDelay','Window_Base_textSizeEx','ZRsGf','stop','Ziloh','buttonAssistCancel','areButtonsHidden','ShowItemBackground','QoL','gainGold','_buttonAssistWindow','updateMain','checkSmartEventCollision','en-US','ShowDevTools','JSON','result','createFauxAnimation','TeXBc','Game_Actor_levelUp','destroyed','OUTBACK','F21','INOUTBACK','Game_Troop_setup','blockWidth','Window_NameInput_initialize','onKeyDown','switchModes','updateDocumentTitle','pagedown','buttonAssistKey4','_backgroundSprite','contains','pow','mNkko','command357','ColorSystem','seVolume','DisplayedParams','OPEN_PAREN','RightMenus','maxLevel','F17','backOpacity','Layer','_inputSpecialKeyCode','process_VisuMZ_CoreEngine_CustomParameters','SEPARATOR','ParseClassNotetags','moveCancelButtonSideButtonLayout','parallaxes','enemy','cxlig','Window_Base_initialize','skillTypeWindowRect','iconWidth','NameMenu','wKilM','WIN_OEM_BACKTAB','PictureEraseAll','flush','harUh','CommandWidth','expRate','NoTileShadows','fillText','setWindowPadding','isSideView','INQUINT','BlTSQ','select','mBgLk','MDR','_hp','originalJS','isSideButtonLayout','setupNewGame','_offsetY','drawValue','snapForBackground','isMagical','SVFqq','gaugeLineHeight','evaded','targetOpacity','lsqSV','rhBLu','buttonAssistText5','QUOTE','XParamVocab8','vFvzf','setEnemyAction','Fpwvi','mirror','STR','IconParam4','SParamVocab2','levelUp','buttonAssistSwitch','Window_NameInput_cursorPagedown','_playTestFastMode','TRG','addEventListener','DigitGroupingDamageSprites','SkillMenu','Spriteset_Base_destroy','LbNhh','vRVVX','Scene_Options_create','RIGHT','createCustomBackgroundImages','targetY','titleCommandWindow','paramX','calcEasing','Scene_MenuBase_helpAreaTop','fnkuv','CreateBattleSystemID','HCzFB','Bitmap_measureTextWidth','isBusy','_backSprite1','DataManager_setupNewGame','JcSEE','CategoryRect','nextLevelExp','processBack','Rate','mpGaugeColor1','SNuJa','Page','mute','gradientFillRect','_coreEasingType','_bitmap','contents','repositionCancelButtonSideButtonLayout','SkillTypeBgType','cursorLeft','toString','qWKJW','CLOSE_PAREN','startAutoNewGame','key%1','evade','Scene_MenuBase_mainAreaHeight','RvIvd','targetX','ARRAYSTR','NUMPAD8','IconSParam8','TextManager_param','ConvertParams','ColorTPGauge2','DummyRect','Scene_Unlisted','SLASH','round','text%1','slice','_goldWindow','buttonAssistKey%1','resize','ProfileBgType','FZkJr','wREHV','isWindowMaskingEnabled','filter','makeCommandList','system','yScrollLinkedOffset','SParamVocab4','Scene_MenuBase_createBackground','Scene_Shop_create','awGUb','targetEvaRate','sCiwQ','GGTiF','TcIKe','Game_BattlerBase_initMembers','Untitled','log','ZzEFa','SEMICOLON','crisisColor','yWKMQ','zCPEb','PIPE','isMapScrollLinked','paramFlatJS','IconParam1','oBFsM','setCoreEngineScreenShakeStyle','ScreenShake','advanced','bitmap','0.00','uqYVJ','SUBTRACT','ParamArrow','Flat2','_stored_hpGaugeColor2','Scene_Battle_createCancelButton','IazEp','Window_Base_createTextState','changeTextColor','normalColor','initVisuMZCoreEngine','process_VisuMZ_CoreEngine_Settings','TranslucentOpacity','top','processEscape','ApplyEasing','stypeId','Rate1','rightArrowWidth','_sideButtonLayout','helpAreaHeight','_sellWindow','_slotWindow','horzJS','process_VisuMZ_CoreEngine_Functions','test','ConvertNumberToString','sparamRate','paramRateJS','blendFunc','CustomParamNames','helpAreaTop','HELP','_actorWindow','hvMXF','JvxHX','Rate2','Ywuzb','NAByy','levelUpRecovery','menu','EQUALS','AntiZoomPictures','resetBattleSystem','Bitmap_drawTextOutline','seEqR','phoRk','Game_Picture_y','_anchor','ALTGR','adjustBoxSize','Sopfn','abs','toFixed','XParamVocab5','_stored_mpGaugeColor1','Game_Action_itemHit','kGtOk','constructor','createFauxAnimationSprite','makeDeepCopy','Game_Character_processMoveCommand','show','SkillTypeRect','_inputString','IconParam2','_screenY','enemies','altKey','Color','description','AjYye','clear','hpGaugeColor2','dXppL','setLastPluginCommandInterpreter','Sprite_Gauge_currentValue','_stored_pendingColor','_statusParamsWindow','processTouch','fdwtU','STENCIL_BUFFER_BIT','_encounterCount','Scene_Boot_onDatabaseLoaded','movePageButtonSideButtonLayout','Window_NumberInput_start','meVolume','updateLastTarget','GetParamIcon','isEnabled','vertJS','<JS\x20%1\x20%2:[\x20](.*)>','format','PQANi','textColor','OfibG','XParamVocab2','padding','initDigitGrouping','OptionsMenu','erBTn','updateClose','paramRate1','Game_Picture_initBasic','_isWindow','IconSParam6','BgFilename2','INQUAD','oImpe','drawGameTitle','boxHeight','RequireFocus','ctGaugeColor1','_commandList','woBmU','default','LESS_THAN','commandWindowRows','outlineColor','setBackgroundType','onMoveEnd','INSINE','_destroyInternalTextures','isActor','NUMPAD7','_stored_expGaugeColor1','paramMax','uiAreaHeight','TNrAn','WIN_OEM_PA3','VzbVf','loadTitle1','paramBase','index','ListRect','Graphics','createPageButtons','colSpacing','GoldRect','escape','Window_NameInput_refresh','PDR','faceHeight','CustomParam','integer','qSOCz','KeyboardInput','F12','BgType','Game_Interpreter_command111','getColorDataFromPluginParameters','OUTQUAD','optionsWindowRect','loadSystemImages','left','learnings','paramValueByName','_paramPlus','BuyRect','isCursorMovable','processFauxAnimationRequests','value','_muteSound','actorWindowRect','paramRate2','pendingColor','AGI','updateMove','WIN_OEM_JUMP','clearZoom','F10','scale','popScene','call','Speed','ButtonFadeSpeed','cancelShowButton','sparamFlatBonus','ENTER','ARXIY','XVLWF','xparamFlat1','HelpBgType','layoutSettings','RPORa','playCursor','_optionsWindow','child_process','getCoreEngineScreenShakeStyle','ZsjTS','Bitmap_drawCircle','stringKeyMap','applyForcedGameTroopSettingsCoreEngine','BuAiF','lineHeight','enter','TAB','xJUtf','URL','updatePositionCoreEngineShakeOriginal','attackSkillId','playCursorSound','PRINT','nNYAb','apply','drawTextEx','updateOpen','_onKeyPress','floor','faceWidth','Window_NameInput_cursorUp','lkHgS','wISxc','OnLoadJS','MINUS','categoryWindowRect','HOOZw','reserveCommonEvent','moveRelativeToResolutionChange','PreserveNumbers','AcpRU','Game_Picture_x','Bitmap_resize','valueOutlineWidth','END','DOWN','setupCoreEngine','resetFontSettings','blXMW','getInputButtonString','INCUBIC','qIgTs','cbyKR','dmiCF','INOUTQUAD','statusParamsWindowRect','cursorPageup','Game_System_initialize','updatePositionCoreEngineShakeHorz','_offsetX','makeInputButtonString','Bitmap_fillRect','DTB','createFauxAnimationQueue','battleSystem','ColorTPGauge1','bitmapWidth','create','eqXqY','IconXParam9','applyEasing','paramBaseAboveLevel99','Window_Base_drawFace','NewGameCommonEvent','SceneManager_isGameActive','startAnimation','ParamName','deHMX','statusEquipWindowRect','IconXParam5','Spriteset_Base_updatePosition','processCursorHomeEndTrigger','TextJS','LineHeight','WHYLb','DocumentTitleFmt','FWvRU','fUvig','IconSParam7','itemPadding','YoWnM','Version','EncounterRateMinimum','DOUBLE_QUOTE','dQFin','KEEP','JXeRK','sjNoA','mrGzW','NumberBgType','ARRAYJSON','isClickEnabled','ZdKap','Window_StatusBase_drawActorSimpleStatus','gaugeBackColor','EVAL','SParamVocab5','FWmnL','F14','LevelUpFullHp','Game_Party_consumeItem','Title','subjectHitRate','Input_shouldPreventDefault','ltJhM','BattleSystem','_shakeDuration','LEFT','_stored_mpGaugeColor2','EditBgType','_inputWindow','scaleSprite','XParamVocab6','ZIeSo','_pressed','canUse','rlrFn','ActorMPColor','setCoreEngineUpdateWindowBg','hvvRX','createBackground','OSgSG','Hgmhd','mainAreaTopSideButtonLayout','XParamVocab0','NUMPAD9','shake','moveMenuButtonSideButtonLayout','KDnqo','Input_setupEventHandlers','process_VisuMZ_CoreEngine_jsQuickFunctions','Game_Picture_calcEasing','enable','consumeItem','buttonAssistOffset2','usableSkills','backgroundBitmap','buttonAssistText1','StatusEquipRect','parseForcedGameTroopSettingsCoreEngine','openURL','ayVlN','drawRightArrow','clearCachedKeys','Scene_Status_create','openingSpeed','RSOLn','renderNoMask','buttonAssistText3','ParseItemNotetags','checkCacheKey','resetTextColor','itemLineRect','IconParam7','_pictureContainer','ParseEnemyNotetags','CjEQx','mainCommandWidth','Scene_Boot_startNormalGame','setTargetAnchor','INCIRC','visible','IconXParam4','createButtonAssistWindow','createTitleButtons','agYyG','iconHeight','drawIcon','drawGoldItemStyle','Spriteset_Base_initialize','DELETE','MCR','isPlaying','tilesets','LATIN1','addWindow','PERCENT','PERIOD','ColorManager_loadWindowskin','QAHpQ','setMoveEasingType','useDigitGrouping','stretch','CgwUZ','_statusWindow','currentLevelExp','WIN_OEM_FJ_ROYA','drawSegment','GoldIcon','_editWindow','createMenuButton','innerWidth','numberShowButton','HANJA','Conditional\x20Branch\x20Script\x20Error','paramPlus','DimColor1','Bitmap_strokeRect','members','ActorRect','_blank','STENCIL_TEST','ARRAYEVAL','clearRect','OUcjx','isActiveTpb','RepositionEnemies','Scene_Skill_create','initialBattleSystem','repositionEnemiesByResolution','sparamRate2','WIN_OEM_AUTO','isTouchedInsideFrame','setHandler','TPB\x20ACTIVE','processKeyboardDelete','isMenuButtonAssistEnabled','_backSprite2','processDigitChange','PLAY','buttonAssistKey3','Spriteset_Base_update','isTpb','enableDigitGrouping','Symbol','ActorBgType','_closing','stencilFunc','_clickHandler','EXCLAMATION','DrawItemBackgroundJS','_profileWindow','clearForcedGameTroopSettingsCoreEngine','home','createDigits','KaVUP','drawCircle','IconSParam9','initMembers','CustomParamIcons','pPGoF','easingType','PHA','_fauxAnimationSprites','disable','drawFace','cmNnz','fontSize','CustomParamType','getBattleSystem','itemHeight','makeCoreEngineCommandList','processMoveCommand','ColSpacing','number','CnIGV','Bitmap_drawText','onNameOk','active','windowPadding','maxLvGaugeColor2','wLYYi','Mryxp','maxItems','IconXParam0','iqvsb','Sprite_Animation_processSoundTimings','_spriteset','enableDigitGroupingEx','setMute','drawIconBySize','IMFVk','GQATt','LUK','NUMPAD2','paramMaxJS','SaveMenu','setActorHome','LINEAR','_categoryWindow','NfoXA','catchException','CategoryBgType','OUTSINE','missed','OZPaU','STB','setGuard','toUpperCase','xparamFlatBonus','startMove','SParamVocab7','HIT','ListBgType','(\x5cd+\x5c.?\x5cd+)>','isBottomButtonMode','mORLH','drawText','clearStencil','updateAnchor','BasicParameterFormula','SnapshotOpacity','_stored_crisisColor','win32','buttonAreaHeight','DigitGroupingStandardText','_CoreEngine_Cache_textSizeEx','_buttonType','uwrzD','Game_Interpreter_command122','VBReF','ZERO','processCursorMoveModernControls','exec','onMouseEnter','_hovered','_centerElement','CommandRect','setupValueFont','isPhysical','ParseSkillNotetags','DATABASE','TextCodeNicknames','Game_Interpreter_PluginCommand','processSoundTimings','evaluate','CRI','randomJS','onEscapeSuccess','GoldFontSize','setEasingType','CaKLt','tileHeight','isInputting','REC','RevertPreserveNumbers','FontSmoothing','duration','xparamFlatJS','touchUI','UNDERSCORE','REPLACE','_movementDuration','_duration','Window_NameInput_cursorDown','Scene_Map_initialize','ASTERISK','zPyWu','systemColor','QGcpY','OezRF','trim','TextStr','updatePosition','QwertyLayout','setAttack','META','StatusRect','getInputMultiButtonStrings','jsQuickFunc','HLEmw','targets','processHandling','CziQl','eIlfZ','YPCvm','McBfj','CNT','ItemHeight','_isButtonHidden','GRD','wTyJL','playBuzzer','item','Scene_MenuBase_createPageButtons','terminate','AMPERSAND','yvSRd','isOptionValid','Ebsnb','isGameActive','_scene','VfPEA','subtitle','random','ATTN','LmkzP','CmSXR','_addShadow','drawParamName','Scene_Name_create','_windowLayer','_targetOffsetX','makeAutoBattleActions','isReleased','ItemBackColor1','aCzKB','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_targetAnchor','sparamPlus','GoldOverlap','DrawIcons','InputRect','VpLWG','setup','TGR','VisuMZ_1_OptionsCore','maxGold','dummyWindowRect','battlebacks1','fDVXW','ATAgG','Enemy','eventsXyNt','xScrollLinkedOffset','bgmVolume','updateEffekseer','_forcedBattleSys','showFauxAnimations','ParseStateNotetags','removeAllFauxAnimations','WIN_OEM_CLEAR','Bitmap_clearRect','Subtitle','ONE','mpGaugeColor2','yVkBw','_commandWindow','hpGaugeColor1','CRSEL','loadBitmap','Window_Selectable_itemRect','MULTIPLY','Yfvun','sparam','playOk','registerCommand','setMainFontSize','playTestF6','Scene_Battle_update','setSize','ColorPowerDown','SQxPN','nw.gui','Graphics_centerElement','buttonAssistOffset5','skills','ColorGaugeBack','PositionJS','TPB\x20WAIT','Settings','getLevel','ValueJS','command111','TCR','params','map','requestFauxAnimation','targetObjects','cursorDown','ProfileRect','isHovered','deathColor','oqcVO','CommandBgType','isAlive','up2','end','image-rendering','Max','MRG','initialLevel','dimColor2','Bitmap_blt','_buyWindow','SParamVocab3','INELASTIC','centerSprite','repeat'];(function(_0x2d9b6a,_0x4ac14c){const _0x492f16=function(_0x53b73d){while(--_0x53b73d){_0x2d9b6a['push'](_0x2d9b6a['shift']());}};_0x492f16(++_0x4ac14c);}(_0x4ac1,0x191));const _0x492f=function(_0x2d9b6a,_0x4ac14c){_0x2d9b6a=_0x2d9b6a-0x0;let _0x492f16=_0x4ac1[_0x2d9b6a];return _0x492f16;};const _0x21bc8a=_0x492f;var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x21bc8a('0x247')](function(_0x43768a){const _0x12b58f=_0x21bc8a;return _0x43768a['status']&&_0x43768a[_0x12b58f('0x2ab')][_0x12b58f('0x666')]('['+label+']');})[0x0];VisuMZ[label][_0x21bc8a('0x4e5')]=VisuMZ[label][_0x21bc8a('0x4e5')]||{},VisuMZ[_0x21bc8a('0x238')]=function(_0x5c6dd0,_0x45757d){const _0x4f5775=_0x21bc8a;for(const _0x425dc5 in _0x45757d){if(_0x425dc5[_0x4f5775('0x5c9')](/(.*):(.*)/i)){const _0x471554=String(RegExp['$1']),_0x2c5ec2=String(RegExp['$2'])['toUpperCase']()[_0x4f5775('0x482')]();let _0x84362d,_0x144ac8,_0x325498;switch(_0x2c5ec2){case'NUM':_0x84362d=_0x45757d[_0x425dc5]!==''?Number(_0x45757d[_0x425dc5]):0x0;break;case _0x4f5775('0x52b'):_0x144ac8=_0x45757d[_0x425dc5]!==''?JSON[_0x4f5775('0xc4')](_0x45757d[_0x425dc5]):[],_0x84362d=_0x144ac8[_0x4f5775('0x4eb')](_0x14de05=>Number(_0x14de05));break;case _0x4f5775('0x382'):_0x84362d=_0x45757d[_0x425dc5]!==''?eval(_0x45757d[_0x425dc5]):null;break;case _0x4f5775('0x3ed'):_0x144ac8=_0x45757d[_0x425dc5]!==''?JSON[_0x4f5775('0xc4')](_0x45757d[_0x425dc5]):[],_0x84362d=_0x144ac8[_0x4f5775('0x4eb')](_0x154162=>eval(_0x154162));break;case _0x4f5775('0x1ae'):_0x84362d=_0x45757d[_0x425dc5]!==''?JSON[_0x4f5775('0xc4')](_0x45757d[_0x425dc5]):'';break;case _0x4f5775('0x37d'):_0x144ac8=_0x45757d[_0x425dc5]!==''?JSON[_0x4f5775('0xc4')](_0x45757d[_0x425dc5]):[],_0x84362d=_0x144ac8[_0x4f5775('0x4eb')](_0xce57c8=>JSON[_0x4f5775('0xc4')](_0xce57c8));break;case _0x4f5775('0xde'):_0x84362d=_0x45757d[_0x425dc5]!==''?new Function(JSON[_0x4f5775('0xc4')](_0x45757d[_0x425dc5])):new Function('return\x200');break;case'ARRAYFUNC':_0x144ac8=_0x45757d[_0x425dc5]!==''?JSON['parse'](_0x45757d[_0x425dc5]):[],_0x84362d=_0x144ac8['map'](_0x27b221=>new Function(JSON[_0x4f5775('0xc4')](_0x27b221)));break;case _0x4f5775('0x1fe'):_0x84362d=_0x45757d[_0x425dc5]!==''?String(_0x45757d[_0x425dc5]):'';break;case _0x4f5775('0x234'):_0x144ac8=_0x45757d[_0x425dc5]!==''?JSON['parse'](_0x45757d[_0x425dc5]):[],_0x84362d=_0x144ac8[_0x4f5775('0x4eb')](_0x20b77d=>String(_0x20b77d));break;case _0x4f5775('0x163'):_0x325498=_0x45757d[_0x425dc5]!==''?JSON[_0x4f5775('0xc4')](_0x45757d[_0x425dc5]):{},_0x5c6dd0[_0x471554]={},VisuMZ[_0x4f5775('0x238')](_0x5c6dd0[_0x471554],_0x325498);continue;case'ARRAYSTRUCT':_0x144ac8=_0x45757d[_0x425dc5]!==''?JSON[_0x4f5775('0xc4')](_0x45757d[_0x425dc5]):[],_0x84362d=_0x144ac8['map'](_0x2eb6fc=>VisuMZ[_0x4f5775('0x238')]({},JSON[_0x4f5775('0xc4')](_0x2eb6fc)));break;default:continue;}_0x5c6dd0[_0x471554]=_0x84362d;}}return _0x5c6dd0;},(_0x2ad8e2=>{const _0xee93ed=_0x21bc8a,_0x622490=_0x2ad8e2['name'];for(const _0x25fa0a of dependencies){if(!Imported[_0x25fa0a]){alert(_0xee93ed('0x4b0')[_0xee93ed('0x2c1')](_0x622490,_0x25fa0a)),SceneManager['exit']();break;}}const _0x392d03=_0x2ad8e2[_0xee93ed('0x2ab')];if(_0x392d03[_0xee93ed('0x5c9')](/\[Version[ ](.*?)\]/i)){if(_0xee93ed('0x48b')!==_0xee93ed('0x48b')){function _0x21b8e1(){const _0x237662=_0xee93ed;return _0x3053c6[_0x237662('0x503')][_0x237662('0x4e5')][_0x237662('0x2aa')][_0x237662('0x598')];}}else{const _0x65da83=Number(RegExp['$1']);if(_0x65da83!==VisuMZ[label]['version']){if(_0xee93ed('0x3c8')===_0xee93ed('0x25f')){function _0x560429(){this['processKeyboardDigitChange']();}}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x622490,_0x65da83)),SceneManager[_0xee93ed('0x560')]();}}}if(_0x392d03[_0xee93ed('0x5c9')](/\[Tier[ ](\d+)\]/i)){if(_0xee93ed('0x2d7')===_0xee93ed('0x2d7')){const _0x48d1f8=Number(RegExp['$1']);_0x48d1f8<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0xee93ed('0x2c1')](_0x622490,_0x48d1f8,tier)),SceneManager[_0xee93ed('0x560')]()):tier=Math[_0xee93ed('0x19b')](_0x48d1f8,tier);}else{function _0x585610(){const _0x45e883=_0xee93ed;return _0x252f40[_0x45e883('0x503')][_0x45e883('0x4e5')][_0x45e883('0x27')][_0x45e883('0x388')]['CommandRect'][_0x45e883('0x312')](this);}}}VisuMZ[_0xee93ed('0x238')](VisuMZ[label][_0xee93ed('0x4e5')],_0x2ad8e2[_0xee93ed('0x524')]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],'OpenURL',_0xc8f7dc=>{const _0x84a1fa=_0x21bc8a;VisuMZ['ConvertParams'](_0xc8f7dc,_0xc8f7dc);const _0x59b6b5=_0xc8f7dc[_0x84a1fa('0x32b')];VisuMZ[_0x84a1fa('0x3af')](_0x59b6b5);}),PluginManager[_0x21bc8a('0x4d7')](pluginData['name'],_0x21bc8a('0x63'),_0x4a9caf=>{const _0x31ae43=_0x21bc8a;VisuMZ[_0x31ae43('0x238')](_0x4a9caf,_0x4a9caf);const _0x2b6ad0=_0x4a9caf[_0x31ae43('0x306')]||0x0;$gameParty[_0x31ae43('0x1a8')](_0x2b6ad0);}),PluginManager[_0x21bc8a('0x4d7')](pluginData[_0x21bc8a('0x5e4')],_0x21bc8a('0x5db'),_0x5eb933=>{const _0x37ab6b=_0x21bc8a;VisuMZ['ConvertParams'](_0x5eb933,_0x5eb933);const _0x19ef1a=_0x5eb933[_0x37ab6b('0x113')]||0x1,_0x3a00a4=_0x5eb933['easingType']||'Linear',_0x131312=$gameScreen['picture'](_0x19ef1a);_0x131312&&_0x131312[_0x37ab6b('0x46d')](_0x3a00a4);}),PluginManager['registerCommand'](pluginData[_0x21bc8a('0x5e4')],_0x21bc8a('0x1db'),_0x12e8ad=>{const _0x69ec2e=_0x21bc8a;for(let _0x184368=0x1;_0x184368<=0x64;_0x184368++){$gameScreen[_0x69ec2e('0x5d0')](_0x184368);}}),PluginManager[_0x21bc8a('0x4d7')](pluginData[_0x21bc8a('0x5e4')],_0x21bc8a('0x15b'),_0x370ac1=>{const _0x484abb=_0x21bc8a;VisuMZ[_0x484abb('0x238')](_0x370ac1,_0x370ac1);const _0x360039=Math[_0x484abb('0x509')](_0x370ac1[_0x484abb('0x174')],_0x370ac1[_0x484abb('0x12f')]),_0x375db5=Math['max'](_0x370ac1[_0x484abb('0x174')],_0x370ac1['EndingID']);for(let _0x55ed1f=_0x360039;_0x55ed1f<=_0x375db5;_0x55ed1f++){if(_0x484abb('0x543')===_0x484abb('0x5c')){function _0x541dfd(){const _0x42f15a=_0x484abb;switch(_0x4ce5cf['CoreEngine'][_0x42f15a('0x4e5')]['QoL'][_0x42f15a('0xb')]){case _0x42f15a('0x3d9'):return!![];case _0x42f15a('0x652'):return![];default:return _0x348809['CoreEngine'][_0x42f15a('0xa')][_0x42f15a('0x312')](this);}}}else $gameScreen[_0x484abb('0x5d0')](_0x55ed1f);}}),PluginManager['registerCommand'](pluginData['name'],_0x21bc8a('0x261'),_0x794866=>{const _0x2ad77c=_0x21bc8a;VisuMZ['ConvertParams'](_0x794866,_0x794866);const _0x1ed14b=_0x794866[_0x2ad77c('0xdd')]||_0x2ad77c('0x4a3'),_0x3056bd=_0x794866['Power']['clamp'](0x1,0x9),_0x48e016=_0x794866[_0x2ad77c('0x313')][_0x2ad77c('0x184')](0x1,0x9),_0x58e164=_0x794866[_0x2ad77c('0x5ad')]||0x1,_0x5edaa2=_0x794866[_0x2ad77c('0xa9')];$gameScreen[_0x2ad77c('0x260')](_0x1ed14b),$gameScreen[_0x2ad77c('0x517')](_0x3056bd,_0x48e016,_0x58e164);if(_0x5edaa2){if(_0x2ad77c('0x34c')===_0x2ad77c('0x34c')){const _0x18994a=$gameTemp[_0x2ad77c('0xd9')]();if(_0x18994a)_0x18994a[_0x2ad77c('0x124')](_0x58e164);}else{function _0x145e49(){return 0x0;}}}}),PluginManager[_0x21bc8a('0x4d7')](pluginData[_0x21bc8a('0x5e4')],'SystemSetFontSize',_0x5494c4=>{const _0x2d1b24=_0x21bc8a;VisuMZ[_0x2d1b24('0x238')](_0x5494c4,_0x5494c4);const _0xa1408c=_0x5494c4[_0x2d1b24('0x601')]||0x1;$gameSystem[_0x2d1b24('0x4d8')](_0xa1408c);}),PluginManager[_0x21bc8a('0x4d7')](pluginData[_0x21bc8a('0x5e4')],_0x21bc8a('0x97'),_0x2de5ff=>{const _0xf4bf54=_0x21bc8a;if($gameParty[_0xf4bf54('0x621')]())return;VisuMZ['ConvertParams'](_0x2de5ff,_0x2de5ff);const _0x46845e=_0x2de5ff[_0xf4bf54('0x601')];if(_0x46845e[_0xf4bf54('0x5c9')](/Front/i)){if(_0xf4bf54('0x1f6')===_0xf4bf54('0x2e')){function _0x41035e(){const _0x235b7c=_0xf4bf54;this[_0x235b7c('0x1e6')](-0x1);}}else $gameSystem[_0xf4bf54('0xe4')](![]);}else{if(_0x46845e[_0xf4bf54('0x5c9')](/Side/i)){if(_0xf4bf54('0x36f')===_0xf4bf54('0x36f'))$gameSystem[_0xf4bf54('0xe4')](!![]);else{function _0x33a642(){const _0x42022a=_0xf4bf54;_0x3e31c1[_0x42022a('0x503')][_0x42022a('0x11d')]['call'](this),_0x4abef9[_0x42022a('0x204')]&&!_0x247da2[_0x42022a('0x218')]()&&(this['updateMain'](),_0x3f68bd['updateEffekseer']());}}}else{if('mVxIt'===_0xf4bf54('0x5d8')){function _0x1ce171(){const _0x9155e2=_0xf4bf54;this[_0x9155e2('0x620')]();}}else $gameSystem[_0xf4bf54('0xe4')](!$gameSystem['isSideView']());}}}),PluginManager[_0x21bc8a('0x4d7')](pluginData[_0x21bc8a('0x5e4')],'SystemSetBattleSystem',_0x4411e2=>{const _0x30d9cd=_0x21bc8a;if($gameParty[_0x30d9cd('0x621')]())return;VisuMZ['ConvertParams'](_0x4411e2,_0x4411e2);const _0x453426=_0x4411e2[_0x30d9cd('0x601')][_0x30d9cd('0x443')]()[_0x30d9cd('0x482')](),_0x6bd999=VisuMZ[_0x30d9cd('0x503')][_0x30d9cd('0x215')](_0x453426);$gameSystem[_0x30d9cd('0x17b')](_0x6bd999);}),VisuMZ['CoreEngine']['CreateBattleSystemID']=function(_0x1377db){const _0x2b6c86=_0x21bc8a;_0x1377db=_0x1377db||_0x2b6c86('0x464'),_0x1377db=String(_0x1377db)[_0x2b6c86('0x443')]()[_0x2b6c86('0x482')]();switch(_0x1377db){case _0x2b6c86('0x357'):return 0x0;case _0x2b6c86('0x3f9'):if(Imported[_0x2b6c86('0x4b9')]){if('KDnqo'!==_0x2b6c86('0x3a3')){function _0x4219e4(){const _0x21fa5f=_0x2b6c86;_0x53e98e['CoreEngine']['Game_Screen_initialize']['call'](this),this[_0x21fa5f('0x146')]();}}else ConfigManager[_0x2b6c86('0x3e')]=!![];}return 0x1;case _0x2b6c86('0x4e4'):Imported[_0x2b6c86('0x4b9')]&&(ConfigManager[_0x2b6c86('0x3e')]=![]);return 0x2;case _0x2b6c86('0x77'):if(Imported[_0x2b6c86('0xad')]){if(_0x2b6c86('0x593')==='axIKR'){function _0x4cd60f(){const _0x248587=_0x2b6c86;_0x54b5a9[_0x248587('0x503')][_0x248587('0x3f2')][_0x248587('0x312')](this),this['setCoreEngineUpdateWindowBg']();}}else return _0x2b6c86('0x77');}break;case _0x2b6c86('0x441'):if(Imported[_0x2b6c86('0x52f')])return _0x2b6c86('0x441');break;}return $dataSystem[_0x2b6c86('0x359')];},PluginManager['registerCommand'](pluginData[_0x21bc8a('0x5e4')],_0x21bc8a('0x157'),_0x52a770=>{const _0x1f7c4d=_0x21bc8a;VisuMZ[_0x1f7c4d('0x238')](_0x52a770,_0x52a770);const _0x270be5=_0x52a770['option']||0x1;$gameSystem[_0x1f7c4d('0x1e2')](_0x270be5);}),VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x2b8')]=Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x19c')],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x5e7603=_0x21bc8a;VisuMZ[_0x5e7603('0x503')][_0x5e7603('0x2b8')][_0x5e7603('0x312')](this),this[_0x5e7603('0xb1')](),this[_0x5e7603('0x9d')](),this[_0x5e7603('0x270')](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x5e7603('0x1ce')](),VisuMZ[_0x5e7603('0x5df')]();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0xfe')]={},Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0xb1')]=function(){const _0x4d7a04=_0x21bc8a,_0x562297=['MAXHP',_0x4d7a04('0x5fc'),_0x4d7a04('0x545'),_0x4d7a04('0x102'),'MAT','MDF',_0x4d7a04('0x30b'),_0x4d7a04('0x434')],_0x4316a3=[_0x4d7a04('0x447'),_0x4d7a04('0x653'),'CRI',_0x4d7a04('0x31'),_0x4d7a04('0x90'),_0x4d7a04('0x68e'),_0x4d7a04('0x492'),_0x4d7a04('0x9b'),_0x4d7a04('0x4f9'),_0x4d7a04('0x205')],_0x53ddb5=[_0x4d7a04('0x4b8'),_0x4d7a04('0x495'),_0x4d7a04('0x471'),_0x4d7a04('0x415'),_0x4d7a04('0x3ce'),_0x4d7a04('0x4e9'),'PDR',_0x4d7a04('0x1e8'),'FDR',_0x4d7a04('0x4d')],_0x3a9d40=[_0x562297,_0x4316a3,_0x53ddb5],_0x3999d9=[_0x4d7a04('0x1'),_0x4d7a04('0x622'),'Plus2',_0x4d7a04('0x4f8'),_0x4d7a04('0x21f'),'Rate1',_0x4d7a04('0x289'),_0x4d7a04('0x17f'),_0x4d7a04('0xbf'),_0x4d7a04('0x268')];for(const _0xdb3ee3 of _0x3a9d40){let _0x2ffd72='';if(_0xdb3ee3===_0x562297)_0x2ffd72=_0x4d7a04('0xf8');if(_0xdb3ee3===_0x4316a3)_0x2ffd72=_0x4d7a04('0x19d');if(_0xdb3ee3===_0x53ddb5)_0x2ffd72=_0x4d7a04('0x4d5');for(const _0x241586 of _0x3999d9){if('wbcXJ'!==_0x4d7a04('0x330')){let _0x8474de='%1%2'[_0x4d7a04('0x2c1')](_0x2ffd72,_0x241586);VisuMZ['CoreEngine'][_0x4d7a04('0xfe')][_0x8474de]=[],VisuMZ[_0x4d7a04('0x503')][_0x4d7a04('0xfe')][_0x8474de+'JS']=[];let _0x14c8fc='<%1\x20%2:[\x20]';if([_0x4d7a04('0x1'),'Flat']['includes'](_0x241586))_0x14c8fc+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x4d7a04('0x622'),'Flat1'][_0x4d7a04('0x666')](_0x241586)){if(_0x4d7a04('0x459')!==_0x4d7a04('0x459')){function _0x30244d(){const _0x1892dd=_0x4d7a04;if(!this[_0x1892dd('0x304')]())return;_0x132447[_0x1892dd('0x6e')]()?this[_0x1892dd('0x614')]():_0x32751b[_0x1892dd('0x5b4')][_0x1892dd('0x63d')][_0x1892dd('0x312')](this);}}else _0x14c8fc+='([\x5c+\x5c-]\x5cd+)([%％])>';}else{if([_0x4d7a04('0x67a'),_0x4d7a04('0x268')][_0x4d7a04('0x666')](_0x241586)){if(_0x4d7a04('0x662')!==_0x4d7a04('0x92'))_0x14c8fc+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{function _0x4ea6e9(){const _0x395041=_0x4d7a04;return _0x144147[_0x395041('0x587')]()?this[_0x395041('0x39e')]():_0x1dc93d[_0x395041('0x503')][_0x395041('0x537')][_0x395041('0x312')](this);}}}else{if(_0x241586===_0x4d7a04('0x4f8'))_0x14c8fc+=_0x4d7a04('0xa4');else{if(_0x241586===_0x4d7a04('0x276')){if(_0x4d7a04('0x7a')!==_0x4d7a04('0x7a')){function _0x30d1e7(){const _0x1c0ea1=_0x4d7a04;this[_0x1c0ea1('0x351')]();}}else _0x14c8fc+=_0x4d7a04('0x108');}else{if(_0x241586===_0x4d7a04('0x289')){if(_0x4d7a04('0x16f')===_0x4d7a04('0x16f'))_0x14c8fc+=_0x4d7a04('0x449');else{function _0x1526e7(){var _0x34284d=_0x1810c2(_0x4fa06d['$1'])/0x64;_0x4cc9b1*=_0x34284d;}}}}}}}}for(const _0x55f025 of _0xdb3ee3){if('RbYIL'==='RbYIL'){let _0x53a6d6=_0x241586[_0x4d7a04('0x684')](/[\d+]/g,'')['toUpperCase']();const _0x31600f=_0x14c8fc[_0x4d7a04('0x2c1')](_0x55f025,_0x53a6d6);VisuMZ[_0x4d7a04('0x503')][_0x4d7a04('0xfe')][_0x8474de][_0x4d7a04('0x5ca')](new RegExp(_0x31600f,'i'));const _0x19c433=_0x4d7a04('0x2c0')[_0x4d7a04('0x2c1')](_0x55f025,_0x53a6d6);VisuMZ['CoreEngine'][_0x4d7a04('0xfe')][_0x8474de+'JS'][_0x4d7a04('0x5ca')](new RegExp(_0x19c433,'i'));}else{function _0xf9e7c9(){const _0x2a4a65=_0x4d7a04;_0x2321b4[_0x2a4a65('0x503')][_0x2a4a65('0x4c9')][_0x2a4a65('0x312')](this,_0x20838f,_0x1d7a68,_0x45e8b2,_0x2c8944),this[_0x2a4a65('0x12a')]();}}}}else{function _0x5cb4ba(){const _0x1ee08f=_0x4d7a04;this[_0x1ee08f('0x1cd')]=_0x4c9af4[_0x1ee08f('0x139')];let _0x122380=_0x519ca1['fromCharCode'](_0x3e12cf['charCode']);this[_0x1ee08f('0x2a5')]===_0x1f7dc8?this[_0x1ee08f('0x2a5')]=_0x122380:this[_0x1ee08f('0x2a5')]+=_0x122380;}}}}},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x18404f=_0x21bc8a;if(VisuMZ[_0x18404f('0x5df')])return;},Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x270')]=function(){const _0x47088e=_0x21bc8a;if(VisuMZ[_0x47088e('0x503')][_0x47088e('0x4e5')][_0x47088e('0x1a7')]['OpenConsole']){if(_0x47088e('0x5cd')===_0x47088e('0x617')){function _0x35980b(){const _0x41a9c9=_0x47088e;this[_0x41a9c9('0x4c4')]=_0x41a9c9('0x77');}}else VisuMZ[_0x47088e('0x1ad')](!![]);}VisuMZ[_0x47088e('0x503')][_0x47088e('0x4e5')]['QoL'][_0x47088e('0x16b')]&&(Input['keyMapper'][0x23]=_0x47088e('0x4f6'),Input['keyMapper'][0x24]=_0x47088e('0x40c'));},Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x27d')]=function(){const _0x582114=_0x21bc8a;this[_0x582114('0x3a5')]();},Scene_Boot[_0x21bc8a('0x5b4')]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x2b40c=_0x21bc8a,_0x1638ce=VisuMZ[_0x2b40c('0x503')][_0x2b40c('0x4e5')][_0x2b40c('0x48a')];for(const _0x178849 of _0x1638ce){const _0x32bb27=_0x178849[_0x2b40c('0x145')]['replace'](/[ ]/g,''),_0x3fadcf=_0x178849[_0x2b40c('0xcf')];VisuMZ[_0x2b40c('0x503')][_0x2b40c('0x78')](_0x32bb27,_0x3fadcf);}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x78')]=function(_0x189db3,_0x5e77f3){const _0x492149=_0x21bc8a;if(!!window[_0x189db3]){if($gameTemp[_0x492149('0x48')]())console[_0x492149('0x255')](_0x492149('0x547')[_0x492149('0x2c1')](_0x189db3));}const _0x4fc716=_0x492149('0x8c')[_0x492149('0x2c1')](_0x189db3,_0x5e77f3);window[_0x189db3]=new Function(_0x4fc716);},Scene_Boot['prototype'][_0x21bc8a('0x1ce')]=function(){const _0x169a5b=_0x21bc8a,_0x6dbb11=VisuMZ[_0x169a5b('0x503')][_0x169a5b('0x4e5')][_0x169a5b('0x2f4')];if(!_0x6dbb11)return;for(const _0x4ec9c8 of _0x6dbb11){if(!_0x4ec9c8)continue;VisuMZ[_0x169a5b('0x503')][_0x169a5b('0x66a')](_0x4ec9c8);}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x412')]={},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x41b')]={},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x10e')]={},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x66a')]=function(_0x12b1ac){const _0x118582=_0x21bc8a,_0x41cdf8=_0x12b1ac[_0x118582('0x85')],_0x1b8f6f=_0x12b1ac[_0x118582('0x365')],_0x4c0f0b=_0x12b1ac[_0x118582('0x5ac')],_0x17dd53=_0x12b1ac[_0x118582('0xdd')],_0x48136e=new Function(_0x12b1ac['ValueJS']);VisuMZ[_0x118582('0x503')]['CustomParamNames'][_0x41cdf8[_0x118582('0x443')]()[_0x118582('0x482')]()]=_0x1b8f6f,VisuMZ[_0x118582('0x503')][_0x118582('0x412')][_0x41cdf8['toUpperCase']()[_0x118582('0x482')]()]=_0x4c0f0b,VisuMZ[_0x118582('0x503')][_0x118582('0x41b')][_0x41cdf8[_0x118582('0x443')]()[_0x118582('0x482')]()]=_0x17dd53,VisuMZ[_0x118582('0x503')][_0x118582('0x10e')][_0x41cdf8['toUpperCase']()[_0x118582('0x482')]()]=_0x41cdf8,Object[_0x118582('0x192')](Game_BattlerBase[_0x118582('0x5b4')],_0x41cdf8,{'get'(){const _0x11cd90=_0x118582,_0xc46a93=_0x48136e['call'](this);return _0x17dd53===_0x11cd90('0x2f5')?Math['round'](_0xc46a93):_0xc46a93;}});},VisuMZ[_0x21bc8a('0x5df')]=function(){const _0x55d540=_0x21bc8a;for(const _0x27cf76 of $dataActors){if(_0x55d540('0x5eb')===_0x55d540('0x5eb')){if(_0x27cf76)VisuMZ[_0x55d540('0x60b')](_0x27cf76);}else{function _0x2d57c0(){const _0x7e1645=_0x55d540;_0x8e8c40[_0x7e1645('0x503')][_0x7e1645('0x5ea')][_0x7e1645('0x312')](this);}}}for(const _0x246993 of $dataClasses){if(_0x55d540('0x130')!==_0x55d540('0x130')){function _0x506735(){const _0x48bb53=_0x55d540;this[_0x48bb53('0x3fa')]();}}else{if(_0x246993)VisuMZ[_0x55d540('0x1d0')](_0x246993);}}for(const _0x6f102d of $dataSkills){if(_0x55d540('0x683')===_0x55d540('0x5dd')){function _0x399392(){return'';}}else{if(_0x6f102d)VisuMZ[_0x55d540('0x463')](_0x6f102d);}}for(const _0x713e3c of $dataItems){if(_0x713e3c)VisuMZ[_0x55d540('0x3b8')](_0x713e3c);}for(const _0x2f6f34 of $dataWeapons){if(_0x55d540('0x5dc')!==_0x55d540('0x2b5')){if(_0x2f6f34)VisuMZ[_0x55d540('0x626')](_0x2f6f34);}else{function _0x255963(){const _0x337fbc=_0x55d540,_0xc454c7=_0x48840d[_0x337fbc('0x312')](this);return _0x57c6c7===_0x337fbc('0x2f5')?_0x13e0cd[_0x337fbc('0x23d')](_0xc454c7):_0xc454c7;}}}for(const _0x4b30f5 of $dataArmors){if(_0x4b30f5)VisuMZ[_0x55d540('0x60d')](_0x4b30f5);}for(const _0x3a3b2c of $dataEnemies){if(_0x55d540('0x491')!==_0x55d540('0x491')){function _0x318d1b(){const _0x50ec61=_0x55d540;return this[_0x50ec61('0x498')]()['successRate']*0.01;}}else{if(_0x3a3b2c)VisuMZ['ParseEnemyNotetags'](_0x3a3b2c);}}for(const _0x270497 of $dataStates){if(_0x270497)VisuMZ[_0x55d540('0x4c6')](_0x270497);}for(const _0x8298e1 of $dataTilesets){if(_0x8298e1)VisuMZ[_0x55d540('0x553')](_0x8298e1);}},VisuMZ[_0x21bc8a('0x60b')]=function(_0x3cd83a){},VisuMZ[_0x21bc8a('0x1d0')]=function(_0x142754){},VisuMZ['ParseSkillNotetags']=function(_0x1b545b){},VisuMZ[_0x21bc8a('0x3b8')]=function(_0x3d5eab){},VisuMZ[_0x21bc8a('0x626')]=function(_0x530468){},VisuMZ[_0x21bc8a('0x60d')]=function(_0xf71a30){},VisuMZ[_0x21bc8a('0x3be')]=function(_0x12f369){},VisuMZ[_0x21bc8a('0x4c6')]=function(_0x8cd6dd){},VisuMZ['ParseTilesetNotetags']=function(_0x3c0dae){},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x60b')]=VisuMZ[_0x21bc8a('0x60b')],VisuMZ[_0x21bc8a('0x60b')]=function(_0x2d926e){const _0x6dedb9=_0x21bc8a;VisuMZ['CoreEngine'][_0x6dedb9('0x60b')][_0x6dedb9('0x312')](this,_0x2d926e);const _0x3b9685=_0x2d926e[_0x6dedb9('0x56')];if(_0x3b9685[_0x6dedb9('0x5c9')](/<MAX LEVEL:[ ](\d+)>/i)){_0x2d926e['maxLevel']=Number(RegExp['$1']);if(_0x2d926e[_0x6dedb9('0x1c9')]===0x0)_0x2d926e[_0x6dedb9('0x1c9')]=Number[_0x6dedb9('0x2c')];}if(_0x3b9685[_0x6dedb9('0x5c9')](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x6dedb9('0x3c')!=='luiNl'){function _0x192770(){return _0xecfd['eva']-0.05;}}else _0x2d926e[_0x6dedb9('0x4fa')]=Math[_0x6dedb9('0x509')](Number(RegExp['$1']),_0x2d926e[_0x6dedb9('0x1c9')]);}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x1d0')]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x21bc8a('0x1d0')]=function(_0x21c090){const _0x329bab=_0x21bc8a;VisuMZ[_0x329bab('0x503')][_0x329bab('0x1d0')][_0x329bab('0x312')](this,_0x21c090);if(_0x21c090[_0x329bab('0x300')])for(const _0x50e643 of _0x21c090['learnings']){_0x50e643[_0x329bab('0x56')][_0x329bab('0x5c9')](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x50e643[_0x329bab('0x68b')]=Math[_0x329bab('0x19b')](Number(RegExp['$1']),0x1));}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x3be')]=VisuMZ[_0x21bc8a('0x3be')],VisuMZ[_0x21bc8a('0x3be')]=function(_0x5c1f2a){const _0x1e2a7a=_0x21bc8a;VisuMZ[_0x1e2a7a('0x503')][_0x1e2a7a('0x3be')][_0x1e2a7a('0x312')](this,_0x5c1f2a),_0x5c1f2a[_0x1e2a7a('0x68b')]=0x1;const _0x1fe2ae=_0x5c1f2a[_0x1e2a7a('0x56')];if(_0x1fe2ae['match'](/<LEVEL:[ ](\d+)>/i))_0x5c1f2a[_0x1e2a7a('0x68b')]=Number(RegExp['$1']);if(_0x1fe2ae['match'](/<MAXHP:[ ](\d+)>/i))_0x5c1f2a['params'][0x0]=Number(RegExp['$1']);if(_0x1fe2ae[_0x1e2a7a('0x5c9')](/<MAXMP:[ ](\d+)>/i))_0x5c1f2a[_0x1e2a7a('0x4ea')][0x1]=Number(RegExp['$1']);if(_0x1fe2ae[_0x1e2a7a('0x5c9')](/<ATK:[ ](\d+)>/i))_0x5c1f2a['params'][0x2]=Number(RegExp['$1']);if(_0x1fe2ae['match'](/<DEF:[ ](\d+)>/i))_0x5c1f2a[_0x1e2a7a('0x4ea')][0x3]=Number(RegExp['$1']);if(_0x1fe2ae[_0x1e2a7a('0x5c9')](/<MAT:[ ](\d+)>/i))_0x5c1f2a['params'][0x4]=Number(RegExp['$1']);if(_0x1fe2ae[_0x1e2a7a('0x5c9')](/<MDF:[ ](\d+)>/i))_0x5c1f2a[_0x1e2a7a('0x4ea')][0x5]=Number(RegExp['$1']);if(_0x1fe2ae[_0x1e2a7a('0x5c9')](/<AGI:[ ](\d+)>/i))_0x5c1f2a['params'][0x6]=Number(RegExp['$1']);if(_0x1fe2ae[_0x1e2a7a('0x5c9')](/<LUK:[ ](\d+)>/i))_0x5c1f2a['params'][0x7]=Number(RegExp['$1']);if(_0x1fe2ae[_0x1e2a7a('0x5c9')](/<EXP:[ ](\d+)>/i))_0x5c1f2a[_0x1e2a7a('0x5ec')]=Number(RegExp['$1']);if(_0x1fe2ae[_0x1e2a7a('0x5c9')](/<GOLD:[ ](\d+)>/i))_0x5c1f2a[_0x1e2a7a('0x66')]=Number(RegExp['$1']);},VisuMZ[_0x21bc8a('0x503')]['Graphics_defaultStretchMode']=Graphics['_defaultStretchMode'],Graphics[_0x21bc8a('0x54b')]=function(){const _0x2df052=_0x21bc8a;switch(VisuMZ[_0x2df052('0x503')]['Settings']['QoL']['AutoStretch']){case _0x2df052('0x3d9'):return!![];case _0x2df052('0x652'):return![];default:return VisuMZ[_0x2df052('0x503')][_0x2df052('0xa')][_0x2df052('0x312')](this);}},VisuMZ['CoreEngine'][_0x21bc8a('0x68a')]=Graphics['printError'],Graphics[_0x21bc8a('0x528')]=function(_0x5eeb02,_0x4d7a1a,_0x1a4ad7=null){const _0x3ac5d7=_0x21bc8a;VisuMZ[_0x3ac5d7('0x503')]['Graphics_printError'][_0x3ac5d7('0x312')](this,_0x5eeb02,_0x4d7a1a,_0x1a4ad7),VisuMZ[_0x3ac5d7('0x1ad')](![]);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4df')]=Graphics[_0x21bc8a('0x45f')],Graphics[_0x21bc8a('0x45f')]=function(_0xb59dfe){const _0x572ccc=_0x21bc8a;VisuMZ[_0x572ccc('0x503')][_0x572ccc('0x4df')]['call'](this,_0xb59dfe),this[_0x572ccc('0x5fd')](_0xb59dfe);},Graphics['_centerElementCoreEngine']=function(_0x47949c){const _0x4e54c7=_0x21bc8a;if(VisuMZ[_0x4e54c7('0x503')]['Settings'][_0x4e54c7('0x1a7')]['FontSmoothing']){if('CgwUZ'!==_0x4e54c7('0x3da')){function _0x4507b8(){const _0x4437f9=_0x4e54c7;return _0x227252[_0x4437f9('0x503')][_0x4437f9('0x116')][_0x4437f9('0x312')](this)[_0x4437f9('0x184')](0x0,0x1);}}else _0x47949c[_0x4e54c7('0x612')][_0x4e54c7('0x56c')]=_0x4e54c7('0x5af');}if(VisuMZ[_0x4e54c7('0x503')]['Settings'][_0x4e54c7('0x1a7')][_0x4e54c7('0xd4')]){if(_0x4e54c7('0x3d6')===_0x4e54c7('0x3d6'))_0x47949c[_0x4e54c7('0x612')][_0x4e54c7('0x4f7')]='pixelated';else{function _0x1417a8(){const _0x160698=_0x4e54c7;this[_0x160698('0x227')][_0x160698('0x2ad')](),this[_0x160698('0xc0')][_0x160698('0x2ad')](),this['resetTextColor']();let _0x5338c4=_0x123f3f[_0x160698('0x503')]['Settings']['KeyboardInput'][_0x160698('0x52')]['split']('\x0a'),_0x144a01=_0x5338c4['length'],_0x21e6ec=(this[_0x160698('0x604')]-_0x144a01*this[_0x160698('0x327')]())/0x2;for(let _0x5970ee=0x0;_0x5970ee<_0x144a01;++_0x5970ee){let _0x123854=_0x5338c4[_0x5970ee],_0x5b614c=this[_0x160698('0x13c')](_0x123854)[_0x160698('0x65')],_0x5ae964=_0x34b8bc[_0x160698('0x335')]((this[_0x160698('0x227')][_0x160698('0x65')]-_0x5b614c)/0x2);this['drawTextEx'](_0x123854,_0x5ae964,_0x21e6ec),_0x21e6ec+=this[_0x160698('0x327')]();}}}}const _0x580118=Math[_0x4e54c7('0x19b')](0x0,Math[_0x4e54c7('0x335')](_0x47949c['width']*this[_0x4e54c7('0x5a4')])),_0x3bfea7=Math[_0x4e54c7('0x19b')](0x0,Math[_0x4e54c7('0x335')](_0x47949c[_0x4e54c7('0x585')]*this[_0x4e54c7('0x5a4')]));_0x47949c[_0x4e54c7('0x612')][_0x4e54c7('0x65')]=_0x580118+'px',_0x47949c[_0x4e54c7('0x612')][_0x4e54c7('0x585')]=_0x3bfea7+'px';},Bitmap['prototype']['markCoreEngineModified']=function(){this['_customModified']=!![];},VisuMZ['CoreEngine'][_0x21bc8a('0x2a')]=Sprite['prototype'][_0x21bc8a('0x67f')],Sprite[_0x21bc8a('0x5b4')][_0x21bc8a('0x67f')]=function(){const _0x560d94=_0x21bc8a;VisuMZ[_0x560d94('0x503')][_0x560d94('0x2a')][_0x560d94('0x312')](this),this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x21bc8a('0x5b4')][_0x21bc8a('0x61e')]=function(){const _0x3880eb=_0x21bc8a;if(!this[_0x3880eb('0x263')])return;if(!this[_0x3880eb('0x263')][_0x3880eb('0x41')])return;if(this[_0x3880eb('0x263')][_0x3880eb('0x5c8')]&&!this[_0x3880eb('0x226')][_0x3880eb('0x5c8')][_0x3880eb('0x1b3')]){if(_0x3880eb('0x25a')===_0x3880eb('0x338')){function _0x243038(){const _0x10e233=_0x3880eb;_0x461993[_0x10e233('0x503')][_0x10e233('0x499')]['call'](this),_0x47f751[_0x10e233('0x1eb')]()&&this['movePageButtonSideButtonLayout']();}}else this['bitmap'][_0x3880eb('0x67f')]();}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x343')]=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x242')],Bitmap[_0x21bc8a('0x5b4')]['resize']=function(_0x21ba2c,_0x412b6e){const _0x4f2a4f=_0x21bc8a;VisuMZ['CoreEngine'][_0x4f2a4f('0x343')][_0x4f2a4f('0x312')](this,_0x21ba2c,_0x412b6e),this['markCoreEngineModified']();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4fc')]=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x9a')],Bitmap['prototype']['blt']=function(_0x5b48c7,_0x1d4b77,_0x3f15cf,_0x31dfe8,_0x7a7b6e,_0x40fe0f,_0x156fd3,_0x126873,_0x1210df){const _0x49f1a8=_0x21bc8a;VisuMZ['CoreEngine'][_0x49f1a8('0x4fc')]['call'](this,_0x5b48c7,_0x1d4b77,_0x3f15cf,_0x31dfe8,_0x7a7b6e,_0x40fe0f,_0x156fd3,_0x126873,_0x1210df),this['markCoreEngineModified']();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4c9')]=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x3ee')],Bitmap['prototype'][_0x21bc8a('0x3ee')]=function(_0x2fa919,_0x181a84,_0x49cb05,_0x289af4){const _0x485e40=_0x21bc8a;VisuMZ[_0x485e40('0x503')]['Bitmap_clearRect'][_0x485e40('0x312')](this,_0x2fa919,_0x181a84,_0x49cb05,_0x289af4),this[_0x485e40('0x12a')]();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x356')]=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0xd6')],Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0xd6')]=function(_0x562779,_0x24d167,_0x320d9c,_0x55370f,_0x330f4d){const _0x3b2d01=_0x21bc8a;VisuMZ[_0x3b2d01('0x503')][_0x3b2d01('0x356')][_0x3b2d01('0x312')](this,_0x562779,_0x24d167,_0x320d9c,_0x55370f,_0x330f4d),this[_0x3b2d01('0x12a')]();},VisuMZ['CoreEngine'][_0x21bc8a('0x3e8')]=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x62b')],Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x62b')]=function(_0x38ba0c,_0x133ceb,_0x26b90e,_0x464963,_0x2077f7){const _0x16ee27=_0x21bc8a;VisuMZ['CoreEngine'][_0x16ee27('0x3e8')][_0x16ee27('0x312')](this,_0x38ba0c,_0x133ceb,_0x26b90e,_0x464963,_0x2077f7),this[_0x16ee27('0x12a')]();},VisuMZ[_0x21bc8a('0x503')]['Bitmap_gradientFillRect']=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x224')],Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x224')]=function(_0x41b625,_0x221e48,_0x30bf51,_0x3b36d2,_0x2e69f3,_0x3f3e04,_0x454f04){const _0x5466fd=_0x21bc8a;VisuMZ[_0x5466fd('0x503')]['Bitmap_gradientFillRect']['call'](this,_0x41b625,_0x221e48,_0x30bf51,_0x3b36d2,_0x2e69f3,_0x3f3e04,_0x454f04),this[_0x5466fd('0x12a')]();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x323')]=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x40f')],Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x40f')]=function(_0x1c6172,_0x568515,_0x52c9d3,_0x3da270){const _0x1fda75=_0x21bc8a;_0x1c6172=Math[_0x1fda75('0x23d')](_0x1c6172),_0x568515=Math[_0x1fda75('0x23d')](_0x568515),_0x52c9d3=Math[_0x1fda75('0x23d')](_0x52c9d3),VisuMZ[_0x1fda75('0x503')][_0x1fda75('0x323')][_0x1fda75('0x312')](this,_0x1c6172,_0x568515,_0x52c9d3,_0x3da270),this[_0x1fda75('0x12a')]();},VisuMZ['CoreEngine'][_0x21bc8a('0x217')]=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x671')],Bitmap[_0x21bc8a('0x5b4')]['measureTextWidth']=function(_0x50cce1){const _0x37e96b=_0x21bc8a;return Math[_0x37e96b('0x23d')](VisuMZ[_0x37e96b('0x503')][_0x37e96b('0x217')][_0x37e96b('0x312')](this,_0x50cce1));},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x423')]=Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x44c')],Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x44c')]=function(_0x2a27a1,_0x1892a2,_0x123b22,_0x456586,_0x56432d,_0x63213c){const _0x22f923=_0x21bc8a;_0x1892a2=Math[_0x22f923('0x23d')](_0x1892a2),_0x123b22=Math[_0x22f923('0x23d')](_0x123b22),_0x456586=Math['round'](_0x456586),_0x56432d=Math['round'](_0x56432d),VisuMZ[_0x22f923('0x503')][_0x22f923('0x423')][_0x22f923('0x312')](this,_0x2a27a1,_0x1892a2,_0x123b22,_0x456586,_0x56432d,_0x63213c),this[_0x22f923('0x12a')]();},VisuMZ[_0x21bc8a('0x503')]['Bitmap_drawTextOutline']=Bitmap[_0x21bc8a('0x5b4')]['_drawTextOutline'],Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0x127')]=function(_0x2fc6bf,_0x4a2783,_0x17d5c7,_0x45f26f){const _0x265bd1=_0x21bc8a;if(VisuMZ[_0x265bd1('0x503')]['Settings'][_0x265bd1('0x1a7')][_0x265bd1('0x676')])this[_0x265bd1('0xa0')](_0x2fc6bf,_0x4a2783,_0x17d5c7,_0x45f26f);else{if('FpXMb'!==_0x265bd1('0x1dd'))VisuMZ[_0x265bd1('0x503')][_0x265bd1('0x291')][_0x265bd1('0x312')](this,_0x2fc6bf,_0x4a2783,_0x17d5c7,_0x45f26f);else{function _0x3b4367(){const _0x45d26b=_0x265bd1;var _0x5a77f5=_0x10bc65[_0x45d26b('0x274')](_0x1284f9*0x2-0x1,_0x45d26b('0xe6'))*0.5+0.5;}}}},Bitmap[_0x21bc8a('0x5b4')][_0x21bc8a('0xa0')]=function(_0x2df658,_0x32fe59,_0xec595b,_0x172705){const _0x38e523=_0x21bc8a,_0x1fea27=this[_0x38e523('0xca')];_0x1fea27['fillStyle']=this[_0x38e523('0x2db')],_0x1fea27[_0x38e523('0x1e1')](_0x2df658,_0x32fe59+0x2,_0xec595b+0x2,_0x172705);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x53e')]=Input[_0x21bc8a('0x2ad')],Input[_0x21bc8a('0x2ad')]=function(){const _0x164b9f=_0x21bc8a;VisuMZ[_0x164b9f('0x503')][_0x164b9f('0x53e')][_0x164b9f('0x312')](this),this[_0x164b9f('0x2a5')]=undefined,this[_0x164b9f('0x1cd')]=undefined;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x3a4')]=Input[_0x21bc8a('0x61d')],Input[_0x21bc8a('0x61d')]=function(){const _0x1dd669=_0x21bc8a;VisuMZ[_0x1dd669('0x503')][_0x1dd669('0x3a4')]['call'](this),document['addEventListener'](_0x1dd669('0x123'),this[_0x1dd669('0x334')]['bind'](this));},VisuMZ['CoreEngine'][_0x21bc8a('0x57c')]=Input[_0x21bc8a('0xf6')],Input[_0x21bc8a('0xf6')]=function(_0x4e3f2f){const _0x307dfb=_0x21bc8a;this['_inputSpecialKeyCode']=_0x4e3f2f[_0x307dfb('0x139')],VisuMZ[_0x307dfb('0x503')]['Input_onKeyDown']['call'](this,_0x4e3f2f);},Input[_0x21bc8a('0x334')]=function(_0x3a2ced){const _0x1af2a5=_0x21bc8a;this[_0x1af2a5('0x186')](_0x3a2ced);},Input[_0x21bc8a('0x186')]=function(_0x1e7f2c){const _0x540f2c=_0x21bc8a;this[_0x540f2c('0x1cd')]=_0x1e7f2c[_0x540f2c('0x139')];let _0x26c4b9=String['fromCharCode'](_0x1e7f2c[_0x540f2c('0x65e')]);if(this[_0x540f2c('0x2a5')]===undefined)this[_0x540f2c('0x2a5')]=_0x26c4b9;else{if('SmfhJ'===_0x540f2c('0x256')){function _0x2c752a(){const _0x44f723=_0x540f2c;if(this[_0x44f723('0xf4')]===_0x44f723('0xb6'))return;if(_0x58f46a[_0x44f723('0x6e')]())return;_0x1b7a90[_0x44f723('0x503')][_0x44f723('0x4e')]['call'](this),this[_0x44f723('0x1bb')]('default');}}else this['_inputString']+=_0x26c4b9;}},VisuMZ['CoreEngine']['Input_shouldPreventDefault']=Input[_0x21bc8a('0x50f')],Input[_0x21bc8a('0x50f')]=function(_0x3d7c1d){const _0x4b6f19=_0x21bc8a;if(_0x3d7c1d===0x8)return![];return VisuMZ[_0x4b6f19('0x503')][_0x4b6f19('0x38a')][_0x4b6f19('0x312')](this,_0x3d7c1d);},Input[_0x21bc8a('0x8a')]=function(_0x9ede36){const _0x2d4393=_0x21bc8a;if(_0x9ede36[_0x2d4393('0x5c9')](/backspace/i))return this[_0x2d4393('0x1cd')]===0x8;if(_0x9ede36[_0x2d4393('0x5c9')](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x9ede36[_0x2d4393('0x5c9')](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x21bc8a('0x6e')]=function(){const _0x150251=_0x21bc8a;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x150251('0x1cd')]);},Input['isArrowPressed']=function(){const _0x455a8f=_0x21bc8a;return[0x25,0x26,0x27,0x28][_0x455a8f('0x1c0')](this[_0x455a8f('0x1cd')]);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x80')]=Tilemap[_0x21bc8a('0x5b4')][_0x21bc8a('0x4a7')],Tilemap[_0x21bc8a('0x5b4')][_0x21bc8a('0x4a7')]=function(_0x23fa75,_0x4d6912,_0x932639,_0x1a6ee5){const _0x5f1da3=_0x21bc8a;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ['CoreEngine'][_0x5f1da3('0x80')][_0x5f1da3('0x312')](this,_0x23fa75,_0x4d6912,_0x932639,_0x1a6ee5);},Tilemap[_0x21bc8a('0x56b')]['prototype']['_createInternalTextures']=function(){const _0x3a9ae0=_0x21bc8a;this[_0x3a9ae0('0x2df')]();for(let _0x51885e=0x0;_0x51885e<Tilemap[_0x3a9ae0('0x1cc')][_0x3a9ae0('0x160')];_0x51885e++){const _0x2178a5=new PIXI[(_0x3a9ae0('0xb7'))]();_0x2178a5[_0x3a9ae0('0x4db')](0x800,0x800);if(VisuMZ[_0x3a9ae0('0x503')][_0x3a9ae0('0x4e5')][_0x3a9ae0('0x1a7')][_0x3a9ae0('0xd4')]){if('vscMl'!==_0x3a9ae0('0x21')){function _0x1b2c54(){const _0x196b43=_0x3a9ae0;this['_commandWindow'][_0x196b43('0x2dc')](_0x5419cc[_0x196b43('0x31c')][_0x196b43('0x4f3')]);}}else _0x2178a5[_0x3a9ae0('0x54e')]=PIXI[_0x3a9ae0('0xc1')]['NEAREST'];}this[_0x3a9ae0('0x91')][_0x3a9ae0('0x5ca')](_0x2178a5);}},WindowLayer['prototype'][_0x21bc8a('0x5c1')]=function(){const _0x373d07=_0x21bc8a;if(SceneManager&&SceneManager['_scene']){if(_0x373d07('0x4a5')!==_0x373d07('0x298'))return SceneManager[_0x373d07('0x4a0')][_0x373d07('0x246')]();else{function _0x3568e2(){this['catchUnknownError'](_0x65e532);}}}else return!![];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x527')]=WindowLayer['prototype'][_0x21bc8a('0xf7')],WindowLayer[_0x21bc8a('0x5b4')]['render']=function render(_0x46a1f9){const _0x23b631=_0x21bc8a;if(this['isMaskingEnabled']()){if(_0x23b631('0x250')!==_0x23b631('0x250')){function _0x4882a9(){const _0x3751e4=_0x23b631;_0x5adbf8[_0x3751e4('0x503')]['Scene_Battle_update'][_0x3751e4('0x312')](this);if(_0x58ac4e[_0x3751e4('0x204')])this[_0x3751e4('0x96')]();}}else VisuMZ[_0x23b631('0x503')]['WindowLayer_render'][_0x23b631('0x312')](this,_0x46a1f9);}else{if(_0x23b631('0x4f2')!=='oqcVO'){function _0x13663d(){const _0x331c7e=_0x23b631;return _0x589f8e[_0x331c7e('0x31c')][_0x331c7e('0x460')][_0x331c7e('0x312')](this);}}else this['renderNoMask'](_0x46a1f9);}},WindowLayer[_0x21bc8a('0x5b4')][_0x21bc8a('0x3b6')]=function render(_0x2c10ae){const _0x2b43f4=_0x21bc8a;if(!this[_0x2b43f4('0x3c4')])return;const _0x15a552=new PIXI[(_0x2b43f4('0x2ec'))](),_0x4e98f3=_0x2c10ae['gl'],_0x5e49e1=this[_0x2b43f4('0x667')][_0x2b43f4('0x65d')]();_0x2c10ae['framebuffer']['forceStencil'](),_0x15a552[_0x2b43f4('0xd0')]=this[_0x2b43f4('0xd0')],_0x2c10ae[_0x2b43f4('0x541')][_0x2b43f4('0x1dc')](),_0x4e98f3[_0x2b43f4('0x3a7')](_0x4e98f3[_0x2b43f4('0x3ec')]);while(_0x5e49e1['length']>0x0){if('MzxdN'!==_0x2b43f4('0x1a3')){const _0x5dbebd=_0x5e49e1['shift']();_0x5dbebd[_0x2b43f4('0x2cd')]&&_0x5dbebd['visible']&&_0x5dbebd[_0x2b43f4('0x648')]>0x0&&(_0x4e98f3['stencilFunc'](_0x4e98f3[_0x2b43f4('0x13')],0x0,~0x0),_0x4e98f3[_0x2b43f4('0x35')](_0x4e98f3[_0x2b43f4('0x378')],_0x4e98f3[_0x2b43f4('0x378')],_0x4e98f3[_0x2b43f4('0x378')]),_0x5dbebd['render'](_0x2c10ae),_0x2c10ae[_0x2b43f4('0x541')][_0x2b43f4('0x1dc')](),_0x15a552[_0x2b43f4('0x2ad')](),_0x4e98f3[_0x2b43f4('0x406')](_0x4e98f3[_0x2b43f4('0x57d')],0x1,~0x0),_0x4e98f3['stencilOp'](_0x4e98f3[_0x2b43f4('0x478')],_0x4e98f3[_0x2b43f4('0x478')],_0x4e98f3[_0x2b43f4('0x478')]),_0x4e98f3[_0x2b43f4('0x282')](_0x4e98f3[_0x2b43f4('0x45a')],_0x4e98f3[_0x2b43f4('0x4cb')]),_0x15a552[_0x2b43f4('0xf7')](_0x2c10ae),_0x2c10ae['batch'][_0x2b43f4('0x1dc')](),_0x4e98f3[_0x2b43f4('0x282')](_0x4e98f3[_0x2b43f4('0x4cb')],_0x4e98f3['ONE_MINUS_SRC_ALPHA']));}else{function _0x3cd061(){const _0x5ab932=_0x2b43f4;this[_0x5ab932('0x602')]['setBackgroundType'](_0x587fd5[_0x5ab932('0x31c')][_0x5ab932('0x31b')]);}}}_0x4e98f3[_0x2b43f4('0x417')](_0x4e98f3[_0x2b43f4('0x3ec')]),_0x4e98f3['clear'](_0x4e98f3[_0x2b43f4('0x2b6')]),_0x4e98f3[_0x2b43f4('0x44d')](0x0),_0x2c10ae[_0x2b43f4('0x541')][_0x2b43f4('0x1dc')]();for(const _0xe8f9b6 of this[_0x2b43f4('0x667')]){!_0xe8f9b6[_0x2b43f4('0x2cd')]&&_0xe8f9b6[_0x2b43f4('0x3c4')]&&_0xe8f9b6[_0x2b43f4('0xf7')](_0x2c10ae);}_0x2c10ae['batch']['flush']();},DataManager[_0x21bc8a('0x539')]=function(_0x43494b){const _0x30c707=_0x21bc8a;return this['isItem'](_0x43494b)&&_0x43494b[_0x30c707('0x18c')]===0x2;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x21a')]=DataManager['setupNewGame'],DataManager[_0x21bc8a('0x1ec')]=function(){const _0x519dc3=_0x21bc8a;VisuMZ['CoreEngine'][_0x519dc3('0x21a')][_0x519dc3('0x312')](this),this[_0x519dc3('0x625')]();},DataManager[_0x21bc8a('0x625')]=function(){const _0x54bc80=_0x21bc8a;if($gameTemp[_0x54bc80('0x48')]()){const _0x352a5f=VisuMZ['CoreEngine'][_0x54bc80('0x4e5')]['QoL'][_0x54bc80('0x362')];if(_0x352a5f>0x0)$gameTemp[_0x54bc80('0x33e')](_0x352a5f);}},TextManager[_0x21bc8a('0x324')]=['','','','CANCEL','','',_0x21bc8a('0x285'),'',_0x21bc8a('0x196'),_0x21bc8a('0x329'),'','','CLEAR',_0x21bc8a('0x317'),_0x21bc8a('0x165'),'',_0x21bc8a('0x571'),_0x21bc8a('0x5d'),'ALT','PAUSE','CAPSLOCK',_0x21bc8a('0x63c'),_0x21bc8a('0x650'),_0x21bc8a('0xc5'),'FINAL',_0x21bc8a('0x3e4'),'','ESC',_0x21bc8a('0x9e'),_0x21bc8a('0x10c'),_0x21bc8a('0x663'),'MODECHANGE',_0x21bc8a('0xb3'),'PGUP',_0x21bc8a('0x594'),_0x21bc8a('0x345'),'HOME',_0x21bc8a('0x38e'),'UP',_0x21bc8a('0x20d'),_0x21bc8a('0x346'),'SELECT',_0x21bc8a('0x32f'),_0x21bc8a('0x688'),_0x21bc8a('0xe0'),'INSERT',_0x21bc8a('0x3cd'),'','0','1','2','3','4','5','6','7','8','9',_0x21bc8a('0x567'),_0x21bc8a('0x257'),_0x21bc8a('0x2d9'),_0x21bc8a('0x28e'),_0x21bc8a('0x15c'),_0x21bc8a('0x536'),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x21bc8a('0xf'),'',_0x21bc8a('0x51f'),'',_0x21bc8a('0x5a8'),_0x21bc8a('0x129'),'NUMPAD1',_0x21bc8a('0x435'),_0x21bc8a('0x149'),_0x21bc8a('0x191'),_0x21bc8a('0x531'),_0x21bc8a('0x672'),_0x21bc8a('0x2e1'),_0x21bc8a('0x235'),_0x21bc8a('0x3a0'),_0x21bc8a('0x4d3'),'ADD',_0x21bc8a('0x1cf'),_0x21bc8a('0x266'),_0x21bc8a('0x87'),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x21bc8a('0x30f'),_0x21bc8a('0x647'),_0x21bc8a('0x2f8'),'F13',_0x21bc8a('0x385'),'F15',_0x21bc8a('0x5aa'),_0x21bc8a('0x1ca'),'F18',_0x21bc8a('0x105'),'F20',_0x21bc8a('0x1b5'),_0x21bc8a('0x93'),_0x21bc8a('0x5b7'),'F24','','','','','','','','',_0x21bc8a('0x68f'),_0x21bc8a('0x20'),'WIN_OEM_FJ_JISHO',_0x21bc8a('0x639'),'WIN_OEM_FJ_TOUROKU',_0x21bc8a('0x154'),_0x21bc8a('0x3dd'),'','','','','','','','','',_0x21bc8a('0xc2'),_0x21bc8a('0x408'),_0x21bc8a('0x376'),_0x21bc8a('0x62'),'DOLLAR',_0x21bc8a('0x3d3'),_0x21bc8a('0x49b'),_0x21bc8a('0x477'),_0x21bc8a('0x1c7'),_0x21bc8a('0x22d'),_0x21bc8a('0x47d'),_0x21bc8a('0xe3'),_0x21bc8a('0x25b'),_0x21bc8a('0x14b'),_0x21bc8a('0x34'),_0x21bc8a('0x5c2'),_0x21bc8a('0x5ba'),'','','','',_0x21bc8a('0x5b8'),_0x21bc8a('0x14'),_0x21bc8a('0x56d'),'','','SEMICOLON',_0x21bc8a('0x28e'),'COMMA',_0x21bc8a('0x33b'),_0x21bc8a('0x3d4'),_0x21bc8a('0x23c'),_0x21bc8a('0x58c'),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x21bc8a('0x687'),_0x21bc8a('0x5a0'),'CLOSE_BRACKET',_0x21bc8a('0x1f8'),'',_0x21bc8a('0x487'),_0x21bc8a('0x296'),'','WIN_ICO_HELP','WIN_ICO_00','','WIN_ICO_CLEAR','','','WIN_OEM_RESET',_0x21bc8a('0x30d'),'WIN_OEM_PA1','WIN_OEM_PA2',_0x21bc8a('0x2e6'),'WIN_OEM_WSCTRL',_0x21bc8a('0x17d'),_0x21bc8a('0x563'),_0x21bc8a('0x513'),_0x21bc8a('0x515'),_0x21bc8a('0x3f6'),_0x21bc8a('0x570'),_0x21bc8a('0x1da'),_0x21bc8a('0x4a4'),_0x21bc8a('0x4d0'),'EXSEL','EREOF',_0x21bc8a('0x3fe'),_0x21bc8a('0x557'),'',_0x21bc8a('0x577'),_0x21bc8a('0x4c8'),''],TextManager['buttonAssistOk']=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x17')]['OkText'],TextManager['buttonAssistCancel']=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x17')][_0x21bc8a('0x185')],TextManager['buttonAssistSwitch']=VisuMZ[_0x21bc8a('0x503')]['Settings'][_0x21bc8a('0x17')]['SwitchActorText'],VisuMZ[_0x21bc8a('0x503')]['TextManager_param']=TextManager[_0x21bc8a('0xf8')],TextManager['param']=function(_0x3899fc){const _0x5ea350=_0x21bc8a;if(typeof _0x3899fc===_0x5ea350('0x421'))return VisuMZ[_0x5ea350('0x503')][_0x5ea350('0x237')][_0x5ea350('0x312')](this,_0x3899fc);else{if(_0x5ea350('0x53f')==='bEnVa')return this[_0x5ea350('0x5fa')](_0x3899fc);else{function _0x53d3c3(){const _0x30f937=_0x5ea350,_0x95a8be=_0x3543f7[_0x30f937('0x65')]-_0x574417['boxWidth']-_0x1cc434[_0x30f937('0x503')][_0x30f937('0x4e5')]['UI'][_0x30f937('0x538')]*0x2,_0x53f929=_0x95094d[_0x30f937('0x5b4')][_0x30f937('0x1b8')][_0x30f937('0x312')](this)*0x4;if(_0x95a8be>=_0x53f929)_0x488ac6[_0x30f937('0x5e1')](!![]);}}}},TextManager['paramName']=function(_0x243c49){const _0x608770=_0x21bc8a;_0x243c49=String(_0x243c49||'')[_0x608770('0x443')]();const _0x23ed41=VisuMZ['CoreEngine'][_0x608770('0x4e5')][_0x608770('0x119')];if(_0x243c49===_0x608770('0x561'))return $dataSystem[_0x608770('0x199')][_0x608770('0x4ea')][0x0];if(_0x243c49===_0x608770('0x5fc'))return $dataSystem[_0x608770('0x199')][_0x608770('0x4ea')][0x1];if(_0x243c49==='ATK')return $dataSystem[_0x608770('0x199')]['params'][0x2];if(_0x243c49===_0x608770('0x102'))return $dataSystem['terms'][_0x608770('0x4ea')][0x3];if(_0x243c49===_0x608770('0xf5'))return $dataSystem[_0x608770('0x199')][_0x608770('0x4ea')][0x4];if(_0x243c49===_0x608770('0x691'))return $dataSystem[_0x608770('0x199')][_0x608770('0x4ea')][0x5];if(_0x243c49===_0x608770('0x30b'))return $dataSystem[_0x608770('0x199')][_0x608770('0x4ea')][0x6];if(_0x243c49===_0x608770('0x434'))return $dataSystem[_0x608770('0x199')][_0x608770('0x4ea')][0x7];if(_0x243c49===_0x608770('0x447'))return _0x23ed41[_0x608770('0x39f')];if(_0x243c49==='EVA')return _0x23ed41[_0x608770('0x50c')];if(_0x243c49===_0x608770('0x469'))return _0x23ed41[_0x608770('0x2c5')];if(_0x243c49===_0x608770('0x31'))return _0x23ed41[_0x608770('0x121')];if(_0x243c49===_0x608770('0x90'))return _0x23ed41[_0x608770('0xbd')];if(_0x243c49===_0x608770('0x68e'))return _0x23ed41[_0x608770('0x29b')];if(_0x243c49===_0x608770('0x492'))return _0x23ed41[_0x608770('0x393')];if(_0x243c49==='HRG')return _0x23ed41['XParamVocab7'];if(_0x243c49==='MRG')return _0x23ed41[_0x608770('0x1f9')];if(_0x243c49===_0x608770('0x205'))return _0x23ed41['XParamVocab9'];if(_0x243c49==='TGR')return _0x23ed41['SParamVocab0'];if(_0x243c49===_0x608770('0x495'))return _0x23ed41[_0x608770('0x591')];if(_0x243c49===_0x608770('0x471'))return _0x23ed41[_0x608770('0x200')];if(_0x243c49===_0x608770('0x415'))return _0x23ed41[_0x608770('0x4fe')];if(_0x243c49===_0x608770('0x3ce'))return _0x23ed41[_0x608770('0x24b')];if(_0x243c49===_0x608770('0x4e9'))return _0x23ed41[_0x608770('0x383')];if(_0x243c49===_0x608770('0x2f2'))return _0x23ed41['SParamVocab6'];if(_0x243c49===_0x608770('0x1e8'))return _0x23ed41[_0x608770('0x446')];if(_0x243c49==='FDR')return _0x23ed41[_0x608770('0x559')];if(_0x243c49==='EXR')return _0x23ed41['SParamVocab9'];if(VisuMZ[_0x608770('0x503')][_0x608770('0x283')][_0x243c49])return VisuMZ[_0x608770('0x503')][_0x608770('0x283')][_0x243c49];return'';},TextManager[_0x21bc8a('0x34a')]=function(_0x1b281f){const _0x5d0154=_0x21bc8a;if(_0x1b281f===_0x5d0154('0x5f1'))_0x1b281f=_0x5d0154('0x2f0');let _0x595588=[];for(let _0x2140ce in Input[_0x5d0154('0xe5')]){if(_0x5d0154('0x37a')!=='sjNoA'){function _0x3b4875(){const _0x464801=_0x5d0154;return _0x544fce[_0x464801('0x503')][_0x464801('0x4e5')]['UI'][_0x464801('0x54')];}}else{_0x2140ce=Number(_0x2140ce);if(_0x2140ce>=0x60&&_0x2140ce<=0x69)continue;if([0x12,0x20][_0x5d0154('0x666')](_0x2140ce))continue;_0x1b281f===Input[_0x5d0154('0xe5')][_0x2140ce]&&_0x595588[_0x5d0154('0x5ca')](_0x2140ce);}}for(let _0x11555f=0x0;_0x11555f<_0x595588[_0x5d0154('0x49')];_0x11555f++){if(_0x5d0154('0x1b1')!=='GoDpd')_0x595588[_0x11555f]=TextManager[_0x5d0154('0x324')][_0x595588[_0x11555f]];else{function _0x3e0b92(){const _0x3cfc1f=_0x5d0154;if(_0x506456['isPlaytest']())_0x42a202[_0x3cfc1f('0x255')](_0x3cfc1f('0x547')[_0x3cfc1f('0x2c1')](_0x2d2130));}}}return this[_0x5d0154('0x355')](_0x595588);},TextManager['makeInputButtonString']=function(_0x1402f5){const _0x5d4ef4=_0x21bc8a,_0x19f85b=VisuMZ[_0x5d4ef4('0x503')][_0x5d4ef4('0x4e5')][_0x5d4ef4('0x17')],_0x206baa=_0x19f85b['KeyUnlisted'],_0x36fb03=_0x1402f5[_0x5d4ef4('0x140')](),_0x3f67fe='Key%1'[_0x5d4ef4('0x2c1')](_0x36fb03);return _0x19f85b[_0x3f67fe]?_0x19f85b[_0x3f67fe]:_0x206baa[_0x5d4ef4('0x2c1')](_0x36fb03);},TextManager['getInputMultiButtonStrings']=function(_0x276d78,_0x7f43df){const _0x4ee45e=_0x21bc8a,_0x1d34a7=VisuMZ[_0x4ee45e('0x503')]['Settings']['ButtonAssist'],_0x136c3b=_0x1d34a7[_0x4ee45e('0xee')],_0x160976=this[_0x4ee45e('0x34a')](_0x276d78),_0xbec08c=this[_0x4ee45e('0x34a')](_0x7f43df);return _0x136c3b[_0x4ee45e('0x2c1')](_0x160976,_0xbec08c);},VisuMZ[_0x21bc8a('0x503')]['ColorManager_loadWindowskin']=ColorManager[_0x21bc8a('0x56e')],ColorManager[_0x21bc8a('0x56e')]=function(){const _0x4a2357=_0x21bc8a;VisuMZ['CoreEngine'][_0x4a2357('0x3d5')][_0x4a2357('0x312')](this),this[_0x4a2357('0x12')]=this[_0x4a2357('0x12')]||{};},ColorManager[_0x21bc8a('0x2fb')]=function(_0x4082f5,_0xb4ab74){const _0xbff682=_0x21bc8a;_0xb4ab74=String(_0xb4ab74),this[_0xbff682('0x12')]=this[_0xbff682('0x12')]||{};if(_0xb4ab74[_0xbff682('0x5c9')](/#(.*)/i))this[_0xbff682('0x12')][_0x4082f5]=_0xbff682('0xab')[_0xbff682('0x2c1')](String(RegExp['$1']));else{if(_0xbff682('0xea')!==_0xbff682('0x377'))this[_0xbff682('0x12')][_0x4082f5]=this[_0xbff682('0x2c3')](Number(_0xb4ab74));else{function _0x5878fe(){const _0xeb31e4=_0xbff682;return _0xd94efa(_0x67a25b)[_0xeb31e4('0x70')](_0x31eee7,_0x483c0d);}}}return this['_colorCache'][_0x4082f5];},ColorManager['getColor']=function(_0x449bb5){const _0x1e29b2=_0x21bc8a;return _0x449bb5=String(_0x449bb5),_0x449bb5['match'](/#(.*)/i)?_0x1e29b2('0xab')[_0x1e29b2('0x2c1')](String(RegExp['$1'])):this[_0x1e29b2('0x2c3')](Number(_0x449bb5));},ColorManager[_0x21bc8a('0x3b2')]=function(){const _0x2ed99d=_0x21bc8a;this[_0x2ed99d('0x12')]={};},ColorManager[_0x21bc8a('0x26e')]=function(){const _0x102ddd=_0x21bc8a,_0x58d4ef='_stored_normalColor';this['_colorCache']=this['_colorCache']||{};if(this[_0x102ddd('0x12')][_0x58d4ef])return this[_0x102ddd('0x12')][_0x58d4ef];const _0x3220c3=VisuMZ['CoreEngine'][_0x102ddd('0x4e5')][_0x102ddd('0x2aa')][_0x102ddd('0x6b')];return this['getColorDataFromPluginParameters'](_0x58d4ef,_0x3220c3);},ColorManager[_0x21bc8a('0x47f')]=function(){const _0x5715db=_0x21bc8a,_0x2bb163='_stored_systemColor';this[_0x5715db('0x12')]=this[_0x5715db('0x12')]||{};if(this[_0x5715db('0x12')][_0x2bb163])return this[_0x5715db('0x12')][_0x2bb163];const _0x6f4f6a=VisuMZ[_0x5715db('0x503')]['Settings'][_0x5715db('0x2aa')][_0x5715db('0x1c4')];return this[_0x5715db('0x2fb')](_0x2bb163,_0x6f4f6a);},ColorManager[_0x21bc8a('0x258')]=function(){const _0xc3e431=_0x21bc8a,_0xede093='_stored_crisisColor';this['_colorCache']=this[_0xc3e431('0x12')]||{};if(this[_0xc3e431('0x12')][_0xede093])return this[_0xc3e431('0x12')][_0xede093];const _0x219493=VisuMZ[_0xc3e431('0x503')][_0xc3e431('0x4e5')][_0xc3e431('0x2aa')]['ColorCrisis'];return this[_0xc3e431('0x2fb')](_0xede093,_0x219493);},ColorManager[_0x21bc8a('0x4f1')]=function(){const _0x85f9b=_0x21bc8a,_0x4313b9='_stored_deathColor';this[_0x85f9b('0x12')]=this[_0x85f9b('0x12')]||{};if(this[_0x85f9b('0x12')][_0x4313b9])return this[_0x85f9b('0x12')][_0x4313b9];const _0x6171b=VisuMZ[_0x85f9b('0x503')][_0x85f9b('0x4e5')][_0x85f9b('0x2aa')][_0x85f9b('0x64')];return this[_0x85f9b('0x2fb')](_0x4313b9,_0x6171b);},ColorManager[_0x21bc8a('0x381')]=function(){const _0x2f0dbe=_0x21bc8a,_0x5e6011='_stored_gaugeBackColor';this['_colorCache']=this[_0x2f0dbe('0x12')]||{};if(this['_colorCache'][_0x5e6011])return this['_colorCache'][_0x5e6011];const _0xa6b136=VisuMZ[_0x2f0dbe('0x503')][_0x2f0dbe('0x4e5')][_0x2f0dbe('0x2aa')][_0x2f0dbe('0x4e2')];return this[_0x2f0dbe('0x2fb')](_0x5e6011,_0xa6b136);},ColorManager[_0x21bc8a('0x4cf')]=function(){const _0x570f32=_0x21bc8a,_0x27e8cc='_stored_hpGaugeColor1';this[_0x570f32('0x12')]=this[_0x570f32('0x12')]||{};if(this[_0x570f32('0x12')][_0x27e8cc])return this[_0x570f32('0x12')][_0x27e8cc];const _0x123eef=VisuMZ[_0x570f32('0x503')][_0x570f32('0x4e5')][_0x570f32('0x2aa')][_0x570f32('0xb9')];return this[_0x570f32('0x2fb')](_0x27e8cc,_0x123eef);},ColorManager[_0x21bc8a('0x2ae')]=function(){const _0x10b06f=_0x21bc8a,_0x15cd4e=_0x10b06f('0x269');this[_0x10b06f('0x12')]=this[_0x10b06f('0x12')]||{};if(this[_0x10b06f('0x12')][_0x15cd4e])return this[_0x10b06f('0x12')][_0x15cd4e];const _0x495941=VisuMZ['CoreEngine'][_0x10b06f('0x4e5')]['Color'][_0x10b06f('0x686')];return this[_0x10b06f('0x2fb')](_0x15cd4e,_0x495941);},ColorManager[_0x21bc8a('0x220')]=function(){const _0x38e17e=_0x21bc8a,_0x59b75b=_0x38e17e('0x29c');this[_0x38e17e('0x12')]=this[_0x38e17e('0x12')]||{};if(this[_0x38e17e('0x12')][_0x59b75b])return this['_colorCache'][_0x59b75b];const _0x34ef2e=VisuMZ['CoreEngine'][_0x38e17e('0x4e5')][_0x38e17e('0x2aa')][_0x38e17e('0x10d')];return this[_0x38e17e('0x2fb')](_0x59b75b,_0x34ef2e);},ColorManager[_0x21bc8a('0x4cc')]=function(){const _0x34f5c0=_0x21bc8a,_0x312b1a=_0x34f5c0('0x38f');this[_0x34f5c0('0x12')]=this['_colorCache']||{};if(this[_0x34f5c0('0x12')][_0x312b1a])return this[_0x34f5c0('0x12')][_0x312b1a];const _0x2c48a2=VisuMZ['CoreEngine']['Settings'][_0x34f5c0('0x2aa')]['ColorMPGauge2'];return this[_0x34f5c0('0x2fb')](_0x312b1a,_0x2c48a2);},ColorManager[_0x21bc8a('0x89')]=function(){const _0x4f89a8=_0x21bc8a,_0x26b8f9=_0x4f89a8('0x8b');this['_colorCache']=this[_0x4f89a8('0x12')]||{};if(this[_0x4f89a8('0x12')][_0x26b8f9])return this['_colorCache'][_0x26b8f9];const _0x1b6532=VisuMZ[_0x4f89a8('0x503')][_0x4f89a8('0x4e5')]['Color'][_0x4f89a8('0x122')];return this[_0x4f89a8('0x2fb')](_0x26b8f9,_0x1b6532);},ColorManager[_0x21bc8a('0xe1')]=function(){const _0x1835bc=_0x21bc8a,_0x3f47dd=_0x1835bc('0x5d2');this[_0x1835bc('0x12')]=this[_0x1835bc('0x12')]||{};if(this[_0x1835bc('0x12')][_0x3f47dd])return this[_0x1835bc('0x12')][_0x3f47dd];const _0x155f15=VisuMZ[_0x1835bc('0x503')][_0x1835bc('0x4e5')][_0x1835bc('0x2aa')]['ColorPowerUp'];return this[_0x1835bc('0x2fb')](_0x3f47dd,_0x155f15);},ColorManager[_0x21bc8a('0x606')]=function(){const _0x401bca=_0x21bc8a,_0x432583=_0x401bca('0x4c');this[_0x401bca('0x12')]=this['_colorCache']||{};if(this['_colorCache'][_0x432583])return this[_0x401bca('0x12')][_0x432583];const _0x378230=VisuMZ[_0x401bca('0x503')][_0x401bca('0x4e5')]['Color'][_0x401bca('0x4dc')];return this[_0x401bca('0x2fb')](_0x432583,_0x378230);},ColorManager[_0x21bc8a('0x2d5')]=function(){const _0x391b73=_0x21bc8a,_0x524b4e=_0x391b73('0x5d1');this[_0x391b73('0x12')]=this[_0x391b73('0x12')]||{};if(this['_colorCache'][_0x524b4e])return this[_0x391b73('0x12')][_0x524b4e];const _0xca599=VisuMZ[_0x391b73('0x503')][_0x391b73('0x4e5')][_0x391b73('0x2aa')]['ColorCTGauge1'];return this['getColorDataFromPluginParameters'](_0x524b4e,_0xca599);},ColorManager[_0x21bc8a('0x692')]=function(){const _0x55ee21=_0x21bc8a,_0x232f01=_0x55ee21('0x65f');this[_0x55ee21('0x12')]=this['_colorCache']||{};if(this[_0x55ee21('0x12')][_0x232f01])return this['_colorCache'][_0x232f01];const _0x346dc3=VisuMZ[_0x55ee21('0x503')][_0x55ee21('0x4e5')][_0x55ee21('0x2aa')][_0x55ee21('0xd3')];return this[_0x55ee21('0x2fb')](_0x232f01,_0x346dc3);},ColorManager[_0x21bc8a('0x57')]=function(){const _0x340b45=_0x21bc8a,_0x47f40b='_stored_tpGaugeColor1';this[_0x340b45('0x12')]=this['_colorCache']||{};if(this[_0x340b45('0x12')][_0x47f40b])return this[_0x340b45('0x12')][_0x47f40b];const _0x670a1f=VisuMZ['CoreEngine'][_0x340b45('0x4e5')]['Color'][_0x340b45('0x35a')];return this['getColorDataFromPluginParameters'](_0x47f40b,_0x670a1f);},ColorManager[_0x21bc8a('0x659')]=function(){const _0x4307f4=_0x21bc8a,_0x721a4b=_0x4307f4('0x9');this[_0x4307f4('0x12')]=this[_0x4307f4('0x12')]||{};if(this['_colorCache'][_0x721a4b])return this[_0x4307f4('0x12')][_0x721a4b];const _0x175226=VisuMZ['CoreEngine'][_0x4307f4('0x4e5')][_0x4307f4('0x2aa')][_0x4307f4('0x239')];return this[_0x4307f4('0x2fb')](_0x721a4b,_0x175226);},ColorManager[_0x21bc8a('0x117')]=function(){const _0x27bbbf=_0x21bc8a,_0x341307=_0x27bbbf('0x60e');this[_0x27bbbf('0x12')]=this[_0x27bbbf('0x12')]||{};if(this[_0x27bbbf('0x12')][_0x341307])return this['_colorCache'][_0x341307];const _0x350711=VisuMZ[_0x27bbbf('0x503')][_0x27bbbf('0x4e5')][_0x27bbbf('0x2aa')][_0x27bbbf('0x42')];return this[_0x27bbbf('0x2fb')](_0x341307,_0x350711);},ColorManager[_0x21bc8a('0x30a')]=function(){const _0x31cb99=_0x21bc8a,_0x5b4d2b=_0x31cb99('0x2b2');this[_0x31cb99('0x12')]=this['_colorCache']||{};if(this[_0x31cb99('0x12')][_0x5b4d2b])return this[_0x31cb99('0x12')][_0x5b4d2b];const _0x262ea1=VisuMZ[_0x31cb99('0x503')]['Settings']['Color'][_0x31cb99('0x42')];return this[_0x31cb99('0x2fb')](_0x5b4d2b,_0x262ea1);},ColorManager['expGaugeColor1']=function(){const _0x5f421a=_0x21bc8a,_0x5d8d90=_0x5f421a('0x2e2');this[_0x5f421a('0x12')]=this[_0x5f421a('0x12')]||{};if(this[_0x5f421a('0x12')][_0x5d8d90])return this[_0x5f421a('0x12')][_0x5d8d90];const _0x1e3d75=VisuMZ[_0x5f421a('0x503')][_0x5f421a('0x4e5')][_0x5f421a('0x2aa')][_0x5f421a('0x128')];return this[_0x5f421a('0x2fb')](_0x5d8d90,_0x1e3d75);},ColorManager['expGaugeColor2']=function(){const _0x256f5e=_0x21bc8a,_0x32e619='_stored_expGaugeColor2';this['_colorCache']=this[_0x256f5e('0x12')]||{};if(this[_0x256f5e('0x12')][_0x32e619])return this['_colorCache'][_0x32e619];const _0x37187b=VisuMZ[_0x256f5e('0x503')][_0x256f5e('0x4e5')]['Color'][_0x256f5e('0x13e')];return this['getColorDataFromPluginParameters'](_0x32e619,_0x37187b);},ColorManager[_0x21bc8a('0xff')]=function(){const _0xd103d=_0x21bc8a,_0x3bb2a4=_0xd103d('0x11c');this[_0xd103d('0x12')]=this[_0xd103d('0x12')]||{};if(this[_0xd103d('0x12')][_0x3bb2a4])return this[_0xd103d('0x12')][_0x3bb2a4];const _0x12af0a=VisuMZ[_0xd103d('0x503')][_0xd103d('0x4e5')][_0xd103d('0x2aa')][_0xd103d('0xcb')];return this['getColorDataFromPluginParameters'](_0x3bb2a4,_0x12af0a);},ColorManager[_0x21bc8a('0x427')]=function(){const _0x3263bb=_0x21bc8a,_0x138f69='_stored_maxLvGaugeColor2';this[_0x3263bb('0x12')]=this[_0x3263bb('0x12')]||{};if(this[_0x3263bb('0x12')][_0x138f69])return this['_colorCache'][_0x138f69];const _0x37147b=VisuMZ['CoreEngine'][_0x3263bb('0x4e5')]['Color'][_0x3263bb('0x627')];return this[_0x3263bb('0x2fb')](_0x138f69,_0x37147b);},ColorManager[_0x21bc8a('0x138')]=function(_0x4c42df){const _0x1116b4=_0x21bc8a;return VisuMZ['CoreEngine'][_0x1116b4('0x4e5')][_0x1116b4('0x2aa')][_0x1116b4('0x5a2')][_0x1116b4('0x312')](this,_0x4c42df);},ColorManager['mpColor']=function(_0x18b822){const _0x3651cf=_0x21bc8a;return VisuMZ['CoreEngine'][_0x3651cf('0x4e5')][_0x3651cf('0x2aa')][_0x3651cf('0x398')][_0x3651cf('0x312')](this,_0x18b822);},ColorManager['tpColor']=function(_0x2c756e){const _0x1e68c5=_0x21bc8a;return VisuMZ[_0x1e68c5('0x503')][_0x1e68c5('0x4e5')][_0x1e68c5('0x2aa')]['ActorTPColor'][_0x1e68c5('0x312')](this,_0x2c756e);},ColorManager[_0x21bc8a('0x4f')]=function(_0x3df0ff){const _0x1f7dc2=_0x21bc8a;return VisuMZ[_0x1f7dc2('0x503')][_0x1f7dc2('0x4e5')][_0x1f7dc2('0x2aa')][_0x1f7dc2('0x62d')]['call'](this,_0x3df0ff);},ColorManager['damageColor']=function(_0x349e81){const _0x2afff1=_0x21bc8a;return VisuMZ[_0x2afff1('0x503')][_0x2afff1('0x4e5')][_0x2afff1('0x2aa')][_0x2afff1('0x54f')][_0x2afff1('0x312')](this,_0x349e81);},ColorManager[_0x21bc8a('0x2db')]=function(){const _0x25b517=_0x21bc8a;return VisuMZ[_0x25b517('0x503')][_0x25b517('0x4e5')]['Color'][_0x25b517('0x504')];},ColorManager[_0x21bc8a('0xce')]=function(){const _0x1d986f=_0x21bc8a;return VisuMZ['CoreEngine'][_0x1d986f('0x4e5')][_0x1d986f('0x2aa')][_0x1d986f('0x3e7')];},ColorManager[_0x21bc8a('0x4fb')]=function(){const _0x5dcf79=_0x21bc8a;return VisuMZ['CoreEngine'][_0x5dcf79('0x4e5')][_0x5dcf79('0x2aa')][_0x5dcf79('0x64e')];},ColorManager[_0x21bc8a('0x58f')]=function(){const _0x390ba3=_0x21bc8a;return VisuMZ['CoreEngine'][_0x390ba3('0x4e5')][_0x390ba3('0x2aa')][_0x390ba3('0x4ae')];},ColorManager[_0x21bc8a('0x178')]=function(){const _0x1c7520=_0x21bc8a;return VisuMZ[_0x1c7520('0x503')][_0x1c7520('0x4e5')][_0x1c7520('0x2aa')][_0x1c7520('0x598')];},SceneManager[_0x21bc8a('0x607')]=[],VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x636')]=SceneManager[_0x21bc8a('0x57f')],SceneManager[_0x21bc8a('0x57f')]=function(){const _0x2d8fa9=_0x21bc8a;VisuMZ[_0x2d8fa9('0x503')][_0x2d8fa9('0x636')]['call'](this),this[_0x2d8fa9('0x26f')]();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x134')]=SceneManager[_0x21bc8a('0x1ba')],SceneManager[_0x21bc8a('0x1ba')]=function(_0x3f427a){const _0x116510=_0x21bc8a;if($gameTemp)this[_0x116510('0x644')](_0x3f427a);VisuMZ[_0x116510('0x503')][_0x116510('0x134')][_0x116510('0x312')](this,_0x3f427a);},SceneManager[_0x21bc8a('0x644')]=function(_0x1fbcb8){const _0x33792c=_0x21bc8a;if(!_0x1fbcb8['ctrlKey']&&!_0x1fbcb8[_0x33792c('0x2a9')])switch(_0x1fbcb8['keyCode']){case 0x75:this[_0x33792c('0x4d9')]();break;case 0x76:this['playTestF7']();break;}},SceneManager[_0x21bc8a('0x4d9')]=function(){const _0x4b5601=_0x21bc8a;if($gameTemp[_0x4b5601('0x48')]()&&VisuMZ[_0x4b5601('0x503')][_0x4b5601('0x4e5')][_0x4b5601('0x1a7')][_0x4b5601('0x675')]){ConfigManager[_0x4b5601('0x1c5')]!==0x0?(ConfigManager[_0x4b5601('0x4c2')]=0x0,ConfigManager[_0x4b5601('0x5d7')]=0x0,ConfigManager[_0x4b5601('0x2bb')]=0x0,ConfigManager['seVolume']=0x0):(ConfigManager[_0x4b5601('0x4c2')]=0x64,ConfigManager[_0x4b5601('0x5d7')]=0x64,ConfigManager[_0x4b5601('0x2bb')]=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0x4b5601('0x632')]();if(this['_scene'][_0x4b5601('0x29f')]===Scene_Options){if(this[_0x4b5601('0x4a0')][_0x4b5601('0x31f')])this['_scene'][_0x4b5601('0x31f')][_0x4b5601('0x645')]();if(this[_0x4b5601('0x4a0')]['_listWindow'])this[_0x4b5601('0x4a0')][_0x4b5601('0xe7')][_0x4b5601('0x645')]();}}},SceneManager[_0x21bc8a('0x55f')]=function(){const _0x2f5283=_0x21bc8a;$gameTemp['isPlaytest']()&&VisuMZ[_0x2f5283('0x503')]['Settings'][_0x2f5283('0x1a7')]['F7key']&&($gameTemp[_0x2f5283('0x204')]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x21bc8a('0x26f')]=function(){const _0x1b84c5=_0x21bc8a;this[_0x1b84c5('0x278')]=![],this['_hideButtons']=!VisuMZ[_0x1b84c5('0x503')][_0x1b84c5('0x4e5')]['UI'][_0x1b84c5('0x183')];},SceneManager['setSideButtonLayout']=function(_0x502653){const _0x1c9572=_0x21bc8a;VisuMZ[_0x1c9572('0x503')][_0x1c9572('0x4e5')]['UI'][_0x1c9572('0x18a')]&&(this[_0x1c9572('0x278')]=_0x502653);},SceneManager[_0x21bc8a('0x1eb')]=function(){const _0x45694a=_0x21bc8a;return this[_0x45694a('0x278')];},SceneManager[_0x21bc8a('0x1a5')]=function(){const _0x46a22d=_0x21bc8a;return this[_0x46a22d('0x576')];},SceneManager[_0x21bc8a('0x587')]=function(){const _0x18609b=_0x21bc8a;return this[_0x18609b('0x1a5')]()||this[_0x18609b('0x1eb')]();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x363')]=SceneManager[_0x21bc8a('0x49f')],SceneManager[_0x21bc8a('0x49f')]=function(){const _0x3b0230=_0x21bc8a;return VisuMZ[_0x3b0230('0x503')]['Settings'][_0x3b0230('0x1a7')][_0x3b0230('0x2d4')]?VisuMZ['CoreEngine'][_0x3b0230('0x363')][_0x3b0230('0x312')](this):!![];},SceneManager[_0x21bc8a('0x43c')]=function(_0x16a875){const _0x3b2f4a=_0x21bc8a;if(_0x16a875 instanceof Error)this[_0x3b2f4a('0x52a')](_0x16a875);else{if(_0x16a875 instanceof Array&&_0x16a875[0x0]===_0x3b2f4a('0x5d9')){if('BuAiF'===_0x3b2f4a('0x326'))this[_0x3b2f4a('0x12b')](_0x16a875);else{function _0x33d1ea(){const _0x1c200f=_0x3b2f4a;return _0x24788b[_0x1c200f('0x503')][_0x1c200f('0x4e5')]['UI'][_0x1c200f('0x1c8')];}}}else this['catchUnknownError'](_0x16a875);}this[_0x3b2f4a('0x1a2')]();},VisuMZ['CoreEngine'][_0x21bc8a('0x649')]=BattleManager['processEscape'],BattleManager[_0x21bc8a('0x273')]=function(){const _0xdf4c03=_0x21bc8a;if(VisuMZ[_0xdf4c03('0x503')][_0xdf4c03('0x4e5')]['QoL'][_0xdf4c03('0x50')]){if(_0xdf4c03('0x2f6')===_0xdf4c03('0x2f6'))this[_0xdf4c03('0x61f')]();else{function _0x33954c(){const _0x3cca42=_0xdf4c03;_0x5ea3dc[_0x3cca42('0x503')][_0x3cca42('0x115')][_0x3cca42('0x312')](this),this[_0x3cca42('0x399')]();}}}else{if(_0xdf4c03('0xf3')!==_0xdf4c03('0xf3')){function _0xf7a98f(){const _0x1f80f8=_0xdf4c03;_0xec49f5[_0x1f80f8('0x503')]['Input_setupEventHandlers'][_0x1f80f8('0x312')](this),_0x4159ac[_0x1f80f8('0x206')](_0x1f80f8('0x123'),this[_0x1f80f8('0x334')][_0x1f80f8('0x608')](this));}}else return VisuMZ['CoreEngine'][_0xdf4c03('0x649')][_0xdf4c03('0x312')](this);}},BattleManager[_0x21bc8a('0x61f')]=function(){const _0x1f2d2e=_0x21bc8a;return $gameParty[_0x1f2d2e('0x180')](),SoundManager['playEscape'](),this[_0x1f2d2e('0x46b')](),!![];},BattleManager[_0x21bc8a('0x401')]=function(){const _0x1dd355=_0x21bc8a;return $gameSystem[_0x1dd355('0x41c')]()>=0x1;},BattleManager[_0x21bc8a('0x3f0')]=function(){const _0x4de6cc=_0x21bc8a;return $gameSystem[_0x4de6cc('0x41c')]()===0x1;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x51')]=Game_Temp['prototype'][_0x21bc8a('0x57f')],Game_Temp['prototype'][_0x21bc8a('0x57f')]=function(){const _0x12cdaf=_0x21bc8a;VisuMZ[_0x12cdaf('0x503')][_0x12cdaf('0x51')][_0x12cdaf('0x312')](this),this['forceOutOfPlaytest'](),this[_0x12cdaf('0x358')]();},Game_Temp[_0x21bc8a('0x5b4')][_0x21bc8a('0x5f4')]=function(){const _0x85a9e1=_0x21bc8a;VisuMZ['CoreEngine']['Settings'][_0x85a9e1('0x1a7')][_0x85a9e1('0xbb')]&&(this[_0x85a9e1('0x1b')]=![]);},Game_Temp[_0x21bc8a('0x5b4')]['createFauxAnimationQueue']=function(){const _0x553df6=_0x21bc8a;this[_0x553df6('0xd2')]=[];},Game_Temp['prototype'][_0x21bc8a('0x4ec')]=function(_0x2c03e0,_0x3f9289,_0x2e47af,_0x20c5aa){const _0x64401a=_0x21bc8a;if(!this[_0x64401a('0x4c5')]())return;_0x2e47af=_0x2e47af||![],_0x20c5aa=_0x20c5aa||![];if($dataAnimations[_0x3f9289]){if(_0x64401a('0x384')!==_0x64401a('0x384')){function _0x4f05e7(){const _0x15b518=_0x64401a;return _0x1036e2[_0x15b518('0x31c')]['CommandRect']['call'](this);}}else{const _0x34a9b2={'targets':_0x2c03e0,'animationId':_0x3f9289,'mirror':_0x2e47af,'mute':_0x20c5aa};this[_0x64401a('0xd2')][_0x64401a('0x5ca')](_0x34a9b2);for(const _0x3bc02b of _0x2c03e0){_0x3bc02b[_0x64401a('0x364')]&&_0x3bc02b[_0x64401a('0x364')]();}}}},Game_Temp[_0x21bc8a('0x5b4')]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x21bc8a('0x5b4')]['retrieveFauxAnimation']=function(){const _0x5497bc=_0x21bc8a;return this[_0x5497bc('0xd2')][_0x5497bc('0x136')]();},Game_Temp[_0x21bc8a('0x5b4')][_0x21bc8a('0x2b0')]=function(_0x5a8b7f){const _0x2b6091=_0x21bc8a;this[_0x2b6091('0x555')]=_0x5a8b7f;},Game_Temp[_0x21bc8a('0x5b4')][_0x21bc8a('0xd9')]=function(){const _0x1d84f2=_0x21bc8a;return this[_0x1d84f2('0x555')];},Game_Temp[_0x21bc8a('0x5b4')][_0x21bc8a('0x40b')]=function(){const _0x455f5a=_0x21bc8a;this[_0x455f5a('0x678')]=undefined,this[_0x455f5a('0x4c4')]=undefined;},Game_Temp[_0x21bc8a('0x5b4')][_0x21bc8a('0x325')]=function(_0x1b4212){const _0x5c433a=_0x21bc8a;if($gameMap&&$dataMap&&$dataMap[_0x5c433a('0x56')]){if(_0x5c433a('0x40e')!==_0x5c433a('0x2c9'))this[_0x5c433a('0x3ae')]($dataMap['note']);else{function _0x1745d6(){const _0x3680cf=_0x5c433a;_0x3a1a5b['CoreEngine']['Scene_Base_createWindowLayer'][_0x3680cf('0x312')](this),this[_0x3680cf('0x3c6')](),this[_0x3680cf('0x4aa')]['x']=_0x4ec448[_0x3680cf('0x23d')](this[_0x3680cf('0x4aa')]['x']),this[_0x3680cf('0x4aa')]['y']=_0xb18566[_0x3680cf('0x23d')](this[_0x3680cf('0x4aa')]['y']);}}}const _0x127eef=$dataTroops[_0x1b4212];_0x127eef&&this[_0x5c433a('0x3ae')](_0x127eef[_0x5c433a('0x5e4')]);},Game_Temp[_0x21bc8a('0x5b4')][_0x21bc8a('0x3ae')]=function(_0x1ae90c){const _0xe413a4=_0x21bc8a;if(!_0x1ae90c)return;if(_0x1ae90c[_0xe413a4('0x5c9')](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)){if(_0xe413a4('0x496')!=='kiDsM')this[_0xe413a4('0x678')]='FV';else{function _0x40976b(){const _0x41a8ee=_0xe413a4;_0x1d2345[_0x41a8ee('0xe5')][0x23]=_0x41a8ee('0x4f6'),_0x2a39cf[_0x41a8ee('0xe5')][0x24]=_0x41a8ee('0x40c');}}}else{if(_0x1ae90c[_0xe413a4('0x5c9')](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0xe413a4('0xd1')===_0xe413a4('0x4bd')){function _0x53316d(){const _0x3e7601=_0xe413a4;_0xeed891[_0x3e7601('0x503')]['SceneManager_initialize'][_0x3e7601('0x312')](this),this[_0x3e7601('0x26f')]();}}else this[_0xe413a4('0x678')]='SV';}else{if(_0x1ae90c[_0xe413a4('0x5c9')](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x534da9=String(RegExp['$1']);if(_0x534da9[_0xe413a4('0x5c9')](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0xe413a4('0x678')]='FV';else{if(_0x534da9[_0xe413a4('0x5c9')](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0xe413a4('0x1a1')!==_0xe413a4('0x349'))this[_0xe413a4('0x678')]='SV';else{function _0x433187(){const _0x6f21c7=_0xe413a4;let _0x3c8e09=_0x49d553[_0x6f21c7('0x503')][_0x6f21c7('0x4d2')][_0x6f21c7('0x312')](this,_0x359440);return _0x3c8e09['x']=_0x4290f3[_0x6f21c7('0x23d')](_0x3c8e09['x']),_0x3c8e09['y']=_0x9ef027[_0x6f21c7('0x23d')](_0x3c8e09['y']),_0x3c8e09[_0x6f21c7('0x65')]=_0x1ff50f[_0x6f21c7('0x23d')](_0x3c8e09[_0x6f21c7('0x65')]),_0x3c8e09[_0x6f21c7('0x585')]=_0x31fff6[_0x6f21c7('0x23d')](_0x3c8e09[_0x6f21c7('0x585')]),_0x3c8e09;}}}}}}}if(_0x1ae90c[_0xe413a4('0x5c9')](/<(?:DTB)>/i)){if('vwiQw'===_0xe413a4('0x104'))this['_forcedBattleSys']=0x0;else{function _0x4cdb04(){return!![];}}}else{if(_0x1ae90c[_0xe413a4('0x5c9')](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0xe413a4('0x4c4')]=0x1;else{if(_0x1ae90c[_0xe413a4('0x5c9')](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x1ae90c['match'](/<(?:CTB)>/i))Imported[_0xe413a4('0xad')]&&(this[_0xe413a4('0x4c4')]='CTB');else{if(_0x1ae90c[_0xe413a4('0x5c9')](/<(?:STB)>/i))Imported[_0xe413a4('0x52f')]&&(this[_0xe413a4('0x4c4')]=_0xe413a4('0x441'));else{if(_0x1ae90c[_0xe413a4('0x5c9')](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4e8bc3=String(RegExp['$1']);if(_0x4e8bc3[_0xe413a4('0x5c9')](/DTB/i))this[_0xe413a4('0x4c4')]=0x0;else{if(_0x4e8bc3[_0xe413a4('0x5c9')](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x4e8bc3['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0xe413a4('0x4c4')]=0x2;else{if(_0x4e8bc3[_0xe413a4('0x5c9')](/CTB/i))Imported[_0xe413a4('0xad')]&&(this['_forcedBattleSys']=_0xe413a4('0x77'));else{if(_0x4e8bc3[_0xe413a4('0x5c9')](/STB/i)){if(_0xe413a4('0x428')===_0xe413a4('0x533')){function _0x1fc455(){const _0x3f272=_0xe413a4;if(_0x2ba5f6[_0x3f272('0x62e')]!==this[_0x3f272('0x62e')]())return![];return _0x50a177[_0x3f272('0x503')][_0x3f272('0x4e5')][_0x3f272('0x5e6')][_0x3f272('0x657')];}}else Imported[_0xe413a4('0x52f')]&&(this[_0xe413a4('0x4c4')]=_0xe413a4('0x441'));}}}}}}}}}}}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x352')]=Game_System[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')],Game_System['prototype'][_0x21bc8a('0x57f')]=function(){const _0x3995fa=_0x21bc8a;VisuMZ[_0x3995fa('0x503')]['Game_System_initialize'][_0x3995fa('0x312')](this),this[_0x3995fa('0x5f7')]();},Game_System[_0x21bc8a('0x5b4')]['initCoreEngine']=function(){const _0x5bb25b=_0x21bc8a;this[_0x5bb25b('0x5bc')]={'SideView':$dataSystem[_0x5bb25b('0x179')],'BattleSystem':this[_0x5bb25b('0x3f3')](),'FontSize':$dataSystem[_0x5bb25b('0x262')][_0x5bb25b('0x41a')],'Padding':0xc};},Game_System[_0x21bc8a('0x5b4')][_0x21bc8a('0x1e3')]=function(){const _0xd7bce2=_0x21bc8a;if($gameTemp[_0xd7bce2('0x678')]==='SV')return!![];else{if($gameTemp[_0xd7bce2('0x678')]==='FV')return![];}if(this[_0xd7bce2('0x5bc')]===undefined)this[_0xd7bce2('0x5f7')]();if(this[_0xd7bce2('0x5bc')][_0xd7bce2('0x57e')]===undefined)this[_0xd7bce2('0x5f7')]();return this['_CoreEngineSettings'][_0xd7bce2('0x57e')];},Game_System[_0x21bc8a('0x5b4')][_0x21bc8a('0xe4')]=function(_0x4c801d){const _0x41c086=_0x21bc8a;if(this[_0x41c086('0x5bc')]===undefined)this[_0x41c086('0x5f7')]();if(this[_0x41c086('0x5bc')][_0x41c086('0x57e')]===undefined)this['initCoreEngine']();this[_0x41c086('0x5bc')][_0x41c086('0x57e')]=_0x4c801d;},Game_System['prototype']['resetBattleSystem']=function(){const _0x46a71c=_0x21bc8a;if(this[_0x46a71c('0x5bc')]===undefined)this[_0x46a71c('0x5f7')]();this[_0x46a71c('0x5bc')][_0x46a71c('0x38c')]=this['initialBattleSystem']();},Game_System['prototype'][_0x21bc8a('0x3f3')]=function(){const _0x47cea3=_0x21bc8a,_0x3acb71=(VisuMZ[_0x47cea3('0x503')][_0x47cea3('0x4e5')]['BattleSystem']||'DATABASE')['toUpperCase']()[_0x47cea3('0x482')]();return VisuMZ[_0x47cea3('0x503')]['CreateBattleSystemID'](_0x3acb71);},Game_System[_0x21bc8a('0x5b4')]['getBattleSystem']=function(){const _0x20f35c=_0x21bc8a;if($gameTemp[_0x20f35c('0x4c4')]!==undefined){if(_0x20f35c('0x166')==='OLdyH')return $gameTemp['_forcedBattleSys'];else{function _0x19f65b(){const _0x4d7ccb=_0x20f35c;this['_colorCache'][_0x508b45]=this[_0x4d7ccb('0x2c3')](_0x2971af(_0x48b938));}}}if(this[_0x20f35c('0x5bc')]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x20f35c('0x38c')]===undefined)this[_0x20f35c('0x290')]();return this[_0x20f35c('0x5bc')][_0x20f35c('0x38c')];},Game_System[_0x21bc8a('0x5b4')]['setBattleSystem']=function(_0x416549){const _0x453a9a=_0x21bc8a;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x453a9a('0x5bc')][_0x453a9a('0x38c')]===undefined)this[_0x453a9a('0x290')]();this[_0x453a9a('0x5bc')][_0x453a9a('0x38c')]=_0x416549;},Game_System[_0x21bc8a('0x5b4')][_0x21bc8a('0x26')]=function(){const _0x1a8c8e=_0x21bc8a;if(this[_0x1a8c8e('0x5bc')]===undefined)this[_0x1a8c8e('0x5f7')]();if(this['_CoreEngineSettings'][_0x1a8c8e('0x50e')]===undefined)this[_0x1a8c8e('0x5f7')]();return this[_0x1a8c8e('0x5bc')][_0x1a8c8e('0x50e')];},Game_System[_0x21bc8a('0x5b4')][_0x21bc8a('0x4d8')]=function(_0x4cd6cd){const _0x5d9f61=_0x21bc8a;if(this[_0x5d9f61('0x5bc')]===undefined)this[_0x5d9f61('0x5f7')]();if(this[_0x5d9f61('0x5bc')][_0x5d9f61('0x147')]===undefined)this[_0x5d9f61('0x5f7')]();this[_0x5d9f61('0x5bc')][_0x5d9f61('0x50e')]=_0x4cd6cd;},Game_System[_0x21bc8a('0x5b4')][_0x21bc8a('0x426')]=function(){const _0x596c31=_0x21bc8a;if(this['_CoreEngineSettings']===undefined)this[_0x596c31('0x5f7')]();if(this[_0x596c31('0x5bc')]['Padding']===undefined)this[_0x596c31('0x5f7')]();return this[_0x596c31('0x5bc')][_0x596c31('0x5f5')];},Game_System['prototype'][_0x21bc8a('0x1e2')]=function(_0x437261){const _0x359807=_0x21bc8a;if(this[_0x359807('0x5bc')]===undefined)this[_0x359807('0x5f7')]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this['initCoreEngine']();this[_0x359807('0x5bc')][_0x359807('0x5f5')]=_0x437261;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x574')]=Game_Screen[_0x21bc8a('0x5b4')]['initialize'],Game_Screen[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')]=function(){const _0x40795e=_0x21bc8a;VisuMZ[_0x40795e('0x503')][_0x40795e('0x574')]['call'](this),this[_0x40795e('0x146')]();},Game_Screen['prototype'][_0x21bc8a('0x146')]=function(){const _0x5aa8cd=_0x21bc8a,_0x2ef151=VisuMZ[_0x5aa8cd('0x503')][_0x5aa8cd('0x4e5')][_0x5aa8cd('0x261')];this[_0x5aa8cd('0x689')]=_0x2ef151?.['DefaultStyle']||'random';},Game_Screen[_0x21bc8a('0x5b4')][_0x21bc8a('0x321')]=function(){const _0x22193f=_0x21bc8a;if(this[_0x22193f('0x689')]===undefined)this['initCoreEngineScreenShake']();return this[_0x22193f('0x689')];},Game_Screen[_0x21bc8a('0x5b4')]['setCoreEngineScreenShakeStyle']=function(_0x1f6880){const _0x4aeb50=_0x21bc8a;if(this[_0x4aeb50('0x689')]===undefined)this['initCoreEngineScreenShake']();this['_coreEngineShakeStyle']=_0x1f6880[_0x4aeb50('0x615')]()[_0x4aeb50('0x482')]();},Game_Picture['prototype'][_0x21bc8a('0x25c')]=function(){const _0x4d1981=_0x21bc8a;if($gameParty[_0x4d1981('0x621')]())return![];return this[_0x4d1981('0x5e4')]()&&this[_0x4d1981('0x5e4')]()['charAt'](0x0)==='!';},VisuMZ['CoreEngine'][_0x21bc8a('0x342')]=Game_Picture[_0x21bc8a('0x5b4')]['x'],Game_Picture[_0x21bc8a('0x5b4')]['x']=function(){const _0x11b24c=_0x21bc8a;if(this['isMapScrollLinked']()){if('wnlPx'==='nSCrX'){function _0x44082b(){const _0x59da69=_0x492f;_0x4f5365[_0x59da69('0x503')][_0x59da69('0x47c')][_0x59da69('0x312')](this),_0x1f95cc[_0x59da69('0x40b')]();}}else return this[_0x11b24c('0x4c1')]();}else return VisuMZ[_0x11b24c('0x503')][_0x11b24c('0x342')][_0x11b24c('0x312')](this);},Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x4c1')]=function(){const _0x476a04=_0x21bc8a,_0x319961=$gameMap[_0x476a04('0x66e')]()*$gameMap['tileWidth']();return this['_x']-_0x319961;},VisuMZ['CoreEngine'][_0x21bc8a('0x294')]=Game_Picture['prototype']['y'],Game_Picture[_0x21bc8a('0x5b4')]['y']=function(){const _0x344892=_0x21bc8a;if(this[_0x344892('0x25c')]())return this[_0x344892('0x24a')]();else{if(_0x344892('0x8')==='dKGRv'){function _0x2233a2(){const _0xd72f74=_0x344892;_0x270cf9[_0xd72f74('0x503')]['Scene_Boot_loadSystemImages'][_0xd72f74('0x312')](this),this['loadGameImagesCoreEngine']();}}else return VisuMZ['CoreEngine'][_0x344892('0x294')]['call'](this);}},Game_Picture['prototype'][_0x21bc8a('0x24a')]=function(){const _0x5af848=_0x21bc8a,_0xc79f9e=$gameMap['displayY']()*$gameMap[_0x5af848('0x46f')]();return this['_y']-_0xc79f9e;},Game_Picture['prototype'][_0x21bc8a('0x46d')]=function(_0x3d7877){const _0x129bcd=_0x21bc8a;this[_0x129bcd('0x225')]=_0x3d7877;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x3a6')]=Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x212')],Game_Picture[_0x21bc8a('0x5b4')]['calcEasing']=function(_0x2cb9b9){const _0x1c7da1=_0x21bc8a;this[_0x1c7da1('0x225')]=this[_0x1c7da1('0x225')]||0x0;if([0x0,0x1,0x2,0x3][_0x1c7da1('0x666')](this[_0x1c7da1('0x225')])){if(_0x1c7da1('0x68d')!==_0x1c7da1('0x2e7'))return VisuMZ[_0x1c7da1('0x503')][_0x1c7da1('0x3a6')][_0x1c7da1('0x312')](this,_0x2cb9b9);else{function _0x3680c6(){const _0x299c90=_0x1c7da1;return _0x160eb8[_0x299c90('0x503')][_0x299c90('0x4e5')][_0x299c90('0x17')][_0x299c90('0xdb')];}}}else{if(_0x1c7da1('0x98')===_0x1c7da1('0x98'))return VisuMZ[_0x1c7da1('0x274')](_0x2cb9b9,this[_0x1c7da1('0x225')]);else{function _0x403fcd(){_0x87ae1b=_0x52509a['max'](_0xbbe67b,_0x1ef0e9(_0x1689d4(_0x129e3b)));}}}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x29d')]=Game_Action[_0x21bc8a('0x5b4')][_0x21bc8a('0x51a')],Game_Action[_0x21bc8a('0x5b4')][_0x21bc8a('0x51a')]=function(_0x2e2756){const _0x48efff=_0x21bc8a;if(VisuMZ['CoreEngine'][_0x48efff('0x4e5')][_0x48efff('0x1a7')][_0x48efff('0x507')])return this[_0x48efff('0x64f')](_0x2e2756);else{if(_0x48efff('0xf0')!==_0x48efff('0xf0')){function _0x360e28(){const _0x24007b=_0x48efff,_0x5af647=_0x24007b('0x505');this[_0x24007b('0x12')]=this[_0x24007b('0x12')]||{};if(this['_colorCache'][_0x5af647])return this[_0x24007b('0x12')][_0x5af647];const _0x5a6ea6=_0x2c3be5[_0x24007b('0x503')][_0x24007b('0x4e5')][_0x24007b('0x2aa')][_0x24007b('0x64')];return this[_0x24007b('0x2fb')](_0x5af647,_0x5a6ea6);}}else return VisuMZ[_0x48efff('0x503')][_0x48efff('0x29d')]['call'](this,_0x2e2756);}},Game_Action[_0x21bc8a('0x5b4')]['itemHitImprovedAccuracy']=function(_0x5155cf){const _0x576bf0=_0x21bc8a,_0x5780b9=this[_0x576bf0('0x62c')](_0x5155cf),_0x15a3d8=this[_0x576bf0('0x389')](_0x5155cf),_0x2c45bc=this[_0x576bf0('0x24f')](_0x5155cf);return _0x5780b9*(_0x15a3d8-_0x2c45bc);},VisuMZ['CoreEngine'][_0x21bc8a('0x5f9')]=Game_Action[_0x21bc8a('0x5b4')]['itemEva'],Game_Action[_0x21bc8a('0x5b4')]['itemEva']=function(_0x348690){const _0x318105=_0x21bc8a;return VisuMZ['CoreEngine'][_0x318105('0x4e5')][_0x318105('0x1a7')][_0x318105('0x507')]?0x0:VisuMZ[_0x318105('0x503')][_0x318105('0x5f9')][_0x318105('0x312')](this,_0x348690);},Game_Action[_0x21bc8a('0x5b4')][_0x21bc8a('0x62c')]=function(_0xe330f){const _0x416ad9=_0x21bc8a;return this[_0x416ad9('0x498')]()[_0x416ad9('0x56f')]*0.01;},Game_Action[_0x21bc8a('0x5b4')][_0x21bc8a('0x389')]=function(_0x37284f){const _0x51c730=_0x21bc8a;if(VisuMZ[_0x51c730('0x503')][_0x51c730('0x4e5')][_0x51c730('0x1a7')][_0x51c730('0xb2')]&&this[_0x51c730('0x7f')]())return 0x1;if(this[_0x51c730('0x462')]()){if(VisuMZ['CoreEngine'][_0x51c730('0x4e5')]['QoL'][_0x51c730('0xb2')]&&this[_0x51c730('0xd8')]()[_0x51c730('0x2e0')]()){if(_0x51c730('0x3bf')==='CjEQx')return this[_0x51c730('0xd8')]()[_0x51c730('0x54d')]+0.05;else{function _0x16b8e2(){const _0x12eb59=_0x51c730;_0x54dcce[_0x12eb59('0x3e')]=!![];}}}else{if(_0x51c730('0x3b')===_0x51c730('0x4a6')){function _0x2cb609(){const _0x34b445=_0x51c730;this[_0x34b445('0x44c')](_0x566f87[_0x34b445('0x503')][_0x34b445('0x4e5')][_0x34b445('0x5e6')][_0x34b445('0x4b3')],_0x453baa['x'],_0x5597c6['y'],_0x428f9d[_0x34b445('0x65')],_0x34b445('0x5bb'));}}else return this[_0x51c730('0xd8')]()[_0x51c730('0x54d')];}}else{if(_0x51c730('0xa8')!=='gTgia'){function _0x5ab083(){const _0x12c4ea=_0x51c730;_0x3cbf7c[_0x12c4ea('0x503')][_0x12c4ea('0x4e5')]['QoL'][_0x12c4ea('0x676')]?this['_drawTextShadow'](_0x5e0903,_0x475f48,_0x5cd589,_0x334c3c):_0x36ba5c[_0x12c4ea('0x503')][_0x12c4ea('0x291')][_0x12c4ea('0x312')](this,_0x518bdd,_0x5bed5d,_0x1d51b8,_0x32ceed);}}else return 0x1;}},Game_Action[_0x21bc8a('0x5b4')][_0x21bc8a('0x24f')]=function(_0x199773){const _0xccd8df=_0x21bc8a;if(this[_0xccd8df('0xd8')]()[_0xccd8df('0x2e0')]()===_0x199773['isActor']())return 0x0;if(this[_0xccd8df('0x462')]())return VisuMZ[_0xccd8df('0x503')][_0xccd8df('0x4e5')][_0xccd8df('0x1a7')][_0xccd8df('0xb2')]&&_0x199773['isEnemy']()?_0x199773['eva']-0.05:_0x199773['eva'];else{if(this[_0xccd8df('0x1f0')]())return _0x199773[_0xccd8df('0x66f')];else{if('mNkko'!==_0xccd8df('0x1c2')){function _0x46b5f1(){const _0x488ffe=_0xccd8df;this[_0x488ffe('0x47a')]>0x0&&(this[_0x488ffe('0x295')]['x']=this[_0x488ffe('0x35f')](this[_0x488ffe('0x295')]['x'],this['_targetAnchor']['x']),this['_anchor']['y']=this[_0x488ffe('0x35f')](this['_anchor']['y'],this[_0x488ffe('0x4b1')]['y']));}}else return 0x0;}}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0xc6')]=Game_Action[_0x21bc8a('0x5b4')][_0x21bc8a('0x2bc')],Game_Action[_0x21bc8a('0x5b4')][_0x21bc8a('0x2bc')]=function(_0x1272a4){const _0x2ff800=_0x21bc8a;VisuMZ[_0x2ff800('0x503')]['Game_Action_updateLastTarget'][_0x2ff800('0x312')](this,_0x1272a4);if(VisuMZ['CoreEngine']['Settings'][_0x2ff800('0x1a7')][_0x2ff800('0x507')])return;const _0x2e2d3d=_0x1272a4[_0x2ff800('0x1af')]();if(_0x2e2d3d[_0x2ff800('0x43f')]){if(_0x2ff800('0x2ac')!==_0x2ff800('0x173'))0x1-this['itemEva'](_0x1272a4)>this[_0x2ff800('0x51a')](_0x1272a4)&&(_0x2e2d3d[_0x2ff800('0x43f')]=![],_0x2e2d3d[_0x2ff800('0x1f3')]=!![]);else{function _0x1b4f4e(){const _0x31d04b=_0x2ff800;this[_0x31d04b('0x392')](_0x2c675b),this['centerSprite'](_0x171128);}}}},VisuMZ['CoreEngine'][_0x21bc8a('0x253')]=Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x411')],Game_BattlerBase['prototype'][_0x21bc8a('0x411')]=function(){const _0x59c8b3=_0x21bc8a;this[_0x59c8b3('0x5b5')]={},VisuMZ[_0x59c8b3('0x503')][_0x59c8b3('0x253')][_0x59c8b3('0x312')](this);},VisuMZ['CoreEngine'][_0x21bc8a('0x22')]=Game_BattlerBase[_0x21bc8a('0x5b4')]['refresh'],Game_BattlerBase['prototype']['refresh']=function(){const _0x2ff747=_0x21bc8a;this[_0x2ff747('0x5b5')]={},VisuMZ[_0x2ff747('0x503')]['Game_BattlerBase_refresh'][_0x2ff747('0x312')](this);},Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x3b9')]=function(_0x170291){const _0x292b06=_0x21bc8a;return this['_cache']=this[_0x292b06('0x5b5')]||{},this['_cache'][_0x170291]!==undefined;},Game_BattlerBase[_0x21bc8a('0x5b4')]['paramPlus']=function(_0x437524){const _0x497598=_0x21bc8a,_0x2c8633=(_0x3612bd,_0x59f2f0)=>{const _0x567499=_0x492f;if(!_0x59f2f0)return _0x3612bd;if(_0x59f2f0['note']['match'](VisuMZ['CoreEngine'][_0x567499('0xfe')][_0x567499('0x3e6')][_0x437524])){if(_0x567499('0x293')===_0x567499('0x1a')){function _0x191711(){const _0x5d160e=_0x567499;_0x1acb24['seVolume']!==0x0?(_0x41a579[_0x5d160e('0x4c2')]=0x0,_0x30707d[_0x5d160e('0x5d7')]=0x0,_0x2a2c10['meVolume']=0x0,_0x4b6532[_0x5d160e('0x1c5')]=0x0):(_0x177283[_0x5d160e('0x4c2')]=0x64,_0x4fb601[_0x5d160e('0x5d7')]=0x64,_0x44cd89[_0x5d160e('0x2bb')]=0x64,_0x36df24[_0x5d160e('0x1c5')]=0x64);_0x965f2f[_0x5d160e('0x632')]();if(this[_0x5d160e('0x4a0')][_0x5d160e('0x29f')]===_0x3f304c){if(this[_0x5d160e('0x4a0')]['_optionsWindow'])this[_0x5d160e('0x4a0')][_0x5d160e('0x31f')][_0x5d160e('0x645')]();if(this['_scene'][_0x5d160e('0xe7')])this[_0x5d160e('0x4a0')][_0x5d160e('0xe7')]['refresh']();}}}else{var _0x384ba4=Number(RegExp['$1']);_0x3612bd+=_0x384ba4;}}if(_0x59f2f0[_0x567499('0x56')][_0x567499('0x5c9')](VisuMZ[_0x567499('0x503')][_0x567499('0xfe')][_0x567499('0x189')][_0x437524])){var _0x5816a4=String(RegExp['$1']);try{if(_0x567499('0x394')===_0x567499('0x214')){function _0x11788d(){const _0x258f95=_0x567499;this[_0x258f95('0x225')]=_0x3602bf;}}else _0x3612bd+=eval(_0x5816a4);}catch(_0x2fd395){if(_0x567499('0x287')!==_0x567499('0x3b5')){if($gameTemp['isPlaytest']())console['log'](_0x2fd395);}else{function _0x19b7b6(){const _0xce3230=_0x567499;if(_0x2af241&&_0x137c4d[_0xce3230('0x59b')]())return;_0x142df7[_0xce3230('0x503')][_0xce3230('0x80')][_0xce3230('0x312')](this,_0xe62181,_0xb883a5,_0xa72971,_0x13f7ab);}}}}return _0x3612bd;};return this[_0x497598('0x550')]()[_0x497598('0x68')](_0x2c8633,this[_0x497598('0x302')][_0x437524]);},Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x2e3')]=function(_0x21eb60){const _0x3f4a3f=_0x21bc8a;var _0x4cd3e3='Basic'+(this['isActor']()?'Actor':_0x3f4a3f('0x4bf'))+'ParamMax'+_0x21eb60;if(this['checkCacheKey'](_0x4cd3e3))return this[_0x3f4a3f('0x5b5')][_0x4cd3e3];this[_0x3f4a3f('0x5b5')][_0x4cd3e3]=eval(VisuMZ[_0x3f4a3f('0x503')][_0x3f4a3f('0x4e5')][_0x3f4a3f('0x119')][_0x4cd3e3]);const _0xce170e=(_0x1e1104,_0x5d292c)=>{const _0x412a77=_0x3f4a3f;if(_0x412a77('0x569')==='fAuwh'){if(!_0x5d292c)return _0x1e1104;if(_0x5d292c[_0x412a77('0x56')][_0x412a77('0x5c9')](VisuMZ[_0x412a77('0x503')]['RegExp'][_0x412a77('0x2e3')][_0x21eb60])){var _0x2bdd5e=Number(RegExp['$1']);if(_0x2bdd5e===0x0)_0x2bdd5e=Number[_0x412a77('0x2c')];_0x1e1104=Math[_0x412a77('0x19b')](_0x1e1104,_0x2bdd5e);}if(_0x5d292c[_0x412a77('0x56')]['match'](VisuMZ['CoreEngine']['RegExp'][_0x412a77('0x436')][_0x21eb60])){var _0x583864=String(RegExp['$1']);try{_0x1e1104=Math['max'](_0x1e1104,Number(eval(_0x583864)));}catch(_0x234ee7){if($gameTemp[_0x412a77('0x48')]())console[_0x412a77('0x255')](_0x234ee7);}}return _0x1e1104;}else{function _0x1653ce(){const _0x2a7123=_0x412a77;let _0x424bbb=this[_0x2a7123('0x2ea')]();const _0x1e02e0=this['maxItems'](),_0x279a80=this['maxCols']();if(this[_0x2a7123('0x4a')]()&&(_0x424bbb<_0x1e02e0||_0x436c0f&&_0x279a80===0x1)){_0x424bbb+=_0x279a80;if(_0x424bbb>=_0x1e02e0)_0x424bbb=_0x1e02e0-0x1;this[_0x2a7123('0x5c6')](_0x424bbb);}else!this[_0x2a7123('0x4a')]()&&((_0x424bbb<_0x1e02e0-_0x279a80||_0x1075f7&&_0x279a80===0x1)&&this['smoothSelect']((_0x424bbb+_0x279a80)%_0x1e02e0));}}};if(this[_0x3f4a3f('0x5b5')][_0x4cd3e3]===0x0)this[_0x3f4a3f('0x5b5')][_0x4cd3e3]=Number['MAX_SAFE_INTEGER'];return this['_cache'][_0x4cd3e3]=this[_0x3f4a3f('0x550')]()['reduce'](_0xce170e,this['_cache'][_0x4cd3e3]),this[_0x3f4a3f('0x5b5')][_0x4cd3e3];},Game_BattlerBase[_0x21bc8a('0x5b4')]['paramRate']=function(_0x4e867d){const _0x2d2a56=_0x21bc8a,_0x150021=this[_0x2d2a56('0x15f')](Game_BattlerBase[_0x2d2a56('0x18')],_0x4e867d),_0x14e7e1=(_0x3a7ba9,_0x591fce)=>{const _0x2197e5=_0x2d2a56;if(!_0x591fce)return _0x3a7ba9;if(_0x591fce[_0x2197e5('0x56')][_0x2197e5('0x5c9')](VisuMZ[_0x2197e5('0x503')][_0x2197e5('0xfe')][_0x2197e5('0x2cb')][_0x4e867d])){var _0x5f12db=Number(RegExp['$1'])/0x64;_0x3a7ba9*=_0x5f12db;}if(_0x591fce['note'][_0x2197e5('0x5c9')](VisuMZ[_0x2197e5('0x503')][_0x2197e5('0xfe')][_0x2197e5('0x309')][_0x4e867d])){if('RrIal'!==_0x2197e5('0x2e5')){var _0x5f12db=Number(RegExp['$1']);_0x3a7ba9*=_0x5f12db;}else{function _0xcb8967(){const _0x44b081=_0x2197e5;var _0x5c2c51=_0x42cc21(_0x55bcfe['$1']);try{_0x480050+=_0x5e142d(_0x5c2c51);}catch(_0x19cd04){if(_0x156be8[_0x44b081('0x48')]())_0x380b63[_0x44b081('0x255')](_0x19cd04);}}}}if(_0x591fce[_0x2197e5('0x56')][_0x2197e5('0x5c9')](VisuMZ[_0x2197e5('0x503')][_0x2197e5('0xfe')][_0x2197e5('0x281')][_0x4e867d])){if(_0x2197e5('0x54a')===_0x2197e5('0x28a')){function _0x3557cb(){const _0x350a4c=_0x2197e5,_0x589a27=_0x807115[_0x350a4c('0x503')][_0x350a4c('0x4e5')][_0x350a4c('0x261')];if(_0x589a27&&_0x589a27[_0x350a4c('0x2bf')])return _0x589a27[_0x350a4c('0x2bf')][_0x350a4c('0x312')](this);const _0x3a5081=_0x1cb3cd[_0x350a4c('0xfd')]*0.75,_0x443854=_0x4f4e0b['_shakeSpeed']*0.6,_0x446e54=_0xf12515['_shakeDuration'];this['y']+=_0x24cf5['round'](_0x1ff685[_0x350a4c('0x53')](_0x3a5081)-_0x65a90['randomInt'](_0x443854))*(_0x243dae[_0x350a4c('0x509')](_0x446e54,0x1e)*0.5);}}else{var _0x17ab25=String(RegExp['$1']);try{_0x3a7ba9*=eval(_0x17ab25);}catch(_0x294714){if(_0x2197e5('0x24e')!=='geQWd'){if($gameTemp['isPlaytest']())console['log'](_0x294714);}else{function _0x45aa54(){const _0x247881=_0x2197e5;return _0x12635e[_0x247881('0x31c')]['InputRect'][_0x247881('0x312')](this);}}}}}return _0x3a7ba9;};return this[_0x2d2a56('0x550')]()[_0x2d2a56('0x68')](_0x14e7e1,_0x150021);},Game_BattlerBase['prototype'][_0x21bc8a('0x65c')]=function(_0x4b59f3){const _0x149393=_0x21bc8a,_0x358dd3=(_0x3b4659,_0x1b588d)=>{const _0xfb5342=_0x492f;if(_0xfb5342('0x48f')==='eIlfZ'){if(!_0x1b588d)return _0x3b4659;if(_0x1b588d['note'][_0xfb5342('0x5c9')](VisuMZ[_0xfb5342('0x503')][_0xfb5342('0xfe')]['paramFlat'][_0x4b59f3])){if(_0xfb5342('0x25')===_0xfb5342('0x1d9')){function _0x244ff4(){const _0x59f0c9=_0xfb5342;return _0x477c2d[_0x59f0c9('0x503')][_0x59f0c9('0x3a6')][_0x59f0c9('0x312')](this,_0x271b40);}}else{var _0x50104b=Number(RegExp['$1']);_0x3b4659+=_0x50104b;}}if(_0x1b588d[_0xfb5342('0x56')][_0xfb5342('0x5c9')](VisuMZ[_0xfb5342('0x503')][_0xfb5342('0xfe')][_0xfb5342('0x25d')][_0x4b59f3])){var _0x53ff51=String(RegExp['$1']);try{if(_0xfb5342('0x480')===_0xfb5342('0x29e')){function _0xaf9e3d(){const _0x3a8dd0=_0xfb5342;return _0x4b2ee7[_0x3a8dd0('0x31c')][_0x3a8dd0('0x661')]['call'](this);}}else _0x3b4659+=eval(_0x53ff51);}catch(_0xff7d13){if($gameTemp[_0xfb5342('0x48')]())console[_0xfb5342('0x255')](_0xff7d13);}}return _0x3b4659;}else{function _0x3aa559(){return 0.5*_0x1d5c65*_0x19c9b0*((_0x230fd3+0x1)*_0x1a00e8-_0x163fea);}}};return this[_0x149393('0x550')]()[_0x149393('0x68')](_0x358dd3,0x0);},Game_BattlerBase['prototype'][_0x21bc8a('0xf8')]=function(_0x94ad35){const _0x28fe9d=_0x21bc8a;let _0x3fb02b=_0x28fe9d('0xf8')+_0x94ad35+_0x28fe9d('0x664');if(this[_0x28fe9d('0x3b9')](_0x3fb02b))return this['_cache'][_0x3fb02b];return this[_0x28fe9d('0x5b5')][_0x3fb02b]=Math[_0x28fe9d('0x23d')](VisuMZ[_0x28fe9d('0x503')]['Settings'][_0x28fe9d('0x119')][_0x28fe9d('0x44f')][_0x28fe9d('0x312')](this,_0x94ad35)),this[_0x28fe9d('0x5b5')][_0x3fb02b];},Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0xec')]=function(_0x554825){const _0x28e1ea=_0x21bc8a,_0x20877d=(_0x36f2af,_0x2b1cb6)=>{const _0x369d34=_0x492f;if(!_0x2b1cb6)return _0x36f2af;if(_0x2b1cb6['note']['match'](VisuMZ[_0x369d34('0x503')]['RegExp'][_0x369d34('0x562')][_0x554825])){var _0x93e767=Number(RegExp['$1'])/0x64;_0x36f2af+=_0x93e767;}if(_0x2b1cb6[_0x369d34('0x56')][_0x369d34('0x5c9')](VisuMZ[_0x369d34('0x503')][_0x369d34('0xfe')]['xparamPlus2'][_0x554825])){var _0x93e767=Number(RegExp['$1']);_0x36f2af+=_0x93e767;}if(_0x2b1cb6[_0x369d34('0x56')]['match'](VisuMZ[_0x369d34('0x503')][_0x369d34('0xfe')]['xparamPlusJS'][_0x554825])){if(_0x369d34('0x2')===_0x369d34('0x2af')){function _0x5d2376(){const _0x52e3dd=_0x369d34;if(_0x26996c[_0x52e3dd('0x5c9')](/backspace/i))return this[_0x52e3dd('0x1cd')]===0x8;if(_0x507786[_0x52e3dd('0x5c9')](/enter/i))return this[_0x52e3dd('0x1cd')]===0xd;if(_0x45e475['match'](/escape/i))return this[_0x52e3dd('0x1cd')]===0x1b;}}else{var _0x1880f6=String(RegExp['$1']);try{_0x36f2af+=eval(_0x1880f6);}catch(_0x1af535){if($gameTemp[_0x369d34('0x48')]())console[_0x369d34('0x255')](_0x1af535);}}}return _0x36f2af;};return this[_0x28e1ea('0x550')]()[_0x28e1ea('0x68')](_0x20877d,0x0);},Game_BattlerBase[_0x21bc8a('0x5b4')]['xparamRate']=function(_0x295383){const _0x2d33b8=_0x21bc8a,_0x5d401b=(_0x39771c,_0x503ed5)=>{const _0x343b69=_0x492f;if(_0x343b69('0x4a1')!=='VfPEA'){function _0x5dd708(){const _0x373480=_0x343b69;this[_0x373480('0x61f')]();}}else{if(!_0x503ed5)return _0x39771c;if(_0x503ed5[_0x343b69('0x56')]['match'](VisuMZ[_0x343b69('0x503')][_0x343b69('0xfe')][_0x343b69('0x152')][_0x295383])){var _0x30ab0a=Number(RegExp['$1'])/0x64;_0x39771c*=_0x30ab0a;}if(_0x503ed5[_0x343b69('0x56')][_0x343b69('0x5c9')](VisuMZ['CoreEngine'][_0x343b69('0xfe')]['xparamRate2'][_0x295383])){var _0x30ab0a=Number(RegExp['$1']);_0x39771c*=_0x30ab0a;}if(_0x503ed5[_0x343b69('0x56')][_0x343b69('0x5c9')](VisuMZ[_0x343b69('0x503')][_0x343b69('0xfe')][_0x343b69('0xc')][_0x295383])){var _0xe42b78=String(RegExp['$1']);try{if('EjGLm'===_0x343b69('0x596'))_0x39771c*=eval(_0xe42b78);else{function _0x15cc12(){const _0x38016c=_0x343b69;this[_0x38016c('0x616')]=_0x440175['CoreEngine']['Settings']['QoL'][_0x38016c('0x1e0')]||![];if(_0x463cfa&&_0x5d979c['note']){if(_0x85aa2[_0x38016c('0x56')][_0x38016c('0x5c9')](/<SHOW TILE SHADOWS>/i))this[_0x38016c('0x616')]=![];if(_0x323bc1[_0x38016c('0x56')]['match'](/<HIDE TILE SHADOWS>/i))this[_0x38016c('0x616')]=!![];}}}}catch(_0x5a9d00){if($gameTemp[_0x343b69('0x48')]())console[_0x343b69('0x255')](_0x5a9d00);}}return _0x39771c;}};return this[_0x2d33b8('0x550')]()[_0x2d33b8('0x68')](_0x5d401b,0x1);},Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x444')]=function(_0x2f7746){const _0x244c8d=_0x21bc8a,_0x27f1be=(_0x585702,_0x24ca56)=>{const _0x1523a6=_0x492f;if(_0x1523a6('0x111')===_0x1523a6('0x111')){if(!_0x24ca56)return _0x585702;if(_0x24ca56['note'][_0x1523a6('0x5c9')](VisuMZ['CoreEngine'][_0x1523a6('0xfe')][_0x1523a6('0x31a')][_0x2f7746])){if(_0x1523a6('0x252')!=='TcIKe'){function _0xb07b4e(){const _0x4c2d18=_0x1523a6;this[_0x4c2d18('0x678')]='FV';}}else{var _0x50ba4d=Number(RegExp['$1'])/0x64;_0x585702+=_0x50ba4d;}}if(_0x24ca56['note'][_0x1523a6('0x5c9')](VisuMZ[_0x1523a6('0x503')][_0x1523a6('0xfe')][_0x1523a6('0x5b0')][_0x2f7746])){var _0x50ba4d=Number(RegExp['$1']);_0x585702+=_0x50ba4d;}if(_0x24ca56[_0x1523a6('0x56')][_0x1523a6('0x5c9')](VisuMZ[_0x1523a6('0x503')]['RegExp'][_0x1523a6('0x475')][_0x2f7746])){var _0x2568d3=String(RegExp['$1']);try{_0x585702+=eval(_0x2568d3);}catch(_0x278f5b){if(_0x1523a6('0x51b')!==_0x1523a6('0x51b')){function _0x4ee58f(){const _0x5ed23a=_0x1523a6,_0x2b410e=_0x250c12[_0x5ed23a('0x503')][_0x5ed23a('0x4e5')][_0x5ed23a('0x651')][_0x224110],_0x4e80e8=_0x5ed23a('0x176')['format'](_0x33518d);for(const _0x388a03 of _0x2b410e){_0x593ca1[_0x5ed23a('0x4d1')](_0x4e80e8,_0x388a03);}}}else{if($gameTemp[_0x1523a6('0x48')]())console[_0x1523a6('0x255')](_0x278f5b);}}}return _0x585702;}else{function _0x19dc4b(){const _0x1389c5=_0x1523a6;_0x53883b['CoreEngine'][_0x1389c5('0x4e5')][_0x1389c5('0x1a7')][_0x1389c5('0x473')]&&(_0x410bae['style'][_0x1389c5('0x56c')]=_0x1389c5('0x5af'));_0x2b3b6a[_0x1389c5('0x503')][_0x1389c5('0x4e5')][_0x1389c5('0x1a7')][_0x1389c5('0xd4')]&&(_0x464a22[_0x1389c5('0x612')][_0x1389c5('0x4f7')]=_0x1389c5('0x11b'));const _0x56625d=_0x1e6d12[_0x1389c5('0x19b')](0x0,_0x2ec49d['floor'](_0xaff595['width']*this['_realScale'])),_0x4eb32c=_0x6f88e9[_0x1389c5('0x19b')](0x0,_0x103bfe[_0x1389c5('0x335')](_0x5ece18['height']*this[_0x1389c5('0x5a4')]));_0x3da547[_0x1389c5('0x612')][_0x1389c5('0x65')]=_0x56625d+'px',_0x3db5a2[_0x1389c5('0x612')][_0x1389c5('0x585')]=_0x4eb32c+'px';}}};return this[_0x244c8d('0x550')]()['reduce'](_0x27f1be,0x0);},Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x19d')]=function(_0x317051){const _0x4a86d7=_0x21bc8a;let _0x4cc763=_0x4a86d7('0x19d')+_0x317051+_0x4a86d7('0x664');if(this[_0x4a86d7('0x3b9')](_0x4cc763))return this['_cache'][_0x4cc763];return this[_0x4a86d7('0x5b5')][_0x4cc763]=VisuMZ[_0x4a86d7('0x503')][_0x4a86d7('0x4e5')]['Param'][_0x4a86d7('0x19e')][_0x4a86d7('0x312')](this,_0x317051),this['_cache'][_0x4cc763];},Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x4b2')]=function(_0x4b1ec3){const _0x2fa15d=_0x21bc8a,_0x46ebd3=(_0x27161f,_0x55b0ac)=>{const _0x257cee=_0x492f;if(!_0x55b0ac)return _0x27161f;if(_0x55b0ac[_0x257cee('0x56')]['match'](VisuMZ['CoreEngine']['RegExp']['sparamPlus1'][_0x4b1ec3])){if(_0x257cee('0xe2')!==_0x257cee('0xe2')){function _0x260fb4(){var _0x5c97d1=_0x3eefd(_0x3d856a['$1']);_0x631409+=_0x5c97d1;}}else{var _0xe612c0=Number(RegExp['$1'])/0x64;_0x27161f+=_0xe612c0;}}if(_0x55b0ac['note'][_0x257cee('0x5c9')](VisuMZ['CoreEngine'][_0x257cee('0xfe')][_0x257cee('0x5c0')][_0x4b1ec3])){var _0xe612c0=Number(RegExp['$1']);_0x27161f+=_0xe612c0;}if(_0x55b0ac[_0x257cee('0x56')][_0x257cee('0x5c9')](VisuMZ[_0x257cee('0x503')][_0x257cee('0xfe')][_0x257cee('0x59e')][_0x4b1ec3])){if(_0x257cee('0x2c4')!==_0x257cee('0x2c4')){function _0x64d0b2(){const _0x4b0433=_0x257cee;this[_0x4b0433('0x4c4')]=0x2;}}else{var _0x195a1a=String(RegExp['$1']);try{_0x27161f+=eval(_0x195a1a);}catch(_0x3c88bd){if(_0x257cee('0x66c')===_0x257cee('0x66c')){if($gameTemp[_0x257cee('0x48')]())console[_0x257cee('0x255')](_0x3c88bd);}else{function _0x12ea9d(){const _0x44eee8=_0x257cee,_0x4c40a4=_0x44eee8('0x451');this[_0x44eee8('0x12')]=this[_0x44eee8('0x12')]||{};if(this['_colorCache'][_0x4c40a4])return this['_colorCache'][_0x4c40a4];const _0x146a97=_0x17e954[_0x44eee8('0x503')][_0x44eee8('0x4e5')][_0x44eee8('0x2aa')][_0x44eee8('0x63b')];return this[_0x44eee8('0x2fb')](_0x4c40a4,_0x146a97);}}}}}return _0x27161f;};return this[_0x2fa15d('0x550')]()[_0x2fa15d('0x68')](_0x46ebd3,0x0);},Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x280')]=function(_0x22381a){const _0xff5ae7=_0x21bc8a,_0x3ac73e=(_0x12ee0b,_0x1c2ae6)=>{const _0x200a3c=_0x492f;if(_0x200a3c('0x623')!==_0x200a3c('0x623')){function _0x1cf911(){const _0x377cda=_0x200a3c;this[_0x377cda('0x227')][_0x377cda('0x41a')]>=0x18&&(this[_0x377cda('0x227')][_0x377cda('0x41a')]-=0x6);}}else{if(!_0x1c2ae6)return _0x12ee0b;if(_0x1c2ae6[_0x200a3c('0x56')]['match'](VisuMZ[_0x200a3c('0x503')]['RegExp'][_0x200a3c('0x12c')][_0x22381a])){var _0x98067e=Number(RegExp['$1'])/0x64;_0x12ee0b*=_0x98067e;}if(_0x1c2ae6[_0x200a3c('0x56')][_0x200a3c('0x5c9')](VisuMZ['CoreEngine']['RegExp'][_0x200a3c('0x3f5')][_0x22381a])){var _0x98067e=Number(RegExp['$1']);_0x12ee0b*=_0x98067e;}if(_0x1c2ae6[_0x200a3c('0x56')][_0x200a3c('0x5c9')](VisuMZ['CoreEngine']['RegExp']['sparamRateJS'][_0x22381a])){var _0x2cbcb7=String(RegExp['$1']);try{if('Fhnyd'!==_0x200a3c('0x5cc'))_0x12ee0b*=eval(_0x2cbcb7);else{function _0x4b9fe4(){const _0x4b00a0=_0x200a3c;this[_0x4b00a0('0x5c6')](_0x4223d9[_0x4b00a0('0x19b')](this[_0x4b00a0('0x2ea')](),this[_0x4b00a0('0x42a')]()-0x1));}}}catch(_0x37df09){if($gameTemp['isPlaytest']())console[_0x200a3c('0x255')](_0x37df09);}}return _0x12ee0b;}};return this[_0xff5ae7('0x550')]()[_0xff5ae7('0x68')](_0x3ac73e,0x1);},Game_BattlerBase['prototype'][_0x21bc8a('0x316')]=function(_0x302e56){const _0x5334c0=_0x21bc8a,_0x4a2e0a=(_0x290bae,_0x3b89b1)=>{const _0x16d90d=_0x492f;if(_0x16d90d('0x58e')===_0x16d90d('0x58e')){if(!_0x3b89b1)return _0x290bae;if(_0x3b89b1['note'][_0x16d90d('0x5c9')](VisuMZ['CoreEngine'][_0x16d90d('0xfe')]['sparamFlat1'][_0x302e56])){var _0x24156b=Number(RegExp['$1'])/0x64;_0x290bae+=_0x24156b;}if(_0x3b89b1['note'][_0x16d90d('0x5c9')](VisuMZ[_0x16d90d('0x503')][_0x16d90d('0xfe')][_0x16d90d('0x64a')][_0x302e56])){var _0x24156b=Number(RegExp['$1']);_0x290bae+=_0x24156b;}if(_0x3b89b1[_0x16d90d('0x56')][_0x16d90d('0x5c9')](VisuMZ[_0x16d90d('0x503')][_0x16d90d('0xfe')]['sparamFlatJS'][_0x302e56])){var _0x5dbe5e=String(RegExp['$1']);try{_0x290bae+=eval(_0x5dbe5e);}catch(_0x5daef8){if($gameTemp['isPlaytest']())console['log'](_0x5daef8);}}return _0x290bae;}else{function _0x3f5b6d(){this['makeCoreEngineCommandList']();}}};return this[_0x5334c0('0x550')]()[_0x5334c0('0x68')](_0x4a2e0a,0x0);},Game_BattlerBase['prototype'][_0x21bc8a('0x4d5')]=function(_0x5d4307){const _0x40474d=_0x21bc8a;let _0x358ead=_0x40474d('0x4d5')+_0x5d4307+_0x40474d('0x664');if(this[_0x40474d('0x3b9')](_0x358ead))return this['_cache'][_0x358ead];return this[_0x40474d('0x5b5')][_0x358ead]=VisuMZ[_0x40474d('0x503')][_0x40474d('0x4e5')][_0x40474d('0x119')][_0x40474d('0x68c')][_0x40474d('0x312')](this,_0x5d4307),this['_cache'][_0x358ead];},Game_BattlerBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x301')]=function(_0x3c044b,_0x66450a){const _0xb2c48a=_0x21bc8a;if(typeof paramId===_0xb2c48a('0x421'))return this[_0xb2c48a('0xf8')](_0x3c044b);_0x3c044b=String(_0x3c044b||'')[_0xb2c48a('0x443')]();if(_0x3c044b===_0xb2c48a('0x561'))return this[_0xb2c48a('0xf8')](0x0);if(_0x3c044b===_0xb2c48a('0x5fc'))return this[_0xb2c48a('0xf8')](0x1);if(_0x3c044b===_0xb2c48a('0x545'))return this[_0xb2c48a('0xf8')](0x2);if(_0x3c044b===_0xb2c48a('0x102'))return this[_0xb2c48a('0xf8')](0x3);if(_0x3c044b==='MAT')return this[_0xb2c48a('0xf8')](0x4);if(_0x3c044b===_0xb2c48a('0x691'))return this[_0xb2c48a('0xf8')](0x5);if(_0x3c044b===_0xb2c48a('0x30b'))return this[_0xb2c48a('0xf8')](0x6);if(_0x3c044b===_0xb2c48a('0x434'))return this['param'](0x7);if(_0x3c044b===_0xb2c48a('0x447'))return _0x66450a?String(Math['round'](this[_0xb2c48a('0x19d')](0x0)*0x64))+'%':this[_0xb2c48a('0x19d')](0x0);if(_0x3c044b===_0xb2c48a('0x653'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x19d')](0x1)*0x64))+'%':this[_0xb2c48a('0x19d')](0x1);if(_0x3c044b===_0xb2c48a('0x469'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x19d')](0x2)*0x64))+'%':this[_0xb2c48a('0x19d')](0x2);if(_0x3c044b===_0xb2c48a('0x31'))return _0x66450a?String(Math['round'](this['xparam'](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x3c044b===_0xb2c48a('0x90'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x19d')](0x4)*0x64))+'%':this[_0xb2c48a('0x19d')](0x4);if(_0x3c044b===_0xb2c48a('0x68e'))return _0x66450a?String(Math['round'](this[_0xb2c48a('0x19d')](0x5)*0x64))+'%':this[_0xb2c48a('0x19d')](0x5);if(_0x3c044b==='CNT')return _0x66450a?String(Math['round'](this['xparam'](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x3c044b===_0xb2c48a('0x9b'))return _0x66450a?String(Math['round'](this['xparam'](0x7)*0x64))+'%':this[_0xb2c48a('0x19d')](0x7);if(_0x3c044b==='MRG')return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x19d')](0x8)*0x64))+'%':this[_0xb2c48a('0x19d')](0x8);if(_0x3c044b===_0xb2c48a('0x205'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x19d')](0x9)*0x64))+'%':this[_0xb2c48a('0x19d')](0x9);if(_0x3c044b===_0xb2c48a('0x4b8'))return _0x66450a?String(Math['round'](this[_0xb2c48a('0x4d5')](0x0)*0x64))+'%':this[_0xb2c48a('0x4d5')](0x0);if(_0x3c044b==='GRD')return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x4d5')](0x1)*0x64))+'%':this[_0xb2c48a('0x4d5')](0x1);if(_0x3c044b===_0xb2c48a('0x471'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this['sparam'](0x2)*0x64))+'%':this[_0xb2c48a('0x4d5')](0x2);if(_0x3c044b===_0xb2c48a('0x415'))return _0x66450a?String(Math['round'](this[_0xb2c48a('0x4d5')](0x3)*0x64))+'%':this[_0xb2c48a('0x4d5')](0x3);if(_0x3c044b===_0xb2c48a('0x3ce'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x4d5')](0x4)*0x64))+'%':this[_0xb2c48a('0x4d5')](0x4);if(_0x3c044b===_0xb2c48a('0x4e9'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x4d5')](0x5)*0x64))+'%':this[_0xb2c48a('0x4d5')](0x5);if(_0x3c044b==='PDR')return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x4d5')](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x3c044b===_0xb2c48a('0x1e8'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x4d5')](0x7)*0x64))+'%':this[_0xb2c48a('0x4d5')](0x7);if(_0x3c044b===_0xb2c48a('0x72'))return _0x66450a?String(Math['round'](this[_0xb2c48a('0x4d5')](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x3c044b===_0xb2c48a('0x4d'))return _0x66450a?String(Math[_0xb2c48a('0x23d')](this[_0xb2c48a('0x4d5')](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ['CoreEngine'][_0xb2c48a('0x10e')][_0x3c044b]){const _0x580bb9=VisuMZ['CoreEngine'][_0xb2c48a('0x10e')][_0x3c044b],_0x5650ec=this[_0x580bb9];if(VisuMZ['CoreEngine'][_0xb2c48a('0x41b')][_0x3c044b]===_0xb2c48a('0x2f5')){if('dUoXf'!==_0xb2c48a('0x32a'))return _0x5650ec;else{function _0x2eabf9(){const _0x40e1de=_0xb2c48a;_0x18577a[_0x40e1de('0x5ca')](_0x445575);}}}else return _0x66450a?String(Math[_0xb2c48a('0x23d')](_0x5650ec*0x64))+'%':_0x5650ec;}return'';},Game_BattlerBase[_0x21bc8a('0x5b4')]['isDying']=function(){const _0x195b53=_0x21bc8a;return this[_0x195b53('0x4f4')]()&&this[_0x195b53('0x1e9')]<this['mhp']*VisuMZ['CoreEngine'][_0x195b53('0x4e5')][_0x195b53('0x119')][_0x195b53('0x599')];},Game_Battler['prototype']['performMiss']=function(){const _0x747690=_0x21bc8a;SoundManager[_0x747690('0x512')](),this['requestMotion'](_0x747690('0x230'));},VisuMZ['CoreEngine']['Game_Actor_paramBase']=Game_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x2e9')],Game_Actor[_0x21bc8a('0x5b4')]['paramBase']=function(_0x248bc3){const _0x583efc=_0x21bc8a;if(this[_0x583efc('0x68b')]>0x63)return this[_0x583efc('0x360')](_0x248bc3);return VisuMZ[_0x583efc('0x503')][_0x583efc('0x510')][_0x583efc('0x312')](this,_0x248bc3);},Game_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x360')]=function(_0x5087ac){const _0x22b0ad=_0x21bc8a,_0x139105=this[_0x22b0ad('0x100')]()[_0x22b0ad('0x4ea')][_0x5087ac][0x63],_0x2cf26c=this[_0x22b0ad('0x100')]()[_0x22b0ad('0x4ea')][_0x5087ac][0x62];return _0x139105+(_0x139105-_0x2cf26c)*(this[_0x22b0ad('0x68b')]-0x63);},VisuMZ['CoreEngine'][_0x21bc8a('0xa6')]=Game_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x520')],Game_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x520')]=function(_0x2a308a,_0x568aa6){const _0x54f660=_0x21bc8a;$gameTemp[_0x54f660('0x65a')]=!![],VisuMZ[_0x54f660('0x503')][_0x54f660('0xa6')][_0x54f660('0x312')](this,_0x2a308a,_0x568aa6),$gameTemp[_0x54f660('0x65a')]=undefined;},VisuMZ[_0x21bc8a('0x503')]['Game_Actor_levelUp']=Game_Actor['prototype'][_0x21bc8a('0x201')],Game_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x201')]=function(){const _0x329ae1=_0x21bc8a;VisuMZ[_0x329ae1('0x503')][_0x329ae1('0x1b2')][_0x329ae1('0x312')](this);if(!$gameTemp[_0x329ae1('0x65a')])this[_0x329ae1('0x28c')]();},Game_Actor[_0x21bc8a('0x5b4')]['levelUpRecovery']=function(){const _0x5a47e8=_0x21bc8a;this[_0x5a47e8('0x5b5')]={};if(VisuMZ[_0x5a47e8('0x503')][_0x5a47e8('0x4e5')][_0x5a47e8('0x1a7')][_0x5a47e8('0x386')])this['_hp']=this['mhp'];if(VisuMZ[_0x5a47e8('0x503')][_0x5a47e8('0x4e5')]['QoL'][_0x5a47e8('0x5a1')])this[_0x5a47e8('0x84')]=this[_0x5a47e8('0x61b')];},Game_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x1df')]=function(){const _0x5986db=_0x21bc8a;if(this['isMaxLevel']())return 0x1;const _0x326b64=this[_0x5986db('0x21d')]()-this[_0x5986db('0x3dc')](),_0x8b90c3=this[_0x5986db('0x88')]()-this[_0x5986db('0x3dc')]();return(_0x8b90c3/_0x326b64)['clamp'](0x0,0x1);},Game_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x550')]=function(){const _0x340284=_0x21bc8a,_0x5e60e0=Game_Battler[_0x340284('0x5b4')][_0x340284('0x550')][_0x340284('0x312')](this);for(const _0x330641 of this[_0x340284('0x634')]()){if(_0x330641){if(_0x340284('0x44b')!==_0x340284('0x5fe'))_0x5e60e0[_0x340284('0x5ca')](_0x330641);else{function _0x7d5968(){const _0x483ad8=_0x340284;var _0x29482b=_0x3163d2(_0x4e26aa['$1']);try{_0x1c4bb8+=_0x4b763c(_0x29482b);}catch(_0x4ab60c){if(_0x11dcf2[_0x483ad8('0x48')]())_0x5238ee[_0x483ad8('0x255')](_0x4ab60c);}}}}}return _0x5e60e0[_0x340284('0x5ca')](this['currentClass'](),this['actor']()),_0x5e60e0;},Object[_0x21bc8a('0x192')](Game_Enemy['prototype'],_0x21bc8a('0x68b'),{'get':function(){const _0x4d953b=_0x21bc8a;return this[_0x4d953b('0x4e6')]();},'configurable':!![]}),Game_Enemy[_0x21bc8a('0x5b4')][_0x21bc8a('0x4e6')]=function(){const _0x14d392=_0x21bc8a;return this[_0x14d392('0x1d3')]()[_0x14d392('0x68b')];},Game_Enemy[_0x21bc8a('0x5b4')][_0x21bc8a('0x33f')]=function(){const _0x43b3d7=_0x21bc8a;if(!this['_repositioned']){this[_0x43b3d7('0x2a7')]+=Math[_0x43b3d7('0x23d')]((Graphics[_0x43b3d7('0x585')]-0x270)/0x2),this[_0x43b3d7('0x2a7')]-=Math['floor']((Graphics[_0x43b3d7('0x585')]-Graphics['boxHeight'])/0x2);if($gameSystem[_0x43b3d7('0x1e3')]()){if('RcfOx'!==_0x43b3d7('0x34d'))this[_0x43b3d7('0x5a6')]-=Math[_0x43b3d7('0x335')]((Graphics[_0x43b3d7('0x65')]-Graphics[_0x43b3d7('0x600')])/0x2);else{function _0x57fd03(){const _0x2a3ba5=_0x43b3d7;this[_0x2a3ba5('0x76')]['x']=_0x3aaa54['boxWidth']+0x4;}}}else{if(_0x43b3d7('0x11a')!=='OoeaW'){function _0x5113fe(){const _0x1a95dd=_0x43b3d7,_0x26dd75=_0x1b3e80[_0x1a95dd('0x503')]['Settings'][_0x1a95dd('0x261')];if(_0x26dd75&&_0x26dd75[_0x1a95dd('0x1ea')])return _0x26dd75[_0x1a95dd('0x1ea')][_0x1a95dd('0x312')](this);this['x']+=_0x18cb20[_0x1a95dd('0x23d')](_0x599f21[_0x1a95dd('0x3a1')]());}}else this[_0x43b3d7('0x5a6')]+=Math[_0x43b3d7('0x23d')]((Graphics[_0x43b3d7('0x600')]-0x330)/0x2);}}this[_0x43b3d7('0x57b')]=!![];},Game_Party[_0x21bc8a('0x5b4')][_0x21bc8a('0x4ba')]=function(){const _0xac7667=_0x21bc8a;return VisuMZ[_0xac7667('0x503')][_0xac7667('0x4e5')]['Gold'][_0xac7667('0x674')];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x387')]=Game_Party[_0x21bc8a('0x5b4')][_0x21bc8a('0x3a8')],Game_Party['prototype']['consumeItem']=function(_0xdadcce){const _0x473f32=_0x21bc8a;if(VisuMZ[_0x473f32('0x503')][_0x473f32('0x4e5')][_0x473f32('0x1a7')][_0x473f32('0x60c')]&&DataManager[_0x473f32('0x539')](_0xdadcce))return;VisuMZ[_0x473f32('0x503')]['Game_Party_consumeItem'][_0x473f32('0x312')](this,_0xdadcce);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x1b7')]=Game_Troop['prototype'][_0x21bc8a('0x4b7')],Game_Troop[_0x21bc8a('0x5b4')][_0x21bc8a('0x4b7')]=function(_0x295cfa){const _0x525c6d=_0x21bc8a;$gameTemp[_0x525c6d('0x40b')](),$gameTemp[_0x525c6d('0x325')](_0x295cfa),VisuMZ[_0x525c6d('0x503')][_0x525c6d('0x1b7')]['call'](this,_0x295cfa);},VisuMZ[_0x21bc8a('0x503')]['Game_Map_setup']=Game_Map['prototype'][_0x21bc8a('0x4b7')],Game_Map['prototype'][_0x21bc8a('0x4b7')]=function(_0x1e786f){const _0x287e09=_0x21bc8a;VisuMZ[_0x287e09('0x503')]['Game_Map_setup']['call'](this,_0x1e786f),this[_0x287e09('0x347')](_0x1e786f);},Game_Map[_0x21bc8a('0x5b4')][_0x21bc8a('0x347')]=function(){const _0x4e80b0=_0x21bc8a;this[_0x4e80b0('0x616')]=VisuMZ[_0x4e80b0('0x503')][_0x4e80b0('0x4e5')]['QoL'][_0x4e80b0('0x1e0')]||![];if($dataMap&&$dataMap[_0x4e80b0('0x56')]){if($dataMap['note'][_0x4e80b0('0x5c9')](/<SHOW TILE SHADOWS>/i))this[_0x4e80b0('0x616')]=![];if($dataMap[_0x4e80b0('0x56')][_0x4e80b0('0x5c9')](/<HIDE TILE SHADOWS>/i))this[_0x4e80b0('0x616')]=!![];}},Game_Map[_0x21bc8a('0x5b4')][_0x21bc8a('0x59b')]=function(){const _0x3bfee2=_0x21bc8a;if(this[_0x3bfee2('0x616')]===undefined)this['setupCoreEngine']();return this[_0x3bfee2('0x616')];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x2a2')]=Game_Character[_0x21bc8a('0x5b4')][_0x21bc8a('0x41f')],Game_Character['prototype'][_0x21bc8a('0x41f')]=function(_0x118a6c){const _0x2d1a01=_0x21bc8a;try{VisuMZ[_0x2d1a01('0x503')][_0x2d1a01('0x2a2')]['call'](this,_0x118a6c);}catch(_0x32e4c6){if($gameTemp[_0x2d1a01('0x48')]())console[_0x2d1a01('0x255')](_0x32e4c6);}},Game_Player[_0x21bc8a('0x5b4')][_0x21bc8a('0x575')]=function(){const _0x2f374c=_0x21bc8a,_0xdc96f6=$gameMap[_0x2f374c('0x151')]();this[_0x2f374c('0x2b7')]=Math['randomInt'](_0xdc96f6)+Math['randomInt'](_0xdc96f6)+this[_0x2f374c('0x1f')]();},Game_Player['prototype'][_0x21bc8a('0x1f')]=function(){const _0x4747cd=_0x21bc8a;if($dataMap&&$dataMap[_0x4747cd('0x56')]&&$dataMap[_0x4747cd('0x56')][_0x4747cd('0x5c9')](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if(_0x4747cd('0x419')===_0x4747cd('0x588')){function _0x19618b(){_0x414702=this['mainAreaHeightSideButtonLayout']();}}else return VisuMZ[_0x4747cd('0x503')]['Settings'][_0x4747cd('0x1a7')][_0x4747cd('0x375')];}},VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents']=Game_Event[_0x21bc8a('0x5b4')][_0x21bc8a('0xa2')],Game_Event[_0x21bc8a('0x5b4')][_0x21bc8a('0xa2')]=function(_0x56cd7d,_0x480507){const _0x4a70aa=_0x21bc8a;return this[_0x4a70aa('0x118')]()?this[_0x4a70aa('0x1ab')](_0x56cd7d,_0x480507):VisuMZ[_0x4a70aa('0x503')]['Game_Event_isCollidedWithEvents'][_0x4a70aa('0x312')](this,_0x56cd7d,_0x480507);},Game_Event[_0x21bc8a('0x5b4')][_0x21bc8a('0x118')]=function(){const _0x27c7a6=_0x21bc8a;return VisuMZ['CoreEngine']['Settings'][_0x27c7a6('0x1a7')]['SmartEventCollisionPriority'];},Game_Event[_0x21bc8a('0x5b4')][_0x21bc8a('0x1ab')]=function(_0x4a5517,_0x3f596f){const _0x4132d8=_0x21bc8a;if(!this[_0x4132d8('0x125')]())return![];else{const _0x5b12e4=$gameMap[_0x4132d8('0x4c0')](_0x4a5517,_0x3f596f)['filter'](_0x381817=>_0x381817[_0x4132d8('0x125')]());return _0x5b12e4[_0x4132d8('0x49')]>0x0;}},VisuMZ['CoreEngine'][_0x21bc8a('0x2fa')]=Game_Interpreter[_0x21bc8a('0x5b4')]['command111'],Game_Interpreter[_0x21bc8a('0x5b4')][_0x21bc8a('0x4e8')]=function(_0x1108c5){const _0x10d71b=_0x21bc8a;try{if(_0x10d71b('0x2d1')===_0x10d71b('0x7b')){function _0x2d2997(){const _0x13ecfc=_0x10d71b,_0x9f25c6=this[_0x13ecfc('0x18f')](_0x12920d),_0x1c66e8=new(_0x9f25c6?_0x5c32f5:_0x475fc7)(),_0x76f827=this[_0x13ecfc('0x568')](_0x179ab5);this[_0x13ecfc('0xbc')](_0x511aec[0x0])&&(_0x3b7cb6=!_0x43cc5a),_0x1c66e8[_0x13ecfc('0x4ed')]=_0x32562d,_0x1c66e8['setup'](_0x76f827,_0x36b873,_0x3c8e7f,_0x115ad4),_0x1c66e8['setMute'](_0x168a00),this['_effectsContainer']['addChild'](_0x1c66e8),this[_0x13ecfc('0x416')][_0x13ecfc('0x5ca')](_0x1c66e8);}}else VisuMZ['CoreEngine'][_0x10d71b('0x2fa')]['call'](this,_0x1108c5);}catch(_0x505e6d){if(_0x10d71b('0x1fc')==='Fpwvi')$gameTemp[_0x10d71b('0x48')]()&&(console[_0x10d71b('0x255')](_0x10d71b('0x3e5')),console[_0x10d71b('0x255')](_0x505e6d)),this[_0x10d71b('0x69')]();else{function _0x229ee5(){const _0x5af3f4=_0x10d71b;return _0x4599f7[_0x5af3f4('0x31c')]['CategoryRect'][_0x5af3f4('0x312')](this);}}}return!![];},VisuMZ[_0x21bc8a('0x503')]['Game_Interpreter_command122']=Game_Interpreter[_0x21bc8a('0x5b4')][_0x21bc8a('0x12d')],Game_Interpreter['prototype'][_0x21bc8a('0x12d')]=function(_0x4f8b53){const _0x5a19be=_0x21bc8a;try{VisuMZ[_0x5a19be('0x503')][_0x5a19be('0x458')][_0x5a19be('0x312')](this,_0x4f8b53);}catch(_0xca4316){if($gameTemp['isPlaytest']()){if('fABVQ'!==_0x5a19be('0x1e7'))console[_0x5a19be('0x255')](_0x5a19be('0x640')),console[_0x5a19be('0x255')](_0xca4316);else{function _0x3546d0(){const _0x33863c=_0x5a19be;this[_0x33863c('0x159')]=new _0x558abd[(_0x33863c('0x572'))][(_0x33863c('0x5e3'))](_0x258cd7=!![]),this[_0x33863c('0x1bf')]=new _0x5190ea(),this[_0x33863c('0x1bf')][_0x33863c('0x263')]=_0x3c39c6['backgroundBitmap'](),this[_0x33863c('0x1bf')][_0x33863c('0x572')]=[this['_backgroundFilter']],this[_0x33863c('0x5c3')](this['_backgroundSprite']),this['setBackgroundOpacity'](0xc0),this[_0x33863c('0x182')](this[_0x33863c('0xaf')]()),this[_0x33863c('0x20e')]();}}}}return!![];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x61a')]=Game_Interpreter[_0x21bc8a('0x5b4')]['command355'],Game_Interpreter[_0x21bc8a('0x5b4')]['command355']=function(){const _0x3068ac=_0x21bc8a;try{VisuMZ['CoreEngine'][_0x3068ac('0x61a')][_0x3068ac('0x312')](this);}catch(_0x1c8db6){$gameTemp['isPlaytest']()&&(console[_0x3068ac('0x255')](_0x3068ac('0x37')),console[_0x3068ac('0x255')](_0x1c8db6));}return!![];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x466')]=Game_Interpreter[_0x21bc8a('0x5b4')][_0x21bc8a('0x1c3')],Game_Interpreter[_0x21bc8a('0x5b4')][_0x21bc8a('0x1c3')]=function(_0x794d3e){const _0x37c5ae=_0x21bc8a;return $gameTemp[_0x37c5ae('0x2b0')](this),VisuMZ[_0x37c5ae('0x503')][_0x37c5ae('0x466')]['call'](this,_0x794d3e);},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x60')]=function(){const _0x3766fc=_0x21bc8a;return VisuMZ[_0x3766fc('0x503')][_0x3766fc('0x4e5')]['UI'][_0x3766fc('0x19')];},Scene_Base[_0x21bc8a('0x5b4')]['isBottomHelpMode']=function(){const _0x3aa87=_0x21bc8a;return VisuMZ[_0x3aa87('0x503')]['Settings']['UI']['BottomHelp'];},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x44a')]=function(){const _0x2ffd0f=_0x21bc8a;return VisuMZ[_0x2ffd0f('0x503')]['Settings']['UI']['BottomButtons'];},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x64b')]=function(){const _0x1278a9=_0x21bc8a;return VisuMZ[_0x1278a9('0x503')][_0x1278a9('0x4e5')]['UI']['RightMenus'];},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3c0')]=function(){const _0x18e52d=_0x21bc8a;return VisuMZ[_0x18e52d('0x503')][_0x18e52d('0x4e5')]['UI'][_0x18e52d('0x1de')];},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x453')]=function(){const _0x3d822d=_0x21bc8a;return VisuMZ['CoreEngine'][_0x3d822d('0x4e5')]['UI'][_0x3d822d('0x54')];},Scene_Base['prototype']['isWindowMaskingEnabled']=function(){const _0x23d57a=_0x21bc8a;return VisuMZ['CoreEngine']['Settings'][_0x23d57a('0x633')]['EnableMasking'];},VisuMZ[_0x21bc8a('0x503')]['Scene_Base_createWindowLayer']=Scene_Base[_0x21bc8a('0x5b4')]['createWindowLayer'],Scene_Base['prototype']['createWindowLayer']=function(){const _0x59a932=_0x21bc8a;VisuMZ[_0x59a932('0x503')][_0x59a932('0x5a3')]['call'](this),this[_0x59a932('0x3c6')](),this[_0x59a932('0x4aa')]['x']=Math['round'](this['_windowLayer']['x']),this[_0x59a932('0x4aa')]['y']=Math[_0x59a932('0x23d')](this[_0x59a932('0x4aa')]['y']);},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3c6')]=function(){},Scene_Base[_0x21bc8a('0x5b4')]['buttonAssistKey1']=function(){const _0x16d93e=_0x21bc8a;return TextManager[_0x16d93e('0x489')]('pageup',_0x16d93e('0x1bd'));},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x52d')]=function(){const _0x39b789=_0x21bc8a;return TextManager[_0x39b789('0x34a')]('tab');},Scene_Base['prototype'][_0x21bc8a('0x3ff')]=function(){const _0x245388=_0x21bc8a;return TextManager[_0x245388('0x34a')](_0x245388('0x136'));},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x1be')]=function(){const _0x106af7=_0x21bc8a;return TextManager[_0x106af7('0x34a')]('ok');},Scene_Base[_0x21bc8a('0x5b4')]['buttonAssistKey5']=function(){const _0x31647d=_0x21bc8a;return TextManager[_0x31647d('0x34a')](_0x31647d('0x5f1'));},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3ac')]=function(){const _0x2ac866=_0x21bc8a;if(this[_0x2ac866('0x14c')]&&this[_0x2ac866('0x14c')]['visible'])return TextManager[_0x2ac866('0x202')];else{if(_0x2ac866('0x4dd')===_0x2ac866('0x603')){function _0x5a5965(){return 0x0;}}else return'';}},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x5ee')]=function(){return'';},Scene_Base['prototype'][_0x21bc8a('0x3b7')]=function(){return'';},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0xef')]=function(){const _0x2722f4=_0x21bc8a;return TextManager[_0x2722f4('0x522')];},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x1f7')]=function(){const _0x3aa67c=_0x21bc8a;return TextManager[_0x3aa67c('0x1a4')];},Scene_Base['prototype'][_0x21bc8a('0x11')]=function(){return 0x0;},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3a9')]=function(){return 0x0;},Scene_Base[_0x21bc8a('0x5b4')]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x51c')]=function(){return 0x0;},Scene_Base['prototype'][_0x21bc8a('0x4e0')]=function(){return 0x0;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x58')]=Scene_Boot[_0x21bc8a('0x5b4')]['loadSystemImages'],Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x2fe')]=function(){const _0x44afa9=_0x21bc8a;VisuMZ[_0x44afa9('0x503')][_0x44afa9('0x58')][_0x44afa9('0x312')](this),this[_0x44afa9('0x64d')]();},Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x64d')]=function(){const _0x24b617=_0x21bc8a,_0x4f42b4=[_0x24b617('0x6f'),_0x24b617('0x4bc'),_0x24b617('0x584'),_0x24b617('0x16'),_0x24b617('0x2a8'),_0x24b617('0x51e'),_0x24b617('0x1d2'),_0x24b617('0x112'),_0x24b617('0x631'),_0x24b617('0x58b'),_0x24b617('0x249'),_0x24b617('0x3d0'),_0x24b617('0xfc'),_0x24b617('0x59f')];for(const _0x577f55 of _0x4f42b4){const _0x424128=VisuMZ[_0x24b617('0x503')][_0x24b617('0x4e5')][_0x24b617('0x651')][_0x577f55],_0x47779c='img/%1/'[_0x24b617('0x2c1')](_0x577f55);for(const _0x1ceead of _0x424128){if('RPORa'===_0x24b617('0x31d'))ImageManager[_0x24b617('0x4d1')](_0x47779c,_0x1ceead);else{function _0x48db4b(){const _0xca5b2a=_0x24b617;if(_0x4d1424[_0xca5b2a('0x48')]())_0x3e0794[_0xca5b2a('0x255')](_0x6139e6);}}}}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x3c1')]=Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x4b')],Scene_Boot[_0x21bc8a('0x5b4')]['startNormalGame']=function(){const _0x3c8652=_0x21bc8a;if(Utils[_0x3c8652('0x49d')](_0x3c8652('0x27e'))&&VisuMZ[_0x3c8652('0x503')]['Settings'][_0x3c8652('0x1a7')]['NewGameBoot']){if(_0x3c8652('0x49e')===_0x3c8652('0x49e'))this[_0x3c8652('0x22e')]();else{function _0x40b8e6(){const _0x18ccb1=_0x3c8652;_0xc26cf7=_0x22c075[_0x18ccb1('0x19b')](_0x240e57,_0x1a29ed);}}}else VisuMZ[_0x3c8652('0x503')]['Scene_Boot_startNormalGame']['call'](this);},Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x22e')]=function(){const _0x6cf722=_0x21bc8a;DataManager[_0x6cf722('0x1ec')](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x297')]=function(){const _0x485561=_0x21bc8a,_0x38b98f=$dataSystem[_0x485561('0x262')]['uiAreaWidth'],_0x1a8c40=$dataSystem[_0x485561('0x262')][_0x485561('0x2e4')],_0x871dd1=VisuMZ[_0x485561('0x503')][_0x485561('0x4e5')]['UI'][_0x485561('0x538')];Graphics['boxWidth']=_0x38b98f-_0x871dd1*0x2,Graphics['boxHeight']=_0x1a8c40-_0x871dd1*0x2,this[_0x485561('0x558')]();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x2f')]=Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x1bc')],Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x1bc')]=function(){const _0x3bfb60=_0x21bc8a;this[_0x3bfb60('0x39')]()?this[_0x3bfb60('0x82')]():VisuMZ[_0x3bfb60('0x503')][_0x3bfb60('0x2f')][_0x3bfb60('0x312')](this);},Scene_Boot['prototype'][_0x21bc8a('0x39')]=function(){const _0x24cd31=_0x21bc8a;if(Scene_Title['subtitle']==='')return![];if(Scene_Title['subtitle']===_0x24cd31('0x4ca'))return![];if(Scene_Title[_0x24cd31('0x597')]==='')return![];if(Scene_Title[_0x24cd31('0x597')]===_0x24cd31('0x264'))return![];return!![];},Scene_Boot[_0x21bc8a('0x5b4')][_0x21bc8a('0x82')]=function(){const _0xc2b452=_0x21bc8a,_0x2c3d3c=$dataSystem['gameTitle'],_0x488e23=Scene_Title[_0xc2b452('0x4a2')]||'',_0x4b4a4f=Scene_Title['version']||'',_0x3729f4=VisuMZ[_0xc2b452('0x503')][_0xc2b452('0x4e5')][_0xc2b452('0x27')][_0xc2b452('0x388')][_0xc2b452('0x36e')],_0x5720a4=_0x3729f4[_0xc2b452('0x2c1')](_0x2c3d3c,_0x488e23,_0x4b4a4f);document[_0xc2b452('0x677')]=_0x5720a4;},Scene_Boot['prototype'][_0x21bc8a('0x558')]=function(){const _0x2e23a9=_0x21bc8a;if(VisuMZ['CoreEngine'][_0x2e23a9('0x4e5')]['UI'][_0x2e23a9('0x18a')]){const _0x349d59=Graphics[_0x2e23a9('0x65')]-Graphics['boxWidth']-VisuMZ[_0x2e23a9('0x503')][_0x2e23a9('0x4e5')]['UI'][_0x2e23a9('0x538')]*0x2,_0x4ebd03=Sprite_Button[_0x2e23a9('0x5b4')]['blockWidth'][_0x2e23a9('0x312')](this)*0x4;if(_0x349d59>=_0x4ebd03)SceneManager[_0x2e23a9('0x5e1')](!![]);}},Scene_Title['subtitle']=VisuMZ['CoreEngine'][_0x21bc8a('0x4e5')][_0x21bc8a('0x27')][_0x21bc8a('0x388')][_0x21bc8a('0x4ca')],Scene_Title[_0x21bc8a('0x597')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')]['MenuLayout']['Title'][_0x21bc8a('0x374')],Scene_Title[_0x21bc8a('0x16d')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')]['TitlePicButtons'],VisuMZ[_0x21bc8a('0x503')]['Scene_Title_drawGameTitle']=Scene_Title[_0x21bc8a('0x5b4')][_0x21bc8a('0x2d2')],Scene_Title[_0x21bc8a('0x5b4')][_0x21bc8a('0x2d2')]=function(){const _0x4ff4df=_0x21bc8a;VisuMZ[_0x4ff4df('0x503')][_0x4ff4df('0x4e5')][_0x4ff4df('0x27')][_0x4ff4df('0x388')]['drawGameTitle']['call'](this);if(Scene_Title[_0x4ff4df('0x4a2')]!==''&&Scene_Title[_0x4ff4df('0x4a2')]!==_0x4ff4df('0x4ca'))this[_0x4ff4df('0x5da')]();if(Scene_Title[_0x4ff4df('0x597')]!==''&&Scene_Title['version']!==_0x4ff4df('0x264'))this[_0x4ff4df('0x50b')]();},Scene_Title['prototype'][_0x21bc8a('0x5da')]=function(){const _0x227621=_0x21bc8a;VisuMZ[_0x227621('0x503')][_0x227621('0x4e5')][_0x227621('0x27')][_0x227621('0x388')][_0x227621('0x5da')][_0x227621('0x312')](this);},Scene_Title[_0x21bc8a('0x5b4')]['drawGameVersion']=function(){const _0x364ee5=_0x21bc8a;VisuMZ['CoreEngine'][_0x364ee5('0x4e5')][_0x364ee5('0x27')]['Title'][_0x364ee5('0x50b')][_0x364ee5('0x312')](this);},Scene_Title['prototype']['createCommandWindow']=function(){const _0x2cfcf9=_0x21bc8a;this[_0x2cfcf9('0x3c7')]();const _0xa5ec70=$dataSystem[_0x2cfcf9('0x210')][_0x2cfcf9('0xe')],_0x1e18f9=this[_0x2cfcf9('0x62f')]();this[_0x2cfcf9('0x4ce')]=new Window_TitleCommand(_0x1e18f9),this[_0x2cfcf9('0x4ce')][_0x2cfcf9('0x2dc')](_0xa5ec70);const _0x151463=this[_0x2cfcf9('0x62f')]();this[_0x2cfcf9('0x4ce')][_0x2cfcf9('0x1e')](_0x151463['x'],_0x151463['y'],_0x151463[_0x2cfcf9('0x65')],_0x151463[_0x2cfcf9('0x585')]),this[_0x2cfcf9('0x3d2')](this[_0x2cfcf9('0x4ce')]);},Scene_Title[_0x21bc8a('0x5b4')][_0x21bc8a('0x2da')]=function(){const _0x5ff663=_0x21bc8a;if(this[_0x5ff663('0x4ce')]){if(_0x5ff663('0x153')===_0x5ff663('0xaa')){function _0x57ab09(){const _0x5c2c4d=_0x5ff663;_0x5a2b8b[_0x5c2c4d('0x503')]['Window_NumberInput_processDigitChange'][_0x5c2c4d('0x312')](this),_0x1a2c2c['clear']();}}else return this[_0x5ff663('0x4ce')][_0x5ff663('0x42a')]();}else{if('jjNLl'!==_0x5ff663('0x14e'))return VisuMZ[_0x5ff663('0x503')][_0x5ff663('0x4e5')]['TitleCommandList'][_0x5ff663('0x49')];else{function _0x4cd5bd(){this['onNameOk']();}}}},Scene_Title['prototype']['commandWindowRect']=function(){const _0x1badc5=_0x21bc8a;return VisuMZ[_0x1badc5('0x503')][_0x1badc5('0x4e5')]['MenuLayout'][_0x1badc5('0x388')][_0x1badc5('0x460')][_0x1badc5('0x312')](this);},Scene_Title['prototype']['createTitleButtons']=function(){const _0x5b2b1f=_0x21bc8a;for(const _0x2ae9e4 of Scene_Title[_0x5b2b1f('0x16d')]){if(_0x5b2b1f('0x549')===_0x5b2b1f('0x38b')){function _0xe0d30d(){const _0x2603af=_0x5b2b1f;_0x236aab[_0x2603af('0x3d1')]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x2603af('0x222'),'OK'];}}else{const _0xebb60b=new Sprite_TitlePictureButton(_0x2ae9e4);this[_0x5b2b1f('0x5c3')](_0xebb60b);}}},VisuMZ[_0x21bc8a('0x503')]['Scene_Map_initialize']=Scene_Map[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')],Scene_Map[_0x21bc8a('0x5b4')]['initialize']=function(){const _0x4cbfd4=_0x21bc8a;VisuMZ[_0x4cbfd4('0x503')]['Scene_Map_initialize'][_0x4cbfd4('0x312')](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine']();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x11d')]=Scene_Map[_0x21bc8a('0x5b4')][_0x21bc8a('0xc7')],Scene_Map[_0x21bc8a('0x5b4')][_0x21bc8a('0xc7')]=function(){const _0x184a0c=_0x21bc8a;VisuMZ[_0x184a0c('0x503')][_0x184a0c('0x11d')][_0x184a0c('0x312')](this),$gameTemp[_0x184a0c('0x204')]&&!$gameMessage[_0x184a0c('0x218')]()&&(this[_0x184a0c('0x1aa')](),SceneManager[_0x184a0c('0x4c3')]());},Scene_Map[_0x21bc8a('0x5b4')]['terminate']=function(){const _0x566710=_0x21bc8a;Scene_Message[_0x566710('0x5b4')][_0x566710('0x49a')][_0x566710('0x312')](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x566710('0x42e')][_0x566710('0x5bd')](),this['_mapNameWindow'][_0x566710('0x131')](),this[_0x566710('0x4aa')][_0x566710('0x3c4')]=![],SceneManager[_0x566710('0x1ef')]()),$gameScreen[_0x566710('0x30e')]();},VisuMZ[_0x21bc8a('0x503')]['Scene_Map_createMenuButton']=Scene_Map[_0x21bc8a('0x5b4')][_0x21bc8a('0x3e1')],Scene_Map['prototype']['createMenuButton']=function(){const _0x18e767=_0x21bc8a;VisuMZ[_0x18e767('0x503')][_0x18e767('0x195')][_0x18e767('0x312')](this);if(SceneManager[_0x18e767('0x1eb')]()){if(_0x18e767('0x373')!=='VNcmV')this[_0x18e767('0x3a2')]();else{function _0x18305d(){this['_registerKeyInput'](_0xa7f283);}}}},Scene_Map[_0x21bc8a('0x5b4')][_0x21bc8a('0x3a2')]=function(){const _0x1f5d60=_0x21bc8a;this[_0x1f5d60('0x5d5')]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x213')]=Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x284')],Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x284')]=function(){const _0xb351e6=_0x21bc8a;let _0x4c81b2=0x0;if(SceneManager[_0xb351e6('0x587')]()){if(_0xb351e6('0x36d')!==_0xb351e6('0x554'))_0x4c81b2=this[_0xb351e6('0x5ff')]();else{function _0xf640b9(){const _0x162f76=_0xb351e6;_0x2d682a[_0x162f76('0x56')][_0x162f76('0x5c9')](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x5cee2b[_0x162f76('0x68b')]=_0x371cda[_0x162f76('0x19b')](_0x4961c4(_0x54ba6d['$1']),0x1));}}}else{if(_0xb351e6('0xf2')==='VCHcW')_0x4c81b2=VisuMZ[_0xb351e6('0x503')][_0xb351e6('0x213')][_0xb351e6('0x312')](this);else{function _0x48fc82(){const _0x3600a5=_0xb351e6;return _0x2d6c32[_0x3600a5('0x503')][_0x3600a5('0x4e5')][_0x3600a5('0x1a7')][_0x3600a5('0x507')]?this[_0x3600a5('0x64f')](_0x36fb60):_0x1b480f[_0x3600a5('0x503')]['Game_Action_itemHit'][_0x3600a5('0x312')](this,_0x39f138);}}}if(this['isMenuButtonAssistEnabled']()&&this[_0xb351e6('0x518')]()===_0xb351e6('0x272')){if(_0xb351e6('0x155')===_0xb351e6('0x422')){function _0x47c71e(){const _0xba8615=_0xb351e6;if(_0x354c62[_0xba8615('0x621')]())return;_0x5b10b7[_0xba8615('0x238')](_0x4f390a,_0x3745e2);const _0x299702=_0x42d357[_0xba8615('0x601')];if(_0x299702[_0xba8615('0x5c9')](/Front/i))_0x2df896[_0xba8615('0xe4')](![]);else _0x299702['match'](/Side/i)?_0x3ae7bb[_0xba8615('0xe4')](!![]):_0x1ce67e[_0xba8615('0xe4')](!_0x435e99[_0xba8615('0x1e3')]());}}else _0x4c81b2+=Window_ButtonAssist['prototype'][_0xb351e6('0x327')]();}return _0x4c81b2;},Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x5ff')]=function(){return this['isBottomHelpMode']()?this['mainAreaBottom']():0x0;},VisuMZ[_0x21bc8a('0x503')]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x21bc8a('0x5b4')]['mainAreaTop'],Scene_MenuBase[_0x21bc8a('0x5b4')]['mainAreaTop']=function(){const _0x33729a=_0x21bc8a;if(SceneManager[_0x33729a('0x587')]())return this[_0x33729a('0x39e')]();else{if(_0x33729a('0x28b')!==_0x33729a('0x669'))return VisuMZ[_0x33729a('0x503')]['Scene_MenuBase_mainAreaTop'][_0x33729a('0x312')](this);else{function _0x96accc(){const _0x127627=_0x33729a;_0x13b3bb[_0x127627('0x52f')]&&(this[_0x127627('0x4c4')]='STB');}}}},Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x39e')]=function(){const _0xb8d400=_0x21bc8a;if(!this[_0xb8d400('0x177')]()){if(_0xb8d400('0x245')==='vTImH'){function _0x303149(){const _0x1b60be=_0xb8d400,_0x1332db=_0x57286['Abbreviation'],_0x4ca9bb=_0x58ff9f['ParamName'],_0x13a93d=_0x4404a4[_0x1b60be('0x5ac')],_0x50f853=_0x4d7b25[_0x1b60be('0xdd')],_0x58ab03=new _0xef727d(_0x39d7f1[_0x1b60be('0x4e7')]);_0x451a3c[_0x1b60be('0x503')]['CustomParamNames'][_0x1332db[_0x1b60be('0x443')]()['trim']()]=_0x4ca9bb,_0x43e7e2['CoreEngine']['CustomParamIcons'][_0x1332db['toUpperCase']()['trim']()]=_0x13a93d,_0x1db303[_0x1b60be('0x503')]['CustomParamType'][_0x1332db[_0x1b60be('0x443')]()[_0x1b60be('0x482')]()]=_0x50f853,_0x4ff743[_0x1b60be('0x503')][_0x1b60be('0x10e')][_0x1332db[_0x1b60be('0x443')]()[_0x1b60be('0x482')]()]=_0x1332db,_0x19613e['defineProperty'](_0x31dbff['prototype'],_0x1332db,{'get'(){const _0x1cacc9=_0x1b60be,_0xc92b43=_0x58ab03[_0x1cacc9('0x312')](this);return _0x50f853===_0x1cacc9('0x2f5')?_0x4d132a[_0x1cacc9('0x23d')](_0xc92b43):_0xc92b43;}});}}else return this['helpAreaBottom']();}else return 0x0;},VisuMZ['CoreEngine'][_0x21bc8a('0x231')]=Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x5a5')],Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x5a5')]=function(){const _0x3d36fc=_0x21bc8a;let _0x3bfca9=0x0;if(SceneManager[_0x3d36fc('0x587')]()){if(_0x3d36fc('0x5ef')!==_0x3d36fc('0x5ef')){function _0x4fe2d1(){const _0x2ed138=_0x3d36fc;if(this[_0x2ed138('0x5bc')]===_0x2d3da4)this[_0x2ed138('0x5f7')]();this['_CoreEngineSettings'][_0x2ed138('0x38c')]=this[_0x2ed138('0x3f3')]();}}else _0x3bfca9=this[_0x3d36fc('0x5e2')]();}else _0x3bfca9=VisuMZ[_0x3d36fc('0x503')][_0x3d36fc('0x231')][_0x3d36fc('0x312')](this);if(this[_0x3d36fc('0x3fb')]()&&this['getButtonAssistLocation']()!=='button'){if(_0x3d36fc('0x26b')===_0x3d36fc('0x26b'))_0x3bfca9-=Window_ButtonAssist[_0x3d36fc('0x5b4')][_0x3d36fc('0x327')]();else{function _0x2a3b6b(){const _0x5236df=_0x3d36fc;_0x1277d9['prototype'][_0x5236df('0x49a')][_0x5236df('0x312')](this),!_0xa2ca72[_0x5236df('0x525')](_0x580197)&&(this[_0x5236df('0x42e')][_0x5236df('0x5bd')](),this['_mapNameWindow'][_0x5236df('0x131')](),this[_0x5236df('0x4aa')]['visible']=![],_0x194503[_0x5236df('0x1ef')]()),_0xd12d7f[_0x5236df('0x30e')]();}}}return _0x3bfca9;},Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x5e2')]=function(){const _0x42cb6d=_0x21bc8a;return Graphics[_0x42cb6d('0x2d3')]-this[_0x42cb6d('0x279')]();},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x24c')]=Scene_MenuBase['prototype'][_0x21bc8a('0x39b')],Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x39b')]=function(){const _0x47fa6c=_0x21bc8a;this[_0x47fa6c('0x159')]=new PIXI[(_0x47fa6c('0x572'))][(_0x47fa6c('0x5e3'))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager[_0x47fa6c('0x3ab')](),this['_backgroundSprite'][_0x47fa6c('0x572')]=[this[_0x47fa6c('0x159')]],this[_0x47fa6c('0x5c3')](this[_0x47fa6c('0x1bf')]),this[_0x47fa6c('0x182')](0xc0),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x21bc8a('0x5b4')]['getBackgroundOpacity']=function(){const _0x5255b5=_0x21bc8a,_0x2e9236=String(this[_0x5255b5('0x29f')][_0x5255b5('0x5e4')]),_0x3e8620=this[_0x5255b5('0x67e')](_0x2e9236);return _0x3e8620?_0x3e8620[_0x5255b5('0x450')]:0xc0;},Scene_MenuBase['prototype'][_0x21bc8a('0x20e')]=function(){const _0x509f3c=_0x21bc8a,_0x28af52=String(this[_0x509f3c('0x29f')][_0x509f3c('0x5e4')]),_0x557b61=this[_0x509f3c('0x67e')](_0x28af52);_0x557b61&&(_0x557b61[_0x509f3c('0x13a')]!==''||_0x557b61['BgFilename2']!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x509f3c('0x2e8')](_0x557b61[_0x509f3c('0x13a')])),this[_0x509f3c('0x3fc')]=new Sprite(ImageManager[_0x509f3c('0x3')](_0x557b61[_0x509f3c('0x2cf')])),this[_0x509f3c('0x5c3')](this[_0x509f3c('0x219')]),this['addChild'](this[_0x509f3c('0x3fc')]),this[_0x509f3c('0x219')][_0x509f3c('0x263')][_0x509f3c('0x5f6')](this[_0x509f3c('0x30')][_0x509f3c('0x608')](this,this[_0x509f3c('0x219')])),this['_backSprite2'][_0x509f3c('0x263')][_0x509f3c('0x5f6')](this[_0x509f3c('0x30')][_0x509f3c('0x608')](this,this[_0x509f3c('0x3fc')])));},Scene_MenuBase['prototype'][_0x21bc8a('0x67e')]=function(_0x57d4bd){const _0xf04e17=_0x21bc8a;return VisuMZ['CoreEngine']['Settings']['MenuBg'][_0x57d4bd]||VisuMZ[_0xf04e17('0x503')][_0xf04e17('0x4e5')]['MenuBg'][_0xf04e17('0x23b')];},Scene_MenuBase[_0x21bc8a('0x5b4')]['adjustSprite']=function(_0x383045){const _0x17495a=_0x21bc8a;this[_0x17495a('0x392')](_0x383045),this[_0x17495a('0x500')](_0x383045);},VisuMZ[_0x21bc8a('0x503')]['Scene_MenuBase_createCancelButton']=Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x565')],Scene_MenuBase[_0x21bc8a('0x5b4')]['createCancelButton']=function(){const _0x45974b=_0x21bc8a;VisuMZ['CoreEngine']['Scene_MenuBase_createCancelButton'][_0x45974b('0x312')](this),SceneManager[_0x45974b('0x1eb')]()&&this[_0x45974b('0x1d1')]();},Scene_MenuBase['prototype']['moveCancelButtonSideButtonLayout']=function(){const _0x2e8568=_0x21bc8a;this['_cancelButton']['x']=Graphics[_0x2e8568('0x600')]+0x4;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x499')]=Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x2ed')],Scene_MenuBase[_0x21bc8a('0x5b4')]['createPageButtons']=function(){const _0x1b983a=_0x21bc8a;VisuMZ[_0x1b983a('0x503')][_0x1b983a('0x499')]['call'](this),SceneManager[_0x1b983a('0x1eb')]()&&this[_0x1b983a('0x2b9')]();},Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x2b9')]=function(){const _0x12df57=_0x21bc8a;this[_0x12df57('0x14c')]['x']=-0x1*(this[_0x12df57('0x14c')][_0x12df57('0x65')]+this[_0x12df57('0x590')][_0x12df57('0x65')]+0x8),this[_0x12df57('0x590')]['x']=-0x1*(this[_0x12df57('0x590')][_0x12df57('0x65')]+0x4);},Scene_MenuBase['prototype'][_0x21bc8a('0x3fb')]=function(){const _0x1f6b17=_0x21bc8a;return VisuMZ['CoreEngine'][_0x1f6b17('0x4e5')][_0x1f6b17('0x17')][_0x1f6b17('0xdb')];},Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x518')]=function(){const _0x355ca4=_0x21bc8a;return SceneManager[_0x355ca4('0x1eb')]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x355ca4('0x503')][_0x355ca4('0x4e5')][_0x355ca4('0x17')][_0x355ca4('0x638')]:_0x355ca4('0x50d');},Scene_MenuBase['prototype'][_0x21bc8a('0x3c6')]=function(){const _0x2a2ff8=_0x21bc8a;if(!this[_0x2a2ff8('0x3fb')]())return;const _0x11d16f=this[_0x2a2ff8('0xeb')]();this[_0x2a2ff8('0x1a9')]=new Window_ButtonAssist(_0x11d16f),this[_0x2a2ff8('0x3d2')](this[_0x2a2ff8('0x1a9')]);},Scene_MenuBase[_0x21bc8a('0x5b4')]['buttonAssistWindowRect']=function(){const _0xa59c1=_0x21bc8a;if(this[_0xa59c1('0x518')]()===_0xa59c1('0x50d'))return this['buttonAssistWindowButtonRect']();else{if('ExAUz'===_0xa59c1('0x605')){function _0x70091(){const _0x255d53=_0xa59c1;if(_0x3d224c[_0x255d53('0x48')]())_0x2a0cbc[_0x255d53('0x255')](_0x48fb29);}}else return this[_0xa59c1('0x629')]();}},Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x148')]=function(){const _0x4926e7=_0x21bc8a,_0x51c203=ConfigManager[_0x4926e7('0x476')]?(Sprite_Button[_0x4926e7('0x5b4')][_0x4926e7('0x1b8')]()+0x6)*0x2:0x0,_0x3e4f3a=this['buttonY'](),_0x45974f=Graphics[_0x4926e7('0x600')]-_0x51c203*0x2,_0x265163=this['buttonAreaHeight']();return new Rectangle(_0x51c203,_0x3e4f3a,_0x45974f,_0x265163);},Scene_MenuBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x629')]=function(){const _0x34dcee=_0x21bc8a,_0x16b4d9=Graphics['boxWidth'],_0x3d7483=Window_ButtonAssist[_0x34dcee('0x5b4')]['lineHeight'](),_0x4405ff=0x0;let _0x253a09=0x0;if(this[_0x34dcee('0x518')]()===_0x34dcee('0x272')){if(_0x34dcee('0x5f8')===_0x34dcee('0x5f8'))_0x253a09=0x0;else{function _0x12b68c(){const _0x521d50=_0x34dcee;_0x1765f8[_0x521d50('0x503')][_0x521d50('0x343')]['call'](this,_0x3e6b5e,_0x55f324),this['markCoreEngineModified']();}}}else{if(_0x34dcee('0x5e')!==_0x34dcee('0x43b'))_0x253a09=Graphics[_0x34dcee('0x2d3')]-_0x3d7483;else{function _0x4c99f8(){const _0x167c83=_0x34dcee,_0x14821b=_0x167c83('0x11c');this[_0x167c83('0x12')]=this[_0x167c83('0x12')]||{};if(this[_0x167c83('0x12')][_0x14821b])return this['_colorCache'][_0x14821b];const _0x599e82=_0x4bd98e[_0x167c83('0x503')][_0x167c83('0x4e5')][_0x167c83('0x2aa')]['ColorMaxLvGauge1'];return this[_0x167c83('0x2fb')](_0x14821b,_0x599e82);}}}return new Rectangle(_0x4405ff,_0x253a09,_0x16b4d9,_0x3d7483);},Scene_Menu[_0x21bc8a('0x31c')]=VisuMZ[_0x21bc8a('0x503')]['Settings'][_0x21bc8a('0x27')]['MainMenu'],VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x595')]=Scene_Menu['prototype'][_0x21bc8a('0x35c')],Scene_Menu['prototype'][_0x21bc8a('0x35c')]=function(){const _0x569aec=_0x21bc8a;VisuMZ['CoreEngine']['Scene_Menu_create'][_0x569aec('0x312')](this),this[_0x569aec('0x399')]();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x34f3f9=_0x21bc8a;this[_0x34f3f9('0x4ce')]&&this[_0x34f3f9('0x4ce')][_0x34f3f9('0x2dc')](Scene_Menu[_0x34f3f9('0x31c')][_0x34f3f9('0x4f3')]);if(this[_0x34f3f9('0x240')]){if(_0x34f3f9('0x120')!==_0x34f3f9('0x120')){function _0x5ca232(){const _0x234c36=_0x34f3f9;_0x1c451d[_0x234c36('0xad')]&&(this[_0x234c36('0x4c4')]=_0x234c36('0x77'));}}else this['_goldWindow']['setBackgroundType'](Scene_Menu['layoutSettings'][_0x34f3f9('0x55c')]);}this[_0x34f3f9('0x3db')]&&this['_statusWindow'][_0x34f3f9('0x2dc')](Scene_Menu[_0x34f3f9('0x31c')]['StatusBgType']);},Scene_Menu['prototype'][_0x21bc8a('0x62f')]=function(){const _0x13a661=_0x21bc8a;return Scene_Menu['layoutSettings'][_0x13a661('0x460')][_0x13a661('0x312')](this);},Scene_Menu[_0x21bc8a('0x5b4')]['goldWindowRect']=function(){const _0x4742d3=_0x21bc8a;return Scene_Menu[_0x4742d3('0x31c')][_0x4742d3('0x2ef')][_0x4742d3('0x312')](this);},Scene_Menu[_0x21bc8a('0x5b4')]['statusWindowRect']=function(){return Scene_Menu['layoutSettings']['StatusRect']['call'](this);},Scene_Item[_0x21bc8a('0x31c')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x27')]['ItemMenu'],VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x115')]=Scene_Item[_0x21bc8a('0x5b4')]['create'],Scene_Item[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')]=function(){const _0x2788f6=_0x21bc8a;VisuMZ[_0x2788f6('0x503')][_0x2788f6('0x115')][_0x2788f6('0x312')](this),this[_0x2788f6('0x399')]();},Scene_Item[_0x21bc8a('0x5b4')]['setCoreEngineUpdateWindowBg']=function(){const _0x52d93f=_0x21bc8a;if(this[_0x52d93f('0x602')]){if('YbUEv'!=='YbUEv'){function _0xe3b6ab(){const _0x117da1=_0x52d93f;return _0x13b2bb[_0x117da1('0x503')]['Scene_MenuBase_mainAreaTop'][_0x117da1('0x312')](this);}}else this[_0x52d93f('0x602')]['setBackgroundType'](Scene_Item['layoutSettings'][_0x52d93f('0x31b')]);}this[_0x52d93f('0x43a')]&&this[_0x52d93f('0x43a')][_0x52d93f('0x2dc')](Scene_Item[_0x52d93f('0x31c')][_0x52d93f('0x43d')]);this[_0x52d93f('0x63a')]&&this[_0x52d93f('0x63a')]['setBackgroundType'](Scene_Item[_0x52d93f('0x31c')]['ItemBgType']);if(this['_actorWindow']){if(_0x52d93f('0x37f')===_0x52d93f('0x221')){function _0x138914(){const _0x98d8dd=_0x52d93f;this['_statusWindow']['setBackgroundType'](_0x582a0f[_0x98d8dd('0x31c')][_0x98d8dd('0x66d')]);}}else this[_0x52d93f('0x286')][_0x52d93f('0x2dc')](Scene_Item['layoutSettings'][_0x52d93f('0x404')]);}},Scene_Item[_0x21bc8a('0x5b4')][_0x21bc8a('0x5b1')]=function(){const _0x28627a=_0x21bc8a;return Scene_Item[_0x28627a('0x31c')]['HelpRect'][_0x28627a('0x312')](this);},Scene_Item[_0x21bc8a('0x5b4')][_0x21bc8a('0x33c')]=function(){const _0x2e647a=_0x21bc8a;return Scene_Item['layoutSettings'][_0x2e647a('0x21c')]['call'](this);},Scene_Item[_0x21bc8a('0x5b4')]['itemWindowRect']=function(){const _0xb72ac4=_0x21bc8a;return Scene_Item[_0xb72ac4('0x31c')][_0xb72ac4('0x79')][_0xb72ac4('0x312')](this);},Scene_Item[_0x21bc8a('0x5b4')]['actorWindowRect']=function(){const _0x5d1bb4=_0x21bc8a;return Scene_Item[_0x5d1bb4('0x31c')][_0x5d1bb4('0x3ea')][_0x5d1bb4('0x312')](this);},Scene_Skill[_0x21bc8a('0x31c')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x27')][_0x21bc8a('0x208')],VisuMZ[_0x21bc8a('0x503')]['Scene_Skill_create']=Scene_Skill[_0x21bc8a('0x5b4')]['create'],Scene_Skill[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')]=function(){const _0x9aa28a=_0x21bc8a;VisuMZ['CoreEngine'][_0x9aa28a('0x3f2')][_0x9aa28a('0x312')](this),this[_0x9aa28a('0x399')]();},Scene_Skill[_0x21bc8a('0x5b4')]['setCoreEngineUpdateWindowBg']=function(){const _0x44dd41=_0x21bc8a;this[_0x44dd41('0x602')]&&this[_0x44dd41('0x602')][_0x44dd41('0x2dc')](Scene_Skill[_0x44dd41('0x31c')][_0x44dd41('0x31b')]);this['_skillTypeWindow']&&this['_skillTypeWindow'][_0x44dd41('0x2dc')](Scene_Skill[_0x44dd41('0x31c')][_0x44dd41('0x229')]);this['_statusWindow']&&this[_0x44dd41('0x3db')][_0x44dd41('0x2dc')](Scene_Skill['layoutSettings'][_0x44dd41('0x66d')]);if(this['_itemWindow']){if(_0x44dd41('0x259')===_0x44dd41('0x429')){function _0x2f5a39(){const _0x14cbc0=_0x44dd41;for(let _0x208217=0x0;_0x208217<this[_0x14cbc0('0x5de')]();_0x208217++){const _0x1139d3=this[_0x14cbc0('0xdf')]();let _0xf262c8=_0x4b618b['MIN_SAFE_INTEGER'];this[_0x14cbc0('0x5e7')](_0x208217,_0x1139d3[0x0]);for(const _0x2974e1 of _0x1139d3){const _0x5e4531=_0x2974e1[_0x14cbc0('0x468')]();_0x5e4531>_0xf262c8&&(_0xf262c8=_0x5e4531,this[_0x14cbc0('0x5e7')](_0x208217,_0x2974e1));}}this[_0x14cbc0('0x59d')](_0x14cbc0('0x5be'));}}else this[_0x44dd41('0x63a')][_0x44dd41('0x2dc')](Scene_Skill['layoutSettings'][_0x44dd41('0x40')]);}if(this['_actorWindow']){if(_0x44dd41('0x322')==='aiKjV'){function _0x16e6d5(){const _0x5b7283=_0x44dd41;_0x459ebc[_0x5b7283('0x503')]['Scene_Boot_startNormalGame']['call'](this);}}else this[_0x44dd41('0x286')][_0x44dd41('0x2dc')](Scene_Skill[_0x44dd41('0x31c')][_0x44dd41('0x404')]);}},Scene_Skill[_0x21bc8a('0x5b4')]['helpWindowRect']=function(){const _0x536a1d=_0x21bc8a;return Scene_Skill['layoutSettings'][_0x536a1d('0x661')][_0x536a1d('0x312')](this);},Scene_Skill['prototype'][_0x21bc8a('0x1d6')]=function(){const _0x301cc6=_0x21bc8a;return Scene_Skill[_0x301cc6('0x31c')][_0x301cc6('0x2a4')][_0x301cc6('0x312')](this);},Scene_Skill['prototype'][_0x21bc8a('0xae')]=function(){const _0x1fdb7d=_0x21bc8a;return Scene_Skill[_0x1fdb7d('0x31c')][_0x1fdb7d('0x488')][_0x1fdb7d('0x312')](this);},Scene_Skill[_0x21bc8a('0x5b4')]['itemWindowRect']=function(){const _0x38fbb7=_0x21bc8a;return Scene_Skill[_0x38fbb7('0x31c')]['ItemRect']['call'](this);},Scene_Skill[_0x21bc8a('0x5b4')][_0x21bc8a('0x308')]=function(){const _0x207c73=_0x21bc8a;return Scene_Skill[_0x207c73('0x31c')][_0x207c73('0x3ea')][_0x207c73('0x312')](this);},Scene_Equip[_0x21bc8a('0x31c')]=VisuMZ['CoreEngine'][_0x21bc8a('0x4e5')]['MenuLayout'][_0x21bc8a('0x171')],VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x660')]=Scene_Equip[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')],Scene_Equip[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')]=function(){const _0x3cf547=_0x21bc8a;VisuMZ[_0x3cf547('0x503')][_0x3cf547('0x660')][_0x3cf547('0x312')](this),this[_0x3cf547('0x399')]();},Scene_Equip[_0x21bc8a('0x5b4')][_0x21bc8a('0x399')]=function(){const _0x4202a5=_0x21bc8a;this[_0x4202a5('0x602')]&&this[_0x4202a5('0x602')][_0x4202a5('0x2dc')](Scene_Equip[_0x4202a5('0x31c')]['HelpBgType']);this['_statusWindow']&&this[_0x4202a5('0x3db')][_0x4202a5('0x2dc')](Scene_Equip['layoutSettings']['StatusBgType']);if(this['_commandWindow']){if(_0x4202a5('0x5f')===_0x4202a5('0x5f'))this[_0x4202a5('0x4ce')][_0x4202a5('0x2dc')](Scene_Equip[_0x4202a5('0x31c')][_0x4202a5('0x4f3')]);else{function _0x148165(){const _0x3366aa=_0x4202a5;if(!!_0x5a5871[_0x46a5cc]){if(_0x317e94[_0x3366aa('0x48')]())_0xf630a[_0x3366aa('0x255')](_0x3366aa('0x547')[_0x3366aa('0x2c1')](_0x467342));}const _0x249d61=_0x3366aa('0x8c')[_0x3366aa('0x2c1')](_0x4b06d9,_0x3275af);_0xb606dd[_0x4c13a2]=new _0x77af50(_0x249d61);}}}if(this[_0x4202a5('0x27b')]){if(_0x4202a5('0x158')===_0x4202a5('0x158'))this[_0x4202a5('0x27b')]['setBackgroundType'](Scene_Equip[_0x4202a5('0x31c')]['SlotBgType']);else{function _0x53e70c(){const _0x1d0102=_0x4202a5;this[_0x1d0102('0x278')]=_0x5b6f35;}}}this[_0x4202a5('0x63a')]&&this[_0x4202a5('0x63a')]['setBackgroundType'](Scene_Equip[_0x4202a5('0x31c')][_0x4202a5('0x40')]);},Scene_Equip[_0x21bc8a('0x5b4')]['helpWindowRect']=function(){const _0x4a56f0=_0x21bc8a;return Scene_Equip[_0x4a56f0('0x31c')]['HelpRect']['call'](this);},Scene_Equip[_0x21bc8a('0x5b4')][_0x21bc8a('0xae')]=function(){const _0x247f75=_0x21bc8a;return Scene_Equip[_0x247f75('0x31c')]['StatusRect'][_0x247f75('0x312')](this);},Scene_Equip[_0x21bc8a('0x5b4')]['commandWindowRect']=function(){const _0xbee27d=_0x21bc8a;return Scene_Equip[_0xbee27d('0x31c')][_0xbee27d('0x460')][_0xbee27d('0x312')](this);},Scene_Equip[_0x21bc8a('0x5b4')]['slotWindowRect']=function(){const _0x911c69=_0x21bc8a;return Scene_Equip[_0x911c69('0x31c')][_0x911c69('0x1c')][_0x911c69('0x312')](this);},Scene_Equip['prototype'][_0x21bc8a('0x53c')]=function(){const _0x3f9cdb=_0x21bc8a;return Scene_Equip[_0x3f9cdb('0x31c')][_0x3f9cdb('0x79')][_0x3f9cdb('0x312')](this);},Scene_Status[_0x21bc8a('0x31c')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')]['MenuLayout'][_0x21bc8a('0x641')],VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x3b3')]=Scene_Status[_0x21bc8a('0x5b4')]['create'],Scene_Status['prototype'][_0x21bc8a('0x35c')]=function(){const _0x4f12cc=_0x21bc8a;VisuMZ[_0x4f12cc('0x503')]['Scene_Status_create']['call'](this),this[_0x4f12cc('0x399')]();},Scene_Status[_0x21bc8a('0x5b4')][_0x21bc8a('0x399')]=function(){const _0x2dad3a=_0x21bc8a;this[_0x2dad3a('0x40a')]&&this[_0x2dad3a('0x40a')][_0x2dad3a('0x2dc')](Scene_Status['layoutSettings'][_0x2dad3a('0x243')]);if(this[_0x2dad3a('0x3db')]){if(_0x2dad3a('0x13d')!==_0x2dad3a('0x13d')){function _0x39e0a5(){const _0x3718ca=_0x2dad3a,_0x193b70=_0x4c434d['GetParamIcon'](_0x50d746);_0x130ff2?(this[_0x3718ca('0x431')](_0x193b70,_0x5494cd,_0x8e973e,this[_0x3718ca('0x1f2')]()),_0x1a5733-=this[_0x3718ca('0x1f2')]()+0x2,_0x5886c8+=this[_0x3718ca('0x1f2')]()+0x2):(this['drawIcon'](_0x193b70,_0x195916+0x2,_0x2a0482+0x2),_0x5858cc-=_0x3ca9d5['iconWidth']+0x4,_0x58e5f1+=_0x301e87[_0x3718ca('0x1d7')]+0x4);}}else this[_0x2dad3a('0x3db')][_0x2dad3a('0x2dc')](Scene_Status['layoutSettings'][_0x2dad3a('0x66d')]);}this[_0x2dad3a('0x2b3')]&&this['_statusParamsWindow'][_0x2dad3a('0x2dc')](Scene_Status[_0x2dad3a('0x31c')][_0x2dad3a('0x58d')]);if(this[_0x2dad3a('0x13b')]){if(_0x2dad3a('0x67')!==_0x2dad3a('0x21b'))this[_0x2dad3a('0x13b')][_0x2dad3a('0x2dc')](Scene_Status[_0x2dad3a('0x31c')]['StatusEquipBgType']);else{function _0x44e314(){const _0x599675=_0x2dad3a;if(_0xaeb0cb['ShowJS'][_0x599675('0x312')](this)){const _0x5a4f58=_0x5e3fbc[_0x599675('0x403')];let _0x20bceb=_0x1ef28a['TextStr'];if(['',_0x599675('0x254')][_0x599675('0x666')](_0x20bceb))_0x20bceb=_0x183931['TextJS'][_0x599675('0x312')](this);const _0x4f8ae5=_0x489d28[_0x599675('0x566')]['call'](this),_0x587bcb=_0x5e8f6f[_0x599675('0x5f0')][_0x599675('0x312')](this);this[_0x599675('0x198')](_0x20bceb,_0x5a4f58,_0x4f8ae5,_0x587bcb),this[_0x599675('0x3f8')](_0x5a4f58,_0x5a61f8[_0x599675('0x542')][_0x599675('0x608')](this,_0x587bcb));}}}}},Scene_Status['prototype']['profileWindowRect']=function(){const _0x2199ff=_0x21bc8a;return Scene_Status[_0x2199ff('0x31c')][_0x2199ff('0x4ef')][_0x2199ff('0x312')](this);},Scene_Status[_0x21bc8a('0x5b4')][_0x21bc8a('0xae')]=function(){const _0x5190e1=_0x21bc8a;return Scene_Status[_0x5190e1('0x31c')]['StatusRect'][_0x5190e1('0x312')](this);},Scene_Status['prototype'][_0x21bc8a('0x350')]=function(){const _0x5e22d3=_0x21bc8a;return Scene_Status['layoutSettings']['StatusParamsRect'][_0x5e22d3('0x312')](this);},Scene_Status[_0x21bc8a('0x5b4')][_0x21bc8a('0x367')]=function(){const _0xb30c7c=_0x21bc8a;return Scene_Status[_0xb30c7c('0x31c')][_0xb30c7c('0x3ad')]['call'](this);},Scene_Options[_0x21bc8a('0x31c')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x27')][_0x21bc8a('0x2c8')],VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x20c')]=Scene_Options['prototype']['create'],Scene_Options[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')]=function(){const _0x4c99c2=_0x21bc8a;VisuMZ[_0x4c99c2('0x503')][_0x4c99c2('0x20c')][_0x4c99c2('0x312')](this),this[_0x4c99c2('0x399')]();},Scene_Options[_0x21bc8a('0x5b4')]['setCoreEngineUpdateWindowBg']=function(){const _0x18cd42=_0x21bc8a;this['_optionsWindow']&&this[_0x18cd42('0x31f')][_0x18cd42('0x2dc')](Scene_Options['layoutSettings'][_0x18cd42('0x73')]);},Scene_Options[_0x21bc8a('0x5b4')][_0x21bc8a('0x2fd')]=function(){const _0x154ccf=_0x21bc8a;return Scene_Options[_0x154ccf('0x31c')]['OptionsRect'][_0x154ccf('0x312')](this);},Scene_Save[_0x21bc8a('0x31c')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')]['MenuLayout'][_0x21bc8a('0x437')],Scene_Save[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')]=function(){const _0x4c72a0=_0x21bc8a;Scene_File['prototype'][_0x4c72a0('0x35c')]['call'](this),this[_0x4c72a0('0x399')]();},Scene_Save[_0x21bc8a('0x5b4')][_0x21bc8a('0x399')]=function(){const _0x38d525=_0x21bc8a;this[_0x38d525('0x602')]&&this[_0x38d525('0x602')][_0x38d525('0x2dc')](Scene_Save[_0x38d525('0x31c')][_0x38d525('0x31b')]);if(this[_0x38d525('0xe7')]){if('HnrvL'===_0x38d525('0x339')){function _0x52df0c(){const _0x1b2835=_0x38d525;if(this[_0x1b2835('0x135')]())this[_0x1b2835('0xbe')](_0x32b31a,_0x490e81,_0x1ee61f);_0x4faa18[_0x1b2835('0x503')][_0x1b2835('0xc8')][_0x1b2835('0x312')](this,_0x393d5b,_0x4a2078,_0x4fd89c);}}else this[_0x38d525('0xe7')][_0x38d525('0x2dc')](Scene_Save['layoutSettings'][_0x38d525('0x448')]);}},Scene_Save[_0x21bc8a('0x5b4')][_0x21bc8a('0x5b1')]=function(){const _0x1ad15a=_0x21bc8a;return Scene_Save[_0x1ad15a('0x31c')][_0x1ad15a('0x661')][_0x1ad15a('0x312')](this);},Scene_Save[_0x21bc8a('0x5b4')]['listWindowRect']=function(){const _0x152360=_0x21bc8a;return Scene_Save[_0x152360('0x31c')][_0x152360('0x2eb')][_0x152360('0x312')](this);},Scene_Load['layoutSettings']=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x27')][_0x21bc8a('0x656')],Scene_Load[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')]=function(){const _0x580b7f=_0x21bc8a;Scene_File[_0x580b7f('0x5b4')][_0x580b7f('0x35c')][_0x580b7f('0x312')](this),this[_0x580b7f('0x399')]();},Scene_Load['prototype'][_0x21bc8a('0x399')]=function(){const _0x5a7503=_0x21bc8a;this[_0x5a7503('0x602')]&&this[_0x5a7503('0x602')]['setBackgroundType'](Scene_Load[_0x5a7503('0x31c')][_0x5a7503('0x31b')]),this['_listWindow']&&this['_listWindow'][_0x5a7503('0x2dc')](Scene_Load['layoutSettings'][_0x5a7503('0x448')]);},Scene_Load[_0x21bc8a('0x5b4')][_0x21bc8a('0x5b1')]=function(){const _0x259f2a=_0x21bc8a;return Scene_Load['layoutSettings'][_0x259f2a('0x661')][_0x259f2a('0x312')](this);},Scene_Load['prototype'][_0x21bc8a('0x47')]=function(){const _0xf75fd5=_0x21bc8a;return Scene_Load[_0xf75fd5('0x31c')]['ListRect']['call'](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x27')][_0x21bc8a('0x578')],VisuMZ['CoreEngine'][_0x21bc8a('0x5bf')]=Scene_GameEnd[_0x21bc8a('0x5b4')][_0x21bc8a('0x39b')],Scene_GameEnd[_0x21bc8a('0x5b4')][_0x21bc8a('0x39b')]=function(){const _0x5aa2ec=_0x21bc8a;Scene_MenuBase[_0x5aa2ec('0x5b4')][_0x5aa2ec('0x39b')][_0x5aa2ec('0x312')](this);},Scene_GameEnd[_0x21bc8a('0x5b4')]['createCommandWindow']=function(){const _0x243394=_0x21bc8a,_0x3ff222=this[_0x243394('0x62f')]();this['_commandWindow']=new Window_GameEnd(_0x3ff222),this['_commandWindow'][_0x243394('0x3f8')]('cancel',this[_0x243394('0x311')][_0x243394('0x608')](this)),this[_0x243394('0x3d2')](this[_0x243394('0x4ce')]),this[_0x243394('0x4ce')][_0x243394('0x2dc')](Scene_GameEnd['layoutSettings'][_0x243394('0x4f3')]);},Scene_GameEnd[_0x21bc8a('0x5b4')][_0x21bc8a('0x62f')]=function(){const _0x54f4a8=_0x21bc8a;return Scene_GameEnd[_0x54f4a8('0x31c')][_0x54f4a8('0x460')][_0x54f4a8('0x312')](this);},Scene_Shop[_0x21bc8a('0x31c')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')]['MenuLayout'][_0x21bc8a('0xe8')],VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x24d')]=Scene_Shop[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')],Scene_Shop[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')]=function(){const _0x19b13c=_0x21bc8a;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x19b13c('0x312')](this),this[_0x19b13c('0x399')]();},Scene_Shop[_0x21bc8a('0x5b4')]['setCoreEngineUpdateWindowBg']=function(){const _0xec4f78=_0x21bc8a;if(this[_0xec4f78('0x602')]){if(_0xec4f78('0x1f5')!==_0xec4f78('0x1f5')){function _0x18bb28(){const _0x371d77=_0xec4f78;_0x287128[_0x371d77('0x255')]('Script\x20Call\x20Error'),_0x2ef23f[_0x371d77('0x255')](_0x5d5219);}}else this['_helpWindow'][_0xec4f78('0x2dc')](Scene_Shop[_0xec4f78('0x31c')]['HelpBgType']);}this[_0xec4f78('0x240')]&&this[_0xec4f78('0x240')][_0xec4f78('0x2dc')](Scene_Shop[_0xec4f78('0x31c')][_0xec4f78('0x55c')]);if(this['_commandWindow']){if(_0xec4f78('0x619')!==_0xec4f78('0x619')){function _0x42def0(){return!![];}}else this[_0xec4f78('0x4ce')]['setBackgroundType'](Scene_Shop[_0xec4f78('0x31c')]['CommandBgType']);}this[_0xec4f78('0x86')]&&this[_0xec4f78('0x86')][_0xec4f78('0x2dc')](Scene_Shop[_0xec4f78('0x31c')][_0xec4f78('0xa3')]);if(this[_0xec4f78('0x609')]){if('GQATt'!==_0xec4f78('0x433')){function _0x26026f(){const _0x377be4=_0xec4f78;if(this[_0x377be4('0x5bc')]===_0x4b0ae6)this['initCoreEngine']();if(this[_0x377be4('0x5bc')][_0x377be4('0x147')]===_0x2e55b1)this['initCoreEngine']();this['_CoreEngineSettings'][_0x377be4('0x50e')]=_0x1c0c9c;}}else this[_0xec4f78('0x609')]['setBackgroundType'](Scene_Shop[_0xec4f78('0x31c')][_0xec4f78('0x37c')]);}this['_statusWindow']&&this['_statusWindow'][_0xec4f78('0x2dc')](Scene_Shop[_0xec4f78('0x31c')]['StatusBgType']);if(this[_0xec4f78('0x4fd')]){if(_0xec4f78('0x3ef')!=='OUcjx'){function _0x4ae350(){const _0xf8f12c=_0xec4f78;return this[_0xf8f12c('0x645')]();}}else this['_buyWindow']['setBackgroundType'](Scene_Shop[_0xec4f78('0x31c')][_0xec4f78('0xc3')]);}if(this[_0xec4f78('0x43a')]){if(_0xec4f78('0x5c4')!==_0xec4f78('0x2c2'))this[_0xec4f78('0x43a')]['setBackgroundType'](Scene_Shop[_0xec4f78('0x31c')][_0xec4f78('0x43d')]);else{function _0x4e2341(){const _0x483b8e=_0xec4f78,_0x235b5c=_0xee0dc1[_0x483b8e('0x7e')];if(_0x235b5c===0x1&&this[_0x483b8e('0xd8')]()['attackSkillId']()!==0x1)this[_0x483b8e('0x486')]();else _0x235b5c===0x2&&this[_0x483b8e('0xd8')]()[_0x483b8e('0x114')]()!==0x2?this[_0x483b8e('0x442')]():this[_0x483b8e('0x32')](_0x235b5c);}}}this[_0xec4f78('0x27a')]&&this[_0xec4f78('0x27a')][_0xec4f78('0x2dc')](Scene_Shop[_0xec4f78('0x31c')]['SellBgType']);},Scene_Shop[_0x21bc8a('0x5b4')][_0x21bc8a('0x5b1')]=function(){const _0x4b16d8=_0x21bc8a;return Scene_Shop['layoutSettings'][_0x4b16d8('0x661')][_0x4b16d8('0x312')](this);},Scene_Shop[_0x21bc8a('0x5b4')][_0x21bc8a('0x519')]=function(){return Scene_Shop['layoutSettings']['GoldRect']['call'](this);},Scene_Shop[_0x21bc8a('0x5b4')][_0x21bc8a('0x62f')]=function(){const _0x4dfab7=_0x21bc8a;return Scene_Shop[_0x4dfab7('0x31c')][_0x4dfab7('0x460')][_0x4dfab7('0x312')](this);},Scene_Shop[_0x21bc8a('0x5b4')][_0x21bc8a('0x4bb')]=function(){const _0x192d09=_0x21bc8a;return Scene_Shop['layoutSettings'][_0x192d09('0x23a')][_0x192d09('0x312')](this);},Scene_Shop[_0x21bc8a('0x5b4')][_0x21bc8a('0x5e8')]=function(){const _0x18ef06=_0x21bc8a;return Scene_Shop[_0x18ef06('0x31c')][_0x18ef06('0x8d')][_0x18ef06('0x312')](this);},Scene_Shop[_0x21bc8a('0x5b4')]['statusWindowRect']=function(){const _0xb98248=_0x21bc8a;return Scene_Shop[_0xb98248('0x31c')]['StatusRect'][_0xb98248('0x312')](this);},Scene_Shop['prototype']['buyWindowRect']=function(){const _0x1a9bd2=_0x21bc8a;return Scene_Shop['layoutSettings'][_0x1a9bd2('0x303')]['call'](this);},Scene_Shop['prototype'][_0x21bc8a('0x33c')]=function(){const _0x3301a3=_0x21bc8a;return Scene_Shop['layoutSettings'][_0x3301a3('0x21c')][_0x3301a3('0x312')](this);},Scene_Shop[_0x21bc8a('0x5b4')]['sellWindowRect']=function(){const _0x5d8990=_0x21bc8a;return Scene_Shop[_0x5d8990('0x31c')][_0x5d8990('0x55d')][_0x5d8990('0x312')](this);},Scene_Name['layoutSettings']=VisuMZ[_0x21bc8a('0x503')]['Settings'][_0x21bc8a('0x27')][_0x21bc8a('0x1d8')],VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4a9')]=Scene_Name[_0x21bc8a('0x5b4')]['create'],Scene_Name[_0x21bc8a('0x5b4')][_0x21bc8a('0x35c')]=function(){const _0xd98842=_0x21bc8a;VisuMZ[_0xd98842('0x503')]['Scene_Name_create'][_0xd98842('0x312')](this),this[_0xd98842('0x399')]();},Scene_Name['prototype'][_0x21bc8a('0x399')]=function(){const _0x2691e1=_0x21bc8a;if(this[_0x2691e1('0x3e0')]){if('cxlig'!==_0x2691e1('0x1d4')){function _0x49cc8f(){const _0xf0f2c=_0x2691e1;if(!this[_0xf0f2c('0x5b6')])return _0x598e91;return _0x2d9cd9[_0xf0f2c('0x274')](_0x361df4,this['_coreEasing']['type']||'LINEAR');}}else this[_0x2691e1('0x3e0')][_0x2691e1('0x2dc')](Scene_Name[_0x2691e1('0x31c')][_0x2691e1('0x390')]);}if(this[_0x2691e1('0x391')]){if('bouAG'===_0x2691e1('0x668')){function _0x1a8e57(){var _0x599aa2=_0x2cf4e0(_0x5864a1['$1'])/0x64;_0x471dd7+=_0x599aa2;}}else this['_inputWindow']['setBackgroundType'](Scene_Name['layoutSettings'][_0x2691e1('0x511')]);}},Scene_Name['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x21bc8a('0x5b4')]['editWindowRect']=function(){const _0x58fcb1=_0x21bc8a;return Scene_Name[_0x58fcb1('0x31c')]['EditRect'][_0x58fcb1('0x312')](this);},Scene_Name[_0x21bc8a('0x5b4')]['inputWindowRect']=function(){const _0x4d6f43=_0x21bc8a;return Scene_Name[_0x4d6f43('0x31c')][_0x4d6f43('0x4b5')][_0x4d6f43('0x312')](this);},VisuMZ['CoreEngine'][_0x21bc8a('0x4da')]=Scene_Battle[_0x21bc8a('0x5b4')][_0x21bc8a('0x5bd')],Scene_Battle[_0x21bc8a('0x5b4')][_0x21bc8a('0x5bd')]=function(){const _0x45ed98=_0x21bc8a;VisuMZ[_0x45ed98('0x503')][_0x45ed98('0x4da')]['call'](this);if($gameTemp[_0x45ed98('0x204')])this[_0x45ed98('0x96')]();},Scene_Battle[_0x21bc8a('0x5b4')]['updatePlayTestF7']=function(){const _0xd658ed=_0x21bc8a;if(!BattleManager[_0xd658ed('0x470')]()&&!this[_0xd658ed('0xd')]&&!$gameMessage[_0xd658ed('0x218')]()){if(_0xd658ed('0x630')==='dIBtV'){function _0x1c1a23(){const _0x118e14=_0xd658ed;let _0x4e675c=0x0;for(const _0x39d0db of _0x2e9a5f[_0x118e14('0x503')][_0x118e14('0x4e5')][_0x118e14('0x119')][_0x118e14('0x1c6')]){const _0x2ac638=this[_0x118e14('0x372')](),_0x235f55=this['paramY'](_0x4e675c);this[_0x118e14('0x142')](_0x2ac638,_0x235f55,_0x39d0db),_0x4e675c++;}}}else this[_0xd658ed('0xd')]=!![],this[_0xd658ed('0x5bd')](),SceneManager[_0xd658ed('0x4c3')](),this[_0xd658ed('0xd')]=![];}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x26a')]=Scene_Battle[_0x21bc8a('0x5b4')][_0x21bc8a('0x565')],Scene_Battle[_0x21bc8a('0x5b4')][_0x21bc8a('0x565')]=function(){const _0x25b34d=_0x21bc8a;VisuMZ['CoreEngine'][_0x25b34d('0x26a')][_0x25b34d('0x312')](this),SceneManager[_0x25b34d('0x1eb')]()&&this['repositionCancelButtonSideButtonLayout']();},Scene_Battle[_0x21bc8a('0x5b4')][_0x21bc8a('0x228')]=function(){const _0x112109=_0x21bc8a;this['_cancelButton']['x']=Graphics['boxWidth']+0x4;if(this[_0x112109('0x44a')]()){if('wkyFj'===_0x112109('0x534'))this[_0x112109('0x76')]['y']=Graphics[_0x112109('0x2d3')]-this[_0x112109('0x453')]();else{function _0x17f6a8(){const _0x41c7a3=_0x112109;_0x36aa00[_0x41c7a3('0x503')][_0x41c7a3('0x1b2')][_0x41c7a3('0x312')](this);if(!_0x9ecc97['_changingClass'])this[_0x41c7a3('0x28c')]();}}}else this[_0x112109('0x76')]['y']=0x0;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x506')]=Sprite_Button[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')],Sprite_Button['prototype']['initialize']=function(_0x115463){const _0x1fa3c0=_0x21bc8a;VisuMZ[_0x1fa3c0('0x503')]['Sprite_Button_initialize'][_0x1fa3c0('0x312')](this,_0x115463),this[_0x1fa3c0('0x12e')]();},Sprite_Button[_0x21bc8a('0x5b4')]['initButtonHidden']=function(){const _0xe92701=_0x21bc8a,_0x512e8a=VisuMZ['CoreEngine'][_0xe92701('0x4e5')]['UI'];this['_isButtonHidden']=![];switch(this[_0xe92701('0x456')]){case'cancel':this[_0xe92701('0x494')]=!_0x512e8a[_0xe92701('0x315')];break;case'pageup':case _0xe92701('0x1bd'):this[_0xe92701('0x494')]=!_0x512e8a['pagedownShowButton'];break;case _0xe92701('0xdc'):case'up':case'down2':case _0xe92701('0x4f5'):case'ok':this['_isButtonHidden']=!_0x512e8a[_0xe92701('0x3e3')];break;case _0xe92701('0x28d'):this[_0xe92701('0x494')]=!_0x512e8a['menuShowButton'];break;}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x161')]=Sprite_Button['prototype'][_0x21bc8a('0x5d3')],Sprite_Button[_0x21bc8a('0x5b4')][_0x21bc8a('0x5d3')]=function(){const _0x57f73e=_0x21bc8a;if(SceneManager[_0x57f73e('0x1a5')]()||this[_0x57f73e('0x494')])this[_0x57f73e('0x535')]();else{if('aKqtw'!==_0x57f73e('0x132')){function _0x36299c(){const _0x4d1c81=_0x57f73e;this[_0x4d1c81('0x14f')](_0x523f14['isTriggered'](_0x4d1c81('0x5bb')));}}else VisuMZ[_0x57f73e('0x503')][_0x57f73e('0x161')][_0x57f73e('0x312')](this);}},Sprite_Button['prototype'][_0x21bc8a('0x535')]=function(){const _0x293299=_0x21bc8a;this['visible']=![],this[_0x293299('0x5a')]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x293299('0x585')]*0xa;},VisuMZ['CoreEngine'][_0x21bc8a('0x94')]=Sprite_Battler['prototype'][_0x21bc8a('0x445')],Sprite_Battler['prototype'][_0x21bc8a('0x445')]=function(_0x3d01a8,_0x2b1254,_0x32868a){const _0x3cbd50=_0x21bc8a;(this[_0x3cbd50('0x4ab')]!==_0x3d01a8||this[_0x3cbd50('0x133')]!==_0x2b1254)&&(this['setMoveEasingType'](_0x3cbd50('0x59a')),this[_0x3cbd50('0x172')]=_0x32868a),VisuMZ[_0x3cbd50('0x503')][_0x3cbd50('0x94')][_0x3cbd50('0x312')](this,_0x3d01a8,_0x2b1254,_0x32868a);},Sprite_Battler[_0x21bc8a('0x5b4')][_0x21bc8a('0x3d7')]=function(_0x527078){const _0x5ca3dd=_0x21bc8a;this[_0x5ca3dd('0x5b2')]=_0x527078;},Sprite_Battler[_0x21bc8a('0x5b4')][_0x21bc8a('0x30c')]=function(){const _0x1392f7=_0x21bc8a;if(this[_0x1392f7('0x479')]<=0x0)return;const _0x2ac267=this[_0x1392f7('0x479')],_0x5847e5=this[_0x1392f7('0x172')],_0x19c344=this[_0x1392f7('0x5b2')];this[_0x1392f7('0x354')]=this[_0x1392f7('0x35f')](this[_0x1392f7('0x354')],this['_targetOffsetX'],_0x2ac267,_0x5847e5,_0x19c344),this[_0x1392f7('0x1ed')]=this[_0x1392f7('0x35f')](this[_0x1392f7('0x1ed')],this[_0x1392f7('0x133')],_0x2ac267,_0x5847e5,_0x19c344),this[_0x1392f7('0x479')]--;if(this[_0x1392f7('0x479')]<=0x0)this[_0x1392f7('0x2dd')]();},Sprite_Battler[_0x21bc8a('0x5b4')][_0x21bc8a('0x35f')]=function(_0xe34926,_0xab9231,_0x1a0a90,_0x4dd761,_0x3b9587){const _0x4ec3dd=_0x21bc8a,_0x2c0acc=VisuMZ['ApplyEasing']((_0x4dd761-_0x1a0a90)/_0x4dd761,_0x3b9587||_0x4ec3dd('0x59a')),_0x783379=VisuMZ[_0x4ec3dd('0x274')]((_0x4dd761-_0x1a0a90+0x1)/_0x4dd761,_0x3b9587||'Linear'),_0x24e175=(_0xe34926-_0xab9231*_0x2c0acc)/(0x1-_0x2c0acc);return _0x24e175+(_0xab9231-_0x24e175)*_0x783379;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x1d')]=Sprite_Actor['prototype'][_0x21bc8a('0x438')],Sprite_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x438')]=function(_0x4c3cf8){const _0x59cbba=_0x21bc8a;if(VisuMZ[_0x59cbba('0x503')][_0x59cbba('0x4e5')]['UI'][_0x59cbba('0x99')])this[_0x59cbba('0x56a')](_0x4c3cf8);else{if(_0x59cbba('0x4af')!==_0x59cbba('0x4af')){function _0x5e4ece(){const _0x261e28=_0x59cbba,_0x1e9016=_0x5bf0f0[_0x261e28('0x33')](_0x3008c0,_0x261e28('0x3eb'));}}else VisuMZ[_0x59cbba('0x503')][_0x59cbba('0x1d')][_0x59cbba('0x312')](this,_0x4c3cf8);}},Sprite_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x56a')]=function(_0x53f4c2){const _0x1e2f0b=_0x21bc8a;let _0x18182a=Math[_0x1e2f0b('0x23d')](Graphics[_0x1e2f0b('0x65')]/0x2+0xc0);_0x18182a-=Math['floor']((Graphics['width']-Graphics[_0x1e2f0b('0x600')])/0x2),_0x18182a+=_0x53f4c2*0x20;let _0x499ba1=Graphics[_0x1e2f0b('0x585')]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x499ba1-=Math[_0x1e2f0b('0x335')]((Graphics[_0x1e2f0b('0x585')]-Graphics[_0x1e2f0b('0x2d3')])/0x2),_0x499ba1+=_0x53f4c2*0x30,this[_0x1e2f0b('0x611')](_0x18182a,_0x499ba1);},Sprite_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x60f')]=function(){const _0x16b7b3=_0x21bc8a;this[_0x16b7b3('0x445')](0x4b0,0x0,0x78);},Sprite_Animation[_0x21bc8a('0x5b4')][_0x21bc8a('0x430')]=function(_0x2e36c3){const _0x5c6b33=_0x21bc8a;this[_0x5c6b33('0x307')]=_0x2e36c3;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x42d')]=Sprite_Animation[_0x21bc8a('0x5b4')][_0x21bc8a('0x467')],Sprite_Animation[_0x21bc8a('0x5b4')]['processSoundTimings']=function(){const _0x48b502=_0x21bc8a;if(this[_0x48b502('0x307')])return;VisuMZ[_0x48b502('0x503')]['Sprite_Animation_processSoundTimings'][_0x48b502('0x312')](this);},Sprite_Animation['prototype'][_0x21bc8a('0x7d')]=function(_0x633dfe){const _0xba1074=_0x21bc8a;if(_0x633dfe[_0xba1074('0x74')]){}const _0x5d3c6b=this[_0xba1074('0x673')][_0xba1074('0x5e4')];let _0x217a01=_0x633dfe['height']*_0x633dfe[_0xba1074('0x310')]['y'],_0xe554fd=0x0,_0x3f7935=-_0x217a01/0x2;if(_0x5d3c6b[_0xba1074('0x5c9')](/<(?:HEAD|HEADER|TOP)>/i))_0x3f7935=-_0x217a01;if(_0x5d3c6b[_0xba1074('0x5c9')](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x3f7935=0x0;if(_0x5d3c6b[_0xba1074('0x5c9')](/<(?:LEFT)>/i))_0xe554fd=-_0x633dfe[_0xba1074('0x65')]/0x2;if(_0x5d3c6b[_0xba1074('0x5c9')](/<(?:RIGHT)>/i))_0x3f7935=_0x633dfe['width']/0x2;if(_0x5d3c6b[_0xba1074('0x5c9')](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0xe554fd=Number(RegExp['$1'])*_0x633dfe[_0xba1074('0x65')];_0x5d3c6b[_0xba1074('0x5c9')](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x3f7935=(0x1-Number(RegExp['$1']))*-_0x217a01);_0x5d3c6b[_0xba1074('0x5c9')](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0xe554fd=Number(RegExp['$1'])*_0x633dfe['width'],_0x3f7935=(0x1-Number(RegExp['$2']))*-_0x217a01);if(_0x5d3c6b[_0xba1074('0x5c9')](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0xe554fd+=Number(RegExp['$1']);if(_0x5d3c6b['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x3f7935+=Number(RegExp['$1']);_0x5d3c6b[_0xba1074('0x5c9')](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0xe554fd+=Number(RegExp['$1']),_0x3f7935+=Number(RegExp['$2']));const _0x37ba69=new Point(_0xe554fd,_0x3f7935);return _0x633dfe[_0xba1074('0x8e')](),_0x633dfe[_0xba1074('0x682')][_0xba1074('0x331')](_0x37ba69);},Sprite_AnimationMV['prototype']['setMute']=function(_0x14bf3d){this['_muteSound']=_0x14bf3d;},VisuMZ['CoreEngine']['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x21bc8a('0x5b4')][_0x21bc8a('0x583')],Sprite_AnimationMV[_0x21bc8a('0x5b4')][_0x21bc8a('0x583')]=function(_0xffbbe4){const _0x577e4b=_0x21bc8a;this['_muteSound']&&(_0xffbbe4=JsonEx[_0x577e4b('0x2a1')](_0xffbbe4),_0xffbbe4['se'][_0x577e4b('0x586')]=0x0),VisuMZ[_0x577e4b('0x503')]['Sprite_AnimationMV_processTimingData'][_0x577e4b('0x312')](this,_0xffbbe4);},Sprite_Damage['prototype'][_0x21bc8a('0x40d')]=function(_0x4de570){const _0x18e5ab=_0x21bc8a;let _0x417ec6=Math[_0x18e5ab('0x299')](_0x4de570)[_0x18e5ab('0x22b')]();this[_0x18e5ab('0x3d8')]()&&(_0x417ec6=VisuMZ[_0x18e5ab('0x75')](_0x417ec6));const _0x1bf189=this[_0x18e5ab('0x41a')](),_0x17d74c=Math[_0x18e5ab('0x335')](_0x1bf189*0.75);for(let _0x2769e0=0x0;_0x2769e0<_0x417ec6[_0x18e5ab('0x49')];_0x2769e0++){const _0x2d61a1=this[_0x18e5ab('0x44')](_0x17d74c,_0x1bf189);_0x2d61a1[_0x18e5ab('0x263')][_0x18e5ab('0x44c')](_0x417ec6[_0x2769e0],0x0,0x0,_0x17d74c,_0x1bf189,'center'),_0x2d61a1['x']=(_0x2769e0-(_0x417ec6[_0x18e5ab('0x49')]-0x1)/0x2)*_0x17d74c,_0x2d61a1['dy']=-_0x2769e0;}},Sprite_Damage[_0x21bc8a('0x5b4')][_0x21bc8a('0x3d8')]=function(){const _0x23b2e8=_0x21bc8a;return VisuMZ[_0x23b2e8('0x503')][_0x23b2e8('0x4e5')][_0x23b2e8('0x1a7')][_0x23b2e8('0x207')];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x116')]=Sprite_Gauge[_0x21bc8a('0x5b4')]['gaugeRate'],Sprite_Gauge[_0x21bc8a('0x5b4')][_0x21bc8a('0x106')]=function(){return VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate']['call'](this)['clamp'](0x0,0x1);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x2b1')]=Sprite_Gauge[_0x21bc8a('0x5b4')][_0x21bc8a('0xe9')],Sprite_Gauge['prototype'][_0x21bc8a('0xe9')]=function(){const _0x48590c=_0x21bc8a;let _0x4e4d92=VisuMZ[_0x48590c('0x503')][_0x48590c('0x2b1')]['call'](this);return _0x4e4d92;},Sprite_Gauge['prototype'][_0x21bc8a('0x1ee')]=function(){const _0x475908=_0x21bc8a;let _0x544056=this[_0x475908('0xe9')]();if(this[_0x475908('0x3d8')]()){if('RUeyL'!==_0x475908('0x20b'))_0x544056=VisuMZ[_0x475908('0x75')](_0x544056);else{function _0x107c4d(){const _0x43aa1b=_0x475908;return _0x20c318[_0x43aa1b('0x31c')]['StatusRect'][_0x43aa1b('0x312')](this);}}}const _0x8e24e1=this[_0x475908('0x35b')]()-0x1,_0xcfa51=this['bitmapHeight']();this[_0x475908('0x461')](),this[_0x475908('0x263')][_0x475908('0x44c')](_0x544056,0x0,0x0,_0x8e24e1,_0xcfa51,_0x475908('0x5bb'));},Sprite_Gauge[_0x21bc8a('0x5b4')][_0x21bc8a('0x344')]=function(){return 0x3;},Sprite_Gauge['prototype'][_0x21bc8a('0x3d8')]=function(){const _0x142514=_0x21bc8a;return VisuMZ[_0x142514('0x503')][_0x142514('0x4e5')][_0x142514('0x1a7')][_0x142514('0xfb')];};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x21bc8a('0x5b4')]=Object['create'](Sprite_Clickable[_0x21bc8a('0x5b4')]),Sprite_TitlePictureButton[_0x21bc8a('0x5b4')][_0x21bc8a('0x29f')]=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype']['initialize']=function(_0x472962){const _0x22fff6=_0x21bc8a;Sprite_Clickable[_0x22fff6('0x5b4')][_0x22fff6('0x57f')][_0x22fff6('0x312')](this),this[_0x22fff6('0x9c')]=_0x472962,this[_0x22fff6('0x407')]=null,this['setup']();},Sprite_TitlePictureButton['prototype']['setup']=function(){const _0x3322a6=_0x21bc8a;this['x']=Graphics[_0x3322a6('0x65')],this['y']=Graphics[_0x3322a6('0x585')],this['visible']=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x21bc8a('0x5b4')]['setupButtonImage']=function(){const _0x8c1c26=_0x21bc8a;this['bitmap']=ImageManager[_0x8c1c26('0x5b3')](this[_0x8c1c26('0x9c')][_0x8c1c26('0x64c')]),this['bitmap'][_0x8c1c26('0x5f6')](this[_0x8c1c26('0x181')][_0x8c1c26('0x608')](this));},Sprite_TitlePictureButton['prototype'][_0x21bc8a('0x181')]=function(){const _0x5c8ed5=_0x21bc8a;this[_0x5c8ed5('0x9c')][_0x5c8ed5('0x33a')][_0x5c8ed5('0x312')](this),this['_data'][_0x5c8ed5('0x4e3')][_0x5c8ed5('0x312')](this),this['setClickHandler'](this[_0x5c8ed5('0x9c')][_0x5c8ed5('0x542')][_0x5c8ed5('0x608')](this));},Sprite_TitlePictureButton[_0x21bc8a('0x5b4')]['update']=function(){const _0xa1a7f2=_0x21bc8a;Sprite_Clickable[_0xa1a7f2('0x5b4')][_0xa1a7f2('0x5bd')][_0xa1a7f2('0x312')](this),this[_0xa1a7f2('0x5d3')](),this[_0xa1a7f2('0x2b4')]();},Sprite_TitlePictureButton[_0x21bc8a('0x5b4')][_0x21bc8a('0x60')]=function(){const _0x39e3fa=_0x21bc8a;return VisuMZ[_0x39e3fa('0x503')][_0x39e3fa('0x4e5')]['MenuLayout'][_0x39e3fa('0x388')][_0x39e3fa('0x314')];},Sprite_TitlePictureButton[_0x21bc8a('0x5b4')][_0x21bc8a('0x5d3')]=function(){const _0x40f844=_0x21bc8a;this[_0x40f844('0x395')]?this['opacity']=0xff:(this['opacity']+=this[_0x40f844('0x3c4')]?this[_0x40f844('0x60')]():-0x1*this[_0x40f844('0x60')](),this[_0x40f844('0x5a')]=Math[_0x40f844('0x509')](0xc0,this[_0x40f844('0x5a')]));},Sprite_TitlePictureButton[_0x21bc8a('0x5b4')][_0x21bc8a('0x54c')]=function(_0x31b214){this['_clickHandler']=_0x31b214;},Sprite_TitlePictureButton[_0x21bc8a('0x5b4')][_0x21bc8a('0x109')]=function(){const _0x3b30dd=_0x21bc8a;if(this[_0x3b30dd('0x407')]){if(_0x3b30dd('0x4b6')!=='VpLWG'){function _0x3ba5ae(){const _0x2cdf5b=_0x3b30dd;_0x13b69f-=_0x282f6e[_0x2cdf5b('0x5b4')][_0x2cdf5b('0x327')]();}}else this[_0x3b30dd('0x407')]();}},VisuMZ[_0x21bc8a('0x503')]['Spriteset_Base_initialize']=Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')],Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')]=function(){const _0x1628f4=_0x21bc8a;VisuMZ['CoreEngine'][_0x1628f4('0x3cc')][_0x1628f4('0x312')](this),this[_0x1628f4('0x416')]=[];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x209')]=Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x67f')],Spriteset_Base[_0x21bc8a('0x5b4')]['destroy']=function(_0x2b67d6){const _0x1a3340=_0x21bc8a;this[_0x1a3340('0x4c7')](),VisuMZ[_0x1a3340('0x503')][_0x1a3340('0x209')]['call'](this,_0x2b67d6);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x400')]=Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x5bd')],Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x5bd')]=function(){const _0x40a5b8=_0x21bc8a;VisuMZ[_0x40a5b8('0x503')][_0x40a5b8('0x400')][_0x40a5b8('0x312')](this),this['updatePictureAntiZoom'](),this[_0x40a5b8('0x564')]();},Spriteset_Base[_0x21bc8a('0x5b4')]['updatePictureAntiZoom']=function(){const _0x7024dc=_0x21bc8a;if(!VisuMZ[_0x7024dc('0x503')]['Settings'][_0x7024dc('0x1a7')]['AntiZoomPictures'])return;this[_0x7024dc('0x310')]['x']!==0x0&&(this[_0x7024dc('0x3bd')][_0x7024dc('0x310')]['x']=0x1/this['scale']['x'],this[_0x7024dc('0x3bd')]['x']=-(this['x']/this['scale']['x'])),this[_0x7024dc('0x310')]['y']!==0x0&&(this[_0x7024dc('0x3bd')][_0x7024dc('0x310')]['y']=0x1/this[_0x7024dc('0x310')]['y'],this[_0x7024dc('0x3bd')]['y']=-(this['y']/this[_0x7024dc('0x310')]['y']));},Spriteset_Base['prototype'][_0x21bc8a('0x564')]=function(){const _0x3645b8=_0x21bc8a;for(const _0x1276e9 of this[_0x3645b8('0x416')]){if(!_0x1276e9[_0x3645b8('0x3cf')]()){if('XeuRB'!==_0x3645b8('0x22c'))this[_0x3645b8('0x10b')](_0x1276e9);else{function _0x2f323e(){const _0x3dd73d=_0x3645b8;return 0.5*_0x20077d[_0x3dd73d('0x1c1')](0x2,0xa*_0x4d7031);}}}}this[_0x3645b8('0x305')]();},Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x305')]=function(){for(;;){const _0x218dbb=$gameTemp['retrieveFauxAnimation']();if(_0x218dbb)this['createFauxAnimation'](_0x218dbb);else break;}},Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x1b0')]=function(_0x5a058c){const _0x1ccb97=_0x21bc8a,_0x9f1b72=$dataAnimations[_0x5a058c[_0x1ccb97('0x17a')]],_0x46e417=_0x5a058c[_0x1ccb97('0x48c')],_0x272fe0=_0x5a058c[_0x1ccb97('0x1fd')],_0x3e155c=_0x5a058c[_0x1ccb97('0x223')];let _0x57249a=this[_0x1ccb97('0x19f')]();const _0x44d460=this['animationNextDelay']();if(this[_0x1ccb97('0x637')](_0x9f1b72))for(const _0x4edec5 of _0x46e417){if(_0x1ccb97('0x457')!==_0x1ccb97('0x457')){function _0x17535(){const _0x3ad133=_0x1ccb97;_0x2d0d68['ConvertParams'](_0x5867f9,_0x5b25d2);const _0x5261d5=_0x393704[_0x3ad133('0x509')](_0x11d93d[_0x3ad133('0x174')],_0x3e2429['EndingID']),_0x23f7de=_0x23843c[_0x3ad133('0x19b')](_0x24c0e2[_0x3ad133('0x174')],_0x4cbcb8[_0x3ad133('0x12f')]);for(let _0x14d2d2=_0x5261d5;_0x14d2d2<=_0x23f7de;_0x14d2d2++){_0x47b3e3['erasePicture'](_0x14d2d2);}}}else this[_0x1ccb97('0x2a0')]([_0x4edec5],_0x9f1b72,_0x272fe0,_0x57249a,_0x3e155c),_0x57249a+=_0x44d460;}else this[_0x1ccb97('0x2a0')](_0x46e417,_0x9f1b72,_0x272fe0,_0x57249a,_0x3e155c);},Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x2a0')]=function(_0x271c9f,_0x1de7a9,_0x2177a7,_0x50db6b,_0x521bcc){const _0x32cc6c=_0x21bc8a,_0x111343=this['isMVAnimation'](_0x1de7a9),_0x3d2b9a=new(_0x111343?Sprite_AnimationMV:Sprite_Animation)(),_0x5e5281=this[_0x32cc6c('0x568')](_0x271c9f);this[_0x32cc6c('0xbc')](_0x271c9f[0x0])&&(_0x2177a7=!_0x2177a7),_0x3d2b9a[_0x32cc6c('0x4ed')]=_0x271c9f,_0x3d2b9a[_0x32cc6c('0x4b7')](_0x5e5281,_0x1de7a9,_0x2177a7,_0x50db6b),_0x3d2b9a[_0x32cc6c('0x430')](_0x521bcc),this['_effectsContainer']['addChild'](_0x3d2b9a),this[_0x32cc6c('0x416')][_0x32cc6c('0x5ca')](_0x3d2b9a);},Spriteset_Base[_0x21bc8a('0x5b4')]['removeFauxAnimation']=function(_0x3b6e06){const _0x32d909=_0x21bc8a;this[_0x32d909('0x416')]['remove'](_0x3b6e06),this['_effectsContainer'][_0x32d909('0xb0')](_0x3b6e06);for(const _0x5c7647 of _0x3b6e06[_0x32d909('0x4ed')]){if(_0x32d909('0x370')===_0x32d909('0x370'))_0x5c7647['endAnimation']&&_0x5c7647[_0x32d909('0x194')]();else{function _0x237121(){const _0x2aa815=_0x32d909;_0x2d0eee[_0x2aa815('0x503')][_0x2aa815('0x14a')]['call'](this,_0x45578d);}}}_0x3b6e06['destroy']();},Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x4c7')]=function(){const _0x43dad9=_0x21bc8a;for(const _0x2bd0f4 of this[_0x43dad9('0x416')]){this['removeFauxAnimation'](_0x2bd0f4);}},Spriteset_Base[_0x21bc8a('0x5b4')]['isFauxAnimationPlaying']=function(){const _0x30abef=_0x21bc8a;return this[_0x30abef('0x416')][_0x30abef('0x49')]>0x0;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x369')]=Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x484')],Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x484')]=function(){VisuMZ['CoreEngine']['Spriteset_Base_updatePosition']['call'](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3f')]=function(){const _0x7c375e=_0x21bc8a;if(!$gameScreen)return;if($gameScreen[_0x7c375e('0x38d')]<=0x0)return;this['x']-=Math[_0x7c375e('0x23d')]($gameScreen[_0x7c375e('0x3a1')]());const _0x1ba444=$gameScreen[_0x7c375e('0x321')]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case'original':this[_0x7c375e('0x32c')]();break;case'horizontal':this[_0x7c375e('0x353')]();break;case _0x7c375e('0x53d'):this[_0x7c375e('0x11f')]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base['prototype'][_0x21bc8a('0x32c')]=function(){const _0x387774=_0x21bc8a,_0xeee330=VisuMZ[_0x387774('0x503')][_0x387774('0x4e5')]['ScreenShake'];if(_0xeee330&&_0xeee330[_0x387774('0x1ea')]){if('yJnHC'!==_0x387774('0x397'))return _0xeee330['originalJS']['call'](this);else{function _0xfad9e6(){const _0x1f82fc=_0x387774;this[_0x1f82fc('0x645')](),_0x2f24e7[_0x1f82fc('0x4d6')](),this[_0x1f82fc('0xf4')]===_0x1f82fc('0x2d8')?this['select'](0x0):this['select'](-0x1);}}}this['x']+=Math[_0x387774('0x23d')]($gameScreen[_0x387774('0x3a1')]());},Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x5cb')]=function(){const _0x595fd5=_0x21bc8a,_0x1b68cb=VisuMZ[_0x595fd5('0x503')][_0x595fd5('0x4e5')][_0x595fd5('0x261')];if(_0x1b68cb&&_0x1b68cb[_0x595fd5('0x46a')])return _0x1b68cb[_0x595fd5('0x46a')]['call'](this);const _0x170c29=$gameScreen[_0x595fd5('0xfd')]*0.75,_0x30aae4=$gameScreen['_shakeSpeed']*0.6,_0x258d59=$gameScreen[_0x595fd5('0x38d')];this['x']+=Math[_0x595fd5('0x23d')](Math['randomInt'](_0x170c29)-Math[_0x595fd5('0x53')](_0x30aae4))*(Math[_0x595fd5('0x509')](_0x258d59,0x1e)*0.5),this['y']+=Math[_0x595fd5('0x23d')](Math[_0x595fd5('0x53')](_0x170c29)-Math[_0x595fd5('0x53')](_0x30aae4))*(Math[_0x595fd5('0x509')](_0x258d59,0x1e)*0.5);},Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x353')]=function(){const _0x144774=_0x21bc8a,_0x52c52d=VisuMZ[_0x144774('0x503')][_0x144774('0x4e5')]['ScreenShake'];if(_0x52c52d&&_0x52c52d[_0x144774('0x27c')])return _0x52c52d[_0x144774('0x27c')][_0x144774('0x312')](this);const _0x175b7d=$gameScreen[_0x144774('0xfd')]*0.75,_0x1d3d2e=$gameScreen[_0x144774('0xf9')]*0.6,_0x37ca86=$gameScreen[_0x144774('0x38d')];this['x']+=Math[_0x144774('0x23d')](Math[_0x144774('0x53')](_0x175b7d)-Math[_0x144774('0x53')](_0x1d3d2e))*(Math[_0x144774('0x509')](_0x37ca86,0x1e)*0.5);},Spriteset_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x11f')]=function(){const _0x4ec76d=_0x21bc8a,_0x49a369=VisuMZ['CoreEngine']['Settings'][_0x4ec76d('0x261')];if(_0x49a369&&_0x49a369[_0x4ec76d('0x2bf')])return _0x49a369[_0x4ec76d('0x2bf')][_0x4ec76d('0x312')](this);const _0x5651ce=$gameScreen[_0x4ec76d('0xfd')]*0.75,_0xd99e6=$gameScreen[_0x4ec76d('0xf9')]*0.6,_0x3a0d87=$gameScreen[_0x4ec76d('0x38d')];this['y']+=Math['round'](Math[_0x4ec76d('0x53')](_0x5651ce)-Math[_0x4ec76d('0x53')](_0xd99e6))*(Math[_0x4ec76d('0x509')](_0x3a0d87,0x1e)*0.5);},Spriteset_Battle[_0x21bc8a('0x5b4')]['createBackground']=function(){const _0x3388e7=_0x21bc8a;this[_0x3388e7('0x159')]=new PIXI[(_0x3388e7('0x572'))][(_0x3388e7('0x5e3'))](clamp=!![]),this[_0x3388e7('0x1bf')]=new Sprite(),this[_0x3388e7('0x1bf')][_0x3388e7('0x263')]=SceneManager[_0x3388e7('0x3ab')](),this['_backgroundSprite'][_0x3388e7('0x572')]=[this[_0x3388e7('0x159')]],this['_baseSprite'][_0x3388e7('0x5c3')](this[_0x3388e7('0x1bf')]);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x63e')]=Spriteset_Battle[_0x21bc8a('0x5b4')]['createEnemies'],Spriteset_Battle['prototype'][_0x21bc8a('0x24')]=function(){const _0x1d2383=_0x21bc8a;VisuMZ[_0x1d2383('0x503')][_0x1d2383('0x4e5')]['UI'][_0x1d2383('0x3f1')]&&this['repositionEnemiesByResolution'](),VisuMZ[_0x1d2383('0x503')][_0x1d2383('0x63e')][_0x1d2383('0x312')](this);},Spriteset_Battle[_0x21bc8a('0x5b4')][_0x21bc8a('0x3f4')]=function(){const _0x59e7ef=_0x21bc8a;for(member of $gameTroop[_0x59e7ef('0x3e9')]()){if(_0x59e7ef('0x37b')===_0x59e7ef('0x3b0')){function _0x47dd7b(){const _0x1a1ef8=_0x59e7ef;this[_0x1a1ef8('0x4c4')]=0x1;}}else member['moveRelativeToResolutionChange']();}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x1d5')]=Window_Base[_0x21bc8a('0x5b4')]['initialize'],Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')]=function(_0x56df62){const _0x2c4f62=_0x21bc8a;_0x56df62['x']=Math[_0x2c4f62('0x23d')](_0x56df62['x']),_0x56df62['y']=Math['round'](_0x56df62['y']),_0x56df62[_0x2c4f62('0x65')]=Math[_0x2c4f62('0x23d')](_0x56df62[_0x2c4f62('0x65')]),_0x56df62[_0x2c4f62('0x585')]=Math[_0x2c4f62('0x23d')](_0x56df62[_0x2c4f62('0x585')]),this[_0x2c4f62('0x2c7')](),VisuMZ['CoreEngine'][_0x2c4f62('0x1d5')][_0x2c4f62('0x312')](this,_0x56df62),this['initCoreEasing']();},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x2c7')]=function(){const _0x3d31=_0x21bc8a;this['_digitGrouping']=VisuMZ[_0x3d31('0x503')]['Settings'][_0x3d31('0x1a7')][_0x3d31('0x454')],this[_0x3d31('0x2d')]=VisuMZ[_0x3d31('0x503')]['Settings']['QoL']['DigitGroupingExText'];},Window_Base[_0x21bc8a('0x5b4')]['lineHeight']=function(){const _0x21a613=_0x21bc8a;return VisuMZ[_0x21a613('0x503')][_0x21a613('0x4e5')][_0x21a613('0x633')][_0x21a613('0x36c')];},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x372')]=function(){const _0x2650d6=_0x21bc8a;return VisuMZ['CoreEngine']['Settings'][_0x2650d6('0x633')]['ItemPadding'];},Window_Base[_0x21bc8a('0x5b4')]['updateBackOpacity']=function(){const _0x44a8ec=_0x21bc8a;this['backOpacity']=VisuMZ['CoreEngine'][_0x44a8ec('0x4e5')]['Window'][_0x44a8ec('0x38')];},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x187')]=function(){const _0x188b4d=_0x21bc8a;return VisuMZ[_0x188b4d('0x503')]['Settings']['Window'][_0x188b4d('0x271')];},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3b4')]=function(){const _0x46ed76=_0x21bc8a;return VisuMZ[_0x46ed76('0x503')]['Settings']['Window']['OpenSpeed'];},VisuMZ[_0x21bc8a('0x503')]['Window_Base_update']=Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x5bd')],Window_Base['prototype'][_0x21bc8a('0x5bd')]=function(){const _0x18aecd=_0x21bc8a;VisuMZ[_0x18aecd('0x503')][_0x18aecd('0x67c')]['call'](this),this[_0x18aecd('0x548')]();},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x333')]=function(){const _0x65999=_0x21bc8a;if(this[_0x65999('0x45')]){if(_0x65999('0x341')===_0x65999('0x35d')){function _0xd2b959(){const _0x1c7451=_0x65999;!this['_repositioned']&&(this['_screenY']+=_0x22077e['round']((_0x48be4a[_0x1c7451('0x585')]-0x270)/0x2),this[_0x1c7451('0x2a7')]-=_0x18b44e[_0x1c7451('0x335')]((_0xbab329[_0x1c7451('0x585')]-_0x31315f[_0x1c7451('0x2d3')])/0x2),_0x130af9[_0x1c7451('0x1e3')]()?this[_0x1c7451('0x5a6')]-=_0x31b074[_0x1c7451('0x335')]((_0x529c64[_0x1c7451('0x65')]-_0x3be393[_0x1c7451('0x600')])/0x2):this[_0x1c7451('0x5a6')]+=_0x16050c[_0x1c7451('0x23d')]((_0x7f8541['boxWidth']-0x330)/0x2)),this[_0x1c7451('0x57b')]=!![];}}else this['openness']+=this[_0x65999('0x3b4')](),this[_0x65999('0x55a')]()&&(this[_0x65999('0x45')]=![]);}},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x2ca')]=function(){const _0x46bc07=_0x21bc8a;if(this[_0x46bc07('0x405')]){this[_0x46bc07('0x648')]-=this[_0x46bc07('0x3b4')]();if(this[_0x46bc07('0x28')]()){if('seEqR'===_0x46bc07('0x292'))this[_0x46bc07('0x405')]=![];else{function _0x315462(){const _0x229ac7=_0x46bc07;return this[_0x229ac7('0x148')]();}}}}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x9f')]=Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x44c')],Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x44c')]=function(_0x2fd5f5,_0x5d58dc,_0x40f4a4,_0x16270e,_0x5d7d90){const _0x2ec073=_0x21bc8a;if(this[_0x2ec073('0x3d8')]())_0x2fd5f5=VisuMZ[_0x2ec073('0x75')](_0x2fd5f5);VisuMZ[_0x2ec073('0x503')]['Window_Base_drawText'][_0x2ec073('0x312')](this,_0x2fd5f5,_0x5d58dc,_0x40f4a4,_0x16270e,_0x5d7d90);},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3d8')]=function(){const _0x25f715=_0x21bc8a;return this[_0x25f715('0x5f3')];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x26c')]=Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x101')],Window_Base[_0x21bc8a('0x5b4')]['createTextState']=function(_0x548926,_0x26ae87,_0x220944,_0x2fa74d){const _0x1466a7=_0x21bc8a;var _0x5ca734=VisuMZ[_0x1466a7('0x503')][_0x1466a7('0x26c')][_0x1466a7('0x312')](this,_0x548926,_0x26ae87,_0x220944,_0x2fa74d);if(this['useDigitGroupingEx']())_0x5ca734[_0x1466a7('0x523')]=VisuMZ[_0x1466a7('0x75')](_0x5ca734[_0x1466a7('0x523')]);return _0x5ca734;},Window_Base['prototype'][_0x21bc8a('0x5b9')]=function(){const _0x259245=_0x21bc8a;return this[_0x259245('0x2d')];},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x402')]=function(_0x49468e){const _0x26018c=_0x21bc8a;this[_0x26018c('0x5f3')]=_0x49468e;},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x42f')]=function(_0x3220f6){const _0x4559e4=_0x21bc8a;this[_0x4559e4('0x2d')]=_0x3220f6;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x1a0')]=Window_Base[_0x21bc8a('0x5b4')]['textSizeEx'],Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x13c')]=function(_0x5dbd7c){const _0x3fe19a=_0x21bc8a;return this['_CoreEngine_Cache_textSizeEx']=this[_0x3fe19a('0x455')]||{},!this[_0x3fe19a('0x455')][_0x5dbd7c]&&(this['_CoreEngine_Cache_textSizeEx'][_0x5dbd7c]=VisuMZ[_0x3fe19a('0x503')][_0x3fe19a('0x1a0')][_0x3fe19a('0x312')](this,_0x5dbd7c)),this[_0x3fe19a('0x455')][_0x5dbd7c];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x551')]=Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3ca')],Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x3ca')]=function(_0x4b0561,_0x5cbb86,_0xf46502){const _0x5ba97b=_0x21bc8a;_0x5cbb86=Math[_0x5ba97b('0x23d')](_0x5cbb86),_0xf46502=Math[_0x5ba97b('0x23d')](_0xf46502),VisuMZ[_0x5ba97b('0x503')][_0x5ba97b('0x551')]['call'](this,_0x4b0561,_0x5cbb86,_0xf46502);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x361')]=Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x418')],Window_Base['prototype'][_0x21bc8a('0x418')]=function(_0x55ef63,_0x3285b1,_0x1fe2bf,_0x1146e8,_0x15b089,_0x1d7b85){const _0x29d54e=_0x21bc8a;_0x15b089=_0x15b089||ImageManager[_0x29d54e('0x336')],_0x1d7b85=_0x1d7b85||ImageManager[_0x29d54e('0x2f3')],_0x1fe2bf=Math[_0x29d54e('0x23d')](_0x1fe2bf),_0x1146e8=Math[_0x29d54e('0x23d')](_0x1146e8),_0x15b089=Math[_0x29d54e('0x23d')](_0x15b089),_0x1d7b85=Math[_0x29d54e('0x23d')](_0x1d7b85),VisuMZ['CoreEngine']['Window_Base_drawFace'][_0x29d54e('0x312')](this,_0x55ef63,_0x3285b1,_0x1fe2bf,_0x1146e8,_0x15b089,_0x1d7b85);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x530')]=Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x83')],Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x83')]=function(_0x201665,_0x225e20,_0x15a147,_0x5cea12){const _0x46ae62=_0x21bc8a;_0x15a147=Math[_0x46ae62('0x23d')](_0x15a147),_0x5cea12=Math[_0x46ae62('0x23d')](_0x5cea12),VisuMZ[_0x46ae62('0x503')][_0x46ae62('0x530')][_0x46ae62('0x312')](this,_0x201665,_0x225e20,_0x15a147,_0x5cea12);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4d2')]=Window_Selectable[_0x21bc8a('0x5b4')]['itemRect'],Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x658')]=function(_0xc1331d){const _0x2057c6=_0x21bc8a;let _0x5f1e09=VisuMZ['CoreEngine'][_0x2057c6('0x4d2')]['call'](this,_0xc1331d);return _0x5f1e09['x']=Math[_0x2057c6('0x23d')](_0x5f1e09['x']),_0x5f1e09['y']=Math[_0x2057c6('0x23d')](_0x5f1e09['y']),_0x5f1e09[_0x2057c6('0x65')]=Math[_0x2057c6('0x23d')](_0x5f1e09[_0x2057c6('0x65')]),_0x5f1e09['height']=Math['round'](_0x5f1e09[_0x2057c6('0x585')]),_0x5f1e09;},VisuMZ['CoreEngine'][_0x21bc8a('0x380')]=Window_StatusBase['prototype']['drawActorSimpleStatus'],Window_StatusBase[_0x21bc8a('0x5b4')]['drawActorSimpleStatus']=function(_0x401146,_0xc755ae,_0x36b50f){const _0x42dd5b=_0x21bc8a;_0xc755ae=Math['round'](_0xc755ae),_0x36b50f=Math['round'](_0x36b50f),VisuMZ['CoreEngine'][_0x42dd5b('0x380')]['call'](this,_0x401146,_0xc755ae,_0x36b50f);},Window_Base['prototype']['initCoreEasing']=function(){const _0x142d13=_0x21bc8a;this[_0x142d13('0x5b6')]={'duration':0x0,'wholeDuration':0x0,'type':_0x142d13('0x439'),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x142d13('0x310')]['y'],'targetOpacity':this[_0x142d13('0x5a')],'targetBackOpacity':this[_0x142d13('0x1cb')],'targetContentsOpacity':this[_0x142d13('0x53a')]};},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x548')]=function(){const _0x4fdfb0=_0x21bc8a;if(!this['_coreEasing'])return;if(this[_0x4fdfb0('0x5b6')][_0x4fdfb0('0x474')]<=0x0)return;this['x']=this[_0x4fdfb0('0x5ed')](this['x'],this[_0x4fdfb0('0x5b6')][_0x4fdfb0('0x233')]),this['y']=this[_0x4fdfb0('0x5ed')](this['y'],this[_0x4fdfb0('0x5b6')][_0x4fdfb0('0x20f')]),this[_0x4fdfb0('0x310')]['x']=this['applyCoreEasing'](this[_0x4fdfb0('0x310')]['x'],this['_coreEasing']['targetScaleX']),this['scale']['y']=this[_0x4fdfb0('0x5ed')](this['scale']['y'],this[_0x4fdfb0('0x5b6')][_0x4fdfb0('0x110')]),this['opacity']=this[_0x4fdfb0('0x5ed')](this[_0x4fdfb0('0x5a')],this[_0x4fdfb0('0x5b6')]['targetOpacity']),this[_0x4fdfb0('0x1cb')]=this[_0x4fdfb0('0x5ed')](this[_0x4fdfb0('0x1cb')],this[_0x4fdfb0('0x5b6')][_0x4fdfb0('0x665')]),this[_0x4fdfb0('0x53a')]=this[_0x4fdfb0('0x5ed')](this[_0x4fdfb0('0x53a')],this[_0x4fdfb0('0x5b6')][_0x4fdfb0('0x5')]),this[_0x4fdfb0('0x5b6')][_0x4fdfb0('0x474')]--;},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x5ed')]=function(_0x55095c,_0x13ee12){const _0x4f1111=_0x21bc8a;if(!this[_0x4f1111('0x5b6')])return _0x13ee12;const _0xa70179=this[_0x4f1111('0x5b6')][_0x4f1111('0x474')],_0x2739dd=this['_coreEasing'][_0x4f1111('0x529')],_0x35d189=this[_0x4f1111('0x643')]((_0x2739dd-_0xa70179)/_0x2739dd),_0xa238bd=this[_0x4f1111('0x643')]((_0x2739dd-_0xa70179+0x1)/_0x2739dd),_0x246add=(_0x55095c-_0x13ee12*_0x35d189)/(0x1-_0x35d189);return _0x246add+(_0x13ee12-_0x246add)*_0xa238bd;},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x643')]=function(_0x9023f4){const _0x35f2b5=_0x21bc8a;if(!this[_0x35f2b5('0x5b6')])return _0x9023f4;return VisuMZ[_0x35f2b5('0x274')](_0x9023f4,this[_0x35f2b5('0x5b6')][_0x35f2b5('0x5a7')]||_0x35f2b5('0x439'));},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x5b')]=function(_0xbe752b,_0x3412de){const _0x4466ef=_0x21bc8a;if(!this[_0x4466ef('0x5b6')])return;this['x']=this['_coreEasing'][_0x4466ef('0x233')],this['y']=this[_0x4466ef('0x5b6')][_0x4466ef('0x20f')],this[_0x4466ef('0x310')]['x']=this[_0x4466ef('0x5b6')][_0x4466ef('0x526')],this[_0x4466ef('0x310')]['y']=this['_coreEasing']['targetScaleY'],this[_0x4466ef('0x5a')]=this[_0x4466ef('0x5b6')][_0x4466ef('0x1f4')],this['backOpacity']=this[_0x4466ef('0x5b6')][_0x4466ef('0x665')],this['contentsOpacity']=this['_coreEasing'][_0x4466ef('0x5')],this[_0x4466ef('0x646')](_0xbe752b,_0x3412de,this['x'],this['y'],this[_0x4466ef('0x310')]['x'],this['scale']['y'],this[_0x4466ef('0x5a')],this[_0x4466ef('0x1cb')],this['contentsOpacity']);},Window_Base[_0x21bc8a('0x5b4')]['setupCoreEasing']=function(_0x1cd69c,_0x95c2fd,_0x28f7f1,_0x3b313a,_0x252eb6,_0x41c491,_0xfbcd05,_0x1721a8,_0x4d5ebb){this['_coreEasing']={'duration':_0x1cd69c,'wholeDuration':_0x1cd69c,'type':_0x95c2fd,'targetX':_0x28f7f1,'targetY':_0x3b313a,'targetScaleX':_0x252eb6,'targetScaleY':_0x41c491,'targetOpacity':_0xfbcd05,'targetBackOpacity':_0x1721a8,'targetContentsOpacity':_0x4d5ebb};},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x43')]=function(_0x3741c0,_0x190f51,_0xadafa1,_0xadb8dc,_0x4a9bdb){const _0x925961=_0x21bc8a;this[_0x925961('0x348')](),this[_0x925961('0x227')][_0x925961('0x41a')]=VisuMZ[_0x925961('0x503')][_0x925961('0x4e5')][_0x925961('0x5e6')][_0x925961('0x46c')];const _0x12389c=VisuMZ[_0x925961('0x503')][_0x925961('0x4e5')][_0x925961('0x5e6')][_0x925961('0x3df')];if(_0x12389c>0x0&&_0x190f51===TextManager['currencyUnit']){const _0x1a9f7a=_0xadb8dc+(this['lineHeight']()-ImageManager[_0x925961('0x3c9')])/0x2;this[_0x925961('0x3ca')](_0x12389c,_0xadafa1+(_0x4a9bdb-ImageManager[_0x925961('0x1d7')]),_0x1a9f7a),_0x4a9bdb-=ImageManager[_0x925961('0x1d7')]+0x4;}else this[_0x925961('0x26d')](ColorManager[_0x925961('0x47f')]()),this[_0x925961('0x44c')](_0x190f51,_0xadafa1,_0xadb8dc,_0x4a9bdb,_0x925961('0x5bb')),_0x4a9bdb-=this[_0x925961('0x167')](_0x190f51)+0x6;this[_0x925961('0x3ba')]();const _0x3c94e2=this[_0x925961('0x167')](this[_0x925961('0x5f3')]?VisuMZ[_0x925961('0x75')](_0x3741c0):_0x3741c0);if(_0x3c94e2>_0x4a9bdb)this[_0x925961('0x44c')](VisuMZ[_0x925961('0x503')][_0x925961('0x4e5')][_0x925961('0x5e6')][_0x925961('0x4b3')],_0xadafa1,_0xadb8dc,_0x4a9bdb,_0x925961('0x5bb'));else{if('yQCXV'==='KiqLP'){function _0x41fb08(){const _0x505a0a=_0x925961;return _0x6f3ad2[_0x505a0a('0x503')]['Settings']['Color'][_0x505a0a('0x4ae')];}}else this[_0x925961('0x44c')](_0x3741c0,_0xadafa1,_0xadb8dc,_0x4a9bdb,_0x925961('0x5bb'));}this[_0x925961('0x348')]();},Window_Base['prototype'][_0x21bc8a('0x431')]=function(_0x16483f,_0x586f88,_0x259d3c,_0x23d2f7,_0x2ba260){const _0x584ba6=_0x21bc8a,_0x4e28da=ImageManager[_0x584ba6('0x193')](_0x584ba6('0x144')),_0x4e0a61=ImageManager[_0x584ba6('0x1d7')],_0x18db53=ImageManager[_0x584ba6('0x3c9')],_0x3bef89=_0x16483f%0x10*_0x4e0a61,_0x131ede=Math['floor'](_0x16483f/0x10)*_0x18db53,_0x3158e0=_0x23d2f7,_0xc61820=_0x23d2f7;this['contents']['_context']['imageSmoothingEnabled']=_0x2ba260,this['contents']['blt'](_0x4e28da,_0x3bef89,_0x131ede,_0x4e0a61,_0x18db53,_0x586f88,_0x259d3c,_0x3158e0,_0xc61820),this[_0x584ba6('0x227')][_0x584ba6('0x55b')][_0x584ba6('0x508')]=!![];},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x107')]=function(_0x496fba,_0x58247b,_0x3e134e,_0x12daf3,_0x3923d0,_0x2fe837){const _0x409b14=_0x21bc8a,_0xa440be=Math[_0x409b14('0x335')]((_0x3e134e-0x2)*_0x12daf3),_0x1aba6c=Sprite_Gauge['prototype'][_0x409b14('0x50a')][_0x409b14('0x312')](this),_0x55ade0=_0x58247b+this[_0x409b14('0x327')]()-_0x1aba6c-0x2;this['contents'][_0x409b14('0xd6')](_0x496fba,_0x55ade0,_0x3e134e,_0x1aba6c,ColorManager[_0x409b14('0x381')]()),this[_0x409b14('0x227')][_0x409b14('0x224')](_0x496fba+0x1,_0x55ade0+0x1,_0xa440be,_0x1aba6c-0x2,_0x3923d0,_0x2fe837);},Window_Selectable['prototype'][_0x21bc8a('0x4ee')]=function(_0x3ef19f){const _0x45f91d=_0x21bc8a;let _0x4578b0=this[_0x45f91d('0x2ea')]();const _0x4b0745=this[_0x45f91d('0x42a')](),_0x4566c9=this[_0x45f91d('0x170')]();if(this[_0x45f91d('0x4a')]()&&(_0x4578b0<_0x4b0745||_0x3ef19f&&_0x4566c9===0x1)){_0x4578b0+=_0x4566c9;if(_0x4578b0>=_0x4b0745)_0x4578b0=_0x4b0745-0x1;this[_0x45f91d('0x5c6')](_0x4578b0);}else{if(!this[_0x45f91d('0x4a')]()){if(_0x45f91d('0x17c')!==_0x45f91d('0x17c')){function _0x3fd0e8(){const _0x3250cb=_0x45f91d,_0x413400=_0x3250cb('0x4c');this[_0x3250cb('0x12')]=this[_0x3250cb('0x12')]||{};if(this['_colorCache'][_0x413400])return this[_0x3250cb('0x12')][_0x413400];const _0x4a8c87=_0x2948ff['CoreEngine'][_0x3250cb('0x4e5')][_0x3250cb('0x2aa')]['ColorPowerDown'];return this[_0x3250cb('0x2fb')](_0x413400,_0x4a8c87);}}else{if(_0x4578b0<_0x4b0745-_0x4566c9||_0x3ef19f&&_0x4566c9===0x1){if(_0x45f91d('0x10')===_0x45f91d('0x17e')){function _0xc7e90(){const _0x3b5304=_0x45f91d;return-0.5*(_0x9701c3[_0x3b5304('0xb4')](0x1-_0x33dcb9*_0x3c9812)-0x1);}}else this[_0x45f91d('0x5c6')]((_0x4578b0+_0x4566c9)%_0x4b0745);}}}}},Window_Selectable['prototype'][_0x21bc8a('0x4a')]=function(){const _0x5bd2fb=_0x21bc8a;return VisuMZ[_0x5bd2fb('0x503')]['Settings']['QoL']['ModernControls'];},VisuMZ[_0x21bc8a('0x503')]['Window_Selectable_processCursorMove']=Window_Selectable[_0x21bc8a('0x5b4')]['processCursorMove'],Window_Selectable['prototype'][_0x21bc8a('0x63d')]=function(){const _0x4e4b58=_0x21bc8a;if(this['isUseModernControls']()){if('NTxzs'==='SFBWu'){function _0x199378(){const _0x40e6ca=_0x492f;let _0x2954fa=_0x31f79d;if(_0x2954fa[0x0]==='0')return _0x2954fa;if(_0x2954fa[_0x2954fa[_0x40e6ca('0x49')]-0x1]==='.')return _0x24ed5a(_0x2954fa)['toLocaleString'](_0x2f5569,_0xe31cb5)+'.';else return _0x2954fa[_0x2954fa[_0x40e6ca('0x49')]-0x1]===','?_0x36b2ca(_0x2954fa)[_0x40e6ca('0x70')](_0x14904e,_0x138ca0)+',':_0x2a1b29(_0x2954fa)[_0x40e6ca('0x70')](_0x4eaadb,_0x40ab5a);}}else this[_0x4e4b58('0x45b')](),this[_0x4e4b58('0x36a')]();}else{if(_0x4e4b58('0xba')===_0x4e4b58('0xba'))VisuMZ[_0x4e4b58('0x503')][_0x4e4b58('0x5ae')][_0x4e4b58('0x312')](this);else{function _0xf7ded8(){const _0x3466ae=_0x4e4b58;this['_anchor']=_0x58d7a9,this['_targetAnchor']=_0xdb7625[_0x3466ae('0x2a1')](this['_anchor']);}}}},Window_Selectable['prototype']['processCursorMoveModernControls']=function(){const _0x3e6b3c=_0x21bc8a;if(this['isCursorMovable']()){if('xWiQc'!==_0x3e6b3c('0x6d')){function _0x57cedd(){const _0x57745f=_0x3e6b3c;return _0x10ff5c['layoutSettings']['ItemRect'][_0x57745f('0x312')](this);}}else{const _0x4cd363=this['index']();if(Input[_0x3e6b3c('0x5e5')](_0x3e6b3c('0xdc'))){if(_0x3e6b3c('0x635')!==_0x3e6b3c('0x635')){function _0x541d32(){const _0x1f1b86=_0x3e6b3c;_0x125b1a=_0x388aeb||0x10e,this[_0x1f1b86('0x3ba')]();if(_0x34ab1b['CoreEngine'][_0x1f1b86('0x4e5')]['UI'][_0x1f1b86('0x465')])this[_0x1f1b86('0x332')](_0x409840['nickname'](),_0x1b340e,_0x1639cd,_0x325aea);else{const _0x5a43c6=_0x9ece33[_0x1f1b86('0x10f')]()[_0x1f1b86('0x684')](/\\I\[(\d+)\]/gi,'');this[_0x1f1b86('0x44c')](_0x38b5a8[_0x1f1b86('0x10f')](),_0x5ebfc6,_0x3f7f0d,_0x2bb3ff);}}}else Input[_0x3e6b3c('0x642')](_0x3e6b3c('0x136'))?this['cursorPagedown']():this['cursorDown'](Input[_0x3e6b3c('0x624')](_0x3e6b3c('0xdc')));}if(Input[_0x3e6b3c('0x5e5')]('up')){if(Input[_0x3e6b3c('0x642')](_0x3e6b3c('0x136')))this[_0x3e6b3c('0x351')]();else{if(_0x3e6b3c('0x1f1')===_0x3e6b3c('0x5c5')){function _0x13e290(){const _0x356758=_0x3e6b3c;let _0x31b8c2=_0x45a614[_0x573018],_0x501931=this[_0x356758('0x13c')](_0x31b8c2)[_0x356758('0x65')],_0x75b93d=_0xbf5555[_0x356758('0x335')]((this['contents'][_0x356758('0x65')]-_0x501931)/0x2);this[_0x356758('0x332')](_0x31b8c2,_0x75b93d,_0x4a40a3),_0x1889ce+=this[_0x356758('0x327')]();}}else this[_0x3e6b3c('0x16e')](Input[_0x3e6b3c('0x624')]('up'));}}Input[_0x3e6b3c('0x5e5')](_0x3e6b3c('0x5bb'))&&this['cursorRight'](Input[_0x3e6b3c('0x624')](_0x3e6b3c('0x5bb')));Input[_0x3e6b3c('0x5e5')](_0x3e6b3c('0x2ff'))&&this[_0x3e6b3c('0x22a')](Input[_0x3e6b3c('0x624')](_0x3e6b3c('0x2ff')));if(!this[_0x3e6b3c('0x5d6')]('pagedown')&&Input[_0x3e6b3c('0x5e5')](_0x3e6b3c('0x1bd'))){if(_0x3e6b3c('0x39d')!==_0x3e6b3c('0x20a'))this['cursorPagedown']();else{function _0x5a698a(){const _0x4f726d=_0x3e6b3c;_0x5e6416[_0x4f726d('0x503')]['ParseEnemyNotetags']['call'](this,_0x4675df),_0x279ffb[_0x4f726d('0x68b')]=0x1;const _0x1df06f=_0x52612d[_0x4f726d('0x56')];if(_0x1df06f['match'](/<LEVEL:[ ](\d+)>/i))_0x153bd8[_0x4f726d('0x68b')]=_0x5b7d2b(_0x3e0e3e['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<MAXHP:[ ](\d+)>/i))_0x37c84b[_0x4f726d('0x4ea')][0x0]=_0x1d7091(_0x5c8432['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<MAXMP:[ ](\d+)>/i))_0x7ce409['params'][0x1]=_0x103858(_0x20eabc['$1']);if(_0x1df06f['match'](/<ATK:[ ](\d+)>/i))_0x4838da[_0x4f726d('0x4ea')][0x2]=_0x12a3a6(_0x20d32e['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<DEF:[ ](\d+)>/i))_0x2b335c[_0x4f726d('0x4ea')][0x3]=_0x5e51bf(_0x5d1e9c['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<MAT:[ ](\d+)>/i))_0x2193fc[_0x4f726d('0x4ea')][0x4]=_0x3dca55(_0x11a82e['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<MDF:[ ](\d+)>/i))_0x114b2c[_0x4f726d('0x4ea')][0x5]=_0x2ff5a4(_0x541486['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<AGI:[ ](\d+)>/i))_0x3271b1['params'][0x6]=_0x4f42c5(_0x6828b6['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<LUK:[ ](\d+)>/i))_0x4d5d11[_0x4f726d('0x4ea')][0x7]=_0xe080a7(_0x4c8f31['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<EXP:[ ](\d+)>/i))_0x122ed9[_0x4f726d('0x5ec')]=_0x11bf52(_0x5a1d48['$1']);if(_0x1df06f[_0x4f726d('0x5c9')](/<GOLD:[ ](\d+)>/i))_0x233607[_0x4f726d('0x66')]=_0x466152(_0x12f4e7['$1']);}}}if(!this['isHandled'](_0x3e6b3c('0x65b'))&&Input[_0x3e6b3c('0x5e5')](_0x3e6b3c('0x65b'))){if('xfdyn'===_0x3e6b3c('0x681')){function _0x14150a(){const _0x1b05b9=_0x3e6b3c;_0x2c523b[_0x1b05b9('0x33f')]();}}else this[_0x3e6b3c('0x351')]();}this[_0x3e6b3c('0x2ea')]()!==_0x4cd363&&this[_0x3e6b3c('0x32e')]();}}},VisuMZ[_0x21bc8a('0x503')]['Window_Selectable_cursorDown']=Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x4ee')],Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x4ee')]=function(_0x1ccc64){const _0x272a55=_0x21bc8a;if(this[_0x272a55('0x4a')]()&&_0x1ccc64&&this['maxCols']()===0x1&&this[_0x272a55('0x2ea')]()===this['maxItems']()-0x1){if(_0x272a55('0x47e')!==_0x272a55('0x47e')){function _0x443537(){const _0xcb9102=_0x272a55;_0x28d2f8[_0xcb9102('0x2ad')](),this[_0xcb9102('0x21e')]();}}else this['smoothSelect'](0x0);}else{if('ATAgG'!==_0x272a55('0x4be')){function _0x247c00(){const _0x20d24e=_0x272a55;_0x35839e=this[_0x20d24e('0x5ff')]();}}else VisuMZ[_0x272a55('0x503')]['Window_Selectable_cursorDown'][_0x272a55('0x312')](this,_0x1ccc64);}},Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x36a')]=function(){const _0x38d7d6=_0x21bc8a;if(this[_0x38d7d6('0x304')]()){const _0x5e9055=this[_0x38d7d6('0x2ea')]();Input[_0x38d7d6('0x624')](_0x38d7d6('0x40c'))&&this[_0x38d7d6('0x5c6')](Math['min'](this[_0x38d7d6('0x2ea')](),0x0)),Input[_0x38d7d6('0x624')](_0x38d7d6('0x4f6'))&&this[_0x38d7d6('0x5c6')](Math['max'](this['index'](),this[_0x38d7d6('0x42a')]()-0x1)),this[_0x38d7d6('0x2ea')]()!==_0x5e9055&&this[_0x38d7d6('0x32e')]();}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x5cf')]=Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x2b4')],Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x2b4')]=function(){const _0x3c61f6=_0x21bc8a;if(this[_0x3c61f6('0x4a')]()){if(_0x3c61f6('0x379')!=='JXeRK'){function _0x190029(){const _0x4d6bfc=_0x3c61f6;_0x285e7e[_0x4d6bfc('0x4fa')]=_0x37e549[_0x4d6bfc('0x509')](_0x28cc61(_0xbf098['$1']),_0x30a9ca[_0x4d6bfc('0x1c9')]);}}else this['processTouchModernControls']();}else VisuMZ[_0x3c61f6('0x503')][_0x3c61f6('0x5cf')][_0x3c61f6('0x312')](this);},Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x58a')]=function(){const _0x727774=_0x21bc8a;VisuMZ[_0x727774('0x503')][_0x727774('0x5cf')][_0x727774('0x312')](this);},Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x2ee')]=function(){const _0x46721e=_0x21bc8a;return VisuMZ[_0x46721e('0x503')][_0x46721e('0x4e5')]['Window'][_0x46721e('0x420')];},Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0xac')]=function(){const _0x8d2ace=_0x21bc8a;return VisuMZ[_0x8d2ace('0x503')][_0x8d2ace('0x4e5')][_0x8d2ace('0x633')][_0x8d2ace('0x5ab')];},Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x41d')]=function(){const _0x5bbd92=_0x21bc8a;return Window_Scrollable[_0x5bbd92('0x5b4')][_0x5bbd92('0x41d')]['call'](this)+VisuMZ[_0x5bbd92('0x503')][_0x5bbd92('0x4e5')][_0x5bbd92('0x633')][_0x5bbd92('0x493')];;},VisuMZ['CoreEngine'][_0x21bc8a('0x14a')]=Window_Selectable[_0x21bc8a('0x5b4')][_0x21bc8a('0x169')],Window_Selectable[_0x21bc8a('0x5b4')]['drawBackgroundRect']=function(_0x10366d){const _0x1375d0=_0x21bc8a,_0xc02aa7=VisuMZ['CoreEngine'][_0x1375d0('0x4e5')]['Window'];if(_0xc02aa7[_0x1375d0('0x1a6')]===![])return;if(_0xc02aa7['DrawItemBackgroundJS'])_0xc02aa7[_0x1375d0('0x409')][_0x1375d0('0x312')](this,_0x10366d);else{if(_0x1375d0('0xed')!==_0x1375d0('0x251'))VisuMZ[_0x1375d0('0x503')][_0x1375d0('0x14a')][_0x1375d0('0x312')](this,_0x10366d);else{function _0x420778(){const _0x23fe0b=_0x1375d0;var _0x21a0a8=_0x487999(_0x4b7c51['$1']);try{_0x3ef1ea+=_0xbf2189(_0x21a0a8);}catch(_0x1e9e93){if(_0x25948b[_0x23fe0b('0x48')]())_0x1a2a56['log'](_0x1e9e93);}}}}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x10a')]=Window_Gold[_0x21bc8a('0x5b4')][_0x21bc8a('0x645')],Window_Gold[_0x21bc8a('0x5b4')][_0x21bc8a('0x645')]=function(){const _0x51656f=_0x21bc8a;if(this[_0x51656f('0x52c')]()){if(_0x51656f('0x49c')!==_0x51656f('0x49c')){function _0x19b1ad(){const _0x404fcf=_0x51656f;if(_0x1c7639(this['_number'])[_0x404fcf('0x49')]>=this[_0x404fcf('0x14d')])return;this[_0x404fcf('0x613')]=_0x250f53(_0x593762(this[_0x404fcf('0x613')])+_0x50ca7d[_0x404fcf('0x2a5')]);const _0x370b1a='9'[_0x404fcf('0x501')](this['_maxDigits']);this[_0x404fcf('0x613')]=this[_0x404fcf('0x613')][_0x404fcf('0x184')](0x0,_0x370b1a),_0x397f6e[_0x404fcf('0x2ad')](),this['refresh'](),_0x5de17c[_0x404fcf('0x31e')](),this[_0x404fcf('0x1e6')](this['_maxDigits']-0x1);}}else this[_0x51656f('0x3cb')]();}else{if(_0x51656f('0x103')!==_0x51656f('0x265'))VisuMZ[_0x51656f('0x503')]['Window_Gold_refresh']['call'](this);else{function _0x371eaf(){const _0x290849=_0x51656f;_0x342896[_0x290849('0x503')][_0x290849('0x458')][_0x290849('0x312')](this,_0xf95df6);}}}},Window_Gold[_0x21bc8a('0x5b4')][_0x21bc8a('0x52c')]=function(){const _0x418217=_0x21bc8a;if(TextManager['currencyUnit']!==this[_0x418217('0x62e')]())return![];return VisuMZ[_0x418217('0x503')][_0x418217('0x4e5')]['Gold'][_0x418217('0x657')];},Window_Gold[_0x21bc8a('0x5b4')][_0x21bc8a('0x3cb')]=function(){const _0xe1e686=_0x21bc8a;this['resetFontSettings'](),this['contents'][_0xe1e686('0x2ad')](),this['contents']['fontSize']=VisuMZ[_0xe1e686('0x503')][_0xe1e686('0x4e5')][_0xe1e686('0x5e6')][_0xe1e686('0x46c')];const _0x29f15e=VisuMZ[_0xe1e686('0x503')][_0xe1e686('0x4e5')][_0xe1e686('0x5e6')][_0xe1e686('0x3df')],_0x5c53ca=this[_0xe1e686('0x3bb')](0x0);if(_0x29f15e>0x0){if(_0xe1e686('0x6a')===_0xe1e686('0x6a')){const _0x201b7e=_0x5c53ca['y']+(this[_0xe1e686('0x327')]()-ImageManager[_0xe1e686('0x3c9')])/0x2;this[_0xe1e686('0x3ca')](_0x29f15e,_0x5c53ca['x'],_0x201b7e);const _0x4e86c8=ImageManager['iconWidth']+0x4;_0x5c53ca['x']+=_0x4e86c8,_0x5c53ca[_0xe1e686('0x65')]-=_0x4e86c8;}else{function _0x19acf9(){const _0x5c415d=_0xe1e686;_0x31ca45[_0x5c415d('0x503')][_0x5c415d('0x4e5')][_0x5c415d('0x1a7')][_0x5c415d('0xbb')]&&(this[_0x5c415d('0x1b')]=![]);}}}this[_0xe1e686('0x26d')](ColorManager[_0xe1e686('0x47f')]()),this[_0xe1e686('0x44c')](this[_0xe1e686('0x62e')](),_0x5c53ca['x'],_0x5c53ca['y'],_0x5c53ca[_0xe1e686('0x65')],'left');const _0x455512=this['textWidth'](this[_0xe1e686('0x62e')]())+0x6;;_0x5c53ca['x']+=_0x455512,_0x5c53ca[_0xe1e686('0x65')]-=_0x455512,this[_0xe1e686('0x3ba')]();const _0x59c96f=this[_0xe1e686('0x306')](),_0x589e2d=this[_0xe1e686('0x167')](this['_digitGrouping']?VisuMZ[_0xe1e686('0x75')](this[_0xe1e686('0x306')]()):this[_0xe1e686('0x306')]());if(_0x589e2d>_0x5c53ca['width']){if('JwlRd'!==_0xe1e686('0x1e5'))this['drawText'](VisuMZ[_0xe1e686('0x503')][_0xe1e686('0x4e5')]['Gold'][_0xe1e686('0x4b3')],_0x5c53ca['x'],_0x5c53ca['y'],_0x5c53ca[_0xe1e686('0x65')],_0xe1e686('0x5bb'));else{function _0x425f5e(){const _0x4c744c=_0xe1e686;this[_0x4c744c('0x3e0')]['add'](_0x556b51[_0x30fba4])?_0x16915b[_0x4c744c('0x4d6')]():_0x2df3fc[_0x4c744c('0x497')]();}}}else{if(_0xe1e686('0x34e')===_0xe1e686('0x4d4')){function _0x552966(){return this['_hideButtons'];}}else this[_0xe1e686('0x44c')](this[_0xe1e686('0x306')](),_0x5c53ca['x'],_0x5c53ca['y'],_0x5c53ca['width'],'right');}this[_0xe1e686('0x348')]();},Window_StatusBase['prototype'][_0x21bc8a('0x29')]=function(_0x1d0a63,_0x27985d,_0x49bbe4,_0x2e93ce,_0xe32f7){const _0x43ff24=_0x21bc8a;_0x2e93ce=String(_0x2e93ce||'')[_0x43ff24('0x443')]();if(VisuMZ[_0x43ff24('0x503')][_0x43ff24('0x4e5')][_0x43ff24('0x119')][_0x43ff24('0x4b4')]){if(_0x43ff24('0x150')!==_0x43ff24('0x150')){function _0x3701bd(){const _0x2fc38a=_0x43ff24;this[_0x2fc38a('0x26d')](_0x1c7f9f[_0x2fc38a('0x47f')]()),this['drawText'](_0x448899,_0x505689,_0x26af07,_0x416d57,'right'),_0x37295c-=this[_0x2fc38a('0x167')](_0x3191af)+0x6;}}else{const _0x2a177d=VisuMZ[_0x43ff24('0x2bd')](_0x2e93ce);_0xe32f7?(this[_0x43ff24('0x431')](_0x2a177d,_0x1d0a63,_0x27985d,this[_0x43ff24('0x1f2')]()),_0x49bbe4-=this[_0x43ff24('0x1f2')]()+0x2,_0x1d0a63+=this[_0x43ff24('0x1f2')]()+0x2):(this[_0x43ff24('0x3ca')](_0x2a177d,_0x1d0a63+0x2,_0x27985d+0x2),_0x49bbe4-=ImageManager['iconWidth']+0x4,_0x1d0a63+=ImageManager[_0x43ff24('0x1d7')]+0x4);}}const _0x5ad2d4=TextManager[_0x43ff24('0xf8')](_0x2e93ce);this['resetFontSettings'](),this[_0x43ff24('0x26d')](ColorManager[_0x43ff24('0x47f')]());if(_0xe32f7){if(_0x43ff24('0x39a')==='QdIOL'){function _0x3eb608(){const _0x4e2720=_0x43ff24;this[_0x4e2720('0x31f')][_0x4e2720('0x2dc')](_0x3bdd69[_0x4e2720('0x31c')][_0x4e2720('0x73')]);}}else this[_0x43ff24('0x227')][_0x43ff24('0x41a')]=this[_0x43ff24('0x3a')](),this[_0x43ff24('0x227')][_0x43ff24('0x44c')](_0x5ad2d4,_0x1d0a63,_0x27985d,_0x49bbe4,this['gaugeLineHeight'](),_0x43ff24('0x2ff'));}else{if(_0x43ff24('0x168')==='DYTqq'){function _0x18be00(){const _0x3a5b23=_0x43ff24,_0xdad61c=_0x14052e['encounterStep']();this[_0x3a5b23('0x2b7')]=_0x42d7a5['randomInt'](_0xdad61c)+_0x391183[_0x3a5b23('0x53')](_0xdad61c)+this['encounterStepsMinimum']();}}else this[_0x43ff24('0x44c')](_0x5ad2d4,_0x1d0a63,_0x27985d,_0x49bbe4);}this[_0x43ff24('0x348')]();},Window_StatusBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x3a')]=function(){const _0xa32759=_0x21bc8a;return $gameSystem[_0xa32759('0x26')]()-0x8;},Window_StatusBase['prototype'][_0x21bc8a('0x15d')]=function(_0x2bb2c9,_0x195cae,_0x130948,_0x5e4f89){const _0x34bca6=_0x21bc8a;_0x5e4f89=_0x5e4f89||0xa8,this[_0x34bca6('0x3ba')]();if(VisuMZ[_0x34bca6('0x503')][_0x34bca6('0x4e5')]['UI']['TextCodeClassNames']){if(_0x34bca6('0x164')==='XqrDY')this['drawTextEx'](_0x2bb2c9['currentClass']()[_0x34bca6('0x5e4')],_0x195cae,_0x130948,_0x5e4f89);else{function _0x52628f(){const _0xa924ac=_0x34bca6;_0x13702d[_0xa924ac('0x503')]['Game_Action_updateLastTarget'][_0xa924ac('0x312')](this,_0x65ba62);if(_0x4e5c84[_0xa924ac('0x503')]['Settings'][_0xa924ac('0x1a7')][_0xa924ac('0x507')])return;const _0x5de0fc=_0x59774d['result']();_0x5de0fc[_0xa924ac('0x43f')]&&(0x1-this['itemEva'](_0x587923)>this[_0xa924ac('0x51a')](_0x1e6b94)&&(_0x5de0fc[_0xa924ac('0x43f')]=![],_0x5de0fc['evaded']=!![]));}}}else{const _0x378113=_0x2bb2c9['currentClass']()[_0x34bca6('0x5e4')][_0x34bca6('0x684')](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x378113,_0x195cae,_0x130948,_0x5e4f89);}},Window_StatusBase['prototype']['drawActorNickname']=function(_0x2752c6,_0x20362b,_0x1094f2,_0x16d714){const _0x11bb55=_0x21bc8a;_0x16d714=_0x16d714||0x10e,this[_0x11bb55('0x3ba')]();if(VisuMZ[_0x11bb55('0x503')][_0x11bb55('0x4e5')]['UI']['TextCodeNicknames']){if(_0x11bb55('0x197')!=='HRKmN'){function _0x466eab(){const _0x4c529b=_0x11bb55;return _0x118f02[_0x4c529b('0x503')][_0x4c529b('0x4e5')][_0x4c529b('0x5e6')][_0x4c529b('0x674')];}}else this[_0x11bb55('0x332')](_0x2752c6[_0x11bb55('0x10f')](),_0x20362b,_0x1094f2,_0x16d714);}else{const _0x5067e5=_0x2752c6[_0x11bb55('0x10f')]()[_0x11bb55('0x684')](/\\I\[(\d+)\]/gi,'');this[_0x11bb55('0x44c')](_0x2752c6[_0x11bb55('0x10f')](),_0x20362b,_0x1094f2,_0x16d714);}},VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x13f')],Window_StatusBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x13f')]=function(_0x49501,_0xd0472e,_0x1eede3){const _0x31493c=_0x21bc8a;if(this[_0x31493c('0x135')]())this[_0x31493c('0xbe')](_0x49501,_0xd0472e,_0x1eede3);VisuMZ[_0x31493c('0x503')][_0x31493c('0xc8')][_0x31493c('0x312')](this,_0x49501,_0xd0472e,_0x1eede3);},Window_StatusBase[_0x21bc8a('0x5b4')][_0x21bc8a('0x135')]=function(){const _0x33991f=_0x21bc8a;return VisuMZ[_0x33991f('0x503')][_0x33991f('0x4e5')]['UI']['LvExpGauge'];},Window_StatusBase[_0x21bc8a('0x5b4')]['drawActorExpGauge']=function(_0x5a02e2,_0x1c442e,_0x3a1a19){const _0x43a2d1=_0x21bc8a;if(!_0x5a02e2)return;if(!_0x5a02e2['isActor']())return;const _0x1625b4=0x80,_0x495668=_0x5a02e2['expRate']();let _0x1c583f=ColorManager[_0x43a2d1('0x540')](),_0x3b2375=ColorManager[_0x43a2d1('0xcc')]();if(_0x495668>=0x1){if('YXVTD'!==_0x43a2d1('0x654'))_0x1c583f=ColorManager[_0x43a2d1('0xff')](),_0x3b2375=ColorManager['maxLvGaugeColor2']();else{function _0x576a5a(){const _0x1f59e6=_0x43a2d1,_0x5b629b=_0x20caf8(_0x5909ef['$1']);if(_0x5b629b[_0x1f59e6('0x5c9')](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x1f59e6('0x678')]='FV';else _0x5b629b[_0x1f59e6('0x5c9')](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x1f59e6('0x678')]='SV');}}}this[_0x43a2d1('0x107')](_0x1c442e,_0x3a1a19,_0x1625b4,_0x495668,_0x1c583f,_0x3b2375);},Window_EquipStatus['prototype']['drawAllParams']=function(){const _0x30642b=_0x21bc8a;let _0x4ad61e=0x0;for(const _0x4d9299 of VisuMZ[_0x30642b('0x503')][_0x30642b('0x4e5')][_0x30642b('0x119')][_0x30642b('0x1c6')]){if(_0x30642b('0x67b')===_0x30642b('0x52e')){function _0x5805b7(){const _0x31ebe3=_0x30642b;_0x3e0d5b[_0x31ebe3('0x4d6')]();if(!_0x1d257[_0x31ebe3('0x55e')]()){const _0x1a2e16=_0x4c9d6d[_0x31ebe3('0x33')](_0x54ea70,_0x31ebe3('0x3eb'));}else{const _0x1d3a34=_0x27f3b0['platform']==_0x31ebe3('0x59c')?_0x31ebe3('0x33'):_0x15c9f9[_0x31ebe3('0x60a')]==_0x31ebe3('0x452')?_0x31ebe3('0x16a'):_0x31ebe3('0x6');_0x2ffa0b(_0x31ebe3('0x320'))[_0x31ebe3('0x45c')](_0x1d3a34+'\x20'+_0x28157f);}}}else{const _0x1a7723=this[_0x30642b('0x372')](),_0x34f588=this[_0x30642b('0x5e0')](_0x4ad61e);this['drawItem'](_0x1a7723,_0x34f588,_0x4d9299),_0x4ad61e++;}}},Window_EquipStatus[_0x21bc8a('0x5b4')][_0x21bc8a('0x4a8')]=function(_0x39be06,_0x210655,_0x49657d){const _0x2bdeda=_0x21bc8a,_0x2cd402=this[_0x2bdeda('0x211')]()-this['itemPadding']()*0x2;this[_0x2bdeda('0x29')](_0x39be06,_0x210655,_0x2cd402,_0x49657d,![]);},Window_EquipStatus[_0x21bc8a('0x5b4')][_0x21bc8a('0x63f')]=function(_0xe602a5,_0x5bba7a,_0x1d342f){const _0x5a5cbe=_0x21bc8a,_0x1e4e10=this['paramWidth']();this['resetTextColor'](),this[_0x5a5cbe('0x44c')](this['_actor'][_0x5a5cbe('0x301')](_0x1d342f,!![]),_0xe602a5,_0x5bba7a,_0x1e4e10,_0x5a5cbe('0x5bb'));},Window_EquipStatus['prototype'][_0x21bc8a('0x3b1')]=function(_0xdc9083,_0x396629){const _0x6f4801=_0x21bc8a,_0x73c44d=this[_0x6f4801('0x277')]();this[_0x6f4801('0x26d')](ColorManager['systemColor']());const _0x2ee9c7=VisuMZ[_0x6f4801('0x503')][_0x6f4801('0x4e5')]['UI'][_0x6f4801('0x267')];this[_0x6f4801('0x44c')](_0x2ee9c7,_0xdc9083,_0x396629,_0x73c44d,'center');},Window_EquipStatus['prototype']['drawNewParam']=function(_0x214e77,_0x13d597,_0x1ef2f0){const _0x5df70b=_0x21bc8a,_0x5aad3f=this['paramWidth'](),_0x5653f3=this[_0x5df70b('0xd5')]['paramValueByName'](_0x1ef2f0),_0x546d68=_0x5653f3-this[_0x5df70b('0x59')][_0x5df70b('0x301')](_0x1ef2f0);this[_0x5df70b('0x26d')](ColorManager[_0x5df70b('0x4f')](_0x546d68)),this['drawText'](VisuMZ['ConvertNumberToString'](_0x5653f3,0x0),_0x214e77,_0x13d597,_0x5aad3f,_0x5df70b('0x5bb'));},Window_StatusParams[_0x21bc8a('0x5b4')][_0x21bc8a('0x42a')]=function(){const _0x2951e8=_0x21bc8a;return VisuMZ['CoreEngine'][_0x2951e8('0x4e5')]['Param'][_0x2951e8('0x1c6')][_0x2951e8('0x49')];},Window_StatusParams['prototype'][_0x21bc8a('0x142')]=function(_0x4ace4c){const _0x515889=_0x21bc8a,_0x3d1f0f=this[_0x515889('0x3bb')](_0x4ace4c),_0x13db13=VisuMZ['CoreEngine'][_0x515889('0x4e5')][_0x515889('0x119')][_0x515889('0x1c6')][_0x4ace4c],_0x513632=TextManager[_0x515889('0xf8')](_0x13db13),_0x238cd7=this['_actor'][_0x515889('0x301')](_0x13db13,!![]);this[_0x515889('0x29')](_0x3d1f0f['x'],_0x3d1f0f['y'],0xa0,_0x13db13,![]),this['resetTextColor'](),this[_0x515889('0x44c')](_0x238cd7,_0x3d1f0f['x']+0xa0,_0x3d1f0f['y'],0x3c,'right');};if(VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x2f7')]['EnableNameInput']){VisuMZ[_0x21bc8a('0x503')]['Settings']['KeyboardInput'][_0x21bc8a('0x485')]&&(Window_NameInput[_0x21bc8a('0x3d1')]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x21bc8a('0x222'),'OK']);;VisuMZ[_0x21bc8a('0x503')]['Window_NameInput_initialize']=Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')],Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x57f')]=function(_0x329c7f){const _0x503a03=_0x21bc8a;this[_0x503a03('0xf4')]=_0x503a03('0xb6'),VisuMZ[_0x503a03('0x503')][_0x503a03('0x1b9')][_0x503a03('0x312')](this,_0x329c7f),Input[_0x503a03('0x2ad')](),this['deselect']();},VisuMZ['CoreEngine'][_0x21bc8a('0x141')]=Window_NameInput['prototype'][_0x21bc8a('0x48d')],Window_NameInput[_0x21bc8a('0x5b4')]['processHandling']=function(){const _0x2ba465=_0x21bc8a;if(!this['isOpen']())return;if(!this[_0x2ba465('0x425')])return;if(Input[_0x2ba465('0x8a')](_0x2ba465('0x18e'))){if(_0x2ba465('0x490')===_0x2ba465('0x481')){function _0x402a45(){const _0x5f9f89=_0x2ba465;return _0x418680?_0x5d8322(_0x5737bb[_0x5f9f89('0x23d')](_0x36baa4*0x64))+'%':_0xb55590;}}else Input[_0x2ba465('0x2ad')](),this[_0x2ba465('0x21e')]();}else{if(this[_0x2ba465('0xf4')]===_0x2ba465('0xb6'))this['processKeyboardHandling']();else{if(Input[_0x2ba465('0x8a')](_0x2ba465('0x2f0')))Input['clear'](),this['switchModes']('keyboard');else{if('xrDOT'==='xrDOT')VisuMZ['CoreEngine'][_0x2ba465('0x141')]['call'](this);else{function _0xeb4d0e(){const _0x2c70e3=_0x2ba465;return _0x28cc28[_0x2c70e3('0x503')]['Settings']['UI']['FadeSpeed'];}}}}}},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x7c')]=Window_NameInput['prototype'][_0x21bc8a('0x2b4')],Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x2b4')]=function(){const _0x607a10=_0x21bc8a;if(!this['isOpenAndActive']())return;if(this[_0x607a10('0xf4')]==='keyboard'){if(_0x607a10('0x556')===_0x607a10('0x36')){function _0x8368d4(){const _0x30bb40=_0x607a10;this['_itemWindow'][_0x30bb40('0x2dc')](_0x1ed343['layoutSettings'][_0x30bb40('0x40')]);}}else{if(TouchInput[_0x607a10('0x624')]()&&this[_0x607a10('0x3f7')]())this[_0x607a10('0x1bb')](_0x607a10('0x2d8'));else TouchInput[_0x607a10('0x610')]()&&this[_0x607a10('0x1bb')](_0x607a10('0x2d8'));}}else VisuMZ[_0x607a10('0x503')][_0x607a10('0x7c')][_0x607a10('0x312')](this);},Window_NameInput[_0x21bc8a('0x5b4')]['processKeyboardHandling']=function(){const _0x491189=_0x21bc8a;if(Input[_0x491189('0x8a')](_0x491189('0x328')))this[_0x491189('0x424')]();else{if(Input[_0x491189('0x2a5')]!==undefined){let _0xc1ad8c=Input[_0x491189('0x2a5')],_0x285f01=_0xc1ad8c[_0x491189('0x49')];for(let _0x5f138d=0x0;_0x5f138d<_0x285f01;++_0x5f138d){if(_0x491189('0x4cd')!==_0x491189('0x5d4'))this[_0x491189('0x3e0')]['add'](_0xc1ad8c[_0x5f138d])?SoundManager[_0x491189('0x4d6')]():SoundManager[_0x491189('0x497')]();else{function _0x12d6cc(){return _0x12f14b;}}}Input['clear']();}}},Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x1bb')]=function(_0x34074d){const _0x44e782=_0x21bc8a;let _0x109a8a=this['_mode'];this[_0x44e782('0xf4')]=_0x34074d;if(_0x109a8a!==this[_0x44e782('0xf4')]){if(_0x44e782('0x61')!==_0x44e782('0x573'))this[_0x44e782('0x645')](),SoundManager['playOk'](),this['_mode']===_0x44e782('0x2d8')?this[_0x44e782('0x1e6')](0x0):this[_0x44e782('0x1e6')](-0x1);else{function _0x21002a(){const _0x26f9e3=_0x44e782;_0xc96e46[_0x26f9e3('0x238')](_0x1e504f,_0x45c652);const _0x5b4bf1=_0x47d1ec[_0x26f9e3('0x113')]||0x1,_0x5194ca=_0x130291[_0x26f9e3('0x414')]||_0x26f9e3('0x59a'),_0x27bc05=_0x204df0[_0x26f9e3('0x514')](_0x5b4bf1);_0x27bc05&&_0x27bc05[_0x26f9e3('0x46d')](_0x5194ca);}}}},VisuMZ[_0x21bc8a('0x503')]['Window_NameInput_cursorDown']=Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x4ee')],Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x4ee')]=function(_0x5d0ffe){const _0x51b8ae=_0x21bc8a;if(this['_mode']===_0x51b8ae('0xb6')&&!Input[_0x51b8ae('0x552')]())return;if(Input[_0x51b8ae('0x6e')]())return;VisuMZ['CoreEngine'][_0x51b8ae('0x47b')][_0x51b8ae('0x312')](this,_0x5d0ffe),this[_0x51b8ae('0x1bb')](_0x51b8ae('0x2d8'));},VisuMZ['CoreEngine'][_0x21bc8a('0x337')]=Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x16e')],Window_NameInput['prototype']['cursorUp']=function(_0x1aaeb0){const _0x1f46f2=_0x21bc8a;if(this[_0x1f46f2('0xf4')]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x1f46f2('0x6e')]())return;VisuMZ[_0x1f46f2('0x503')][_0x1f46f2('0x337')][_0x1f46f2('0x312')](this,_0x1aaeb0),this[_0x1f46f2('0x1bb')](_0x1f46f2('0x2d8'));},VisuMZ[_0x21bc8a('0x503')]['Window_NameInput_cursorRight']=Window_NameInput['prototype'][_0x21bc8a('0x14f')],Window_NameInput['prototype'][_0x21bc8a('0x14f')]=function(_0x331e93){const _0xd29636=_0x21bc8a;if(this[_0xd29636('0xf4')]===_0xd29636('0xb6')&&!Input['isArrowPressed']())return;if(Input[_0xd29636('0x6e')]())return;VisuMZ['CoreEngine'][_0xd29636('0xa5')][_0xd29636('0x312')](this,_0x331e93),this['switchModes']('default');},VisuMZ['CoreEngine']['Window_NameInput_cursorLeft']=Window_NameInput['prototype'][_0x21bc8a('0x22a')],Window_NameInput['prototype'][_0x21bc8a('0x22a')]=function(_0x368bb8){const _0x57d063=_0x21bc8a;if(this[_0x57d063('0xf4')]==='keyboard'&&!Input[_0x57d063('0x552')]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x57d063('0x503')][_0x57d063('0x55')][_0x57d063('0x312')](this,_0x368bb8),this[_0x57d063('0x1bb')](_0x57d063('0x2d8'));},VisuMZ[_0x21bc8a('0x503')]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x21bc8a('0x5b4')]['cursorPagedown'],Window_NameInput['prototype'][_0x21bc8a('0x0')]=function(){const _0x72e27d=_0x21bc8a;if(this[_0x72e27d('0xf4')]==='keyboard')return;if(Input[_0x72e27d('0x6e')]())return;VisuMZ['CoreEngine'][_0x72e27d('0x203')][_0x72e27d('0x312')](this),this['switchModes'](_0x72e27d('0x2d8'));},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e')]=Window_NameInput[_0x21bc8a('0x5b4')]['cursorPageup'],Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x351')]=function(){const _0x3e591a=_0x21bc8a;if(this[_0x3e591a('0xf4')]==='keyboard')return;if(Input['isNumpadPressed']())return;VisuMZ[_0x3e591a('0x503')][_0x3e591a('0x4e')]['call'](this),this[_0x3e591a('0x1bb')](_0x3e591a('0x2d8'));},VisuMZ['CoreEngine'][_0x21bc8a('0x2f1')]=Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x645')],Window_NameInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x645')]=function(){const _0x275548=_0x21bc8a;if(this[_0x275548('0xf4')]===_0x275548('0xb6')){if('Bxbld'!==_0x275548('0x244')){this[_0x275548('0x227')][_0x275548('0x2ad')](),this[_0x275548('0xc0')]['clear'](),this[_0x275548('0x3ba')]();let _0x55728a=VisuMZ[_0x275548('0x503')][_0x275548('0x4e5')][_0x275548('0x2f7')][_0x275548('0x52')][_0x275548('0x15e')]('\x0a'),_0x40e38b=_0x55728a[_0x275548('0x49')],_0x185d04=(this[_0x275548('0x604')]-_0x40e38b*this['lineHeight']())/0x2;for(let _0x8f24a3=0x0;_0x8f24a3<_0x40e38b;++_0x8f24a3){let _0x39adf4=_0x55728a[_0x8f24a3],_0xafe685=this[_0x275548('0x13c')](_0x39adf4)['width'],_0x36784=Math[_0x275548('0x335')]((this[_0x275548('0x227')][_0x275548('0x65')]-_0xafe685)/0x2);this['drawTextEx'](_0x39adf4,_0x36784,_0x185d04),_0x185d04+=this[_0x275548('0x327')]();}}else{function _0xd6316e(){const _0x24312a=_0x275548;if(!_0x582483['CoreEngine'][_0x24312a('0x4e5')][_0x24312a('0x1a7')][_0x24312a('0x28f')])return;this[_0x24312a('0x310')]['x']!==0x0&&(this[_0x24312a('0x3bd')][_0x24312a('0x310')]['x']=0x1/this[_0x24312a('0x310')]['x'],this[_0x24312a('0x3bd')]['x']=-(this['x']/this[_0x24312a('0x310')]['x'])),this[_0x24312a('0x310')]['y']!==0x0&&(this[_0x24312a('0x3bd')][_0x24312a('0x310')]['y']=0x1/this['scale']['y'],this[_0x24312a('0x3bd')]['y']=-(this['y']/this['scale']['y']));}}}else VisuMZ[_0x275548('0x503')][_0x275548('0x2f1')]['call'](this);};};VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0xb5')]=Window_ShopSell[_0x21bc8a('0x5b4')][_0x21bc8a('0x2be')],Window_ShopSell[_0x21bc8a('0x5b4')]['isEnabled']=function(_0x1ec12c){const _0x587790=_0x21bc8a;return VisuMZ['CoreEngine'][_0x587790('0x4e5')]['QoL'][_0x587790('0x60c')]&&DataManager[_0x587790('0x539')](_0x1ec12c)?![]:VisuMZ[_0x587790('0x503')]['Window_ShopSell_isEnabled'][_0x587790('0x312')](this,_0x1ec12c);},Window_NumberInput['prototype'][_0x21bc8a('0x4a')]=function(){return![];};VisuMZ[_0x21bc8a('0x503')]['Settings'][_0x21bc8a('0x2f7')]['EnableNumberInput']&&(VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x2ba')]=Window_NumberInput[_0x21bc8a('0x5b4')]['start'],Window_NumberInput[_0x21bc8a('0x5b4')]['start']=function(){const _0x3d38cc=_0x21bc8a;VisuMZ['CoreEngine'][_0x3d38cc('0x2ba')][_0x3d38cc('0x312')](this),this[_0x3d38cc('0x1e6')](this[_0x3d38cc('0x14d')]-0x1);},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x67d')]=Window_NumberInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x3fd')],Window_NumberInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x3fd')]=function(){const _0x20837c=_0x21bc8a;if(!this[_0x20837c('0x618')]())return;if(Input[_0x20837c('0x6e')]())this[_0x20837c('0x614')]();else{if(Input[_0x20837c('0x8a')](_0x20837c('0x18e')))this['processKeyboardBackspace']();else{if(Input[_0x20837c('0x1cd')]===0x2e)this[_0x20837c('0x3fa')]();else{if(Input[_0x20837c('0x1cd')]===0x24){if(_0x20837c('0x680')===_0x20837c('0x680'))this['processKeyboardHome']();else{function _0x78364e(){const _0x2dda70=_0x20837c;_0x45560c=_0x2ecd0a[_0x2dda70('0x2a1')](_0x7a809c),_0xe94a97['se'][_0x2dda70('0x586')]=0x0;}}}else Input[_0x20837c('0x1cd')]===0x23?this['processKeyboardEnd']():(VisuMZ[_0x20837c('0x503')][_0x20837c('0x67d')][_0x20837c('0x312')](this),Input[_0x20837c('0x2ad')]());}}}},Window_NumberInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x63d')]=function(){const _0xa8062e=_0x21bc8a;if(!this[_0xa8062e('0x304')]())return;if(Input[_0xa8062e('0x6e')]()){if(_0xa8062e('0x413')!=='pPGoF'){function _0x11e0a1(){const _0x52f3e3=_0xa8062e;_0x93f974['CoreEngine'][_0x52f3e3('0x3cc')][_0x52f3e3('0x312')](this),this[_0x52f3e3('0x416')]=[];}}else this['processKeyboardDigitChange']();}else Window_Selectable[_0xa8062e('0x5b4')][_0xa8062e('0x63d')][_0xa8062e('0x312')](this);},Window_NumberInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x36a')]=function(){},Window_NumberInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x614')]=function(){const _0x514409=_0x21bc8a;if(String(this[_0x514409('0x613')])[_0x514409('0x49')]>=this[_0x514409('0x14d')])return;this[_0x514409('0x613')]=Number(String(this['_number'])+Input[_0x514409('0x2a5')]);const _0xf058b8='9'[_0x514409('0x501')](this[_0x514409('0x14d')]);this[_0x514409('0x613')]=this['_number'][_0x514409('0x184')](0x0,_0xf058b8),Input['clear'](),this[_0x514409('0x645')](),SoundManager[_0x514409('0x31e')](),this[_0x514409('0x1e6')](this[_0x514409('0x14d')]-0x1);},Window_NumberInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x620')]=function(){const _0x4b4414=_0x21bc8a;this[_0x4b4414('0x613')]=Number(String(this[_0x4b4414('0x613')])[_0x4b4414('0x23f')](0x0,-0x1)),this[_0x4b4414('0x613')]=Math['max'](0x0,this[_0x4b4414('0x613')]),Input['clear'](),this['refresh'](),SoundManager[_0x4b4414('0x31e')](),this['select'](this[_0x4b4414('0x14d')]-0x1);},Window_NumberInput[_0x21bc8a('0x5b4')][_0x21bc8a('0x3fa')]=function(){const _0x17e732=_0x21bc8a;this[_0x17e732('0x613')]=Number(String(this[_0x17e732('0x613')])['substring'](0x1)),this[_0x17e732('0x613')]=Math[_0x17e732('0x19b')](0x0,this[_0x17e732('0x613')]),Input[_0x17e732('0x2ad')](),this['refresh'](),SoundManager[_0x17e732('0x31e')](),this['select'](this[_0x17e732('0x14d')]-0x1);});;Window_TitleCommand[_0x21bc8a('0x2d6')]=VisuMZ['CoreEngine'][_0x21bc8a('0x4e5')][_0x21bc8a('0x516')],Window_TitleCommand['prototype'][_0x21bc8a('0x248')]=function(){const _0x2f66b5=_0x21bc8a;this[_0x2f66b5('0x41e')]();},Window_TitleCommand[_0x21bc8a('0x5b4')][_0x21bc8a('0x41e')]=function(){const _0x5d9b18=_0x21bc8a;for(const _0x36a293 of Window_TitleCommand[_0x5d9b18('0x2d6')]){if(_0x5d9b18('0x8f')===_0x5d9b18('0x589')){function _0x34257c(){const _0x3ddc62=_0x5d9b18,_0x9d1efb=_0x18ff8d[_0x3ddc62('0x100')]()[_0x3ddc62('0x5e4')][_0x3ddc62('0x684')](/\\I\[(\d+)\]/gi,'');this[_0x3ddc62('0x44c')](_0x9d1efb,_0x21b04e,_0x452a70,_0x47774c);}}else{if(_0x36a293[_0x5d9b18('0x685')][_0x5d9b18('0x312')](this)){if('csnDk'!==_0x5d9b18('0x23')){function _0x572985(){const _0x38ae11=_0x5d9b18;this[_0x38ae11('0x648')]+=this[_0x38ae11('0x3b4')](),this[_0x38ae11('0x55a')]()&&(this[_0x38ae11('0x45')]=![]);}}else{const _0x143e1b=_0x36a293[_0x5d9b18('0x403')];let _0x12590e=_0x36a293[_0x5d9b18('0x483')];if(['',_0x5d9b18('0x254')]['includes'](_0x12590e))_0x12590e=_0x36a293[_0x5d9b18('0x36b')][_0x5d9b18('0x312')](this);const _0x3bb60e=_0x36a293[_0x5d9b18('0x566')][_0x5d9b18('0x312')](this),_0x6f8559=_0x36a293['ExtJS'][_0x5d9b18('0x312')](this);this[_0x5d9b18('0x198')](_0x12590e,_0x143e1b,_0x3bb60e,_0x6f8559),this[_0x5d9b18('0x3f8')](_0x143e1b,_0x36a293[_0x5d9b18('0x542')][_0x5d9b18('0x608')](this,_0x6f8559));}}}}},Window_GameEnd[_0x21bc8a('0x2d6')]=VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x4e5')][_0x21bc8a('0x27')][_0x21bc8a('0x578')]['CommandList'],Window_GameEnd[_0x21bc8a('0x5b4')][_0x21bc8a('0x248')]=function(){const _0x50af89=_0x21bc8a;this[_0x50af89('0x41e')]();},Window_GameEnd[_0x21bc8a('0x5b4')][_0x21bc8a('0x41e')]=function(){const _0x378a47=_0x21bc8a;for(const _0xf86852 of Window_GameEnd[_0x378a47('0x2d6')]){if(_0xf86852[_0x378a47('0x685')]['call'](this)){const _0x439e91=_0xf86852[_0x378a47('0x403')];let _0x40fb43=_0xf86852[_0x378a47('0x483')];if(['',_0x378a47('0x254')][_0x378a47('0x666')](_0x40fb43))_0x40fb43=_0xf86852[_0x378a47('0x36b')][_0x378a47('0x312')](this);const _0x5bf6dc=_0xf86852[_0x378a47('0x566')][_0x378a47('0x312')](this),_0xf4a984=_0xf86852[_0x378a47('0x5f0')][_0x378a47('0x312')](this);this[_0x378a47('0x198')](_0x40fb43,_0x439e91,_0x5bf6dc,_0xf4a984),this[_0x378a47('0x3f8')](_0x439e91,_0xf86852['CallHandlerJS'][_0x378a47('0x608')](this,_0xf4a984));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x21bc8a('0x5b4')]=Object[_0x21bc8a('0x35c')](Window_Base['prototype']),Window_ButtonAssist[_0x21bc8a('0x5b4')][_0x21bc8a('0x29f')]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x21bc8a('0x57f')]=function(_0x58e8af){const _0x562745=_0x21bc8a;this[_0x562745('0x9c')]={},Window_Base[_0x562745('0x5b4')][_0x562745('0x57f')]['call'](this,_0x58e8af),this[_0x562745('0x2dc')](VisuMZ['CoreEngine'][_0x562745('0x4e5')][_0x562745('0x17')][_0x562745('0x2f9')]||0x0),this[_0x562745('0x645')]();},Window_ButtonAssist['prototype'][_0x21bc8a('0xa7')]=function(){const _0x2c528e=_0x21bc8a;if(this[_0x2c528e('0x227')]['fontSize']<=0x60){if(_0x2c528e('0x232')===_0x2c528e('0x232'))this[_0x2c528e('0x227')][_0x2c528e('0x41a')]+=0x6;else{function _0x8811d7(){const _0x4987a6=_0x2c528e;this[_0x4987a6('0x395')]=![],this[_0x4987a6('0x45e')]=![];}}}},Window_ButtonAssist[_0x21bc8a('0x5b4')][_0x21bc8a('0x5fb')]=function(){const _0x549d37=_0x21bc8a;if(this[_0x549d37('0x227')][_0x549d37('0x41a')]>=0x18){if('OZPaU'!==_0x549d37('0x440')){function _0x4f4fa5(){const _0x5b90ca=_0x549d37;this[_0x5b90ca('0x3ca')](_0x13a360,_0x469a34+0x2,_0x3c8e57+0x2),_0x503141-=_0x2e846c[_0x5b90ca('0x1d7')]+0x4,_0x1a3819+=_0x5be688['iconWidth']+0x4;}}else this[_0x549d37('0x227')]['fontSize']-=0x6;}},Window_ButtonAssist[_0x21bc8a('0x5b4')][_0x21bc8a('0x5bd')]=function(){const _0x4c7433=_0x21bc8a;Window_Base[_0x4c7433('0x5b4')]['update'][_0x4c7433('0x312')](this),this[_0x4c7433('0x581')]();},Window_ButtonAssist[_0x21bc8a('0x5b4')][_0x21bc8a('0x137')]=function(){const _0x14fa2f=_0x21bc8a;this[_0x14fa2f('0x2c6')]=SceneManager[_0x14fa2f('0x4a0')][_0x14fa2f('0x518')]()!==_0x14fa2f('0x50d')?0x0:0x8;},Window_ButtonAssist['prototype'][_0x21bc8a('0x581')]=function(){const _0x103d5b=_0x21bc8a,_0x44e8bc=SceneManager['_scene'];for(let _0x591af6=0x1;_0x591af6<=0x5;_0x591af6++){if(_0x103d5b('0x46e')!=='EUtaL'){if(this[_0x103d5b('0x9c')][_0x103d5b('0x22f')[_0x103d5b('0x2c1')](_0x591af6)]!==_0x44e8bc['buttonAssistKey%1'[_0x103d5b('0x2c1')](_0x591af6)]()){if(_0x103d5b('0x33d')!==_0x103d5b('0x33d')){function _0x2e85c3(){const _0xf599e3=_0x103d5b,_0x208889=_0xfa8f3[_0xf599e3('0x600')],_0x36a831=_0x2d456e['prototype'][_0xf599e3('0x327')](),_0xa7ca15=0x0;let _0x5eb7f2=0x0;return this[_0xf599e3('0x518')]()===_0xf599e3('0x272')?_0x5eb7f2=0x0:_0x5eb7f2=_0x5f24b1[_0xf599e3('0x2d3')]-_0x36a831,new _0x45ef87(_0xa7ca15,_0x5eb7f2,_0x208889,_0x36a831);}}else return this[_0x103d5b('0x645')]();}if(this[_0x103d5b('0x9c')][_0x103d5b('0x23e')[_0x103d5b('0x2c1')](_0x591af6)]!==_0x44e8bc[_0x103d5b('0xf1')['format'](_0x591af6)]()){if(_0x103d5b('0x5c7')!=='HGnsp'){function _0x4c2a51(){const _0x3a3ff6=_0x103d5b;this['_dummyWindow'][_0x3a3ff6('0x2dc')](_0x496423['layoutSettings'][_0x3a3ff6('0xa3')]);}}else return this['refresh']();}}else{function _0x30ecef(){const _0x29a16f=_0x103d5b;this[_0x29a16f('0x5a')]+=this['visible']?this[_0x29a16f('0x60')]():-0x1*this[_0x29a16f('0x60')](),this['opacity']=_0x1a5881[_0x29a16f('0x509')](0xc0,this[_0x29a16f('0x5a')]);}}}},Window_ButtonAssist[_0x21bc8a('0x5b4')]['refresh']=function(){const _0x48bab8=_0x21bc8a;this['contents']['clear']();for(let _0x21b2d8=0x1;_0x21b2d8<=0x5;_0x21b2d8++){this[_0x48bab8('0x3de')](_0x21b2d8);}},Window_ButtonAssist['prototype'][_0x21bc8a('0x3de')]=function(_0x1fa523){const _0x33d0e6=_0x21bc8a,_0x263f91=this[_0x33d0e6('0x3e2')]/0x5,_0x40ba58=SceneManager[_0x33d0e6('0x4a0')],_0x24dac8=_0x40ba58[_0x33d0e6('0x241')[_0x33d0e6('0x2c1')](_0x1fa523)](),_0x28e4a4=_0x40ba58[_0x33d0e6('0xf1')[_0x33d0e6('0x2c1')](_0x1fa523)]();this[_0x33d0e6('0x9c')][_0x33d0e6('0x22f')['format'](_0x1fa523)]=_0x24dac8,this[_0x33d0e6('0x9c')]['text%1'[_0x33d0e6('0x2c1')](_0x1fa523)]=_0x28e4a4;if(_0x24dac8==='')return;if(_0x28e4a4==='')return;const _0x32b7a3=_0x40ba58[_0x33d0e6('0x18b')[_0x33d0e6('0x2c1')](_0x1fa523)](),_0x270fbf=this[_0x33d0e6('0x372')](),_0x427689=_0x263f91*(_0x1fa523-0x1)+_0x270fbf+_0x32b7a3,_0x2c083c=VisuMZ[_0x33d0e6('0x503')][_0x33d0e6('0x4e5')][_0x33d0e6('0x17')][_0x33d0e6('0x5e9')];this['drawTextEx'](_0x2c083c['format'](_0x24dac8,_0x28e4a4),_0x427689,0x0,_0x263f91-_0x270fbf*0x2);},VisuMZ[_0x21bc8a('0x1ad')]=function(_0x3f08f8){const _0x2606e6=_0x21bc8a;if(Utils[_0x2606e6('0x49d')](_0x2606e6('0x27e'))){var _0x113f44=require(_0x2606e6('0x4de'))[_0x2606e6('0x633')][_0x2606e6('0x628')]();SceneManager['showDevTools']();if(_0x3f08f8)setTimeout(_0x113f44[_0x2606e6('0x19a')]['bind'](_0x113f44),0x190);}},VisuMZ[_0x21bc8a('0x274')]=function(_0xedd306,_0x1a9b44){const _0x3e1c69=_0x21bc8a;_0x1a9b44=_0x1a9b44['toUpperCase']();var _0x10c3a4=1.70158,_0x44b7e6=0.7;switch(_0x1a9b44){case _0x3e1c69('0x439'):return _0xedd306;case _0x3e1c69('0x2de'):return-0x1*Math[_0x3e1c69('0x18d')](_0xedd306*(Math['PI']/0x2))+0x1;case _0x3e1c69('0x43e'):return Math[_0x3e1c69('0x532')](_0xedd306*(Math['PI']/0x2));case _0x3e1c69('0xcd'):return-0.5*(Math['cos'](Math['PI']*_0xedd306)-0x1);case _0x3e1c69('0x2d0'):return _0xedd306*_0xedd306;case _0x3e1c69('0x2fc'):return _0xedd306*(0x2-_0xedd306);case _0x3e1c69('0x34f'):return _0xedd306<0.5?0x2*_0xedd306*_0xedd306:-0x1+(0x4-0x2*_0xedd306)*_0xedd306;case _0x3e1c69('0x34b'):return _0xedd306*_0xedd306*_0xedd306;case'OUTCUBIC':var _0x34f928=_0xedd306-0x1;return _0x34f928*_0x34f928*_0x34f928+0x1;case'INOUTCUBIC':return _0xedd306<0.5?0x4*_0xedd306*_0xedd306*_0xedd306:(_0xedd306-0x1)*(0x2*_0xedd306-0x2)*(0x2*_0xedd306-0x2)+0x1;case _0x3e1c69('0x579'):return _0xedd306*_0xedd306*_0xedd306*_0xedd306;case _0x3e1c69('0x162'):var _0x34f928=_0xedd306-0x1;return 0x1-_0x34f928*_0x34f928*_0x34f928*_0x34f928;case'INOUTQUART':var _0x34f928=_0xedd306-0x1;return _0xedd306<0.5?0x8*_0xedd306*_0xedd306*_0xedd306*_0xedd306:0x1-0x8*_0x34f928*_0x34f928*_0x34f928*_0x34f928;case _0x3e1c69('0x1e4'):return _0xedd306*_0xedd306*_0xedd306*_0xedd306*_0xedd306;case _0x3e1c69('0x188'):var _0x34f928=_0xedd306-0x1;return 0x1+_0x34f928*_0x34f928*_0x34f928*_0x34f928*_0x34f928;case _0x3e1c69('0xc9'):var _0x34f928=_0xedd306-0x1;return _0xedd306<0.5?0x10*_0xedd306*_0xedd306*_0xedd306*_0xedd306*_0xedd306:0x1+0x10*_0x34f928*_0x34f928*_0x34f928*_0x34f928*_0x34f928;case _0x3e1c69('0x679'):if(_0xedd306===0x0)return 0x0;return Math[_0x3e1c69('0x1c1')](0x2,0xa*(_0xedd306-0x1));case'OUTEXPO':if(_0xedd306===0x1)return 0x1;return-Math[_0x3e1c69('0x1c1')](0x2,-0xa*_0xedd306)+0x1;case _0x3e1c69('0x66b'):if(_0xedd306===0x0||_0xedd306===0x1){if(_0x3e1c69('0x319')===_0x3e1c69('0x366')){function _0x34bd3d(){const _0x181dd7=_0x3e1c69;if(this[_0x181dd7('0xf4')]==='keyboard'&&!_0x4c0a9b[_0x181dd7('0x552')]())return;if(_0x14ba79['isNumpadPressed']())return;_0x5b238e['CoreEngine'][_0x181dd7('0xa5')][_0x181dd7('0x312')](this,_0x448359),this['switchModes'](_0x181dd7('0x2d8'));}}else return _0xedd306;}var _0xedd98a=_0xedd306*0x2,_0x2b33b5=_0xedd98a-0x1;if(_0xedd98a<0x1)return 0.5*Math[_0x3e1c69('0x1c1')](0x2,0xa*_0x2b33b5);return 0.5*(-Math[_0x3e1c69('0x1c1')](0x2,-0xa*_0x2b33b5)+0x2);case _0x3e1c69('0x3c3'):var _0xedd98a=_0xedd306/0x1;return-0x1*(Math['sqrt'](0x1-_0xedd98a*_0xedd306)-0x1);case _0x3e1c69('0xb8'):var _0x34f928=_0xedd306-0x1;return Math[_0x3e1c69('0xb4')](0x1-_0x34f928*_0x34f928);case'INOUTCIRC':var _0xedd98a=_0xedd306*0x2,_0x2b33b5=_0xedd98a-0x2;if(_0xedd98a<0x1){if(_0x3e1c69('0x670')==='RiOvS')return-0.5*(Math['sqrt'](0x1-_0xedd98a*_0xedd98a)-0x1);else{function _0x4b4f98(){this['_muteSound']=_0x520c42;}}}return 0.5*(Math[_0x3e1c69('0xb4')](0x1-_0x2b33b5*_0x2b33b5)+0x1);case _0x3e1c69('0x11e'):return _0xedd306*_0xedd306*((_0x10c3a4+0x1)*_0xedd306-_0x10c3a4);case _0x3e1c69('0x1b4'):var _0xedd98a=_0xedd306/0x1-0x1;return _0xedd98a*_0xedd98a*((_0x10c3a4+0x1)*_0xedd98a+_0x10c3a4)+0x1;break;case _0x3e1c69('0x1b6'):var _0xedd98a=_0xedd306*0x2,_0x3acf7c=_0xedd98a-0x2,_0x2a3a33=_0x10c3a4*1.525;if(_0xedd98a<0x1)return 0.5*_0xedd98a*_0xedd98a*((_0x2a3a33+0x1)*_0xedd98a-_0x2a3a33);return 0.5*(_0x3acf7c*_0x3acf7c*((_0x2a3a33+0x1)*_0x3acf7c+_0x2a3a33)+0x2);case _0x3e1c69('0x4ff'):if(_0xedd306===0x0||_0xedd306===0x1)return _0xedd306;var _0xedd98a=_0xedd306/0x1,_0x2b33b5=_0xedd98a-0x1,_0x40eec7=0x1-_0x44b7e6,_0x2a3a33=_0x40eec7/(0x2*Math['PI'])*Math[_0x3e1c69('0x126')](0x1);return-(Math[_0x3e1c69('0x1c1')](0x2,0xa*_0x2b33b5)*Math[_0x3e1c69('0x532')]((_0x2b33b5-_0x2a3a33)*(0x2*Math['PI'])/_0x40eec7));case _0x3e1c69('0xfa'):var _0x40eec7=0x1-_0x44b7e6,_0xedd98a=_0xedd306*0x2;if(_0xedd306===0x0||_0xedd306===0x1)return _0xedd306;var _0x2a3a33=_0x40eec7/(0x2*Math['PI'])*Math[_0x3e1c69('0x126')](0x1);return Math[_0x3e1c69('0x1c1')](0x2,-0xa*_0xedd98a)*Math[_0x3e1c69('0x532')]((_0xedd98a-_0x2a3a33)*(0x2*Math['PI'])/_0x40eec7)+0x1;case'INOUTELASTIC':var _0x40eec7=0x1-_0x44b7e6;if(_0xedd306===0x0||_0xedd306===0x1)return _0xedd306;var _0xedd98a=_0xedd306*0x2,_0x2b33b5=_0xedd98a-0x1,_0x2a3a33=_0x40eec7/(0x2*Math['PI'])*Math[_0x3e1c69('0x126')](0x1);if(_0xedd98a<0x1)return-0.5*(Math[_0x3e1c69('0x1c1')](0x2,0xa*_0x2b33b5)*Math[_0x3e1c69('0x532')]((_0x2b33b5-_0x2a3a33)*(0x2*Math['PI'])/_0x40eec7));return Math[_0x3e1c69('0x1c1')](0x2,-0xa*_0x2b33b5)*Math[_0x3e1c69('0x532')]((_0x2b33b5-_0x2a3a33)*(0x2*Math['PI'])/_0x40eec7)*0.5+0x1;case'OUTBOUNCE':var _0xedd98a=_0xedd306/0x1;if(_0xedd98a<0x1/2.75){if(_0x3e1c69('0x39c')===_0x3e1c69('0x57a')){function _0x11ed64(){const _0x2e56c9=_0x3e1c69;_0x57db11[_0x2e56c9('0x46d')](_0xec9b84);}}else return 7.5625*_0xedd98a*_0xedd98a;}else{if(_0xedd98a<0x2/2.75){if('gysbU'!==_0x3e1c69('0xda')){function _0x195a71(){const _0x34a189=_0x3e1c69;return _0x2835bc[_0x34a189('0x5b4')][_0x34a189('0x41d')][_0x34a189('0x312')](this)+_0x58bdc2['CoreEngine'][_0x34a189('0x4e5')][_0x34a189('0x633')]['ItemHeight'];;}}else{var _0x3acf7c=_0xedd98a-1.5/2.75;return 7.5625*_0x3acf7c*_0x3acf7c+0.75;}}else{if(_0xedd98a<2.5/2.75){var _0x3acf7c=_0xedd98a-2.25/2.75;return 7.5625*_0x3acf7c*_0x3acf7c+0.9375;}else{if(_0x3e1c69('0x5f2')!=='ReSWF'){function _0x43a2cf(){const _0x5171bd=_0x3e1c69,_0x476d82='_stored_normalColor';this['_colorCache']=this[_0x5171bd('0x12')]||{};if(this[_0x5171bd('0x12')][_0x476d82])return this[_0x5171bd('0x12')][_0x476d82];const _0x2be1b4=_0x33d084[_0x5171bd('0x503')]['Settings'][_0x5171bd('0x2aa')][_0x5171bd('0x6b')];return this['getColorDataFromPluginParameters'](_0x476d82,_0x2be1b4);}}else{var _0x3acf7c=_0xedd98a-2.625/2.75;return 7.5625*_0x3acf7c*_0x3acf7c+0.984375;}}}}case _0x3e1c69('0x15'):var _0x288c59=0x1-VisuMZ[_0x3e1c69('0x274')](0x1-_0xedd306,_0x3e1c69('0xe6'));return _0x288c59;case'INOUTBOUNCE':if(_0xedd306<0.5)var _0x288c59=VisuMZ[_0x3e1c69('0x274')](_0xedd306*0x2,_0x3e1c69('0x521'))*0.5;else var _0x288c59=VisuMZ['ApplyEasing'](_0xedd306*0x2-0x1,_0x3e1c69('0xe6'))*0.5+0.5;return _0x288c59;default:return _0xedd306;}},VisuMZ[_0x21bc8a('0x2bd')]=function(_0x59c5d7){const _0x392205=_0x21bc8a;_0x59c5d7=String(_0x59c5d7)[_0x392205('0x443')]();const _0x291395=VisuMZ['CoreEngine']['Settings'][_0x392205('0x119')];if(_0x59c5d7===_0x392205('0x561'))return _0x291395[_0x392205('0x53b')];if(_0x59c5d7===_0x392205('0x5fc'))return _0x291395[_0x392205('0x25e')];if(_0x59c5d7===_0x392205('0x545'))return _0x291395[_0x392205('0x2a6')];if(_0x59c5d7===_0x392205('0x102'))return _0x291395['IconParam3'];if(_0x59c5d7===_0x392205('0xf5'))return _0x291395[_0x392205('0x1ff')];if(_0x59c5d7===_0x392205('0x691'))return _0x291395[_0x392205('0x81')];if(_0x59c5d7===_0x392205('0x30b'))return _0x291395[_0x392205('0x95')];if(_0x59c5d7===_0x392205('0x434'))return _0x291395[_0x392205('0x3bc')];if(_0x59c5d7===_0x392205('0x447'))return _0x291395[_0x392205('0x42b')];if(_0x59c5d7==='EVA')return _0x291395[_0x392205('0x5a9')];if(_0x59c5d7==='CRI')return _0x291395['IconXParam2'];if(_0x59c5d7==='CEV')return _0x291395[_0x392205('0x51d')];if(_0x59c5d7===_0x392205('0x90'))return _0x291395[_0x392205('0x3c5')];if(_0x59c5d7===_0x392205('0x68e'))return _0x291395[_0x392205('0x368')];if(_0x59c5d7===_0x392205('0x492'))return _0x291395[_0x392205('0x61c')];if(_0x59c5d7==='HRG')return _0x291395['IconXParam7'];if(_0x59c5d7===_0x392205('0x4f9'))return _0x291395['IconXParam8'];if(_0x59c5d7==='TRG')return _0x291395[_0x392205('0x35e')];if(_0x59c5d7===_0x392205('0x4b8'))return _0x291395['IconSParam0'];if(_0x59c5d7==='GRD')return _0x291395['IconSParam1'];if(_0x59c5d7===_0x392205('0x471'))return _0x291395[_0x392205('0x2b')];if(_0x59c5d7===_0x392205('0x415'))return _0x291395[_0x392205('0x71')];if(_0x59c5d7===_0x392205('0x3ce'))return _0x291395[_0x392205('0x690')];if(_0x59c5d7===_0x392205('0x4e9'))return _0x291395[_0x392205('0x580')];if(_0x59c5d7===_0x392205('0x2f2'))return _0x291395[_0x392205('0x2ce')];if(_0x59c5d7===_0x392205('0x1e8'))return _0x291395[_0x392205('0x371')];if(_0x59c5d7===_0x392205('0x72'))return _0x291395[_0x392205('0x236')];if(_0x59c5d7===_0x392205('0x4d'))return _0x291395[_0x392205('0x410')];if(VisuMZ[_0x392205('0x503')][_0x392205('0x412')][_0x59c5d7])return VisuMZ[_0x392205('0x503')][_0x392205('0x412')][_0x59c5d7]||0x0;return 0x0;},VisuMZ[_0x21bc8a('0x27f')]=function(_0x4423b5,_0x5e3daf){const _0x4ef01f=_0x21bc8a;if(_0x4423b5%0x1===0x0)return _0x4423b5;return _0x5e3daf=_0x5e3daf||0x0,String((_0x4423b5*0x64)[_0x4ef01f('0x29a')](_0x5e3daf))+'%';},VisuMZ[_0x21bc8a('0x75')]=function(_0x1d05b5){const _0x29005e=_0x21bc8a;_0x1d05b5=String(_0x1d05b5);if(!_0x1d05b5)return _0x1d05b5;if(typeof _0x1d05b5!=='string')return _0x1d05b5;const _0x259629=VisuMZ[_0x29005e('0x503')][_0x29005e('0x4e5')][_0x29005e('0x1a7')][_0x29005e('0x190')]||_0x29005e('0x1ac'),_0x1a524c={'maximumFractionDigits':0x6};_0x1d05b5=_0x1d05b5[_0x29005e('0x684')](/\[(.*?)\]/g,(_0x9e12af,_0x403cab)=>{const _0x478a19=_0x29005e;return VisuMZ[_0x478a19('0x340')](_0x403cab,'[',']');}),_0x1d05b5=_0x1d05b5[_0x29005e('0x684')](/<(.*?)>/g,(_0xf92b82,_0xd631ae)=>{const _0x306bd0=_0x29005e;if('KuExy'!==_0x306bd0('0x175'))return VisuMZ[_0x306bd0('0x340')](_0xd631ae,'<','>');else{function _0x5b8c41(){const _0x33b2dd=_0x306bd0;if(this['_CoreEngineSettings']===_0x271218)this['initCoreEngine']();if(this[_0x33b2dd('0x5bc')]['SideView']===_0x34d137)this['initCoreEngine']();this[_0x33b2dd('0x5bc')]['SideView']=_0x11ad64;}}}),_0x1d05b5=_0x1d05b5[_0x29005e('0x684')](/\{\{(.*?)\}\}/g,(_0x50a5e7,_0xe84679)=>{const _0x521665=_0x29005e;return VisuMZ[_0x521665('0x340')](_0xe84679,'','');}),_0x1d05b5=_0x1d05b5[_0x29005e('0x684')](/(\d+\.?\d*)/g,(_0x4f21be,_0xa34c18)=>{const _0x126c59=_0x29005e;let _0x278ed8=_0xa34c18;if(_0x278ed8[0x0]==='0')return _0x278ed8;if(_0x278ed8[_0x278ed8['length']-0x1]==='.')return Number(_0x278ed8)[_0x126c59('0x70')](_0x259629,_0x1a524c)+'.';else return _0x278ed8[_0x278ed8[_0x126c59('0x49')]-0x1]===','?Number(_0x278ed8)[_0x126c59('0x70')](_0x259629,_0x1a524c)+',':Number(_0x278ed8)[_0x126c59('0x70')](_0x259629,_0x1a524c);});let _0xe034f0=0x3;while(_0xe034f0--){if(_0x29005e('0x288')===_0x29005e('0x216')){function _0x2e8f81(){const _0x427162=_0x29005e;return _0x19e804[_0x427162('0x2bf')][_0x427162('0x312')](this);}}else _0x1d05b5=VisuMZ[_0x29005e('0x472')](_0x1d05b5);}return _0x1d05b5;},VisuMZ[_0x21bc8a('0x340')]=function(_0x451643,_0x297e30,_0x5631f7){const _0x508422=_0x21bc8a;return _0x451643=_0x451643[_0x508422('0x684')](/(\d)/gi,(_0x125952,_0xb95a2b)=>'PRESERVCONVERSION(%1)'[_0x508422('0x2c1')](Number(_0xb95a2b))),_0x508422('0xa1')[_0x508422('0x2c1')](_0x451643,_0x297e30,_0x5631f7);},VisuMZ['RevertPreserveNumbers']=function(_0x29b686){const _0xd56dac=_0x21bc8a;return _0x29b686=_0x29b686[_0xd56dac('0x684')](/PRESERVCONVERSION\((\d+)\)/gi,(_0x44ae50,_0x5dd5bb)=>Number(parseInt(_0x5dd5bb))),_0x29b686;},VisuMZ['openURL']=function(_0x31deef){const _0x5fec4a=_0x21bc8a;SoundManager[_0x5fec4a('0x4d6')]();if(!Utils[_0x5fec4a('0x55e')]()){const _0x496575=window[_0x5fec4a('0x33')](_0x31deef,_0x5fec4a('0x3eb'));}else{const _0x14f00e=process[_0x5fec4a('0x60a')]==_0x5fec4a('0x59c')?_0x5fec4a('0x33'):process[_0x5fec4a('0x60a')]==_0x5fec4a('0x452')?_0x5fec4a('0x16a'):_0x5fec4a('0x6');require('child_process')['exec'](_0x14f00e+'\x20'+_0x31deef);}},Sprite_Clickable[_0x21bc8a('0x5b4')][_0x21bc8a('0x2b4')]=function(){const _0x4b1d59=_0x21bc8a;if(this[_0x4b1d59('0x37e')]()){if(_0x4b1d59('0x318')===_0x4b1d59('0x318')){if(this[_0x4b1d59('0x544')]()){if(_0x4b1d59('0x42c')===_0x4b1d59('0x655')){function _0x4302de(){return'';}}else!this[_0x4b1d59('0x45e')]&&TouchInput[_0x4b1d59('0x4f0')]()&&(this[_0x4b1d59('0x45e')]=!![],this[_0x4b1d59('0x45d')]()),TouchInput[_0x4b1d59('0x624')]()&&(this[_0x4b1d59('0x395')]=!![],this['onPress']());}else{if(this['_hovered']){if(_0x4b1d59('0x1fa')!==_0x4b1d59('0x48e'))this[_0x4b1d59('0x582')]();else{function _0x289a9e(){const _0x10b836=_0x4b1d59;return _0xe06333[_0x10b836('0x4c4')];}}}this[_0x4b1d59('0x395')]=![],this[_0x4b1d59('0x45e')]=![];}if(this[_0x4b1d59('0x395')]&&TouchInput[_0x4b1d59('0x4ad')]()){if('IMFVk'!==_0x4b1d59('0x432')){function _0x938e21(){const _0x237ada=_0x4b1d59;_0x52979c[_0x237ada('0x503')][_0x237ada('0x67c')][_0x237ada('0x312')](this),this[_0x237ada('0x548')]();}}else this[_0x4b1d59('0x395')]=![],this[_0x4b1d59('0x109')]();}}else{function _0x3c0f32(){return 0x0;}}}else this[_0x4b1d59('0x395')]=![],this[_0x4b1d59('0x45e')]=![];},Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x15a')]=function(){const _0x26ba22=_0x21bc8a;return this[_0x26ba22('0x295')];},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x2cc')]=Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x156')],Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x156')]=function(){const _0x278ae1=_0x21bc8a;VisuMZ[_0x278ae1('0x503')][_0x278ae1('0x2cc')]['call'](this),this[_0x278ae1('0x295')]={'x':0x0,'y':0x0},this[_0x278ae1('0x4b1')]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x21bc8a('0x143')]=Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x30c')],Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x30c')]=function(){const _0xdef9a9=_0x21bc8a;this['updateAnchor'](),VisuMZ[_0xdef9a9('0x503')][_0xdef9a9('0x143')]['call'](this);},VisuMZ[_0x21bc8a('0x503')]['Game_Picture_show']=Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x2a3')],Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x2a3')]=function(_0x335524,_0xce7f80,_0xbd07fe,_0x3c492d,_0x59cff2,_0x418750,_0xccbc7c,_0x232896){const _0x388f4a=_0x21bc8a;VisuMZ[_0x388f4a('0x503')]['Game_Picture_show']['call'](this,_0x335524,_0xce7f80,_0xbd07fe,_0x3c492d,_0x59cff2,_0x418750,_0xccbc7c,_0x232896),this[_0x388f4a('0xd7')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0xce7f80]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine']['Game_Picture_move']=Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x1e')],Game_Picture[_0x21bc8a('0x5b4')]['move']=function(_0x4139f8,_0x2c0928,_0x4cf7d8,_0x50bddd,_0x2cffeb,_0x1c61ba,_0x3fb3de,_0x16ad95,_0x4c3c39){const _0x218856=_0x21bc8a;VisuMZ[_0x218856('0x503')]['Game_Picture_move']['call'](this,_0x4139f8,_0x2c0928,_0x4cf7d8,_0x50bddd,_0x2cffeb,_0x1c61ba,_0x3fb3de,_0x16ad95,_0x4c3c39),this[_0x218856('0x3c2')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4139f8]||{'x':0x0,'y':0x0});},Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x44e')]=function(){const _0x1796a0=_0x21bc8a;if(this[_0x1796a0('0x47a')]>0x0){if(_0x1796a0('0x3d')!==_0x1796a0('0x16c'))this['_anchor']['x']=this[_0x1796a0('0x35f')](this[_0x1796a0('0x295')]['x'],this[_0x1796a0('0x4b1')]['x']),this['_anchor']['y']=this['applyEasing'](this[_0x1796a0('0x295')]['y'],this['_targetAnchor']['y']);else{function _0x4b2358(){const _0x4499fa=_0x1796a0;_0x2fb83d[_0x4499fa('0x503')][_0x4499fa('0x4e5')]['UI']['SideButtons']&&(this[_0x4499fa('0x278')]=_0x139a99);}}}},Game_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0xd7')]=function(_0x4911a6){const _0x32f499=_0x21bc8a;this[_0x32f499('0x295')]=_0x4911a6,this['_targetAnchor']=JsonEx[_0x32f499('0x2a1')](this[_0x32f499('0x295')]);},Game_Picture['prototype']['setTargetAnchor']=function(_0x22a72a){const _0x18dc24=_0x21bc8a;this[_0x18dc24('0x4b1')]=_0x22a72a;},VisuMZ[_0x21bc8a('0x503')][_0x21bc8a('0x5ea')]=Sprite_Picture[_0x21bc8a('0x5b4')][_0x21bc8a('0x5ce')],Sprite_Picture[_0x21bc8a('0x5b4')]['updateOrigin']=function(){const _0x55b818=_0x21bc8a,_0x9bb50e=this[_0x55b818('0x514')]();!_0x9bb50e[_0x55b818('0x15a')]()?VisuMZ[_0x55b818('0x503')][_0x55b818('0x5ea')][_0x55b818('0x312')](this):(this[_0x55b818('0x15a')]['x']=_0x9bb50e[_0x55b818('0x15a')]()['x'],this[_0x55b818('0x15a')]['y']=_0x9bb50e[_0x55b818('0x15a')]()['y']);},Game_Action[_0x21bc8a('0x5b4')][_0x21bc8a('0x1fb')]=function(_0x34b165){const _0x4c7472=_0x21bc8a;if(_0x34b165){if('GyDDo'===_0x4c7472('0x592')){function _0x40f402(){var _0xc010f8=_0x42275b-1.5/2.75;return 7.5625*_0xc010f8*_0xc010f8+0.75;}}else{const _0x3bf913=_0x34b165['skillId'];if(_0x3bf913===0x1&&this[_0x4c7472('0xd8')]()[_0x4c7472('0x32d')]()!==0x1)this[_0x4c7472('0x486')]();else _0x3bf913===0x2&&this[_0x4c7472('0xd8')]()[_0x4c7472('0x114')]()!==0x2?this[_0x4c7472('0x442')]():this['setSkill'](_0x3bf913);}}else this[_0x4c7472('0x2ad')]();},Game_Actor['prototype'][_0x21bc8a('0x3aa')]=function(){const _0xed4690=_0x21bc8a;return this[_0xed4690('0x4e1')]()[_0xed4690('0x247')](_0x3079a3=>this[_0xed4690('0x396')](_0x3079a3)&&this['skillTypes']()[_0xed4690('0x666')](_0x3079a3[_0xed4690('0x275')]));},Window_Base[_0x21bc8a('0x5b4')][_0x21bc8a('0x4')]=function(){const _0x288d3b=_0x21bc8a;if(this[_0x288d3b('0x62a')]){const _0x249182=this[_0x288d3b('0x62a')]['bitmap'],_0xef79fc=this[_0x288d3b('0x65')],_0x270104=this[_0x288d3b('0x585')],_0x2c606c=this[_0x288d3b('0x2c6')],_0x514ecb=ColorManager[_0x288d3b('0xce')](),_0x1ed35a=ColorManager[_0x288d3b('0x4fb')]();_0x249182[_0x288d3b('0x242')](_0xef79fc,_0x270104),_0x249182[_0x288d3b('0x224')](0x0,0x0,_0xef79fc,_0x2c606c,_0x1ed35a,_0x514ecb,!![]),_0x249182[_0x288d3b('0xd6')](0x0,_0x2c606c,_0xef79fc,_0x270104-_0x2c606c*0x2,_0x514ecb),_0x249182['gradientFillRect'](0x0,_0x270104-_0x2c606c,_0xef79fc,_0x2c606c,_0x514ecb,_0x1ed35a,!![]),this[_0x288d3b('0x62a')][_0x288d3b('0x6c')](0x0,0x0,_0xef79fc,_0x270104);}},Game_Actor[_0x21bc8a('0x5b4')][_0x21bc8a('0x4ac')]=function(){const _0x52b8a8=_0x21bc8a;for(let _0x2351f9=0x0;_0x2351f9<this[_0x52b8a8('0x5de')]();_0x2351f9++){if(_0x52b8a8('0x502')===_0x52b8a8('0x502')){const _0x4d88df=this[_0x52b8a8('0xdf')]();let _0x4cb4df=Number['MIN_SAFE_INTEGER'];this['setAction'](_0x2351f9,_0x4d88df[0x0]);for(const _0x4f6c22 of _0x4d88df){if(_0x52b8a8('0x546')===_0x52b8a8('0x7')){function _0x10f0f8(){const _0x4863ba=_0x52b8a8;this[_0x4863ba('0x3ae')](_0x82e462[_0x4863ba('0x56')]);}}else{const _0x3960a3=_0x4f6c22['evaluate']();if(_0x3960a3>_0x4cb4df){if('hVHzD'!==_0x52b8a8('0x46')){function _0x315957(){this['initialize'](...arguments);}}else _0x4cb4df=_0x3960a3,this[_0x52b8a8('0x5e7')](_0x2351f9,_0x4f6c22);}}}}else{function _0xaacacb(){this['_clickHandler']=_0x1d6510;}}}this['setActionState'](_0x52b8a8('0x5be'));};