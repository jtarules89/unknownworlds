//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.13] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent SelectWindow
 * @desc Offset the enemy name's X position by this much.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent SelectWindow
 * @desc Offset the enemy name's Y position by this much.
 * @default 0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
//=============================================================================

const _0x5615=['IconStypeMagic','animation','HelpEscape','ShowMissEvasion','commandOptions','attackMotions','_regionBattleback2','worldTransform','_growWholeDuration','Sprite_Enemy_updateCollapse','Window_BattleLog_displayCurrentState','GGyyl','canInput','battlerSmoothImage','Targets2','dQDRG','hpHealingFmt','head','DBaUS','yVbkY','getBattlePortraitFilename','ParseAllNotetags','BattleCmdList','createMiss','CheckSkillCommandShowSwitches','Game_Action_needsSelection','PreEndActionJS','updatePositionBattleCore','ActSeq_Animation_WaitForAnimation','setHelpWindow','deadMembers','VJeHB','commandName','prepareCustomActionSequence','ITEM','alive\x20opponents','Game_Temp_requestAnimation','jumpBattler','MQIxN','Sprite_Enemy_setBattler','RNqsn','ResetOffset','charging','isEscapeCommandEnabled','QHtaH','applyImmortal','updateBorderSprite','cancelButtonText','battleSpin','CommandAddAutoBattle','mdHbB','onEscapeSuccess','QldDa','onDatabaseLoaded','NameOffsetY','isBorderStylePortraitShown','VHgaZ','_cache','Window_BattleLog_performDamage','applySoftDamageCap','length','addAttackCommand','FrontViewSelect','twoue','Damage','Scene_Battle_stop','contentsOpacity','Uazns','StartName','buffAdd','tHfhm','updateRefresh','_actions','setupTextPopup','ForceExploited','ActSeq_Animation_CastAnimation','formula','ActSeq_Movement_WaitForJump','displayReflectionPlayBack','%1Damage%2JS','Game_Action_makeTargets','HzHVq','smooth','_battleCoreBattleStartEvent','COLWe','_statusWindow','MANUAL','Weapon-%1-%2','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','applyArmorModifiers','_text','isTpb','EdJiq','ULTkE','CastPhysical','isMoving','isSkillItemWindowsMiddle','windowPadding','setupBattleback','updateFrame','isMeleeMultiTargetAction','innerWidth','isUndecided','addState','clearBattleCoreData','TP_Flat','addFightCommand','Formula','onActorOk','isSideButtonLayout','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20','isMeleeSingleTargetAction','auaRf','_svBattlerData','slice','ActSeq_Impact_MotionTrailRemove','randomTargets','_createDamageContainer','calcWindowHeight','timeScale','partyCommandWindowRectBorderStyle','_methods','_targetOpacity','customDamageFormula','Game_Action_itemEffectAddAttackState','TextAlign','MYygg','initVisibility','ActSeq_Motion_WaitMotionFrame','Scene_Boot_onDatabaseLoaded','ParseStateNotetags','ZGIBz','battleCameraData','_enemyID','KYWgU','Autlc','setFrame','fThGy','rKXoW','Scene_Battle_commandFight','createKeyJS','playCancel','BOusN','Window_BattleLog_performReflection','PZBHG','sLeaC','active','isBattleTest','ActSeq_Camera_Offset','EnableSoftCap','ZyFfp','right','cancelActorInput','placeActorName','SXBpH','ATTACK','isMagical','ESCAPE','command339','xwZOW','dead\x20battlers','seOYm','updateVisibility','JSON','createAnimationSprite','placeStateIcon','dead\x20enemies','AutoBattleRect','PNqxN','OUvAv','Window_Options_addGeneralOptions','OgNkz','walk','Eutmb','measureTextWidth','lHyYn','tone','makeCommandList','_battleCoreNoElement','onRegeneratePlayStateAnimation','Sprite_Actor_updateBitmap','_effectDuration','motionSpeed','OffsetAdjust','Exploiter','waitCount','onTurnEnd','changeTurnOrderByCTB','setBattleCameraOffset','_baseLineStack','stop','ActSeq_Movement_Opacity','WUBCm','battleAnimation','isVisualHpGaugeDisplayed','weatherPower','EFddc','isDamagePopupRequested','isTickBased','createEnemyNameContainer','stateMotionIndex','_tpbState','PostApplyAsUserJS','isForFriendBattleCore','adjustPosition_1for1','alive\x20enemies\x20not\x20target','jdyBJ','ActSeq_DB_DragonbonesTimeScale','Sprite_Weapon_loadBitmap','EVAL','spinBattler','EscapeFailureJS','spell','ActSeq_Horror_TVCreate','isHidden','alive\x20enemies\x20not\x20user','parseForcedGameTroopSettingsBattleCore','%1EndBattleJS','isEnemy','BattleStartEvent','SDCJy','displayAddedStates','OLQzj','pQCgK','action','commandNameWindowDrawBackground','jOpqA','lineRect','animationShouldMirror','softDamageCap','WhkoU','kclIY','auto','BGaef','onActorCancel','WaitForCamera','_escapeRatio','finishActorInput','performWeaponAnimation','drawBackgroundRect','DamageType%1','CmdTextAlign','ZQhsP','ActSeq_Animation_AttackAnimation','GroupDigits','nameY','HOBuZ','isDying','evalDamageFormulaBattleCore','refreshBattlerMotions','_windowLayer','Game_Interpreter_updateWaitMode','qOscp','TFevY','ActSeq_Motion_FreezeMotionFrame','createBorderStylePortraitSprite','currentClass','Mirror','addChildToBack','DTB','battleCamera','swapEnemyIDs','ncuYR','PreDamageAsTargetJS','createActors','parent','VJlsp','isSkipPartyCommandWindow','Scale','text\x20target','ActSeq_Movement_Jump','updateStateSpriteBattleCore','displayTpDamage','_lastPluginCommandInterpreter','actorCommandCancelTPB','DefeatEvent','format','setupZoomBlurImpactFilter','addAutoBattleCommand','ActSeq_Movement_WaitForMovement','ActSeq_Movement_Spin','setImmortal','_floatEasing','MessageWait','kEltx','_homeX','_effectType','Window_BattleLog_displayMiss','ActSeq_Impact_ShockwaveEachTargets','options','\x5cI[%1]%2','BattleLog','isSceneBattle','forceEscapeSprite','actor','callOptions','tGynm','message2','PreEndTurnJS','Game_Actor_setup','_battleField','speed','HP_Rate','autoBattleStart','ParseSkillNotetags','applyForcedGameTroopSettingsBattleCore','icon','acbtf','damageOffsetX','+%1\x20MP','motionIdle','Debuffs','IconStypeNorm','isAnyoneSpinning','softDamageCapRate','FBfDk','JS\x20BATTLE\x20DEFEAT','_forceAction','ActSeq_Mechanics_CtbSpeed','user','makeTargets','VisuMZ_0_CoreEngine','GpHTX','sNJQr','lcGdh','Game_Party_addActor','Name','HelpOptions','ABegj','battleMove','StfMS','jBZgQ','initBattlePortrait','DisplayAction','alive\x20battlers\x20not\x20target','popBaseLine','victory','ActSeq_Camera_WaitForCamera','members','DefaultSoftScaler','Hjphb','Sprite_Actor_updateFrame','createHelpWindow','WaitForOpacity','removeChild','performRecovery','float','Sprite_Actor_moveToStartPosition','sort','enemyNames','VYlZK','applyDamageCaps','Game_BattlerBase_canGuard','BattleLayout','FumaB','LCgoD','autoBattle','FGYly','gainMp','createString','_preBattleCommonEvent','mainSprite','ZHYSk','clone','Game_Action_evalDamageFormula','SideviewSelect','Sprite_Battler_isMoving','performMoveToPoint','setCustomDamageFormula','Item-%1-%2','onAngleEnd','TqEUK','LHJVI','HARqf','BattleManager_startBattle','mpDamageFmt','Window_BattleLog_displayEvasion','unshift','animationBaseDelay','removeState','kyzDJ','wCOyS','skewBattler','_battleCoreAddedElements','helpWindowRectBorderStyle','ihJMP','waitForNewLine','ZVSlm','updateStatusWindowPosition','portrait','_targetIndex','PostDamageAsTargetJS','WBKKJ','setBattlerFlip','attack','NUM','_opacityDuration','MOTIONS','isInputting','DTAZj','qZhFb','weaponTypes','JS\x20%1END\x20TURN','Game_BattlerBase_addNewState','AGI','DistanceX','_jumpDuration','AAqzm','ActSeq_Movement_MoveBy','_regionBattleback1','isClicked','svBattlerData','QlWOq','WsWyh','evaded','%1EndActionJS','setupDamagePopup','GGZeK','setAttack','isBattleMember','RegExp','sfhGv','bjlhI','isGrowing','updateActors','cbcop','actorId','ShowAddedState','vWNyf','onEnemyOk','_enemyId','DcVXH','performAction','map','Game_Map_battleback2Name','createEffectActionSet','MDdyp','isDead','getColor','loadEnemy','filters','dzluU','_isBattlerFlipped','version','children','moveToStartPosition','SkillsStatesCore','PostApplyAsTargetJS','applyItem','randomInt','placeTimeGauge','Setting','addDebuff','AttackAnimation','isSkill','performMagicEvasion','setBattlerMotionTrailData','createBattleFieldContainer','updateShadowPosition','battleJump','prototype','skew','STYPES','Vqfsx','applyAngleChange','BattleManager_updatePhase','CmdIconItem','vZaAX','BkYWp','gradientFillRect','applyHardDamageCap','Scene_Battle_skillWindowRect','isStateResist','_targetFloatHeight','getSkillTypes','isForRandomBattleCore','refreshStatusWindow','Spriteset_Battle_updateActors','clearDamagePopup','HQPzh','some','loadBitmap','PostApplyJS','StepDuration','isSideView','_eventId','createBattleFieldBattleCore','_enemies','Game_Battler_clearMotion','RihBE','aTduf','Game_Battler_forceAction','yhSeg','forceWeaponAnimation','CounterPlayback','xyAZr','getBattlePortrait','HnBcH','displayMiss','llsvZ','displayCritical','setupShockwaveImpactFilter','process_VisuMZ_BattleCore_Failsafes','Scene_Battle_createCancelButton','AddHpGaugeOption','NHBSU','_motionSpeed','_damageContainer','prev\x20target','ActSeq_Mechanics_AddState','makeTargetSelectionMoreVisible','ActSeq_Zoom_Scale','DefaultHardCap','allowCollapse','type','floor','OffsetY','loadBattleback2','ActSeq_Animation_ActionAnimation','xGQzo','isAnimationPlaying','sliceMax','log','performEvasion','AkFqX','hasSkill','JS\x20BATTLE\x20VICTORY','LyNYI','WJVle','Pre','createAutoBattleWindow','Settings','_back1Sprite','concat','subject','clearBattlerMotionTrailData','_spriteset','EscapeFail','getTraitSetKeys','toLowerCase','ARRAYSTRUCT','OverallFormulaJS','commandFight','hasSvBattler','ALL\x20SKILLS','fontSize','StyleON','%1StartTurnJS','woaVk','jUIiA','updateShadowVisibility','AnchorX','applyEasing','iDnwB','SvWeaponSolo-%1-%2','_cursorSprite','canBattlerMove','setHome','dead\x20friends','rKmVe','hide','LobZS','effect','isBattleCoreTargetScope','dLnzM','Jipws','Mubgu','LhHNw','getItemDamageAmountTextBattleCore','command301_PreBattleEvent','getConfigValue','JS\x20%1END\x20BATTLE','_emptyBitmap','magicReflection','JS\x20%1START\x20ACTION','PqGGe','lLJvm','processRandomizedData','_active','resetFontSettings','missile','eAGNB','Amp','performActionMotions','_shadowSprite','SvMotionIdleMass-%1-%2','IICAI','BattleManager_startInput','onBattleStart','setSvBattlerSprite','removeAnimationFromContainer','redraw','adjustPosition_ScaleToFit','remove','Scene_Battle_windowAreaHeight','EmergeText','qDAnB','selectPreviousCommand','requestFauxAnimation','setupBattlebackBattleCore','snapForBackground','startMotion','pkQIe','Window_BattleLog_pushBaseLine','SOKsM','MbjBj','BattleCore','fPEmj','performActionStart','ScaleToFit','VisuMZ_3_ActSeqImpact','Game_Interpreter_PluginCommand','applyVariance','removeBuff','autoBattleUseSkills','setCursorRect','pattern','createHpGaugeSprite','itemLineRect','svAnchorX','onSelectAction','targetObjects','OpybE','BRnOt','dying','_damages','hpAffected','Game_Action_clear','skills','Sprite_Actor_update','ActSeq_Set_WholeActionSet','startActorSelection','Sprite_Battleback_adjustPosition','pLffB','Game_Interpreter_command301','isForOne','battleUIOffsetY','addBattleCoreAutoBattleStartupCommand','BattleVictoryJS','setHue','_growY','addBuff','currentExt','ttHXN','addGeneralOptions','isAutoBattle','svShadow','kCWlH','pXDJG','VisuMZ_1_ElementStatusCore','BARE\x20HANDS','WSLEV','rUPHY','SvMotionIdleSolo-%1-%2','_lines','Nkbkc','DamageFlat','getAttackMotion','createBattleField','PRytJ','drawTextEx','onFloatEnd','isAnyoneJumping','jcBEA','createContents','haqEv','yHPkr','_action','nEfCN','item','ActSeq_Mechanics_AddBuffDebuff','Scene_Battle_start','AsUser','BaseTroopIDs','commandNameWindowCenter','_partyCommandWindow','_opacityEasing','gpxLa','hue','SvBattlerSolo-%1-%2','Scene_Battle_startActorSelection','_offsetX','_weaponSprite','_updateCursorFilterArea','spriteId','EasingType','LGKhi','isCustomActionSequence','hitFlat','VisuMZ_2_BattleSystemATB','gainHp','duration','applyFreezeMotionFrames','round','value','XRsJy','adjustPosition_ScaleDown','buffRemove','_homeY','commandSymbol','AutoBattle','Sprite_Battler_startMove','emerge','rcbuE','DPPRY','Xagfh','hitRate','abs','drawLineText','isAutoBattleCommandEnabled','ShowHpDmg','JeaSB','ScaleUp','scope','compareBattlerSprites','updateOpacity','ArPenRate','uegTy','isQueueOptionsMenu','isNonSubmenuCancel','onEncounterBattleCore','SceneManager_isSceneChanging','actorCommandWindowRect','battleDisplayText','NameOffsetX','refreshMotion','ActSeq_Animation_ShowAnimation','EscapeSuccessJS','alive\x20enemies','anchor','OcXOe','critical','frontviewSpriteY','JumpToLabel','frameVisible','AllowRandomSpeed','adjustPosition_ScaleUp','backColor','isActiveTpb','DamageStyles','autoSelectLastSelected','Scene_Battle_selectNextCommand','VHtsL','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','NameFontSize','ActSeq_Motion_PerformAction','isChanting','JS\x20%1START\x20BATTLE','ActSeq_Angle_Reset','_angleEasing','toString','_totalValue','Window_BattleLog_clear','allowRandomSpeed','Shadow','StartTurnShow','center','setBattler','%1Event','arRedFlat','_immortal','addSingleSkillCommands','ShowRemovedState','ActSeq_Mechanics_AtbGauge','AQXxz','updateBorderStyle','_targetAngle','PqwTB','eraseState','weapons','ActSeq_Skew_Reset','qZpCd','ActSeq_Movement_MoveToTarget','_weather','Game_BattlerBase_refresh','forceAction','xwFcV','moOvQ','_currentActor','BattleManager_startTurn','addChild','moveBattlerToPoint','NXcdt','addItemCommand','stbGainInstant','parameters','evalDamageFormula','process_VisuMZ_BattleCore_BaseTroops','YYoXc','pZEDk','startBattle','performCollapse','adjustWeaponSpriteOffset','cALvF','PreDamage%1JS','Sprite_Enemy_updateBossCollapse','pages','updateCommandNameWindow','FocusY','CalcEscapeRatioJS','itemHit','actorCommandEscape','_currentAngle','_freezeMotionData','custom','displayAction','CriticalDmgFlat','PRE-','attachSpritesToDistortionSprite','_defeatedEnemies','pop','lineHeight','initialize','name','cancelTargetSelectionVisibility','addChildAt','mIEnE','_item','ActSeq_Motion_RefreshMotion','innerHeight','Actor','svBattlerAnchorX','NPMUv','attackSkillId','_battleLayoutStyle','Window_ItemList_maxCols','open','OaNpY','CmdIconAutoBattle','-%1','helpWindowRect','_executedValue','Whwej','trim','Window_BattleLog_displayTpDamage','checkTpbInputOpen','WtypeId','mpDamage','Variable','Game_Map_setupBattleback','XMfDD','wait','changeBattlerOpacity','displayReflection','startEnemySelection','UwWCy','damageContainer','BattleManager_onEscapeSuccess','battleCommandIcon','VisuMZ_2_DragonbonesUnion','faceWidth','startActorCommandSelection','executeDamage','ActionAnimation','gisVQ','Scene_Map_launchBattle','Game_Action_isForFriend','FlinchDuration','clearWeaponAnimation','_battlerHue','anuYJ','FlashDuration','PopupOffsetY','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','HVuAq','PortraitScaleBorderStyle','pltvE','addNewState','addActor','removedBuffs','MVXrd','Mechanics','endBattle','VisuMZ_2_BattleSystemSTB','ActionCenteredName','Window_BattleLog_performMiss','hpDamageFmt','wkKDy','Targets1','createSeparateDamagePopups','escape','_scene','push','setHandler','Window_BattleStatus_initialize','Window_BattleLog_update','logActionList','animationId','Sprite_StateIcon_updateFrame','clearForcedGameTroopSettingsBattleCore','actions','GgOgY','ActSeq_Mechanics_StbRemoveExcessActions','status','isEffecting','vHsCL','_logWindow','Sprite_Battler_damageOffsetX','Targets','update','startAction','setSkill','drcHx','waitForMovement','ActionEffect','base','NIkvZ','CEHik','makeAutoBattleActions','_offsetY','requestMotionRefresh','onGrowEnd','bitmapHeight','isGuardWaiting','destroy','onBattleStartBattleCore','_forcedBattlers','GiqjO','AutoBattleOK','allBattleMembers','createDistortionSprite','collapse','jbZnx','DDlxn','addDamageSprite','VIFcP','faceRect','_createEffectsContainer','xssUl','nJEtw','displayFailure','SKILLS','battleback2Name','addLoadListener','drawItemStyleIcon','die','ScaleY','onSkewEnd','AStMI','PreApplyAsTargetJS','Scene_Options_maxCommands','nudZw','performReflection','motionType','battleSys','updateScale','+%1','STRUCT','ActSeq_Movement_WaitForScale','Game_Action_itemHit','iconIndex','repositionEnemiesByResolution','ActSeq_Mechanics_VariablePopup','updateCustomActionSequence','notFocusValid','PostEndTurnJS','refreshDimmerBitmap','ActSeq_Mechanics_CustomDmgFormula','drawItemImagePortraitStyle','displayChangedBuffs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','QoL','_flinched','Window_Options_statusText','WJhEI','Sprite_Battler_setBattler','ActSeq_Movement_BattleStep','drawText','ForceDeath','_targetGrowX','wtypeId','Window_BattleLog_performRecovery','message4','bossCollapse','CriticalDuration','useItem','ShowHide','nLlFL','cqaWP','#%1','AnchorY','csKHa','checkTpbInputClose','skillTypes','return\x200','ActorCmd','itemEffectAddAttackState','AUTO\x20BATTLE','indexOf','cameraOffsetDuration','ActSeq_Mechanics_TextPopup','ceil','_wtypeIDs','alive\x20battlers','isAnimationShownOnBattlePortrait','_distortionSprite','Scene_Battle_onEnemyCancel','setBattleAngle','_enemyNameContainer','Scene_Battle_helpWindowRect','noise','commandEscape','useDigitGrouping','power','SNikr','_duration','APIEK','Wave','PostRegenerateJS','getItemDamageAmountLabelBattleCore','ConfigManager_applyData','animationWait','ResetFocus','MotionFrameWait','singleSkill','displayMpDamage','changeCtbCastTime','Sprite_Actor_updateShadow','Linear','sortEnemies','removeDamageSprite','resize','weatherType','ShowSubstitute','isActing','Turns','addSkillTypeCommand','CmdIconEscape','Game_Battler_onTurnEnd','ArRedRate','addCustomCommands','_cancelButton','PostEndActionJS','Spriteset_Battle_createBattleField','ParseClassNotetags','WaitForFloat','Sprite_Enemy_update','bitmap','Scene_Battle_startPartyCommandSelection','OQWbC','clearHorrorEffects','_forcing','damageOffsetY','pZnLL','_enemy','PopupDuration','reduce','boxWidth','Parse_Notetags_Action','ojMXA','isActor','isAnyoneGrowing','startJump','PostStartBattleJS','initMembersBattleCore','ActSeq_BattleLog_WaitForNewLine','ParseWeaponNotetags','WaitForSkew','LastSelected','_pattern','Scene_Battle_startEnemySelection','ParseArmorNotetags','NSHtB','createChildSprite','description','_target','onDisabledPartyCommandSelection','addBattleCoreAutoBattleStyleCommand','statusTextAutoBattleStyle','isAnyoneFloating','ActSeq_DB_DragonbonesMotionAni','startTurn','requestRefresh','GZgmH','dead','createTargetsJS','showPortraits','AS\x20TARGET','oGwzR','Spriteset_Battle_createLowerLayer','ActSeq_ChangeAngle','createDigits','MYDvR','YNgMp','clearFreezeMotion','_battler','moveToStartPositionBattleCore','getInputButtonString','SShLo','wholeActionSet','iconWidth','setupWeaponAnimation','applyBattleCoreJS','command119','_jumpWholeDuration','zmiBy','_baseY','ZrJzo','performSubstitute','ActSeq_Motion_ClearFreezeFrame','DigitGroupingDamageSprites','FUNC','Exploited','list','updateCancel','CowGt','sQGxb','BBUXG','isGuard','clearResult','yrRsc','_flashDuration','KndIb','MotionType','setHorrorEffectSettings','_commonEventQueue','SvWeaponMass-%1-%2','updateSpin','refreshCursor','_flashColor','createDamageContainer','autoBattleAtStart','padding','QLIlf','CmdIconFight','Sprite_Battler_update','isDeathStateAffected','addAnimationSpriteToContainer','xgWAf','counterAttack','ActSeq_Horror_NoiseCreate','makeTargetSprites','GdZrV','YoRnP','_createClientArea','_growEasing','PostDamageAsUserJS','nRcuA','isCustomBattleScope','ActSeq_Mechanics_RemoveState','zpSja','loadSvActor','drawItemStatusListStyle','createLowerLayer','Window_BattleStatus_drawItemImage','statusWindowRect','battleUIOffsetX','UmZhT','setText','Radius','BMKsC','WgeHR','uiInputPosition','_multipliers','statusWindowRectXPStyle','PortraitScale','_canLose','move','startMove','canAttackBattleCore','isSpinning','numTargets','Wpbio','all\x20targets','PartyCmd','hcfTN','YlyTm','tDNkJ','setBattlerBattleCore','stepFlinch','WaitCount1','PreApplyAsUserJS','_colorType','ActSeq_Impact_ColorBreak','HelpFight','getStypeIdWithName','ActSeq_Element_AddElements','updateFlip','Scene_Battle_startActorCommandSelection','regionId','xvTSu','ActSeq_Set_FinishAction','ParseItemNotetags','_enemyWindow','MNeRl','addedStateObjects','SkewX','Enemy','CreateActionSequenceTargets','_hpGaugeSprite','ActSeq_Target_NextTarget','callNextMethod','Game_Interpreter_terminate','Height','getDefeatedEnemies','ACnLv','ActSeq_Motion_MotionType','Buffs','_preemptive','createCommandVisibleJS','_mainSprite','vDrgW','param','result','SNyKy','BattleManager_cancelActorInput','CriticalHitRateJS','TPB','Window_BattleLog_performActionEnd','dead\x20actors','skillWindowRect','GUARD','ActSeq_BattleLog_AddText','Armor-%1-%2','Direction','_jumpHeight','isBattleSys','iconText','makeActions','_subject','bind','PostStartTurnJS','DistanceAdjust','isOpen','changeBattlebacks','ShowCounter','addPartyCommand','activate','StartTurnWait','iconHeight','Game_BattlerBase_isStateResist','_animationContainer','MotionAni','windowAreaHeight','_skewDuration','displayItemMessage','Game_Battler_performDamage','preemptive','Sprite_Enemy_updateStateSprite','setupMotion','svBattlerName','battleEffect','ifbyn','WTaMG','Sprite_Actor_setActorHome','_skewY','JS\x20%1APPLY\x20%2','drawItemStatusXPStyle','Sprite_Battler_damageOffsetY','anchorX','putActiveBattlerOnTop','Class-%1-%2','updateBattlebackBitmap','AMmRN','siCOg','Window_BattleLog_popupDamage','needsSelection','Window_BattleEnemy_initialize','scale','setBattlePortrait','IKSbG','applyCritical','%1Apply%2JS','isBattlerGrounded','clearElementChanges','eVlcy','statusText','Sprite_Enemy_initVisibility','DefaultStyle','CriticalHitMultiplier','ActionSkillMsg2','AutoBattleCancel','PostDamage%1JS','Window_BattleLog_displayFailure','okTargetSelectionVisibility','ScaleX','enemy','setBattleSkew','message1','criticalDmgFlat','DVQVp','_battlePortrait','Scene_Map_initialize','needsSelectionBattleCore','Window_BattleLog_performCollapse','_actorCommandWindow','join','BattleManager_processVictory','Victory','%1EndTurnJS','addedBuffs','_angleRevertOnFinish','CtEEr','waitForJump','_visualHpGauge_JustDied','isBusy','MsZYC','BattleEndEvent','CEeue','UGqXb','ARRAYNUM','VnRNa','Window_BattleLog_refresh','partyCommandWindowRectXPStyle','eMtAB','skillItemWindowRectMiddle','yXUJZ','clear','getMenuImage','battleMembers','usePremadeActionSequence','PDldb','current\x20target','height','zptFt','pushBaseLine','setVisibleUI','AdjustRect','WCaAL','setupRgbSplitImpactFilter','Sprite_Battler_setHome','KTyXK','_actionBattlers','getNextDamagePopup','ActSeq_Movement_Scale','XuxgV','_skewEasing','WaitForAnimation','ISUiC','CnMSX','ForceRandom','Game_Map_battleback1Name','isShownOnBattlePortrait','selectNextCommandTpb','_borderPortraitSprite','abnormal','battleLayoutStyle','isOpponent','ext','JS\x20%1DAMAGE\x20%2','clamp','_floatWholeDuration','jump','regenerateAllBattleCore','growBattler','PostEndBattleJS','isTurnBased','ActSeq_Impact_MotionBlurScreen','process_VisuMZ_BattleCore_Action_Notetags','createWeather','Rate','_motionCount','mainSpriteWidth','DistanceY','AlphaFilter','createShadowSprite','battleOpacity','rowSpacing','NpFzm','WvDec','JS\x20ESCAPE\x20FAILURE','performDamage','setSTBExploited','ActSeq_Horror_NoiseRemove','ATK','create','XGfJy','updateStyleOpacity','chant','command301','canAddSkillCommand','Game_Action_executeDamage','makeHpDamageText','_additionalSprites','bUFRv','hsHgG','guardSkillId','yIfrw','isAppeared','Actor-%1-%2','canEscape','floatBattler','Window_BattleLog_popBaseLine','removeHorrorEffect','updateAction','dimColor1','startOpacity','bOhkH','itemCri','autoSelectPriority','loadPicture','Window_BattleLog_performSubstitute','cJBBj','setHelpWindowItem','bgType','_createCursorSprite','aVEmt','HelpItem','_dimmerSprite','PSQTi','start','VERlZ','MmhYu','adjustPosition','1:1','isAnyoneMoving','mnsKi','ActSeq_Animation_ChangeBattlePortrait','ftfuD','removeImmortal','_helpWindow','Window_SkillList_maxCols','BattleManager_startAction','EscapeSuccess','transform','BattleManager_endBattle','QeLZu','%1RegenerateJS','ActSeq_Camera_FocusPoint','updateHelp','aGTNe','Game_Battler_clearDamagePopup','PreStartTurnJS','battleCoreResumeLaunchBattle','ActSeq_Target_RandTarget','_svBattlerSprite','CalcActionSpeedJS','FlinchDistanceX','_updateClientArea','stypeId','PAnro','maxBattleMembers','Scene_Battle_logWindowRect','ActSeq_Movement_FaceTarget','isFrameVisible','isDisplayEmergedEnemies','alive\x20actors\x20not\x20user','Sprite_Battler_updateMain','UBhvk','optDisplayTp','makeTargetsBattleCore','NUVXe','changeAtbCastTime','collapseType','iPsPf','placeBasicGauges','GuardFormulaJS','EssRX','GMlEk','updateShadow','updateBitmap','_damagePopupArray','createInnerPortrait','cancel','Window_BattleLog_performAction','processForcedAction','updateCollapse','TargetLocation','PreApply%1JS','setupHpGaugeSprite','kxoUO','isSpriteVisible','PopupShiftY','tdBDz','MAXHP','friendsUnit','PreStartActionJS','setMoveEasingType','_dragonbonesSpriteContainer','StepDistanceX','ActSeq_Movement_FacePoint','command236','performCounter','ParseActorNotetags','zRxmh','createDamageSprite','processBattleCoreJS','_lastEnemy','_borderPortraitDuration','AjLRS','exit','canGuard','displayActionResults','isSkewing','basicGaugesY','ihXuN','lOGdI','States','isConfused','battleCorePreBattleCommonEvent','Game_Actor_makeActionList','sleep','ActSeq_Angle_WaitForAngle','%1StartBattleJS','isAnyoneSkewing','chantStyle','NRjGV','TextColor','AutoMeleeAoE','displayRemovedStates','adjustFlippedBattlefield','UwsgV','PopupShiftX','inHomePosition','aliveMembers','ActSeq_Element_ForceElements','startFloat','CmdStyle','QpFeV','removedStateObjects','UOQfV','createPartyCommandWindow','hasBeenDefeatedBefore','_itemWindow','Game_BattlerBase_eraseState','getWtypeIdWithName','_floatDuration','processRefresh','qSSHI','_customDamageFormula','JbFWV','ActSeq_Impact_ShockwaveCenterTargets','sCGaJ','CmdTextAutoBattle','sortDamageSprites','OffsetX','traitObjects','battleGrow','isItemCommandEnabled','zoomDuration','makeActionListAutoAttack','DamageDisplay','SZqyk','Scene_Battle_createPartyCommandWindow','isCertainHit','Elements','debuffAdd','ActSeq_BattleLog_Clear','DefaultSoftCap','isForOpponentBattleCore','process_VisuMZ_BattleCore_PluginParams','Awihw','battleStatusWindowAnimationContainer','updateHpGaugePosition','ArPenFlat','KYsai','dead\x20opponents','hardDamageCap','clearFreezeMotionForWeapons','PopupOffsetX','ActSeq_BattleLog_PopBaseLine','VisuMZ_3_ActSeqCamera','Sprite_Enemy_loadBitmap','note','upyqp','JkFVl','performSTBExploiter','criticalHitRate','ARRAYFUNC','DamageRate','WaitForJump','recoverAll','commandNameWindowDrawText','flashColor','RVHFF','XJZhP','_stypeIDs','ActSeq_Mechanics_DeathBreak','itemTextAlign','hdWMz','waitForOpacity','_stateSprite','actionSplicePoint','WaitCount2','alive\x20battlers\x20not\x20user','evade','AsTarget','createBattleUIOffsetX','ZmSdP','ActSeq_Impact_ZoomBlurTargetCenter','getItemDamageAmountLabelOriginal','sMZev','updatePhase','currentValue','updatePadding','XIDfw','isFloating','currentAction','setActorHome','BattleManager_initMembers','HomePosJS','setupBattleCoreData','Game_Interpreter_command283','Angle','ReflectPlayback','_cursorArea','VarianceFormulaJS','gaugeX','fillRect','finishActionSet','CCaLK','ElementStatusCore','sJkWB','EiFlS','Actions','isPhysical','isForRandom','battleZoom','pBrci','angleDuration','alive\x20friends\x20not\x20user','displayCurrentState','default','JS\x20%1START\x20TURN','popupDamage','AXBCB','maxCols','ActSeq_Horror_GlitchCreate','isAtbCastingState','ActSeq_Impact_ShockwavePoint','ActSeq_Horror_Clear','HitRate','_iconIndex','damage','eRbdg','battleback1Name','delay','targetActionSet','isBypassDamageCap','setupChild','performAttack','ActSeq_BattleLog_WaitForBattleLog','CoreEngine','MjlNY','Window_BattleLog_displayCritical','guard','Game_Battler_onBattleStart','drawIcon','addShowHpGaugeCommand','setLastPluginCommandInterpreter','endAction','TLmNH','textColor','addedDebuffs','showAnimation','VisuMZ_2_BattleSystemCTB','statusWindowRectDefaultStyle','drawItem','QgGsh','Scene_Battle_createHelpWindow','isPlaytest','dczqs','xVVzu','commandStyleCheck','SkillItemBorderCols','COjPk','battleCommands','JosnM','Game_Battler_performActionEnd','autoMeleeSingleTargetActionSet','#ffffff','statusWindowRectBorderStyle','LhSFe','performActionEnd','HoGKw','Window_BattleLog_displayMpDamage','Game_BattlerBase_initMembers','isOptionsCommandEnabled','commandStyle','shadow','ConvertActionSequenceTarget','itemWindowRect','performFlinch','svBattlerAnchorY','startSkew','createCancelButton','kZoWk','attackAnimationId1','ActSeq_Mechanics_StbExtraAction','zIJCo','actorCommandSingleSkill','PostStartActionJS','nvykm','skill','isMVAnimation','SkillItemMiddleLayout','refreshRequest','showHelpWindow','initElementStatusCore','makeDamageValue','displayType','_surprise','prepareBorderActor','drawItemImageXPStyle','ActSeq_Element_Clear','DamageStyleList','BTestBypass','displayBuffs','VvKvQ','_skillWindow','createStateIconSprite','processDefeat','setBattlerFacePoint','onOpacityEnd','ActSeq_Camera_Reset','isBuffAffected','YYiFi','Scene_Battle_itemWindowRect','makeBattleCommand','Game_Action_apply','PreDamageAsUserJS','ShowRemovedBuff','BattleDefeatJS','visualHpGauge','createAllWindows','processAnimationRequests','PrioritySortActive','KNeOe','actionEffect','nZaLz','UcjLv','ShowAddedBuff','startInput','performJump','bWlPJ','VisuMZ_1_MainMenuCore','canAttack','border','_appeared','opponentsUnit','_targetSkewX','text','AutoBattleMsg','drawGauge','isRightInputMode','CastAnimation','loadSvEnemy','tWHPN','Duration','isDTB','DisablePartyCmd','_floatHeight','splice','ndTzX','_motionType','updateEffectContainers','getDamageStyle','Game_BattlerBase_die','ShowPopup','MP_Flat','VisuMZ_1_SkillsStatesCore','setBackgroundType','_animationSprites','autoMeleeMultiTargetActionSet','getAttackWeaponAnimationId','ChangeOrderBy','zMvxk','onEnemyCancel','isForAll','drawItemStyleIconText','MDF','TP_Rate','isBattleFlipped','startPartyCommandSelection','RepositionEnemies','match','slices','Game_Action_itemEffectAddNormalState','partyCommandWindowRect','isPreviousSceneBattleTransitionable','HelpSkillType','HelpAutoBattle','min','TUTls','arRedRate','hpDamage','Skills','NewPopupBottom','Window_BattleLog_performMagicEvasion','setupCriticalEffect','DiagK','itemHeight','drawActorFace','callOkHandler','AllowCollapse','_baseX','waitForEffect','ShowActorGauge','bDfKe','LUK','JS\x20%1REGENERATE','JS\x20ESCAPE\x20SUCCESS','ShowCurrentState','_createCursorArea','Rlygl','CastMagical','aMPAD','JNTbw','partyCommandWindowRectDefaultStyle','extraHeight','ActSeq_ChangeSkew','getLastPluginCommandInterpreter','YQVVJ','ParseEnemyNotetags','AddOption','isFriendly','createHelpWindowBattleCore','addSkillCommands','StepDistanceY','isAnyoneChangingOpacity','onMoveEnd','reOjx','Interrupt','_updateFilterArea','cameraDuration','Scene_Battle_onActorOk','addImmortal','ZjyyK','alVnM','ActSeq_Skew_WaitForSkew','Game_Battler_regenerateAll','selectNextActor','startDamagePopup','_checkOn','Spriteset_Battle_update','ActionItemMsg','missed','WwoBB','_actor','XPSpriteYLocation','_autoBattleWindow','isMagicSkill','isPartyCommandWindowDisabled','CcZAL','isForFriend','qMZRj','displayCounter','Window_BattleLog_performActionStart','Game_Enemy_setup','POST-','_opacityWholeDuration','initBattleCore','BattleLogRectJS','VisuMZ_2_HorrorEffects','setupBattleCore','updateGrow','Scene_Battle_updateBattleProcess','LKcnH','obbRI','addCommand','startGrow','XPActorDefaultHeight','BattleManager_onEncounter','poCcw','Game_System_initialize','itemEffectAddNormalState','MiSsO','ApplyImmortal','createBattleUIOffsetY','pbyUf','isFlipped','ChantStyle','ShowWeapon','-%1\x20MP','hrDrT','qMhdf','isForOpponent','WaitForZoom','filter','drawSingleSkillCost','MCEXI','ActSeq_Mechanics_RemoveBuffDebuff','eSkxs','makeActionList','setBattleCameraPoint','getNextSubjectFromPool','_flipScaleX','updateBattlebackBitmap1','processBorderActor','processEscape','extraPositionX','isNextScene','ActSeq_Movement_MoveToPoint','Shadow2','maxItems','YpvRh','btitL','Window_ActorCommand_setup','ActionSequence','substitute','replace','Window_ActorCommand_initialize','helpAreaBottom','_battlerName','ActSeq_Movement_HomeReset','damageStyle','parse','resizeWindowBorderStyle','updateMain','mpHealingFmt','actionBattleCoreJS','toUpperCase','reserveCommonEvent','_allTargets','BSitt','shift','gDlfh','requestAnimation','updateEventMain','updateWaitMode','VisuMZ_2_PartySystem','ShowPortraitsBorderStyle','isNextSceneBattleTransitionable','repositionCancelButtonBorderStyle','terminate','boxHeight','PreRegenerateJS','msdzt','battler','currentSymbol','isLearnedSkill','processPostBattleCommonEvents','Game_Action_isForOpponent','mainSpriteHeight','PZcRJ','_jumpMaxHeight','LStot','forceMotion','battleSkew','addSingleSkillCommand','BYbSe','dimColor2','mainSpriteScaleY','setupIconTextPopup','_tpbNeedsPartyCommand','surprise','FaceAway','battlelog','isOnCurrentMap','onEscapeFailure','skillItemWindowRectBorderStyle','vKhPE','Game_BattlerBase_canAttack','process_VisuMZ_BattleCore_Notetags','_commandNameWindow','JS\x20%1END\x20ACTION','_stateIconSprite','setupMotionBlurImpactFilter','Scene_Battle_updateStatusWindowPosition','teGmY','svBattlerShadowVisible','pow','ARRAYSTR','updateAngleCalculations','FEYkI','createJS','RequiresDefeat','TmtBQ','updateStateSprite','endAnimation','WaitCount','turn','ActSeq_Mechanics_Multipliers','_angleDuration','attackStates','_armorPenetration','YtSci','KNKBb','mhp','Nnujf','MohZS','stepBack','kVWQX','getSkillIdWithName','checkCacheKey','PopupPosition','command283','drawItemImage','index','updateWeather','max','LRlsh','_skillIDs','_growX','YMCwH','Scene_Battle_onActorCancel','Window_PartyCommand_initialize','PerformAction','magicSkills','width','aPlRS','isSceneChanging','refresh','setup','svAnchorY','_targetSkewY','STR','CriticalHitRate','iEphM','UNTITLED','playReflection','battleFloat','thrust','MioLj','initMembers','dataId','_autoBattle','addEscapeCommand','canMove','QEmjr','AVJTp','Sprite_Battler_initMembers','setBattleCameraTargets','PrioritySortActors','cjtes','battleAngle','_shake','_inputting','showNormalAnimation','skewDuration','Game_Battler_startTpbTurn','_angleWholeDuration','casting','movement','ActSeq_BattleLog_Refresh','_enemyIDs','process_VisuMZ_BattleCore_TraitObject_Notetags','Sprite_Actor_createStateSprite','changePaintOpacity','_animationCount','Sprite_Actor_initMembers','ETMZd','Qmpdo','_handlers','addGuardCommand','ActSeq_Movement_WaitForSpin','ActSeq_Movement_WaitForOpacity','WaitForMovement','isAtbChargingState','Game_Enemy_transform','Window_BattleLog_performEvasion','_actorSprites','Scene_Battle_createActorCommandWindow','EnableDamageCap','FnBjR','isPartyTpbInputtable','uPJTR','updatePosition','MAT','XStGD','updateJump','ActSeq_Target_PrevTarget','centerFrontViewSprite','CommandAddOptions','updateSkew','moveBattlerDistance','Window_BattleEnemy_show','Sprite_Enemy_setHue','setWaitMode','SkewY','call','WaitForNewLine','makeData','isAlive','clearMotion','swing','loop','isPreviousScene','itemRect','waitForAnimation','validTargets','PostDamageJS','HitFlat','isBattlerFlipped','repeatTargets','Sprite_Battler_updatePosition','processVictory','displaySubstitute','_motion','origin','alive\x20opponents\x20not\x20target','process_VisuMZ_BattleCore_jsFunctions','faEKh','displayEvasion','alive\x20friends','isFightCommandEnabled','deathStateId','_targetGrowY','_waitMode','textSizeEx','createStateSprite','freezeFrame','weaponImageId','Sprite_Enemy_createStateIconSprite','atbInterrupt','applyData','startAttackWeaponAnimation','command3011','gxgED','PostApply%1JS','close','Text','BackColor','ztSbu','visible','forceSelect','csAMC','requestMotion','HnrXl','arPenFlat','PARTY','_updateCursorArea','Strength','ArRedFlat','createEmptyBitmap','updateBossCollapse','drawSkillCost','Game_Troop_setup','contents','eAxGC','WaitForAngle','XPActorCommandLines','Window_BattleLog_performCounter','mainSpriteScaleX','launchBattle','cDxoH','DXthk','MaxLines','yRGwX','BattleManager_selectNextCommand','apply','_growDuration','Sxuip','changeWeather','clearRect','HWSTq','asWNY','setBattleZoom','Parse_Notetags_Targets','CheckMapBattleEventValid','show','registerCommand','HpGauge','ActSeq_Camera_FocusTarget','process_VisuMZ_BattleCore_DamageStyles','process_VisuMZ_BattleCore_CreateRegExp','registerDefeatedEnemy','performCastAnimation','isImmortal','_back2Sprite','getItemDamageAmountTextOriginal','ActSeq_Mechanics_ActionEffect','actorCommandAutoBattle','showEnemyAttackAnimation','DEF','createMainSprite','invokeMagicReflection','wxERj','WmsKx','StartTurnMsg','battleSpriteSkew','startSpin','onJumpEnd','updateForceAction','updateFloat','_forcedBattleLayout','MAXMP','isWaiting','Skill-%1-%2','SkipPartyCmd','<CENTER>%1','startWeaponAnimation','battleCommandName','ActiveTpbOptionsMessage','zXobQ','OKDgX','_battlerContainer','ActSeq_Horror_GlitchRemove','Scene_Battle_terminate','PreStartBattleJS','waitForFloat','WphnV','callUpdateHelp','ARRAYEVAL','getNextSubject','drawItemImageListStyle','updateInterpreter','CommandWidth','isChangingOpacity','reverse','ActSeq_BattleLog_PushBaseLine','enemyId','updateBattlebackBitmap2','trueRandomTarget','SfJka','includes','FaceDirection','createActorCommandWindow','ActSeq_Impact_MotionTrailCreate','VhphP','Parse_Notetags_TraitObjects','FcSKG','stepForward','updateShadowBattleCore','Scene_Battle_createAllWindows','opacity','ChargeRate','createActorCommandWindowBattleCore','front\x20center','selectNextCommand','ShowCritical','createCommandNameWindow','WUVeY','opacityStart','isCancelled','NHIKa','SmoothImage','fight','_effectsContainer','RPEGu','BattleManager_endAction','retreat','zsmog','gRfhD','FocusX','ConvertParams','flashDuration','playEnemyDamage','RTztc','AutoBattleBgType','maxCommands','_skewWholeDuration','cLLOJ','isOptionsCommandAdded','_borderPortraitTargetX','Scene_Battle_onEnemyOk','constructor','updateBattlerContainer','addText','placeGauge','BzIwe','performMiss','_attackAnimationId','drain','updateBattleProcess','logWindowRect','AnimationID','ActionSkillMsg1','MTqWs','requestDragonbonesAnimation','getHardDamageCap','_enemySprites','_requestRefresh','CommandVisible','setupActionSet','Frame','ZzgqH','gainTp','_phase','xUFgK','PreEndBattleJS','zGTVC','AS\x20USER','autoBattleWindowRect','turnCount','isTriggered','EntMc','performMoveToTargets','makeDeepCopy','inBattle','createAnimationContainer','refreshActorPortrait','playEnemyAttack','onEncounter','bgxoU','split','_padding','Sprite_Actor_setBattler','LlWmG','physical','battlerSprites','CmUdY','arPenRate','addOptionsCommand','skillId','Game_Party_removeActor','okButtonText'];(function(_0x1da9d8,_0x561589){const _0x363dde=function(_0x22e61b){while(--_0x22e61b){_0x1da9d8['push'](_0x1da9d8['shift']());}};_0x363dde(++_0x561589);}(_0x5615,0x103));const _0x363d=function(_0x1da9d8,_0x561589){_0x1da9d8=_0x1da9d8-0x0;let _0x363dde=_0x5615[_0x1da9d8];return _0x363dde;};const _0x467fb5=_0x363d;var label='BattleCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x467fb5('0x649')](function(_0xd1e10d){const _0x45c473=_0x467fb5;return _0xd1e10d[_0x45c473('0x27a')]&&_0xd1e10d[_0x45c473('0x325')][_0x45c473('0x790')]('['+label+']');})[0x0];VisuMZ[label][_0x467fb5('0x110')]=VisuMZ[label][_0x467fb5('0x110')]||{},VisuMZ[_0x467fb5('0x7ae')]=function(_0x26801f,_0x4e7d26){const _0x2051ee=_0x467fb5;for(const _0x234b68 in _0x4e7d26){if(_0x2051ee('0x7a1')!==_0x2051ee('0x7a1')){function _0x6e98ba(){const _0x69a8c8=_0x2051ee;return this[_0x69a8c8('0x49d')]();}}else{if(_0x234b68[_0x2051ee('0x5e2')](/(.*):(.*)/i)){const _0x44ed14=String(RegExp['$1']),_0x18ffe2=String(RegExp['$2'])[_0x2051ee('0x66a')]()['trim']();let _0x4f90e1,_0x1e6abd,_0x5e0a90;switch(_0x18ffe2){case _0x2051ee('0x88'):_0x4f90e1=_0x4e7d26[_0x234b68]!==''?Number(_0x4e7d26[_0x234b68]):0x0;break;case _0x2051ee('0x411'):_0x1e6abd=_0x4e7d26[_0x234b68]!==''?JSON[_0x2051ee('0x665')](_0x4e7d26[_0x234b68]):[],_0x4f90e1=_0x1e6abd['map'](_0x25cc06=>Number(_0x25cc06));break;case _0x2051ee('0x8bd'):_0x4f90e1=_0x4e7d26[_0x234b68]!==''?eval(_0x4e7d26[_0x234b68]):null;break;case _0x2051ee('0x784'):_0x1e6abd=_0x4e7d26[_0x234b68]!==''?JSON[_0x2051ee('0x665')](_0x4e7d26[_0x234b68]):[],_0x4f90e1=_0x1e6abd[_0x2051ee('0xae')](_0xca12d8=>eval(_0xca12d8));break;case _0x2051ee('0x88f'):_0x4f90e1=_0x4e7d26[_0x234b68]!==''?JSON[_0x2051ee('0x665')](_0x4e7d26[_0x234b68]):'';break;case'ARRAYJSON':_0x1e6abd=_0x4e7d26[_0x234b68]!==''?JSON[_0x2051ee('0x665')](_0x4e7d26[_0x234b68]):[],_0x4f90e1=_0x1e6abd['map'](_0x5f4116=>JSON[_0x2051ee('0x665')](_0x5f4116));break;case _0x2051ee('0x34a'):_0x4f90e1=_0x4e7d26[_0x234b68]!==''?new Function(JSON[_0x2051ee('0x665')](_0x4e7d26[_0x234b68])):new Function(_0x2051ee('0x2d5'));break;case _0x2051ee('0x513'):_0x1e6abd=_0x4e7d26[_0x234b68]!==''?JSON['parse'](_0x4e7d26[_0x234b68]):[],_0x4f90e1=_0x1e6abd[_0x2051ee('0xae')](_0x5bb6cc=>new Function(JSON['parse'](_0x5bb6cc)));break;case _0x2051ee('0x6c9'):_0x4f90e1=_0x4e7d26[_0x234b68]!==''?String(_0x4e7d26[_0x234b68]):'';break;case _0x2051ee('0x69d'):_0x1e6abd=_0x4e7d26[_0x234b68]!==''?JSON['parse'](_0x4e7d26[_0x234b68]):[],_0x4f90e1=_0x1e6abd[_0x2051ee('0xae')](_0x359064=>String(_0x359064));break;case _0x2051ee('0x2b0'):_0x5e0a90=_0x4e7d26[_0x234b68]!==''?JSON[_0x2051ee('0x665')](_0x4e7d26[_0x234b68]):{},_0x26801f[_0x44ed14]={},VisuMZ['ConvertParams'](_0x26801f[_0x44ed14],_0x5e0a90);continue;case _0x2051ee('0x119'):_0x1e6abd=_0x4e7d26[_0x234b68]!==''?JSON['parse'](_0x4e7d26[_0x234b68]):[],_0x4f90e1=_0x1e6abd[_0x2051ee('0xae')](_0x49e3e8=>VisuMZ[_0x2051ee('0x7ae')]({},JSON[_0x2051ee('0x665')](_0x49e3e8)));break;default:continue;}_0x26801f[_0x44ed14]=_0x4f90e1;}}}return _0x26801f;},(_0x3a8772=>{const _0x3f45ab=_0x467fb5,_0x3fbff4=_0x3a8772[_0x3f45ab('0x22a')];for(const _0x103d75 of dependencies){if(_0x3f45ab('0x238')===_0x3f45ab('0x238')){if(!Imported[_0x103d75]){if('WJhEI'!==_0x3f45ab('0x2c1')){function _0x505b43(){const _0x4c0f07=_0x3f45ab,_0x142ca8=this[_0x4c0f07('0x167')](this['index']());let _0xe07029=this[_0x4c0f07('0x80c')](this['index']());_0xe07029=_0xe07029[_0x4c0f07('0x65f')](/\\I\[(\d+)\]/gi,''),_0x16b61f[_0x4c0f07('0x140')](),this[_0x4c0f07('0x8cd')](_0xe07029,_0x142ca8),this['commandNameWindowDrawText'](_0xe07029,_0x142ca8),this[_0x4c0f07('0x19f')](_0xe07029,_0x142ca8);}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3f45ab('0x11')](_0x3fbff4,_0x103d75)),SceneManager[_0x3f45ab('0x4c5')]();break;}}}else{function _0x43cf85(){const _0x37a2c0=_0x3f45ab;this[_0x37a2c0('0x738')]('guard');}}}const _0x37a299=_0x3a8772['description'];if(_0x37a299[_0x3f45ab('0x5e2')](/\[Version[ ](.*?)\]/i)){const _0x25ac97=Number(RegExp['$1']);if(_0x25ac97!==VisuMZ[label][_0x3f45ab('0xb8')]){if(_0x3f45ab('0x24a')!==_0x3f45ab('0x24a')){function _0x215aeb(){const _0x3f7cb3=_0x3f45ab;if(!_0x162daa[_0x3f7cb3('0xe1')]())return;const _0x4b7f96=this['battler']();if(!_0x4b7f96)return;if(_0x4c3fcd)this[_0x3f7cb3('0x5a3')](_0x2d7660+_0x4b7f96[_0x3f7cb3('0x5f6')],_0x2020c4+_0x4b7f96['_baseY'],![]);_0xe1c69c+=_0x4b7f96[_0x3f7cb3('0x5f6')]-_0x4b7f96[_0x3f7cb3('0x1a')],_0x414d1d+=_0x4b7f96['_baseY']-_0x4b7f96['_homeY'],_0x4b7f96['startMove'](_0x5cd59f,_0x1342e9,_0xa64b24);if(_0x546671['VisuMZ_0_CoreEngine'])_0x4b7f96['setMoveEasingType'](_0x5b6e43||_0x3f7cb3('0x2f7'));}}else alert(_0x3f45ab('0x1e4')[_0x3f45ab('0x11')](_0x3fbff4,_0x25ac97)),SceneManager['exit']();}}if(_0x37a299[_0x3f45ab('0x5e2')](/\[Tier[ ](\d+)\]/i)){const _0x3479ad=Number(RegExp['$1']);if(_0x3479ad<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x3f45ab('0x11')](_0x3fbff4,_0x3479ad,tier)),SceneManager[_0x3f45ab('0x4c5')]();else{if('MVcDy'!==_0x3f45ab('0x36a'))tier=Math[_0x3f45ab('0x6b9')](_0x3479ad,tier);else{function _0x26bf8a(){const _0x2bd291=_0x3f45ab;if(!_0x3feca0[_0x2bd291('0xe1')]())return;const _0x566c60=this[_0x2bd291('0x67b')]();if(!_0x566c60)return;_0x566c60[_0x2bd291('0x76e')](_0x4a3735,_0x16db35,_0x1cbe9b,_0x5cbe65);}}}}VisuMZ[_0x3f45ab('0x7ae')](VisuMZ[label]['Settings'],_0x3a8772[_0x3f45ab('0x20e')]);})(pluginData),VisuMZ[_0x467fb5('0x3a1')]=function(_0x5a60bc){const _0x2c5c50=_0x467fb5;let _0x4d65a3=[];for(const _0x49b228 of _0x5a60bc){if(_0x2c5c50('0x4f9')!==_0x2c5c50('0x4f9')){function _0x2f8d48(){const _0x40847d=_0x2c5c50;return this[_0x40847d('0x5c8')]();}}else _0x4d65a3=_0x4d65a3[_0x2c5c50('0x112')](VisuMZ['ConvertActionSequenceTarget'](_0x49b228));}return _0x4d65a3[_0x2c5c50('0x649')](_0x5e53c2=>_0x5e53c2);},VisuMZ[_0x467fb5('0x583')]=function(_0x5cd8ed){const _0x8bb006=_0x467fb5,_0x1e8126=BattleManager[_0x8bb006('0x294')]()[_0x8bb006('0x649')](_0x11e205=>_0x11e205&&_0x11e205[_0x8bb006('0x45f')]()),_0x51e0c2=BattleManager[_0x8bb006('0x3c0')],_0xdc44dc=BattleManager['_target'],_0x53bdfd=BattleManager['_allTargets']?BattleManager[_0x8bb006('0x66c')]['slice'](0x0):_0x1e8126;_0x5cd8ed=_0x5cd8ed[_0x8bb006('0x118')]()['trim']();if(_0x5cd8ed===_0x8bb006('0x3c'))return[_0x51e0c2];else{if(_0x5cd8ed===_0x8bb006('0x41d')){if(_0x8bb006('0x4a5')===_0x8bb006('0x378')){function _0x57eee9(){const _0x3770be=_0x8bb006;if(this['battleLayoutStyle']()===_0x3770be('0x5bc'))return this['skillItemWindowRectBorderStyle']();else return this['isSkillItemWindowsMiddle']()?this[_0x3770be('0x416')]():_0x20eb49[_0x3770be('0x15b')][_0x3770be('0x5a8')][_0x3770be('0x709')](this);}}else return[_0xdc44dc];}else{if(_0x5cd8ed===_0x8bb006('0xf9')){if(_0xdc44dc){const _0x223a2b=_0x53bdfd[_0x8bb006('0x2d9')](_0xdc44dc);return _0x223a2b>=0x0?[_0x53bdfd[_0x223a2b-0x1]||_0xdc44dc]:[_0xdc44dc];}}else{if(_0x5cd8ed===_0x8bb006('0xa')){if(_0xdc44dc){if('pzYsT'==='rTZkz'){function _0x4e4473(){const _0x4b78ff=_0x8bb006;if(!_0x58b9d5[_0x4b78ff('0xe1')]())return;const _0x20693f=this[_0x4b78ff('0x67b')](),_0x1e74aa=_0x13d8b7[_0x4b78ff('0x67b')]();if(!_0x20693f||!_0x1e74aa)return;const _0x5c146c=_0x1e74aa[_0x4b78ff('0x5f6')],_0x30dd4c=_0x1e74aa[_0x4b78ff('0x345')];this[_0x4b78ff('0x20a')](_0x5c146c,_0x30dd4c,0x0,![],_0x4b78ff('0x2f7'),-0x1),_0x20693f[_0x4b78ff('0x6fc')]();const _0x4795fb=_0x444a79[_0x4b78ff('0x15b')]['Settings'][_0x4b78ff('0x65d')];let _0x463cf1=(_0x1e74aa[_0x4b78ff('0x6c2')]+_0x20693f['width'])/0x2;_0x463cf1*=this[_0x4b78ff('0x317')]()?0x1:-0x1;let _0x4240a0=_0x4795fb[_0x4b78ff('0x60d')]*(this[_0x4b78ff('0x317')]()?0x1:-0x1);_0x1efb80[_0x4b78ff('0x704')](_0x463cf1,_0x4240a0,0x0,![],_0x4b78ff('0x2f7')),_0x1e74aa[_0x4b78ff('0x6fc')]();}}else{const _0x5af92f=_0x53bdfd['indexOf'](_0xdc44dc);return _0x5af92f>=0x0?[_0x53bdfd[_0x5af92f+0x1]||_0xdc44dc]:[_0xdc44dc];}}}else{if(_0x5cd8ed===_0x8bb006('0x388'))return _0x53bdfd;else{if(_0x5cd8ed==='focus')return[_0x51e0c2][_0x8bb006('0x112')](_0x53bdfd);else{if(_0x5cd8ed==='not\x20focus'){if('pxoSR'!==_0x8bb006('0x510'))return _0x1e8126[_0x8bb006('0x649')](_0x333c8b=>_0x333c8b!==_0x51e0c2&&!_0x53bdfd[_0x8bb006('0x790')](_0x333c8b)&&_0x333c8b['notFocusValid']());else{function _0x3878b4(){const _0x501b6f=_0x8bb006;if(this[_0x501b6f('0x226')]===_0xc81978)this[_0x501b6f('0x62e')]();if(!_0x38cfc3)return;if(this[_0x501b6f('0x226')][_0x501b6f('0x790')](_0x3729de))return;this[_0x501b6f('0x226')]['push'](_0x4a5f02),this['_defeatedEnemies']['sort']((_0x70c507,_0x5ae3e4)=>_0x70c507-_0x5ae3e4);}}}}}}}}}if(_0x51e0c2){if(_0x8bb006('0x200')!==_0x8bb006('0x200')){function _0x3df71c(){const _0x1ae720=_0x8bb006;if(!_0x502772[_0x1ae720('0x15b')][_0x1ae720('0x110')][_0x1ae720('0x75b')][_0x1ae720('0xf5')])return;const _0x17dc91=_0x10e739[_0x1ae720('0x5ae')],_0x4d7217='visualHpGauge';this[_0x1ae720('0x636')](_0x17dc91,_0x4d7217);}}else{if(_0x5cd8ed===_0x8bb006('0x721')){if(_0x8bb006('0x147')===_0x8bb006('0x8de')){function _0x37e186(){const _0xb660a8=_0x8bb006,_0x32cfdb=this[_0xb660a8('0x68f')]()?this[_0xb660a8('0xe2')]:0x0,_0xe851fb=_0x3b9731['makeDeepCopy'](_0x3c28e1[_0xb660a8('0x34c')]),_0x482a57=_0xe851fb[_0xb660a8('0x828')]-0x1,_0x5902f5={'code':0xbc3,'indent':0x0,'parameters':_0x2eb71a[_0xb660a8('0x7d9')](_0xa44551)};_0xe851fb[_0xb660a8('0x5cb')](_0x482a57,0x0,_0x5902f5),this[_0xb660a8('0x55a')](_0xe851fb,_0x32cfdb);}}else return _0x51e0c2[_0x8bb006('0x4b6')]()[_0x8bb006('0x4dd')]();}else{if(_0x5cd8ed===_0x8bb006('0x547'))return _0x51e0c2[_0x8bb006('0x4b6')]()[_0x8bb006('0x4dd')]()[_0x8bb006('0x649')](_0x2de988=>_0x2de988!==_0x51e0c2);else{if(_0x5cd8ed==='alive\x20friends\x20not\x20target')return _0x51e0c2[_0x8bb006('0x4b6')]()['aliveMembers']()[_0x8bb006('0x649')](_0x598c1d=>_0x598c1d!==_0xdc44dc);else{if(_0x5cd8ed===_0x8bb006('0x12b'))return _0x51e0c2[_0x8bb006('0x4b6')]()[_0x8bb006('0x80a')]();else{if(_0x5cd8ed[_0x8bb006('0x5e2')](/FRIEND INDEX (\d+)/i)){if(_0x8bb006('0x53f')!==_0x8bb006('0x67a')){const _0x139357=Number(RegExp['$1']);return[_0x51e0c2[_0x8bb006('0x4b6')]()[_0x8bb006('0x4f')]()[_0x139357]];}else{function _0x2ff029(){const _0x1fa21a=_0x8bb006;return _0x4e14da[_0x1fa21a('0x15b')][_0x1fa21a('0x110')]['ActorCmd'][_0x1fa21a('0x4e0')];}}}}}}}if(_0x5cd8ed===_0x8bb006('0x80f'))return _0x51e0c2[_0x8bb006('0x5be')]()['aliveMembers']();else{if(_0x5cd8ed===_0x8bb006('0x71d'))return _0x51e0c2['opponentsUnit']()['aliveMembers']()['filter'](_0x500131=>_0x500131!==_0xdc44dc);else{if(_0x5cd8ed===_0x8bb006('0x507')){if(_0x8bb006('0x196')==='haqEv')return _0x51e0c2[_0x8bb006('0x5be')]()[_0x8bb006('0x80a')]();else{function _0x1aecfa(){const _0x2ccc98=_0x8bb006;let _0xaab1fa=this[_0x2ccc98('0x64')](_0x45c76d);const _0x9559b7=this['fontSize'](),_0x3b57b9=_0x167f7a[_0x2ccc98('0x100')](_0x9559b7*0.75);for(let _0x5bad0c=0x0;_0x5bad0c<_0xaab1fa['length'];_0x5bad0c++){const _0x1cef98=this[_0x2ccc98('0x324')](_0x3b57b9,_0x9559b7);_0x1cef98[_0x2ccc98('0x30a')][_0x2ccc98('0x2c4')](_0xaab1fa[_0x5bad0c],0x0,0x0,_0x3b57b9,_0x9559b7,_0x2ccc98('0x1f1')),_0x1cef98['x']=(_0x5bad0c-(_0xaab1fa['length']-0x1)/0x2)*_0x3b57b9,_0x1cef98['dy']=-_0x5bad0c;}}}}else{if(_0x5cd8ed[_0x8bb006('0x5e2')](/OPPONENT INDEX (\d+)/i)){const _0xa6cee=Number(RegExp['$1']);return[_0x51e0c2[_0x8bb006('0x5be')]()[_0x8bb006('0x4f')]()[_0xa6cee]];}}}}}}if(_0x5cd8ed==='alive\x20actors')return $gameParty[_0x8bb006('0x4dd')]();else{if(_0x5cd8ed===_0x8bb006('0x499'))return $gameParty['aliveMembers']()[_0x8bb006('0x649')](_0x56ac8a=>_0x56ac8a!==_0x51e0c2);else{if(_0x5cd8ed==='alive\x20actors\x20not\x20target'){if(_0x8bb006('0x3a8')!==_0x8bb006('0x545'))return $gameParty[_0x8bb006('0x4dd')]()[_0x8bb006('0x649')](_0x2ecb93=>_0x2ecb93!==_0xdc44dc);else{function _0x5b8f04(){const _0x360d03=_0x8bb006;_0x3f8d01[_0x360d03('0x15b')]['BattleManager_initMembers'][_0x360d03('0x709')](this),this[_0x360d03('0x291')]=[];}}}else{if(_0x5cd8ed===_0x8bb006('0x3b6'))return $gameParty[_0x8bb006('0x80a')]();else{if(_0x5cd8ed['match'](/ACTOR INDEX (\d+)/i)){if(_0x8bb006('0x6d6')===_0x8bb006('0xa2')){function _0x3c4711(){const _0x17558d=_0x8bb006;this[_0x17558d('0x625')]()?this[_0x17558d('0x327')]():_0x1b989e[_0x17558d('0x15b')][_0x17558d('0x30b')][_0x17558d('0x709')](this);}}else{const _0x20bcc7=Number(RegExp['$1']);return[$gameParty[_0x8bb006('0x4f')]()[_0x20bcc7]];}}else{if(_0x5cd8ed[_0x8bb006('0x5e2')](/ACTOR ID (\d+)/i)){if(_0x8bb006('0x82f')===_0x8bb006('0x82f')){const _0x4be465=Number(RegExp['$1']);return[$gameActors[_0x8bb006('0x23')](_0x4be465)];}else{function _0x360209(){const _0x1c51f0=_0x8bb006;this[_0x1c51f0('0x3bc')]=0x0;}}}}}}}}if(_0x5cd8ed===_0x8bb006('0x1d5'))return $gameTroop['aliveMembers']();else{if(_0x5cd8ed===_0x8bb006('0x8c3'))return $gameTroop[_0x8bb006('0x4dd')]()[_0x8bb006('0x649')](_0x32fda9=>_0x32fda9!==_0x51e0c2);else{if(_0x5cd8ed===_0x8bb006('0x8b9')){if(_0x8bb006('0x5b5')==='PwEOu'){function _0x250d5a(){const _0x211d47=_0x8bb006;if(!_0x4ee008[_0x211d47('0x21')]())return;const _0x2e13aa=_0x4bdf55[_0x211d47('0x606')]();if(!_0x2e13aa)return;_0x2e13aa['setWaitMode'](_0x211d47('0x4f4'));}}else return $gameTroop[_0x8bb006('0x4dd')]()[_0x8bb006('0x649')](_0x291ce4=>_0x291ce4!==_0xdc44dc);}else{if(_0x5cd8ed===_0x8bb006('0x892'))return $gameTroop[_0x8bb006('0x80a')]();else{if(_0x5cd8ed[_0x8bb006('0x5e2')](/ENEMY INDEX (\d+)/i)){const _0x18d260=Number(RegExp['$1']);return[$gameTroop['members']()[_0x18d260]];}else{if(_0x5cd8ed[_0x8bb006('0x5e2')](/ENEMY ID (\d+)/i)){const _0x5974da=Number(RegExp['$1']);return $gameTroop[_0x8bb006('0x4dd')]()[_0x8bb006('0x649')](_0x1ee65a=>_0x1ee65a[_0x8bb006('0x78c')]()===_0x5974da);}}}}}}if(_0x5cd8ed===_0x8bb006('0x2de'))return _0x1e8126[_0x8bb006('0x649')](_0xe839f4=>_0xe839f4[_0x8bb006('0x70c')]());else{if(_0x5cd8ed===_0x8bb006('0x523'))return _0x1e8126[_0x8bb006('0x649')](_0x159a24=>_0x159a24[_0x8bb006('0x70c')]()&&_0x159a24!==_0x51e0c2);else{if(_0x5cd8ed===_0x8bb006('0x4b'))return _0x1e8126['filter'](_0x3a9286=>_0x3a9286['isAlive']()&&_0x3a9286!==_0xdc44dc);else{if(_0x5cd8ed===_0x8bb006('0x88c')){if(_0x8bb006('0x417')===_0x8bb006('0x589')){function _0x338812(){return![];}}else return _0x1e8126[_0x8bb006('0x649')](_0x28ff43=>_0x28ff43[_0x8bb006('0xb2')]());}}}}return[];},PluginManager['registerCommand'](pluginData['name'],'ActSeq_Set_SetupAction',_0x19e24f=>{const _0x2d0692=_0x467fb5;if(!SceneManager[_0x2d0692('0x21')]())return;VisuMZ[_0x2d0692('0x7ae')](_0x19e24f,_0x19e24f);const _0x4332ba=$gameTemp['getLastPluginCommandInterpreter'](),_0x185c70=BattleManager[_0x2d0692('0x198')],_0x1dbbc4=BattleManager[_0x2d0692('0x3c0')],_0x41d131=BattleManager['_allTargets']?BattleManager['_allTargets'][_0x2d0692('0x85e')](0x0):[],_0x2558d2=BattleManager[_0x2d0692('0x27d')];if(!_0x4332ba||!_0x185c70||!_0x1dbbc4)return;if(!_0x185c70[_0x2d0692('0x19a')]())return;if(_0x19e24f[_0x2d0692('0x4a')])_0x2558d2['displayAction'](_0x1dbbc4,_0x185c70[_0x2d0692('0x19a')]());_0x19e24f[_0x2d0692('0x63e')]&&_0x2558d2[_0x2d0692('0x26f')](_0x2d0692('0x819'),_0x1dbbc4,_0x41d131,!![]);if(_0x19e24f['ActionStart'])_0x2558d2['push'](_0x2d0692('0x15d'),_0x1dbbc4,_0x185c70);if(_0x19e24f[_0x2d0692('0x6f2')])_0x2558d2[_0x2d0692('0x26f')](_0x2d0692('0x284'));if(_0x19e24f[_0x2d0692('0x5c4')])_0x2558d2[_0x2d0692('0x26f')](_0x2d0692('0x760'),_0x1dbbc4,_0x185c70);if(_0x19e24f[_0x2d0692('0x42c')])_0x2558d2['push'](_0x2d0692('0x712'));_0x4332ba['setWaitMode']('battlelog');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x173'),_0x48f6f3=>{const _0x332f56=_0x467fb5;if(!SceneManager[_0x332f56('0x21')]())return;VisuMZ[_0x332f56('0x7ae')](_0x48f6f3,_0x48f6f3);const _0x3e18fd=$gameTemp[_0x332f56('0x606')](),_0x389195=BattleManager['_action'],_0x2dbca2=BattleManager['_subject'],_0x1e74f4=BattleManager[_0x332f56('0x66c')]?BattleManager[_0x332f56('0x66c')][_0x332f56('0x85e')](0x0):[],_0x439672=BattleManager[_0x332f56('0x27d')];if(!_0x3e18fd||!_0x389195||!_0x2dbca2)return;if(!_0x389195[_0x332f56('0x19a')]())return;if(_0x48f6f3[_0x332f56('0x6c0')])_0x439672[_0x332f56('0x26f')](_0x332f56('0xad'),_0x2dbca2,_0x389195);if(_0x48f6f3[_0x332f56('0x6a5')]>0x0)_0x439672[_0x332f56('0x26f')](_0x332f56('0x8a5'),_0x48f6f3[_0x332f56('0x6a5')]);if(_0x48f6f3[_0x332f56('0x252')])_0x439672[_0x332f56('0x26f')](_0x332f56('0x569'),_0x2dbca2,_0x1e74f4,_0x389195[_0x332f56('0x19a')]()['animationId']);if(_0x48f6f3['WaitForAnimation'])_0x439672[_0x332f56('0x26f')](_0x332f56('0x712'));for(const _0x527688 of _0x1e74f4){if(!_0x527688)continue;if(_0x48f6f3[_0x332f56('0x285')])_0x439672[_0x332f56('0x26f')]('actionEffect',_0x2dbca2,_0x527688);}if(_0x48f6f3['ApplyImmortal'])_0x439672[_0x332f56('0x26f')](_0x332f56('0x819'),_0x2dbca2,_0x1e74f4,![]);_0x3e18fd[_0x332f56('0x707')](_0x332f56('0x68e'));}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Set_TargetActionSet',_0x3bc811=>{const _0x499fa1=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x499fa1('0x7ae')](_0x3bc811,_0x3bc811);const _0xf2602f=$gameTemp[_0x499fa1('0x606')](),_0x58c3ee=BattleManager[_0x499fa1('0x198')],_0x459de2=BattleManager[_0x499fa1('0x3c0')],_0x34e790=BattleManager[_0x499fa1('0x66c')]?BattleManager[_0x499fa1('0x66c')][_0x499fa1('0x85e')](0x0):[],_0x15491b=BattleManager[_0x499fa1('0x27d')];if(!_0xf2602f||!_0x58c3ee||!_0x459de2)return;if(!_0x58c3ee[_0x499fa1('0x19a')]())return;for(const _0x344a0a of _0x34e790){if(_0x499fa1('0x7b5')===_0x499fa1('0x7b5')){if(!_0x344a0a)continue;if(_0x3bc811[_0x499fa1('0x6c0')])_0x15491b[_0x499fa1('0x26f')](_0x499fa1('0xad'),_0x459de2,_0x58c3ee);if(_0x3bc811[_0x499fa1('0x38f')]>0x0)_0x15491b['push']('waitCount',_0x3bc811[_0x499fa1('0x38f')]);if(_0x3bc811[_0x499fa1('0x252')])_0x15491b[_0x499fa1('0x26f')](_0x499fa1('0x569'),_0x459de2,[_0x344a0a],_0x58c3ee[_0x499fa1('0x19a')]()[_0x499fa1('0x274')]);if(_0x3bc811[_0x499fa1('0x522')]>0x0)_0x15491b['push'](_0x499fa1('0x8a5'),_0x3bc811[_0x499fa1('0x522')]);if(_0x3bc811[_0x499fa1('0x285')])_0x15491b[_0x499fa1('0x26f')]('actionEffect',_0x459de2,_0x344a0a);}else{function _0x1793c1(){const _0x10f2ca=_0x499fa1;return this[_0x10f2ca('0x11c')]()?this[_0x10f2ca('0x311')][_0x10f2ca('0xfe')]():!![];}}}if(_0x3bc811['ApplyImmortal'])_0x15491b[_0x499fa1('0x26f')](_0x499fa1('0x819'),_0x459de2,_0x34e790,![]);_0xf2602f[_0x499fa1('0x707')](_0x499fa1('0x68e'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x39a'),_0x2dbac=>{const _0x463905=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x463905('0x7ae')](_0x2dbac,_0x2dbac);const _0x3dc1df=$gameTemp[_0x463905('0x606')](),_0x38462e=BattleManager['_action'],_0x108265=BattleManager[_0x463905('0x3c0')],_0x3a5529=BattleManager['_allTargets']?BattleManager[_0x463905('0x66c')][_0x463905('0x85e')](0x0):[],_0x1b1259=BattleManager['_logWindow'];if(!_0x3dc1df||!_0x38462e||!_0x108265)return;if(!_0x38462e[_0x463905('0x19a')]())return;if(_0x2dbac[_0x463905('0x63e')])_0x1b1259[_0x463905('0x26f')](_0x463905('0x819'),_0x108265,_0x3a5529,![]);if(_0x2dbac[_0x463905('0x70a')])_0x1b1259[_0x463905('0x26f')](_0x463905('0x7f'));if(_0x2dbac['WaitForEffect'])_0x1b1259[_0x463905('0x26f')](_0x463905('0x5f7'));if(_0x2dbac['ClearBattleLog'])_0x1b1259[_0x463905('0x26f')](_0x463905('0x418'));if(_0x2dbac['ActionEnd'])_0x1b1259[_0x463905('0x26f')]('performActionEnd',_0x108265);if(_0x2dbac[_0x463905('0x6f2')])_0x1b1259[_0x463905('0x26f')](_0x463905('0x284'));_0x3dc1df['setWaitMode'](_0x463905('0x68e'));}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x335'),_0x112b88=>{const _0x1869aa=_0x467fb5;if(!SceneManager[_0x1869aa('0x21')]())return;if(!Imported[_0x1869aa('0x50c')])return;VisuMZ[_0x1869aa('0x7ae')](_0x112b88,_0x112b88);const _0x4d4daa=$gameTemp[_0x1869aa('0x606')](),_0x17d6f8=_0x112b88[_0x1869aa('0x745')];if(!_0x4d4daa)return;$gameScreen['setBattleAngle'](_0x112b88[_0x1869aa('0x536')],_0x112b88[_0x1869aa('0x5c7')],_0x112b88[_0x1869aa('0x1aa')]);if(_0x17d6f8)_0x4d4daa[_0x1869aa('0x707')]('battleAngle');}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x1e9'),_0x227aa7=>{const _0x459566=_0x467fb5;if(!SceneManager[_0x459566('0x21')]())return;if(!Imported[_0x459566('0x50c')])return;VisuMZ[_0x459566('0x7ae')](_0x227aa7,_0x227aa7);const _0x3aa1f8=$gameTemp[_0x459566('0x606')](),_0x3acc63=_0x227aa7[_0x459566('0x745')];if(!_0x3aa1f8)return;$gameScreen[_0x459566('0x2e2')](0x0,_0x227aa7[_0x459566('0x5c7')],_0x227aa7[_0x459566('0x1aa')]);if(_0x3acc63)_0x3aa1f8[_0x459566('0x707')](_0x459566('0x6dc'));}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x4d1'),_0x4c5ab1=>{const _0x50291b=_0x467fb5;if(!SceneManager[_0x50291b('0x21')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x133b7e=$gameTemp[_0x50291b('0x606')]();if(!_0x133b7e)return;_0x133b7e['setWaitMode'](_0x50291b('0x6dc'));}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x103'),_0x17e7fa=>{const _0x4a496e=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4a496e('0x7ae')](_0x17e7fa,_0x17e7fa);const _0x4cfa24=$gameTemp[_0x4a496e('0x606')](),_0x383933=BattleManager[_0x4a496e('0x198')],_0x214886=BattleManager[_0x4a496e('0x3c0')],_0x4551c9=VisuMZ[_0x4a496e('0x3a1')](_0x17e7fa[_0x4a496e('0x27f')]),_0xcbec9b=_0x17e7fa[_0x4a496e('0x8ed')],_0x479af2=BattleManager[_0x4a496e('0x27d')];if(!_0x4cfa24||!_0x383933||!_0x214886)return;if(!_0x383933[_0x4a496e('0x19a')]())return;let _0x404860=_0x383933[_0x4a496e('0x19a')]()[_0x4a496e('0x274')];if(_0x404860<0x0)_0x404860=_0x214886[_0x4a496e('0x58a')]();$gameTemp[_0x4a496e('0x670')](_0x4551c9,_0x404860,_0xcbec9b),_0x17e7fa['WaitForAnimation']&&_0x4cfa24[_0x4a496e('0x707')](_0x4a496e('0x8ad'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x8df'),_0x2d5510=>{const _0x1e7639=_0x467fb5;if(!SceneManager[_0x1e7639('0x21')]())return;VisuMZ[_0x1e7639('0x7ae')](_0x2d5510,_0x2d5510);const _0x20db90=$gameTemp['getLastPluginCommandInterpreter'](),_0x310ff0=BattleManager['_subject'],_0x3e9620=VisuMZ[_0x1e7639('0x3a1')](_0x2d5510[_0x1e7639('0x27f')]),_0x25cdc4=_0x2d5510[_0x1e7639('0x8ed')],_0x478e1a=BattleManager[_0x1e7639('0x27d')];if(!_0x20db90||!_0x310ff0)return;const _0x9029c0=_0x310ff0[_0x1e7639('0x58a')]();$gameTemp[_0x1e7639('0x670')](_0x3e9620,_0x9029c0,_0x25cdc4);if(_0x2d5510[_0x1e7639('0x42c')]){if('CwxZB'==='dyVEp'){function _0x1d01ad(){const _0x5c2079=_0x1e7639;this['isShownOnBattlePortrait']()?_0x5d4f23[_0x5c2079('0x26e')][_0x5c2079('0x841')][_0x5c2079('0x2f9')](_0x2733d4):(this[_0x5c2079('0x24b')]()[_0x5c2079('0x55')](_0x38d3a6),this[_0x5c2079('0x16e')][_0x5c2079('0x14e')](_0x21bd25),_0x40b20c[_0x5c2079('0x28f')]());}}else _0x20db90['setWaitMode'](_0x1e7639('0x8ad'));}}),PluginManager['registerCommand'](pluginData['name'],_0x467fb5('0x837'),_0x236f54=>{const _0x20b12b=_0x467fb5;if(!SceneManager[_0x20b12b('0x21')]())return;VisuMZ[_0x20b12b('0x7ae')](_0x236f54,_0x236f54);const _0x15fe3b=$gameTemp[_0x20b12b('0x606')](),_0x52544b=BattleManager[_0x20b12b('0x198')],_0x425d6f=_0x236f54[_0x20b12b('0x8ed')],_0x4cc4ee=VisuMZ['CreateActionSequenceTargets'](_0x236f54['Targets']);if(!_0x15fe3b||!_0x52544b)return;if(!_0x52544b[_0x20b12b('0x19a')]())return;for(const _0x14d434 of _0x4cc4ee){if(_0x20b12b('0x80')!==_0x20b12b('0x80')){function _0x3b7ed1(){const _0x7b0ae5=_0x20b12b;_0x2feb5f=_0x3923c6['x']+_0x14598d[_0x7b0ae5('0x24f')]+0x8;}}else{if(!_0x14d434)continue;_0x14d434[_0x20b12b('0x760')](_0x52544b,_0x425d6f);}}if(_0x236f54[_0x20b12b('0x42c')])_0x15fe3b['setWaitMode'](_0x20b12b('0x8ad'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x47c'),_0x7be470=>{const _0x299ba6=_0x467fb5;VisuMZ[_0x299ba6('0x7ae')](_0x7be470,_0x7be470);const _0x1e141c=$gameTemp[_0x299ba6('0x606')](),_0x396216=VisuMZ[_0x299ba6('0x3a1')](_0x7be470[_0x299ba6('0x27f')]),_0x272925=_0x7be470['Filename'];if(!_0x272925)return;for(const _0x46c712 of _0x396216){if(!_0x46c712)continue;if(!_0x46c712['isActor']())continue;_0x46c712[_0x299ba6('0x3e8')](_0x272925);}}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x1d3'),_0x4948ea=>{const _0x23cc76=_0x467fb5;if(!SceneManager[_0x23cc76('0x21')]())return;VisuMZ['ConvertParams'](_0x4948ea,_0x4948ea);const _0x3fb681=$gameTemp[_0x23cc76('0x606')](),_0x4e826a=VisuMZ['CreateActionSequenceTargets'](_0x4948ea['Targets']),_0x533775=_0x4948ea[_0x23cc76('0x7c3')],_0x45ec66=_0x4948ea[_0x23cc76('0x8ed')];if(!_0x3fb681)return;$gameTemp[_0x23cc76('0x670')](_0x4e826a,_0x533775,_0x45ec66);if(_0x4948ea[_0x23cc76('0x42c')])_0x3fb681[_0x23cc76('0x707')](_0x23cc76('0x8ad'));}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x808'),_0x32655a=>{const _0x7b3216=_0x467fb5;if(!SceneManager['isSceneBattle']())return;const _0x4640f2=$gameTemp[_0x7b3216('0x606')]();if(!_0x4640f2)return;_0x4640f2['setWaitMode']('battleAnimation');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x3b9'),_0x3ae6f0=>{const _0x25c41a=_0x467fb5;if(!SceneManager[_0x25c41a('0x21')]())return;VisuMZ[_0x25c41a('0x7ae')](_0x3ae6f0,_0x3ae6f0);const _0x5ca257=BattleManager[_0x25c41a('0x27d')];_0x5ca257[_0x25c41a('0x7bb')](_0x3ae6f0[_0x25c41a('0x732')]);}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x4fe'),_0x24213d=>{const _0x555ebf=_0x467fb5;if(!SceneManager[_0x555ebf('0x21')]())return;const _0xcd2936=BattleManager[_0x555ebf('0x27d')];_0xcd2936[_0x555ebf('0x418')]();}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],'ActSeq_BattleLog_DisplayAction',_0x5723ee=>{const _0xecc720=_0x467fb5;if(!SceneManager[_0xecc720('0x21')]())return;const _0x31030b=$gameTemp[_0xecc720('0x606')](),_0x4b618f=BattleManager[_0xecc720('0x198')],_0x2a0013=BattleManager[_0xecc720('0x3c0')],_0x4f0fee=BattleManager[_0xecc720('0x27d')];if(!_0x31030b||!_0x4b618f||!_0x2a0013)return;if(!_0x4b618f[_0xecc720('0x19a')]())return;_0x4f0fee[_0xecc720('0x222')](_0x2a0013,_0x4b618f[_0xecc720('0x19a')]()),_0x31030b['setWaitMode'](_0xecc720('0x68e'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x50b'),_0x306a38=>{const _0x531b8b=_0x467fb5;if(!SceneManager[_0x531b8b('0x21')]())return;const _0x4192ee=BattleManager[_0x531b8b('0x27d')];_0x4192ee['popBaseLine']();}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x78b'),_0x50f50f=>{const _0x4751b7=_0x467fb5;if(!SceneManager[_0x4751b7('0x21')]())return;const _0x593054=BattleManager[_0x4751b7('0x27d')];_0x593054[_0x4751b7('0x420')]();}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x6e5'),_0x22fa68=>{const _0x1f7cb0=_0x467fb5;if(!SceneManager[_0x1f7cb0('0x21')]())return;const _0x29ee82=BattleManager[_0x1f7cb0('0x27d')];_0x29ee82['refresh']();}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],'ActSeq_BattleLog_UI',_0x3b7507=>{const _0x570e15=_0x467fb5;if(!SceneManager[_0x570e15('0x21')]())return;VisuMZ[_0x570e15('0x7ae')](_0x3b7507,_0x3b7507),SceneManager[_0x570e15('0x26e')][_0x570e15('0x421')](_0x3b7507[_0x570e15('0x2cd')]);}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x55c'),_0x181097=>{const _0x14c24d=_0x467fb5;if(!SceneManager[_0x14c24d('0x21')]())return;const _0x51c65b=$gameTemp[_0x14c24d('0x606')]();_0x51c65b[_0x14c24d('0x707')](_0x14c24d('0x68e'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x31c'),_0x5da4ec=>{const _0x3310c3=_0x467fb5;if(!SceneManager[_0x3310c3('0x21')]())return;const _0x1b2166=$gameTemp[_0x3310c3('0x606')](),_0x25f7fd=BattleManager['_logWindow'];_0x25f7fd[_0x3310c3('0x7f')](),_0x1b2166[_0x3310c3('0x707')](_0x3310c3('0x68e'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Camera_Clamp',_0x74bda=>{const _0x3a6df5=_0x467fb5;if(!SceneManager[_0x3a6df5('0x21')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x3a6df5('0x7ae')](_0x74bda,_0x74bda);const _0x30c9e3=$gameScreen['battleCameraData']();_0x30c9e3['cameraClamp']=_0x74bda[_0x3a6df5('0xc0')];}),PluginManager['registerCommand'](pluginData['name'],_0x467fb5('0x487'),_0x271372=>{const _0x55088c=_0x467fb5;if(!SceneManager[_0x55088c('0x21')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x55088c('0x7ae')](_0x271372,_0x271372);const _0x38a7af=$gameTemp['getLastPluginCommandInterpreter'](),_0x2d2550=_0x271372['WaitForCamera'];$gameScreen[_0x55088c('0x64f')](_0x271372[_0x55088c('0x7ad')],_0x271372[_0x55088c('0x21b')],_0x271372['Duration'],_0x271372[_0x55088c('0x1aa')]);if(_0x2d2550)_0x38a7af['setWaitMode'](_0x55088c('0x1'));}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x75c'),_0x4fea9d=>{const _0x4b7f69=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x4fea9d,_0x4fea9d);const _0x468a8e=$gameTemp[_0x4b7f69('0x606')](),_0x55fe9d=VisuMZ['CreateActionSequenceTargets'](_0x4fea9d[_0x4b7f69('0x27f')]),_0x4eabba=_0x4fea9d[_0x4b7f69('0x8d7')];$gameScreen[_0x4b7f69('0x6d9')](_0x55fe9d,_0x4fea9d[_0x4b7f69('0x5c7')],_0x4fea9d[_0x4b7f69('0x1aa')]);if(_0x4eabba)_0x468a8e[_0x4b7f69('0x707')]('battleCamera');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x880'),_0x566fc0=>{const _0x5daae8=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x5daae8('0x50c')])return;VisuMZ[_0x5daae8('0x7ae')](_0x566fc0,_0x566fc0);const _0x4c2c69=$gameTemp['getLastPluginCommandInterpreter'](),_0x90cde3=_0x566fc0['WaitForCamera'];$gameScreen['setBattleCameraOffset'](_0x566fc0[_0x5daae8('0x4f2')],_0x566fc0[_0x5daae8('0x101')],_0x566fc0['Duration'],_0x566fc0[_0x5daae8('0x1aa')]);if(_0x90cde3)_0x4c2c69[_0x5daae8('0x707')]('battleCamera');}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x5a5'),_0x167dae=>{const _0x4a7182=_0x467fb5;if(!SceneManager[_0x4a7182('0x21')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ['ConvertParams'](_0x167dae,_0x167dae);const _0x6b9fa0=$gameTemp['getLastPluginCommandInterpreter'](),_0x2159eb=_0x167dae[_0x4a7182('0x2f1')],_0x4dacb6=_0x167dae[_0x4a7182('0x815')],_0x37891f=_0x167dae[_0x4a7182('0x8d7')];if(_0x2159eb){const _0x218492=Math[_0x4a7182('0x1b2')](Graphics[_0x4a7182('0x6c2')]/0x2),_0x1bfbc8=Math[_0x4a7182('0x1b2')](Graphics[_0x4a7182('0x41e')]/0x2);$gameScreen[_0x4a7182('0x64f')](_0x218492,_0x1bfbc8,_0x167dae[_0x4a7182('0x5c7')],_0x167dae[_0x4a7182('0x1aa')]);}if(_0x4dacb6){if(_0x4a7182('0x69f')==='FEYkI')$gameScreen[_0x4a7182('0x8a8')](0x0,0x0,_0x167dae[_0x4a7182('0x5c7')],_0x167dae[_0x4a7182('0x1aa')]);else{function _0x49432c(){const _0x12fb5d=_0x4a7182;this[_0x12fb5d('0x707')]('float');}}}if(_0x37891f)_0x6b9fa0[_0x4a7182('0x707')](_0x4a7182('0x1'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x4e'),_0x3fcc83=>{const _0x55712c=_0x467fb5;if(!SceneManager[_0x55712c('0x21')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x58b9ed=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x58b9ed)return;_0x58b9ed[_0x55712c('0x707')]('battleCamera');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x32b'),_0x108a72=>{const _0x18decc=_0x467fb5;if(!SceneManager[_0x18decc('0x21')]())return;if(!Imported['VisuMZ_2_DragonbonesUnion'])return;VisuMZ[_0x18decc('0x7ae')](_0x108a72,_0x108a72);const _0x47ae36=VisuMZ['CreateActionSequenceTargets'](_0x108a72[_0x18decc('0x27f')]),_0x25dc1e=_0x108a72[_0x18decc('0x3cd')][_0x18decc('0x118')]()['trim']();for(const _0x534d9e of _0x47ae36){if(!_0x534d9e)continue;_0x534d9e[_0x18decc('0x7c6')](_0x25dc1e);}}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x8bb'),_0x2a5096=>{const _0x35a084=_0x467fb5;if(!SceneManager[_0x35a084('0x21')]())return;if(!Imported[_0x35a084('0x24e')])return;VisuMZ['ConvertParams'](_0x2a5096,_0x2a5096);const _0x188634=VisuMZ['CreateActionSequenceTargets'](_0x2a5096[_0x35a084('0x27f')]),_0x322b78=_0x2a5096['TimeScale'];for(const _0x48c21f of _0x188634){if(_0x35a084('0x54c')!==_0x35a084('0x54c')){function _0x57abeb(){const _0x2c3d0b=_0x35a084;this[_0x2c3d0b('0x46a')]();}}else{if(!_0x48c21f)continue;_0x48c21f['dragonbonesData']()[_0x35a084('0x863')]=_0x322b78;}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x395'),_0x58ec97=>{const _0x2c7522=_0x467fb5;if(!SceneManager[_0x2c7522('0x21')]())return;if(!Imported[_0x2c7522('0x186')])return;VisuMZ['ConvertParams'](_0x58ec97,_0x58ec97);const _0x2d0f96=BattleManager[_0x2c7522('0x198')],_0x5c60ca=_0x58ec97[_0x2c7522('0x4fc')];if(!_0x2d0f96)return;_0x2d0f96[_0x2c7522('0x7c')]=_0x5c60ca;}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x59b'),_0x16ee92=>{const _0x1ddb1d=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x1ddb1d('0x186')])return;const _0x11b619=BattleManager[_0x1ddb1d('0x198')];if(!_0x11b619)return;_0x11b619[_0x1ddb1d('0x3ed')]();}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x4de'),_0x374126=>{const _0x3ab0c0=_0x467fb5;if(!SceneManager[_0x3ab0c0('0x21')]())return;if(!Imported[_0x3ab0c0('0x186')])return;VisuMZ[_0x3ab0c0('0x7ae')](_0x374126,_0x374126);const _0x1f13a4=BattleManager[_0x3ab0c0('0x198')],_0x4d3725=_0x374126[_0x3ab0c0('0x4fc')];if(!_0x1f13a4)return;_0x1f13a4['_battleCoreForcedElements']=_0x4d3725;}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],'ActSeq_Element_NullElements',_0x522b07=>{const _0x136ec5=_0x467fb5;if(!SceneManager[_0x136ec5('0x21')]())return;if(!Imported[_0x136ec5('0x186')])return;const _0x5b984c=BattleManager[_0x136ec5('0x198')];if(!_0x5b984c)return;_0x5b984c[_0x136ec5('0x89e')]=!![];}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x551'),_0x4caeb4=>{const _0x7dcd16=_0x467fb5;if(!Imported[_0x7dcd16('0x630')])return;if(!SceneManager[_0x7dcd16('0x21')]())return;VisuMZ[_0x7dcd16('0x7ae')](_0x4caeb4,_0x4caeb4);const _0x1a6bc5=VisuMZ[_0x7dcd16('0x3a1')](_0x4caeb4[_0x7dcd16('0x27f')]);for(const _0x2d7b61 of _0x1a6bc5){if(_0x7dcd16('0x3d8')!=='tNbCJ'){if(!_0x2d7b61)continue;_0x2d7b61[_0x7dcd16('0x464')](_0x7dcd16('0x2e5')),_0x2d7b61[_0x7dcd16('0x464')]('glitch'),_0x2d7b61[_0x7dcd16('0x464')]('tv'),_0x2d7b61[_0x7dcd16('0x30d')]();}else{function _0x494df3(){const _0x368369=_0x7dcd16;return this[_0x368369('0x4d4')]()?this['currentAction']()&&this[_0x368369('0x530')]()[_0x368369('0x19a')]()&&this[_0x368369('0x530')]()[_0x368369('0x888')]():this[_0x368369('0x530')]()&&this[_0x368369('0x530')]()[_0x368369('0x19a')]()&&this[_0x368369('0x530')]()['isMagicSkill']();}}}$gamePlayer[_0x7dcd16('0x6c5')]();}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x54e'),_0x1e9342=>{const _0x14a370=_0x467fb5;if(!Imported[_0x14a370('0x630')])return;if(!SceneManager[_0x14a370('0x21')]())return;VisuMZ[_0x14a370('0x7ae')](_0x1e9342,_0x1e9342);const _0x367ee7=VisuMZ[_0x14a370('0x3a1')](_0x1e9342['Targets']),_0x5e130d='glitch';_0x1e9342['sliceMin']=Math['ceil'](_0x1e9342[_0x14a370('0x5e3')]/0x2),_0x1e9342[_0x14a370('0x106')]=_0x1e9342[_0x14a370('0x5e3')],_0x1e9342[_0x14a370('0x593')]=!![];for(const _0x540c8e of _0x367ee7){if(!_0x540c8e)continue;_0x540c8e[_0x14a370('0x357')](_0x5e130d,_0x1e9342);}$gamePlayer[_0x14a370('0x6c5')]();}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x77e'),_0x497604=>{const _0x227b15=_0x467fb5;if(!Imported[_0x227b15('0x630')])return;if(!SceneManager[_0x227b15('0x21')]())return;VisuMZ[_0x227b15('0x7ae')](_0x497604,_0x497604);const _0x50430b=VisuMZ['CreateActionSequenceTargets'](_0x497604[_0x227b15('0x27f')]);for(const _0x387fde of _0x50430b){if(_0x227b15('0x9a')==='DlKbP'){function _0x4deaae(){const _0x102f84=_0x227b15;this[_0x102f84('0x408')]=!![];}}else{if(!_0x387fde)continue;_0x387fde['removeHorrorEffect']('glitch');}}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x367'),_0x52efbd=>{const _0x9b159d=_0x467fb5;if(!Imported[_0x9b159d('0x630')])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x9b159d('0x7ae')](_0x52efbd,_0x52efbd);const _0x3cbb9e=VisuMZ[_0x9b159d('0x3a1')](_0x52efbd[_0x9b159d('0x27f')]),_0x3401b9='noise';for(const _0x3e72e7 of _0x3cbb9e){if(!_0x3e72e7)continue;_0x3e72e7['setHorrorEffectSettings'](_0x3401b9,_0x52efbd);}$gamePlayer[_0x9b159d('0x6c5')]();}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x450'),_0x27a01a=>{const _0x3c0387=_0x467fb5;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager[_0x3c0387('0x21')]())return;VisuMZ['ConvertParams'](_0x27a01a,_0x27a01a);const _0x284338=VisuMZ[_0x3c0387('0x3a1')](_0x27a01a[_0x3c0387('0x27f')]);for(const _0x48d233 of _0x284338){if('FbgKT'==='MFORn'){function _0x1a77cf(){const _0x8b2c0b=_0x3c0387,_0xdf2f13=this['actor'](_0x28a634),_0x43045e=this[_0x8b2c0b('0x711')](_0x2e233b),_0x5d7913=_0x2ef271['round'](_0x43045e['x']+(_0x43045e[_0x8b2c0b('0x6c2')]-0x80)/0x2),_0x4ac66a=this[_0x8b2c0b('0x8e1')](_0x43045e);let _0x49398f=_0x5d7913-_0x37af1e[_0x8b2c0b('0x33f')]/0x2-0x4,_0x123040=_0x4ac66a+_0xd16be9['iconHeight']/0x2;_0x49398f-_0x289f58[_0x8b2c0b('0x33f')]/0x2<_0x43045e['x']&&(_0x49398f=_0x5d7913+_0x590503['iconWidth']/0x2-0x4,_0x123040=_0x4ac66a-_0x4e85cc[_0x8b2c0b('0x3ca')]/0x2);const _0x4f30d7=_0x5d7913,_0x1bd12c=this[_0x8b2c0b('0x4c9')](_0x43045e);this[_0x8b2c0b('0xbf')](_0xdf2f13,_0x5d7913,_0x4ac66a),this[_0x8b2c0b('0x885')](_0xdf2f13,_0x5d7913,_0x4ac66a),this['placeStateIcon'](_0xdf2f13,_0x49398f,_0x123040),this[_0x8b2c0b('0x4a2')](_0xdf2f13,_0x4f30d7,_0x1bd12c);}}else{if(!_0x48d233)continue;_0x48d233[_0x3c0387('0x464')](_0x3c0387('0x2e5'));}}$gamePlayer[_0x3c0387('0x6c5')]();}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x8c1'),_0x2dc7f6=>{const _0x1a9acb=_0x467fb5;if(!Imported[_0x1a9acb('0x630')])return;if(!SceneManager[_0x1a9acb('0x21')]())return;VisuMZ[_0x1a9acb('0x7ae')](_0x2dc7f6,_0x2dc7f6);const _0x509a39=VisuMZ[_0x1a9acb('0x3a1')](_0x2dc7f6[_0x1a9acb('0x27f')]),_0x149343='tv';for(const _0x1296a1 of _0x509a39){if('NSHtB'!==_0x1a9acb('0x323')){function _0x3d5f52(){const _0x162140=_0x1a9acb;return _0x749541[_0x162140('0x3e')]?_0x97a5d3['getInputButtonString']('ok'):_0x5a57f7[_0x162140('0x15b')][_0x162140('0x110')][_0x162140('0x1b9')][_0x162140('0x293')];}}else{if(!_0x1296a1)continue;_0x1296a1['setHorrorEffectSettings'](_0x149343,_0x2dc7f6);}}$gamePlayer[_0x1a9acb('0x6c5')]();}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],'ActSeq_Horror_TVRemove',_0x345735=>{const _0x2f1832=_0x467fb5;if(!Imported[_0x2f1832('0x630')])return;if(!SceneManager[_0x2f1832('0x21')]())return;VisuMZ[_0x2f1832('0x7ae')](_0x345735,_0x345735);const _0x125840=VisuMZ[_0x2f1832('0x3a1')](_0x345735[_0x2f1832('0x27f')]);for(const _0x244ce3 of _0x125840){if(_0x2f1832('0x74d')!==_0x2f1832('0x310')){if(!_0x244ce3)continue;_0x244ce3[_0x2f1832('0x464')]('tv');}else{function _0x341a28(){const _0x36e6fe=_0x2f1832;this[_0x36e6fe('0x198')]['_reflectionTarget']=_0x167090,this[_0x36e6fe('0x27d')][_0x36e6fe('0x248')](_0x3a4a12),this[_0x36e6fe('0x27d')][_0x36e6fe('0x83a')](_0xbf3a07,this[_0x36e6fe('0x198')]),this[_0x36e6fe('0x198')][_0x36e6fe('0x74f')](_0x468ff6),this[_0x36e6fe('0x27d')][_0x36e6fe('0x4c7')](_0x5854cd,_0x1a4932);}}}$gamePlayer['refresh']();}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x392'),_0x2d99da=>{const _0x2bc003=_0x467fb5;if(!SceneManager[_0x2bc003('0x21')]())return;if(!Imported[_0x2bc003('0x15f')])return;const _0x3e995c=SceneManager[_0x2bc003('0x26e')][_0x2bc003('0x115')];if(!_0x3e995c)return;VisuMZ[_0x2bc003('0x7ae')](_0x2d99da,_0x2d99da);const _0x4135ae=_0x2d99da['Intensity']||0x1,_0x460597=_0x2d99da[_0x2bc003('0x5c7')]||0x1,_0x1d1fcc=_0x2d99da['EasingType']||'Linear';_0x3e995c[_0x2bc003('0x424')](_0x4135ae,_0x460597,_0x1d1fcc);}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x440'),_0x5c8856=>{const _0x2550c8=_0x467fb5;if(!SceneManager[_0x2550c8('0x21')]())return;if(!Imported[_0x2550c8('0x15f')])return;const _0x4f0b7d=SceneManager[_0x2550c8('0x26e')]['_spriteset'];if(!_0x4f0b7d)return;VisuMZ['ConvertParams'](_0x5c8856,_0x5c8856);const _0x55d2f4=Number(_0x5c8856[_0x2550c8('0x536')])||0x0,_0x3bf761=Number(_0x5c8856[_0x2550c8('0x443')]),_0x1c4052=_0x5c8856[_0x2550c8('0x5c7')]||0x1,_0x4cd559=_0x5c8856['EasingType']||_0x2550c8('0x2f7');_0x4f0b7d[_0x2550c8('0x698')](_0x55d2f4,_0x3bf761,_0x1c4052,_0x4cd559);}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Impact_MotionBlurTarget',_0x2a10c0=>{const _0x12418c=_0x467fb5;if(!SceneManager[_0x12418c('0x21')]())return;if(!Imported[_0x12418c('0x15f')])return;const _0x3bf689=SceneManager[_0x12418c('0x26e')][_0x12418c('0x115')];if(!_0x3bf689)return;VisuMZ[_0x12418c('0x7ae')](_0x2a10c0,_0x2a10c0);const _0xef9da8=Number(_0x2a10c0[_0x12418c('0x536')])||0x0,_0x39b20b=Number(_0x2a10c0[_0x12418c('0x443')]),_0x40b174=_0x2a10c0['Duration']||0x1,_0x1d2fd4=_0x2a10c0[_0x12418c('0x1aa')]||_0x12418c('0x2f7'),_0x5086dc=VisuMZ[_0x12418c('0x3a1')](_0x2a10c0['Targets']);for(const _0x57ecc1 of _0x5086dc){if(!_0x57ecc1)continue;if(!_0x57ecc1[_0x12418c('0x67b')]())continue;_0x57ecc1[_0x12418c('0x67b')]()[_0x12418c('0x698')](_0xef9da8,_0x39b20b,_0x40b174,_0x1d2fd4);}}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x793'),_0x3b38a7=>{const _0x5b1036=_0x467fb5;if(!SceneManager[_0x5b1036('0x21')]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ['ConvertParams'](_0x3b38a7,_0x3b38a7);const _0x38af45={'delay':_0x3b38a7[_0x5b1036('0x557')],'duration':_0x3b38a7[_0x5b1036('0x1b0')],'hue':_0x3b38a7[_0x5b1036('0x1a3')],'opacityStart':_0x3b38a7[_0x5b1036('0x7a2')],'tone':_0x3b38a7[_0x5b1036('0x89c')],'visible':!![]},_0x564f46=VisuMZ[_0x5b1036('0x3a1')](_0x3b38a7[_0x5b1036('0x27f')]);for(const _0x208c65 of _0x564f46){if(!_0x208c65)continue;_0x208c65[_0x5b1036('0xc5')](_0x38af45);}}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x85f'),_0x18bf3d=>{const _0x485695=_0x467fb5;if(!SceneManager[_0x485695('0x21')]())return;if(!Imported[_0x485695('0x15f')])return;VisuMZ['ConvertParams'](_0x18bf3d,_0x18bf3d);const _0x34a6df=VisuMZ[_0x485695('0x3a1')](_0x18bf3d['Targets']);for(const _0x4a3ff6 of _0x34a6df){if(!_0x4a3ff6)continue;_0x4a3ff6[_0x485695('0x114')]();}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x550'),_0x1c8eee=>{const _0x5166c7=_0x467fb5;if(!Imported[_0x5166c7('0x15f')])return;const _0x4b7e09=SceneManager['_scene'][_0x5166c7('0x115')];if(!_0x4b7e09)return;VisuMZ[_0x5166c7('0x7ae')](_0x1c8eee,_0x1c8eee);const _0x2a89dc=_0x1c8eee['X']||0x0,_0x2973d=_0x1c8eee['Y']||0x0,_0x442e68=_0x1c8eee[_0x5166c7('0x143')]||0x0,_0x37b4fb=_0x1c8eee[_0x5166c7('0x2ec')]||0x0,_0x481de1=_0x1c8eee[_0x5166c7('0x5c7')]||0x1;_0x4b7e09[_0x5166c7('0xf2')](_0x2a89dc,_0x2973d,_0x442e68,_0x37b4fb,_0x481de1);}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x1d'),_0x1e2495=>{const _0x269eaf=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x269eaf('0x15f')])return;const _0x2a040a=SceneManager['_scene'][_0x269eaf('0x115')];if(!_0x2a040a)return;VisuMZ['ConvertParams'](_0x1e2495,_0x1e2495);const _0x2e3401=VisuMZ[_0x269eaf('0x3a1')](_0x1e2495[_0x269eaf('0x27f')]),_0x19e31b=_0x1e2495[_0x269eaf('0x4ae')],_0x5a03ac=_0x1e2495[_0x269eaf('0x143')]||0x0,_0x671a8f=_0x1e2495[_0x269eaf('0x2ec')]||0x0,_0x255d55=_0x1e2495[_0x269eaf('0x5c7')]||0x1;for(const _0x5f3232 of _0x2e3401){if(!_0x5f3232)continue;if(!_0x5f3232[_0x269eaf('0x67b')]())continue;const _0x506bb6=_0x5f3232['battler']();let _0x2d9ae8=_0x506bb6['_baseX'],_0x49ed28=_0x506bb6[_0x269eaf('0x345')];_0x2d9ae8+=(Graphics[_0x269eaf('0x6c2')]-Graphics[_0x269eaf('0x314')])/0x2,_0x49ed28+=(Graphics[_0x269eaf('0x41e')]-Graphics[_0x269eaf('0x678')])/0x2;if(_0x19e31b[_0x269eaf('0x5e2')](/front/i)){if(_0x269eaf('0x42a')===_0x269eaf('0x38c')){function _0x1ae059(){const _0x186d67=_0x32ca9f(_0xb0546d['$1']);return[_0x40209f['members']()[_0x186d67]];}}else _0x2d9ae8+=(_0x5f3232[_0x269eaf('0x8c6')]()?0x1:-0x1)*_0x506bb6[_0x269eaf('0x445')]()/0x2;}else _0x19e31b[_0x269eaf('0x5e2')](/back/i)&&(_0x2d9ae8+=(_0x5f3232[_0x269eaf('0x8c6')]()?-0x1:0x1)*_0x506bb6['mainSpriteWidth']()/0x2);if(_0x19e31b['match'](/head/i))_0x49ed28-=_0x506bb6[_0x269eaf('0x680')]();else{if(_0x19e31b[_0x269eaf('0x5e2')](/center/i)){if(_0x269eaf('0x8c')===_0x269eaf('0x7e3')){function _0x4dca80(){const _0x2a4314=_0x269eaf;return _0x4ec176[_0x2a4314('0x4dd')]()[_0x2a4314('0x649')](_0x207780=>_0x207780!==_0xb4bfec);}}else _0x49ed28-=_0x506bb6[_0x269eaf('0x680')]()/0x2;}}_0x2a040a['setupShockwaveImpactFilter'](_0x2d9ae8,_0x49ed28,_0x5a03ac,_0x671a8f,_0x255d55);}}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x4ee'),_0x509444=>{const _0x50c7aa=_0x467fb5;if(!SceneManager[_0x50c7aa('0x21')]())return;if(!Imported[_0x50c7aa('0x15f')])return;const _0x50a814=SceneManager[_0x50c7aa('0x26e')][_0x50c7aa('0x115')];if(!_0x50a814)return;VisuMZ[_0x50c7aa('0x7ae')](_0x509444,_0x509444);const _0xea5b02=VisuMZ[_0x50c7aa('0x3a1')](_0x509444[_0x50c7aa('0x27f')]),_0x5585c2=_0x509444[_0x50c7aa('0x4ae')],_0x774fd2=_0x509444['Amp']||0x0,_0x26fcf3=_0x509444[_0x50c7aa('0x2ec')]||0x0,_0x14ff94=_0x509444[_0x50c7aa('0x5c7')]||0x1,_0x603b97=Math[_0x50c7aa('0x5e9')](..._0xea5b02[_0x50c7aa('0xae')](_0x26f592=>_0x26f592[_0x50c7aa('0x67b')]()[_0x50c7aa('0x5f6')]-_0x26f592[_0x50c7aa('0x67b')]()[_0x50c7aa('0x445')]()/0x2)),_0x255d6e=Math[_0x50c7aa('0x6b9')](..._0xea5b02['map'](_0x1cb4cb=>_0x1cb4cb[_0x50c7aa('0x67b')]()[_0x50c7aa('0x5f6')]+_0x1cb4cb[_0x50c7aa('0x67b')]()['mainSpriteWidth']()/0x2)),_0x4577a2=Math[_0x50c7aa('0x5e9')](..._0xea5b02['map'](_0x143f78=>_0x143f78[_0x50c7aa('0x67b')]()[_0x50c7aa('0x345')]-_0x143f78[_0x50c7aa('0x67b')]()[_0x50c7aa('0x680')]())),_0x2910c7=Math[_0x50c7aa('0x6b9')](..._0xea5b02[_0x50c7aa('0xae')](_0x51c8cd=>_0x51c8cd[_0x50c7aa('0x67b')]()[_0x50c7aa('0x345')])),_0x3eddc8=_0xea5b02[_0x50c7aa('0x649')](_0x3e60cd=>_0x3e60cd['isActor']())[_0x50c7aa('0x828')],_0x2fe892=_0xea5b02[_0x50c7aa('0x649')](_0x44296d=>_0x44296d['isEnemy']())[_0x50c7aa('0x828')];let _0x212d99=0x0,_0x5d1109=0x0;if(_0x5585c2['match'](/front/i))_0x212d99=_0x3eddc8>=_0x2fe892?_0x603b97:_0x255d6e;else{if(_0x5585c2['match'](/middle/i))_0x212d99=(_0x603b97+_0x255d6e)/0x2,melee=-0x1;else{if(_0x5585c2[_0x50c7aa('0x5e2')](/back/i)){if(_0x50c7aa('0xee')!==_0x50c7aa('0x180'))_0x212d99=_0x3eddc8>=_0x2fe892?_0x255d6e:_0x603b97;else{function _0x5ea12a(){const _0x5ba6be=_0x50c7aa,_0x4e75f8=_0x5567ee[_0x5ba6be('0x665')]('['+_0x58f327['$1']['match'](/\d+/g)+']');for(const _0x485bce of _0x4e75f8){if(!_0x33e0c8[_0x5ba6be('0x1b3')](_0x485bce))return![];}return!![];}}}}}if(_0x5585c2['match'](/head/i)){if(_0x50c7aa('0x820')===_0x50c7aa('0x6d7')){function _0x48b7f6(){const _0x2f89e4=_0x50c7aa;this[_0x2f89e4('0x79e')]();}}else _0x5d1109=_0x4577a2;}else{if(_0x5585c2['match'](/center/i))_0x5d1109=(_0x4577a2+_0x2910c7)/0x2;else{if(_0x5585c2[_0x50c7aa('0x5e2')](/base/i)){if('CJqjr'!==_0x50c7aa('0x7fb'))_0x5d1109=_0x2910c7;else{function _0x5df7a0(){const _0x46d096=_0x50c7aa;this['bitmap'][_0x46d096('0x83e')]=_0xb601fc[_0x46d096('0x15b')]['Settings'][_0x46d096('0x231')][_0x46d096('0x7a5')];}}}}}_0x212d99+=(Graphics[_0x50c7aa('0x6c2')]-Graphics[_0x50c7aa('0x314')])/0x2,_0x5d1109+=(Graphics[_0x50c7aa('0x41e')]-Graphics['boxHeight'])/0x2,_0x50a814[_0x50c7aa('0xf2')](_0x212d99,_0x5d1109,_0x774fd2,_0x26fcf3,_0x14ff94);}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],'ActSeq_Impact_ZoomBlurPoint',_0x629210=>{const _0x2f256b=_0x467fb5;if(!Imported[_0x2f256b('0x15f')])return;const _0x10fcd4=SceneManager[_0x2f256b('0x26e')][_0x2f256b('0x115')];if(!_0x10fcd4)return;VisuMZ[_0x2f256b('0x7ae')](_0x629210,_0x629210);const _0x4aaf83=_0x629210['X']||0x0,_0x245882=_0x629210['Y']||0x0,_0x5ecdd5=_0x629210[_0x2f256b('0x73d')]||0x0,_0x222b2a=_0x629210['Radius']||0x0,_0x3fe2ca=_0x629210['Duration']||0x1,_0x164c0d=_0x629210['EasingType']||_0x2f256b('0x2f7');_0x10fcd4[_0x2f256b('0x12')](_0x5ecdd5,_0x4aaf83,_0x245882,_0x222b2a,_0x3fe2ca,_0x164c0d);}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x528'),_0x580513=>{const _0x558830=_0x467fb5;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x4dfe1c=SceneManager[_0x558830('0x26e')][_0x558830('0x115')];if(!_0x4dfe1c)return;VisuMZ['ConvertParams'](_0x580513,_0x580513);const _0x3c008a=VisuMZ[_0x558830('0x3a1')](_0x580513[_0x558830('0x27f')]),_0x203af7=_0x580513[_0x558830('0x4ae')],_0x4b1464=_0x580513[_0x558830('0x73d')]||0x0,_0x28d450=_0x580513[_0x558830('0x37a')]||0x0,_0x436454=_0x580513[_0x558830('0x5c7')]||0x1,_0x183773=_0x580513['EasingType']||_0x558830('0x2f7'),_0x423c7f=Math[_0x558830('0x5e9')](..._0x3c008a[_0x558830('0xae')](_0xe51810=>_0xe51810[_0x558830('0x67b')]()[_0x558830('0x5f6')]-_0xe51810['battler']()[_0x558830('0x445')]()/0x2)),_0x17bbfb=Math[_0x558830('0x6b9')](..._0x3c008a[_0x558830('0xae')](_0x2157a8=>_0x2157a8[_0x558830('0x67b')]()[_0x558830('0x5f6')]+_0x2157a8[_0x558830('0x67b')]()[_0x558830('0x445')]()/0x2)),_0x5f0bab=Math[_0x558830('0x5e9')](..._0x3c008a[_0x558830('0xae')](_0x66af79=>_0x66af79[_0x558830('0x67b')]()[_0x558830('0x345')]-_0x66af79['battler']()[_0x558830('0x680')]())),_0x56bba6=Math['max'](..._0x3c008a[_0x558830('0xae')](_0x1742f2=>_0x1742f2['battler']()[_0x558830('0x345')])),_0x1d267a=_0x3c008a['filter'](_0x420562=>_0x420562[_0x558830('0x317')]())[_0x558830('0x828')],_0x1295ec=_0x3c008a[_0x558830('0x649')](_0x1e3727=>_0x1e3727[_0x558830('0x8c6')]())[_0x558830('0x828')];let _0x392443=0x0,_0x4d615a=0x0;if(_0x203af7[_0x558830('0x5e2')](/front/i))_0x392443=_0x1d267a>=_0x1295ec?_0x423c7f:_0x17bbfb;else{if(_0x203af7[_0x558830('0x5e2')](/middle/i))_0x392443=(_0x423c7f+_0x17bbfb)/0x2,melee=-0x1;else _0x203af7['match'](/back/i)&&(_0x392443=_0x1d267a>=_0x1295ec?_0x17bbfb:_0x423c7f);}if(_0x203af7[_0x558830('0x5e2')](/head/i))_0x4d615a=_0x5f0bab;else{if(_0x203af7[_0x558830('0x5e2')](/center/i)){if('oBGiD'!==_0x558830('0x87a'))_0x4d615a=(_0x5f0bab+_0x56bba6)/0x2;else{function _0x3d98fd(){const _0x4f2d22=_0x558830;this[_0x4f2d22('0x772')]=_0x5ebbd9;}}}else{if(_0x203af7[_0x558830('0x5e2')](/base/i)){if(_0x558830('0xb6')!==_0x558830('0x4c4'))_0x4d615a=_0x56bba6;else{function _0x3a2055(){const _0x2580c7=_0x558830;this['_cache'][_0x2580c7('0x168')]=_0xffdcd1['prototype'][_0x2580c7('0x232')][_0x2580c7('0x709')](this);}}}}}_0x392443+=(Graphics[_0x558830('0x6c2')]-Graphics[_0x558830('0x314')])/0x2,_0x4d615a+=(Graphics[_0x558830('0x41e')]-Graphics[_0x558830('0x678')])/0x2,_0x4dfe1c[_0x558830('0x12')](_0x4b1464,_0x392443,_0x4d615a,_0x28d450,_0x436454,_0x183773);}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x764'),_0x313811=>{const _0x2709ea=_0x467fb5;if(!SceneManager[_0x2709ea('0x21')]())return;VisuMZ[_0x2709ea('0x7ae')](_0x313811,_0x313811);const _0x422ba4=$gameTemp[_0x2709ea('0x606')](),_0x56c96f=BattleManager['_action'],_0x1247d5=BattleManager[_0x2709ea('0x3c0')],_0x198089=BattleManager['_logWindow'];if(!_0x422ba4||!_0x56c96f||!_0x1247d5)return;if(!_0x56c96f[_0x2709ea('0x19a')]())return;const _0x3b900e=VisuMZ[_0x2709ea('0x3a1')](_0x313811[_0x2709ea('0x27f')]);for(const _0xd51757 of _0x3b900e){if(_0x2709ea('0x737')==='csAMC'){if(!_0xd51757)continue;_0x198089[_0x2709ea('0x26f')](_0x2709ea('0x5b3'),_0x1247d5,_0xd51757);}else{function _0x32e1b6(){const _0x5c441b=_0x2709ea;_0x3f04d5[_0x5c441b('0x3a0')][_0x5c441b('0x7a5')]=!![];}}}_0x422ba4[_0x2709ea('0x707')](_0x2709ea('0x68e'));}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x19b'),_0x5dd020=>{const _0x573444=_0x467fb5;if(!SceneManager[_0x573444('0x21')]())return;VisuMZ[_0x573444('0x7ae')](_0x5dd020,_0x5dd020);const _0x271ee4=[_0x573444('0x4b5'),_0x573444('0x773'),_0x573444('0x451'),_0x573444('0x767'),_0x573444('0x6fd'),_0x573444('0x5dd'),'AGI',_0x573444('0x5fa')],_0x4661c7=_0x5dd020[_0x573444('0x3aa')],_0x351b1b=_0x5dd020[_0x573444('0x34')],_0xceb016=_0x5dd020[_0x573444('0x2fe')],_0x2ccab1=VisuMZ[_0x573444('0x3a1')](_0x5dd020['Targets']);for(const _0x23b4e0 of _0x2ccab1){if(_0x573444('0x7ff')!=='cPndk'){if(!_0x23b4e0)continue;for(const _0xfe095f of _0x4661c7){const _0xfd888c=_0x271ee4['indexOf'](_0xfe095f[_0x573444('0x66a')]()[_0x573444('0x23e')]());_0xfd888c>=0x0&&_0xfd888c<=0x7&&_0x23b4e0[_0x573444('0x17e')](_0xfd888c,_0xceb016);}for(const _0x8fdfce of _0x351b1b){if(_0x573444('0x12e')!==_0x573444('0x12e')){function _0x11c8e4(){const _0x26b69c=_0x573444;this[_0x26b69c('0x565')]();}}else{const _0x58b999=_0x271ee4[_0x573444('0x2d9')](_0x8fdfce[_0x573444('0x66a')]()[_0x573444('0x23e')]());if(_0x58b999>=0x0&&_0x58b999<=0x7){if(_0x573444('0xa6')!==_0x573444('0x85c'))_0x23b4e0[_0x573444('0xc1')](_0x58b999,_0xceb016);else{function _0x4e910a(){const _0x122a74=_0x573444,_0x1b738b=['PreApplyAsUserJS',_0x122a74('0x8b6'),'PreDamageAsUserJS',_0x122a74('0x36d'),_0x122a74('0x2a8'),_0x122a74('0xbc'),'PreDamageAsTargetJS',_0x122a74('0x84'),_0x122a74('0x4b7'),'PostStartActionJS',_0x122a74('0x806'),_0x122a74('0x305'),'PreStartBattleJS',_0x122a74('0x31a'),'PreEndBattleJS',_0x122a74('0x43e'),_0x122a74('0x17b'),_0x122a74('0x5ad'),_0x122a74('0x1d4'),_0x122a74('0x8bf'),'PreStartTurnJS',_0x122a74('0x3c2'),'PreEndTurnJS',_0x122a74('0x2b8'),_0x122a74('0x679'),_0x122a74('0x2ed')];for(const _0x1e6e73 of _0x1b738b){_0x4ae35d['BattleCore'][_0x122a74('0x6a0')](_0x55b77c,_0x1e6e73);}}}}}}}else{function _0x399cfd(){const _0x2c3ec5=_0x573444,_0x40c630=_0x531634['inputtingAction']();_0x40c630[_0x2c3ec5('0x282')](this['_actorCommandWindow'][_0x2c3ec5('0x17f')]()),this[_0x2c3ec5('0x169')]();}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0xfa'),_0x2828b1=>{const _0x16d090=_0x467fb5;if(!SceneManager[_0x16d090('0x21')]())return;VisuMZ['ConvertParams'](_0x2828b1,_0x2828b1);const _0x287dd5=_0x2828b1[_0x16d090('0x4cc')],_0x37d314=VisuMZ[_0x16d090('0x3a1')](_0x2828b1[_0x16d090('0x27f')]);for(const _0x5668cf of _0x37d314){if(!_0x5668cf)continue;for(const _0x21c4b7 of _0x287dd5){_0x5668cf[_0x16d090('0x853')](_0x21c4b7);}}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_ArmorPenetration',_0x5a9261=>{const _0x203062=_0x467fb5;if(!SceneManager[_0x203062('0x21')]())return;VisuMZ[_0x203062('0x7ae')](_0x5a9261,_0x5a9261);const _0x5d4792=BattleManager[_0x203062('0x198')],_0x52a2fc={'arPenRate':_0x5a9261['ArPenRate'],'arPenFlat':_0x5a9261[_0x203062('0x505')],'arRedRate':_0x5a9261[_0x203062('0x302')],'arRedFlat':_0x5a9261[_0x203062('0x73e')]};_0x5d4792[_0x203062('0x6aa')]=_0x52a2fc;}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x1f8'),_0x284429=>{const _0x4a7418=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4a7418('0x1ae')])return;VisuMZ[_0x4a7418('0x7ae')](_0x284429,_0x284429);const _0x218d05=VisuMZ[_0x4a7418('0x3a1')](_0x284429[_0x4a7418('0x27f')]),_0x2e5b9e=_0x284429[_0x4a7418('0x79b')],_0x45071f=_0x284429[_0x4a7418('0x79b')],_0x276edf=_0x284429[_0x4a7418('0x611')];for(const _0x432b95 of _0x218d05){if(!_0x432b95)continue;if(_0x432b95[_0x4a7418('0x6f3')]())_0x432b95['changeAtbChargeTime'](_0x2e5b9e);else{if(_0x432b95[_0x4a7418('0x54f')]()){_0x432b95[_0x4a7418('0x49f')](_0x45071f);if(_0x276edf)_0x432b95[_0x4a7418('0x72b')]();}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Mechanics_Collapse',_0x333e1d=>{const _0x341abb=_0x467fb5;if(!SceneManager[_0x341abb('0x21')]())return;VisuMZ['ConvertParams'](_0x333e1d,_0x333e1d);const _0x3d04a8=$gameTemp[_0x341abb('0x606')](),_0x2e2162=BattleManager[_0x341abb('0x198')],_0x21f1e8=BattleManager['_subject'];if(!_0x3d04a8||!_0x2e2162||!_0x21f1e8)return;if(!_0x2e2162['item']())return;const _0x1aa9c4=VisuMZ[_0x341abb('0x3a1')](_0x333e1d['Targets']);for(const _0x44d1a3 of _0x1aa9c4){if(!_0x44d1a3)continue;_0x333e1d[_0x341abb('0x2c5')]&&(_0x44d1a3[_0x341abb('0x47e')](),_0x44d1a3[_0x341abb('0x853')](_0x44d1a3[_0x341abb('0x723')]()));if(_0x44d1a3[_0x341abb('0x363')]()){if(_0x341abb('0x12c')!==_0x341abb('0x51'))_0x44d1a3['performCollapse']();else{function _0xa8dee7(){const _0x21c012=_0x341abb;this[_0x21c012('0x215')](),this['_weaponSprite'][_0x21c012('0x6c6')](_0x4dbcdb),this[_0x21c012('0x621')][_0x21c012('0x257')]();}}}}_0x3d04a8['setWaitMode'](_0x341abb('0x3d6'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Mechanics_CtbOrder',_0x120ad4=>{const _0xd2044f=_0x467fb5;if(!SceneManager[_0xd2044f('0x21')]())return;if(!Imported[_0xd2044f('0x56a')])return;VisuMZ[_0xd2044f('0x7ae')](_0x120ad4,_0x120ad4);const _0x372fde=VisuMZ[_0xd2044f('0x3a1')](_0x120ad4[_0xd2044f('0x27f')]),_0x2a28af=_0x120ad4[_0xd2044f('0x5d8')];for(const _0x4efbbe of _0x372fde){if(_0xd2044f('0x16b')==='OpybE'){if(!_0x4efbbe)continue;_0x4efbbe[_0xd2044f('0x8a7')](_0x2a28af);}else{function _0x21bb59(){const _0x16234e=_0xd2044f;_0x55039a[_0x16234e('0x15b')]['Scene_Battle_createPartyCommandWindow'][_0x16234e('0x709')](this),this['createPartyCommandWindowBattleCore']();}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x3b'),_0x3e0960=>{const _0x368d71=_0x467fb5;if(!SceneManager[_0x368d71('0x21')]())return;if(!Imported['VisuMZ_2_BattleSystemCTB'])return;VisuMZ[_0x368d71('0x7ae')](_0x3e0960,_0x3e0960);const _0x248400=VisuMZ[_0x368d71('0x3a1')](_0x3e0960['Targets']),_0x408d59=_0x3e0960['ChargeRate'],_0x443418=_0x3e0960[_0x368d71('0x79b')];for(const _0x4f0d24 of _0x248400){if(!_0x4f0d24)continue;if(_0x4f0d24[_0x368d71('0x8b5')]===_0x368d71('0x816')){if(_0x368d71('0x77c')==='hiKjE'){function _0x151151(){const _0x1ab9e1=_0x368d71;_0x4815ec[_0x1ab9e1('0x276')](),_0x369258[_0x1ab9e1('0x2e')](_0x2b4c2e),_0x41c433[_0x1ab9e1('0x15b')]['Game_Troop_setup'][_0x1ab9e1('0x709')](this,_0x47be4f);}}else _0x4f0d24['changeCtbChargeTime'](_0x408d59);}else _0x4f0d24[_0x368d71('0x8b5')]===_0x368d71('0x6e3')&&_0x4f0d24[_0x368d71('0x2f5')](_0x443418);}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x2ba'),_0x1f8d2e=>{const _0x24849b=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x24849b('0x7ae')](_0x1f8d2e,_0x1f8d2e);const _0x474317=BattleManager[_0x24849b('0x198')];if(!_0x474317)return;let _0x17f180=_0x1f8d2e[_0x24849b('0x857')];_0x474317[_0x24849b('0x6d')](_0x17f180);}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],'ActSeq_Mechanics_DamagePopup',_0x56fe15=>{const _0x39ca71=_0x467fb5;if(!SceneManager[_0x39ca71('0x21')]())return;VisuMZ[_0x39ca71('0x7ae')](_0x56fe15,_0x56fe15);const _0x45cd0a=VisuMZ[_0x39ca71('0x3a1')](_0x56fe15[_0x39ca71('0x27f')]);for(const _0x389fa8 of _0x45cd0a){if(!_0x389fa8)continue;if(_0x389fa8['shouldPopupDamage']())_0x389fa8[_0x39ca71('0x61b')]();}}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x51c'),_0x596511=>{const _0x47928b=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x47928b('0x7ae')](_0x596511,_0x596511);const _0x3c6341=$gameTemp[_0x47928b('0x606')](),_0x239e7c=BattleManager[_0x47928b('0x3c0')],_0x1958ba=_0x596511[_0x47928b('0x1da')];if(!_0x3c6341)return;if(!_0x239e7c)return;_0x239e7c&&_0x239e7c[_0x47928b('0xb2')]()&&_0x1958ba[_0x47928b('0x66a')]()[_0x47928b('0x23e')]()!==_0x47928b('0x6cc')&&_0x3c6341['command119']([_0x1958ba]);}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],'ActSeq_Mechanics_HpMpTp',_0x345b91=>{const _0x16de56=_0x467fb5;if(!SceneManager[_0x16de56('0x21')]())return;VisuMZ[_0x16de56('0x7ae')](_0x345b91,_0x345b91);const _0x16c780=VisuMZ[_0x16de56('0x3a1')](_0x345b91[_0x16de56('0x27f')]),_0x62342c=_0x345b91[_0x16de56('0x2b')],_0x122ee1=_0x345b91['HP_Flat'],_0x15ebb0=_0x345b91['MP_Rate'],_0x46b8dd=_0x345b91[_0x16de56('0x5d2')],_0x15960a=_0x345b91[_0x16de56('0x5de')],_0x331682=_0x345b91[_0x16de56('0x855')],_0x370450=_0x345b91[_0x16de56('0x5d1')];for(const _0x52ccfc of _0x16c780){if(!_0x52ccfc)continue;const _0x18da45=_0x52ccfc[_0x16de56('0x70c')](),_0x4c9ea2=Math['round'](_0x62342c*_0x52ccfc[_0x16de56('0x6ad')]+_0x122ee1),_0x36e080=Math[_0x16de56('0x1b2')](_0x15ebb0*_0x52ccfc['mmp']+_0x46b8dd),_0xa0472d=Math[_0x16de56('0x1b2')](_0x15960a*_0x52ccfc['maxTp']()+_0x331682);if(_0x4c9ea2!==0x0)_0x52ccfc[_0x16de56('0x1af')](_0x4c9ea2);if(_0x36e080!==0x0)_0x52ccfc[_0x16de56('0x63')](_0x36e080);if(_0xa0472d!==0x0)_0x52ccfc[_0x16de56('0x7ce')](_0xa0472d);if(_0x370450)_0x52ccfc['startDamagePopup']();_0x18da45&&_0x52ccfc[_0x16de56('0xb2')]()&&_0x52ccfc[_0x16de56('0x214')]();}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Mechanics_Immortal',_0x9976e7=>{const _0x3bcecb=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3bcecb('0x7ae')](_0x9976e7,_0x9976e7);const _0x923b52=VisuMZ[_0x3bcecb('0x3a1')](_0x9976e7[_0x3bcecb('0x27f')]);for(const _0x5a98fe of _0x923b52){if(!_0x5a98fe)continue;_0x5a98fe[_0x3bcecb('0x16')](_0x9976e7['Immortal']);}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x6a7'),_0x92a9ee=>{const _0x52abe0=_0x467fb5;if(!SceneManager[_0x52abe0('0x21')]())return;VisuMZ[_0x52abe0('0x7ae')](_0x92a9ee,_0x92a9ee);const _0x430226=BattleManager[_0x52abe0('0x198')],_0x22fe8f={'criticalHitRate':_0x92a9ee[_0x52abe0('0x6ca')],'criticalHitFlat':_0x92a9ee['CriticalHitFlat'],'criticalDmgRate':_0x92a9ee['CriticalDmgRate'],'criticalDmgFlat':_0x92a9ee[_0x52abe0('0x223')],'damageRate':_0x92a9ee[_0x52abe0('0x514')],'damageFlat':_0x92a9ee[_0x52abe0('0x18d')],'hitRate':_0x92a9ee[_0x52abe0('0x552')],'hitFlat':_0x92a9ee[_0x52abe0('0x715')]};_0x430226[_0x52abe0('0x37e')]=_0x22fe8f;}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x64c'),_0x5d39ec=>{const _0x2d00d3=_0x467fb5;if(!SceneManager[_0x2d00d3('0x21')]())return;VisuMZ[_0x2d00d3('0x7ae')](_0x5d39ec,_0x5d39ec);const _0x8bd18b=[_0x2d00d3('0x4b5'),_0x2d00d3('0x773'),_0x2d00d3('0x451'),_0x2d00d3('0x767'),'MAT',_0x2d00d3('0x5dd'),_0x2d00d3('0x91'),_0x2d00d3('0x5fa')],_0xd13abc=_0x5d39ec['Buffs'],_0x49273c=_0x5d39ec['Debuffs'],_0x2032ae=VisuMZ['CreateActionSequenceTargets'](_0x5d39ec['Targets']);for(const _0x28eb1e of _0x2032ae){if(!_0x28eb1e)continue;for(const _0x196a74 of _0xd13abc){const _0xbcf150=_0x8bd18b[_0x2d00d3('0x2d9')](_0x196a74[_0x2d00d3('0x66a')]()[_0x2d00d3('0x23e')]());_0xbcf150>=0x0&&_0xbcf150<=0x7&&_0x28eb1e[_0x2d00d3('0x5a6')](_0xbcf150)&&_0x28eb1e[_0x2d00d3('0x162')](_0xbcf150);}for(const _0x135ff3 of _0x49273c){const _0x3b0729=_0x8bd18b[_0x2d00d3('0x2d9')](_0x135ff3[_0x2d00d3('0x66a')]()[_0x2d00d3('0x23e')]());if(_0x3b0729>=0x0&&_0x3b0729<=0x7&&_0x28eb1e['isDebuffAffected'](_0x3b0729)){if('CEHik'!==_0x2d00d3('0x288')){function _0x3ae357(){const _0x5b1049=_0x2d00d3;if(!_0x33fe22[_0x5b1049('0x21')]())return null;if(!_0x1b0a36[_0x5b1049('0x26e')][_0x5b1049('0x115')])return null;return _0xba9d1c[_0x5b1049('0x26e')]['_spriteset']['findTargetSprite'](this);}}else _0x28eb1e[_0x2d00d3('0x162')](_0x3b0729);}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x370'),_0x3c7dbd=>{const _0x21818d=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x3c7dbd,_0x3c7dbd);const _0x3f4f33=_0x3c7dbd[_0x21818d('0x4cc')],_0x3c1ddf=VisuMZ[_0x21818d('0x3a1')](_0x3c7dbd[_0x21818d('0x27f')]);for(const _0x14782e of _0x3c1ddf){if(!_0x14782e)continue;for(const _0x1d40ac of _0x3f4f33){_0x14782e[_0x21818d('0x78')](_0x1d40ac);}}}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],'ActSeq_Mechanics_StbExploit',_0x2008cf=>{const _0x1a81bc=_0x467fb5;if(!SceneManager[_0x1a81bc('0x21')]())return;if(!Imported[_0x1a81bc('0x266')])return;VisuMZ[_0x1a81bc('0x7ae')](_0x2008cf,_0x2008cf);const _0x4a3487=_0x2008cf[_0x1a81bc('0x34b')],_0x232224=VisuMZ[_0x1a81bc('0x3a1')](_0x2008cf[_0x1a81bc('0x27f')]),_0x243aa6=_0x2008cf[_0x1a81bc('0x836')],_0x5bae9a=_0x2008cf[_0x1a81bc('0x8a4')],_0x53e706=_0x2008cf['ForceExploiter'],_0x43e863=BattleManager[_0x1a81bc('0x198')];if(_0x4a3487)for(const _0x54c91d of _0x232224){if(_0x1a81bc('0x36e')===_0x1a81bc('0x36e')){if(!_0x54c91d)continue;if(_0x54c91d===user)continue;if(_0x243aa6)_0x54c91d['setSTBExploited'](![]);_0x54c91d['becomeSTBExploited'](BattleManager[_0x1a81bc('0x3c0')],_0x43e863);}else{function _0x294c94(){_0x4a3a8c=_0x39b67e;}}}if(_0x5bae9a&&BattleManager['_subject']){if('eSDxI'!=='PEzCZ'){if(_0x53e706)BattleManager[_0x1a81bc('0x3c0')][_0x1a81bc('0x44f')](![]);const _0x12088e=_0x232224[0x0];BattleManager['performSTBExploiter'](_0x12088e,_0x43e863);}else{function _0x4bebfc(){const _0x537b52=_0x1a81bc;return _0x4d7352[_0x537b52('0x345')]-_0x3eca10['_baseY'];}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x58b'),_0x350f34=>{const _0x153ae3=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x153ae3('0x266')])return;VisuMZ[_0x153ae3('0x7ae')](_0x350f34,_0x350f34);const _0x1e14d8=_0x350f34[_0x153ae3('0x541')];if(BattleManager['_subject']){if('HOMiW'!=='sCWiX')BattleManager[_0x153ae3('0x3c0')][_0x153ae3('0x20d')](_0x1e14d8);else{function _0xb617c4(){const _0x18e5dc=_0x153ae3;this['startMotion'](_0x18e5dc('0x898'));}}}}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x279'),_0x5e6b2d=>{const _0xb64ba8=_0x467fb5;if(!SceneManager[_0xb64ba8('0x21')]())return;if(!Imported[_0xb64ba8('0x266')])return;VisuMZ['ConvertParams'](_0x5e6b2d,_0x5e6b2d);let _0x5392ac=_0x5e6b2d['Actions'];if(BattleManager[_0xb64ba8('0x3c0')]){BattleManager[_0xb64ba8('0x3c0')][_0xb64ba8('0x834')]=BattleManager[_0xb64ba8('0x3c0')][_0xb64ba8('0x834')]||[];while(_0x5392ac--){if(BattleManager[_0xb64ba8('0x3c0')][_0xb64ba8('0x834')]['length']<=0x0)break;BattleManager['_subject'][_0xb64ba8('0x834')][_0xb64ba8('0x66e')]();}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x2db'),_0x375700=>{const _0x56bb42=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x375700,_0x375700);const _0x5b1d89=VisuMZ['CreateActionSequenceTargets'](_0x375700['Targets']),_0x43f46b=_0x375700[_0x56bb42('0x732')],_0x554770={'textColor':ColorManager['getColor'](_0x375700['TextColor']),'flashColor':_0x375700['FlashColor'],'flashDuration':_0x375700[_0x56bb42('0x25a')]};for(const _0x3d721b of _0x5b1d89){if(_0x56bb42('0x8b0')===_0x56bb42('0x8b0')){if(!_0x3d721b)continue;_0x3d721b[_0x56bb42('0x835')](_0x43f46b,_0x554770);}else{function _0x57acbf(){const _0x7ec516=_0x56bb42;if(!_0x513323[_0x7ec516('0x21')]())return;_0xe68ee['ConvertParams'](_0x1f24a4,_0xc1408e);const _0x2160bb=_0x299371['getLastPluginCommandInterpreter'](),_0x437756=_0xc1dbed[_0x7ec516('0x3a1')](_0x2e4c10[_0x7ec516('0x27f')]),_0x4321d6=_0xdcb41e['AnimationID'],_0x54b049=_0x3e241f['Mirror'];if(!_0x2160bb)return;_0x275797[_0x7ec516('0x670')](_0x437756,_0x4321d6,_0x54b049);if(_0x54e79f[_0x7ec516('0x42c')])_0x2160bb[_0x7ec516('0x707')](_0x7ec516('0x8ad'));}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x2b5'),_0x4c57c1=>{const _0x19a144=_0x467fb5;if(!SceneManager[_0x19a144('0x21')]())return;VisuMZ[_0x19a144('0x7ae')](_0x4c57c1,_0x4c57c1);const _0x26b471=VisuMZ[_0x19a144('0x3a1')](_0x4c57c1[_0x19a144('0x27f')]);let _0x3ec2f1=$gameVariables[_0x19a144('0x1b3')](_0x4c57c1[_0x19a144('0x243')]);if(Imported[_0x19a144('0x3e')]&&_0x4c57c1['DigitGrouping']){if(_0x19a144('0x3ee')!==_0x19a144('0x3ee')){function _0x2a5c1c(){return _0x2a2924['aliveMembers']()['filter'](_0x13607f=>_0x13607f!==_0x4d2305);}}else _0x3ec2f1=VisuMZ[_0x19a144('0x8e0')](_0x3ec2f1);}const _0x43c455=String(_0x3ec2f1),_0xcbaee8={'textColor':ColorManager[_0x19a144('0xb3')](_0x4c57c1[_0x19a144('0x4d6')]),'flashColor':_0x4c57c1['FlashColor'],'flashDuration':_0x4c57c1[_0x19a144('0x25a')]};for(const _0xd3cdd6 of _0x26b471){if(_0x19a144('0x751')==='YrWOF'){function _0xaf925c(){const _0x79e420=_0x19a144;_0x48abee[_0x79e420('0x15b')][_0x79e420('0x28')][_0x79e420('0x709')](this,_0x3a1152),this[_0x79e420('0x49')]();}}else{if(!_0xd3cdd6)continue;_0xd3cdd6[_0x19a144('0x835')](_0x43c455,_0xcbaee8);}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Mechanics_WaitForEffect',_0x572c2c=>{const _0x12aded=_0x467fb5;if(!SceneManager['isSceneBattle']())return;const _0x4a23ca=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4a23ca)return;_0x4a23ca[_0x12aded('0x707')](_0x12aded('0x3d6'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x348'),_0x1c4aed=>{const _0x3c3c2e=_0x467fb5;if(!SceneManager[_0x3c3c2e('0x21')]())return;VisuMZ[_0x3c3c2e('0x7ae')](_0x1c4aed,_0x1c4aed);const _0xd8f2b5=VisuMZ[_0x3c3c2e('0x3a1')](_0x1c4aed[_0x3c3c2e('0x27f')]);for(const _0x203296 of _0xd8f2b5){if(_0x3c3c2e('0x3e9')!=='IKSbG'){function _0x1e79f7(){const _0x522a40=_0x3c3c2e;this['bitmap']=new _0x4b0080(0x1,0x1),_0x21d699['isSideView']()?this[_0x522a40('0x3ad')][_0x522a40('0x30a')]=_0x9f8c70[_0x522a40('0x5c5')](_0x2c836c):this[_0x522a40('0x3ad')][_0x522a40('0x30a')]=_0x3ba755[_0x522a40('0xb4')](_0x4f71b7),this['_mainSprite'][_0x522a40('0x30a')][_0x522a40('0x2a2')](this[_0x522a40('0x73f')][_0x522a40('0x3c1')](this));}}else{if(!_0x203296)continue;_0x203296['clearFreezeMotion']();}}}),PluginManager['registerCommand'](pluginData['name'],_0x467fb5('0x8ea'),_0x411160=>{const _0x31866f=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x31866f('0x7ae')](_0x411160,_0x411160);const _0x2afe9a=VisuMZ[_0x31866f('0x3a1')](_0x411160[_0x31866f('0x27f')]),_0x5571d2=_0x411160['MotionType']['toLowerCase']()[_0x31866f('0x23e')](),_0x34b9cd=_0x411160[_0x31866f('0x643')],_0x366743=_0x411160[_0x31866f('0x7cc')];for(const _0x594d1a of _0x2afe9a){if(_0x31866f('0xe9')!==_0x31866f('0x899')){if(!_0x594d1a)continue;_0x594d1a['freezeMotion'](_0x5571d2,_0x34b9cd,_0x366743);}else{function _0x5ae500(){const _0x156d43=_0x31866f;if(_0x54b3ab===_0x20b30f[_0x156d43('0x23')]())return;if(_0x21eb57===_0x812f59['_subject'])return;_0xb4a6c0[_0x156d43('0x67b')]()[_0x156d43('0x6b0')]();}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x3a9'),_0x232d10=>{const _0x28b7b7=_0x467fb5;if(!SceneManager[_0x28b7b7('0x21')]())return;VisuMZ[_0x28b7b7('0x7ae')](_0x232d10,_0x232d10);const _0x1dd61b=VisuMZ[_0x28b7b7('0x3a1')](_0x232d10['Targets']),_0x21540f=_0x232d10[_0x28b7b7('0x356')]['toLowerCase']()[_0x28b7b7('0x23e')](),_0x47cbe9=_0x232d10[_0x28b7b7('0x643')];for(const _0x4dab70 of _0x1dd61b){if(_0x28b7b7('0x6a2')===_0x28b7b7('0x6a2')){if(!_0x4dab70)continue;_0x21540f===_0x28b7b7('0x87')?_0x4dab70[_0x28b7b7('0x55b')]():_0x4dab70[_0x28b7b7('0x738')](_0x21540f);if(!_0x47cbe9){if(_0x28b7b7('0xf6')!==_0x28b7b7('0x687'))_0x4dab70['startWeaponAnimation'](0x0);else{function _0x17c1b9(){const _0x2b695c=_0x1a03ed(_0x5a7db3['$1']);return[_0x5af7fc['members']()[_0x2b695c]];}}}else{if(_0x47cbe9&&[_0x28b7b7('0x6cf'),_0x28b7b7('0x70e'),'missle'][_0x28b7b7('0x790')](_0x21540f)){}}}else{function _0x225ad2(){const _0x5e9d99=_0x28b7b7;_0x426837[_0x5e9d99('0x3b0')]()['physical']?this[_0x5e9d99('0x26f')](_0x5e9d99('0x108'),_0x5e10a6):this[_0x5e9d99('0x26f')](_0x5e9d99('0xc4'),_0x15fe08);}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x1e6'),_0x574a6a=>{const _0x438761=_0x467fb5;if(!SceneManager[_0x438761('0x21')]())return;VisuMZ['ConvertParams'](_0x574a6a,_0x574a6a);const _0x32a110=BattleManager[_0x438761('0x198')];if(!_0x32a110)return;if(!_0x32a110[_0x438761('0x19a')]())return;const _0x84b09d=VisuMZ[_0x438761('0x3a1')](_0x574a6a['Targets']);for(const _0x14ffa3 of _0x84b09d){if('EYTAR'!==_0x438761('0x132')){if(!_0x14ffa3)continue;_0x14ffa3['performAction'](_0x32a110);}else{function _0x5eb93b(){const _0x2e6590=_0x438761;if(!_0x1e22d0)return;if(!this[_0x2e6590('0x3a2')])return;if(_0x413b66[_0x2e6590('0x317')]()){}else{if(_0x51ea40[_0x2e6590('0x8c6')]()){if(this['constructor']===_0x51dbfb&&!_0x5c0501['hasSvBattler']())return;}}this[_0x2e6590('0x3a2')]['setup'](_0x23d82e,'hp');}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x22f'),_0xf8c861=>{const _0x1ff98a=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x1ff98a('0x7ae')](_0xf8c861,_0xf8c861);const _0x16df3c=VisuMZ[_0x1ff98a('0x3a1')](_0xf8c861['Targets']);for(const _0x135260 of _0x16df3c){if(_0x1ff98a('0x824')!==_0x1ff98a('0x493')){if(!_0x135260)continue;if(!_0x135260[_0x1ff98a('0x67b')]())continue;_0x135260[_0x1ff98a('0x67b')]()[_0x1ff98a('0x1d2')]();}else{function _0x52642b(){const _0x2e0021=_0x1ff98a;this[_0x2e0021('0x7cf')]='turn';}}}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x86c'),_0x542727=>{const _0x58a765=_0x467fb5;if(!SceneManager[_0x58a765('0x21')]())return;VisuMZ[_0x58a765('0x7ae')](_0x542727,_0x542727);const _0x4f873e=$gameTemp[_0x58a765('0x606')](),_0x5eb7b1=_0x542727[_0x58a765('0x2f2')]*Sprite_Battler[_0x58a765('0xf7')];_0x4f873e[_0x58a765('0x246')](_0x5eb7b1);}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x2c3'),_0x4db35b=>{const _0x3bbf7b=_0x467fb5;if(!SceneManager[_0x3bbf7b('0x21')]())return;VisuMZ[_0x3bbf7b('0x7ae')](_0x4db35b,_0x4db35b);const _0x511a0d=$gameTemp[_0x3bbf7b('0x606')](),_0xfa59f9=BattleManager[_0x3bbf7b('0x198')];if(!_0x511a0d||!_0xfa59f9)return;if(!_0xfa59f9['item']())return;const _0x5b9537=VisuMZ['CreateActionSequenceTargets'](_0x4db35b[_0x3bbf7b('0x27f')]);for(const _0x519ff0 of _0x5b9537){if('FDvwc'==='QRjAu'){function _0x2a5c84(){const _0x561aad=_0x3bbf7b;_0x4db6f4[_0x561aad('0xc9')][_0x561aad('0xad')]['call'](this,_0x135384);if(this[_0x561aad('0x11c')]())this[_0x561aad('0x144')](_0x56e8c4);}}else{if(!_0x519ff0)continue;_0x519ff0[_0x3bbf7b('0x15d')](_0xfa59f9);}}if(_0x4db35b[_0x3bbf7b('0x6f2')])_0x511a0d['setWaitMode'](_0x3bbf7b('0x46'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Movement_FaceDirection',_0x469c0e=>{const _0x484e91=_0x467fb5;if(!SceneManager[_0x484e91('0x21')]())return;if(!$gameSystem[_0x484e91('0xe1')]())return;VisuMZ[_0x484e91('0x7ae')](_0x469c0e,_0x469c0e);const _0x4c0572=VisuMZ['CreateActionSequenceTargets'](_0x469c0e[_0x484e91('0x27f')]);let _0x3144f7=_0x469c0e[_0x484e91('0x3bb')]['match'](/back/i);for(const _0x9c709e of _0x4c0572){if(_0x484e91('0x38b')===_0x484e91('0x278')){function _0x110136(){const _0xc4f047=_0x484e91;this[_0xc4f047('0x5b7')]();}}else{if(!_0x9c709e)continue;if(_0x469c0e[_0x484e91('0x3bb')][_0x484e91('0x5e2')](/rand/i))_0x3144f7=Math[_0x484e91('0xbe')](0x2);_0x9c709e['setBattlerFlip'](!!_0x3144f7);}}}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x4bb'),_0xd3286a=>{const _0x4768b8=_0x467fb5;if(!SceneManager[_0x4768b8('0x21')]())return;if(!$gameSystem[_0x4768b8('0xe1')]())return;VisuMZ[_0x4768b8('0x7ae')](_0xd3286a,_0xd3286a);const _0x5b69a7=VisuMZ[_0x4768b8('0x3a1')](_0xd3286a[_0x4768b8('0x27f')]);let _0x7d54c9=_0xd3286a['Point'];const _0x1d8ac5=_0xd3286a[_0x4768b8('0x68d')];for(const _0x4fe55a of _0x5b69a7){if(!_0x4fe55a)continue;let _0x1009bc=_0x4fe55a[_0x4768b8('0x67b')]()[_0x4768b8('0x5f6')],_0x52314a=_0x4fe55a[_0x4768b8('0x67b')]()['_baseY'];if(_0x7d54c9['match'](/home/i)){if(_0x4768b8('0x58c')!=='zIJCo'){function _0x4da8a4(){const _0xb3f49e=_0x4768b8;return _0x43aad7[_0xb3f49e('0x15b')]['Settings'][_0xb3f49e('0x20')][_0xb3f49e('0x733')];}}else _0x1009bc=_0x4fe55a['battler']()['_homeX'],_0x52314a=_0x4fe55a[_0x4768b8('0x67b')]()[_0x4768b8('0x1b7')];}else{if(_0x7d54c9[_0x4768b8('0x5e2')](/center/i)){if(_0x4768b8('0x337')===_0x4768b8('0x337'))_0x1009bc=Graphics[_0x4768b8('0x314')]/0x2,_0x52314a=Graphics[_0x4768b8('0x678')]/0x2;else{function _0x5f4704(){const _0x6d8473=_0x4768b8;return _0x2b7acf[_0x6d8473('0x15b')]['Settings'][_0x6d8473('0x20')][_0x6d8473('0x18')];}}}else _0x7d54c9[_0x4768b8('0x5e2')](/point (\d+), (\d+)/i)&&(_0x1009bc=Number(RegExp['$1']),_0x52314a=Number(RegExp['$2']));}_0x4fe55a[_0x4768b8('0x5a3')](Math[_0x4768b8('0x1b2')](_0x1009bc),Math[_0x4768b8('0x1b2')](_0x52314a),!!_0x1d8ac5);}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x496'),_0x42d594=>{const _0x1e0f57=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x1e0f57('0xe1')]())return;VisuMZ[_0x1e0f57('0x7ae')](_0x42d594,_0x42d594);const _0xe974b1=VisuMZ[_0x1e0f57('0x3a1')](_0x42d594[_0x1e0f57('0x26b')]),_0x34a723=VisuMZ['CreateActionSequenceTargets'](_0x42d594['Targets2']),_0x11b402=_0x34a723[_0x1e0f57('0xae')](_0x2ce112=>_0x2ce112&&_0x2ce112[_0x1e0f57('0x67b')]()?_0x2ce112[_0x1e0f57('0x67b')]()[_0x1e0f57('0x5f6')]:0x0)/(_0x34a723[_0x1e0f57('0x828')]||0x1),_0xac31b7=_0x34a723[_0x1e0f57('0xae')](_0xad2179=>_0xad2179&&_0xad2179[_0x1e0f57('0x67b')]()?_0xad2179[_0x1e0f57('0x67b')]()[_0x1e0f57('0x345')]:0x0)/(_0x34a723['length']||0x1),_0x53b056=_0x42d594[_0x1e0f57('0x68d')];for(const _0x57607e of _0xe974b1){if(!_0x57607e)continue;_0x57607e[_0x1e0f57('0x5a3')](Math[_0x1e0f57('0x1b2')](_0x11b402),Math[_0x1e0f57('0x1b2')](_0xac31b7),!!_0x53b056);}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Movement_Float',_0x5185f4=>{const _0x23f83f=_0x467fb5;if(!SceneManager[_0x23f83f('0x21')]())return;VisuMZ[_0x23f83f('0x7ae')](_0x5185f4,_0x5185f4);const _0x3a25a4=$gameTemp[_0x23f83f('0x606')](),_0x328373=VisuMZ[_0x23f83f('0x3a1')](_0x5185f4[_0x23f83f('0x27f')]),_0x8ee7e5=_0x5185f4[_0x23f83f('0x3a6')],_0x421a6e=_0x5185f4[_0x23f83f('0x5c7')],_0x4b9f07=_0x5185f4[_0x23f83f('0x1aa')],_0x863705=_0x5185f4[_0x23f83f('0x308')];if(!_0x3a25a4)return;for(const _0xaabdc1 of _0x328373){if(!_0xaabdc1)continue;_0xaabdc1[_0x23f83f('0x462')](_0x8ee7e5,_0x421a6e,_0x4b9f07);}if(_0x863705)_0x3a25a4[_0x23f83f('0x707')]('battleFloat');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x663'),_0x6d8abb=>{const _0xdd5c06=_0x467fb5;if(!SceneManager[_0xdd5c06('0x21')]())return;VisuMZ['ConvertParams'](_0x6d8abb,_0x6d8abb);const _0x53c0e9=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x53c0e9)return;const _0x1f28e9=VisuMZ['CreateActionSequenceTargets'](_0x6d8abb[_0xdd5c06('0x27f')]);for(const _0x4df485 of _0x1f28e9){if(_0xdd5c06('0x41f')!=='zptFt'){function _0x42953c(){const _0x511302=_0xdd5c06;this[_0x511302('0x383')](0x0,0x0,0xc);}}else{if(!_0x4df485)continue;_0x4df485[_0xdd5c06('0x57c')]();}}if(_0x6d8abb[_0xdd5c06('0x6f2')])_0x53c0e9[_0xdd5c06('0x707')]('battleMove');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0xb'),_0x1e530b=>{const _0x908dfe=_0x467fb5;if(!SceneManager[_0x908dfe('0x21')]())return;VisuMZ['ConvertParams'](_0x1e530b,_0x1e530b);const _0x46dea9=$gameTemp[_0x908dfe('0x606')](),_0x1ba137=VisuMZ[_0x908dfe('0x3a1')](_0x1e530b['Targets']),_0x10e26e=_0x1e530b[_0x908dfe('0x3a6')],_0x6368b7=_0x1e530b[_0x908dfe('0x5c7')],_0x368dc7=_0x1e530b[_0x908dfe('0x515')];if(!_0x46dea9)return;for(const _0x18e125 of _0x1ba137){if('WKdXz'!==_0x908dfe('0x1c4')){if(!_0x18e125)continue;_0x18e125[_0x908dfe('0x811')](_0x10e26e,_0x6368b7);}else{function _0x469068(){const _0x442f0f=_0x908dfe;if(!this['isAutoBattleCommandAdded']())return;const _0x6df971=this[_0x442f0f('0x581')](),_0x129bce=_0x282021[_0x442f0f('0x15b')]['Settings'][_0x442f0f('0x389')][_0x442f0f('0x239')],_0x9b54c8=_0x6df971===_0x442f0f('0x5c0')?_0x36f5dd['autoBattle']:_0x442f0f('0x1f')['format'](_0x129bce,_0x5c3586[_0x442f0f('0x61')]),_0x47ccf9=this['isAutoBattleCommandEnabled']();this['addCommand'](_0x9b54c8,_0x442f0f('0x61'),_0x47ccf9);}}}if(_0x368dc7)_0x46dea9[_0x908dfe('0x707')]('battleJump');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x95'),_0x59be19=>{const _0x4ebac8=_0x467fb5;if(!SceneManager[_0x4ebac8('0x21')]())return;if(!$gameSystem[_0x4ebac8('0xe1')]())return;VisuMZ[_0x4ebac8('0x7ae')](_0x59be19,_0x59be19);const _0x11fab4=$gameTemp[_0x4ebac8('0x606')](),_0x559686=VisuMZ[_0x4ebac8('0x3a1')](_0x59be19[_0x4ebac8('0x27f')]),_0x51cc7b=_0x59be19[_0x4ebac8('0x3c3')],_0xb9c2c2=_0x59be19[_0x4ebac8('0x92')],_0x5a5cf1=_0x59be19[_0x4ebac8('0x446')],_0x446626=_0x59be19[_0x4ebac8('0x5c7')],_0x4b1648=_0x59be19['FaceDirection'],_0x2c187f=_0x59be19[_0x4ebac8('0x1aa')],_0x37d8f6=_0x59be19[_0x4ebac8('0x356')],_0xf625f9=_0x59be19['WaitForMovement'];if(!_0x11fab4)return;for(const _0x4141bf of _0x559686){if(_0x4ebac8('0x13d')!==_0x4ebac8('0x13d')){function _0x5b17d8(){const _0x18da0c=_0x4ebac8;return this[_0x18da0c('0x130')]()?this['makeTargetsBattleCore']():_0x3d43a7['BattleCore'][_0x18da0c('0x83c')]['call'](this);}}else{if(!_0x4141bf)continue;let _0x273855=_0xb9c2c2,_0x59fb31=_0x5a5cf1;if(_0x51cc7b[_0x4ebac8('0x5e2')](/horz/i))_0x273855*=_0x4141bf[_0x4ebac8('0x317')]()?-0x1:0x1;if(_0x51cc7b[_0x4ebac8('0x5e2')](/vert/i))_0x59fb31*=_0x4141bf[_0x4ebac8('0x317')]()?-0x1:0x1;_0x4141bf[_0x4ebac8('0x704')](_0x273855,_0x59fb31,_0x446626,_0x4b1648,_0x2c187f),_0x4141bf['requestMotion'](_0x37d8f6);}}if(_0xf625f9)_0x11fab4[_0x4ebac8('0x707')]('battleMove');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x657'),_0xae28b6=>{const _0x52f6cd=_0x467fb5;if(!SceneManager[_0x52f6cd('0x21')]())return;if(!$gameSystem[_0x52f6cd('0xe1')]())return;VisuMZ['ConvertParams'](_0xae28b6,_0xae28b6);const _0x39f4ae=$gameTemp['getLastPluginCommandInterpreter'](),_0x57f084=VisuMZ['CreateActionSequenceTargets'](_0xae28b6[_0x52f6cd('0x27f')]),_0x5c8ac0=_0xae28b6['Destination'],_0x3dc257=_0xae28b6[_0x52f6cd('0x8a3')],_0xb26e0c=_0xae28b6[_0x52f6cd('0x4f2')],_0x54a4c9=_0xae28b6[_0x52f6cd('0x101')],_0x181373=_0xae28b6[_0x52f6cd('0x5c7')],_0x396125=_0xae28b6[_0x52f6cd('0x791')],_0x67c37e=_0xae28b6['EasingType'],_0x19b2f6=_0xae28b6[_0x52f6cd('0x356')],_0x449c0d=_0xae28b6[_0x52f6cd('0x6f2')];if(!_0x39f4ae)return;for(const _0x69588b of _0x57f084){if('reOjx'===_0x52f6cd('0x610')){if(!_0x69588b)continue;let _0x23d399=_0x69588b['battler']()[_0x52f6cd('0x5f6')],_0x2af9d1=_0x69588b[_0x52f6cd('0x67b')]()[_0x52f6cd('0x345')];if(_0x5c8ac0[_0x52f6cd('0x5e2')](/home/i)){if(_0x52f6cd('0x897')!==_0x52f6cd('0x897')){function _0x38dfce(){const _0x4eb50a=_0x52f6cd;if(!_0x56d816['_scene'])return;if(!_0x43d31b[_0x4eb50a('0x26e')][_0x4eb50a('0x841')])return;if(!_0x45a487['_scene'][_0x4eb50a('0x841')][_0x4eb50a('0x7a7')])return;return _0x43bf75[_0x4eb50a('0x26e')][_0x4eb50a('0x841')][_0x4eb50a('0x7a7')];}}else _0x23d399=_0x69588b[_0x52f6cd('0x67b')]()['_homeX'],_0x2af9d1=_0x69588b['battler']()[_0x52f6cd('0x1b7')];}else{if(_0x5c8ac0[_0x52f6cd('0x5e2')](/center/i)){if('ilGlZ'!=='ilGlZ'){function _0x4536be(){const _0x177f4=_0x52f6cd;return _0x177f4('0x2d0')[_0x177f4('0x11')](_0x49362c(_0x5abaf1['$1']));}}else _0x23d399=Graphics[_0x52f6cd('0x314')]/0x2,_0x2af9d1=Graphics[_0x52f6cd('0x678')]/0x2;}else{if(_0x5c8ac0[_0x52f6cd('0x5e2')](/point (\d+), (\d+)/i)){if('RAtZB'!==_0x52f6cd('0x38a'))_0x23d399=Number(RegExp['$1']),_0x2af9d1=Number(RegExp['$2']);else{function _0x62dc7d(){const _0x67f676=_0x52f6cd;if(!_0x9c7d6b[_0x67f676('0x21')]())return;_0x1f816c[_0x67f676('0x7ae')](_0x24e12d,_0x564d40);const _0xac6ecd=_0x5d08c2[_0x67f676('0x198')],_0x2ce470={'arPenRate':_0x2c0ae7[_0x67f676('0x1c9')],'arPenFlat':_0x4ee968[_0x67f676('0x505')],'arRedRate':_0x56e89a[_0x67f676('0x302')],'arRedFlat':_0xcb3fa3[_0x67f676('0x73e')]};_0xac6ecd[_0x67f676('0x6aa')]=_0x2ce470;}}}}}if(_0x3dc257['match'](/horz/i))_0x23d399+=_0x69588b[_0x52f6cd('0x317')]()?-_0xb26e0c:_0xb26e0c;if(_0x3dc257['match'](/vert/i))_0x2af9d1+=_0x69588b['isActor']()?-_0x54a4c9:_0x54a4c9;_0x69588b['moveBattlerToPoint'](_0x23d399,_0x2af9d1,_0x181373,_0x396125,_0x67c37e,-0x1),_0x69588b[_0x52f6cd('0x738')](_0x19b2f6);}else{function _0x1206a5(){const _0xb987c6=_0x52f6cd;if(!_0x5df736[_0xb987c6('0x6d3')])return;(_0x14a3f3[_0xb987c6('0x7d6')]('ok')||_0x377d87[_0xb987c6('0x7d6')](_0xb987c6('0x4aa'))||_0x4071a9[_0xb987c6('0x97')]()||_0x55659c[_0xb987c6('0x7a3')]())&&(_0x5eb144['playCancel'](),_0x5a65ae['_autoBattle']=![],_0x365ecc[_0xb987c6('0x418')](),_0x5d6950[_0xb987c6('0x418')]());}}}if(_0x449c0d)_0x39f4ae[_0x52f6cd('0x707')](_0x52f6cd('0x46'));}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x201'),_0x3930b2=>{const _0x459b17=_0x467fb5;if(!SceneManager[_0x459b17('0x21')]())return;if(!$gameSystem[_0x459b17('0xe1')]())return;VisuMZ[_0x459b17('0x7ae')](_0x3930b2,_0x3930b2);const _0x765639=$gameTemp[_0x459b17('0x606')](),_0x2510fa=VisuMZ[_0x459b17('0x3a1')](_0x3930b2[_0x459b17('0x26b')]),_0x116107=VisuMZ['CreateActionSequenceTargets'](_0x3930b2[_0x459b17('0x7fa')]),_0x42e3f2=_0x3930b2[_0x459b17('0x4ae')];let _0x4a69fc=_0x3930b2['MeleeDistance'];const _0x4983be=_0x3930b2[_0x459b17('0x8a3')],_0x5d549c=_0x3930b2[_0x459b17('0x4f2')],_0x187b76=_0x3930b2[_0x459b17('0x101')],_0x4caa22=_0x3930b2[_0x459b17('0x5c7')],_0x25f043=_0x3930b2[_0x459b17('0x791')],_0x237abc=_0x3930b2['EasingType'],_0x3f9e74=_0x3930b2[_0x459b17('0x356')],_0x3bcb4d=_0x3930b2[_0x459b17('0x6f2')],_0x5556d7=Math[_0x459b17('0x5e9')](..._0x116107[_0x459b17('0xae')](_0x27e3d0=>_0x27e3d0['battler']()[_0x459b17('0x5f6')]-_0x27e3d0[_0x459b17('0x67b')]()[_0x459b17('0x445')]()/0x2)),_0xa4a6d3=Math['max'](..._0x116107[_0x459b17('0xae')](_0x3e5c36=>_0x3e5c36[_0x459b17('0x67b')]()[_0x459b17('0x5f6')]+_0x3e5c36[_0x459b17('0x67b')]()['mainSpriteWidth']()/0x2)),_0x20c28b=Math[_0x459b17('0x5e9')](..._0x116107[_0x459b17('0xae')](_0x5ad9cf=>_0x5ad9cf[_0x459b17('0x67b')]()[_0x459b17('0x345')]-_0x5ad9cf[_0x459b17('0x67b')]()['mainSpriteHeight']())),_0x813c1=Math['max'](..._0x116107['map'](_0x43ebbc=>_0x43ebbc[_0x459b17('0x67b')]()[_0x459b17('0x345')])),_0x21a330=_0x116107[_0x459b17('0x649')](_0x492d6a=>_0x492d6a[_0x459b17('0x317')]())[_0x459b17('0x828')],_0x3cfb8f=_0x116107[_0x459b17('0x649')](_0x5affcf=>_0x5affcf[_0x459b17('0x8c6')]())['length'];let _0x1cc695=0x0,_0x24dd4b=0x0;if(_0x42e3f2['match'](/front/i))_0x1cc695=_0x21a330>=_0x3cfb8f?_0x5556d7:_0xa4a6d3;else{if(_0x42e3f2[_0x459b17('0x5e2')](/middle/i)){if('EchKu'==='XbEmu'){function _0x180cf7(){const _0x2d2d18=_0x459b17;_0x499a78?(this[_0x2d2d18('0x8e6')]['x']=(_0x26cb86[_0x2d2d18('0x6c2')]-_0x220b9f[_0x2d2d18('0x314')])/0x2,this[_0x2d2d18('0x8e6')]['y']=(_0x5a2ff2[_0x2d2d18('0x41e')]-_0x1b81cf[_0x2d2d18('0x678')])/0x2):(this[_0x2d2d18('0x8e6')]['x']=_0x384adf[_0x2d2d18('0x6c2')]*0xa,this[_0x2d2d18('0x8e6')]['y']=_0x2677ea[_0x2d2d18('0x41e')]*0xa);}}else _0x1cc695=(_0x5556d7+_0xa4a6d3)/0x2,_0x4a69fc=-0x1;}else _0x42e3f2['match'](/back/i)&&(_0x1cc695=_0x21a330>=_0x3cfb8f?_0xa4a6d3:_0x5556d7);}if(_0x42e3f2[_0x459b17('0x5e2')](/head/i))_0x24dd4b=_0x20c28b;else{if(_0x42e3f2['match'](/center/i)){if(_0x459b17('0x895')!==_0x459b17('0x77b'))_0x24dd4b=(_0x20c28b+_0x813c1)/0x2;else{function _0x2cb38d(){return this['_distortionSprite']||this['_mainSprite']||this;}}}else _0x42e3f2[_0x459b17('0x5e2')](/base/i)&&(_0x24dd4b=_0x813c1);}if(!_0x765639)return;for(const _0xdea7c of _0x2510fa){if(!_0xdea7c)continue;let _0x215ea9=_0x1cc695,_0x4ed3bd=_0x24dd4b;if(_0x4983be[_0x459b17('0x5e2')](/horz/i))_0x215ea9+=_0xdea7c['isActor']()?-_0x5d549c:_0x5d549c;if(_0x4983be[_0x459b17('0x5e2')](/vert/i))_0x4ed3bd+=_0xdea7c['isActor']()?-_0x187b76:_0x187b76;_0xdea7c[_0x459b17('0x20a')](_0x215ea9,_0x4ed3bd,_0x4caa22,_0x25f043,_0x237abc,_0x4a69fc),_0xdea7c[_0x459b17('0x738')](_0x3f9e74);}if(_0x3bcb4d)_0x765639[_0x459b17('0x707')](_0x459b17('0x46'));}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x8ab'),_0x8d146d=>{const _0x378573=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x378573('0x7ae')](_0x8d146d,_0x8d146d);const _0x427be6=$gameTemp['getLastPluginCommandInterpreter'](),_0x1e25e4=VisuMZ[_0x378573('0x3a1')](_0x8d146d[_0x378573('0x27f')]),_0x45662a=_0x8d146d['Opacity'],_0x300ea0=_0x8d146d[_0x378573('0x5c7')],_0x51b8f7=_0x8d146d[_0x378573('0x1aa')],_0x64b514=_0x8d146d[_0x378573('0x54')];if(!_0x427be6)return;for(const _0x4f2550 of _0x1e25e4){if(!_0x4f2550)continue;_0x4f2550[_0x378573('0x247')](_0x45662a,_0x300ea0,_0x51b8f7);}if(_0x64b514)_0x427be6['setWaitMode'](_0x378573('0x449'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x429'),_0x155d62=>{const _0x486873=_0x467fb5;if(!SceneManager[_0x486873('0x21')]())return;VisuMZ['ConvertParams'](_0x155d62,_0x155d62);const _0xd43583=$gameTemp[_0x486873('0x606')](),_0x55e576=VisuMZ[_0x486873('0x3a1')](_0x155d62[_0x486873('0x27f')]),_0x1a398b=_0x155d62[_0x486873('0x3f8')],_0x45f9b7=_0x155d62[_0x486873('0x2a5')],_0x2a7465=_0x155d62['Duration'],_0x5d112e=_0x155d62[_0x486873('0x1aa')],_0x552be3=_0x155d62['WaitForScale'];if(!_0xd43583)return;for(const _0x1722eb of _0x55e576){if(!_0x1722eb)continue;_0x1722eb[_0x486873('0x43d')](_0x1a398b,_0x45f9b7,_0x2a7465,_0x5d112e);}if(_0x552be3)_0xd43583[_0x486873('0x707')](_0x486873('0x4f4'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Movement_Skew',_0x408d25=>{const _0x22277a=_0x467fb5;if(!SceneManager[_0x22277a('0x21')]())return;VisuMZ['ConvertParams'](_0x408d25,_0x408d25);const _0x43107a=$gameTemp[_0x22277a('0x606')](),_0x2db14a=VisuMZ[_0x22277a('0x3a1')](_0x408d25['Targets']),_0x21955b=_0x408d25[_0x22277a('0x39f')],_0x407b2e=_0x408d25[_0x22277a('0x708')],_0x7c3308=_0x408d25[_0x22277a('0x5c7')],_0x2ee6bc=_0x408d25[_0x22277a('0x1aa')],_0x3ebda4=_0x408d25[_0x22277a('0x31e')];if(!_0x43107a)return;for(const _0x3f7d63 of _0x2db14a){if(!_0x3f7d63)continue;_0x3f7d63[_0x22277a('0x7b')](_0x21955b,_0x407b2e,_0x7c3308,_0x2ee6bc);}if(_0x3ebda4)_0x43107a[_0x22277a('0x707')](_0x22277a('0x76d'));}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x15'),_0x36c934=>{const _0x19dd1f=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x19dd1f('0x7ae')](_0x36c934,_0x36c934);const _0x152a53=$gameTemp[_0x19dd1f('0x606')](),_0x5dfe26=VisuMZ[_0x19dd1f('0x3a1')](_0x36c934['Targets']),_0x3c4de2=_0x36c934['Angle'],_0x57c2b0=_0x36c934[_0x19dd1f('0x5c7')],_0x361485=_0x36c934[_0x19dd1f('0x1aa')],_0x2e237a=_0x36c934['RevertAngle'],_0x4837d4=_0x36c934['WaitForSpin'];if(!_0x152a53)return;for(const _0x32135e of _0x5dfe26){if(_0x19dd1f('0x3ae')!==_0x19dd1f('0x3ae')){function _0x593472(){const _0x4a4700=_0x19dd1f;if(this[_0x4a4700('0x4ec')]!==_0x4a4700('0x549'))return this[_0x4a4700('0x867')](_0x371e17);else return _0x3991f0[_0x4a4700('0x5cf')](this[_0x4a4700('0x19a')]())==='MANUAL'?_0x47f49e[_0x4a4700('0x15b')][_0x4a4700('0x69')][_0x4a4700('0x709')](this,_0xe54ffb):this['evalDamageFormulaBattleCore'](_0x55b3ab);}}else{if(!_0x32135e)continue;_0x32135e[_0x19dd1f('0x8be')](_0x3c4de2,_0x57c2b0,_0x361485,_0x2e237a);}}if(_0x4837d4)_0x152a53[_0x19dd1f('0x707')]('battleSpin');}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Movement_WaitForFloat',_0x6ffdb6=>{const _0x1cc87c=_0x467fb5;if(!SceneManager[_0x1cc87c('0x21')]())return;const _0x1ee5ac=$gameTemp[_0x1cc87c('0x606')]();if(!_0x1ee5ac)return;_0x1ee5ac[_0x1cc87c('0x707')](_0x1cc87c('0x6ce'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x839'),_0x416025=>{const _0x5dce88=_0x467fb5;if(!SceneManager[_0x5dce88('0x21')]())return;const _0x1b49c0=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x1b49c0)return;_0x1b49c0['setWaitMode'](_0x5dce88('0xc8'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x14'),_0x924400=>{const _0xa2cd18=_0x467fb5;if(!SceneManager[_0xa2cd18('0x21')]())return;const _0x5a3da0=$gameTemp[_0xa2cd18('0x606')]();if(!_0x5a3da0)return;_0x5a3da0[_0xa2cd18('0x707')](_0xa2cd18('0x46'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x6f1'),_0x409077=>{const _0x3d3f73=_0x467fb5;if(!SceneManager[_0x3d3f73('0x21')]())return;const _0x5abe52=$gameTemp[_0x3d3f73('0x606')]();if(!_0x5abe52)return;_0x5abe52[_0x3d3f73('0x707')](_0x3d3f73('0x449'));}),PluginManager['registerCommand'](pluginData['name'],_0x467fb5('0x2b1'),_0x5a183d=>{const _0x3e7594=_0x467fb5;if(!SceneManager[_0x3e7594('0x21')]())return;const _0x459eb8=$gameTemp[_0x3e7594('0x606')]();if(!_0x459eb8)return;_0x459eb8['setWaitMode'](_0x3e7594('0x4f4'));}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],'ActSeq_Movement_WaitForSkew',_0x29564f=>{const _0x5a1f28=_0x467fb5;if(!SceneManager['isSceneBattle']())return;const _0x28ca95=$gameTemp[_0x5a1f28('0x606')]();if(!_0x28ca95)return;_0x28ca95[_0x5a1f28('0x707')](_0x5a1f28('0x76d'));}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x6f0'),_0x4a0fa7=>{const _0x30fe36=_0x467fb5;if(!SceneManager[_0x30fe36('0x21')]())return;const _0x48e79a=$gameTemp[_0x30fe36('0x606')]();if(!_0x48e79a)return;_0x48e79a[_0x30fe36('0x707')](_0x30fe36('0x81c'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x605'),_0x37795f=>{const _0x5e1929=_0x467fb5;if(!SceneManager[_0x5e1929('0x21')]())return;if(!Imported[_0x5e1929('0x50c')])return;VisuMZ[_0x5e1929('0x7ae')](_0x37795f,_0x37795f);const _0x222cab=$gameTemp['getLastPluginCommandInterpreter'](),_0x5951cc=_0x37795f[_0x5e1929('0x31e')];if(!_0x222cab)return;$gameScreen['setBattleSkew'](_0x37795f[_0x5e1929('0x39f')],_0x37795f['SkewY'],_0x37795f[_0x5e1929('0x5c7')],_0x37795f['EasingType']);if(_0x5951cc)_0x222cab[_0x5e1929('0x707')](_0x5e1929('0x685'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x1ff'),_0x582dbb=>{const _0x82d788=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x82d788('0x50c')])return;VisuMZ[_0x82d788('0x7ae')](_0x582dbb,_0x582dbb);const _0x34c18b=$gameTemp[_0x82d788('0x606')](),_0x42184a=_0x582dbb[_0x82d788('0x31e')];if(!_0x34c18b)return;$gameScreen[_0x82d788('0x3fa')](0x0,0x0,_0x582dbb[_0x82d788('0x5c7')],_0x582dbb[_0x82d788('0x1aa')]);if(_0x42184a)_0x34c18b[_0x82d788('0x707')](_0x82d788('0x685'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x618'),_0x467b9e=>{const _0x319023=_0x467fb5;if(!SceneManager[_0x319023('0x21')]())return;if(!Imported[_0x319023('0x50c')])return;const _0x3fa8e7=$gameTemp[_0x319023('0x606')]();if(!_0x3fa8e7)return;_0x3fa8e7[_0x319023('0x707')](_0x319023('0x685'));}),PluginManager['registerCommand'](pluginData[_0x467fb5('0x22a')],'ActSeq_Target_CurrentIndex',_0x29c975=>{const _0x3ef862=_0x467fb5;if(!SceneManager[_0x3ef862('0x21')]())return;VisuMZ[_0x3ef862('0x7ae')](_0x29c975,_0x29c975);const _0x35115d=$gameTemp[_0x3ef862('0x606')](),_0x7286ee=_0x29c975['Index'],_0x269356=_0x29c975[_0x3ef862('0x1da')];if(!_0x35115d)return;BattleManager[_0x3ef862('0x83')]=_0x7286ee,BattleManager['_target']=BattleManager[_0x3ef862('0x66c')]?BattleManager['_allTargets'][BattleManager[_0x3ef862('0x83')]]||null:null;if(BattleManager[_0x3ef862('0x326')]&&_0x269356[_0x3ef862('0x66a')]()[_0x3ef862('0x23e')]()!==_0x3ef862('0x6cc')){if(_0x3ef862('0x37b')!==_0x3ef862('0x37b')){function _0x5ec760(){const _0x22101f=_0x3ef862;let _0x3e098c=_0x54d137[_0x22101f('0x15b')][_0x22101f('0x2b2')][_0x22101f('0x709')](this,_0x397316);return _0x3e098c=this['_multipliers']['hitRate']*_0x3e098c+this[_0x22101f('0x37e')][_0x22101f('0x1ad')],_0x3e098c;}}else _0x35115d[_0x3ef862('0x342')]([_0x269356]);}}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],_0x467fb5('0x3a3'),_0xab5445=>{const _0x2a3370=_0x467fb5;if(!SceneManager[_0x2a3370('0x21')]())return;VisuMZ[_0x2a3370('0x7ae')](_0xab5445,_0xab5445);const _0x1a1e7f=$gameTemp[_0x2a3370('0x606')](),_0x30ac94=_0xab5445[_0x2a3370('0x1da')];if(!_0x1a1e7f)return;BattleManager[_0x2a3370('0x83')]++,BattleManager[_0x2a3370('0x326')]=BattleManager[_0x2a3370('0x66c')][BattleManager[_0x2a3370('0x83')]]||null,BattleManager['_target']&&_0x30ac94[_0x2a3370('0x66a')]()['trim']()!==_0x2a3370('0x6cc')&&_0x1a1e7f[_0x2a3370('0x342')]([_0x30ac94]);}),PluginManager['registerCommand'](pluginData['name'],_0x467fb5('0x700'),_0x3ec41f=>{const _0x4aabea=_0x467fb5;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4aabea('0x7ae')](_0x3ec41f,_0x3ec41f);const _0x1988ff=$gameTemp[_0x4aabea('0x606')](),_0x4759a5=_0x3ec41f['JumpToLabel'];if(!_0x1988ff)return;BattleManager['_targetIndex']--,BattleManager[_0x4aabea('0x326')]=BattleManager[_0x4aabea('0x66c')][BattleManager[_0x4aabea('0x83')]]||null,BattleManager[_0x4aabea('0x326')]&&_0x4759a5[_0x4aabea('0x66a')]()[_0x4aabea('0x23e')]()!==_0x4aabea('0x6cc')&&_0x1988ff['command119']([_0x4759a5]);}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0x48d'),_0x51177c=>{const _0x16e895=_0x467fb5;if(!SceneManager[_0x16e895('0x21')]())return;VisuMZ[_0x16e895('0x7ae')](_0x51177c,_0x51177c);const _0x22dcad=$gameTemp['getLastPluginCommandInterpreter'](),_0x811828=_0x51177c[_0x16e895('0x42f')],_0x3be2a4=_0x51177c['JumpToLabel'];if(!_0x22dcad)return;const _0xed831e=BattleManager[_0x16e895('0x83')];for(;;){BattleManager['_targetIndex']=Math[_0x16e895('0xbe')](BattleManager[_0x16e895('0x66c')][_0x16e895('0x828')]);if(!_0x811828)break;if(BattleManager[_0x16e895('0x83')]!==_0xed831e)break;if(BattleManager['_allTargets'][_0x16e895('0x828')]<=0x1){BattleManager[_0x16e895('0x83')]=0x0;break;}}BattleManager['_target']=BattleManager[_0x16e895('0x66c')][BattleManager[_0x16e895('0x83')]]||null;if(BattleManager[_0x16e895('0x326')]&&_0x3be2a4[_0x16e895('0x66a')]()[_0x16e895('0x23e')]()!=='UNTITLED'){if(_0x16e895('0x5b9')!=='bWlPJ'){function _0x162c62(){const _0x64e8c=_0x16e895;_0x2e8109[_0x64e8c('0x1c6')]=_0x414ebd(_0x4b7dcc['$1'])[_0x64e8c('0x66a')]()[_0x64e8c('0x23e')]();}}else _0x22dcad['command119']([_0x3be2a4]);}}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],_0x467fb5('0xfc'),_0x101f54=>{const _0x3c8a5c=_0x467fb5;if(!SceneManager[_0x3c8a5c('0x21')]())return;if(!Imported[_0x3c8a5c('0x50c')])return;VisuMZ[_0x3c8a5c('0x7ae')](_0x101f54,_0x101f54);const _0x2a5d89=$gameTemp[_0x3c8a5c('0x606')](),_0x5a26f6=_0x101f54[_0x3c8a5c('0x648')];if(!_0x2a5d89)return;$gameScreen[_0x3c8a5c('0x756')](_0x101f54[_0x3c8a5c('0x9')],_0x101f54[_0x3c8a5c('0x5c7')],_0x101f54[_0x3c8a5c('0x1aa')]);if(_0x5a26f6)_0x2a5d89['setWaitMode'](_0x3c8a5c('0x544'));}),PluginManager[_0x467fb5('0x75a')](pluginData['name'],'ActSeq_Zoom_Reset',_0x7eb5df=>{const _0x3f434a=_0x467fb5;if(!SceneManager[_0x3f434a('0x21')]())return;if(!Imported[_0x3f434a('0x50c')])return;VisuMZ[_0x3f434a('0x7ae')](_0x7eb5df,_0x7eb5df);const _0x5aaff9=$gameTemp[_0x3f434a('0x606')](),_0x4a8c19=_0x7eb5df[_0x3f434a('0x648')];if(!_0x5aaff9)return;$gameScreen[_0x3f434a('0x756')](0x1,_0x7eb5df[_0x3f434a('0x5c7')],_0x7eb5df['EasingType']);if(_0x4a8c19)_0x5aaff9['setWaitMode'](_0x3f434a('0x544'));}),PluginManager[_0x467fb5('0x75a')](pluginData[_0x467fb5('0x22a')],'ActSeq_Zoom_WaitForZoom',_0x4254a1=>{const _0x9e8eba=_0x467fb5;if(!SceneManager[_0x9e8eba('0x21')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x1c0aff=$gameTemp[_0x9e8eba('0x606')]();if(!_0x1c0aff)return;_0x1c0aff[_0x9e8eba('0x707')]('battleZoom');}),VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x86d')]=Scene_Boot['prototype'][_0x467fb5('0x821')],Scene_Boot[_0x467fb5('0xc9')][_0x467fb5('0x821')]=function(){const _0x5e1ad4=_0x467fb5;this['process_VisuMZ_BattleCore_Failsafes'](),this[_0x5e1ad4('0x501')](),this[_0x5e1ad4('0x75d')](),this['process_VisuMZ_BattleCore_CreateRegExp'](),VisuMZ[_0x5e1ad4('0x15b')][_0x5e1ad4('0x86d')][_0x5e1ad4('0x709')](this),this[_0x5e1ad4('0x694')](),this['process_VisuMZ_BattleCore_BaseTroops']();},Scene_Boot[_0x467fb5('0xc9')][_0x467fb5('0x694')]=function(){const _0x4fb54f=_0x467fb5;if(VisuMZ[_0x4fb54f('0x801')])return;this['process_VisuMZ_BattleCore_Action_Notetags'](),this[_0x4fb54f('0x6e7')](),this[_0x4fb54f('0x71e')]();},Scene_Boot[_0x467fb5('0xc9')][_0x467fb5('0xf3')]=function(){const _0x2bd30a=_0x467fb5,_0x24129e=$dataSystem[_0x2bd30a('0x8e')][_0x2bd30a('0x828')];for(let _0x5a2a02=0x0;_0x5a2a02<_0x24129e;_0x5a2a02++){if('zTxjf'!==_0x2bd30a('0x83d')){const _0x12975b=$dataSystem['attackMotions'][_0x5a2a02];if(_0x12975b)continue;$dataSystem[_0x2bd30a('0x7f1')][_0x5a2a02]=JsonEx['makeDeepCopy']($dataSystem[_0x2bd30a('0x7f1')][0x0]);}else{function _0x1df9e4(){const _0x3b6bb7=_0x2bd30a;return _0x20d5df['Formula'][_0x3b6bb7('0x709')](this,_0x372c94);}}}},Scene_Boot['prototype'][_0x467fb5('0x501')]=function(){const _0x1c6311=_0x467fb5,_0x282c38=VisuMZ[_0x1c6311('0x15b')][_0x1c6311('0x110')];if(_0x282c38[_0x1c6311('0x82c')][_0x1c6311('0x6b4')]===undefined){if(_0x1c6311('0x66f')==='gDlfh')_0x282c38[_0x1c6311('0x82c')][_0x1c6311('0x6b4')]=_0x1c6311('0x286');else{function _0x21be1(){_0x12b19e=_0x17323e>=_0xff1d6d?_0x4e7101:_0x1e4236;}}}if(_0x282c38['Actor'][_0x1c6311('0x7a5')]===undefined){if(_0x1c6311('0x81e')!==_0x1c6311('0x212'))_0x282c38[_0x1c6311('0x231')][_0x1c6311('0x7a5')]=![];else{function _0x2cd111(){return this['getMenuImage']();}}}_0x282c38[_0x1c6311('0x3a0')][_0x1c6311('0x7a5')]===undefined&&(_0x282c38[_0x1c6311('0x3a0')]['SmoothImage']=!![]);if(_0x282c38[_0x1c6311('0x231')][_0x1c6311('0x5b1')]===undefined){if('bYrrs'!==_0x1c6311('0x82b'))_0x282c38[_0x1c6311('0x231')]['PrioritySortActive']=![];else{function _0x5c0ffb(){const _0xa22f33=_0x1c6311;this[_0xa22f33('0x738')](_0xa22f33('0x8c0'));}}}_0x282c38['Actor'][_0x1c6311('0x6da')]===undefined&&(_0x282c38[_0x1c6311('0x231')][_0x1c6311('0x6da')]=!![]);},VisuMZ[_0x467fb5('0x1e0')]={},Scene_Boot[_0x467fb5('0xc9')][_0x467fb5('0x75d')]=function(){const _0x1bfdc7=_0x467fb5;for(const _0x5cf253 of VisuMZ[_0x1bfdc7('0x15b')]['Settings'][_0x1bfdc7('0x82c')][_0x1bfdc7('0x59c')]){if(!_0x5cf253)continue;const _0x44c595=_0x5cf253[_0x1bfdc7('0x43')][_0x1bfdc7('0x66a')]()[_0x1bfdc7('0x23e')]();VisuMZ[_0x1bfdc7('0x1e0')][_0x44c595]=_0x5cf253;}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0xa1')]={},Scene_Boot[_0x467fb5('0xc9')][_0x467fb5('0x75e')]=function(){const _0x2ead62=_0x467fb5,_0x394755=VisuMZ['BattleCore'][_0x2ead62('0xa1')],_0xe2e3ac=_0x2ead62('0x25c'),_0x129b87=[[_0x2ead62('0x10e'),_0x2ead62('0x224')],['Post',_0x2ead62('0x62c')]],_0x211fb8=[[_0x2ead62('0x3eb'),_0x2ead62('0x3db')],[_0x2ead62('0x83b'),_0x2ead62('0x438')]],_0x118c14=[['',''],[_0x2ead62('0x19d'),_0x2ead62('0x7d3')],[_0x2ead62('0x525'),_0x2ead62('0x332')]];for(const _0x16f0d1 of _0x211fb8){if(_0x2ead62('0x369')===_0x2ead62('0x369'))for(const _0x44e32 of _0x118c14){if('vodfp'!==_0x2ead62('0x78f'))for(const _0x35194f of _0x129b87){const _0x5f39d9=_0x16f0d1[0x0][_0x2ead62('0x11')](_0x35194f[0x0],_0x44e32[0x0]),_0x56e76a=_0x16f0d1[0x1][_0x2ead62('0x11')](_0x35194f[0x1],_0x44e32[0x1])[_0x2ead62('0x23e')](),_0x15fe21=new RegExp(_0xe2e3ac[_0x2ead62('0x11')](_0x56e76a),'i');_0x394755[_0x5f39d9]=_0x15fe21;}else{function _0xb41183(){const _0x1b54e3=_0x2ead62;if(!this['enemy']())return;_0x33e6a3[_0x1b54e3('0x5df')]()?this['x']=_0x2203f5[_0x1b54e3('0x314')]-this[_0x1b54e3('0x3f9')]()[_0x1b54e3('0x67b')]()[_0x1b54e3('0x5f6')]:this['x']=this[_0x1b54e3('0x3f9')]()[_0x1b54e3('0x67b')]()[_0x1b54e3('0x5f6')];this['x']-=_0x5e93db[_0x1b54e3('0x1b2')](this[_0x1b54e3('0x6c2')]/0x2),this['y']=this[_0x1b54e3('0x3f9')]()[_0x1b54e3('0x67b')]()[_0x1b54e3('0x345')]-_0x3fe61f[_0x1b54e3('0x1b2')](this['lineHeight']()*1.5);const _0x5ec61c=_0x174718[_0x1b54e3('0x15b')]['Settings'][_0x1b54e3('0x3a0')];this['x']+=_0x5ec61c['NameOffsetX']||0x0,this['y']+=_0x5ec61c[_0x1b54e3('0x822')]||0x0;}}}else{function _0x16f096(){const _0xb5bdb8=_0x2ead62;return _0x40010a[_0xb5bdb8('0x15b')][_0xb5bdb8('0x110')][_0xb5bdb8('0x1b9')][_0xb5bdb8('0x293')];}}}const _0x45f722=[['%1StartActionJS',_0x2ead62('0x13b')],[_0x2ead62('0x9c'),_0x2ead62('0x696')]];for(const _0x5d05ca of _0x45f722){for(const _0x4aaec5 of _0x129b87){const _0xd2cb23=_0x5d05ca[0x0][_0x2ead62('0x11')](_0x4aaec5[0x0]),_0x499d6e=_0x5d05ca[0x1][_0x2ead62('0x11')](_0x4aaec5[0x1]),_0x517487=new RegExp(_0xe2e3ac[_0x2ead62('0x11')](_0x499d6e),'i');_0x394755[_0xd2cb23]=_0x517487;}}const _0x157c28=[[_0x2ead62('0x4d2'),_0x2ead62('0x1e8')],[_0x2ead62('0x8c5'),_0x2ead62('0x138')],[_0x2ead62('0x17b'),_0x2ead62('0x10b')],[_0x2ead62('0x5ad'),_0x2ead62('0x39')],[_0x2ead62('0x1d4'),_0x2ead62('0x5fc')],[_0x2ead62('0x8bf'),_0x2ead62('0x44d')],[_0x2ead62('0x120'),_0x2ead62('0x54a')],[_0x2ead62('0x406'),_0x2ead62('0x8f')],[_0x2ead62('0x486'),_0x2ead62('0x5fb')]];for(const _0x24c3f0 of _0x157c28){for(const _0x1da046 of _0x129b87){const _0x12044e=_0x24c3f0[0x0]['format'](_0x1da046[0x0]),_0x302e5b=_0x24c3f0[0x1][_0x2ead62('0x11')](_0x1da046[0x1]),_0x3e6fc2=new RegExp(_0xe2e3ac[_0x2ead62('0x11')](_0x302e5b),'i');_0x394755[_0x12044e]=_0x3e6fc2;}}},Scene_Boot['prototype'][_0x467fb5('0x441')]=function(){const _0x219aec=_0x467fb5,_0x33b531=$dataSkills[_0x219aec('0x112')]($dataItems);for(const _0x5472e3 of _0x33b531){if(_0x219aec('0x121')==='UGqCr'){function _0x3b0162(){const _0x51749b=_0x219aec,_0x1c4817=_0x2e93db[_0x51749b('0xc9')][_0x51749b('0x85e')][_0x51749b('0x709')](arguments,0x1);this['_methods']['unshift']({'name':_0x3af53f,'params':_0x1c4817});}}else{if(!_0x5472e3)continue;VisuMZ['BattleCore'][_0x219aec('0x315')](_0x5472e3);}}},Scene_Boot['prototype'][_0x467fb5('0x6e7')]=function(){const _0x29ae55=_0x467fb5,_0x4cc03b=$dataActors[_0x29ae55('0x112')]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x14392 of _0x4cc03b){if(_0x29ae55('0x60')===_0x29ae55('0x344')){function _0x3b218d(){const _0xebb9d=_0x29ae55;if(!_0x54f3a5)return;if(!this[_0xebb9d('0x3ad')])return;this[_0xebb9d('0x3ad')][_0xebb9d('0x1d6')]['x']=this[_0xebb9d('0x621')]['svBattlerAnchorX'](),this[_0xebb9d('0x3ad')][_0xebb9d('0x1d6')]['y']=this[_0xebb9d('0x621')]['svBattlerAnchorY'](),this[_0xebb9d('0x123')]();}}else{if(!_0x14392)continue;VisuMZ[_0x29ae55('0x15b')][_0x29ae55('0x795')](_0x14392);}}},Scene_Boot[_0x467fb5('0xc9')][_0x467fb5('0x210')]=function(){const _0x34a858=_0x467fb5,_0x59a25a=VisuMZ[_0x34a858('0x15b')][_0x34a858('0x110')]['Mechanics'][_0x34a858('0x19e')],_0x444a7=[];for(const _0x4577d4 of _0x59a25a){if(_0x34a858('0x876')==='EcHER'){function _0x407214(){const _0xd5467=_0x34a858;if(!_0x5bdc4e[_0xd5467('0x3e')])return;if(!_0x7a2e0b[_0xd5467('0x21')]())return;if(this[_0xd5467('0xb2')]())return;if(this['isHidden']())return;if(_0x1c7fe3[_0xd5467('0x50e')][_0xd5467('0x5e2')](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x78c98d=_0x3ad88d(_0x5d285d['$1']);_0x1702cd[_0xd5467('0x153')]([this],_0x78c98d,![],![]);}}}else{const _0x58e12e=$dataTroops[_0x4577d4];if(_0x58e12e)_0x444a7[_0x34a858('0x26f')](JsonEx['makeDeepCopy'](_0x58e12e));}}for(const _0x2f50da of $dataTroops){if('EXXxa'==='JayFn'){function _0x21fd92(){const _0x515602=_0x34a858;_0x426f22[_0x515602('0x15b')][_0x515602('0x826')][_0x515602('0x709')](this,_0x394d53),this['callNextMethod']();}}else{if(!_0x2f50da)continue;for(const _0x5812aa of _0x444a7){if(_0x5812aa['id']===_0x2f50da['id'])continue;_0x2f50da['pages']=_0x2f50da['pages']['concat'](_0x5812aa[_0x34a858('0x219')]);}}}},Scene_Boot[_0x467fb5('0xc9')]['process_VisuMZ_BattleCore_jsFunctions']=function(){const _0x273ad7=_0x467fb5,_0x11f28e=$dataSkills['concat']($dataItems);for(const _0x33f7a3 of _0x11f28e){if(!_0x33f7a3)continue;VisuMZ['BattleCore'][_0x273ad7('0x757')](_0x33f7a3);}},VisuMZ['BattleCore'][_0x467fb5('0x4be')]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x467fb5('0x4be')]=function(_0xb4d2fd){const _0xff3a=_0x467fb5;VisuMZ[_0xff3a('0x15b')][_0xff3a('0x4be')][_0xff3a('0x709')](this,_0xb4d2fd),VisuMZ[_0xff3a('0x15b')][_0xff3a('0x795')](_0xb4d2fd);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x307')]=VisuMZ[_0x467fb5('0x307')],VisuMZ[_0x467fb5('0x307')]=function(_0x6b987d){const _0x1f0d3b=_0x467fb5;VisuMZ[_0x1f0d3b('0x15b')][_0x1f0d3b('0x307')]['call'](this,_0x6b987d),VisuMZ[_0x1f0d3b('0x15b')][_0x1f0d3b('0x795')](_0x6b987d);},VisuMZ['BattleCore'][_0x467fb5('0x2d')]=VisuMZ[_0x467fb5('0x2d')],VisuMZ[_0x467fb5('0x2d')]=function(_0x5cfe4c){const _0x19a78c=_0x467fb5;VisuMZ[_0x19a78c('0x15b')]['ParseSkillNotetags'][_0x19a78c('0x709')](this,_0x5cfe4c),VisuMZ['BattleCore'][_0x19a78c('0x315')](_0x5cfe4c),VisuMZ[_0x19a78c('0x15b')][_0x19a78c('0x757')](_0x5cfe4c);},VisuMZ['BattleCore']['ParseItemNotetags']=VisuMZ[_0x467fb5('0x39b')],VisuMZ[_0x467fb5('0x39b')]=function(_0x363bdf){const _0x19c889=_0x467fb5;VisuMZ[_0x19c889('0x15b')][_0x19c889('0x39b')]['call'](this,_0x363bdf),VisuMZ[_0x19c889('0x15b')][_0x19c889('0x315')](_0x363bdf),VisuMZ[_0x19c889('0x15b')][_0x19c889('0x757')](_0x363bdf);},VisuMZ[_0x467fb5('0x15b')]['ParseWeaponNotetags']=VisuMZ[_0x467fb5('0x31d')],VisuMZ[_0x467fb5('0x31d')]=function(_0x62034c){const _0x5cbede=_0x467fb5;VisuMZ[_0x5cbede('0x15b')][_0x5cbede('0x31d')][_0x5cbede('0x709')](this,_0x62034c),VisuMZ[_0x5cbede('0x15b')][_0x5cbede('0x795')](_0x62034c);},VisuMZ['BattleCore'][_0x467fb5('0x322')]=VisuMZ[_0x467fb5('0x322')],VisuMZ['ParseArmorNotetags']=function(_0x22b2e3){const _0x36a726=_0x467fb5;VisuMZ[_0x36a726('0x15b')][_0x36a726('0x322')][_0x36a726('0x709')](this,_0x22b2e3),VisuMZ[_0x36a726('0x15b')]['Parse_Notetags_TraitObjects'](_0x22b2e3);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x608')]=VisuMZ[_0x467fb5('0x608')],VisuMZ[_0x467fb5('0x608')]=function(_0xc5271f){const _0x5903bb=_0x467fb5;VisuMZ[_0x5903bb('0x15b')]['ParseEnemyNotetags'][_0x5903bb('0x709')](this,_0xc5271f),VisuMZ['BattleCore'][_0x5903bb('0x795')](_0xc5271f);},VisuMZ['BattleCore'][_0x467fb5('0x86e')]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x467fb5('0x86e')]=function(_0x389aaf){const _0x412a1d=_0x467fb5;VisuMZ[_0x412a1d('0x15b')]['ParseStateNotetags'][_0x412a1d('0x709')](this,_0x389aaf),VisuMZ['BattleCore'][_0x412a1d('0x795')](_0x389aaf);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x315')]=function(_0x4396dd){const _0x31239f=_0x467fb5,_0x30de55=['PreApplyJS',_0x31239f('0xdf'),'PreDamageJS',_0x31239f('0x714'),_0x31239f('0x4b7'),_0x31239f('0x58e'),_0x31239f('0x806'),'PostEndActionJS'];for(const _0x4744a5 of _0x30de55){VisuMZ[_0x31239f('0x15b')][_0x31239f('0x6a0')](_0x4396dd,_0x4744a5);}const _0x1b9c2b=_0x4396dd[_0x31239f('0x50e')];_0x1b9c2b['match'](/<ALWAYS CRITICAL/i)&&(_0x4396dd[_0x31239f('0x554')][_0x31239f('0x1d8')]=!![]);if(_0x1b9c2b[_0x31239f('0x5e2')](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)){if(_0x31239f('0x754')===_0x31239f('0x754'))_0x4396dd['repeats']=Math[_0x31239f('0x6b9')](0x1,Number(RegExp['$1']));else{function _0x46c5da(){const _0x451d43=_0x31239f;_0x562f06[_0x451d43('0x26e')]['_statusWindow']['addDamageSprite'](_0x1f5a41,this[_0x451d43('0x33a')]);}}}_0x1b9c2b[_0x31239f('0x5e2')](/<TARGET:[ ](.*)>/i)&&(_0x4396dd[_0x31239f('0x1c6')]=String(RegExp['$1'])[_0x31239f('0x66a')]()['trim']());},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x795')]=function(_0x462da5){const _0x2be4b0=_0x467fb5,_0x204255=[_0x2be4b0('0x390'),'PostApplyAsUserJS',_0x2be4b0('0x5ab'),_0x2be4b0('0x36d'),_0x2be4b0('0x2a8'),'PostApplyAsTargetJS',_0x2be4b0('0x4'),'PostDamageAsTargetJS',_0x2be4b0('0x4b7'),'PostStartActionJS',_0x2be4b0('0x806'),_0x2be4b0('0x305'),'PreStartBattleJS',_0x2be4b0('0x31a'),_0x2be4b0('0x7d1'),_0x2be4b0('0x43e'),_0x2be4b0('0x17b'),_0x2be4b0('0x5ad'),'EscapeSuccessJS',_0x2be4b0('0x8bf'),'PreStartTurnJS',_0x2be4b0('0x3c2'),_0x2be4b0('0x27'),_0x2be4b0('0x2b8'),_0x2be4b0('0x679'),_0x2be4b0('0x2ed')];for(const _0x58fc70 of _0x204255){VisuMZ['BattleCore'][_0x2be4b0('0x6a0')](_0x462da5,_0x58fc70);}},VisuMZ['BattleCore']['Parse_Notetags_Targets']=function(_0x386a49){const _0x171362=_0x467fb5,_0x23dcf8=_0x386a49[_0x171362('0x50e')];if(_0x23dcf8[_0x171362('0x5e2')](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){if('YtSci'===_0x171362('0x6ab')){const _0x33087f=String(RegExp['$1']),_0x521365=VisuMZ[_0x171362('0x15b')]['createKeyJS'](_0x386a49,_0x171362('0x27f'));VisuMZ[_0x171362('0x15b')][_0x171362('0x330')](_0x33087f,_0x521365);}else{function _0x306513(){const _0x142a66=_0x171362;_0x1aab30[_0x142a66('0x15b')]['Scene_Battle_startActorCommandSelection'][_0x142a66('0x709')](this),_0x187d78[_0x142a66('0x847')]()&&_0x3f6eba[_0x142a66('0x68b')]&&(_0x134d45['_tpbNeedsPartyCommand']=![],this[_0x142a66('0xf')]());}}}if(_0x23dcf8[_0x171362('0x5e2')](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){if(_0x171362('0x283')===_0x171362('0x283')){const _0x395707=String(RegExp['$1']),_0xb0c1c4=VisuMZ[_0x171362('0x15b')][_0x171362('0x878')](_0x386a49,_0x171362('0x7ca'));VisuMZ[_0x171362('0x15b')][_0x171362('0x3ac')](_0x395707,_0xb0c1c4);}else{function _0x2d92b8(){const _0x2a2d69=_0x171362;this[_0x2a2d69('0x79a')]=0x0;}}}},VisuMZ['BattleCore']['JS']={},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6a0')]=function(_0x377e78,_0x522c40){const _0x5f04fa=_0x467fb5,_0x2fca6a=_0x377e78['note'];if(_0x2fca6a[_0x5f04fa('0x5e2')](VisuMZ[_0x5f04fa('0x15b')][_0x5f04fa('0xa1')][_0x522c40])){const _0x57bdce=RegExp['$1'],_0xb302dc=_0x5f04fa('0x844')['format'](_0x57bdce),_0x399b7a=VisuMZ[_0x5f04fa('0x15b')]['createKeyJS'](_0x377e78,_0x522c40);VisuMZ[_0x5f04fa('0x15b')]['JS'][_0x399b7a]=new Function(_0xb302dc);}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x878')]=function(_0x4fdd3d,_0x58261b){const _0x2a1da5=_0x467fb5;let _0x4284bc='';if($dataActors[_0x2a1da5('0x790')](_0x4fdd3d))_0x4284bc=_0x2a1da5('0x460')[_0x2a1da5('0x11')](_0x4fdd3d['id'],_0x58261b);if($dataClasses[_0x2a1da5('0x790')](_0x4fdd3d))_0x4284bc=_0x2a1da5('0x3e0')['format'](_0x4fdd3d['id'],_0x58261b);if($dataSkills[_0x2a1da5('0x790')](_0x4fdd3d))_0x4284bc=_0x2a1da5('0x775')[_0x2a1da5('0x11')](_0x4fdd3d['id'],_0x58261b);if($dataItems[_0x2a1da5('0x790')](_0x4fdd3d))_0x4284bc=_0x2a1da5('0x6e')[_0x2a1da5('0x11')](_0x4fdd3d['id'],_0x58261b);if($dataWeapons[_0x2a1da5('0x790')](_0x4fdd3d))_0x4284bc=_0x2a1da5('0x843')[_0x2a1da5('0x11')](_0x4fdd3d['id'],_0x58261b);if($dataArmors['includes'](_0x4fdd3d))_0x4284bc=_0x2a1da5('0x3ba')[_0x2a1da5('0x11')](_0x4fdd3d['id'],_0x58261b);if($dataEnemies['includes'](_0x4fdd3d))_0x4284bc='Enemy-%1-%2'['format'](_0x4fdd3d['id'],_0x58261b);if($dataStates[_0x2a1da5('0x790')](_0x4fdd3d))_0x4284bc='State-%1-%2'[_0x2a1da5('0x11')](_0x4fdd3d['id'],_0x58261b);return _0x4284bc;},VisuMZ[_0x467fb5('0x15b')]['createTargetsJS']=function(_0x9b0558,_0x2bb3af){const _0x3d35d6=_0x467fb5,_0x4029cc=_0x3d35d6('0x85a')['format'](_0x9b0558);VisuMZ['BattleCore']['JS'][_0x2bb3af]=new Function(_0x4029cc);},VisuMZ[_0x467fb5('0x15b')]['createCommandVisibleJS']=function(_0x3c730f,_0x301ba7){const _0x4a8c0c=_0x467fb5,_0x413404=_0x4a8c0c('0x2bd')[_0x4a8c0c('0x11')](_0x3c730f);VisuMZ[_0x4a8c0c('0x15b')]['JS'][_0x301ba7]=new Function(_0x413404);},TextManager[_0x467fb5('0x61')]=VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x110')][_0x467fb5('0x389')][_0x467fb5('0x4f0')],TextManager[_0x467fb5('0x2c')]=VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x110')][_0x467fb5('0x1b9')][_0x467fb5('0x830')],TextManager['autoBattleStyle']=VisuMZ[_0x467fb5('0x15b')]['Settings'][_0x467fb5('0x1b9')]['StyleName'],TextManager[_0x467fb5('0x5ae')]=VisuMZ['BattleCore'][_0x467fb5('0x110')]['HpGauge'][_0x467fb5('0x43')],ColorManager[_0x467fb5('0xb3')]=function(_0x38a6e2){const _0x3cdf1f=_0x467fb5;_0x38a6e2=String(_0x38a6e2);if(_0x38a6e2[_0x3cdf1f('0x5e2')](/#(.*)/i)){if(_0x3cdf1f('0x4e3')==='UOQfV')return _0x3cdf1f('0x2d0')['format'](String(RegExp['$1']));else{function _0xa1c5f(){const _0x130d46=_0x3cdf1f;if(!this[_0x130d46('0x621')][_0x130d46('0x10a')](_0x271cc8['id']))return![];}}}else return this[_0x3cdf1f('0x567')](Number(_0x38a6e2));},DataManager['getDamageStyle']=function(_0xa01314){const _0x16ca1e=_0x467fb5;if(_0xa01314[_0x16ca1e('0x50e')][_0x16ca1e('0x5e2')](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x326f27=String(RegExp['$1'])['toUpperCase']()['trim']();if(_0x326f27===_0x16ca1e('0x842'))return _0x16ca1e('0x842');if(VisuMZ[_0x16ca1e('0x1e0')][_0x326f27])return _0x326f27;}const _0x45e4dc=VisuMZ['BattleCore'][_0x16ca1e('0x110')][_0x16ca1e('0x82c')]['DefaultDamageStyle'][_0x16ca1e('0x66a')]()[_0x16ca1e('0x23e')]();if(VisuMZ['DamageStyles'][_0x45e4dc])return _0x45e4dc;return _0x16ca1e('0x842');},DataManager[_0x467fb5('0x394')]=function(_0xf1b9d7){const _0x432b50=_0x467fb5;_0xf1b9d7=_0xf1b9d7[_0x432b50('0x66a')]()[_0x432b50('0x23e')](),this[_0x432b50('0x51b')]=this[_0x432b50('0x51b')]||{};if(this[_0x432b50('0x51b')][_0xf1b9d7])return this[_0x432b50('0x51b')][_0xf1b9d7];for(let _0x44f152=0x1;_0x44f152<0x64;_0x44f152++){if(!$dataSystem['skillTypes'][_0x44f152])continue;let _0x2e382f=$dataSystem[_0x432b50('0x2d4')][_0x44f152][_0x432b50('0x66a')]()[_0x432b50('0x23e')]();_0x2e382f=_0x2e382f[_0x432b50('0x65f')](/\x1I\[(\d+)\]/gi,''),_0x2e382f=_0x2e382f[_0x432b50('0x65f')](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x2e382f]=_0x44f152;}return this[_0x432b50('0x51b')][_0xf1b9d7]||0x0;},DataManager[_0x467fb5('0x6b2')]=function(_0x18be77){const _0x31d3d8=_0x467fb5;_0x18be77=_0x18be77[_0x31d3d8('0x66a')]()[_0x31d3d8('0x23e')](),this[_0x31d3d8('0x6bb')]=this[_0x31d3d8('0x6bb')]||{};if(this[_0x31d3d8('0x6bb')][_0x18be77])return this[_0x31d3d8('0x6bb')][_0x18be77];for(const _0x548b36 of $dataSkills){if('ddewc'===_0x31d3d8('0x399')){function _0x1ad462(){const _0x491fcc=_0x31d3d8;return;this[_0x491fcc('0x7a7')]&&(this[_0x491fcc('0x7a7')]['x']=this['x'],this[_0x491fcc('0x7a7')]['y']=this['y']),this['_damageContainer']&&(this[_0x491fcc('0xf8')]['x']=this['x'],this[_0x491fcc('0xf8')]['y']=this['y']);}}else{if(!_0x548b36)continue;this['_skillIDs'][_0x548b36[_0x31d3d8('0x22a')][_0x31d3d8('0x66a')]()[_0x31d3d8('0x23e')]()]=_0x548b36['id'];}}return this[_0x31d3d8('0x6bb')][_0x18be77]||0x0;},DataManager['getEnemyIdWithName']=function(_0x4882aa){const _0x240f22=_0x467fb5;_0x4882aa=_0x4882aa[_0x240f22('0x66a')]()[_0x240f22('0x23e')](),this[_0x240f22('0x6e6')]=this[_0x240f22('0x6e6')]||{};if(this[_0x240f22('0x6e6')][_0x4882aa])return this[_0x240f22('0x6e6')][_0x4882aa];for(const _0x3793ae of $dataEnemies){if(!_0x3793ae)continue;this[_0x240f22('0x6e6')][_0x3793ae[_0x240f22('0x22a')][_0x240f22('0x66a')]()[_0x240f22('0x23e')]()]=_0x3793ae['id'];}return this[_0x240f22('0x6e6')][_0x4882aa]||0x0;},DataManager[_0x467fb5('0x4e8')]=function(_0x5eacfb){const _0x20f91e=_0x467fb5;_0x5eacfb=_0x5eacfb[_0x20f91e('0x66a')]()[_0x20f91e('0x23e')](),this['_wtypeIDs']=this[_0x20f91e('0x2dd')]||{};if(this[_0x20f91e('0x2dd')][_0x5eacfb])return this[_0x20f91e('0x2dd')][_0x5eacfb];for(let _0x1c061c=0x1;_0x1c061c<0x64;_0x1c061c++){if(_0x20f91e('0x7')!==_0x20f91e('0x292')){if(!$dataSystem['weaponTypes'][_0x1c061c])continue;let _0x4209cd=$dataSystem[_0x20f91e('0x8e')][_0x1c061c][_0x20f91e('0x66a')]()[_0x20f91e('0x23e')]();_0x4209cd=_0x4209cd[_0x20f91e('0x65f')](/\x1I\[(\d+)\]/gi,''),_0x4209cd=_0x4209cd['replace'](/\\I\[(\d+)\]/gi,''),this[_0x20f91e('0x2dd')][_0x4209cd]=_0x1c061c;}else{function _0x1e9bfc(){const _0x4c2e89=_0x20f91e;_0x5e5fa5['BattleCore'][_0x4c2e89('0x6d8')][_0x4c2e89('0x709')](this),this[_0x4c2e89('0x31b')]();if(this['constructor']===_0x437116)this['createShadowSprite']();this[_0x4c2e89('0x295')]();}}}return this[_0x20f91e('0x2dd')][_0x20f91e('0x187')]=0x0,this[_0x20f91e('0x2dd')][_0x5eacfb]||0x0;},DataManager[_0x467fb5('0x1d0')]=function(_0x125612){const _0x1e62be=_0x467fb5,_0x4f6589=_0x1e62be('0x1f');let _0x497f98=_0x125612[_0x1e62be('0x2b3')],_0x14a695=_0x125612[_0x1e62be('0x22a')];const _0x124506=_0x125612[_0x1e62be('0x50e')];if(_0x124506[_0x1e62be('0x5e2')](/<DISPLAY ICON: (\d+)>/i)){if(_0x1e62be('0x5d9')===_0x1e62be('0x5d9'))_0x497f98=Number(RegExp['$1']);else{function _0x55af44(){const _0x45b3a4=_0x1e62be;_0x3a49b3[_0x45b3a4('0x15b')][_0x45b3a4('0x6be')][_0x45b3a4('0x709')](this);}}}if(_0x124506[_0x1e62be('0x5e2')](/<DISPLAY TEXT: (.*)>/i)){if(_0x1e62be('0x10c')!=='WWckR')_0x14a695=String(RegExp['$1']);else{function _0x40ca46(){const _0x46078e=_0x1e62be;_0x3de397=this[_0x46078e('0x98')]()['wtypeId']||0x0;}}}return _0x4f6589[_0x1e62be('0x11')](_0x497f98,_0x14a695);},DataManager[_0x467fb5('0x779')]=function(_0x169dad){const _0x6211ec=_0x467fb5;if(_0x169dad[_0x6211ec('0x50e')][_0x6211ec('0x5e2')](/<COMMAND TEXT: (.*)>/i))return String(RegExp['$1']);else{if(_0x6211ec('0x6fe')==='XStGD')return _0x169dad[_0x6211ec('0x22a')];else{function _0x3dc3a9(){const _0x5e4cf2=_0x6211ec;this['_damages']['push'](_0xa59cb7);if(this[_0x5e4cf2('0x431')]())_0x13f955[_0x5e4cf2('0x26e')][_0x5e4cf2('0x841')]['addDamageSprite'](_0x52c58e,this['_battler']);else{this[_0x5e4cf2('0x24b')]()['addChild'](_0x22a5c5);if(_0x22386f['isBattleFlipped']())_0x289dcb[_0x5e4cf2('0x3e7')]['x']=-0x1;}}}}},DataManager['battleCommandIcon']=function(_0x52f421){const _0x225180=_0x467fb5;if(_0x52f421[_0x225180('0x50e')][_0x225180('0x5e2')](/<COMMAND ICON: (\d+)>/i)){if(_0x225180('0x6d0')!==_0x225180('0x576'))return Number(RegExp['$1']);else{function _0x5440a3(){const _0x4d5728=_0x225180;this[_0x4d5728('0x707')](_0x4d5728('0x79a'));}}}else{if(_0x225180('0x66d')!==_0x225180('0x66d')){function _0x120b62(){const _0x472f70=_0x225180;return this[_0x472f70('0x497')]()?0x0:0xa;}}else return _0x52f421['iconIndex'];}},DataManager[_0x467fb5('0x2')]=function(_0x122943){const _0x334b17=_0x467fb5,_0x2ff5da=$dataEnemies[_0x122943];if(_0x2ff5da){if(_0x2ff5da[_0x334b17('0x50e')][_0x334b17('0x5e2')](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){if(_0x334b17('0x7a8')!==_0x334b17('0x350')){const _0x53fb15=String(RegExp['$1'])[_0x334b17('0x7e0')](/[\r\n]+/)['remove'](''),_0x3b2bdf=this[_0x334b17('0x13e')](_0x53fb15);_0x122943=this['getEnemyIdWithName'](_0x3b2bdf)||_0x122943,_0x122943=DataManager[_0x334b17('0x2')](_0x122943);}else{function _0x4e2416(){const _0x574e72=_0x334b17;!this[_0x574e72('0x671')]()&&!this[_0x574e72('0x27d')][_0x574e72('0x40c')]()&&(this[_0x574e72('0x7cf')]='action');}}}}return _0x122943;},DataManager['processRandomizedData']=function(_0x13f39b){const _0x290f9b=_0x467fb5;let _0x3b5f4c=0x0;const _0x5095a1={};for(const _0x5b2769 of _0x13f39b){if('aGuUW'==='aGuUW'){if(_0x5b2769[_0x290f9b('0x5e2')](/(.*):[ ](\d+)/i)){if('EssRX'===_0x290f9b('0x4a4')){const _0x503b13=String(RegExp['$1'])[_0x290f9b('0x23e')](),_0x10c00b=Number(RegExp['$2']);_0x5095a1[_0x503b13]=_0x10c00b,_0x3b5f4c+=_0x10c00b;}else{function _0x2f4259(){return[_0x533800];}}}else{if(_0x5b2769['match'](/(.*):[ ](\d+\.?\d+)/i)){if(_0x290f9b('0x6ec')!==_0x290f9b('0x6ec')){function _0x362a4c(){const _0x42bea1=_0x290f9b,_0x5accec=_0x518c17['prototype'][_0x42bea1('0x435')]();['default',_0x42bea1('0x34c'),_0x42bea1('0x82'),_0x42bea1('0x5bc')][_0x42bea1('0x790')](_0x5accec)&&(this[_0x42bea1('0x79a')]=0x0);}}else{const _0x1b5334=String(RegExp['$1'])[_0x290f9b('0x23e')](),_0xa2e8f4=Number(RegExp['$2']);_0x5095a1[_0x1b5334]=_0xa2e8f4,_0x3b5f4c+=_0xa2e8f4;}}else _0x5b2769!==''&&(_0x5095a1[_0x5b2769]=0x1,_0x3b5f4c++);}}else{function _0x2dbb1a(){const _0x195ba9=_0x290f9b;this['_mainSprite'][_0x195ba9('0x30a')][_0x195ba9('0x83e')]!==this[_0x195ba9('0x33a')][_0x195ba9('0x7f9')]()&&(this[_0x195ba9('0x3ad')][_0x195ba9('0x30a')][_0x195ba9('0x83e')]=this['_battler'][_0x195ba9('0x7f9')]());}}}if(_0x3b5f4c<=0x0)return'';let _0x56c141=Math['random']()*_0x3b5f4c;for(const _0x47b67a in _0x5095a1){_0x56c141-=_0x5095a1[_0x47b67a];if(_0x56c141<=0x0)return _0x47b67a;}return'';},ConfigManager['autoBattleAtStart']=![],ConfigManager[_0x467fb5('0x163')]=![],ConfigManager['visualHpGauge']=!![],VisuMZ[_0x467fb5('0x15b')]['ConfigManager_makeData']=ConfigManager[_0x467fb5('0x70b')],ConfigManager[_0x467fb5('0x70b')]=function(){const _0x42aa21=_0x467fb5,_0x427f9b=VisuMZ['BattleCore']['ConfigManager_makeData'][_0x42aa21('0x709')](this);return _0x427f9b[_0x42aa21('0x35e')]=this[_0x42aa21('0x35e')],_0x427f9b[_0x42aa21('0x163')]=this[_0x42aa21('0x163')],_0x427f9b[_0x42aa21('0x5ae')]=this['visualHpGauge'],_0x427f9b;},VisuMZ['BattleCore'][_0x467fb5('0x2ef')]=ConfigManager[_0x467fb5('0x72c')],ConfigManager[_0x467fb5('0x72c')]=function(_0x37be40){const _0x1f2625=_0x467fb5;VisuMZ['BattleCore'][_0x1f2625('0x2ef')]['call'](this,_0x37be40);if(_0x1f2625('0x35e')in _0x37be40){if(_0x1f2625('0x50f')===_0x1f2625('0x50f'))this[_0x1f2625('0x35e')]=_0x37be40['autoBattleAtStart'];else{function _0x45f53b(){const _0x470673=_0x1f2625;return this[_0x470673('0x7bf')]||0x0;}}}else{if('cqLGq'!=='cqLGq'){function _0x4efd57(){const _0x44db20=_0x1f2625;return this[_0x44db20('0x130')]()&&!this[_0x44db20('0x36f')]()?this[_0x44db20('0x500')]():_0x38b522[_0x44db20('0x15b')][_0x44db20('0x67f')][_0x44db20('0x709')](this);}}else this[_0x1f2625('0x35e')]=![];}_0x1f2625('0x163')in _0x37be40?this[_0x1f2625('0x163')]=_0x37be40[_0x1f2625('0x163')]:this[_0x1f2625('0x163')]=![];if('visualHpGauge'in _0x37be40)this[_0x1f2625('0x5ae')]=_0x37be40[_0x1f2625('0x5ae')];else{if('lMhAY'===_0x1f2625('0x1a2')){function _0x248808(){const _0x5d4db9=_0x1f2625;this[_0x5d4db9('0x304')]['x']=-this['_cancelButton']['width']-0x4;}}else this[_0x1f2625('0x5ae')]=!![];}},VisuMZ[_0x467fb5('0x15b')]['BattleManager_initMembers']=BattleManager['initMembers'],BattleManager[_0x467fb5('0x6d1')]=function(){const _0x2d519e=_0x467fb5;VisuMZ[_0x2d519e('0x15b')][_0x2d519e('0x532')][_0x2d519e('0x709')](this),this['_forcedBattlers']=[];},BattleManager['refreshStatusWindow']=function(){const _0xa70e37=_0x467fb5;if(!SceneManager[_0xa70e37('0x21')]())return;const _0xcc664d=SceneManager['_scene'][_0xa70e37('0x841')];if(_0xcc664d)_0xcc664d['requestRefresh']();},BattleManager[_0x467fb5('0x2ad')]=function(){const _0x205ade=_0x467fb5;if(BattleManager[_0x205ade('0x847')]())return _0x205ade('0x3b4');return _0x205ade('0x0');},BattleManager[_0x467fb5('0x3bd')]=function(_0x361b1d){const _0x211ee8=_0x467fb5;return _0x361b1d=_0x361b1d[_0x211ee8('0x66a')]()['trim'](),this[_0x211ee8('0x2ad')]()===_0x361b1d;},BattleManager[_0x467fb5('0x5c8')]=function(){const _0x42bd3b=_0x467fb5;return this['isBattleSys'](_0x42bd3b('0x0'));},BattleManager[_0x467fb5('0x43f')]=function(){const _0x4f76f1=_0x467fb5;return this[_0x4f76f1('0x5c8')]();},BattleManager[_0x467fb5('0x8b2')]=function(){return!this['isTurnBased']();},BattleManager[_0x467fb5('0x4c1')]=function(_0x5a43bc){const _0x26ef6b=_0x467fb5;$gameParty[_0x26ef6b('0x4c1')](_0x5a43bc),$gameTroop['processBattleCoreJS'](_0x5a43bc);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x73')]=BattleManager['startBattle'],BattleManager[_0x467fb5('0x213')]=function(){const _0x1f6c9e=_0x467fb5;this[_0x1f6c9e('0x6d3')]=ConfigManager[_0x1f6c9e('0x35e')],this['processBattleCoreJS'](_0x1f6c9e('0x780')),VisuMZ[_0x1f6c9e('0x15b')]['BattleManager_startBattle'][_0x1f6c9e('0x709')](this),this[_0x1f6c9e('0x4c1')](_0x1f6c9e('0x31a'));},BattleManager[_0x467fb5('0x67e')]=function(_0xacc0cc){const _0x5aa3ff=_0x467fb5,_0x2ab6a3=VisuMZ[_0x5aa3ff('0x15b')]['Settings']['Mechanics'];_0x2ab6a3['BattleEndEvent']&&VisuMZ[_0x5aa3ff('0x15b')]['CheckMapBattleEventValid'](_0x2ab6a3[_0x5aa3ff('0x40e')])&&$gameTemp['reserveCommonEvent'](_0x2ab6a3[_0x5aa3ff('0x40e')]);const _0x518d47=_0x5aa3ff('0x1f3')['format'](_0xacc0cc);if(_0x2ab6a3[_0x518d47]&&VisuMZ['BattleCore']['CheckMapBattleEventValid'](_0x2ab6a3[_0x518d47])){if(_0x5aa3ff('0x894')===_0x5aa3ff('0x4ed')){function _0x99ed71(){const _0x1e8308=_0x5aa3ff;_0x27fded[_0x1e8308('0x15b')][_0x1e8308('0x87b')][_0x1e8308('0x709')](this,_0x28b014),this[_0x1e8308('0x3a4')]();}}else $gameTemp[_0x5aa3ff('0x66b')](_0x2ab6a3[_0x518d47]);}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x404')]=BattleManager[_0x467fb5('0x719')],BattleManager[_0x467fb5('0x719')]=function(){const _0x990d1=_0x467fb5;this['processBattleCoreJS']('BattleVictoryJS'),VisuMZ[_0x990d1('0x15b')][_0x990d1('0x404')]['call'](this),this[_0x990d1('0x67e')](_0x990d1('0x405'));},VisuMZ['BattleCore']['BattleManager_processDefeat']=BattleManager[_0x467fb5('0x5a2')],BattleManager[_0x467fb5('0x5a2')]=function(){const _0x3da6bf=_0x467fb5;this['processBattleCoreJS'](_0x3da6bf('0x5ad')),VisuMZ['BattleCore']['BattleManager_processDefeat']['call'](this),this[_0x3da6bf('0x67e')]('Defeat');},VisuMZ['BattleCore']['BattleManager_endBattle']=BattleManager[_0x467fb5('0x265')],BattleManager[_0x467fb5('0x265')]=function(_0x516c21){const _0x3c7ec3=_0x467fb5;this['_autoBattle']=![],this[_0x3c7ec3('0x4c1')](_0x3c7ec3('0x7d1')),VisuMZ[_0x3c7ec3('0x15b')][_0x3c7ec3('0x484')][_0x3c7ec3('0x709')](this,_0x516c21),this[_0x3c7ec3('0x4c1')](_0x3c7ec3('0x43e'));},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x208')]=BattleManager[_0x467fb5('0x32c')],BattleManager[_0x467fb5('0x32c')]=function(){const _0x5773=_0x467fb5;if(this[_0x5773('0x43f')]())this['processBattleCoreJS'](_0x5773('0x48b'));VisuMZ[_0x5773('0x15b')][_0x5773('0x208')][_0x5773('0x709')](this);if(this[_0x5773('0x43f')]())this['processBattleCoreJS'](_0x5773('0x3c2'));},VisuMZ['BattleCore'][_0x467fb5('0x481')]=BattleManager[_0x467fb5('0x281')],BattleManager[_0x467fb5('0x281')]=function(){const _0x21d7ac=_0x467fb5,_0x53e128=this[_0x21d7ac('0x3c0')]['currentAction']();if(_0x53e128)_0x53e128[_0x21d7ac('0x669')](_0x21d7ac('0x4b7'));VisuMZ['BattleCore'][_0x21d7ac('0x481')]['call'](this);if(_0x53e128)_0x53e128[_0x21d7ac('0x669')](_0x21d7ac('0x58e'));},VisuMZ[_0x467fb5('0x15b')]['BattleManager_endAction']=BattleManager[_0x467fb5('0x565')],BattleManager[_0x467fb5('0x565')]=function(){const _0x434558=_0x467fb5,_0x344d9c=this[_0x434558('0x198')];if(_0x344d9c)_0x344d9c[_0x434558('0x669')](_0x434558('0x806'));VisuMZ[_0x434558('0x15b')][_0x434558('0x7a9')]['call'](this);if(_0x344d9c)_0x344d9c[_0x434558('0x669')](_0x434558('0x305'));this[_0x434558('0x8e5')](this[_0x434558('0x294')]());},BattleManager[_0x467fb5('0x8e5')]=function(_0x5862a8){const _0x3e0125=_0x467fb5;for(const _0x45b50b of _0x5862a8){if(!_0x45b50b)continue;if(!_0x45b50b[_0x3e0125('0x67b')]())continue;_0x45b50b[_0x3e0125('0x67b')]()['refreshMotion']();}},BattleManager[_0x467fb5('0x465')]=function(){const _0xf8989d=_0x467fb5;!this[_0xf8989d('0x27d')][_0xf8989d('0x40c')]()&&this[_0xf8989d('0x565')]();},BattleManager['makeEscapeRatio']=function(){const _0x5a8751=_0x467fb5;this[_0x5a8751('0x8d8')]=VisuMZ[_0x5a8751('0x15b')][_0x5a8751('0x110')][_0x5a8751('0x264')][_0x5a8751('0x21c')]['call'](this);},VisuMZ['BattleCore'][_0x467fb5('0x24c')]=BattleManager[_0x467fb5('0x81f')],BattleManager[_0x467fb5('0x81f')]=function(){const _0x58e14c=_0x467fb5;this['processBattleCoreJS'](_0x58e14c('0x1d4')),BattleManager[_0x58e14c('0x115')][_0x58e14c('0x654')](),VisuMZ[_0x58e14c('0x15b')]['BattleManager_onEscapeSuccess']['call'](this),this['processPostBattleCommonEvents'](_0x58e14c('0x482'));},VisuMZ[_0x467fb5('0x15b')]['BattleManager_onEscapeFailure']=BattleManager[_0x467fb5('0x690')],BattleManager[_0x467fb5('0x690')]=function(){const _0xe39278=_0x467fb5;this[_0xe39278('0x4c1')]('EscapeFailureJS');const _0x149c6a=this[_0xe39278('0x8d8')];VisuMZ[_0xe39278('0x15b')]['BattleManager_onEscapeFailure'][_0xe39278('0x709')](this),this[_0xe39278('0x8d8')]=_0x149c6a+VisuMZ[_0xe39278('0x15b')][_0xe39278('0x110')][_0xe39278('0x264')]['CalcEscapeRaiseJS'][_0xe39278('0x709')](this),this['processPostBattleCommonEvents'](_0xe39278('0x116'));},BattleManager['displayStartMessages']=function(){const _0x424edd=_0x467fb5;let _0x575d56=![];if(this[_0x424edd('0x498')]())for(const _0x258e6e of $gameTroop[_0x424edd('0x5a')]()){this[_0x424edd('0x27d')][_0x424edd('0x26f')](_0x424edd('0x7bb'),TextManager[_0x424edd('0x1bb')][_0x424edd('0x11')](_0x258e6e)),this['_logWindow'][_0x424edd('0x26f')](_0x424edd('0x246')),_0x575d56=!![];}if(this[_0x424edd('0x3ab')]){if(_0x424edd('0x3b1')===_0x424edd('0x86f')){function _0x556231(){const _0x9f5f1c=_0x424edd;this['applyFreezeMotionFrames'](),_0x119d3e[_0x9f5f1c('0x15b')]['Sprite_Actor_updateFrame']['call'](this);}}else this[_0x424edd('0x27d')][_0x424edd('0x26f')](_0x424edd('0x7bb'),TextManager[_0x424edd('0x3d2')][_0x424edd('0x11')]($gameParty[_0x424edd('0x22a')]())),this[_0x424edd('0x27d')]['push'](_0x424edd('0x246'));}else this[_0x424edd('0x598')]&&(this['_logWindow'][_0x424edd('0x26f')](_0x424edd('0x7bb'),TextManager[_0x424edd('0x68c')][_0x424edd('0x11')]($gameParty[_0x424edd('0x22a')]())),this[_0x424edd('0x27d')][_0x424edd('0x26f')](_0x424edd('0x246')));_0x575d56&&(this[_0x424edd('0x27d')][_0x424edd('0x26f')](_0x424edd('0x246')),this[_0x424edd('0x27d')][_0x424edd('0x26f')]('clear')),this['isTpb']()&&this[_0x424edd('0x8')]()&&(this[_0x424edd('0x68b')]=![]);},BattleManager['isDisplayEmergedEnemies']=function(){const _0x199e22=_0x467fb5;if(BattleManager[_0x199e22('0x6d3')])return![];return VisuMZ[_0x199e22('0x15b')][_0x199e22('0x110')][_0x199e22('0x3a0')][_0x199e22('0x150')];},VisuMZ[_0x467fb5('0x15b')]['BattleManager_startInput']=BattleManager[_0x467fb5('0x5b7')],BattleManager[_0x467fb5('0x5b7')]=function(){const _0x253c3f=_0x467fb5;VisuMZ[_0x253c3f('0x15b')][_0x253c3f('0x148')][_0x253c3f('0x709')](this),this['isDTB']()&&this[_0x253c3f('0x8')]()&&!this[_0x253c3f('0x598')]&&$gameParty[_0x253c3f('0x7f8')]()&&this[_0x253c3f('0x79e')]();},BattleManager[_0x467fb5('0x8')]=function(){const _0x2c7ccb=_0x467fb5;return VisuMZ['BattleCore'][_0x2c7ccb('0x110')][_0x2c7ccb('0x389')][_0x2c7ccb('0x776')];},BattleManager[_0x467fb5('0x240')]=function(){const _0x2150b4=_0x467fb5;this[_0x2150b4('0x6fa')]()&&this['selectNextCommand']();},VisuMZ[_0x467fb5('0x15b')]['Scene_Battle_startActorCommandSelection']=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x250')],Scene_Battle[_0x467fb5('0xc9')]['startActorCommandSelection']=function(){const _0x1c6745=_0x467fb5;VisuMZ[_0x1c6745('0x15b')][_0x1c6745('0x397')][_0x1c6745('0x709')](this),BattleManager[_0x1c6745('0x847')]()&&BattleManager[_0x1c6745('0x68b')]&&(BattleManager[_0x1c6745('0x68b')]=![],this[_0x1c6745('0xf')]());},BattleManager[_0x467fb5('0x769')]=function(_0x38e3e2,_0x1c19c3){const _0x43c7a5=_0x467fb5;this[_0x43c7a5('0x198')]['_reflectionTarget']=_0x1c19c3,this[_0x43c7a5('0x27d')]['displayReflection'](_0x1c19c3),this[_0x43c7a5('0x27d')][_0x43c7a5('0x83a')](_0x38e3e2,this['_action']),this[_0x43c7a5('0x198')][_0x43c7a5('0x74f')](_0x38e3e2),this['_logWindow'][_0x43c7a5('0x4c7')](_0x38e3e2,_0x38e3e2);},VisuMZ[_0x467fb5('0x15b')]['BattleManager_updatePhase']=BattleManager[_0x467fb5('0x52b')],BattleManager[_0x467fb5('0x52b')]=function(_0x5ab35d){const _0x4ad948=_0x467fb5;if(this[_0x4ad948('0x7cf')]==='custom')this[_0x4ad948('0x2b6')]();else{if(this['_phase']===_0x4ad948('0x204')){if(_0x4ad948('0x157')==='pkQIe')this[_0x4ad948('0x770')]();else{function _0xce3cc6(){return _0x1b74b4;}}}else VisuMZ[_0x4ad948('0x15b')][_0x4ad948('0xce')]['call'](this,_0x5ab35d);}},BattleManager[_0x467fb5('0x80d')]=function(){const _0xaa8f48=_0x467fb5;this[_0xaa8f48('0x66c')]=this['_targets']['slice'](0x0),this[_0xaa8f48('0x83')]=0x0,this[_0xaa8f48('0x326')]=this[_0xaa8f48('0x66c')][0x0]||null,this[_0xaa8f48('0x7cf')]=_0xaa8f48('0x221');},BattleManager[_0x467fb5('0x2b6')]=function(){const _0x28bd5d=_0x467fb5;if(!this[_0x28bd5d('0x671')]()&&!this[_0x28bd5d('0x27d')][_0x28bd5d('0x40c')]()){if(_0x28bd5d('0x74b')!==_0x28bd5d('0x74b')){function _0x1f912a(){const _0x29d01b=_0x28bd5d;this[_0x29d01b('0x6bc')]=this[_0x29d01b('0x125')](this[_0x29d01b('0x6bc')],this[_0x29d01b('0x2c6')],_0x3e3921,_0x4a70cb,_0x5b3b0a),this[_0x29d01b('0x17d')]=this[_0x29d01b('0x125')](this['_growY'],this['_targetGrowY'],_0x1548d5,_0x31f582,_0x54245a);}}else this['_phase']=_0x28bd5d('0x8cc');}},BattleManager[_0x467fb5('0x204')]=function(_0x329462){const _0x2e8e53=_0x467fb5;this[_0x2e8e53('0x427')][_0x2e8e53('0x14e')](_0x329462);if(_0x329462===this[_0x2e8e53('0x3c0')])return;const _0x29068c=JsonEx[_0x2e8e53('0x7d9')](_0x329462['currentAction']());this[_0x2e8e53('0x291')][_0x2e8e53('0x26f')]([_0x329462,_0x29068c]);},BattleManager[_0x467fb5('0x4ac')]=function(){},BattleManager['updateStart']=function(){const _0x269e84=_0x467fb5;if(this[_0x269e84('0x847')]()){if(_0x269e84('0x2cf')===_0x269e84('0x70')){function _0x5306ea(){const _0x38aeb2=_0x269e84,_0x367223=_0xb56bf['battler']();this[_0x38aeb2('0x26f')]('performJump',[_0x3a8508],_0x5379e5,_0x19df31),this['push'](_0x38aeb2('0x6c'),_0x54ce5f,_0x367223[_0x38aeb2('0x1a')],_0x367223[_0x38aeb2('0x1b7')],_0x1378a5,![],_0x38aeb2('0x2f7')),this[_0x38aeb2('0x26f')]('requestMotion',[_0x4ad93c],'evade'),this[_0x38aeb2('0x26f')]('waitForMovement'),this[_0x38aeb2('0x26f')](_0x38aeb2('0x738'),[_0x478aed],_0x38aeb2('0x898'));}}else this['_phase']=_0x269e84('0x6a6');}else{if(this[_0x269e84('0x291')][_0x269e84('0x828')]>0x0){if(_0x269e84('0x45b')===_0x269e84('0x45b'))this['_phase']=_0x269e84('0x6a6');else{function _0x29ed2c(){const _0x1a2816=_0x269e84;_0x22c0a9[_0x1a2816('0x26e')]['updateBattleProcess']();}}}else this[_0x269e84('0x5b7')]();}},BattleManager[_0x467fb5('0x785')]=function(){const _0x39d521=_0x467fb5;for(;;){const _0x2e0ae0=this[_0x39d521('0x650')]();if(!_0x2e0ae0){if(_0x39d521('0x4b4')===_0x39d521('0x1ab')){function _0x5e9bee(){const _0x3da458=_0x39d521;if(_0x59bcba[_0x3da458('0x317')]()&&!_0x50aaf6['isSideView']())return;const _0x59d92a=_0x46050f[_0x3da458('0x67b')]();if(_0x59d92a&&_0x4dc016['isActor']())this['_battlerContainer'][_0x3da458('0x209')](_0x59d92a);}}else return null;}if(_0x2e0ae0[_0x39d521('0xa0')]()&&_0x2e0ae0[_0x39d521('0x70c')]())return _0x2e0ae0;}},BattleManager['getNextSubjectFromPool']=function(){const _0x359b05=_0x467fb5;if(this['_forcedBattlers']['length']>0x0){const _0x2583b1=this[_0x359b05('0x291')][_0x359b05('0x66e')](),_0x4af4fd=_0x2583b1[0x0];return _0x4af4fd[_0x359b05('0x834')]=_0x4af4fd['_actions']||[],_0x4af4fd[_0x359b05('0x834')][0x0]=_0x2583b1[0x1],_0x4af4fd;}else{if(_0x359b05('0x32e')!=='GZgmH'){function _0x5de448(){const _0x3c7cf2=_0x359b05;_0x1e5898['BattleCore'][_0x3c7cf2('0x19c')]['call'](this);}}else return this['_actionBattlers'][_0x359b05('0x66e')]();}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0xe8')]=Game_Battler[_0x467fb5('0xc9')]['forceAction'],Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x204')]=function(_0x58082b,_0x4f9b0b){const _0x316ce8=_0x467fb5;VisuMZ[_0x316ce8('0x15b')][_0x316ce8('0xe8')]['call'](this,_0x58082b,_0x4f9b0b),this[_0x316ce8('0x834')][this[_0x316ce8('0x834')][_0x316ce8('0x828')]-0x1][_0x316ce8('0x3a')]=!![];},Game_Interpreter['prototype'][_0x467fb5('0x88a')]=function(_0x3c3ecf){return this['iterateBattler'](_0x3c3ecf[0x0],_0x3c3ecf[0x1],_0x1dcaff=>{const _0x1bf50f=_0x363d;!_0x1dcaff[_0x1bf50f('0x363')]()&&(_0x1dcaff[_0x1bf50f('0x204')](_0x3c3ecf[0x2],_0x3c3ecf[0x3]),BattleManager['forceAction'](_0x1dcaff));}),!![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x74e')]=BattleManager[_0x467fb5('0x79e')],BattleManager[_0x467fb5('0x79e')]=function(){const _0x25bb64=_0x467fb5;if(this[_0x25bb64('0x847')]()){if('NNtqH'==='NNtqH')this[_0x25bb64('0x432')]();else{function _0x48091b(){const _0x821ab2=_0x25bb64;_0x298309[_0x821ab2('0x670')]([this],_0x339b57);}}}else VisuMZ['BattleCore'][_0x25bb64('0x74e')]['call'](this);},BattleManager[_0x467fb5('0x432')]=function(){const _0x2172a5=_0x467fb5;if(this[_0x2172a5('0x207')]){if('CXBZl'==='GtBJt'){function _0x1bb3b7(){const _0x21ea9d=_0x2172a5;let _0x3fc02f=_0xbc7704[_0x21ea9d('0x15b')][_0x21ea9d('0x27e')][_0x21ea9d('0x709')](this),_0x1e6a4b=_0x414f91[_0x21ea9d('0x15b')]['Settings'][_0x21ea9d('0x82c')][_0x21ea9d('0x50a')]||0x0;return _0x58692d[_0x21ea9d('0x1b2')](_0x3fc02f+_0x1e6a4b);}}else{if(this['_currentActor']['selectNextCommand']())return;this[_0x2172a5('0x8d9')](),this[_0x2172a5('0x2d3')](),!this[_0x2172a5('0x3c0')]&&!this[_0x2172a5('0x207')]&&SceneManager[_0x2172a5('0x26e')][_0x2172a5('0x7c1')]();}}else!this[_0x2172a5('0x3c0')]&&this['selectNextActor']();},VisuMZ['BattleCore'][_0x467fb5('0x3b2')]=BattleManager[_0x467fb5('0x884')],BattleManager[_0x467fb5('0x884')]=function(){const _0x58113f=_0x467fb5;if(this[_0x58113f('0x847')]()&&this[_0x58113f('0x7cf')]==='battleEnd'){if(_0x58113f('0x259')!=='jHvhb')this['_currentActor']=null;else{function _0x337614(){const _0x54b5c0=_0x58113f;return this[_0x54b5c0('0x691')]();}}}VisuMZ[_0x58113f('0x15b')]['BattleManager_cancelActorInput'][_0x58113f('0x709')](this);},SceneManager[_0x467fb5('0x21')]=function(){const _0x16cf51=_0x467fb5;return this[_0x16cf51('0x26e')]&&this[_0x16cf51('0x26e')][_0x16cf51('0x7b9')]===Scene_Battle;},SceneManager[_0x467fb5('0x5df')]=function(){return Spriteset_Battle['prototype']['isFlipped']();},SceneManager[_0x467fb5('0x5e6')]=function(){const _0xce94c6=_0x467fb5;if(SceneManager[_0xce94c6('0x710')](Scene_Options))return!![];return![];},SceneManager[_0x467fb5('0x675')]=function(){const _0x5944fd=_0x467fb5;if(SceneManager[_0x5944fd('0x656')](Scene_Options))return!![];return![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x810')]=Game_Temp[_0x467fb5('0xc9')][_0x467fb5('0x670')],Game_Temp[_0x467fb5('0xc9')][_0x467fb5('0x670')]=function(_0x4afc85,_0x26f9dc,_0x446b99){const _0x2f20e7=_0x467fb5;_0x4afc85=_0x4afc85['filter']((_0x1a98cc,_0xc4f859,_0x5e14f3)=>_0x5e14f3['indexOf'](_0x1a98cc)===_0xc4f859),SceneManager[_0x2f20e7('0x21')]()&&SceneManager[_0x2f20e7('0x5df')]()&&(_0x446b99=!_0x446b99),VisuMZ[_0x2f20e7('0x15b')][_0x2f20e7('0x810')]['call'](this,_0x4afc85,_0x26f9dc,_0x446b99),SceneManager[_0x2f20e7('0x21')]()&&BattleManager[_0x2f20e7('0x115')][_0x2f20e7('0x5b0')]();},Game_Temp[_0x467fb5('0xc9')][_0x467fb5('0x564')]=function(_0x4feb83){const _0x1f8ba8=_0x467fb5;this[_0x1f8ba8('0xe')]=_0x4feb83;},Game_Temp[_0x467fb5('0xc9')]['getLastPluginCommandInterpreter']=function(){const _0x2ecb14=_0x467fb5;return this[_0x2ecb14('0xe')];},Game_Temp[_0x467fb5('0xc9')][_0x467fb5('0x276')]=function(){const _0x5520b7=_0x467fb5;this[_0x5520b7('0x772')]=undefined;},Game_Temp['prototype'][_0x467fb5('0x2e')]=function(_0x31f6ca){const _0x87a685=_0x467fb5;$gameMap&&$dataMap&&$dataMap[_0x87a685('0x50e')]&&this[_0x87a685('0x8c4')]($dataMap[_0x87a685('0x50e')]);const _0x585fdf=$dataTroops[_0x31f6ca];_0x585fdf&&this[_0x87a685('0x8c4')](_0x585fdf[_0x87a685('0x22a')]);},Game_Temp['prototype'][_0x467fb5('0x8c4')]=function(_0x275cef){const _0x112443=_0x467fb5;if(!_0x275cef)return;if(_0x275cef[_0x112443('0x5e2')](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x347a6d=String(RegExp['$1']);if(_0x347a6d[_0x112443('0x5e2')](/DEFAULT/i)){if(_0x112443('0x44b')===_0x112443('0x44b'))this['_forcedBattleLayout']=_0x112443('0x549');else{function _0x5af4c1(){const _0x32971b=_0x112443;if(!_0x124c73['VisuMZ_3_ActSeqImpact'])return;const _0xc854d4=_0x32408a['_scene'][_0x32971b('0x115')];if(!_0xc854d4)return;_0x32d2a1[_0x32971b('0x7ae')](_0x3c8e5d,_0x5838d2);const _0x46a4c6=_0x22b523['X']||0x0,_0x28bbd4=_0x23b71e['Y']||0x0,_0x676e43=_0x5267e2[_0x32971b('0x143')]||0x0,_0x547894=_0x34e820[_0x32971b('0x2ec')]||0x0,_0x4f8393=_0x57c2c0[_0x32971b('0x5c7')]||0x1;_0xc854d4[_0x32971b('0xf2')](_0x46a4c6,_0x28bbd4,_0x676e43,_0x547894,_0x4f8393);}}}else{if(_0x347a6d[_0x112443('0x5e2')](/LIST/i))this[_0x112443('0x772')]=_0x112443('0x34c');else{if(_0x347a6d[_0x112443('0x5e2')](/XP/i))this[_0x112443('0x772')]='xp';else{if(_0x347a6d[_0x112443('0x5e2')](/PORTRAIT/i))this['_forcedBattleLayout']=_0x112443('0x82');else{if(_0x347a6d[_0x112443('0x5e2')](/BORDER/i)){if(_0x112443('0x15a')!==_0x112443('0x5a7'))this[_0x112443('0x772')]=_0x112443('0x5bc');else{function _0x5bdf35(){const _0x141a2a=_0x112443;return _0x3195f7['BattleCore']['Game_Action_makeTargets'][_0x141a2a('0x709')](this);}}}}}}}}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x63b')]=Game_System[_0x467fb5('0xc9')][_0x467fb5('0x229')],Game_System[_0x467fb5('0xc9')][_0x467fb5('0x229')]=function(){const _0x2b824a=_0x467fb5;VisuMZ[_0x2b824a('0x15b')][_0x2b824a('0x63b')][_0x2b824a('0x709')](this),this[_0x2b824a('0x62e')]();},Game_System[_0x467fb5('0xc9')][_0x467fb5('0x62e')]=function(){const _0x3501f6=_0x467fb5;this[_0x3501f6('0x226')]=this[_0x3501f6('0x226')]||[];},Game_System[_0x467fb5('0xc9')][_0x467fb5('0x3a7')]=function(){const _0x4e6cc1=_0x467fb5;if(this['_defeatedEnemies']===undefined)this[_0x4e6cc1('0x62e')]();return this[_0x4e6cc1('0x226')];},Game_System[_0x467fb5('0xc9')][_0x467fb5('0x75f')]=function(_0x11e57f){const _0x1b0d63=_0x467fb5;if(this[_0x1b0d63('0x226')]===undefined)this[_0x1b0d63('0x62e')]();if(!_0x11e57f)return;if(this[_0x1b0d63('0x226')][_0x1b0d63('0x790')](_0x11e57f))return;this[_0x1b0d63('0x226')][_0x1b0d63('0x26f')](_0x11e57f),this['_defeatedEnemies'][_0x1b0d63('0x59')]((_0x42ee0f,_0x5600b3)=>_0x42ee0f-_0x5600b3);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x90')]=Game_BattlerBase['prototype'][_0x467fb5('0x260')],Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x260')]=function(_0x2345e8){const _0x11a81a=_0x467fb5,_0x407b76=this['isAlive'](),_0x1af7a6=this[_0x11a81a('0x8b4')]();VisuMZ['BattleCore'][_0x11a81a('0x90')]['call'](this,_0x2345e8),this[_0x11a81a('0x8c6')]()&&_0x407b76&&this['isDead']()&&(this[_0x11a81a('0x40b')]=!this['hasBeenDefeatedBefore'](),$gameSystem[_0x11a81a('0x75f')](this[_0x11a81a('0x78c')]())),SceneManager[_0x11a81a('0x21')]()&&_0x1af7a6!==this[_0x11a81a('0x8b4')]()&&(this[_0x11a81a('0x67b')]()&&this['battler']()[_0x11a81a('0x1d2')]());},Game_Enemy['prototype']['hasBeenDefeatedBefore']=function(){const _0x5128e3=_0x467fb5;return $gameSystem[_0x5128e3('0x3a7')]()['includes'](this[_0x5128e3('0xab')]);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x4e7')]=Game_BattlerBase['prototype'][_0x467fb5('0x1fd')],Game_BattlerBase['prototype'][_0x467fb5('0x1fd')]=function(_0x57cfd8){const _0x4839c7=_0x467fb5;VisuMZ[_0x4839c7('0x15b')][_0x4839c7('0x4e7')]['call'](this,_0x57cfd8),this[_0x4839c7('0x8c6')]()&&_0x57cfd8===this[_0x4839c7('0x723')]()&&this[_0x4839c7('0x70c')]()&&(this['_visualHpGauge_JustDied']=![]),SceneManager[_0x4839c7('0x21')]()&&this['requestMotionRefresh']();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x170')]=Game_Action['prototype'][_0x467fb5('0x418')],Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x418')]=function(){const _0x1a6789=_0x467fb5;VisuMZ[_0x1a6789('0x15b')][_0x1a6789('0x170')][_0x1a6789('0x709')](this),this[_0x1a6789('0x6aa')]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x1a6789('0x37e')]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this[_0x1a6789('0x4ec')]='default';},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x596')]=function(_0x26e963,_0x83867c){const _0x5cdc73=_0x467fb5;return VisuMZ[_0x5cdc73('0x15b')]['Settings'][_0x5cdc73('0x82c')][_0x5cdc73('0x11a')][_0x5cdc73('0x709')](this,_0x26e963,_0x83867c);},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x161')]=function(_0x21d4c0,_0x450cf6){const _0x3faf99=_0x467fb5;return VisuMZ['BattleCore']['Settings'][_0x3faf99('0x82c')][_0x3faf99('0x539')][_0x3faf99('0x709')](this,_0x21d4c0,_0x450cf6);},Game_Action[_0x467fb5('0xc9')]['applyGuard']=function(_0xc2cb36,_0x5c91c4){const _0x9fef02=_0x467fb5;return VisuMZ[_0x9fef02('0x15b')][_0x9fef02('0x110')][_0x9fef02('0x82c')]['GuardFormulaJS']['call'](this,_0xc2cb36,_0x5c91c4);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x2b2')]=Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x21d')],Game_Action['prototype']['itemHit']=function(_0xe51f95){const _0x4c1280=_0x467fb5,_0x2495e3=this[_0x4c1280('0x19a')]()[_0x4c1280('0x50e')];if(_0x2495e3['match'](/<ALWAYS HIT>/i))return 0x1;else{if(_0x2495e3[_0x4c1280('0x5e2')](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if('HnrXl'!==_0x4c1280('0x739')){function _0x4a61b7(){const _0x485e6d=_0x4c1280;_0x431d9c[_0x485e6d('0xc1')](_0x5d5649,_0xc632);}}else return Number(RegExp['$1'])/0x64;}else{let _0xe8d3e4=VisuMZ[_0x4c1280('0x15b')][_0x4c1280('0x2b2')][_0x4c1280('0x709')](this,_0xe51f95);return _0xe8d3e4=this[_0x4c1280('0x37e')][_0x4c1280('0x1bf')]*_0xe8d3e4+this[_0x4c1280('0x37e')][_0x4c1280('0x1ad')],_0xe8d3e4;}}},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x469')]=function(_0x3de35b){const _0x5204b4=_0x467fb5;if(!this[_0x5204b4('0x19a')]()[_0x5204b4('0x554')][_0x5204b4('0x1d8')])return 0x0;let _0x3aed85=VisuMZ[_0x5204b4('0x15b')][_0x5204b4('0x110')][_0x5204b4('0x82c')][_0x5204b4('0x3b3')]['call'](this,_0x3de35b);return _0x3aed85=this[_0x5204b4('0x37e')][_0x5204b4('0x512')]*_0x3aed85+this[_0x5204b4('0x37e')]['criticalHitFlat'],_0x3aed85;},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x3ea')]=function(_0x5b5ebb){const _0x4d56f7=_0x467fb5;return _0x5b5ebb=VisuMZ[_0x4d56f7('0x15b')][_0x4d56f7('0x110')][_0x4d56f7('0x82c')][_0x4d56f7('0x3f2')][_0x4d56f7('0x709')](this,_0x5b5ebb),_0x5b5ebb=this[_0x4d56f7('0x37e')]['criticalDmgRate']*_0x5b5ebb+this[_0x4d56f7('0x37e')][_0x4d56f7('0x3fc')],_0x5b5ebb;},VisuMZ['BattleCore']['Game_Action_evalDamageFormula']=Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x20f')],Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x20f')]=function(_0x1d53c6){const _0x425ddb=_0x467fb5;if(this['_customDamageFormula']!==_0x425ddb('0x549')){if(_0x425ddb('0x42d')===_0x425ddb('0x42d'))return this[_0x425ddb('0x867')](_0x1d53c6);else{function _0x5ac9a0(){const _0x28b63d=_0x425ddb,_0xc66ebf=this['commandName'](_0x548a19);if(_0xc66ebf[_0x28b63d('0x5e2')](/\\I\[(\d+)\]/i)){const _0x340bf7=this['itemLineRect'](_0x1e173d),_0x29030d=this[_0x28b63d('0x726')](_0xc66ebf)[_0x28b63d('0x6c2')];return _0x29030d<=_0x340bf7['width']?_0x28b63d('0x3be'):_0x28b63d('0x2f');}}}}else{if(DataManager[_0x425ddb('0x5cf')](this[_0x425ddb('0x19a')]())==='MANUAL')return VisuMZ[_0x425ddb('0x15b')][_0x425ddb('0x69')]['call'](this,_0x1d53c6);else{if(_0x425ddb('0x574')==='COjPk')return this[_0x425ddb('0x8e4')](_0x1d53c6);else{function _0x172e31(){const _0x55da9b=_0x425ddb;if(this[_0x55da9b('0x825')][_0x55da9b('0x6c7')]!==_0x580038)return this[_0x55da9b('0x825')]['svAnchorY'];return this[_0x55da9b('0x23')]()[_0x55da9b('0x50e')]['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x55da9b('0x825')]['svAnchorX']=_0x25244d(_0x4066ef['$1']),this[_0x55da9b('0x825')][_0x55da9b('0x6c7')]=_0x5c35b3(_0x2d79f2['$2'])):this[_0x55da9b('0x825')]['svAnchorY']=_0x3ae071['prototype'][_0x55da9b('0x586')][_0x55da9b('0x709')](this),this['_cache'][_0x55da9b('0x6c7')];}}}}},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x6d')]=function(_0x58f970){const _0x1d00af=_0x467fb5;this[_0x1d00af('0x4ec')]=_0x58f970;},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x867')]=function(_0x5ef898){const _0x93d883=_0x467fb5,_0x54534e=this['item'](),_0x26d4a0=_0x54534e[_0x93d883('0x554')][_0x93d883('0x838')];_0x54534e[_0x93d883('0x554')][_0x93d883('0x838')]=this[_0x93d883('0x4ec')];let _0x3db9e9=VisuMZ[_0x93d883('0x15b')][_0x93d883('0x69')][_0x93d883('0x709')](this,_0x5ef898);return _0x54534e[_0x93d883('0x554')]['formula']=_0x26d4a0,_0x3db9e9;},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x664')]=function(){const _0x518e6d=_0x467fb5;if(this[_0x518e6d('0x19a')]()[_0x518e6d('0x50e')][_0x518e6d('0x5e2')](/<DAMAGE STYLE:[ ](.*)>/i)){const _0xf4f1fa=String(RegExp['$1'])['toUpperCase']()['trim']();return _0xf4f1fa;}return _0x518e6d('0x842');},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x8e4')]=function(_0x15e714){const _0x12d84d=_0x467fb5,_0x4f7171=DataManager[_0x12d84d('0x5cf')](this[_0x12d84d('0x19a')]()),_0x5b6bbc=VisuMZ[_0x12d84d('0x1e0')][_0x4f7171];try{return _0x5b6bbc['Formula'][_0x12d84d('0x709')](this,_0x15e714);}catch(_0x4b2218){if($gameTemp[_0x12d84d('0x56f')]())console[_0x12d84d('0x107')](_0x4b2218);return VisuMZ[_0x12d84d('0x15b')][_0x12d84d('0x69')][_0x12d84d('0x709')](this);}},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x845')]=function(_0x4729d2,_0x6328c2){const _0x1cc9d6=_0x467fb5;if(this[_0x1cc9d6('0x4fb')]())return _0x6328c2;const _0x5b08b1=this[_0x1cc9d6('0x113')](),_0x341596=_0x4729d2;let _0x146f83=[],_0x231ac3=[];_0x146f83['push'](this['_armorPenetration'][_0x1cc9d6('0x73a')],this[_0x1cc9d6('0x6aa')][_0x1cc9d6('0x1f4')]),_0x231ac3[_0x1cc9d6('0x26f')](this[_0x1cc9d6('0x6aa')][_0x1cc9d6('0x7e7')],this[_0x1cc9d6('0x6aa')][_0x1cc9d6('0x5eb')]);const _0x3db8eb=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x5cc95c=this[_0x1cc9d6('0x542')]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x37d009=this[_0x1cc9d6('0x542')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x50afe4=this[_0x1cc9d6('0x542')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;return _0x146f83=_0x146f83[_0x1cc9d6('0x112')](_0x341596['traitObjects']()[_0x1cc9d6('0xae')](_0x3514d6=>_0x3514d6&&_0x3514d6[_0x1cc9d6('0x50e')]['match'](_0x3db8eb)?Number(RegExp['$1']):0x0)),_0x231ac3=_0x231ac3[_0x1cc9d6('0x112')](_0x341596[_0x1cc9d6('0x4f3')]()[_0x1cc9d6('0xae')](_0x323c5e=>_0x323c5e&&_0x323c5e[_0x1cc9d6('0x50e')]['match'](_0x5cc95c)?Number(RegExp['$1'])/0x64:0x0)),_0x146f83=_0x146f83[_0x1cc9d6('0x112')](_0x5b08b1[_0x1cc9d6('0x4f3')]()[_0x1cc9d6('0xae')](_0xbb8aab=>_0xbb8aab&&_0xbb8aab[_0x1cc9d6('0x50e')][_0x1cc9d6('0x5e2')](_0x37d009)?Number(RegExp['$1']):0x0)),_0x231ac3=_0x231ac3['concat'](_0x5b08b1[_0x1cc9d6('0x4f3')]()[_0x1cc9d6('0xae')](_0x2043df=>_0x2043df&&_0x2043df['note'][_0x1cc9d6('0x5e2')](_0x50afe4)?Number(RegExp['$1'])/0x64:0x0)),this[_0x1cc9d6('0x19a')]()[_0x1cc9d6('0x50e')][_0x1cc9d6('0x5e2')](_0x37d009)&&_0x146f83[_0x1cc9d6('0x26f')](Number(RegExp['$1'])),this['item']()[_0x1cc9d6('0x50e')][_0x1cc9d6('0x5e2')](_0x50afe4)&&_0x231ac3[_0x1cc9d6('0x26f')](Number(RegExp['$1'])),_0x6328c2=_0x146f83['reduce']((_0x12ef7d,_0xe7f2c0)=>_0x12ef7d-_0xe7f2c0,_0x6328c2),_0x6328c2>0x0&&(_0x6328c2=_0x231ac3[_0x1cc9d6('0x313')]((_0x200201,_0x29a511)=>_0x200201*(0x1-_0x29a511),_0x6328c2)),_0x6328c2;},VisuMZ['BattleCore'][_0x467fb5('0x458')]=Game_Action['prototype'][_0x467fb5('0x251')],Game_Action['prototype']['executeDamage']=function(_0x362809,_0x13a182){const _0x397df0=_0x467fb5;_0x13a182=_0x13a182*this['_multipliers']['damageRate'],_0x13a182+=this[_0x397df0('0x37e')]['damageFlat']*(_0x13a182>=0x0?0x1:-0x1),_0x13a182=this[_0x397df0('0x341')](_0x397df0('0x217'),_0x362809,_0x13a182,![]),_0x13a182=this[_0x397df0('0x5c')](_0x13a182),_0x13a182=Math['round'](_0x13a182),this[_0x397df0('0x23c')]=_0x13a182,this[_0x397df0('0x1ec')]=this[_0x397df0('0x1ec')]||0x0,this[_0x397df0('0x1ec')]+=_0x13a182,VisuMZ[_0x397df0('0x15b')]['Game_Action_executeDamage'][_0x397df0('0x709')](this,_0x362809,_0x13a182),this[_0x397df0('0x341')](_0x397df0('0x3f5'),_0x362809,_0x13a182,!![]);},Game_Action['prototype'][_0x467fb5('0x5c')]=function(_0x471b42){const _0x221600=_0x467fb5;if(this[_0x221600('0x559')]())return _0x471b42;return _0x471b42=this[_0x221600('0x827')](_0x471b42),_0x471b42=this[_0x221600('0xd3')](_0x471b42),_0x471b42;},Game_Action[_0x467fb5('0xc9')]['isBypassDamageCap']=function(){const _0x3fc261=_0x467fb5,_0x47c1a1=/<BYPASS DAMAGE CAP>/i;if(this[_0x3fc261('0x19a')]()[_0x3fc261('0x50e')][_0x3fc261('0x5e2')](_0x47c1a1))return!![];if(this['subject']()['traitObjects']()['some'](_0x1cb546=>_0x1cb546&&_0x1cb546[_0x3fc261('0x50e')]['match'](_0x47c1a1)))return!![];return!VisuMZ[_0x3fc261('0x15b')][_0x3fc261('0x110')][_0x3fc261('0x82c')][_0x3fc261('0x6f8')];},Game_Action['prototype'][_0x467fb5('0x827')]=function(_0x2cfbb0){const _0x5bfeaf=_0x467fb5;if(!VisuMZ[_0x5bfeaf('0x15b')][_0x5bfeaf('0x110')]['Damage'][_0x5bfeaf('0x881')])return _0x2cfbb0;const _0x1d7155=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0x5bfeaf('0x19a')]()[_0x5bfeaf('0x50e')][_0x5bfeaf('0x5e2')](_0x1d7155))return!![];if(this['subject']()[_0x5bfeaf('0x4f3')]()[_0x5bfeaf('0xdd')](_0x322462=>_0x322462&&_0x322462[_0x5bfeaf('0x50e')][_0x5bfeaf('0x5e2')](_0x1d7155)))return!![];const _0x528c4d=_0x2cfbb0<0x0?-0x1:0x1;_0x2cfbb0=Math[_0x5bfeaf('0x1c0')](_0x2cfbb0);let _0x2e2fd7=this[_0x5bfeaf('0x113')]()[_0x5bfeaf('0x37')]();if(this['item']()[_0x5bfeaf('0x50e')][_0x5bfeaf('0x5e2')](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)){if(_0x5bfeaf('0x1bc')!=='rcbuE'){function _0x378c65(){const _0x3efc51=_0x5bfeaf;_0x48da7c[_0x3efc51('0x15b')][_0x3efc51('0x6bf')][_0x3efc51('0x709')](this,_0x49fa4b),this[_0x3efc51('0x7a0')](_0x2d7173);}}else _0x2e2fd7+=Number(RegExp['$1'])/0x64;}_0x2e2fd7=_0x2e2fd7[_0x5bfeaf('0x439')](0.01,0x1);const _0x525f96=this[_0x5bfeaf('0x7c7')](),_0x348da4=_0x2e2fd7*_0x525f96;if(_0x2cfbb0>_0x348da4&&_0x525f96>_0x348da4){_0x2cfbb0-=_0x348da4;const _0x4ae6d4=VisuMZ['BattleCore']['Settings']['Damage'][_0x5bfeaf('0x50')],_0x121df6=Math[_0x5bfeaf('0x6b9')](0x1-_0x2cfbb0/((_0x525f96-_0x348da4)*_0x4ae6d4+_0x2cfbb0),0.01);_0x2cfbb0*=_0x121df6,_0x2cfbb0+=_0x348da4;}return _0x2cfbb0*_0x528c4d;},Game_Action['prototype'][_0x467fb5('0x7c7')]=function(){const _0x2eee4f=_0x467fb5;if(this[_0x2eee4f('0x19a')]()[_0x2eee4f('0x50e')][_0x2eee4f('0x5e2')](/<DAMAGE CAP:[ ](\d+)>/i)){if('dZdXJ'==='fBDdi'){function _0x59c50f(){const _0x371eb9=_0x2eee4f;_0x252e69[_0x371eb9('0x26f')](_0x2482d9(_0x471604['$1']));}}else return Number(RegExp['$1']);}else return this[_0x2eee4f('0x113')]()[_0x2eee4f('0x508')]();},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0xd3')]=function(_0x533ab8){const _0x3f8eb8=_0x467fb5;let _0x24d0fe=this[_0x3f8eb8('0x7c7')]();return _0x533ab8[_0x3f8eb8('0x439')](-_0x24d0fe,_0x24d0fe);},VisuMZ['BattleCore'][_0x467fb5('0x5aa')]=Game_Action[_0x467fb5('0xc9')]['apply'],Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x74f')]=function(_0x2b34e2){const _0x1f1a5e=_0x467fb5;this[_0x1f1a5e('0x341')](_0x1f1a5e('0x4af'),_0x2b34e2,0x0,!![]),VisuMZ[_0x1f1a5e('0x15b')]['Game_Action_apply'][_0x1f1a5e('0x709')](this,_0x2b34e2),this['applyBattleCoreJS'](_0x1f1a5e('0x730'),_0x2b34e2,this[_0x1f1a5e('0x23c')]||0x0,!![]);},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x341')]=function(_0x32b617,_0x117a5f,_0xd3fcb6,_0x1a2181){const _0x3d68d1=_0x467fb5;_0xd3fcb6=_0xd3fcb6||0x0;const _0x56739c=_0xd3fcb6,_0x3e023d=VisuMZ[_0x3d68d1('0x15b')][_0x3d68d1('0x110')][_0x3d68d1('0x264')],_0x49057d=_0x32b617[_0x3d68d1('0x11')]('');if(_0x3e023d[_0x49057d]){_0xd3fcb6=_0x3e023d[_0x49057d][_0x3d68d1('0x709')](this,_0xd3fcb6,_0x117a5f);if(_0x1a2181)_0xd3fcb6=_0x56739c;}let _0x570993=VisuMZ[_0x3d68d1('0x15b')][_0x3d68d1('0x878')](this[_0x3d68d1('0x19a')](),_0x32b617[_0x3d68d1('0x11')](''));if(VisuMZ['BattleCore']['JS'][_0x570993]){if(_0x3d68d1('0x80b')!==_0x3d68d1('0x7d7')){_0xd3fcb6=VisuMZ[_0x3d68d1('0x15b')]['JS'][_0x570993][_0x3d68d1('0x709')](this,this[_0x3d68d1('0x113')](),_0x117a5f,this[_0x3d68d1('0x19a')](),_0xd3fcb6);if(_0x1a2181)_0xd3fcb6=_0x56739c;}else{function _0x5811ef(){this['wholeActionSet'](_0x260ded,_0x5ab26d,_0x401688);}}}for(const _0x23f1cb of this[_0x3d68d1('0x113')]()['traitObjects']()){if(_0x3d68d1('0x489')===_0x3d68d1('0x489')){if(!_0x23f1cb)continue;_0x570993=VisuMZ['BattleCore'][_0x3d68d1('0x878')](_0x23f1cb,_0x32b617[_0x3d68d1('0x11')](_0x3d68d1('0x19d')));if(VisuMZ[_0x3d68d1('0x15b')]['JS'][_0x570993]){_0xd3fcb6=VisuMZ['BattleCore']['JS'][_0x570993][_0x3d68d1('0x709')](this,this[_0x3d68d1('0x113')](),_0x117a5f,_0x23f1cb,_0xd3fcb6);if(_0x1a2181)_0xd3fcb6=_0x56739c;}}else{function _0x5c3309(){return _0x1f77cb['_motionSpeed'];}}}for(const _0xd4d2a4 of _0x117a5f[_0x3d68d1('0x4f3')]()){if(_0x3d68d1('0x9e')!==_0x3d68d1('0x415')){if(!_0xd4d2a4)continue;_0x570993=VisuMZ[_0x3d68d1('0x15b')]['createKeyJS'](_0xd4d2a4,_0x32b617['format'](_0x3d68d1('0x525')));if(VisuMZ[_0x3d68d1('0x15b')]['JS'][_0x570993]){_0xd3fcb6=VisuMZ[_0x3d68d1('0x15b')]['JS'][_0x570993][_0x3d68d1('0x709')](this,this['subject'](),_0x117a5f,_0xd4d2a4,_0xd3fcb6);if(_0x1a2181)_0xd3fcb6=_0x56739c;}}else{function _0x4d4b76(){const _0x23ee82=_0x3d68d1;this[_0x23ee82('0x35e')]=_0x117378[_0x23ee82('0x35e')];}}}return _0xd3fcb6;},Game_Action[_0x467fb5('0xc9')]['actionBattleCoreJS']=function(_0x53e899){const _0x8b2745=_0x467fb5,_0xbe48f1=this[_0x8b2745('0x1ec')]||0x0,_0x5dea77=VisuMZ[_0x8b2745('0x15b')][_0x8b2745('0x110')]['Mechanics'],_0xb6267c=_0x53e899[_0x8b2745('0x11')]('');if(_0x5dea77[_0xb6267c]){if(_0x8b2745('0x62')===_0x8b2745('0x44c')){function _0x2c452b(){const _0x4b9052=_0x8b2745;if(!_0xccde94[_0x4b9052('0xe1')]())return;if(this[_0x4b9052('0x2bf')])return;this['_flinched']=!![];const _0x30c88c=this[_0x4b9052('0x67b')]();if(_0x30c88c)_0x30c88c['stepFlinch']();}}else _0x5dea77[_0xb6267c][_0x8b2745('0x709')](this,_0xbe48f1);}let _0x5650cc=VisuMZ[_0x8b2745('0x15b')][_0x8b2745('0x878')](this[_0x8b2745('0x19a')](),_0x53e899);VisuMZ[_0x8b2745('0x15b')]['JS'][_0x5650cc]&&VisuMZ['BattleCore']['JS'][_0x5650cc][_0x8b2745('0x709')](this,this[_0x8b2745('0x113')](),this['subject'](),this['item'](),_0xbe48f1);for(const _0x412118 of this[_0x8b2745('0x113')]()[_0x8b2745('0x4f3')]()){if(!_0x412118)continue;_0x5650cc=VisuMZ[_0x8b2745('0x15b')][_0x8b2745('0x878')](_0x412118,_0x53e899),VisuMZ[_0x8b2745('0x15b')]['JS'][_0x5650cc]&&VisuMZ[_0x8b2745('0x15b')]['JS'][_0x5650cc][_0x8b2745('0x709')](this,this[_0x8b2745('0x113')](),this[_0x8b2745('0x113')](),_0x412118,_0xbe48f1);}},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x2a')]=function(){const _0x544a2d=_0x467fb5;return VisuMZ[_0x544a2d('0x15b')]['Settings'][_0x544a2d('0x264')][_0x544a2d('0x48f')][_0x544a2d('0x709')](this);},Game_Action['prototype'][_0x467fb5('0x1ee')]=function(){const _0x1ee3dc=_0x467fb5;return VisuMZ[_0x1ee3dc('0x15b')][_0x1ee3dc('0x110')][_0x1ee3dc('0x264')]['AllowRandomSpeed'];},Game_Action[_0x467fb5('0xc9')]['isCustomBattleScope']=function(){const _0x2d9d32=_0x467fb5;return this[_0x2d9d32('0x19a')]()[_0x2d9d32('0x50e')][_0x2d9d32('0x5e2')](/<JS TARGETS>/i);},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x130')]=function(){const _0x5498a4=_0x467fb5;if(!this[_0x5498a4('0x30e')]&&this['subject']()[_0x5498a4('0x4cd')]())return![];if(this[_0x5498a4('0x36f')]())return!![];return typeof this[_0x5498a4('0x19a')]()['scope']==='string';},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x67f')]=Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x647')],Game_Action['prototype']['isForOpponent']=function(){const _0x4c3690=_0x467fb5;if(this[_0x4c3690('0x130')]()&&!this[_0x4c3690('0x36f')]()){if(_0x4c3690('0x4eb')!==_0x4c3690('0x4eb')){function _0x2af82c(){const _0x49cb30=_0x4c3690;return this[_0x49cb30('0x6')];}}else return this[_0x4c3690('0x500')]();}else{if(_0x4c3690('0x33d')!=='SShLo'){function _0x4f90eb(){const _0x374149=_0x4c3690;if(!_0x1c69fe[_0x374149('0x21')]())return;_0x4e4627[_0x374149('0x7ae')](_0x5ac5f1,_0x3a1629);const _0x217827=_0x1f1b94[_0x374149('0x606')](),_0x16ae0f=_0x207531[_0x374149('0x3c0')],_0xb70529=_0x2d913d['CreateActionSequenceTargets'](_0x43263c[_0x374149('0x27f')]),_0x347935=_0x57be40[_0x374149('0x8ed')],_0xc0e5c3=_0x4c2bdf[_0x374149('0x27d')];if(!_0x217827||!_0x16ae0f)return;const _0x214d03=_0x16ae0f[_0x374149('0x58a')]();_0x549fd8['requestAnimation'](_0xb70529,_0x214d03,_0x347935),_0x5d6913['WaitForAnimation']&&_0x217827[_0x374149('0x707')](_0x374149('0x8ad'));}}else return VisuMZ[_0x4c3690('0x15b')][_0x4c3690('0x67f')][_0x4c3690('0x709')](this);}},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x500')]=function(){const _0x5eaed8=_0x467fb5,_0xa1f941=this[_0x5eaed8('0x19a')]()[_0x5eaed8('0x1c6')];return _0xa1f941[_0x5eaed8('0x5e2')](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x467fb5('0x15b')]['Game_Action_isForFriend']=Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x627')],Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x627')]=function(){const _0xbb4e88=_0x467fb5;if(this[_0xbb4e88('0x130')]()&&!this[_0xbb4e88('0x36f')]())return this[_0xbb4e88('0x8b7')]();else{if('vIlGz'===_0xbb4e88('0x4ef')){function _0x49d584(){const _0x285d68=_0xbb4e88;_0x4e5ad6['BattleCore'][_0x285d68('0x463')][_0x285d68('0x709')](this),this[_0x285d68('0x6c5')](),this[_0x285d68('0x3a4')]();}}else return VisuMZ[_0xbb4e88('0x15b')][_0xbb4e88('0x255')][_0xbb4e88('0x709')](this);}},Game_Action[_0x467fb5('0xc9')]['isForFriendBattleCore']=function(){const _0x5bea53=_0x467fb5,_0x48c06e=this[_0x5bea53('0x19a')]()[_0x5bea53('0x1c6')];return _0x48c06e['match'](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x467fb5('0x15b')]['Game_Action_isForRandom']=Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x543')],Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x543')]=function(){const _0x584ef5=_0x467fb5;if(this[_0x584ef5('0x130')]()&&!this[_0x584ef5('0x36f')]()){if(_0x584ef5('0x67')==='ZHYSk')return this[_0x584ef5('0xd8')]();else{function _0x5cecd9(){const _0x291b9c=_0x584ef5;this[_0x291b9c('0x145')][_0x291b9c('0x874')](0x0,0x0,0x0,0x0);}}}else return VisuMZ['BattleCore']['Game_Action_isForRandom'][_0x584ef5('0x709')](this);},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0xd8')]=function(){const _0x1b47a6=_0x467fb5,_0x4210d3=this[_0x1b47a6('0x19a')]()[_0x1b47a6('0x1c6')];return _0x4210d3[_0x1b47a6('0x5e2')](/(?:RAND|RANDOM)/i);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x805')]=Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x3e5')],Game_Action[_0x467fb5('0xc9')]['needsSelection']=function(){const _0x2fccb6=_0x467fb5;return this['isBattleCoreTargetScope']()&&!this[_0x2fccb6('0x36f')]()?this[_0x2fccb6('0x400')]():VisuMZ[_0x2fccb6('0x15b')][_0x2fccb6('0x805')]['call'](this);},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x400')]=function(){const _0x2ec43b=_0x467fb5,_0x13aee3=this[_0x2ec43b('0x19a')]()[_0x2ec43b('0x1c6')];if(_0x13aee3[_0x2ec43b('0x5e2')](/RANDOM/i))return![];return VisuMZ['BattleCore'][_0x2ec43b('0x805')][_0x2ec43b('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x83c')]=Game_Action['prototype'][_0x467fb5('0x3d')],Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x3d')]=function(){const _0x394022=_0x467fb5;if(this[_0x394022('0x130')]())return this[_0x394022('0x49d')]();else{if(_0x394022('0x6b1')!==_0x394022('0x6fb'))return VisuMZ['BattleCore']['Game_Action_makeTargets'][_0x394022('0x709')](this);else{function _0x159868(){const _0x179012=_0x394022;if(_0x13c065[_0x179012('0x21')]()&&_0xd70796[_0x179012('0x7d5')]()<=0x0)return;this[_0x179012('0x4c1')]('PreRegenerateJS'),_0x1ccf9d['BattleCore'][_0x179012('0x619')][_0x179012('0x709')](this),this[_0x179012('0x43c')](),this[_0x179012('0x4c1')](_0x179012('0x2ed'));}}}},Game_Action[_0x467fb5('0xc9')]['makeTargetsBattleCore']=function(){const _0x17e4c0=_0x467fb5;let _0x4fd7e0=[];const _0xe0f8d5=String(this['item']()[_0x17e4c0('0x1c6')]),_0x402ae9=VisuMZ['BattleCore']['createKeyJS'](this['item'](),'Targets');if(VisuMZ[_0x17e4c0('0x15b')]['JS'][_0x402ae9]){const _0x24b82a=VisuMZ['BattleCore'][_0x17e4c0('0x878')](this[_0x17e4c0('0x19a')](),'Targets');return _0x4fd7e0=VisuMZ[_0x17e4c0('0x15b')]['JS'][_0x24b82a][_0x17e4c0('0x709')](this,this[_0x17e4c0('0x113')](),_0x4fd7e0),this[_0x17e4c0('0x717')](_0x4fd7e0);}if(_0xe0f8d5[_0x17e4c0('0x5e2')](/(\d+) RANDOM ANY/i)){if(_0x17e4c0('0x5b2')!==_0x17e4c0('0x5b2')){function _0x3a54d4(){const _0x3b101c=_0x17e4c0;_0x570b10[_0x3b101c('0xc9')][_0x3b101c('0x677')][_0x3b101c('0x709')](this);}}else{let _0x4ef423=Number(RegExp['$1']);while(_0x4ef423--){const _0x10e65c=Math[_0x17e4c0('0xbe')](0x2)===0x0?this['opponentsUnit']():this['friendsUnit']();_0x4fd7e0['push'](_0x10e65c[_0x17e4c0('0x78e')]());}return this[_0x17e4c0('0x717')](_0x4fd7e0);}}if(_0xe0f8d5[_0x17e4c0('0x5e2')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x2db889=Number(RegExp['$1']);while(_0x2db889--){if('OnNnb'==='czcnH'){function _0x10e966(){const _0x1d7643=_0x17e4c0;if(this[_0x1d7643('0x11c')]()){const _0x824002=this[_0x1d7643('0x311')][_0x1d7643('0x98')]();this[_0x1d7643('0x30a')]=new _0x1b1eda(_0x824002['width'],_0x824002[_0x1d7643('0x41e')]);}else _0x495dbf[_0x1d7643('0x15b')][_0x1d7643('0x50d')][_0x1d7643('0x709')](this,_0x4c5637);}}else _0x4fd7e0['push'](this[_0x17e4c0('0x5be')]()[_0x17e4c0('0x78e')]());}return this[_0x17e4c0('0x717')](_0x4fd7e0);}if(_0xe0f8d5[_0x17e4c0('0x5e2')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if(_0x17e4c0('0x7e')===_0x17e4c0('0x7e')){let _0x551344=Number(RegExp['$1']);while(_0x551344--){if(_0x17e4c0('0xb1')===_0x17e4c0('0x159')){function _0x136a7e(){const _0x5213c7=_0x17e4c0;this[_0x5213c7('0x7cf')]=_0x5213c7('0x8cc');}}else _0x4fd7e0[_0x17e4c0('0x26f')](this[_0x17e4c0('0x4b6')]()[_0x17e4c0('0x78e')]());}return this[_0x17e4c0('0x717')](_0x4fd7e0);}else{function _0x5aee8b(){const _0x1e7ab6=_0x17e4c0;this[_0x1e7ab6('0x3ad')]&&this['_mainSprite'][_0x1e7ab6('0x17c')](_0x3a17f7);}}}if(_0xe0f8d5[_0x17e4c0('0x5e2')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x4fd7e0[_0x17e4c0('0x26f')](...this[_0x17e4c0('0x4b6')]()[_0x17e4c0('0x4dd')]()[_0x17e4c0('0x649')](_0x343b8e=>_0x343b8e!==this['subject']())),this[_0x17e4c0('0x717')](_0x4fd7e0);return VisuMZ[_0x17e4c0('0x15b')][_0x17e4c0('0x83c')][_0x17e4c0('0x709')](this);},Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x860')]=function(_0x4651f5){const _0x3e1c3f=_0x467fb5,_0xabe26c=[];for(let _0x2dbef4=0x0;_0x2dbef4<this[_0x3e1c3f('0x386')]();_0x2dbef4++){if('VvKvQ'!==_0x3e1c3f('0x59f')){function _0x445784(){const _0x156738=_0x3e1c3f;if(this[_0x156738('0x435')]()===_0x156738('0x5bc'))return this[_0x156738('0x691')]();else return this[_0x156738('0x84c')]()?this['skillItemWindowRectMiddle']():_0x54fdf0[_0x156738('0x15b')][_0x156738('0xd4')][_0x156738('0x709')](this);}}else _0xabe26c[_0x3e1c3f('0x26f')](_0x4651f5[_0x3e1c3f('0x78e')]());}return _0xabe26c;},VisuMZ[_0x467fb5('0x15b')]['Game_Action_itemEffectAddAttackState']=Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x2d7')],Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x2d7')]=function(_0x41db04,_0x41bcea){const _0x4e24b6=_0x467fb5,_0x33ffaa=_0x41db04[_0x4e24b6('0x761')]();this[_0x4e24b6('0x113')]()[_0x4e24b6('0x6a9')]()[_0x4e24b6('0x790')](_0x41db04[_0x4e24b6('0x723')]())&&_0x41db04[_0x4e24b6('0x16')](![]),VisuMZ[_0x4e24b6('0x15b')][_0x4e24b6('0x868')][_0x4e24b6('0x709')](this,_0x41db04,_0x41bcea),_0x41db04[_0x4e24b6('0x16')](_0x33ffaa);},VisuMZ['BattleCore'][_0x467fb5('0x5e4')]=Game_Action[_0x467fb5('0xc9')][_0x467fb5('0x63c')],Game_Action['prototype'][_0x467fb5('0x63c')]=function(_0x3aabaf,_0x12966e){const _0x500e54=_0x467fb5,_0x470b29=_0x3aabaf[_0x500e54('0x761')]();_0x12966e[_0x500e54('0x6d2')]===_0x3aabaf[_0x500e54('0x723')]()&&_0x3aabaf[_0x500e54('0x16')](![]),VisuMZ[_0x500e54('0x15b')][_0x500e54('0x5e4')][_0x500e54('0x709')](this,_0x3aabaf,_0x12966e),_0x3aabaf['setImmortal'](_0x470b29);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x57f')]=Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x6d1')],Game_BattlerBase[_0x467fb5('0xc9')]['initMembers']=function(){const _0x8ae985=_0x467fb5;VisuMZ[_0x8ae985('0x15b')][_0x8ae985('0x57f')][_0x8ae985('0x709')](this),this[_0x8ae985('0x31b')]();},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x31b')]=function(){const _0x2c1f09=_0x467fb5;this[_0x2c1f09('0x1f5')]=![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x203')]=Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x6c5')],Game_BattlerBase['prototype']['refresh']=function(){const _0x2a0cef=_0x467fb5;this[_0x2a0cef('0x825')]={},VisuMZ['BattleCore'][_0x2a0cef('0x203')][_0x2a0cef('0x709')](this);},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x6b3')]=function(_0x514cd7){const _0x244c3a=_0x467fb5;return this[_0x244c3a('0x825')]=this[_0x244c3a('0x825')]||{},this[_0x244c3a('0x825')][_0x514cd7]!==undefined;},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x508')]=function(){const _0x5f2680=_0x467fb5;if(this['_cache']['hardDamageCap']!==undefined)return this[_0x5f2680('0x825')][_0x5f2680('0x508')];const _0x3763a4=/<DAMAGE CAP:[ ](\d+)>/i,_0x2bb699=this[_0x5f2680('0x4f3')]()[_0x5f2680('0xae')](_0x4320cf=>_0x4320cf&&_0x4320cf[_0x5f2680('0x50e')][_0x5f2680('0x5e2')](_0x3763a4)?Number(RegExp['$1']):0x0);let _0x2d8a64=_0x2bb699[_0x5f2680('0x828')]>0x0?Math['max'](..._0x2bb699):0x0;if(_0x2d8a64<=0x0)_0x2d8a64=VisuMZ['BattleCore'][_0x5f2680('0x110')][_0x5f2680('0x82c')][_0x5f2680('0xfd')];return this[_0x5f2680('0x825')][_0x5f2680('0x508')]=_0x2d8a64,this[_0x5f2680('0x825')][_0x5f2680('0x508')];},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x37')]=function(){const _0x5f1956=_0x467fb5;if(this[_0x5f1956('0x825')][_0x5f1956('0x8d1')]!==undefined)return this[_0x5f1956('0x825')][_0x5f1956('0x8d1')];let _0x485800=VisuMZ[_0x5f1956('0x15b')][_0x5f1956('0x110')][_0x5f1956('0x82c')][_0x5f1956('0x4ff')];const _0x3679fe=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x527273=this[_0x5f1956('0x4f3')]()[_0x5f1956('0xae')](_0x52db4c=>_0x52db4c&&_0x52db4c[_0x5f1956('0x50e')][_0x5f1956('0x5e2')](_0x3679fe)?Number(RegExp['$1'])/0x64:0x0);return _0x485800=_0x527273['reduce']((_0x332c30,_0x2d3a06)=>_0x332c30+_0x2d3a06,_0x485800),this['_cache'][_0x5f1956('0x8d1')]=_0x485800,this[_0x5f1956('0x825')][_0x5f1956('0x8d1')][_0x5f1956('0x439')](0.01,0x1);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x5d0')]=Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x2a4')],Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x2a4')]=function(){const _0x28bd6a=_0x467fb5;VisuMZ[_0x28bd6a('0x15b')]['Game_BattlerBase_die']['call'](this),SceneManager[_0x28bd6a('0x21')]()&&this['requestMotion'](_0x28bd6a('0x32f'));},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x67b')]=function(){const _0x2b7bdf=_0x467fb5;if(!SceneManager[_0x2b7bdf('0x21')]())return null;if(!SceneManager[_0x2b7bdf('0x26e')][_0x2b7bdf('0x115')])return null;return SceneManager[_0x2b7bdf('0x26e')][_0x2b7bdf('0x115')]['findTargetSprite'](this);},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x232')]=function(){const _0x30f41d=_0x467fb5;return VisuMZ[_0x30f41d('0x15b')][_0x30f41d('0x110')][_0x30f41d('0x231')][_0x30f41d('0x124')];},Game_BattlerBase['prototype'][_0x467fb5('0x586')]=function(){const _0x1c7a0d=_0x467fb5;return VisuMZ[_0x1c7a0d('0x15b')][_0x1c7a0d('0x110')][_0x1c7a0d('0x231')][_0x1c7a0d('0x2d1')];},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x69b')]=function(){const _0x4148b4=_0x467fb5;if(this[_0x4148b4('0x317')]&&this[_0x4148b4('0x317')]()){if(_0x4148b4('0x555')!==_0x4148b4('0x555')){function _0x2d2a82(){const _0x397aaa=_0x4148b4;this[_0x397aaa('0x77d')][_0x397aaa('0x209')](_0x578c6d);}}else return VisuMZ[_0x4148b4('0x15b')][_0x4148b4('0x110')][_0x4148b4('0x231')][_0x4148b4('0x1ef')];}else return VisuMZ['BattleCore'][_0x4148b4('0x110')]['Enemy']['Shadow'];},Game_BattlerBase['prototype']['battlerSmoothImage']=function(){return!![];},Game_BattlerBase[_0x467fb5('0xc9')]['battleUIOffsetX']=function(){return 0x0;},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x179')]=function(){return 0x0;},Game_BattlerBase[_0x467fb5('0xc9')]['createBattleUIOffsetX']=function(_0xc58506){const _0x37de85=_0x467fb5;if(!_0xc58506)return 0x0;let _0x516150=0x0;const _0x4f9d93=_0xc58506[_0x37de85('0x50e')];return _0x4f9d93[_0x37de85('0x5e2')](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x516150+=Number(RegExp['$1'])),_0x4f9d93['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x516150+=Number(RegExp['$1'])),_0x516150;},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x63f')]=function(_0x5c3519){const _0x37b8c6=_0x467fb5;if(!_0x5c3519)return 0x0;let _0x238105=0x0;const _0xa8208c=_0x5c3519[_0x37b8c6('0x50e')];return _0xa8208c['match'](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x238105+=Number(RegExp['$1'])),_0xa8208c[_0x37b8c6('0x5e2')](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x238105+=Number(RegExp['$2'])),_0x238105;},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3cb')]=Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0xd5')],Game_BattlerBase['prototype'][_0x467fb5('0xd5')]=function(_0x168e1e){const _0x560828=_0x467fb5;if(_0x168e1e===this[_0x560828('0x723')]()&&this[_0x560828('0x761')]()){if(_0x560828('0xd1')!==_0x560828('0x245'))return!![];else{function _0x369e65(){const _0x5b9a63=_0x560828;_0x4e085e[_0x5b9a63('0x342')]([_0xbf78d5]);}}}return VisuMZ[_0x560828('0x15b')][_0x560828('0x3cb')][_0x560828('0x709')](this,_0x168e1e);},Game_BattlerBase[_0x467fb5('0xc9')]['isImmortal']=function(){const _0x50a3fa=_0x467fb5;return this[_0x50a3fa('0x1f5')];},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x16')]=function(_0x2a645e){const _0x5b7f2f=_0x467fb5;if(_0x2a645e){if('bjlhI'!==_0x5b7f2f('0xa3')){function _0x3b708c(){const _0x26d2df=_0x5b7f2f;_0x1f96d6[_0x26d2df('0x15b')][_0x26d2df('0x614')]['call'](this),this[_0x26d2df('0x3f7')]();}}else this[_0x5b7f2f('0x615')]();}else this['removeImmortal']();},Game_BattlerBase[_0x467fb5('0xc9')]['addImmortal']=function(){const _0x1ed4ca=_0x467fb5;if(this[_0x1ed4ca('0xb2')]())return;this['_immortal']=!![];},Game_BattlerBase['prototype'][_0x467fb5('0x47e')]=function(){const _0x4f996a=_0x467fb5,_0x2c33c1=this['isAlive']();this[_0x4f996a('0x1f5')]=![],this[_0x4f996a('0x6c5')]();if(this[_0x4f996a('0xb2')]()&&_0x2c33c1){if(_0x4f996a('0x8ac')!=='WUBCm'){function _0x3b3e0c(){_0x39133d=_0x594842>=_0x23609c?_0xb95bf7:_0x1d0156;}}else this[_0x4f996a('0x214')](),this[_0x4f996a('0x28b')]();}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x693')]=Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x5bb')],Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x5bb')]=function(){const _0x2ad507=_0x467fb5;if(!this[_0x2ad507('0x384')]())return![];return VisuMZ[_0x2ad507('0x15b')][_0x2ad507('0x693')]['call'](this);},Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x384')]=function(){for(const _0x2d925a of this['traitObjects']()){if(!_0x2d925a)continue;if(_0x2d925a['note']['match'](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x5d')]=Game_BattlerBase[_0x467fb5('0xc9')][_0x467fb5('0x4c6')],Game_BattlerBase['prototype'][_0x467fb5('0x4c6')]=function(){const _0x369c24=_0x467fb5;if(!this['canGuardBattleCore']())return![];return VisuMZ[_0x369c24('0x15b')][_0x369c24('0x5d')]['call'](this);},Game_BattlerBase[_0x467fb5('0xc9')]['canGuardBattleCore']=function(){const _0x539b1c=_0x467fb5;for(const _0x3acfcd of this[_0x539b1c('0x4f3')]()){if(!_0x3acfcd)continue;if(_0x3acfcd['note'][_0x539b1c('0x5e2')](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase['prototype']['canUseItemCommand']=function(){const _0x11a9ac=_0x467fb5;for(const _0x530d5d of this[_0x11a9ac('0x4f3')]()){if(!_0x530d5d)continue;if(_0x530d5d[_0x11a9ac('0x50e')][_0x11a9ac('0x5e2')](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x619')]=Game_Battler[_0x467fb5('0xc9')]['regenerateAll'],Game_Battler[_0x467fb5('0xc9')]['regenerateAll']=function(){const _0xb9eaf8=_0x467fb5;if(SceneManager[_0xb9eaf8('0x21')]()&&$gameTroop['turnCount']()<=0x0)return;this[_0xb9eaf8('0x4c1')](_0xb9eaf8('0x679')),VisuMZ[_0xb9eaf8('0x15b')][_0xb9eaf8('0x619')][_0xb9eaf8('0x709')](this),this[_0xb9eaf8('0x43c')](),this[_0xb9eaf8('0x4c1')]('PostRegenerateJS');},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x43c')]=function(){const _0x4850b6=_0x467fb5;if(SceneManager[_0x4850b6('0x21')]())for(const _0x587648 of this[_0x4850b6('0x4f3')]()){if(_0x4850b6('0x849')==='FkmFY'){function _0x2855fc(){const _0x48a9dc=_0x4850b6;_0x3b2cf8[_0x48a9dc('0x15b')][_0x48a9dc('0x2c8')][_0x48a9dc('0x709')](this,_0x553bd7),this['callNextMethod']();}}else{if(!_0x587648)continue;this[_0x4850b6('0x89f')](_0x587648);}}},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x89f')]=function(_0x2de05f){const _0x457487=_0x467fb5;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!SceneManager[_0x457487('0x21')]())return;if(this[_0x457487('0xb2')]())return;if(this[_0x457487('0x8c2')]())return;if(_0x2de05f['note'][_0x457487('0x5e2')](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){if(_0x457487('0x353')!=='yrRsc'){function _0x5d36de(){_0x5a6fca=_0x2b5473>=_0x233437?_0x4251cf:_0xbba6ca;}}else{const _0x4e5d4f=Number(RegExp['$1']);$gameTemp[_0x457487('0x153')]([this],_0x4e5d4f,![],![]);}}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6e1')]=Game_Battler[_0x467fb5('0xc9')]['startTpbTurn'],Game_Battler[_0x467fb5('0xc9')]['startTpbTurn']=function(){const _0x45e7bb=_0x467fb5;this[_0x45e7bb('0x4c1')](_0x45e7bb('0x48b')),VisuMZ[_0x45e7bb('0x15b')][_0x45e7bb('0x6e1')][_0x45e7bb('0x709')](this),this[_0x45e7bb('0x4c1')]('PostStartTurnJS');},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x301')]=Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x8a6')],Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x8a6')]=function(){const _0xbe1b31=_0x467fb5;this[_0xbe1b31('0x4c1')](_0xbe1b31('0x27')),VisuMZ['BattleCore']['Game_Battler_onTurnEnd']['call'](this),this['processBattleCoreJS'](_0xbe1b31('0x2b8'));},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x4c1')]=function(_0x5d5818){const _0xac45b8=_0x467fb5,_0x31d961=VisuMZ['BattleCore']['Settings'][_0xac45b8('0x264')];if(_0x31d961[_0x5d5818])_0x31d961[_0x5d5818][_0xac45b8('0x709')](this);for(const _0x339a37 of this[_0xac45b8('0x4f3')]()){if(!_0x339a37)continue;key=VisuMZ[_0xac45b8('0x15b')]['createKeyJS'](_0x339a37,_0x5d5818),VisuMZ['BattleCore']['JS'][key]&&VisuMZ[_0xac45b8('0x15b')]['JS'][key][_0xac45b8('0x709')](this,this,this,_0x339a37,0x0);}},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x4d4')]=function(){const _0x3d649d=_0x467fb5;return VisuMZ['BattleCore'][_0x3d649d('0x110')][_0x3d649d('0x231')][_0x3d649d('0x642')]||![];},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x1e7')]=function(){const _0x5271a4=_0x467fb5;if(this[_0x5271a4('0x774')]()){if(this[_0x5271a4('0x4d4')]()){if(_0x5271a4('0x74a')===_0x5271a4('0x4e1')){function _0x3ac704(){const _0x2a0d04=_0x5271a4;if(!_0x18648d[_0x2a0d04('0xe1')]())return;const _0x147905=this[_0x2a0d04('0x67b')]();if(!_0x147905)return;_0x147905['startOpacity'](_0x28732c,_0x2f5c81,_0x40d7b4);}}else{if(this['_actions']['some'](_0x205057=>_0x205057[_0x5271a4('0x19a')]()&&_0x205057['isMagical']()))return!![];}}else{if(this[_0x5271a4('0x834')][_0x5271a4('0xdd')](_0x574642=>_0x574642['item']()&&_0x574642[_0x5271a4('0x624')]()))return!![];}}if(BattleManager[_0x5271a4('0x847')]()&&this[_0x5271a4('0x8b5')]===_0x5271a4('0x6e3')){if(_0x5271a4('0x29e')!==_0x5271a4('0x22d'))return this['chantStyle']()?this['currentAction']()&&this[_0x5271a4('0x530')]()[_0x5271a4('0x19a')]()&&this[_0x5271a4('0x530')]()[_0x5271a4('0x888')]():this[_0x5271a4('0x530')]()&&this[_0x5271a4('0x530')]()[_0x5271a4('0x19a')]()&&this[_0x5271a4('0x530')]()['isMagicSkill']();else{function _0x522069(){const _0x54c27d=_0x5271a4;this['_floatHeight']=(this[_0x54c27d('0x5ca')]*(_0x4754ac-0x1)+this[_0x54c27d('0xd6')])/_0x5bebb1;}}}return![];},Game_Battler[_0x467fb5('0xc9')]['isCharging']=function(){const _0x4b4524=_0x467fb5;if(BattleManager['isTpb']()&&this[_0x4b4524('0x8b5')]===_0x4b4524('0x6e3')){if(this[_0x4b4524('0x4d4')]()){if(_0x4b4524('0xe7')==='JNNJe'){function _0x11c41b(){const _0x32586d=_0x4b4524;_0x4f4550[_0x32586d('0x23')]()[_0x32586d('0x289')](),_0x481df8[_0x32586d('0x8d9')](),_0x1b2453[_0x32586d('0x61a')](),this['changeInputWindow']();}}else return this[_0x4b4524('0x530')]()&&this[_0x4b4524('0x530')]()[_0x4b4524('0x19a')]()&&!this[_0x4b4524('0x530')]()['isMagical']();}else return this[_0x4b4524('0x530')]()&&this['currentAction']()[_0x4b4524('0x19a')]()&&!this[_0x4b4524('0x530')]()[_0x4b4524('0x624')]();}return![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x48a')]=Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0xdb')],Game_Battler[_0x467fb5('0xc9')]['clearDamagePopup']=function(){const _0x3c5a5e=_0x467fb5;VisuMZ[_0x3c5a5e('0x15b')][_0x3c5a5e('0x48a')][_0x3c5a5e('0x709')](this),this[_0x3c5a5e('0x4a8')]=[];},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x8b1')]=function(){const _0x259818=_0x467fb5;if(!this['_damagePopupArray'])this[_0x259818('0xdb')]();return this['_damagePopupArray']['length']>0x0;},Game_Battler['prototype']['startDamagePopup']=function(){const _0x540bb0=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!this[_0x540bb0('0x4a8')])this[_0x540bb0('0xdb')]();this[_0x540bb0('0x26c')]();const _0x3b24a2=this[_0x540bb0('0x67b')]();if(_0x3b24a2)_0x3b24a2[_0x540bb0('0x9d')]();},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x26c')]=function(){const _0x4d5557=_0x467fb5,_0xa71a11=this[_0x4d5557('0x3b0')]();if(_0xa71a11['missed']||_0xa71a11[_0x4d5557('0x9b')]){const _0x2ba264=JsonEx[_0x4d5557('0x7d9')](_0xa71a11);_0x2ba264[_0x4d5557('0x16f')]=![],_0x2ba264['mpDamage']=0x0,this['_damagePopupArray'][_0x4d5557('0x26f')](_0x2ba264);}if(_0xa71a11['hpAffected']){if('WNZco'!==_0x4d5557('0x142')){const _0x400008=JsonEx['makeDeepCopy'](_0xa71a11);_0x400008['missed']=![],_0x400008[_0x4d5557('0x9b')]=![],_0x400008[_0x4d5557('0x242')]=0x0,this[_0x4d5557('0x4a8')]['push'](_0x400008);}else{function _0x4612d0(){const _0x4a550c=_0x4d5557,_0x101f4f=_0x527bd8['item']();this[_0x4a550c('0x26f')]('showAnimation',_0x1ed897,[_0x9c4f9d],_0x101f4f['animationId']);}}}if(_0xa71a11['mpDamage']!==0x0){if(_0x4d5557('0x566')==='CHAuC'){function _0x31ee59(){const _0x372278=_0x4d5557;this['_mainSprite'][_0x372278('0x874')](0x0,0x0,this[_0x372278('0x3ad')][_0x372278('0x6c2')],this[_0x372278('0x8a1')]);}}else{const _0x1029b5=JsonEx['makeDeepCopy'](_0xa71a11);_0x1029b5[_0x4d5557('0x61f')]=![],_0x1029b5[_0x4d5557('0x9b')]=![],_0x1029b5[_0x4d5557('0x16f')]=![],this['_damagePopupArray']['push'](_0x1029b5);}}},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x428')]=function(){const _0x55a35c=_0x467fb5;if(!this['_damagePopupArray'])this[_0x55a35c('0xdb')]();return VisuMZ[_0x55a35c('0x15b')][_0x55a35c('0x110')][_0x55a35c('0x82c')][_0x55a35c('0x5ee')]?this[_0x55a35c('0x4a8')][_0x55a35c('0x66e')]():this['_damagePopupArray'][_0x55a35c('0x227')]();},Game_Battler['prototype']['setupTextPopup']=function(_0x206f1d,_0x1ab783){const _0x52d90b=_0x467fb5;if(!SceneManager[_0x52d90b('0x21')]())return;if(!this['battler']())return;if(_0x206f1d[_0x52d90b('0x828')]<=0x0)return;_0x1ab783=_0x1ab783||{},_0x1ab783[_0x52d90b('0x567')]=_0x1ab783[_0x52d90b('0x567')]||_0x52d90b('0x579'),_0x1ab783[_0x52d90b('0x518')]=_0x1ab783[_0x52d90b('0x518')]||[0x0,0x0,0x0,0x0],_0x1ab783[_0x52d90b('0x7af')]=_0x1ab783[_0x52d90b('0x7af')]||0x0,this[_0x52d90b('0x67b')]()[_0x52d90b('0x835')](_0x206f1d,_0x1ab783);},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x68a')]=function(_0x2ab13e,_0x3892bb,_0x999fe9){const _0x3deedb=_0x467fb5;if(!SceneManager['isSceneBattle']())return;if(!this[_0x3deedb('0x67b')]())return;if(_0x3892bb[_0x3deedb('0x828')]<=0x0)return;_0x999fe9=_0x999fe9||{},_0x999fe9[_0x3deedb('0x567')]=_0x999fe9[_0x3deedb('0x567')]||_0x3deedb('0x579'),_0x999fe9['flashColor']=_0x999fe9[_0x3deedb('0x518')]||[0x0,0x0,0x0,0x0],_0x999fe9[_0x3deedb('0x7af')]=_0x999fe9[_0x3deedb('0x7af')]||0x0,this[_0x3deedb('0x67b')]()[_0x3deedb('0x68a')](_0x2ab13e,_0x3892bb,_0x999fe9);},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x2b7')]=function(){const _0x3a0805=_0x467fb5;if(this[_0x3a0805('0x8c2')]())return![];if(this[_0x3a0805('0x70c')]()&&this[_0x3a0805('0x45f')]())return!![];if(this['isEnemy']()&&this['hasSvBattler']()){if(_0x3a0805('0x683')!=='LStot'){function _0x556992(){const _0x1e538=_0x3a0805,_0x37d99b=this[_0x1e538('0x581')](),_0x302ec5=_0x3cf77b[_0x1e538('0x15b')][_0x1e538('0x110')]['ActorCmd'][_0x1e538('0xcf')],_0x36dc6a=_0x37d99b==='text'?_0x6b655['item']:_0x1e538('0x1f')['format'](_0x302ec5,_0x21e22d['item']),_0x2c0233=this[_0x1e538('0x4f5')]();this[_0x1e538('0x636')](_0x36dc6a,_0x1e538('0x19a'),_0x2c0233);}}else{if(this[_0x3a0805('0xb2')]()&&this[_0x3a0805('0xfe')]())return![];}}else{if(this[_0x3a0805('0xb2')]())return![];}return!![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0xe5')]=Game_Battler[_0x467fb5('0xc9')]['clearMotion'],Game_Battler['prototype'][_0x467fb5('0x70d')]=function(){const _0x53a81e=_0x467fb5;VisuMZ[_0x53a81e('0x15b')][_0x53a81e('0xe5')][_0x53a81e('0x709')](this),this['clearFreezeMotion']();},Game_Battler['prototype'][_0x467fb5('0x129')]=function(){return!![];},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x3ec')]=function(){return![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x561')]=Game_Battler['prototype'][_0x467fb5('0x149')],Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x149')]=function(_0x885c8d){const _0x228830=_0x467fb5;VisuMZ['BattleCore'][_0x228830('0x561')]['call'](this,_0x885c8d),this['onBattleStartBattleCore'](_0x885c8d);},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x290')]=function(_0x1051a4){const _0x4270d7=_0x467fb5;this[_0x4270d7('0x86')](![]);},VisuMZ[_0x467fb5('0x15b')]['Game_Battler_performActionStart']=Game_Battler[_0x467fb5('0xc9')]['performActionStart'],Game_Battler['prototype']['performActionStart']=function(_0x5014ed){const _0x491cb9=_0x467fb5;VisuMZ[_0x491cb9('0x15b')]['Game_Battler_performActionStart'][_0x491cb9('0x709')](this,_0x5014ed);if(!_0x5014ed[_0x491cb9('0x351')]()){const _0x63706b=this[_0x491cb9('0x67b')]();if(_0x63706b)_0x63706b[_0x491cb9('0x797')]();}this[_0x491cb9('0x86')](![]);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x577')]=Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x57c')],Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x57c')]=function(){const _0xbd6574=_0x467fb5;VisuMZ[_0xbd6574('0x15b')][_0xbd6574('0x577')][_0xbd6574('0x709')](this),this['_flinched']=![];const _0x14ba34=this['battler']();if(_0x14ba34)_0x14ba34['stepBack']();this['setBattlerFlip'](![]),this[_0xbd6574('0x28b')]();},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x144')]=function(_0x12ff7c){const _0x8f62bf=_0x467fb5;if(_0x12ff7c['isAttack']())this[_0x8f62bf('0x55b')]();else{if(_0x12ff7c[_0x8f62bf('0x351')]())this[_0x8f62bf('0x738')](_0x8f62bf('0x560'));else{if(_0x12ff7c[_0x8f62bf('0x888')]())this[_0x8f62bf('0x738')](_0x8f62bf('0x8c0'));else{if(_0x12ff7c['isSkill']()){if(_0x12ff7c[_0x8f62bf('0x19a')]()[_0x8f62bf('0x554')][_0x8f62bf('0xff')]>0x0){if(_0x8f62bf('0x40d')===_0x8f62bf('0x40d'))this[_0x8f62bf('0x55b')]();else{function _0x3b29b5(){const _0xcb6c5e=_0x8f62bf,_0x50792e=_0x397747[_0xcb6c5e('0x15b')][_0xcb6c5e('0x110')][_0xcb6c5e('0x5e')],_0x4d30c6=_0x4764db[_0xcb6c5e('0xc9')]['extraHeight'](),_0x25d875=_0x155c65[_0xcb6c5e('0x314')]-(_0x50792e[_0xcb6c5e('0x788')]||0xc0),_0x3cc1a4=this['windowAreaHeight']()+_0x4d30c6,_0x4b636d=this[_0xcb6c5e('0x5c3')]()?0x0:_0x3813bd['boxWidth']-_0x25d875,_0x1518ea=_0x30b8a0[_0xcb6c5e('0x678')]-_0x3cc1a4+_0x4d30c6;return new _0x513dea(_0x4b636d,_0x1518ea,_0x25d875,_0x3cc1a4);}}}else this[_0x8f62bf('0x738')](_0x8f62bf('0x590'));}else _0x12ff7c['isItem']()&&this[_0x8f62bf('0x738')]('item');}}}},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x18e')]=function(){const _0x26d889=_0x467fb5;return $dataSystem[_0x26d889('0x7f1')][0x0];},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x5d7')]=function(){const _0x363be9=_0x467fb5,_0x4627a8=this[_0x363be9('0x18e')]();return _0x4627a8?_0x4627a8[_0x363be9('0x729')]:0x0;},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x347')]=function(_0x40d340){const _0x564f4f=_0x467fb5;if(!$gameSystem[_0x564f4f('0xe1')]())return;const _0x195f7c=this[_0x564f4f('0x67b')](),_0x1c14c2=_0x40d340[_0x564f4f('0x67b')]();if(!_0x195f7c||!_0x1c14c2)return;const _0x436d02=_0x1c14c2['_baseX'],_0xd6a7f2=_0x1c14c2[_0x564f4f('0x345')];this[_0x564f4f('0x20a')](_0x436d02,_0xd6a7f2,0x0,![],_0x564f4f('0x2f7'),-0x1),_0x195f7c[_0x564f4f('0x6fc')]();const _0x5b917b=VisuMZ[_0x564f4f('0x15b')][_0x564f4f('0x110')][_0x564f4f('0x65d')];let _0x5a44aa=(_0x1c14c2[_0x564f4f('0x6c2')]+_0x195f7c['width'])/0x2;_0x5a44aa*=this[_0x564f4f('0x317')]()?0x1:-0x1;let _0xe77e2c=_0x5b917b[_0x564f4f('0x60d')]*(this[_0x564f4f('0x317')]()?0x1:-0x1);_0x40d340[_0x564f4f('0x704')](_0x5a44aa,_0xe77e2c,0x0,![],_0x564f4f('0x2f7')),_0x1c14c2[_0x564f4f('0x6fc')]();},Game_Battler[_0x467fb5('0xc9')]['requestMotion']=function(_0x369c59){const _0x59b778=_0x467fb5;if(SceneManager['isSceneBattle']()){if(_0x59b778('0x2e9')!==_0x59b778('0x2e9')){function _0x28a5e4(){const _0x544681=_0x59b778;_0x4a6ec8=_0x5062d2[_0x544681('0x15b')]['JS'][_0x4a32d1][_0x544681('0x709')](this,this['subject'](),_0x36fdb5,_0x4c58a5,_0x15db9b);if(_0x3a0a91)_0xbdc92b=_0x292de2;}}else{const _0x36bc51=this[_0x59b778('0x67b')]();_0x36bc51&&(_0x36bc51[_0x59b778('0x684')](_0x369c59),[_0x59b778('0x70e'),_0x59b778('0x6cf'),'missile'][_0x59b778('0x790')](_0x369c59)&&this[_0x59b778('0x8da')]());}}this[_0x59b778('0x339')]();},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x8da')]=function(){},Game_Battler[_0x467fb5('0xc9')]['startWeaponAnimation']=function(_0x5d1391){const _0x5c3127=_0x467fb5;if(SceneManager[_0x5c3127('0x21')]()){const _0x5e4521=this[_0x5c3127('0x67b')]();if(_0x5e4521)_0x5e4521[_0x5c3127('0xea')](_0x5d1391);}},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x72d')]=function(){const _0xbff3de=_0x467fb5;if(SceneManager['isSceneBattle']()){if(_0xbff3de('0x2d2')===_0xbff3de('0x216')){function _0x168d77(){const _0x30770b=_0xbff3de;_0x4fe22b[_0x30770b('0x15b')][_0x30770b('0x306')][_0x30770b('0x709')](this),this[_0x30770b('0xe3')]();}}else{const _0x3f1efe=this[_0xbff3de('0x5d7')]();this[_0xbff3de('0x778')](_0x3f1efe);}}},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x760')]=function(_0x4edd28,_0x1594f3){const _0x3609ad=_0x467fb5;if(!_0x4edd28)return;if(!_0x4edd28[_0x3609ad('0x19a')]())return;if(_0x4edd28['isAttack']())return;if(_0x4edd28[_0x3609ad('0x351')]())return;if(_0x4edd28['isItem']())return;let _0x133881=0x0;const _0xc087af=VisuMZ['BattleCore'][_0x3609ad('0x110')][_0x3609ad('0x65d')],_0x46d778=_0x4edd28['item']()[_0x3609ad('0x50e')];if(_0x46d778[_0x3609ad('0x5e2')](/<CAST ANIMATION: (\d+)>/i)){if(_0x3609ad('0x38')===_0x3609ad('0x38'))_0x133881=Number(RegExp['$1']);else{function _0x1ad433(){const _0xb7889a=_0x3609ad,_0x4298f3=_0x30f7ca['getDamageStyle'](this['_item']),_0x38c969=_0x4fc4e8['DamageStyles'][_0x4298f3];if(!_0x38c969)return this[_0xb7889a('0x763')]();return _0x38c969[_0xb7889a('0x4f8')][_0xb7889a('0x709')](this);}}}else{if(_0x46d778[_0x3609ad('0x5e2')](/<NO CAST ANIMATION>/i)){if(_0x3609ad('0x63a')!==_0x3609ad('0x63a')){function _0x54189c(){const _0x2893f5=_0x3609ad;_0x3af4fb[_0x2893f5('0x2f5')](_0x6b34e9);}}else return;}else{if(_0x4edd28['isCertainHit']())_0x133881=_0xc087af['CastCertain'];else{if(_0x4edd28[_0x3609ad('0x542')]())_0x133881=_0xc087af[_0x3609ad('0x84a')];else _0x4edd28[_0x3609ad('0x888')]()&&(_0x133881=_0xc087af[_0x3609ad('0x600')]);}}}_0x133881>0x0&&$gameTemp[_0x3609ad('0x670')]([this],_0x133881,!!_0x1594f3);},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x2ab')]=function(){const _0xd8af61=_0x467fb5;SoundManager[_0xd8af61('0x6cd')]();let _0x287c1d=VisuMZ[_0xd8af61('0x15b')][_0xd8af61('0x110')][_0xd8af61('0x65d')]['ReflectAnimation'];_0x287c1d>0x0&&$gameTemp[_0xd8af61('0x670')]([this],_0x287c1d);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3d1')]=Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x44e')],Game_Battler['prototype']['performDamage']=function(){const _0x43fd76=_0x467fb5;VisuMZ[_0x43fd76('0x15b')]['Game_Battler_performDamage']['call'](this),this['performFlinch']();},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x585')]=function(){const _0x24c384=_0x467fb5;if(!$gameSystem[_0x24c384('0xe1')]())return;if(this[_0x24c384('0x2bf')])return;this[_0x24c384('0x2bf')]=!![];const _0x1b2574=this[_0x24c384('0x67b')]();if(_0x1b2574)_0x1b2574[_0x24c384('0x38e')]();},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x28b')]=function(){const _0x2c0c9b=_0x467fb5;if(this[_0x2c0c9b('0xb2')]()&&this['_motionType']!=='dead'){if(_0x2c0c9b('0x49e')!==_0x2c0c9b('0x79')){this[_0x2c0c9b('0x738')]('dead');return;}else{function _0x2b016e(){const _0x2a9ff5=_0x2c0c9b;return this[_0x2a9ff5('0x4e9')]>0x0;}}}if(this[_0x2c0c9b('0xb2')]()&&this[_0x2c0c9b('0x5cd')]==='dead')return;if(!!this[_0x2c0c9b('0x220')])return;if(this[_0x2c0c9b('0x8c6')]()){if('KndIb'===_0x2c0c9b('0x355')){this[_0x2c0c9b('0x67b')]()[_0x2c0c9b('0x1d2')](),this[_0x2c0c9b('0x339')]();return;}else{function _0x56afc2(){const _0x19f55f=_0x2c0c9b,_0x39631b=_0x443d40[_0x19f55f('0x18e')]()[_0x19f55f('0xff')]<0x2,_0x13b69c=0x14,_0x468e1b=0x30;_0x39631b&&(this[_0x19f55f('0x26f')]('performJump',[_0x2f0a49],_0x468e1b,_0x13b69c),this['push'](_0x19f55f('0x7d8'),_0x1c29a7,_0x5680b1,_0x19f55f('0x79d'),_0x13b69c,!![],'Linear',!![]),this['push'](_0x19f55f('0x738'),[_0x12a349],_0x19f55f('0x898')),this[_0x19f55f('0x26f')](_0x19f55f('0x284')));this['wholeActionSet'](_0x1eff90,_0x3e6acb,_0x487b53);if(_0x39631b){const _0x5b00b4=_0xcefe69[_0x19f55f('0x67b')]();this[_0x19f55f('0x26f')]('performJump',[_0x56c90d],_0x468e1b,_0x13b69c),this[_0x19f55f('0x26f')]('performMoveToPoint',_0x3998f7,_0x5b00b4[_0x19f55f('0x1a')],_0x5b00b4[_0x19f55f('0x1b7')],_0x13b69c,![],'Linear'),this['push'](_0x19f55f('0x738'),[_0x2bb60e],_0x19f55f('0x524')),this['push'](_0x19f55f('0x284')),this[_0x19f55f('0x26f')](_0x19f55f('0x738'),[_0x49c6c8],_0x19f55f('0x898'));}}}}if(this['_motionType']===_0x2c0c9b('0x4d'))return;if(this[_0x2c0c9b('0x5cd')]==='escape'&&!BattleManager[_0x2c0c9b('0x8b')]())return;if(this['_motionType']==='guard'&&!BattleManager[_0x2c0c9b('0x8b')]())return;this[_0x2c0c9b('0x70d')]();if(this['battler']()&&BattleManager[_0x2c0c9b('0x8b')]()){if('AStMI'===_0x2c0c9b('0x2a7')){this[_0x2c0c9b('0x67b')]()[_0x2c0c9b('0x1d2')](),this[_0x2c0c9b('0x339')]();return;}else{function _0x2563ab(){const _0x473237=_0x2c0c9b;if(this[_0x473237('0x11c')]())this['_svBattlerSprite'][_0x473237('0x1d2')]();}}}},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x716')]=function(){const _0xac135e=_0x467fb5;return this[_0xac135e('0xb7')];},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x86')]=function(_0x421a57){const _0x3a8bfd=_0x467fb5;if(!$gameSystem[_0x3a8bfd('0xe1')]())return;this['_isBattlerFlipped']=_0x421a57;const _0x26d857=this[_0x3a8bfd('0x67b')]();if(_0x26d857)_0x26d857[_0x3a8bfd('0x396')]();},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x5a3')]=function(_0x5f1f81,_0x4844fa,_0x105581){const _0x2b0b4d=_0x467fb5;if(!$gameSystem['isSideView']())return;const _0x322f68=this[_0x2b0b4d('0x67b')]();if(!_0x322f68)return;if(_0x5f1f81===_0x322f68[_0x2b0b4d('0x5f6')])return;let _0x238cbd=![];if(this[_0x2b0b4d('0x317')]()){if(_0x2b0b4d('0x3fd')===_0x2b0b4d('0x3fd')){if(_0x5f1f81>_0x322f68[_0x2b0b4d('0x5f6')])_0x238cbd=!![];if(_0x5f1f81<_0x322f68['_baseX'])_0x238cbd=![];}else{function _0x32c29e(){const _0x552fa6=_0x2b0b4d,_0xfe45ea=this['_distortionSprite'];_0xfe45ea&&(_0xfe45ea[_0x552fa6('0x3e7')]['x']=this[_0x552fa6('0x748')](),_0xfe45ea[_0x552fa6('0x3e7')]['y']=this[_0x552fa6('0x689')]());}}}else{if(this[_0x2b0b4d('0x8c6')]()){if(_0x2b0b4d('0x3e2')!=='AMmRN'){function _0x4d9369(){const _0x644999=_0x2b0b4d;return _0x57f99e['_scene'][_0x644999('0x435')]()===_0x644999('0x5bc')?_0x4fa883[_0x644999('0x15b')]['Settings'][_0x644999('0x5e')]['SkillItemBorderCols']:_0x920d76['BattleCore'][_0x644999('0x110')][_0x644999('0x5e')]['SkillItemStandardCols'];}}else{if(_0x5f1f81>_0x322f68[_0x2b0b4d('0x5f6')])_0x238cbd=![];if(_0x5f1f81<_0x322f68[_0x2b0b4d('0x5f6')])_0x238cbd=!![];}}};this[_0x2b0b4d('0x86')](_0x105581?!_0x238cbd:_0x238cbd),_0x322f68[_0x2b0b4d('0x396')]();},Game_Battler['prototype'][_0x467fb5('0x704')]=function(_0x1898f4,_0x461358,_0x38045b,_0x41b043,_0x3a3259){const _0x3d7a2a=_0x467fb5;if(!$gameSystem[_0x3d7a2a('0xe1')]())return;const _0x2a00a8=this[_0x3d7a2a('0x67b')]();if(!_0x2a00a8)return;if(_0x41b043)this['setBattlerFacePoint'](_0x1898f4+_0x2a00a8['_baseX'],_0x461358+_0x2a00a8[_0x3d7a2a('0x345')],![]);_0x1898f4+=_0x2a00a8[_0x3d7a2a('0x5f6')]-_0x2a00a8[_0x3d7a2a('0x1a')],_0x461358+=_0x2a00a8['_baseY']-_0x2a00a8['_homeY'],_0x2a00a8['startMove'](_0x1898f4,_0x461358,_0x38045b);if(Imported[_0x3d7a2a('0x3e')])_0x2a00a8[_0x3d7a2a('0x4b8')](_0x3a3259||_0x3d7a2a('0x2f7'));},Game_Battler['prototype'][_0x467fb5('0x20a')]=function(_0x45e8f3,_0x1489b0,_0x10e1b2,_0x3cf7ab,_0x4b1a3d,_0x1cc3c0){const _0x1d8005=_0x467fb5;if(!$gameSystem[_0x1d8005('0xe1')]())return;const _0xca3abe=this['battler']();if(!_0xca3abe)return;if(_0x1cc3c0>=0x0){if(_0x1d8005('0x8ca')===_0x1d8005('0x8ca')){if(_0xca3abe[_0x1d8005('0x5f6')]>_0x45e8f3)_0x45e8f3+=_0xca3abe[_0x1d8005('0x6c2')]/0x2+_0x1cc3c0;if(_0xca3abe[_0x1d8005('0x5f6')]<_0x45e8f3)_0x45e8f3-=_0xca3abe['width']/0x2+_0x1cc3c0;}else{function _0x18ad3d(){const _0x2958af=_0x1d8005,_0x95d598=_0xc08031['result'](),_0x386caa=_0x95d598[_0x2958af('0x39e')]();for(const _0x599758 of _0x386caa){const _0x54ef0d=_0x530464[_0x2958af('0x317')]()?_0x599758[_0x2958af('0x3fb')]:_0x599758[_0x2958af('0x26')];_0x54ef0d&&_0x34dc4b[_0x2958af('0x15b')][_0x2958af('0x110')][_0x2958af('0x20')][_0x2958af('0xa8')]&&(this[_0x2958af('0x26f')](_0x2958af('0x4c')),this[_0x2958af('0x26f')](_0x2958af('0x420')),this['push'](_0x2958af('0x7bb'),_0x54ef0d['format'](_0x52d5d1[_0x2958af('0x22a')]())),this['push'](_0x2958af('0x246'))),_0x599758['id']===_0x1e1d2a['deathStateId']()&&this[_0x2958af('0x26f')]('performCollapse',_0x1c597c);}}}}if(_0x3cf7ab)this[_0x1d8005('0x5a3')](_0x45e8f3,_0x1489b0,![]);_0x45e8f3-=_0xca3abe['_homeX'],_0x1489b0-=_0xca3abe['_homeY'],_0xca3abe['startMove'](_0x45e8f3,_0x1489b0,_0x10e1b2);if(Imported['VisuMZ_0_CoreEngine'])_0xca3abe['setMoveEasingType'](_0x4b1a3d||'Linear');},Game_Battler['prototype'][_0x467fb5('0x462')]=function(_0xb1cb9f,_0x3a1068,_0x4bbc0b){const _0xf9a5e2=_0x467fb5;if(!$gameSystem[_0xf9a5e2('0xe1')]())return;const _0x20a1ae=this[_0xf9a5e2('0x67b')]();if(!_0x20a1ae)return;_0x20a1ae[_0xf9a5e2('0x4df')](_0xb1cb9f,_0x3a1068,_0x4bbc0b);},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x811')]=function(_0x3915af,_0x4bc23a){const _0x29f10f=_0x467fb5;if(!$gameSystem[_0x29f10f('0xe1')]())return;const _0x47d872=this[_0x29f10f('0x67b')]();if(!_0x47d872)return;_0x47d872['startJump'](_0x3915af,_0x4bc23a);},Game_Battler['prototype']['spinBattler']=function(_0x50b9ee,_0x310059,_0x11bbe6,_0x46732a){const _0x5206b7=_0x467fb5;if(!$gameSystem[_0x5206b7('0xe1')]())return;const _0x60487c=this[_0x5206b7('0x67b')]();if(!_0x60487c)return;_0x60487c[_0x5206b7('0x76e')](_0x50b9ee,_0x310059,_0x11bbe6,_0x46732a);},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x7b')]=function(_0x36d34d,_0x410d1b,_0x365c6d,_0x339212){const _0x3405fe=_0x467fb5;if(!$gameSystem[_0x3405fe('0xe1')]())return;const _0x104ff8=this[_0x3405fe('0x67b')]();if(!_0x104ff8)return;this[_0x3405fe('0x317')]()&&(_0x36d34d*=-0x1,_0x410d1b*=-0x1),_0x104ff8[_0x3405fe('0x587')](_0x36d34d,_0x410d1b,_0x365c6d,_0x339212);},Game_Battler['prototype'][_0x467fb5('0x43d')]=function(_0x14c51b,_0x2e428b,_0x442333,_0x6b60df){const _0x384f3e=_0x467fb5;if(!$gameSystem['isSideView']())return;const _0x2db942=this[_0x384f3e('0x67b')]();if(!_0x2db942)return;_0x2db942[_0x384f3e('0x637')](_0x14c51b,_0x2e428b,_0x442333,_0x6b60df);},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x247')]=function(_0x5b6815,_0x47aa9a,_0x61a2c6){const _0x5466f3=_0x467fb5;if(!$gameSystem['isSideView']())return;const _0x12c9b3=this[_0x5466f3('0x67b')]();if(!_0x12c9b3)return;_0x12c9b3[_0x5466f3('0x467')](_0x5b6815,_0x47aa9a,_0x61a2c6);},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x339')]=function(){const _0x5bca73=_0x467fb5,_0x513a62=!!this[_0x5bca73('0x220')];this[_0x5bca73('0x220')]=undefined;if(_0x513a62){if(_0x5bca73('0x176')===_0x5bca73('0x176'))this['requestMotionRefresh'](),this[_0x5bca73('0x509')]();else{function _0x3065ea(){const _0xd4892a=_0x5bca73;this[_0xd4892a('0x433')]['x']=this[_0xd4892a('0x6c2')],this[_0xd4892a('0x7b7')]=this['width']*0x3/0x4;}}}},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x509')]=function(){const _0x786bd2=_0x467fb5;if(!SceneManager[_0x786bd2('0x21')]())return;const _0x367043=this['battler']();if(!_0x367043)return;let _0xf0b6e3=this[_0x786bd2('0x317')]()?_0x367043['_weaponSprite']:_0x367043[_0x786bd2('0x48e')]['_weaponSprite'];_0xf0b6e3&&_0xf0b6e3[_0x786bd2('0x6c6')](0x0);},Game_Battler[_0x467fb5('0xc9')]['freezeMotion']=function(_0x445803,_0x2ccac7,_0x573d31){const _0x4d8b66=_0x467fb5;if(this['isEnemy']()&&!this['hasSvBattler']())return;let _0xaac096=0x0;if(this[_0x4d8b66('0x317')]()){const _0x33ca10=this[_0x4d8b66('0x1fe')]();_0xaac096=_0x33ca10[0x0]?_0x33ca10[0x0][_0x4d8b66('0x2c7')]:0x0;}else{if(this[_0x4d8b66('0x8c6')]()){if('HVuAq'===_0x4d8b66('0x25d'))_0xaac096=this[_0x4d8b66('0x98')]()[_0x4d8b66('0x2c7')]||0x0;else{function _0x4b11f8(){const _0x3f8bf1=_0x4d8b66,_0x29c70a=_0xcd78dc[_0x3f8bf1('0xc9')][_0x3f8bf1('0x604')](),_0x75f2d8=_0xae247c[_0x3f8bf1('0x314')],_0x2839bc=this['windowAreaHeight']()+_0x29c70a,_0x1c759b=0x0,_0x16c2cb=_0x25380e[_0x3f8bf1('0x678')]-_0x2839bc+_0x29c70a;return new _0x5be89f(_0x1c759b,_0x16c2cb,_0x75f2d8,_0x2839bc);}}}}const _0x1e5cff=$dataSystem[_0x4d8b66('0x7f1')][_0xaac096];if(_0x445803==='attack'){if(_0x4d8b66('0x3f')===_0x4d8b66('0x3f'))_0x445803=['thrust',_0x4d8b66('0x70e'),_0x4d8b66('0x141')][_0x1e5cff[_0x4d8b66('0xff')]]||_0x4d8b66('0x70e');else{function _0x3d8bc0(){const _0x4d6723=_0x4d8b66;_0x5aff94(_0x4d6723('0x1e4')[_0x4d6723('0x11')](_0x5cc906,_0x5761be)),_0x461f02[_0x4d6723('0x4c5')]();}}}this[_0x4d8b66('0x220')]={'motionType':_0x445803,'weaponImageId':_0x2ccac7?_0x1e5cff[_0x4d8b66('0x729')]:0x0,'pattern':_0x573d31};},Game_Battler[_0x467fb5('0xc9')][_0x467fb5('0x60a')]=function(_0x577e0d){const _0x41d48e=_0x467fb5;if(!_0x577e0d)return![];return _0x577e0d[_0x41d48e('0x4b6')]()===this['friendsUnit']();},Game_Battler['prototype'][_0x467fb5('0x436')]=function(_0x429122){const _0x3e4d37=_0x467fb5;if(!_0x429122)return![];return _0x429122[_0x3e4d37('0x5be')]()===this[_0x3e4d37('0x4b6')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x28')]=Game_Actor['prototype'][_0x467fb5('0x6c6')],Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x6c6')]=function(_0x36ac33){const _0x2749ca=_0x467fb5;VisuMZ['BattleCore'][_0x2749ca('0x28')][_0x2749ca('0x709')](this,_0x36ac33),this[_0x2749ca('0x49')]();},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x49')]=function(){const _0x425212=_0x467fb5;this[_0x425212('0x3fe')]='';if(this['actor']()&&this[_0x425212('0x23')]()['note'][_0x425212('0x5e2')](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x425212('0x814')!==_0x425212('0x346'))this['_battlePortrait']=String(RegExp['$1']);else{function _0x29ba3c(){_0xc672b6=(_0x302f0a+_0x28c0c6)/0x2,_0x17689e=-0x1;}}}},Game_Actor['prototype'][_0x467fb5('0x800')]=function(){const _0xc21492=_0x467fb5;if(this[_0xc21492('0xed')]()!=='')return this[_0xc21492('0xed')]();else{if(Imported[_0xc21492('0x5ba')]&&this[_0xc21492('0x419')]()!=='')return this[_0xc21492('0x419')]();}return'';},Game_Actor['prototype']['getBattlePortrait']=function(){const _0x176272=_0x467fb5;if(this[_0x176272('0x3fe')]===undefined)this['initBattlePortrait']();return this[_0x176272('0x3fe')];},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x3e8')]=function(_0x25e868){const _0x366fc4=_0x467fb5;if(this[_0x366fc4('0x3fe')]===undefined)this[_0x366fc4('0x49')]();this[_0x366fc4('0x3fe')]=_0x25e868;if(SceneManager[_0x366fc4('0x21')]()&&$gameParty[_0x366fc4('0x41a')]()[_0x366fc4('0x790')](this)){const _0x25bcca=SceneManager[_0x366fc4('0x26e')][_0x366fc4('0x841')];if(_0x25bcca)_0x25bcca['refreshActorPortrait'](this);}},Game_Actor['prototype']['isSpriteVisible']=function(){return!![];},Game_Actor['prototype'][_0x467fb5('0x182')]=function(){const _0x52060d=_0x467fb5;if(!this['isConfused']()&&BattleManager['_autoBattle'])return!![];return Game_Battler[_0x52060d('0xc9')][_0x52060d('0x182')][_0x52060d('0x709')](this);},VisuMZ[_0x467fb5('0x15b')]['Game_Actor_makeActionList']=Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x64e')],Game_Actor['prototype']['makeActionList']=function(){const _0x5a1de9=_0x467fb5;if(BattleManager[_0x5a1de9('0x6d3')]&&!ConfigManager[_0x5a1de9('0x163')]){if(_0x5a1de9('0x76b')===_0x5a1de9('0x76b'))return this[_0x5a1de9('0x4f7')]();else{function _0x97558f(){const _0x188ce9=_0x5a1de9;if(this[_0x188ce9('0xb2')]())return;this['_immortal']=!![];}}}else{if(_0x5a1de9('0x47d')==='vhZML'){function _0xeef27a(){const _0x54a51b=_0x5a1de9;this['_motion']=_0x4156db[_0x54a51b('0x8a')]['dead'];return;}}else{return VisuMZ[_0x5a1de9('0x15b')][_0x5a1de9('0x4cf')][_0x5a1de9('0x709')](this);;}}},Game_Actor['prototype']['makeActionListAutoAttack']=function(){const _0x4561d4=_0x467fb5,_0x40c12c=[],_0x3784b7=new Game_Action(this);return _0x3784b7[_0x4561d4('0x9f')](),_0x40c12c['push'](_0x3784b7),_0x40c12c;},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x575')]=function(){const _0x9339b4=_0x467fb5;if(this[_0x9339b4('0x8ec')]()[_0x9339b4('0x50e')][_0x9339b4('0x5e2')](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)){if(_0x9339b4('0x468')==='ujERj'){function _0x2a8f8c(){const _0x3b6159=_0x9339b4;return _0x4e3d22['BattleCore'][_0x3b6159('0x69')]['call'](this,_0x5de734);}}else return String(RegExp['$1'])[_0x9339b4('0x7e0')](/[\r\n]+/);}else{if(_0x9339b4('0x190')==='PRytJ')return VisuMZ[_0x9339b4('0x15b')][_0x9339b4('0x110')][_0x9339b4('0x2d6')][_0x9339b4('0x802')];else{function _0x5806eb(){const _0x1937dc=_0x9339b4;let _0x3c86d7=this[_0x1937dc('0x7c7')]();return _0x39bc26[_0x1937dc('0x439')](-_0x3c86d7,_0x3c86d7);}}}},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x232')]=function(){const _0x5b7c68=_0x467fb5;if(this[_0x5b7c68('0x825')][_0x5b7c68('0x168')]!==undefined)return this[_0x5b7c68('0x825')][_0x5b7c68('0x168')];return this[_0x5b7c68('0x23')]()[_0x5b7c68('0x50e')][_0x5b7c68('0x5e2')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x5b7c68('0x825')][_0x5b7c68('0x168')]=eval(RegExp['$1']),this[_0x5b7c68('0x825')][_0x5b7c68('0x6c7')]=eval(RegExp['$2'])):this['_cache'][_0x5b7c68('0x168')]=Game_Battler[_0x5b7c68('0xc9')][_0x5b7c68('0x232')]['call'](this),this[_0x5b7c68('0x825')][_0x5b7c68('0x168')];},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x586')]=function(){const _0x26fa64=_0x467fb5;if(this[_0x26fa64('0x825')]['svAnchorY']!==undefined)return this[_0x26fa64('0x825')]['svAnchorY'];if(this[_0x26fa64('0x23')]()[_0x26fa64('0x50e')][_0x26fa64('0x5e2')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)){if(_0x26fa64('0x7cd')===_0x26fa64('0x58f')){function _0x2e2e33(){const _0x587500=_0x26fa64;if(_0x14197a['_battleCoreBattleStartEvent'])return![];return _0x3770a8[_0x587500('0x15b')][_0x587500('0x1ce')]['call'](this);}}else this[_0x26fa64('0x825')][_0x26fa64('0x168')]=eval(RegExp['$1']),this['_cache'][_0x26fa64('0x6c7')]=eval(RegExp['$2']);}else this[_0x26fa64('0x825')][_0x26fa64('0x6c7')]=Game_Battler[_0x26fa64('0xc9')][_0x26fa64('0x586')][_0x26fa64('0x709')](this);return this[_0x26fa64('0x825')][_0x26fa64('0x6c7')];},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x69b')]=function(){const _0x21032b=_0x467fb5;if(this[_0x21032b('0x825')]['svShadow']!==undefined)return this[_0x21032b('0x825')]['svShadow'];if(this[_0x21032b('0x23')]()[_0x21032b('0x50e')]['match'](/<SIDEVIEW SHOW SHADOW>/i))this[_0x21032b('0x825')][_0x21032b('0x183')]=!![];else{if(this[_0x21032b('0x23')]()[_0x21032b('0x50e')][_0x21032b('0x5e2')](/<SIDEVIEW HIDE SHADOW>/i)){if(_0x21032b('0x617')!==_0x21032b('0x4da'))this[_0x21032b('0x825')][_0x21032b('0x183')]=![];else{function _0x4b2a7e(){const _0x26166f=_0x21032b;if(!_0x36069a)return 0x0;let _0x2bad74=0x0;const _0x556d27=_0x536619['note'];return _0x556d27[_0x26166f('0x5e2')](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x2bad74+=_0x5e1aa6(_0xafdce7['$1'])),_0x556d27['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2bad74+=_0x4cdbf5(_0x27e56d['$2'])),_0x2bad74;}}}else this[_0x21032b('0x825')][_0x21032b('0x183')]=Game_Battler[_0x21032b('0xc9')]['svBattlerShadowVisible'][_0x21032b('0x709')](this);}return this['_cache']['svShadow'];},Game_Actor[_0x467fb5('0xc9')]['battlerSmoothImage']=function(){const _0x16ef93=_0x467fb5;return VisuMZ[_0x16ef93('0x15b')][_0x16ef93('0x110')][_0x16ef93('0x231')]['SmoothImage'];},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x8da')]=function(){const _0xf6ef9a=_0x467fb5,_0x557e26=this[_0xf6ef9a('0x1fe')](),_0x5d2cc4=_0x557e26[0x0]?_0x557e26[0x0][_0xf6ef9a('0x2c7')]:0x0,_0x1350c5=$dataSystem[_0xf6ef9a('0x7f1')][_0x5d2cc4];if(_0x1350c5){if(_0xf6ef9a('0x25f')===_0xf6ef9a('0x25f'))this[_0xf6ef9a('0x778')](_0x1350c5[_0xf6ef9a('0x729')]);else{function _0x53a613(){const _0x4ef093=_0xf6ef9a;this[_0x4ef093('0x156')](_0x4ef093('0x898'));}}}},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0xad')]=function(_0x73e487){const _0xd1f4b3=_0x467fb5;Game_Battler[_0xd1f4b3('0xc9')][_0xd1f4b3('0xad')]['call'](this,_0x73e487),this[_0xd1f4b3('0x144')](_0x73e487);},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x18e')]=function(){const _0x8f282=_0x467fb5,_0x392515=this[_0x8f282('0x1fe')](),_0x563898=_0x392515[0x0]?_0x392515[0x0][_0x8f282('0x2c7')]:0x0;return $dataSystem[_0x8f282('0x7f1')][_0x563898];},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x377')]=function(){const _0x37fefe=_0x467fb5;let _0x3f5dc8=_0x37fefe('0x377');if(this[_0x37fefe('0x6b3')](_0x3f5dc8))return this[_0x37fefe('0x825')][_0x3f5dc8];return this[_0x37fefe('0x825')][_0x3f5dc8]=this['createBattleUIOffsetX'](this[_0x37fefe('0x23')]()),this['_cache'][_0x3f5dc8];},Game_Actor[_0x467fb5('0xc9')][_0x467fb5('0x179')]=function(){const _0x415634=_0x467fb5;let _0x9acc2d=_0x415634('0x179');if(this[_0x415634('0x6b3')](_0x9acc2d))return this['_cache'][_0x9acc2d];return this['_cache'][_0x9acc2d]=this['createBattleUIOffsetY'](this['actor']()),this[_0x415634('0x825')][_0x9acc2d];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x62b')]=Game_Enemy['prototype'][_0x467fb5('0x6c6')],Game_Enemy['prototype']['setup']=function(_0x37d4f3,_0x572788,_0x1d2cda){const _0x4c603c=_0x467fb5;_0x37d4f3=DataManager[_0x4c603c('0x2')](_0x37d4f3),VisuMZ[_0x4c603c('0x15b')][_0x4c603c('0x62b')][_0x4c603c('0x709')](this,_0x37d4f3,_0x572788,_0x1d2cda);Imported[_0x4c603c('0x186')]&&this[_0x4c603c('0x595')]();this[_0x4c603c('0x854')](),this[_0x4c603c('0x534')]();if(Imported[_0x4c603c('0x186')]){if(_0x4c603c('0x453')===_0x4c603c('0x453'))this[_0x4c603c('0x516')]();else{function _0x145356(){const _0x87b6b=_0x4c603c;_0xe18656=_0x2f909b[_0x87b6b('0x67b')]()['_homeX'],_0x139901=_0x395466[_0x87b6b('0x67b')]()['_homeY'];}}}},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x854')]=function(){const _0x39794e=_0x467fb5,_0x2bc644=VisuMZ[_0x39794e('0x15b')]['Settings'][_0x39794e('0x3a0')];this[_0x39794e('0x7bf')]=_0x2bc644[_0x39794e('0xc2')],this[_0x39794e('0x85d')]={};},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x534')]=function(){const _0x32788f=_0x467fb5,_0x5bbb53=VisuMZ['BattleCore'][_0x32788f('0x110')][_0x32788f('0x3a0')],_0x479ac1=this[_0x32788f('0x3f9')]()[_0x32788f('0x50e')];this[_0x32788f('0x85d')]={'name':'','wtypeId':_0x5bbb53[_0x32788f('0x241')],'collapse':_0x5bbb53[_0x32788f('0x5f5')],'motionIdle':_0x5bbb53['MotionIdle'],'width':_0x5bbb53['Width']||0x40,'height':_0x5bbb53['Height']||0x40,'anchorX':_0x5bbb53[_0x32788f('0x124')]||0x0,'anchorY':_0x5bbb53[_0x32788f('0x2d1')]||0x0,'shadow':_0x5bbb53[_0x32788f('0x1ef')]};_0x479ac1['match'](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this['_attackAnimationId']=Number(RegExp['$1']));const _0x84f132=this[_0x32788f('0x85d')];if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW BATTLER: (.*)>/i))_0x84f132[_0x32788f('0x22a')]=String(RegExp['$1']);else{if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x46ad88=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x32788f('0x14e')]('');_0x84f132[_0x32788f('0x22a')]=DataManager[_0x32788f('0x13e')](_0x46ad88);}}_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x84f132['anchorX']=eval(RegExp['$1']),_0x84f132['anchorY']=eval(RegExp['$2']));if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW COLLAPSE>/i))_0x84f132['collapse']=!![];else{if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW NO COLLAPSE>/i)){if(_0x32788f('0x25')!==_0x32788f('0x25')){function _0x314bb0(){const _0x15a313=_0x32788f,_0x2e10f6=this[_0x15a313('0x67b')]();_0x2e10f6&&(_0x2e10f6[_0x15a313('0x684')](_0x2860d9),[_0x15a313('0x70e'),'thrust',_0x15a313('0x141')][_0x15a313('0x790')](_0x3ef8ae)&&this[_0x15a313('0x8da')]());}}else _0x84f132[_0x32788f('0x296')]=![];}}if(_0x479ac1['match'](/<SIDEVIEW SHOW SHADOW>/i))_0x84f132[_0x32788f('0x582')]=!![];else{if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW HIDE SHADOW>/i)){if(_0x32788f('0x794')!==_0x32788f('0x794')){function _0x5c8f14(){const _0xdbe710=_0x32788f;this['requestMotion'](_0xdbe710('0x32f'));}}else _0x84f132[_0x32788f('0x582')]=![];}}if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW IDLE MOTION: (.*)>/i)){if(_0x32788f('0x2aa')===_0x32788f('0x18c')){function _0x1aa7a0(){const _0x3ba4ad=_0x32788f;this['performCollapse'](),this[_0x3ba4ad('0x28b')]();}}else _0x84f132[_0x32788f('0x33')]=String(RegExp['$1'])[_0x32788f('0x118')]()[_0x32788f('0x23e')]();}else{if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){if(_0x32788f('0x5f')!==_0x32788f('0x263')){const _0x5877a4=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x32788f('0x14e')]('');_0x84f132['motionIdle']=DataManager[_0x32788f('0x13e')](_0x5877a4);}else{function _0x420388(){const _0x2d1b22=_0x32788f;let _0x373673=0x0;this[_0x2d1b22('0x8a9')][_0x2d1b22('0x828')]>0x0&&(_0x373673=this[_0x2d1b22('0x8a9')][this[_0x2d1b22('0x8a9')][_0x2d1b22('0x828')]-0x1]),this['_lines'][_0x2d1b22('0x828')]>_0x373673?this[_0x2d1b22('0x246')]():this[_0x2d1b22('0x3a4')]();}}}}if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)){if(_0x32788f('0x8e2')!==_0x32788f('0x8e2')){function _0x5e8f84(){const _0x14cd3c=_0x32788f;if(_0x15d0ce)_0x308da8['_subject'][_0x14cd3c('0x44f')](![]);const _0x6e3efd=_0x3b3090[0x0];_0x5300be[_0x14cd3c('0x511')](_0x6e3efd,_0x21fca3);}}else _0x84f132[_0x32788f('0x6c2')]=Number(RegExp['$1']),_0x84f132[_0x32788f('0x41e')]=Number(RegExp['$2']);}if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW WEAPON: (.*)>/i)){if('acbtf'!==_0x32788f('0x30')){function _0x13b100(){const _0x487291=_0x32788f;this[_0x487291('0x21f')]=_0x1f31f7,this[_0x487291('0x408')]&&(this[_0x487291('0x1fb')]=0x0,this[_0x487291('0x21f')]=0x0);}}else _0x84f132[_0x32788f('0x2c7')]=DataManager[_0x32788f('0x4e8')](RegExp['$1']);}else{if(_0x479ac1[_0x32788f('0x5e2')](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){if(_0x32788f('0x122')!==_0x32788f('0x94')){const _0x2e71ca=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x32788f('0x14e')](''),_0x5949ae=DataManager[_0x32788f('0x13e')](_0x2e71ca);_0x84f132[_0x32788f('0x2c7')]=DataManager[_0x32788f('0x4e8')](_0x5949ae);}else{function _0x123e2d(){const _0x40a3f2=_0x32788f;_0x44ec6a['BattleCore'][_0x40a3f2('0x1ed')][_0x40a3f2('0x709')](this),this[_0x40a3f2('0x3a4')]();}}}}if(Imported[_0x32788f('0x186')]){const _0x3d571e=this[_0x32788f('0x117')]();for(const _0x14b659 of _0x3d571e){const _0x13da8a=this['traitSet'](_0x14b659)[_0x32788f('0x43')]['toUpperCase']()[_0x32788f('0x23e')](),_0x450ee2=_0x14b659[_0x32788f('0x66a')]()['trim']();if(_0x479ac1[_0x32788f('0x5e2')](VisuMZ[_0x32788f('0x53e')]['RegExp'][_0x32788f('0x1a4')[_0x32788f('0x11')](_0x450ee2,_0x13da8a)]))_0x84f132[_0x32788f('0x22a')]=String(RegExp['$1']);else{if(_0x479ac1[_0x32788f('0x5e2')](VisuMZ[_0x32788f('0x53e')][_0x32788f('0xa1')]['SvBattlerMass-%1-%2'['format'](_0x450ee2,_0x13da8a)])){if(_0x32788f('0x5b4')!==_0x32788f('0x5b4')){function _0x1afe8b(){const _0x46ea10=_0x32788f;_0x5ac11b[_0x46ea10('0x26f')](_0x46ea10('0x819'),_0x4c3d85,_0x4fe1c9,!![]);}}else{const _0x2705e8=String(RegExp['$1'])[_0x32788f('0x7e0')](/[\r\n]+/)[_0x32788f('0x14e')]('');_0x84f132[_0x32788f('0x22a')]=DataManager[_0x32788f('0x13e')](_0x2705e8);}}}if(_0x479ac1[_0x32788f('0x5e2')](VisuMZ['ElementStatusCore'][_0x32788f('0xa1')][_0x32788f('0x127')[_0x32788f('0x11')](_0x450ee2,_0x13da8a)]))_0x84f132['wtypeId']=DataManager[_0x32788f('0x4e8')](RegExp['$1']);else{if(_0x479ac1[_0x32788f('0x5e2')](VisuMZ['ElementStatusCore'][_0x32788f('0xa1')][_0x32788f('0x359')['format'](_0x450ee2,_0x13da8a)])){const _0x23db14=String(RegExp['$1'])[_0x32788f('0x7e0')](/[\r\n]+/)['remove'](''),_0x66d96a=DataManager['processRandomizedData'](_0x23db14);_0x84f132[_0x32788f('0x2c7')]=DataManager[_0x32788f('0x4e8')](_0x66d96a);}}if(_0x479ac1[_0x32788f('0x5e2')](VisuMZ['ElementStatusCore'][_0x32788f('0xa1')][_0x32788f('0x18a')[_0x32788f('0x11')](_0x450ee2,_0x13da8a)])){if(_0x32788f('0x744')!==_0x32788f('0x5cc'))_0x84f132[_0x32788f('0x33')]=String(RegExp['$1'])[_0x32788f('0x118')]()[_0x32788f('0x23e')]();else{function _0xeaa6d(){const _0x8c7a6d=_0x32788f;_0x3a5262[_0x8c7a6d('0x15b')][_0x8c7a6d('0x272')]['call'](this);if(this[_0x8c7a6d('0x7c9')])this[_0x8c7a6d('0x4ea')]();}}}else{if(_0x479ac1[_0x32788f('0x5e2')](VisuMZ[_0x32788f('0x53e')]['RegExp'][_0x32788f('0x146')[_0x32788f('0x11')](_0x450ee2,_0x13da8a)])){const _0x3a4e36=String(RegExp['$1'])[_0x32788f('0x7e0')](/[\r\n]+/)[_0x32788f('0x14e')]('');_0x84f132[_0x32788f('0x33')]=DataManager[_0x32788f('0x13e')](_0x3a4e36);}}}}},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x58a')]=function(){return this['_attackAnimationId']||0x0;},Game_Enemy[_0x467fb5('0xc9')]['attackAnimationId2']=function(){return 0x0;},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x129')]=function(){const _0x2537c7=_0x467fb5;if(this[_0x2537c7('0x3f9')]()[_0x2537c7('0x50e')][_0x2537c7('0x5e2')](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x2537c7('0xc9')][_0x2537c7('0x129')]['call'](this);},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x3ec')]=function(){const _0x1cf08f=_0x467fb5;if(this[_0x1cf08f('0x3f9')]()[_0x1cf08f('0x50e')]['match'](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x171')]=function(){const _0x28e2a1=_0x467fb5,_0x13bc8f=[];for(const _0x3b18c5 of this[_0x28e2a1('0x3f9')]()[_0x28e2a1('0x277')]){const _0x26d6d7=$dataSkills[_0x3b18c5[_0x28e2a1('0x7e9')]];if(_0x26d6d7&&!_0x13bc8f[_0x28e2a1('0x790')](_0x26d6d7))_0x13bc8f['push'](_0x26d6d7);}return _0x13bc8f;},Game_Enemy['prototype'][_0x467fb5('0x377')]=function(){const _0x523bbf=_0x467fb5;let _0x4bfe72='battleUIOffsetX';if(this[_0x523bbf('0x6b3')](_0x4bfe72))return this[_0x523bbf('0x825')][_0x4bfe72];return this['_cache'][_0x4bfe72]=this[_0x523bbf('0x526')](this[_0x523bbf('0x3f9')]()),this[_0x523bbf('0x825')][_0x4bfe72];},Game_Enemy[_0x467fb5('0xc9')]['battleUIOffsetY']=function(){const _0x252e9b=_0x467fb5;let _0x1d5e34='battleUIOffsetY';if(this[_0x252e9b('0x6b3')](_0x1d5e34))return this['_cache'][_0x1d5e34];return this[_0x252e9b('0x825')][_0x1d5e34]=this[_0x252e9b('0x63f')](this[_0x252e9b('0x3f9')]()),this[_0x252e9b('0x825')][_0x1d5e34];},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x98')]=function(){const _0x177cae=_0x467fb5;if(this[_0x177cae('0x85d')]!==undefined)return this[_0x177cae('0x85d')];return this[_0x177cae('0x534')](),this[_0x177cae('0x85d')];},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x11c')]=function(){const _0x439112=_0x467fb5;return this[_0x439112('0x98')]()[_0x439112('0x22a')]!=='';},Game_Enemy[_0x467fb5('0xc9')]['svBattlerName']=function(){const _0x155e23=_0x467fb5;return this[_0x155e23('0x98')]()[_0x155e23('0x22a')];},Game_Enemy[_0x467fb5('0xc9')]['battlerSmoothImage']=function(){const _0x4b8d02=_0x467fb5;if(this[_0x4b8d02('0x11c')]()){if(_0x4b8d02('0x1f9')!==_0x4b8d02('0x1f9')){function _0x5b8851(){const _0x32bb46=_0x4b8d02;_0x5edc06=_0x32bb46('0x883');}}else return VisuMZ[_0x4b8d02('0x15b')][_0x4b8d02('0x110')][_0x4b8d02('0x231')]['SmoothImage'];}else{if(_0x4b8d02('0x87d')!==_0x4b8d02('0x87d')){function _0x4268f6(){const _0x4d4db6=_0x4b8d02;if(!_0x2bdab9[_0x4d4db6('0x21')]())return;if(!_0x56958e[_0x4d4db6('0x15f')])return;const _0x488def=_0x346a69[_0x4d4db6('0x26e')][_0x4d4db6('0x115')];if(!_0x488def)return;_0x5d512a[_0x4d4db6('0x7ae')](_0x20925e,_0x52c029);const _0x341f84=_0x48c56b['Intensity']||0x1,_0x2c914b=_0x4278a1[_0x4d4db6('0x5c7')]||0x1,_0x12d658=_0x11c981['EasingType']||'Linear';_0x488def[_0x4d4db6('0x424')](_0x341f84,_0x2c914b,_0x12d658);}}else return VisuMZ[_0x4b8d02('0x15b')]['Settings'][_0x4b8d02('0x3a0')][_0x4b8d02('0x7a5')];}},Game_Enemy[_0x467fb5('0xc9')]['performAction']=function(_0x54b1b0){const _0x4c9ca1=_0x467fb5;Game_Battler[_0x4c9ca1('0xc9')]['performAction'][_0x4c9ca1('0x709')](this,_0x54b1b0);if(this[_0x4c9ca1('0x11c')]())this['performActionMotions'](_0x54b1b0);},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x55b')]=function(){const _0xd4c9bb=_0x467fb5,_0xf7404d=this['svBattlerData']()['wtypeId']||0x0,_0x26cb29=$dataSystem[_0xd4c9bb('0x7f1')][_0xf7404d];if(_0x26cb29){if(_0xd4c9bb('0x48')!=='WjCeK'){if(_0x26cb29[_0xd4c9bb('0xff')]===0x0)this[_0xd4c9bb('0x738')]('thrust');else{if(_0x26cb29[_0xd4c9bb('0xff')]===0x1)this[_0xd4c9bb('0x738')](_0xd4c9bb('0x70e'));else _0x26cb29['type']===0x2&&this[_0xd4c9bb('0x738')]('missile');}}else{function _0x3ea4c4(){const _0x508f34=_0xd4c9bb,_0x2b8b44=this[_0x508f34('0x3c0')][_0x508f34('0x530')]();if(_0x2b8b44)_0x2b8b44[_0x508f34('0x669')](_0x508f34('0x4b7'));_0x405304[_0x508f34('0x15b')][_0x508f34('0x481')][_0x508f34('0x709')](this);if(_0x2b8b44)_0x2b8b44[_0x508f34('0x669')](_0x508f34('0x58e'));}}}},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x8da')]=function(){const _0x286c1a=_0x467fb5,_0x598c09=this[_0x286c1a('0x98')]()[_0x286c1a('0x2c7')]||0x0,_0xb88a81=$dataSystem['attackMotions'][_0x598c09];_0xb88a81&&this[_0x286c1a('0x778')](_0xb88a81[_0x286c1a('0x729')]);},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x18e')]=function(){const _0x451f3e=_0x467fb5,_0x55cc6f=this[_0x451f3e('0x98')]()[_0x451f3e('0x2c7')]||0x0;return $dataSystem['attackMotions'][_0x55cc6f];},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x44e')]=function(){const _0x98d820=_0x467fb5;Game_Battler[_0x98d820('0xc9')][_0x98d820('0x44e')][_0x98d820('0x709')](this),this[_0x98d820('0x4b2')]()&&this[_0x98d820('0x11c')]()&&this[_0x98d820('0x738')](_0x98d820('0x554')),SoundManager[_0x98d820('0x7b0')]();},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x108')]=function(){const _0x424746=_0x467fb5;Game_Battler[_0x424746('0xc9')][_0x424746('0x108')]['call'](this),this[_0x424746('0x738')]('evade');},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0xc4')]=function(){const _0x137682=_0x467fb5;Game_Battler[_0x137682('0xc9')]['performMagicEvasion'][_0x137682('0x709')](this),this[_0x137682('0x738')](_0x137682('0x524'));},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x4bd')]=function(){const _0xe71636=_0x467fb5;Game_Battler[_0xe71636('0xc9')][_0xe71636('0x4bd')][_0xe71636('0x709')](this),this[_0xe71636('0x55b')]();},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0xfe')]=function(){const _0x21c5ea=_0x467fb5;if(this[_0x21c5ea('0x11c')]()){if(this['collapseType']()>=0x1)return!![];return this[_0x21c5ea('0x98')]()['collapse'];}else{if(_0x21c5ea('0x338')!==_0x21c5ea('0x338')){function _0x44512c(){const _0x3db918=_0x21c5ea;if(_0x51ac72[_0x3db918('0x656')](_0x2c68f5))return!![];return![];}}else return!![];}},Game_Enemy['prototype']['svBattlerAnchorX']=function(){const _0x4e1f1e=_0x467fb5;return this[_0x4e1f1e('0x98')]()[_0x4e1f1e('0x3de')];},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x586')]=function(){return this['svBattlerData']()['anchorY'];},Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x69b')]=function(){const _0x2487c2=_0x467fb5;return this[_0x2487c2('0x98')]()[_0x2487c2('0x582')];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6f4')]=Game_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x483')],Game_Enemy['prototype'][_0x467fb5('0x483')]=function(_0xde6c9d){const _0x296061=_0x467fb5;VisuMZ[_0x296061('0x15b')][_0x296061('0x6f4')][_0x296061('0x709')](this,_0xde6c9d),this[_0x296061('0x854')](),this['setupBattleCoreData']();const _0x5609c2=this[_0x296061('0x67b')]();if(_0x5609c2)_0x5609c2[_0x296061('0x1f2')](this);},Game_Unit[_0x467fb5('0xc9')][_0x467fb5('0x4c1')]=function(_0x1cab06){const _0x5d6294=_0x467fb5;for(const _0xbb8efa of this[_0x5d6294('0x4f')]()){if(_0xbb8efa)_0xbb8efa['processBattleCoreJS'](_0x1cab06);}},Game_Unit[_0x467fb5('0xc9')][_0x467fb5('0x78e')]=function(){const _0x5a3dde=_0x467fb5,_0x1976d1=this[_0x5a3dde('0x4dd')]();return _0x1976d1[Math['randomInt'](_0x1976d1[_0x5a3dde('0x828')])];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x42')]=Game_Party[_0x467fb5('0xc9')][_0x467fb5('0x261')],Game_Party['prototype'][_0x467fb5('0x261')]=function(_0x35b573){const _0x17d6d5=_0x467fb5;VisuMZ[_0x17d6d5('0x15b')][_0x17d6d5('0x42')]['call'](this,_0x35b573),BattleManager[_0x17d6d5('0xd9')]();},VisuMZ['BattleCore'][_0x467fb5('0x7ea')]=Game_Party[_0x467fb5('0xc9')]['removeActor'],Game_Party[_0x467fb5('0xc9')]['removeActor']=function(_0x54243e){const _0x82a46a=_0x467fb5;VisuMZ[_0x82a46a('0x15b')][_0x82a46a('0x7ea')]['call'](this,_0x54243e),BattleManager['refreshStatusWindow']();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x742')]=Game_Troop[_0x467fb5('0xc9')][_0x467fb5('0x6c6')],Game_Troop['prototype'][_0x467fb5('0x6c6')]=function(_0xd5ead6){const _0x42fd31=_0x467fb5;$gameTemp['clearForcedGameTroopSettingsBattleCore'](),$gameTemp[_0x42fd31('0x2e')](_0xd5ead6),VisuMZ[_0x42fd31('0x15b')][_0x42fd31('0x742')][_0x42fd31('0x709')](this,_0xd5ead6);},VisuMZ['BattleCore'][_0x467fb5('0x244')]=Game_Map[_0x467fb5('0xc9')]['setupBattleback'],Game_Map['prototype'][_0x467fb5('0x84e')]=function(){const _0x4af260=_0x467fb5;VisuMZ['BattleCore'][_0x4af260('0x244')][_0x4af260('0x709')](this),this[_0x4af260('0x154')]();},Game_Map[_0x467fb5('0xc9')]['setupBattlebackBattleCore']=function(){const _0x17114f=_0x467fb5;this[_0x17114f('0x96')]={},this[_0x17114f('0x7f2')]={};if(!$dataMap)return;const _0x4ebbb5=$dataMap[_0x17114f('0x50e')];if(!_0x4ebbb5)return;const _0x174663=_0x4ebbb5[_0x17114f('0x5e2')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x174663){if('CtEEr'===_0x17114f('0x409'))for(const _0x1e463a of _0x174663){_0x1e463a[_0x17114f('0x5e2')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x51dba=Number(RegExp['$1']),_0x1cc70c=Number(RegExp['$2']),_0x3c9339=_0x1cc70c===0x1?this['_regionBattleback1']:this[_0x17114f('0x7f2')],_0xad34ff=String(RegExp['$3']);_0x3c9339[_0x51dba]=_0xad34ff;}else{function _0x43cac9(){const _0x446fc5=_0x17114f;this[_0x446fc5('0x4c0')]();}}}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x430')]=Game_Map[_0x467fb5('0xc9')][_0x467fb5('0x556')],Game_Map[_0x467fb5('0xc9')][_0x467fb5('0x556')]=function(){const _0x4a1b2d=_0x467fb5;if(!BattleManager[_0x4a1b2d('0x87f')]()){const _0x4597cb=$gamePlayer[_0x4a1b2d('0x398')]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x4a1b2d('0x96')]&&this[_0x4a1b2d('0x96')][_0x4597cb])return this[_0x4a1b2d('0x96')][_0x4597cb];}return VisuMZ[_0x4a1b2d('0x15b')][_0x4a1b2d('0x430')][_0x4a1b2d('0x709')](this);},VisuMZ['BattleCore'][_0x467fb5('0xaf')]=Game_Map[_0x467fb5('0xc9')][_0x467fb5('0x2a1')],Game_Map[_0x467fb5('0xc9')][_0x467fb5('0x2a1')]=function(){const _0x52cfda=_0x467fb5;if(!BattleManager[_0x52cfda('0x87f')]()){const _0x375c5a=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this[_0x52cfda('0x96')]&&this[_0x52cfda('0x7f2')][_0x375c5a])return this[_0x52cfda('0x7f2')][_0x375c5a];}return VisuMZ[_0x52cfda('0x15b')]['Game_Map_battleback2Name'][_0x52cfda('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x160')]=Game_Interpreter[_0x467fb5('0xc9')]['command357'],Game_Interpreter['prototype']['command357']=function(_0x160526){const _0x31ee5b=_0x467fb5;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x31ee5b('0x15b')]['Game_Interpreter_PluginCommand'][_0x31ee5b('0x709')](this,_0x160526);},VisuMZ['BattleCore'][_0x467fb5('0x8e7')]=Game_Interpreter[_0x467fb5('0xc9')][_0x467fb5('0x672')],Game_Interpreter['prototype'][_0x467fb5('0x672')]=function(){const _0x4f4e8c=_0x467fb5;if(SceneManager['isSceneBattle']())switch(this['_waitMode']){case _0x4f4e8c('0x6dc'):if(Imported[_0x4f4e8c('0x50c')]){if($gameScreen[_0x4f4e8c('0x870')]()[_0x4f4e8c('0x546')]>0x0)return!![];this[_0x4f4e8c('0x725')]='';}break;case'battleAnimation':if(BattleManager['_spriteset']['isAnimationPlaying']())return!![];this[_0x4f4e8c('0x725')]='';break;case _0x4f4e8c('0x1'):if(Imported[_0x4f4e8c('0x50c')]){if(_0x4f4e8c('0x185')!==_0x4f4e8c('0x185')){function _0xf8ace9(){const _0x2f3c32=_0x4f4e8c;this[_0x2f3c32('0x41b')](_0x31bf81,_0x77f975,_0x29808a);}}else{if($gameScreen[_0x4f4e8c('0x870')]()[_0x4f4e8c('0x613')]>0x0)return!![];if($gameScreen[_0x4f4e8c('0x870')]()[_0x4f4e8c('0x2da')]>0x0)return!![];this[_0x4f4e8c('0x725')]='';}}break;case _0x4f4e8c('0x3d6'):if(BattleManager[_0x4f4e8c('0x115')][_0x4f4e8c('0x27b')]())return!![];this['_waitMode']='';break;case _0x4f4e8c('0x6ce'):if(BattleManager[_0x4f4e8c('0x115')]['isAnyoneFloating']())return!![];this[_0x4f4e8c('0x725')]='';break;case _0x4f4e8c('0xc8'):if(BattleManager[_0x4f4e8c('0x115')][_0x4f4e8c('0x193')]())return!![];this['_waitMode']='';break;case _0x4f4e8c('0x68e'):if(BattleManager[_0x4f4e8c('0x27d')][_0x4f4e8c('0x40c')]())return!![];this['_waitMode']='';break;case _0x4f4e8c('0x46'):if(BattleManager[_0x4f4e8c('0x115')][_0x4f4e8c('0x47a')]())return!![];this[_0x4f4e8c('0x725')]='';break;case _0x4f4e8c('0x449'):if(BattleManager[_0x4f4e8c('0x115')][_0x4f4e8c('0x60e')]())return!![];this[_0x4f4e8c('0x725')]='';break;case'battleGrow':if(BattleManager[_0x4f4e8c('0x115')][_0x4f4e8c('0x318')]())return!![];this[_0x4f4e8c('0x725')]='';break;case'battleSpriteSkew':if(BattleManager[_0x4f4e8c('0x115')][_0x4f4e8c('0x4d3')]())return!![];this[_0x4f4e8c('0x725')]='';break;case _0x4f4e8c('0x685'):if(Imported[_0x4f4e8c('0x50c')]){if($gameScreen['battleCameraData']()[_0x4f4e8c('0x6e0')]>0x0)return!![];this[_0x4f4e8c('0x725')]='';}break;case _0x4f4e8c('0x81c'):if(BattleManager[_0x4f4e8c('0x115')]['isAnyoneSpinning']())return!![];this[_0x4f4e8c('0x725')]='';break;case _0x4f4e8c('0x544'):if(Imported[_0x4f4e8c('0x50c')]){if($gameScreen[_0x4f4e8c('0x870')]()[_0x4f4e8c('0x4f6')]>0x0)return!![];this[_0x4f4e8c('0x725')]='';}break;}return VisuMZ[_0x4f4e8c('0x15b')]['Game_Interpreter_updateWaitMode'][_0x4f4e8c('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x177')]=Game_Interpreter[_0x467fb5('0xc9')][_0x467fb5('0x456')],Game_Interpreter[_0x467fb5('0xc9')][_0x467fb5('0x456')]=function(_0x3cf86e){const _0x49b469=_0x467fb5;if(!$gameParty[_0x49b469('0x7da')]()){if(_0x49b469('0x29a')!=='VIFcP'){function _0x40e972(){const _0xfbaf0f=_0x49b469;this[_0xfbaf0f('0x67b')]()[_0xfbaf0f('0x1d2')](),this[_0xfbaf0f('0x339')]();return;}}else return this[_0x49b469('0x136')](_0x3cf86e);}else return VisuMZ[_0x49b469('0x15b')][_0x49b469('0x177')][_0x49b469('0x709')](this,_0x3cf86e);},Game_Interpreter['prototype'][_0x467fb5('0x72e')]=function(_0x567fbe){const _0x4179ed=_0x467fb5;return VisuMZ[_0x4179ed('0x15b')]['Game_Interpreter_command301']['call'](this,_0x567fbe);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x758')]=function(_0x16c4b2){const _0x580d53=_0x467fb5,_0x56a546=$dataCommonEvents[_0x16c4b2];if(!_0x56a546)return![];if(_0x56a546['list'][_0x580d53('0x828')]<=0x1)return![];return!![];},Game_Interpreter[_0x467fb5('0xc9')]['command301_PreBattleEvent']=function(_0x5afa0a){const _0x1d8dac=_0x467fb5,_0x2d9735=VisuMZ[_0x1d8dac('0x15b')][_0x1d8dac('0x110')][_0x1d8dac('0x264')],_0x169db1=_0x2d9735['BattleStartEvent'],_0x4aef12=$dataCommonEvents[_0x169db1];if(_0x4aef12&&VisuMZ['BattleCore'][_0x1d8dac('0x758')](_0x169db1)){const _0x5eed98=this[_0x1d8dac('0x68f')]()?this[_0x1d8dac('0xe2')]:0x0,_0x402696=JsonEx[_0x1d8dac('0x7d9')](_0x4aef12[_0x1d8dac('0x34c')]),_0xca3e9b=_0x402696[_0x1d8dac('0x828')]-0x1,_0x1d3070={'code':0xbc3,'indent':0x0,'parameters':JsonEx[_0x1d8dac('0x7d9')](_0x5afa0a)};_0x402696['splice'](_0xca3e9b,0x0,_0x1d3070),this[_0x1d8dac('0x55a')](_0x402696,_0x5eed98);}else return VisuMZ['BattleCore'][_0x1d8dac('0x177')][_0x1d8dac('0x709')](this,_0x5afa0a);return!![];},VisuMZ['BattleCore'][_0x467fb5('0x639')]=BattleManager[_0x467fb5('0x7de')],BattleManager[_0x467fb5('0x7de')]=function(){const _0x2bce30=_0x467fb5;VisuMZ[_0x2bce30('0x15b')][_0x2bce30('0x639')][_0x2bce30('0x709')](this),this[_0x2bce30('0x1cd')]();},BattleManager[_0x467fb5('0x1cd')]=function(){const _0x1b93e4=_0x467fb5,_0x2ba2a8=VisuMZ['BattleCore']['Settings'][_0x1b93e4('0x264')],_0x31610a=_0x2ba2a8[_0x1b93e4('0x8c7')];if(_0x31610a&&VisuMZ[_0x1b93e4('0x15b')]['CheckMapBattleEventValid'](_0x31610a)){if(_0x1b93e4('0x7df')!==_0x1b93e4('0x41c'))this[_0x1b93e4('0x83f')]=!![],$gameTemp[_0x1b93e4('0x66b')](_0x2ba2a8[_0x1b93e4('0x8c7')]),$gameMap[_0x1b93e4('0x787')](),$gameMap['_interpreter'][_0x1b93e4('0x65')]=!![];else{function _0x434cd8(){const _0x47f6e0=_0x1b93e4;this[_0x47f6e0('0x520')][_0x47f6e0('0x3e7')]['x']=0x1/(this[_0x47f6e0('0x3e7')]['x']||0.001),this[_0x47f6e0('0x520')][_0x47f6e0('0x3e7')]['y']=0x1/(this[_0x47f6e0('0x3e7')]['y']||0.001);}}}if(_0x2ba2a8[_0x1b93e4('0x10')]>0x0){if(_0x1b93e4('0x387')!=='Wpbio'){function _0x1e0218(){const _0x14ae86=_0x1b93e4;this[_0x14ae86('0x2a3')](_0x7684c4);}}else this[_0x1b93e4('0x381')]=!![];}},VisuMZ['BattleCore'][_0x467fb5('0x254')]=Scene_Map['prototype']['launchBattle'],Scene_Map['prototype'][_0x467fb5('0x749')]=function(){const _0x1e977d=_0x467fb5;if(BattleManager[_0x1e977d('0x83f')]){if(_0x1e977d('0x6bd')===_0x1e977d('0x5f1')){function _0x28ff19(){const _0x46e1e8=_0x1e977d,_0x40cef0=_0x4159ba[_0x46e1e8('0x15b')][_0x46e1e8('0x110')][_0x46e1e8('0x20')],_0x503bc3=_0x18cfd9['result']();if(_0x40cef0[_0x46e1e8('0x5b6')])this['displayBuffs'](_0x2629ed,_0x503bc3[_0x46e1e8('0x407')],_0x26260f[_0x46e1e8('0x831')]);if(_0x40cef0['ShowAddedDebuff'])this[_0x46e1e8('0x59e')](_0x372877,_0x503bc3['addedDebuffs'],_0x4e8950[_0x46e1e8('0x4fd')]);if(_0x40cef0[_0x46e1e8('0x5ac')])this[_0x46e1e8('0x59e')](_0xa415e8,_0x503bc3[_0x46e1e8('0x262')],_0x42a031[_0x46e1e8('0x1b6')]);}}else this[_0x1e977d('0x4ce')]();}else{if(_0x1e977d('0x412')===_0x1e977d('0x412'))VisuMZ[_0x1e977d('0x15b')][_0x1e977d('0x254')][_0x1e977d('0x709')](this);else{function _0x180461(){const _0x302fd9=_0x1e977d;this[_0x302fd9('0x128')][_0x302fd9('0x209')](new _0x53b714());}}}},Scene_Map['prototype'][_0x467fb5('0x4ce')]=function(){const _0x3ea6d9=_0x467fb5;this[_0x3ea6d9('0x13f')]=!![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x1ce')]=SceneManager[_0x467fb5('0x6c4')],SceneManager['isSceneChanging']=function(){const _0x27847c=_0x467fb5;if(BattleManager[_0x27847c('0x83f')])return![];return VisuMZ[_0x27847c('0x15b')][_0x27847c('0x1ce')][_0x27847c('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3a5')]=Game_Interpreter[_0x467fb5('0xc9')][_0x467fb5('0x677')],Game_Interpreter[_0x467fb5('0xc9')][_0x467fb5('0x677')]=function(){const _0x348924=_0x467fb5;VisuMZ[_0x348924('0x15b')][_0x348924('0x3a5')][_0x348924('0x709')](this),this[_0x348924('0x65')]&&(this['_preBattleCommonEvent']=undefined,SceneManager[_0x348924('0x26e')][_0x348924('0x48c')]());},Scene_Map[_0x467fb5('0xc9')][_0x467fb5('0x48c')]=function(){const _0x371b81=_0x467fb5;BattleManager[_0x371b81('0x83f')]=undefined,this[_0x371b81('0x8aa')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3ff')]=Scene_Map[_0x467fb5('0xc9')][_0x467fb5('0x229')],Scene_Map[_0x467fb5('0xc9')][_0x467fb5('0x229')]=function(){const _0x3a2372=_0x467fb5;VisuMZ[_0x3a2372('0x15b')][_0x3a2372('0x3ff')][_0x3a2372('0x709')](this),$gameTemp[_0x3a2372('0x276')]();},VisuMZ[_0x467fb5('0x15b')]['Scene_ItemBase_applyItem']=Scene_ItemBase[_0x467fb5('0xc9')]['applyItem'],Scene_ItemBase[_0x467fb5('0xc9')][_0x467fb5('0xbd')]=function(){const _0x17d136=_0x467fb5;VisuMZ[_0x17d136('0x15b')]['Scene_ItemBase_applyItem'][_0x17d136('0x709')](this);if(this['item']()[_0x17d136('0x50e')][_0x17d136('0x5e2')](/<CUSTOM ACTION SEQUENCE>/i)){if(_0x17d136('0x194')!=='AkirX')$gameTemp[_0x17d136('0x358')]=[];else{function _0x13e333(){const _0x1584a7=_0x17d136;this[_0x1584a7('0x6c2')]=_0x49917c[_0x1584a7('0x6c2')],this['height']=_0x3ed51e[_0x1584a7('0x41e')];const _0x44bbd5=0x1;this[_0x1584a7('0x3e7')]['x']=_0x44bbd5,this[_0x1584a7('0x3e7')]['y']=_0x44bbd5,this['x']=0x0,this['y']=0x0;}}}},VisuMZ['BattleCore'][_0x467fb5('0x2a9')]=Scene_Options[_0x467fb5('0xc9')]['maxCommands'],Scene_Options[_0x467fb5('0xc9')][_0x467fb5('0x7b3')]=function(){const _0x31a7b0=_0x467fb5;let _0x2746fa=VisuMZ[_0x31a7b0('0x15b')][_0x31a7b0('0x2a9')][_0x31a7b0('0x709')](this);const _0x242562=VisuMZ[_0x31a7b0('0x15b')][_0x31a7b0('0x110')];if(_0x242562[_0x31a7b0('0x1b9')][_0x31a7b0('0x609')]&&_0x242562[_0x31a7b0('0x1b9')][_0x31a7b0('0x422')])_0x2746fa+=0x2;if(_0x242562[_0x31a7b0('0x75b')][_0x31a7b0('0x609')]&&_0x242562['HpGauge']['AdjustRect'])_0x2746fa+=0x1;return _0x2746fa;},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x19c')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x475')],Scene_Battle['prototype'][_0x467fb5('0x475')]=function(){const _0x41968e=_0x467fb5;SceneManager[_0x41968e('0x5e6')]()?(Scene_Message[_0x41968e('0xc9')][_0x41968e('0x475')][_0x41968e('0x709')](this),this[_0x41968e('0x115')]&&this['_spriteset']['update']()):VisuMZ[_0x41968e('0x15b')]['Scene_Battle_start'][_0x41968e('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x82d')]=Scene_Battle['prototype'][_0x467fb5('0x8aa')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x8aa')]=function(){const _0x467279=_0x467fb5;if(SceneManager[_0x467279('0x675')]())Scene_Message[_0x467279('0xc9')]['stop']['call'](this);else{if(_0x467279('0x211')!==_0x467279('0xf0'))VisuMZ[_0x467279('0x15b')][_0x467279('0x82d')][_0x467279('0x709')](this);else{function _0xf412b2(){const _0x4f44c5=_0x467279,_0x27e5e7=_0x2da8d6[_0x4f44c5('0xc9')][_0x4f44c5('0x85e')][_0x4f44c5('0x709')](arguments,0x1),_0x37f9a7={'name':_0x468e99,'params':_0x27e5e7},_0x1b2274=this[_0x4f44c5('0x865')][_0x4f44c5('0xae')](_0xdb5cd9=>_0xdb5cd9[_0x4f44c5('0x22a')])['indexOf'](_0x4f44c5('0x521'));_0x1b2274>=0x0?this['_methods'][_0x4f44c5('0x5cb')](_0x1b2274,0x0,_0x37f9a7):this[_0x4f44c5('0x865')][_0x4f44c5('0x26f')](_0x37f9a7);}}}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x77f')]=Scene_Battle['prototype'][_0x467fb5('0x677')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x677')]=function(){const _0x4d3049=_0x467fb5;if(SceneManager['isNextSceneBattleTransitionable']()){if(_0x4d3049('0x426')!==_0x4d3049('0x426')){function _0x1b1945(){const _0x33fb0c=_0x4d3049;_0x157aff[_0x33fb0c('0xc9')][_0x33fb0c('0x56c')]['call'](this,_0x399f14);}}else Scene_Message[_0x4d3049('0xc9')][_0x4d3049('0x677')][_0x4d3049('0x709')](this);}else VisuMZ[_0x4d3049('0x15b')]['Scene_Battle_terminate'][_0x4d3049('0x709')](this);},Scene_Battle['prototype'][_0x467fb5('0x5c3')]=function(){const _0x2b142d=_0x467fb5;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x2b142d('0x37d')]!==undefined)return ConfigManager[_0x2b142d('0x37d')];else{if(this[_0x2b142d('0x435')]()==='border')return![];else{return Scene_Message[_0x2b142d('0xc9')]['isRightInputMode'][_0x2b142d('0x709')](this);;}}},VisuMZ['BattleCore'][_0x467fb5('0x799')]=Scene_Battle[_0x467fb5('0xc9')]['createAllWindows'],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x5af')]=function(){const _0x527442=_0x467fb5;this[_0x527442('0x8b3')](),VisuMZ[_0x527442('0x15b')][_0x527442('0x799')][_0x527442('0x709')](this),this['createAutoBattleWindow']();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0xf4')]=Scene_Battle['prototype'][_0x467fb5('0x588')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x588')]=function(){const _0x5ca6b1=_0x467fb5;VisuMZ[_0x5ca6b1('0x15b')][_0x5ca6b1('0xf4')][_0x5ca6b1('0x709')](this),this[_0x5ca6b1('0x435')]()===_0x5ca6b1('0x5bc')&&this[_0x5ca6b1('0x676')]();},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x421')]=function(_0x2cb91e){const _0x4a9112=_0x467fb5;_0x2cb91e?(this[_0x4a9112('0x8e6')]['x']=(Graphics[_0x4a9112('0x6c2')]-Graphics[_0x4a9112('0x314')])/0x2,this[_0x4a9112('0x8e6')]['y']=(Graphics['height']-Graphics[_0x4a9112('0x678')])/0x2):(this[_0x4a9112('0x8e6')]['x']=Graphics['width']*0xa,this[_0x4a9112('0x8e6')]['y']=Graphics[_0x4a9112('0x41e')]*0xa);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x1e2')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x79e')],Scene_Battle['prototype']['selectNextCommand']=function(){const _0x50b53a=_0x467fb5,_0x141c54=BattleManager[_0x50b53a('0x23')]();VisuMZ[_0x50b53a('0x15b')][_0x50b53a('0x1e2')]['call'](this);if(_0x141c54){if('hBlZR'===_0x50b53a('0x76a')){function _0x1d5a24(){const _0x29a66c=_0x50b53a;this[_0x29a66c('0x202')][_0x29a66c('0xff')]=_0x2b19f9[_0x29a66c('0x2fb')](),this[_0x29a66c('0x202')][_0x29a66c('0x2e8')]=_0x373636[_0x29a66c('0x8af')]();}}else{if(_0x141c54===BattleManager['actor']())return;if(_0x141c54===BattleManager[_0x50b53a('0x3c0')])return;_0x141c54[_0x50b53a('0x67b')]()['stepBack']();}}},VisuMZ[_0x467fb5('0x15b')]['Scene_Battle_selectPreviousCommand']=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x152')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x152')]=function(){const _0x3b74df=_0x467fb5,_0x259e15=BattleManager[_0x3b74df('0x23')]();if(_0x259e15)_0x259e15[_0x3b74df('0x67b')]()[_0x3b74df('0x6b0')]();VisuMZ[_0x3b74df('0x15b')]['Scene_Battle_selectPreviousCommand']['call'](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x495')]=Scene_Battle[_0x467fb5('0xc9')]['logWindowRect'],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x7c2')]=function(){const _0x5318bc=_0x467fb5;if(VisuMZ[_0x5318bc('0x15b')][_0x5318bc('0x110')][_0x5318bc('0x20')]['BattleLogRectJS']){if(_0x5318bc('0x6c3')==='NqLDx'){function _0x37927e(){const _0x2032e3=_0x5318bc;if(this[_0x2032e3('0x7b9')]===_0x8be797)return;_0x114184[_0x2032e3('0xc9')][_0x2032e3('0x12d')]['call'](this);}}else return VisuMZ[_0x5318bc('0x15b')][_0x5318bc('0x110')][_0x5318bc('0x20')][_0x5318bc('0x62f')][_0x5318bc('0x709')](this);}return VisuMZ[_0x5318bc('0x15b')][_0x5318bc('0x495')][_0x5318bc('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x4fa')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x4e4')],Scene_Battle['prototype'][_0x467fb5('0x4e4')]=function(){const _0x121148=_0x467fb5;VisuMZ['BattleCore'][_0x121148('0x4fa')][_0x121148('0x709')](this),this['createPartyCommandWindowBattleCore']();},Scene_Battle[_0x467fb5('0xc9')]['createPartyCommandWindowBattleCore']=function(){const _0x3eeddc=_0x467fb5,_0x35f3f2=this[_0x3eeddc('0x1a0')];_0x35f3f2[_0x3eeddc('0x270')]('autoBattle',this['commandAutoBattle'][_0x3eeddc('0x3c1')](this)),_0x35f3f2['setHandler'](_0x3eeddc('0x1e'),this[_0x3eeddc('0x7f0')][_0x3eeddc('0x3c1')](this));const _0x4dec63=this[_0x3eeddc('0x435')]();switch(_0x4dec63){case'xp':case _0x3eeddc('0x82'):return this['_partyCommandWindow']['setBackgroundType'](0x1);break;}},Scene_Battle[_0x467fb5('0xc9')]['commandAutoBattle']=function(){const _0x5de71c=_0x467fb5;BattleManager[_0x5de71c('0x6d3')]=!![],$gameParty[_0x5de71c('0x3bf')](),this[_0x5de71c('0x79e')]();if(BattleManager[_0x5de71c('0x847')]()){if(_0x5de71c('0x628')!=='dtBxf')BattleManager['_inputting']=![];else{function _0x533689(){const _0x48e749=_0x5de71c;this[_0x48e749('0x738')](_0x48e749('0x32f'));return;}}}},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x7f0')]=function(){const _0x3d7332=_0x467fb5;if(this[_0x3d7332('0x1cb')]())this['_callSceneOptions']=!![],this[_0x3d7332('0x27d')][_0x3d7332('0x26f')]('addText',VisuMZ['BattleCore'][_0x3d7332('0x110')][_0x3d7332('0x389')][_0x3d7332('0x77a')]);else{if(_0x3d7332('0x872')===_0x3d7332('0x63d')){function _0x3bb1a7(){const _0x55dc70=_0x3d7332;this[_0x55dc70('0x156')](_0x55dc70('0x16d'));}}else this['callOptions']();}},Scene_Battle['prototype']['isQueueOptionsMenu']=function(){const _0xb924b6=_0x467fb5;return BattleManager[_0xb924b6('0x1df')]();},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x24')]=function(){const _0x17ee40=_0x467fb5;this['_callSceneOptions']=![],this[_0x17ee40('0x115')][_0x17ee40('0x280')](),this['_windowLayer'][_0x17ee40('0x735')]=![];if(BattleManager[_0x17ee40('0x87f')]())($dataSystem[_0x17ee40('0x556')]||$dataSystem[_0x17ee40('0x2a1')])&&SceneManager[_0x17ee40('0x155')]();else($gameMap[_0x17ee40('0x556')]()||$gameMap[_0x17ee40('0x2a1')]())&&SceneManager[_0x17ee40('0x155')]();SceneManager['push'](Scene_Options);},VisuMZ['BattleCore'][_0x467fb5('0x633')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x7c1')],Scene_Battle[_0x467fb5('0xc9')]['updateBattleProcess']=function(){const _0x1c5344=_0x467fb5;VisuMZ[_0x1c5344('0x15b')]['Scene_Battle_updateBattleProcess'][_0x1c5344('0x709')](this);if(this['_callSceneOptions']&&!BattleManager[_0x1c5344('0x3c0')])this[_0x1c5344('0x24')]();},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x10f')]=function(){const _0xb6ba6b=_0x467fb5,_0x1bea5e=this[_0xb6ba6b('0x7d4')]();this[_0xb6ba6b('0x623')]=new Window_AutoBattleCancel(_0x1bea5e),this[_0xb6ba6b('0x623')][_0xb6ba6b('0x12d')](),this['addChild'](this[_0xb6ba6b('0x623')]);},Scene_Battle['prototype'][_0x467fb5('0x7d4')]=function(){const _0x542de7=_0x467fb5;return VisuMZ[_0x542de7('0x15b')]['Settings'][_0x542de7('0x1b9')][_0x542de7('0x893')][_0x542de7('0x709')](this);},Scene_Battle['prototype'][_0x467fb5('0x625')]=function(){const _0x58cb42=_0x467fb5;return VisuMZ['BattleCore']['Settings'][_0x58cb42('0x389')][_0x58cb42('0x5c9')];},VisuMZ['BattleCore']['Scene_Battle_startPartyCommandSelection']=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x5e0')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x5e0')]=function(){const _0x1ad3a6=_0x467fb5;if(this[_0x1ad3a6('0x625')]())this['onDisabledPartyCommandSelection']();else{if(_0x1ad3a6('0x365')===_0x1ad3a6('0x5ff')){function _0x3ef5f3(){const _0x459266=_0x1ad3a6,_0x3ab22c=_0x59a7e1[_0x459266('0x398')](_0x2dfa38['x'],_0x1cf02b['y']);if(this['_regionBattleback1']&&this[_0x459266('0x7f2')][_0x3ab22c])return this[_0x459266('0x7f2')][_0x3ab22c];}}else VisuMZ['BattleCore'][_0x1ad3a6('0x30b')][_0x1ad3a6('0x709')](this);}},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x327')]=function(){const _0x5a0807=_0x467fb5;if(BattleManager[_0x5a0807('0x5c8')]()){if(_0x5a0807('0xd0')===_0x5a0807('0x527')){function _0x1a5e16(){const _0x4258f7=_0x5a0807,_0xd74080=this[_0x4258f7('0x621')]['skillTypes']();for(const _0x2bfcc6 of _0xd74080){this[_0x4258f7('0x2ff')](_0x2bfcc6);}}}else this[_0x5a0807('0x79e')]();}else BattleManager['isTpb']()&&VisuMZ[_0x5a0807('0x15b')][_0x5a0807('0x30b')][_0x5a0807('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x877')]=Scene_Battle['prototype'][_0x467fb5('0x11b')],Scene_Battle['prototype'][_0x467fb5('0x11b')]=function(){const _0x490a9a=_0x467fb5;BattleManager[_0x490a9a('0x847')]()?this['startActorCommandSelection']():VisuMZ[_0x490a9a('0x15b')][_0x490a9a('0x877')]['call'](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6f7')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x792')],Scene_Battle[_0x467fb5('0xc9')]['createActorCommandWindow']=function(){const _0x572cbf=_0x467fb5;VisuMZ[_0x572cbf('0x15b')][_0x572cbf('0x6f7')][_0x572cbf('0x709')](this),this[_0x572cbf('0x79c')]();},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x79c')]=function(){const _0x45af41=_0x467fb5,_0x26cfe9=this[_0x45af41('0x402')];_0x26cfe9[_0x45af41('0x270')]('escape',this[_0x45af41('0x21e')][_0x45af41('0x3c1')](this)),_0x26cfe9[_0x45af41('0x270')](_0x45af41('0x61'),this['actorCommandAutoBattle']['bind'](this)),_0x26cfe9['setHandler'](_0x45af41('0x2f3'),this['actorCommandSingleSkill'][_0x45af41('0x3c1')](this));if(BattleManager[_0x45af41('0x847')]()){if(this['isPartyCommandWindowDisabled']()){if(_0x45af41('0x601')==='aMPAD')delete _0x26cfe9[_0x45af41('0x6ee')][_0x45af41('0x4aa')];else{function _0x88995(){const _0x4e248e=_0x45af41;if(!_0x6ef70f[_0x4e248e('0x21')]())return;if(!_0x151c86[_0x4e248e('0x50c')])return;_0x3aac04[_0x4e248e('0x7ae')](_0xf14b73,_0xf344cc);const _0x2e52fa=_0x3ecba9[_0x4e248e('0x606')](),_0x4f1dd1=_0x4abac3[_0x4e248e('0x8d7')];_0x1c3018['setBattleCameraOffset'](_0x3d8ed4['OffsetX'],_0x1475bb[_0x4e248e('0x101')],_0x305b05[_0x4e248e('0x5c7')],_0x34abbb[_0x4e248e('0x1aa')]);if(_0x4f1dd1)_0x2e52fa['setWaitMode'](_0x4e248e('0x1'));}}}else{if('hrDrT'===_0x45af41('0x645'))_0x26cfe9[_0x45af41('0x270')](_0x45af41('0x4aa'),this[_0x45af41('0xf')][_0x45af41('0x3c1')](this));else{function _0xda2dd3(){this['createHpGaugeSprite']();}}}}},Scene_Battle['prototype']['actorCommandEscape']=function(){const _0x29d0c2=_0x467fb5;this[_0x29d0c2('0x2e6')]();},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x765')]=function(){const _0x3fcdbd=_0x467fb5;BattleManager[_0x3fcdbd('0x23')]()['makeAutoBattleActions'](),BattleManager[_0x3fcdbd('0x8d9')](),BattleManager[_0x3fcdbd('0x61a')](),this['changeInputWindow']();},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x58d')]=function(){const _0x4658f8=_0x467fb5,_0x4e1435=BattleManager['inputtingAction']();_0x4e1435[_0x4658f8('0x282')](this[_0x4658f8('0x402')][_0x4658f8('0x17f')]()),this[_0x4658f8('0x169')]();},Scene_Battle['prototype'][_0x467fb5('0xf')]=function(){const _0x314e95=_0x467fb5;this['_partyCommandWindow'][_0x314e95('0x6c6')](),this[_0x314e95('0x402')]['close']();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x56e')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x53')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x53')]=function(){const _0x36cf4b=_0x467fb5;VisuMZ[_0x36cf4b('0x15b')][_0x36cf4b('0x56e')]['call'](this),this[_0x36cf4b('0x60b')]();},Scene_Battle[_0x467fb5('0xc9')]['createHelpWindowBattleCore']=function(){const _0x4676e9=_0x467fb5;this['_actorCommandWindow'][_0x4676e9('0x809')](this[_0x4676e9('0x47f')]),this[_0x4676e9('0x1a0')][_0x4676e9('0x809')](this[_0x4676e9('0x47f')]);},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x435')]=function(){const _0x18c982=_0x467fb5;if($gameTemp[_0x18c982('0x772')]!==undefined)return $gameTemp[_0x18c982('0x772')];if(this[_0x18c982('0x235')])return this['_battleLayoutStyle'];return this[_0x18c982('0x235')]=VisuMZ['BattleCore'][_0x18c982('0x110')][_0x18c982('0x5e')]['Style'][_0x18c982('0x118')]()[_0x18c982('0x23e')](),this['_battleLayoutStyle'];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x14f')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x3ce')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x3ce')]=function(){const _0x1ddaed=_0x467fb5,_0x31aba6=this['battleLayoutStyle']();switch(_0x31aba6){case'list':return this[_0x1ddaed('0x862')](Math[_0x1ddaed('0x6b9')](0x1,$gameParty['maxBattleMembers']()),!![]);break;default:return VisuMZ['BattleCore'][_0x1ddaed('0x14f')]['call'](this);break;}},VisuMZ['BattleCore'][_0x467fb5('0x2e4')]=Scene_Battle['prototype'][_0x467fb5('0x23b')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x23b')]=function(){const _0x895d1b=_0x467fb5,_0x4acee2=this['battleLayoutStyle']();switch(_0x4acee2){case _0x895d1b('0x5bc'):return this[_0x895d1b('0x7d')]();break;case'default':case _0x895d1b('0x34c'):case'xp':case'portrait':default:return VisuMZ[_0x895d1b('0x15b')][_0x895d1b('0x2e4')]['call'](this);break;}},Scene_Battle['prototype'][_0x467fb5('0x376')]=function(){const _0x4cb6cd=_0x467fb5,_0x23f572=this[_0x4cb6cd('0x435')]();switch(_0x23f572){case'xp':case _0x4cb6cd('0x82'):return this[_0x4cb6cd('0x37f')]();break;case'border':return this[_0x4cb6cd('0x57a')]();break;case'default':case'list':default:return this[_0x4cb6cd('0x56b')]();break;}},VisuMZ[_0x467fb5('0x15b')]['Scene_Battle_partyCommandWindowRect']=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x5e5')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x5e5')]=function(){const _0x104ce8=_0x467fb5,_0x59df36=this[_0x104ce8('0x435')]();switch(_0x59df36){case'xp':case'portrait':return this[_0x104ce8('0x414')]();break;case _0x104ce8('0x5bc'):return this['partyCommandWindowRectBorderStyle']();case'default':case'list':default:return this[_0x104ce8('0x603')]();break;}},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x603')]=function(){const _0x2cb334=_0x467fb5,_0x50ab45=VisuMZ[_0x2cb334('0x15b')]['Settings'][_0x2cb334('0x5e')],_0x416171=_0x50ab45[_0x2cb334('0x788')]||0xc0,_0x195a77=this['windowAreaHeight'](),_0x5cbc8c=this[_0x2cb334('0x5c3')]()?Graphics['boxWidth']-_0x416171:0x0,_0x482a1d=Graphics[_0x2cb334('0x678')]-_0x195a77;return new Rectangle(_0x5cbc8c,_0x482a1d,_0x416171,_0x195a77);},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x1cf')]=function(){return this['partyCommandWindowRect']();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x699')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x81')],Scene_Battle['prototype'][_0x467fb5('0x81')]=function(){const _0x46cf70=_0x467fb5,_0x519820=this[_0x46cf70('0x435')]();switch(_0x519820){case'xp':case _0x46cf70('0x82'):case _0x46cf70('0x5bc'):break;case _0x46cf70('0x549'):case'list':default:VisuMZ[_0x46cf70('0x15b')][_0x46cf70('0x699')][_0x46cf70('0x709')](this);break;}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x1a5')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x174')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x174')]=function(){const _0x305469=_0x467fb5;VisuMZ[_0x305469('0x15b')][_0x305469('0x1a5')]['call'](this),this[_0x305469('0xfb')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x321')]=Scene_Battle['prototype'][_0x467fb5('0x249')],Scene_Battle[_0x467fb5('0xc9')]['startEnemySelection']=function(){const _0x222fbd=_0x467fb5;VisuMZ[_0x222fbd('0x15b')]['Scene_Battle_startEnemySelection']['call'](this),this[_0x222fbd('0x39c')]['autoSelect'](),this['makeTargetSelectionMoreVisible']();},Scene_Battle['prototype'][_0x467fb5('0xfb')]=function(){const _0x5e1830=_0x467fb5,_0x2538e8=this[_0x5e1830('0x435')]();['xp','portrait',_0x5e1830('0x5bc')]['includes'](_0x2538e8)&&this[_0x5e1830('0x402')]['close']();if(_0x2538e8==='border'||this[_0x5e1830('0x84c')]()){if(_0x5e1830('0x6ac')===_0x5e1830('0x45c')){function _0x5759c1(){const _0xe966da=_0x5e1830,_0x4e4704=_0x5989c1[_0xe966da('0x15b')][_0xe966da('0x110')][_0xe966da('0x264')];_0x4e4704[_0xe966da('0x40e')]&&_0x556dd5[_0xe966da('0x15b')][_0xe966da('0x758')](_0x4e4704['BattleEndEvent'])&&_0x141338['reserveCommonEvent'](_0x4e4704[_0xe966da('0x40e')]);const _0x1bf640=_0xe966da('0x1f3')['format'](_0x1f79f5);_0x4e4704[_0x1bf640]&&_0x297794['BattleCore'][_0xe966da('0x758')](_0x4e4704[_0x1bf640])&&_0x41d306[_0xe966da('0x66b')](_0x4e4704[_0x1bf640]);}}else this[_0x5e1830('0x5a0')]['close'](),this['_itemWindow'][_0x5e1830('0x731')]();}},VisuMZ['BattleCore'][_0x467fb5('0x614')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x858')],Scene_Battle[_0x467fb5('0xc9')]['onActorOk']=function(){const _0x49f6d2=_0x467fb5;VisuMZ[_0x49f6d2('0x15b')][_0x49f6d2('0x614')][_0x49f6d2('0x709')](this),this[_0x49f6d2('0x3f7')]();},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x1cc')]=function(){const _0x5f4e7c=_0x467fb5;return[_0x5f4e7c('0x87'),_0x5f4e7c('0x560'),'singleSkill'][_0x5f4e7c('0x790')](this[_0x5f4e7c('0x402')]['currentSymbol']());},VisuMZ[_0x467fb5('0x15b')]['Scene_Battle_onActorCancel']=Scene_Battle['prototype'][_0x467fb5('0x8d6')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x8d6')]=function(){const _0x5dfc58=_0x467fb5;this[_0x5dfc58('0x1cc')]()?(this[_0x5dfc58('0x841')][_0x5dfc58('0x759')](),this['_actorWindow'][_0x5dfc58('0x12d')](),this['_actorCommandWindow'][_0x5dfc58('0x3c8')]()):VisuMZ[_0x5dfc58('0x15b')][_0x5dfc58('0x6be')][_0x5dfc58('0x709')](this),this[_0x5dfc58('0x22b')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x7b8')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0xaa')],Scene_Battle[_0x467fb5('0xc9')]['onEnemyOk']=function(){const _0x397483=_0x467fb5;VisuMZ[_0x397483('0x15b')][_0x397483('0x7b8')][_0x397483('0x709')](this),this[_0x397483('0x3f7')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x2e1')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x5da')],Scene_Battle['prototype']['onEnemyCancel']=function(){const _0x2c4873=_0x467fb5;this[_0x2c4873('0x1cc')]()?(this[_0x2c4873('0x841')]['show'](),this[_0x2c4873('0x39c')][_0x2c4873('0x12d')](),this['_actorCommandWindow'][_0x2c4873('0x3c8')]()):VisuMZ[_0x2c4873('0x15b')][_0x2c4873('0x2e1')]['call'](this),this[_0x2c4873('0x22b')]();},Scene_Battle[_0x467fb5('0xc9')]['okTargetSelectionVisibility']=function(){const _0x4627e7=_0x467fb5,_0x70be4f=this[_0x4627e7('0x435')]();if(_0x70be4f===_0x4627e7('0x5bc')||this[_0x4627e7('0x84c')]()){this['_skillWindow'][_0x4627e7('0x237')]();if(this[_0x4627e7('0x5a0')][_0x4627e7('0x87e')]){if('Nnujf'===_0x4627e7('0x6ae'))this[_0x4627e7('0x5a0')][_0x4627e7('0x759')]();else{function _0x1c384d(){const _0x4112d8=_0x4627e7;if(!_0x19d44b[_0x4112d8('0x21')]())return![];if(!_0x21ff36)return![];if(!_0x22e68b[_0x4112d8('0x19a')]())return![];if(_0x5608b3[_0x4112d8('0x19a')]()[_0x4112d8('0x50e')][_0x4112d8('0x5e2')](/<CUSTOM ACTION SEQUENCE>/i))return!![];return![];}}}this[_0x4627e7('0x4e6')][_0x4627e7('0x237')](),this[_0x4627e7('0x4e6')]['active']&&this[_0x4627e7('0x4e6')][_0x4627e7('0x759')]();}},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x22b')]=function(){const _0x5e06f8=_0x467fb5,_0x43f246=this[_0x5e06f8('0x435')]();['xp',_0x5e06f8('0x82'),_0x5e06f8('0x5bc')][_0x5e06f8('0x790')](_0x43f246)&&this['_actorCommandWindow']['open'](),this['okTargetSelectionVisibility']();},Scene_Battle[_0x467fb5('0xc9')]['statusWindowRectDefaultStyle']=function(){const _0x468d88=_0x467fb5,_0x2451d0=VisuMZ[_0x468d88('0x15b')]['Settings'][_0x468d88('0x5e')],_0x165b16=Window_BattleStatus['prototype'][_0x468d88('0x604')](),_0x2d71a1=Graphics[_0x468d88('0x314')]-(_0x2451d0[_0x468d88('0x788')]||0xc0),_0x9033f1=this['windowAreaHeight']()+_0x165b16,_0x42f48c=this['isRightInputMode']()?0x0:Graphics[_0x468d88('0x314')]-_0x2d71a1,_0x37acd4=Graphics[_0x468d88('0x678')]-_0x9033f1+_0x165b16;return new Rectangle(_0x42f48c,_0x37acd4,_0x2d71a1,_0x9033f1);},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x37f')]=function(){const _0x59ee8a=_0x467fb5,_0x456e91=Window_BattleStatus['prototype'][_0x59ee8a('0x604')](),_0x375136=Graphics[_0x59ee8a('0x314')],_0x2f0054=this[_0x59ee8a('0x3ce')]()+_0x456e91,_0x26da3e=0x0,_0x7d7fd8=Graphics['boxHeight']-_0x2f0054+_0x456e91;return new Rectangle(_0x26da3e,_0x7d7fd8,_0x375136,_0x2f0054);},Scene_Battle['prototype'][_0x467fb5('0x414')]=function(){const _0x3d3cfb=_0x467fb5,_0x294b93=Graphics[_0x3d3cfb('0x314')]/0x2,_0x1f0d36=this[_0x3d3cfb('0x862')](VisuMZ[_0x3d3cfb('0x15b')]['Settings'][_0x3d3cfb('0x5e')][_0x3d3cfb('0x746')],!![]),_0x54c611=Math[_0x3d3cfb('0x1b2')]((Graphics[_0x3d3cfb('0x314')]-_0x294b93)/0x2),_0x45d270=Graphics[_0x3d3cfb('0x678')]-_0x1f0d36-this[_0x3d3cfb('0x37f')]()[_0x3d3cfb('0x41e')];return new Rectangle(_0x54c611,_0x45d270,_0x294b93,_0x1f0d36);},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x7d')]=function(){const _0x54c687=_0x467fb5,_0x5dc1fd=Graphics[_0x54c687('0x6c2')],_0x1db93b=Math[_0x54c687('0x1b2')]((Graphics[_0x54c687('0x314')]-_0x5dc1fd)/0x2),_0xbc2228=this['helpAreaHeight'](),_0x137d02=(Graphics[_0x54c687('0x41e')]-Graphics['boxHeight'])/-0x2;return new Rectangle(_0x1db93b,_0x137d02,_0x5dc1fd,_0xbc2228);},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x57a')]=function(){const _0xe464a0=_0x467fb5,_0xf4748=Graphics['width'],_0x1b0087=Math[_0xe464a0('0x1b2')]((Graphics[_0xe464a0('0x314')]-_0xf4748)/0x2),_0x534f4d=this[_0xe464a0('0x862')](0x4,!![]),_0x33a5b8=Graphics[_0xe464a0('0x678')]-_0x534f4d+(Graphics['height']-Graphics['boxHeight'])/0x2;return new Rectangle(_0x1b0087,_0x33a5b8,_0xf4748,_0x534f4d);},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x864')]=function(){const _0x4ae2cf=_0x467fb5,_0x26e64c=Math[_0x4ae2cf('0x100')](Graphics[_0x4ae2cf('0x6c2')]/0x3),_0x18d2b0=this[_0x4ae2cf('0x5c3')]()?(Graphics[_0x4ae2cf('0x6c2')]+Graphics[_0x4ae2cf('0x314')])/0x2-_0x26e64c:(Graphics[_0x4ae2cf('0x6c2')]-Graphics[_0x4ae2cf('0x314')])/-0x2,_0x3ec66b=this[_0x4ae2cf('0x7d')](),_0x5b5a77=_0x3ec66b['y']+_0x3ec66b['height'],_0x312b3e=this[_0x4ae2cf('0x57a')](),_0x358c70=_0x312b3e['y']-_0x5b5a77;return new Rectangle(_0x18d2b0,_0x5b5a77,_0x26e64c,_0x358c70);},Scene_Battle[_0x467fb5('0xc9')]['skillItemWindowRectBorderStyle']=function(){const _0x59b1fa=_0x467fb5,_0x59e30e=Math[_0x59b1fa('0x2dc')](Graphics[_0x59b1fa('0x6c2')]/0x3),_0x42ce52=Math[_0x59b1fa('0x1b2')]((Graphics['boxWidth']-_0x59e30e)/0x2),_0x32393f=this[_0x59b1fa('0x864')](),_0x14405a=_0x32393f['y'],_0x1f4c2f=_0x32393f['height'];return new Rectangle(_0x42ce52,_0x14405a,_0x59e30e,_0x1f4c2f);},Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x676')]=function(){const _0x10555a=_0x467fb5;this[_0x10555a('0x304')]['y']=this[_0x10555a('0x47f')]['y']+this[_0x10555a('0x47f')][_0x10555a('0x41e')];if(this[_0x10555a('0x5c3')]())this['_cancelButton']['x']=-this[_0x10555a('0x304')][_0x10555a('0x6c2')]-0x4;else{if(_0x10555a('0x51a')!=='VupBm')this['_cancelButton']['x']=Graphics[_0x10555a('0x6c2')]-(Graphics[_0x10555a('0x6c2')]-Graphics['boxWidth'])/0x2-this['_cancelButton'][_0x10555a('0x6c2')]-0x4;else{function _0x406dc6(){const _0x547646=_0x10555a;this[_0x547646('0x28b')](),this[_0x547646('0x509')]();}}}},VisuMZ[_0x467fb5('0x15b')]['Scene_Battle_skillWindowRect']=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x3b7')],Scene_Battle[_0x467fb5('0xc9')]['skillWindowRect']=function(){const _0x48e7a7=_0x467fb5;if(this[_0x48e7a7('0x435')]()==='border')return this[_0x48e7a7('0x691')]();else return this[_0x48e7a7('0x84c')]()?this[_0x48e7a7('0x416')]():VisuMZ[_0x48e7a7('0x15b')][_0x48e7a7('0xd4')][_0x48e7a7('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x5a8')]=Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x584')],Scene_Battle[_0x467fb5('0xc9')][_0x467fb5('0x584')]=function(){const _0x47c5f9=_0x467fb5;if(this['battleLayoutStyle']()===_0x47c5f9('0x5bc')){if(_0x47c5f9('0x848')===_0x47c5f9('0x620')){function _0x5876d5(){const _0x322aa0=_0x47c5f9;return _0x322aa0('0x3be');}}else return this['skillItemWindowRectBorderStyle']();}else return this['isSkillItemWindowsMiddle']()?this['skillItemWindowRectMiddle']():VisuMZ[_0x47c5f9('0x15b')]['Scene_Battle_itemWindowRect'][_0x47c5f9('0x709')](this);},Scene_Battle[_0x467fb5('0xc9')]['isSkillItemWindowsMiddle']=function(){const _0x4e11a9=_0x467fb5;return VisuMZ[_0x4e11a9('0x15b')]['Settings'][_0x4e11a9('0x5e')][_0x4e11a9('0x592')];},Scene_Battle['prototype'][_0x467fb5('0x416')]=function(){const _0x7f64af=_0x467fb5,_0x27caa9=Sprite_Button[_0x7f64af('0xc9')]['blockWidth']()*0x2+0x4;let _0x2c8c25=Graphics[_0x7f64af('0x314')]-_0x27caa9;Imported[_0x7f64af('0x3e')]&&SceneManager[_0x7f64af('0x859')]()&&(_0x2c8c25+=_0x27caa9);const _0x1c1ea1=this[_0x7f64af('0x661')](),_0x44a084=Graphics['boxHeight']-_0x1c1ea1-this['statusWindowRect']()[_0x7f64af('0x41e')]+Window_BattleStatus[_0x7f64af('0xc9')]['extraHeight'](),_0x310114=0x0;return new Rectangle(_0x310114,_0x1c1ea1,_0x2c8c25,_0x44a084);},Scene_Battle['prototype'][_0x467fb5('0x8b3')]=function(){const _0x49c2ec=_0x467fb5;this[_0x49c2ec('0x2e3')]=new Sprite(),this[_0x49c2ec('0x2e3')]['x']=this['_windowLayer']['x'],this[_0x49c2ec('0x2e3')]['y']=this[_0x49c2ec('0x8e6')]['y'];const _0x564e2d=this[_0x49c2ec('0xb9')][_0x49c2ec('0x2d9')](this[_0x49c2ec('0x8e6')]);this[_0x49c2ec('0x22c')](this['_enemyNameContainer'],_0x564e2d);for(let _0x16a846=0x0;_0x16a846<0x8;_0x16a846++){const _0xca9ae8=new Window_EnemyName(_0x16a846);this[_0x49c2ec('0x2e3')]['addChild'](_0xca9ae8);}},Sprite_Battler[_0x467fb5('0xf7')]=VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x110')][_0x467fb5('0x231')]['MotionSpeed'],VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6d8')]=Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x6d1')],Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x6d1')]=function(){const _0x4d74a2=_0x467fb5;VisuMZ[_0x4d74a2('0x15b')][_0x4d74a2('0x6d8')][_0x4d74a2('0x709')](this),this[_0x4d74a2('0x31b')]();if(this[_0x4d74a2('0x7b9')]===Sprite_Enemy)this[_0x4d74a2('0x448')]();this[_0x4d74a2('0x295')]();},Sprite_Battler['prototype'][_0x467fb5('0x31b')]=function(){const _0x30f5a7=_0x467fb5;this['_baseX']=0x0,this[_0x30f5a7('0x345')]=0x0,this['_floatHeight']=0x0,this[_0x30f5a7('0xd6')]=0x0,this['_floatDuration']=0x0,this[_0x30f5a7('0x43a')]=0x0,this[_0x30f5a7('0x17')]=_0x30f5a7('0x2f7'),this[_0x30f5a7('0x3bc')]=0x0,this['_jumpMaxHeight']=0x0,this[_0x30f5a7('0x93')]=0x0,this[_0x30f5a7('0x343')]=0x0,this['_targetOpacity']=0xff,this['_opacityDuration']=0x0,this[_0x30f5a7('0x62d')]=0x0,this['_opacityEasing']='Linear',this[_0x30f5a7('0x21f')]=0x0,this[_0x30f5a7('0x1fb')]=0x0,this[_0x30f5a7('0x6a8')]=0x0,this[_0x30f5a7('0x6e2')]=0x0,this['_angleEasing']=_0x30f5a7('0x2f7'),this[_0x30f5a7('0x408')]=!![],this['_skewX']=0x0,this[_0x30f5a7('0x3da')]=0x0,this[_0x30f5a7('0x5bf')]=0x0,this[_0x30f5a7('0x6c8')]=0x0,this['_skewDuration']=0x0,this[_0x30f5a7('0x7b4')]=0x0,this[_0x30f5a7('0x42b')]='Linear',this[_0x30f5a7('0x6bc')]=0x1,this['_growY']=0x1,this[_0x30f5a7('0x2c6')]=0x1,this[_0x30f5a7('0x724')]=0x1,this[_0x30f5a7('0x750')]=0x0,this[_0x30f5a7('0x7f4')]=0x0,this[_0x30f5a7('0x36c')]=_0x30f5a7('0x2f7'),this[_0x30f5a7('0x651')]=0x1;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x448')]=function(){const _0x499dc0=_0x467fb5;this[_0x499dc0('0x145')]=new Sprite(),this[_0x499dc0('0x145')][_0x499dc0('0x30a')]=ImageManager['loadSystem'](_0x499dc0('0x658')),this['_shadowSprite'][_0x499dc0('0x30a')][_0x499dc0('0x83e')]=VisuMZ[_0x499dc0('0x15b')]['Settings']['Actor'][_0x499dc0('0x7a5')],this[_0x499dc0('0x145')]['anchor']['x']=0.5,this[_0x499dc0('0x145')][_0x499dc0('0x1d6')]['y']=0.5,this[_0x499dc0('0x145')]['y']=-0x2,this[_0x499dc0('0x145')][_0x499dc0('0x735')]=![],this[_0x499dc0('0x209')](this[_0x499dc0('0x145')]);},Sprite_Battler['prototype'][_0x467fb5('0x295')]=function(){const _0x244e7a=_0x467fb5;this['_distortionSprite']=new Sprite(),this[_0x244e7a('0x2e0')]['anchor']['x']=0.5,this[_0x244e7a('0x2e0')]['anchor']['y']=0.5,this['addChild'](this[_0x244e7a('0x2e0')]);},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x225')]=function(){const _0x12ea90=_0x467fb5;if(!this[_0x12ea90('0x2e0')])return;if(this[_0x12ea90('0x145')]){if('JyVai'===_0x12ea90('0x19')){function _0x28d556(){const _0x55af18=_0x12ea90;_0x18a5c8[_0x55af18('0x15b')]['ParseSkillNotetags']['call'](this,_0x47cfe9),_0x1217ae['BattleCore'][_0x55af18('0x315')](_0x259c60),_0x5ac02c[_0x55af18('0x15b')][_0x55af18('0x757')](_0x3d6864);}}else{const _0x3f6161=this['getChildIndex'](this[_0x12ea90('0x2e0')]);this[_0x12ea90('0x22c')](this['_shadowSprite'],_0x3f6161),this['updateShadowVisibility']();}}this[_0x12ea90('0x48e')]&&this[_0x12ea90('0x2e0')][_0x12ea90('0x209')](this['_svBattlerSprite']);this[_0x12ea90('0x1a7')]&&this['_distortionSprite']['addChild'](this['_weaponSprite']);if(this[_0x12ea90('0x3ad')]){if(_0x12ea90('0x65b')!=='btitL'){function _0x3ff1ed(){const _0x3b38ac=_0x12ea90;return _0x328e37[_0x3b38ac('0x15b')]['Window_Options_statusText'][_0x3b38ac('0x709')](this,_0x574315);}}else this['_distortionSprite']['addChild'](this['_mainSprite']);}this['_dragonbonesSpriteContainer']&&this[_0x12ea90('0x2e0')][_0x12ea90('0x209')](this[_0x12ea90('0x4b9')]);},Sprite_Battler[_0x467fb5('0xc9')]['updateShadowVisibility']=function(){const _0x1cf3b9=_0x467fb5;if(!this[_0x1cf3b9('0x145')])return;if(this[_0x1cf3b9('0x33a')]&&this['_battler'][_0x1cf3b9('0x69b')]()){if(_0x1cf3b9('0xac')===_0x1cf3b9('0xac')){const _0x53894f=this['_shadowSprite'][_0x1cf3b9('0x30a')];this[_0x1cf3b9('0x145')][_0x1cf3b9('0x874')](0x0,0x0,_0x53894f[_0x1cf3b9('0x6c2')],_0x53894f['height']);}else{function _0x23480d(){const _0x2df06a=_0x1cf3b9;_0x4dc0a9[_0x2df06a('0x15b')][_0x2df06a('0xce')]['call'](this,_0x22e1f8);}}}else{if(_0x1cf3b9('0x471')===_0x1cf3b9('0x471'))this[_0x1cf3b9('0x145')][_0x1cf3b9('0x874')](0x0,0x0,0x0,0x0);else{function _0x5b0beb(){const _0x1b77d7=_0x1cf3b9;return this['isBattleSys'](_0x1b77d7('0x0'));}}}},Sprite_Battler[_0x467fb5('0xc9')]['damageContainer']=function(){const _0x564dd6=_0x467fb5;return SceneManager[_0x564dd6('0x21')]()?SceneManager['_scene']['_spriteset'][_0x564dd6('0xf8')]:this[_0x564dd6('0x6')];},Sprite_Battler[_0x467fb5('0xc9')]['setupTextPopup']=function(_0x2bca11,_0x557266){const _0x4dafa4=_0x467fb5;if(!this['_battler']['isSpriteVisible']())return;const _0x2b4766=VisuMZ[_0x4dafa4('0x15b')][_0x4dafa4('0x110')][_0x4dafa4('0x82c')],_0x294c6d=new Sprite_Damage();_0x294c6d[_0x4dafa4('0x2ea')]=_0x2b4766[_0x4dafa4('0x312')],this['sortDamageSprites'](_0x294c6d),_0x294c6d[_0x4dafa4('0x835')](_0x2bca11,_0x557266),this[_0x4dafa4('0x299')](_0x294c6d);},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x68a')]=function(_0x52a55b,_0x185d44,_0x3ee6a7){const _0x479da8=_0x467fb5;if(!this[_0x479da8('0x33a')]['isSpriteVisible']())return;const _0x593572=VisuMZ['BattleCore'][_0x479da8('0x110')][_0x479da8('0x82c')],_0x53022d=new Sprite_Damage();_0x53022d[_0x479da8('0x2ea')]=_0x593572[_0x479da8('0x312')],this[_0x479da8('0x4f1')](_0x53022d),_0x53022d['setupIconTextPopup'](_0x52a55b,_0x185d44,_0x3ee6a7),this[_0x479da8('0x299')](_0x53022d);},Sprite_Battler['prototype'][_0x467fb5('0x9d')]=function(){const _0xf3d11b=_0x467fb5;if(!this[_0xf3d11b('0x33a')]['isDamagePopupRequested']())return;while(this[_0xf3d11b('0x33a')][_0xf3d11b('0x8b1')]()){this[_0xf3d11b('0x33a')]['isSpriteVisible']()&&this[_0xf3d11b('0x4c0')]();}this[_0xf3d11b('0x33a')][_0xf3d11b('0xdb')](),this[_0xf3d11b('0x33a')][_0xf3d11b('0x352')]();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x4c0')]=function(){const _0x71f255=_0x467fb5,_0x39907d=VisuMZ[_0x71f255('0x15b')][_0x71f255('0x110')][_0x71f255('0x82c')],_0x11e6ab=new Sprite_Damage();_0x11e6ab[_0x71f255('0x2ea')]=_0x39907d['PopupDuration'],this[_0x71f255('0x4f1')](_0x11e6ab),_0x11e6ab[_0x71f255('0x6c6')](this[_0x71f255('0x33a')]),_0x11e6ab[_0x71f255('0x631')](this[_0x71f255('0x33a')]),this['addDamageSprite'](_0x11e6ab);},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x299')]=function(_0x2343fa){const _0x2b1ca9=_0x467fb5;this[_0x2b1ca9('0x16e')][_0x2b1ca9('0x26f')](_0x2343fa);if(this[_0x2b1ca9('0x431')]())SceneManager['_scene'][_0x2b1ca9('0x841')][_0x2b1ca9('0x299')](_0x2343fa,this['_battler']);else{this[_0x2b1ca9('0x24b')]()['addChild'](_0x2343fa);if(SceneManager['isBattleFlipped']())_0x2343fa[_0x2b1ca9('0x3e7')]['x']=-0x1;}},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x431')]=function(){const _0x1aa95a=_0x467fb5;return!$gameSystem[_0x1aa95a('0xe1')]()&&this[_0x1aa95a('0x33a')]&&this[_0x1aa95a('0x33a')][_0x1aa95a('0x317')]();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x4f1')]=function(_0x5b84c9){const _0x3bc224=_0x467fb5,_0x27e3fd=VisuMZ[_0x3bc224('0x15b')][_0x3bc224('0x110')][_0x3bc224('0x82c')],_0x17e796=SceneManager[_0x3bc224('0x5df')]()?-0x1:0x1;let _0x2b0e6e=this['x'],_0x3a9ef6=this['y'];const _0x141297=SceneManager['_scene'][_0x3bc224('0x841')];if(_0x141297&&this['parent']===_0x141297){_0x2b0e6e+=_0x141297['x']-this['damageOffsetX']();const _0x5810f4=_0x141297[_0x3bc224('0x228')]()*0x3/0x4;_0x3a9ef6=_0x141297['y']+_0x5810f4,_0x3a9ef6=Math[_0x3bc224('0x5e9')](_0x3a9ef6,_0x141297['y']+this['y']-this[_0x3bc224('0x41e')]+_0x5810f4);}_0x5b84c9['x']=Math[_0x3bc224('0x1b2')](_0x2b0e6e+this[_0x3bc224('0x31')]()*_0x17e796),_0x5b84c9['y']=Math[_0x3bc224('0x1b2')](_0x3a9ef6+this[_0x3bc224('0x30f')]());if(_0x27e3fd[_0x3bc224('0x5ee')])for(const _0x3f02be of this['_damages']){_0x3f02be['x']+=_0x27e3fd[_0x3bc224('0x4db')]*_0x17e796,_0x3f02be['y']+=_0x27e3fd[_0x3bc224('0x4b3')];}else{if(_0x3bc224('0x7a4')===_0x3bc224('0x15c')){function _0x1228df(){const _0x41fc59=_0x3bc224;this[_0x41fc59('0x27d')][_0x41fc59('0x26f')](_0x41fc59('0x246')),this['_logWindow']['push']('clear');}}else{const _0x462da6=this[_0x3bc224('0x16e')][this['_damages']['length']-0x1];_0x462da6&&(_0x5b84c9['x']=_0x462da6['x']+_0x27e3fd['PopupShiftX']*_0x17e796,_0x5b84c9['y']=_0x462da6['y']+_0x27e3fd[_0x3bc224('0x4b3')]);}}},VisuMZ['BattleCore'][_0x467fb5('0x27e')]=Sprite_Battler[_0x467fb5('0xc9')]['damageOffsetX'],Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x31')]=function(){const _0x54b4be=_0x467fb5;let _0x138021=VisuMZ[_0x54b4be('0x15b')][_0x54b4be('0x27e')][_0x54b4be('0x709')](this),_0x565254=VisuMZ[_0x54b4be('0x15b')][_0x54b4be('0x110')]['Damage'][_0x54b4be('0x50a')]||0x0;return Math['round'](_0x138021+_0x565254);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3dd')]=Sprite_Battler[_0x467fb5('0xc9')]['damageOffsetY'],Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x30f')]=function(){const _0x5e449b=_0x467fb5;let _0xa94798=VisuMZ[_0x5e449b('0x15b')]['Sprite_Battler_damageOffsetY']['call'](this);switch(VisuMZ[_0x5e449b('0x15b')]['Settings']['Damage'][_0x5e449b('0x6b4')]){case _0x5e449b('0x7fd'):_0xa94798-=this[_0x5e449b('0x41e')]*this[_0x5e449b('0x3e7')]['y'];break;case _0x5e449b('0x1f1'):_0xa94798-=this[_0x5e449b('0x41e')]*this['scale']['y']*0.5;break;}let _0x587b70=VisuMZ[_0x5e449b('0x15b')][_0x5e449b('0x110')][_0x5e449b('0x82c')][_0x5e449b('0x25b')]||0x0;return Math[_0x5e449b('0x1b2')](_0xa94798+_0x587b70);},Sprite_Actor['prototype'][_0x467fb5('0x31')]=function(){const _0x4b779d=_0x467fb5;return Sprite_Battler[_0x4b779d('0xc9')][_0x4b779d('0x31')][_0x4b779d('0x709')](this);},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x30f')]=function(){const _0x300f7f=_0x467fb5;return Sprite_Battler[_0x300f7f('0xc9')][_0x300f7f('0x30f')][_0x300f7f('0x709')](this);},Sprite_Battler[_0x467fb5('0xc9')]['destroyDamageSprite']=function(_0x4b40ad){const _0x52de77=_0x467fb5;this[_0x52de77('0x431')]()?SceneManager['_scene']['_statusWindow']['removeDamageSprite'](_0x4b40ad):(this[_0x52de77('0x24b')]()['removeChild'](_0x4b40ad),this[_0x52de77('0x16e')][_0x52de77('0x14e')](_0x4b40ad),_0x4b40ad['destroy']());},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x425')]=Sprite_Battler['prototype'][_0x467fb5('0x12a')],Sprite_Battler['prototype'][_0x467fb5('0x12a')]=function(_0x72f2df,_0x4f164c){const _0x4a1586=_0x467fb5;if(!this['_initialOffset']){this['_initialOffset']=!![];const _0x3d72aa=VisuMZ[_0x4a1586('0x15b')][_0x4a1586('0x110')];if(this['constructor']===Sprite_Actor)_0x72f2df+=_0x3d72aa[_0x4a1586('0x231')][_0x4a1586('0x4f2')]||0x0,_0x4f164c+=_0x3d72aa['Actor'][_0x4a1586('0x101')]||0x0;else this[_0x4a1586('0x7b9')]===Sprite_Enemy&&(_0x72f2df+=_0x3d72aa[_0x4a1586('0x3a0')][_0x4a1586('0x4f2')]||0x0,_0x4f164c+=_0x3d72aa[_0x4a1586('0x3a0')]['OffsetY']||0x0);}VisuMZ[_0x4a1586('0x15b')][_0x4a1586('0x425')]['call'](this,_0x72f2df,_0x4f164c);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x362')]=Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x280')],Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x280')]=function(){const _0x5cd934=_0x467fb5;VisuMZ[_0x5cd934('0x15b')][_0x5cd934('0x362')][_0x5cd934('0x709')](this),!this[_0x5cd934('0x33a')]&&this[_0x5cd934('0x3a2')]&&(this[_0x5cd934('0x3a2')][_0x5cd934('0x735')]=![]);},VisuMZ['BattleCore'][_0x467fb5('0x49a')]=Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x667')],Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x667')]=function(){const _0x14d833=_0x467fb5;this['updateScale'](),this[_0x14d833('0x703')](),this[_0x14d833('0x35a')](),this['updateFlip'](),this[_0x14d833('0x504')](),VisuMZ[_0x14d833('0x15b')]['Sprite_Battler_updateMain'][_0x14d833('0x709')](this);if(this[_0x14d833('0x7b9')]===Sprite_Enemy)this[_0x14d833('0x4a6')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x718')]=Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x6fc')],Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x6fc')]=function(){const _0x340af7=_0x467fb5;VisuMZ['BattleCore']['Sprite_Battler_updatePosition']['call'](this),this[_0x340af7('0x807')](),this[_0x340af7('0x1c8')]();},Sprite_Battler['prototype']['updatePositionBattleCore']=function(){const _0x410ba2=_0x467fb5;this[_0x410ba2('0x5f6')]=this['x'],this['_baseY']=this['y'],this[_0x410ba2('0x771')](),this['updateJump'](),this['x']+=this[_0x410ba2('0x655')](),this['y']+=this['extraPositionY'](),this['x']=Math[_0x410ba2('0x1b2')](this['x']),this['y']=Math[_0x410ba2('0x1b2')](this['y']);},Sprite_Battler['prototype'][_0x467fb5('0x655')]=function(){let _0x3684e0=0x0;return _0x3684e0;},Sprite_Battler[_0x467fb5('0xc9')]['extraPositionY']=function(){const _0x8ef780=_0x467fb5;let _0x4c67d3=0x0;this[_0x8ef780('0x33a')]&&!this[_0x8ef780('0x33a')][_0x8ef780('0x3ec')]()&&(_0x4c67d3-=this[_0x8ef780('0x5ca')],_0x4c67d3-=this[_0x8ef780('0x3bc')]);if(this[_0x8ef780('0x2e0')]&&this['constructor']!==Sprite_SvEnemy){const _0x4f3e23=this[_0x8ef780('0x2e0')][_0x8ef780('0x3e7')]['y'];_0x4c67d3-=(_0x4f3e23-0x1)*this['height'];}return _0x4c67d3;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x396')]=function(){const _0x5b95f2=_0x467fb5,_0x437d64=this[_0x5b95f2('0x33a')]&&this[_0x5b95f2('0x33a')]['isBattlerFlipped']();this[_0x5b95f2('0x651')]=(_0x437d64?-0x1:0x1)*Math[_0x5b95f2('0x1c0')](this[_0x5b95f2('0x3e7')]['x']);},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x4df')]=function(_0x1be6a8,_0x23fa0a,_0x2dc222){const _0x21df91=_0x467fb5;if(!this[_0x21df91('0x6d5')]())return;if(this['_targetFloatHeight']===_0x1be6a8)return;this[_0x21df91('0xd6')]=_0x1be6a8,this[_0x21df91('0x4e9')]=_0x23fa0a,this[_0x21df91('0x43a')]=_0x23fa0a,this[_0x21df91('0x17')]=_0x2dc222||_0x21df91('0x2f7');if(_0x23fa0a<=0x0)this['_floatHeight']=_0x1be6a8;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x771')]=function(){const _0x4554fc=_0x467fb5;if(this[_0x4554fc('0x4e9')]<=0x0)return;const _0x255126=this['_floatDuration'],_0x173221=this[_0x4554fc('0x43a')],_0x29a567=this[_0x4554fc('0x17')];if(Imported[_0x4554fc('0x3e')])this[_0x4554fc('0x5ca')]=this['applyEasing'](this[_0x4554fc('0x5ca')],this['_targetFloatHeight'],_0x255126,_0x173221,_0x29a567);else{if(_0x4554fc('0x55e')===_0x4554fc('0x55e'))this[_0x4554fc('0x5ca')]=(this['_floatHeight']*(_0x255126-0x1)+this[_0x4554fc('0xd6')])/_0x255126;else{function _0x4e7272(){this['startMotion']('dead');}}}this[_0x4554fc('0x4e9')]--;if(this[_0x4554fc('0x4e9')]<=0x0)this[_0x4554fc('0x192')]();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x192')]=function(){const _0xd6b134=_0x467fb5;this[_0xd6b134('0x5ca')]=this[_0xd6b134('0xd6')];},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x52f')]=function(){const _0x4f83c4=_0x467fb5;return this[_0x4f83c4('0x4e9')]>0x0;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x319')]=function(_0x7ad2f9,_0x30412b){const _0x44a0d0=_0x467fb5;if(!this['canMove']())return;if(_0x30412b<=0x0)return;this[_0x44a0d0('0x682')]=_0x7ad2f9,this['_jumpDuration']=_0x30412b,this[_0x44a0d0('0x343')]=_0x30412b;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x6ff')]=function(){const _0x41b8df=_0x467fb5;if(this[_0x41b8df('0x93')]<=0x0)return;const _0x470d73=this[_0x41b8df('0x343')]-this[_0x41b8df('0x93')],_0x562e60=this[_0x41b8df('0x343')]/0x2,_0xadeec7=this[_0x41b8df('0x682')],_0x5da101=-_0xadeec7/Math[_0x41b8df('0x69c')](_0x562e60,0x2);this[_0x41b8df('0x3bc')]=_0x5da101*Math[_0x41b8df('0x69c')](_0x470d73-_0x562e60,0x2)+_0xadeec7,this['_jumpDuration']--;if(this['_jumpDuration']<=0x0)return this[_0x41b8df('0x76f')]();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x76f')]=function(){const _0x2ffad2=_0x467fb5;this[_0x2ffad2('0x3bc')]=0x0;},Sprite_Battler[_0x467fb5('0xc9')]['isJumping']=function(){const _0x33ffa6=_0x467fb5;return this[_0x33ffa6('0x93')]>0x0;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x467')]=function(_0x32b862,_0x1118c4,_0x3eb6b2){const _0x22ffc3=_0x467fb5;if(this[_0x22ffc3('0x866')]===_0x32b862)return;this['_targetOpacity']=_0x32b862,this['_opacityDuration']=_0x1118c4,this[_0x22ffc3('0x62d')]=_0x1118c4,this[_0x22ffc3('0x1a1')]=_0x3eb6b2||_0x22ffc3('0x2f7');if(_0x1118c4<=0x0)this[_0x22ffc3('0x79a')]=_0x32b862;},Sprite_Battler['prototype']['updateOpacity']=function(){const _0x1b156a=_0x467fb5;if(this[_0x1b156a('0x89')]<=0x0)return;const _0x666f5f=this['_opacityDuration'],_0x34f5ca=this[_0x1b156a('0x62d')],_0x1dd6db=this[_0x1b156a('0x1a1')];if(Imported[_0x1b156a('0x3e')]){if(_0x1b156a('0x40')!=='sNJQr'){function _0x3fbec7(){const _0x496536=_0x1b156a;_0x3982b7[_0x496536('0x155')]();}}else this[_0x1b156a('0x79a')]=this[_0x1b156a('0x125')](this['opacity'],this[_0x1b156a('0x866')],_0x666f5f,_0x34f5ca,_0x1dd6db);}else this['opacity']=(this[_0x1b156a('0x79a')]*(_0x666f5f-0x1)+this[_0x1b156a('0x866')])/_0x666f5f;this[_0x1b156a('0x89')]--;if(this[_0x1b156a('0x89')]<=0x0)this[_0x1b156a('0x5a4')]();},Sprite_Battler['prototype'][_0x467fb5('0x5a4')]=function(){const _0x11b09a=_0x467fb5;this[_0x11b09a('0x79a')]=this[_0x11b09a('0x866')];},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x789')]=function(){return this['_opacityDuration']>0x0;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x4a6')]=function(){const _0x9f1de1=_0x467fb5;this['_shadowSprite'][_0x9f1de1('0x735')]=this['_battler'][_0x9f1de1('0x11c')](),this[_0x9f1de1('0xc7')]();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0xc7')]=function(){const _0x7dcf37=_0x467fb5;if(!this[_0x7dcf37('0x145')])return;this[_0x7dcf37('0x145')]['y']=Math[_0x7dcf37('0x1b2')](-this['extraPositionY']()-0x2);},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x2ae')]=function(){const _0x39210f=_0x467fb5;if(this[_0x39210f('0x7b9')]===Sprite_SvEnemy)return;this[_0x39210f('0x632')](),this['finalizeScale']();},Sprite_Battler[_0x467fb5('0xc9')]['finalizeScale']=function(){const _0x232a0d=_0x467fb5,_0xfc40e5=this['_distortionSprite'];_0xfc40e5&&(_0xfc40e5['scale']['x']=this[_0x232a0d('0x748')](),_0xfc40e5[_0x232a0d('0x3e7')]['y']=this[_0x232a0d('0x689')]());},Sprite_Battler['prototype'][_0x467fb5('0x748')]=function(){const _0x35d051=_0x467fb5;let _0x426d5c=0x1;return _0x426d5c*=this[_0x35d051('0x651')],_0x426d5c*=this['_growX'],_0x426d5c;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x689')]=function(){const _0x264388=_0x467fb5;return 0x1*this[_0x264388('0x17d')];},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x445')]=function(){const _0xb121e1=_0x467fb5;return this[_0xb121e1('0x6c2')]*this[_0xb121e1('0x748')]();},Sprite_Battler['prototype']['mainSpriteHeight']=function(){const _0x495da2=_0x467fb5;return this[_0x495da2('0x41e')]*this['mainSpriteScaleY']();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x637')]=function(_0x25d465,_0x497311,_0x1882ca,_0xf392){const _0x40c54d=_0x467fb5;if(!this['canMove']())return;if(!this['_distortionSprite'])return;if(this['_targetGrowX']===_0x25d465&&this[_0x40c54d('0x724')]===_0x497311)return;this['_targetGrowX']=_0x25d465,this['_targetGrowY']=_0x497311,this[_0x40c54d('0x750')]=_0x1882ca,this[_0x40c54d('0x7f4')]=_0x1882ca,this['_growEasing']=_0xf392||_0x40c54d('0x2f7'),_0x1882ca<=0x0&&(this[_0x40c54d('0x6bc')]=this['_targetGrowX'],this[_0x40c54d('0x17d')]=this[_0x40c54d('0x724')]);},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x632')]=function(){const _0x471773=_0x467fb5;if(this[_0x471773('0x750')]<=0x0)return;if(!this[_0x471773('0x2e0')])return;const _0x1afd8b=this[_0x471773('0x750')],_0xeb877c=this[_0x471773('0x7f4')],_0x601f52=this[_0x471773('0x36c')];if(Imported[_0x471773('0x3e')]){if(_0x471773('0x85')===_0x471773('0x85'))this[_0x471773('0x6bc')]=this['applyEasing'](this[_0x471773('0x6bc')],this['_targetGrowX'],_0x1afd8b,_0xeb877c,_0x601f52),this[_0x471773('0x17d')]=this['applyEasing'](this[_0x471773('0x17d')],this['_targetGrowY'],_0x1afd8b,_0xeb877c,_0x601f52);else{function _0x4700dd(){const _0x3ba843=_0x471773;_0x36dd98['prototype'][_0x3ba843('0x741')][_0x3ba843('0x709')](this,_0x5eecc5,_0x292a80,_0x4cb6e0,_0x4ee4f5);}}}else{if(_0x471773('0x3')===_0x471773('0x47b')){function _0x948352(){const _0x2a6ec0=_0x471773;if(this['_phase']===_0x2a6ec0('0x221'))this[_0x2a6ec0('0x2b6')]();else this['_phase']===_0x2a6ec0('0x204')?this['updateForceAction']():_0x56be4d['BattleCore'][_0x2a6ec0('0xce')][_0x2a6ec0('0x709')](this,_0x212625);}}else this[_0x471773('0x6bc')]=(this[_0x471773('0x6bc')]*(_0x1afd8b-0x1)+this['_targetGrowX'])/_0x1afd8b,this[_0x471773('0x17d')]=(this[_0x471773('0x17d')]*(_0x1afd8b-0x1)+this[_0x471773('0x724')])/_0x1afd8b;}this[_0x471773('0x750')]--;if(this[_0x471773('0x750')]<=0x0)this[_0x471773('0x28c')]();},Sprite_Battler['prototype'][_0x467fb5('0x28c')]=function(){const _0x594e96=_0x467fb5;this[_0x594e96('0x6bc')]=this[_0x594e96('0x2c6')],this[_0x594e96('0x17d')]=this[_0x594e96('0x724')];},Sprite_Battler['prototype']['isGrowing']=function(){const _0x2f83a4=_0x467fb5;return this[_0x2f83a4('0x750')]>0x0;},Sprite_Battler[_0x467fb5('0xc9')]['startSkew']=function(_0x155f98,_0x2241d9,_0x94639d,_0x537d6d){const _0xb0c2e3=_0x467fb5;if(!this[_0xb0c2e3('0x6d5')]())return;if(!this['_distortionSprite'])return;if(this['_targetSkewX']===_0x155f98&&this['_targetSkewY']===_0x2241d9)return;this['_targetSkewX']=_0x155f98,this[_0xb0c2e3('0x6c8')]=_0x2241d9,this['_skewDuration']=_0x94639d,this[_0xb0c2e3('0x7b4')]=_0x94639d,this[_0xb0c2e3('0x42b')]=_0x537d6d||_0xb0c2e3('0x2f7'),_0x94639d<=0x0&&(this[_0xb0c2e3('0x2e0')]['skew']['x']=this[_0xb0c2e3('0x5bf')],this[_0xb0c2e3('0x2e0')]['skew']['y']=this[_0xb0c2e3('0x6c8')]);},Sprite_Battler[_0x467fb5('0xc9')]['updateSkew']=function(){const _0x5ebb66=_0x467fb5;if(this[_0x5ebb66('0x3cf')]<=0x0)return;if(!this[_0x5ebb66('0x2e0')])return;const _0x26f1f2=this['_skewDuration'],_0x4af0d9=this[_0x5ebb66('0x7b4')],_0x3421ef=this['_skewEasing'],_0x278a0a=this['_distortionSprite'];if(Imported[_0x5ebb66('0x3e')])_0x278a0a[_0x5ebb66('0xca')]['x']=this[_0x5ebb66('0x125')](_0x278a0a[_0x5ebb66('0xca')]['x'],this['_targetSkewX'],_0x26f1f2,_0x4af0d9,_0x3421ef),_0x278a0a[_0x5ebb66('0xca')]['y']=this[_0x5ebb66('0x125')](_0x278a0a['skew']['y'],this[_0x5ebb66('0x6c8')],_0x26f1f2,_0x4af0d9,_0x3421ef);else{if('qEvhR'==='qEvhR')_0x278a0a['skew']['x']=(_0x278a0a[_0x5ebb66('0xca')]['x']*(_0x26f1f2-0x1)+this['_targetSkewX'])/_0x26f1f2,_0x278a0a[_0x5ebb66('0xca')]['y']=(_0x278a0a[_0x5ebb66('0xca')]['y']*(_0x26f1f2-0x1)+this[_0x5ebb66('0x6c8')])/_0x26f1f2;else{function _0x24a504(){const _0x4f95d3=_0x5ebb66;this[_0x4f95d3('0x778')](_0x3c2e79[_0x4f95d3('0x729')]);}}}this[_0x5ebb66('0x3cf')]--;if(this[_0x5ebb66('0x3cf')]<=0x0)this[_0x5ebb66('0x2a6')]();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x2a6')]=function(){const _0x93f92d=_0x467fb5;this[_0x93f92d('0x2e0')][_0x93f92d('0xca')]['x']=this['_targetSkewX'],this[_0x93f92d('0x2e0')][_0x93f92d('0xca')]['y']=this[_0x93f92d('0x6c8')];},Sprite_Battler['prototype'][_0x467fb5('0x4c8')]=function(){const _0x9551bf=_0x467fb5;return this[_0x9551bf('0x3cf')]>0x0;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x76e')]=function(_0x343def,_0x100a54,_0x4e4e65,_0xbcbe1a){const _0x5502f8=_0x467fb5;if(!this[_0x5502f8('0x6d5')]())return;if(!this[_0x5502f8('0x2e0')])return;if(this['_targetAngle']===_0x343def)return;this['_targetAngle']=_0x343def,this[_0x5502f8('0x6a8')]=_0x100a54,this['_angleWholeDuration']=_0x100a54,this[_0x5502f8('0x1ea')]=_0x4e4e65||_0x5502f8('0x2f7'),this[_0x5502f8('0x408')]=_0xbcbe1a,this[_0x5502f8('0x408')]===undefined&&(this[_0x5502f8('0x408')]=!![]),_0x100a54<=0x0&&(this[_0x5502f8('0x21f')]=_0x343def,this['_angleRevertOnFinish']&&(this[_0x5502f8('0x1fb')]=0x0,this[_0x5502f8('0x21f')]=0x0));},Sprite_Battler[_0x467fb5('0xc9')]['updateSpin']=function(){const _0x1d556b=_0x467fb5;this[_0x1d556b('0x69e')](),this[_0x1d556b('0xcd')]();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x69e')]=function(){const _0x14bcd1=_0x467fb5;if(this['_angleDuration']<=0x0)return;const _0x32449c=this[_0x14bcd1('0x6a8')],_0x12c27a=this['_angleWholeDuration'],_0x12c4e8=this[_0x14bcd1('0x1ea')];if(Imported[_0x14bcd1('0x3e')])this[_0x14bcd1('0x21f')]=this[_0x14bcd1('0x125')](this[_0x14bcd1('0x21f')],this[_0x14bcd1('0x1fb')],_0x32449c,_0x12c27a,_0x12c4e8);else{if(_0x14bcd1('0x316')===_0x14bcd1('0x1e3')){function _0x333a63(){return!![];}}else this['_currentAngle']=(this[_0x14bcd1('0x21f')]*(_0x32449c-0x1)+this['_targetAngle'])/_0x32449c;}this[_0x14bcd1('0x6a8')]--;if(this[_0x14bcd1('0x6a8')]<=0x0)this['onAngleEnd']();},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x6f')]=function(){const _0xc339a4=_0x467fb5;this['_currentAngle']=this[_0xc339a4('0x1fb')];if(this[_0xc339a4('0x408')]){if(_0xc339a4('0x882')===_0xc339a4('0x882'))this[_0xc339a4('0x1fb')]=0x0,this[_0xc339a4('0x21f')]=0x0;else{function _0x544b7c(){return _0x5a2bc7;}}}},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x385')]=function(){const _0x53ac8a=_0x467fb5;return this[_0x53ac8a('0x6a8')]>0x0;},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0xcd')]=function(){const _0x4421fd=_0x467fb5;if(!this[_0x4421fd('0x2e0')])return;const _0x13cc92=this['_currentAngle'],_0x433bc5=this[_0x4421fd('0x3e7')]['x'],_0xe013f5=this[_0x4421fd('0x33a')]['isActor']()?-0x1:0x1;this[_0x4421fd('0x2e0')]['angle']=_0x13cc92*_0x433bc5*_0xe013f5;const _0x4728ff=this[_0x4421fd('0x2e0')][_0x4421fd('0x3e7')]['y'];this['_distortionSprite']['y']=this[_0x4421fd('0x41e')]*-0.5*(0x2-_0x4728ff);const _0x2eeec2=[this['_mainSprite'],this['_svBattlerSprite'],this[_0x4421fd('0x4b9')]];for(const _0x344a5f of _0x2eeec2){if(!_0x344a5f)continue;_0x344a5f['y']=this[_0x4421fd('0x41e')]*0.5;}this[_0x4421fd('0x145')]&&(this[_0x4421fd('0x145')][_0x4421fd('0x3e7')]['x']=this['_distortionSprite'][_0x4421fd('0x3e7')]['x'],this['_shadowSprite']['scale']['y']=this[_0x4421fd('0x2e0')][_0x4421fd('0x3e7')]['y']);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6e8')]=Sprite_Actor['prototype'][_0x467fb5('0x727')],Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x727')]=function(){const _0x20e9fd=_0x467fb5;VisuMZ[_0x20e9fd('0x15b')]['Sprite_Actor_createStateSprite'][_0x20e9fd('0x709')](this),VisuMZ[_0x20e9fd('0x15b')]['Settings'][_0x20e9fd('0x75b')][_0x20e9fd('0x5f8')]&&this[_0x20e9fd('0x166')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x72a')]=Sprite_Enemy[_0x467fb5('0xc9')]['createStateIconSprite'],Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x5a1')]=function(){const _0xd2884d=_0x467fb5;if(VisuMZ['BattleCore']['Settings'][_0xd2884d('0x75b')]['ShowEnemyGauge']){if(_0xd2884d('0x206')===_0xd2884d('0x206'))this[_0xd2884d('0x166')]();else{function _0x64c9e(){const _0xcd24f2=_0xd2884d;return this[_0xcd24f2('0x8e4')](_0x21a4c4);}}}VisuMZ[_0xd2884d('0x15b')][_0xd2884d('0x72a')][_0xd2884d('0x709')](this);},Sprite_Battler['prototype'][_0x467fb5('0x166')]=function(){const _0x3017b2=_0x467fb5;if(!ConfigManager['visualHpGauge'])return;if(this['constructor']===Sprite_SvEnemy)return;const _0x4b2ac2=VisuMZ[_0x3017b2('0x15b')][_0x3017b2('0x110')][_0x3017b2('0x75b')],_0x489148=new Sprite_HpGauge();_0x489148[_0x3017b2('0x1d6')]['x']=_0x4b2ac2[_0x3017b2('0x124')],_0x489148[_0x3017b2('0x1d6')]['y']=_0x4b2ac2['AnchorY'],_0x489148[_0x3017b2('0x3e7')]['x']=_0x489148[_0x3017b2('0x3e7')]['y']=_0x4b2ac2['Scale'],this[_0x3017b2('0x3a2')]=_0x489148,this[_0x3017b2('0x209')](this[_0x3017b2('0x3a2')]);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x2c2')]=Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x1f2')],Sprite_Battler['prototype'][_0x467fb5('0x1f2')]=function(_0x3ada06){const _0x2f7ef2=_0x467fb5;VisuMZ['BattleCore']['Sprite_Battler_setBattler'][_0x2f7ef2('0x709')](this,_0x3ada06),this[_0x2f7ef2('0x4b0')](_0x3ada06);},Sprite_Battler['prototype']['setupHpGaugeSprite']=function(_0x1ea2ac){const _0x4360fb=_0x467fb5;if(!_0x1ea2ac)return;if(!this[_0x4360fb('0x3a2')])return;if(_0x1ea2ac[_0x4360fb('0x317')]()){}else{if(_0x1ea2ac[_0x4360fb('0x8c6')]()){if(this['constructor']===Sprite_SvEnemy&&!_0x1ea2ac['hasSvBattler']())return;}}this[_0x4360fb('0x3a2')]['setup'](_0x1ea2ac,'hp');},Sprite_Battler['prototype']['updateHpGaugePosition']=function(){const _0x380626=_0x467fb5;if(!this['_battler'])return;if(!this[_0x380626('0x3a2')])return;const _0x1ec962=VisuMZ[_0x380626('0x15b')][_0x380626('0x110')][_0x380626('0x75b')],_0x5e9b46=this[_0x380626('0x3a2')];_0x5e9b46[_0x380626('0x735')]=this[_0x380626('0x8ae')]();const _0x2164b4=_0x1ec962[_0x380626('0x4f2')],_0x147810=_0x1ec962['OffsetY'];_0x5e9b46['x']=_0x2164b4,_0x5e9b46['x']+=this[_0x380626('0x33a')][_0x380626('0x377')](),_0x5e9b46['y']=-this[_0x380626('0x41e')]+_0x147810,_0x5e9b46['y']+=this[_0x380626('0x33a')][_0x380626('0x179')]();},Sprite_Battler['prototype']['isVisualHpGaugeDisplayed']=function(){const _0x26cdbd=_0x467fb5;if(!this[_0x26cdbd('0x33a')])return![];if(this[_0x26cdbd('0x33a')][_0x26cdbd('0x317')]())return!![];const _0x734884=this[_0x26cdbd('0x33a')]['enemy']()['note'];if(_0x734884[_0x26cdbd('0x5e2')](/<SHOW HP GAUGE>/i))return!![];if(_0x734884['match'](/<HIDE HP GAUGE>/i))return![];const _0x4ce704=VisuMZ[_0x26cdbd('0x15b')][_0x26cdbd('0x110')][_0x26cdbd('0x75b')];if(_0x4ce704[_0x26cdbd('0x6a1')]){if(_0x26cdbd('0x333')!==_0x26cdbd('0x41')){if(_0x4ce704[_0x26cdbd('0x59d')]&&BattleManager[_0x26cdbd('0x87f')]())return!![];if(this[_0x26cdbd('0x33a')][_0x26cdbd('0x40b')])return![];return this[_0x26cdbd('0x33a')][_0x26cdbd('0x4e5')]();}else{function _0x493634(){const _0x17db83=_0x26cdbd;return _0x17db83('0x2f');}}}return!![];},VisuMZ['BattleCore']['Sprite_Battler_isMoving']=Sprite_Battler[_0x467fb5('0xc9')]['isMoving'],Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x84b')]=function(){const _0x453e6f=_0x467fb5;if(!this['_battler'])return![];return VisuMZ[_0x453e6f('0x15b')][_0x453e6f('0x6b')][_0x453e6f('0x709')](this);},VisuMZ['BattleCore'][_0x467fb5('0x1ba')]=Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x383')],Sprite_Battler['prototype'][_0x467fb5('0x383')]=function(_0x3f66e2,_0x440ed8,_0xd78205){const _0x42ae60=_0x467fb5;if(this[_0x42ae60('0x6d5')]()){if(_0x42ae60('0x5ea')!=='TUTls'){function _0x2d680a(){const _0x1be3ff=_0x42ae60;this[_0x1be3ff('0x33a')][_0x1be3ff('0x4b2')]()&&this['createDamageSprite']();}}else VisuMZ['BattleCore'][_0x42ae60('0x1ba')][_0x42ae60('0x709')](this,_0x3f66e2,_0x440ed8,_0xd78205);}},Sprite_Battler[_0x467fb5('0xc9')]['canMove']=function(){const _0xf24881=_0x467fb5;if(this[_0xf24881('0x33a')]&&this['_battler'][_0xf24881('0xb2')]())return![];if(this['_battler']&&!this['_battler']['canBattlerMove']())return![];return $gameSystem[_0xf24881('0xe1')]();},Sprite_Battler['prototype'][_0x467fb5('0x797')]=function(){},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x6b0')]=function(){this['startMove'](0x0,0x0,0xc);},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x7aa')]=function(){},Sprite_Battler[_0x467fb5('0xc9')][_0x467fb5('0x38e')]=function(){const _0x177c10=_0x467fb5,_0x52dcb6=VisuMZ['BattleCore']['Settings'][_0x177c10('0x231')],_0x50032b=this[_0x177c10('0x33a')]&&this[_0x177c10('0x33a')][_0x177c10('0x317')]()?0x1:-0x1,_0x291f98=this['_baseX']-this[_0x177c10('0x1a')]+_0x50032b*_0x52dcb6[_0x177c10('0x490')],_0x2c117c=this[_0x177c10('0x345')]-this['_homeY']+_0x50032b*_0x52dcb6['FlinchDistanceY'],_0x8feae8=_0x52dcb6[_0x177c10('0x256')];this[_0x177c10('0x383')](_0x291f98,_0x2c117c,_0x8feae8);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6eb')]=Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x6d1')],Sprite_Actor[_0x467fb5('0xc9')]['initMembers']=function(){const _0x299b32=_0x467fb5;VisuMZ[_0x299b32('0x15b')][_0x299b32('0x6eb')][_0x299b32('0x709')](this),this['attachSpritesToDistortionSprite']();},Sprite_Actor[_0x467fb5('0xc9')]['mainSprite']=function(){const _0x19a4a9=_0x467fb5;return this[_0x19a4a9('0x2e0')]||this[_0x19a4a9('0x3ad')]||this;},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x58')]=Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0xba')],Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0xba')]=function(){},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x33b')]=function(_0x4f6134){const _0x2299b8=_0x467fb5;if(SceneManager[_0x2299b8('0x5e6')]())return;if(!_0x4f6134)return;if(!_0x4f6134['canMove']())return;VisuMZ[_0x2299b8('0x15b')][_0x2299b8('0x58')][_0x2299b8('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3d9')]=Sprite_Actor[_0x467fb5('0xc9')]['setActorHome'],Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x531')]=function(_0xb7d82d){const _0x34b680=_0x467fb5;if(VisuMZ[_0x34b680('0x15b')][_0x34b680('0x110')][_0x34b680('0x231')][_0x34b680('0x533')]){if(_0x34b680('0x52e')!==_0x34b680('0x29d'))VisuMZ['BattleCore'][_0x34b680('0x110')][_0x34b680('0x231')]['HomePosJS']['call'](this,_0xb7d82d);else{function _0x3ab62e(){const _0x1bc387=_0x34b680,_0x5a4f19=_0x483e79[_0x1bc387('0x15b')][_0x1bc387('0x110')][_0x1bc387('0x3a0')];let _0x56e1e3=![];_0x406757[_0x1bc387('0xe1')]()?_0x56e1e3=_0x5a4f19[_0x1bc387('0x6a')]:_0x56e1e3=_0x5a4f19[_0x1bc387('0x82a')],this[_0x1bc387('0x736')](_0x56e1e3?this[_0x1bc387('0x659')]()-0x1:0x0);}}}else VisuMZ[_0x34b680('0x15b')][_0x34b680('0x3d9')]['call'](this,_0xb7d82d);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x7e2')]=Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x1f2')],Sprite_Actor['prototype'][_0x467fb5('0x1f2')]=function(_0x3e87da){const _0x4688e1=_0x467fb5;VisuMZ[_0x4688e1('0x15b')]['Sprite_Actor_setBattler']['call'](this,_0x3e87da),this[_0x4688e1('0x38d')](_0x3e87da);},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x38d')]=function(_0x1ac35c){const _0xbda1ba=_0x467fb5;if(!_0x1ac35c)return;if(!this[_0xbda1ba('0x3ad')])return;this[_0xbda1ba('0x3ad')]['anchor']['x']=this[_0xbda1ba('0x621')][_0xbda1ba('0x232')](),this['_mainSprite'][_0xbda1ba('0x1d6')]['y']=this[_0xbda1ba('0x621')][_0xbda1ba('0x586')](),this[_0xbda1ba('0x123')]();},VisuMZ[_0x467fb5('0x15b')]['Sprite_Actor_update']=Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x280')],Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x280')]=function(){const _0x5dff57=_0x467fb5;VisuMZ[_0x5dff57('0x15b')][_0x5dff57('0x172')][_0x5dff57('0x709')](this),this[_0x5dff57('0x621')]&&(this[_0x5dff57('0x6a3')](),this['updateStyleOpacity']());},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x8a0')]=Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x4a7')],Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x4a7')]=function(){const _0x1ac64f=_0x467fb5;VisuMZ[_0x1ac64f('0x15b')][_0x1ac64f('0x8a0')][_0x1ac64f('0x709')](this);if(this[_0x1ac64f('0x3ad')]&&this[_0x1ac64f('0x3ad')][_0x1ac64f('0x30a')]&&this[_0x1ac64f('0x33a')]){if('KbqEv'===_0x1ac64f('0x47')){function _0x31b6aa(){const _0x4d9dbc=_0x1ac64f;_0x5de92b[_0x4d9dbc('0x15b')][_0x4d9dbc('0x608')][_0x4d9dbc('0x709')](this,_0x7d8a8e),_0x486806['BattleCore'][_0x4d9dbc('0x795')](_0x1dd258);}}else{if(this['_mainSprite'][_0x1ac64f('0x30a')][_0x1ac64f('0x83e')]!==this[_0x1ac64f('0x33a')][_0x1ac64f('0x7f9')]()){if(_0x1ac64f('0x5f9')!==_0x1ac64f('0x5f9')){function _0x57ff15(){_0x460187+=_0x24ff6b(_0x6f61ba['$1']);}}else this['_mainSprite'][_0x1ac64f('0x30a')]['smooth']=this['_battler'][_0x1ac64f('0x7f9')]();}}}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x2f6')]=Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x4a6')],Sprite_Actor[_0x467fb5('0xc9')]['updateShadow']=function(){const _0x10e60b=_0x467fb5;VisuMZ[_0x10e60b('0x15b')][_0x10e60b('0x2f6')]['call'](this),this[_0x10e60b('0x798')]();},Sprite_Actor['prototype'][_0x467fb5('0x798')]=function(){const _0x1c239a=_0x467fb5;if(!this['_mainSprite'])return;if(!this[_0x1c239a('0x145')])return;this[_0x1c239a('0x123')](),this[_0x1c239a('0xc7')]();},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x6a3')]=function(){const _0x561a7b=_0x467fb5;this[_0x561a7b('0x520')][_0x561a7b('0x3e7')]['x']=0x1/(this['scale']['x']||0.001),this['_stateSprite'][_0x561a7b('0x3e7')]['y']=0x1/(this[_0x561a7b('0x3e7')]['y']||0.001);},Sprite_Actor['prototype'][_0x467fb5('0x454')]=function(){const _0x3f8161=_0x467fb5;if(!$gameSystem[_0x3f8161('0xe1')]()&&this[_0x3f8161('0x7b9')]===Sprite_Actor){const _0x2071c0=Scene_Battle[_0x3f8161('0xc9')][_0x3f8161('0x435')]();[_0x3f8161('0x549'),_0x3f8161('0x34c'),_0x3f8161('0x82'),_0x3f8161('0x5bc')]['includes'](_0x2071c0)&&(this[_0x3f8161('0x79a')]=0x0);}},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x1d2')]=function(){const _0x2e5ff8=_0x467fb5,_0x4b7f51=this[_0x2e5ff8('0x621')];if(_0x4b7f51){if(_0x2e5ff8('0x2ce')!==_0x2e5ff8('0x2ce')){function _0xb7c4cb(){const _0x27938b=_0x2e5ff8;if(_0x1f0724[_0x27938b('0x870')]()[_0x27938b('0x546')]>0x0)return!![];this[_0x27938b('0x725')]='';}}else{const _0x4adfb5=_0x4b7f51['stateMotionIndex']();if(_0x4b7f51['isInputting']()||_0x4b7f51['isActing']())this[_0x2e5ff8('0x156')]('walk');else{if(_0x4adfb5===0x3){if('rODYO'==='NbqZc'){function _0x47c923(){const _0x3493e7=_0x2e5ff8;return _0x216c27['BattleCore'][_0x3493e7('0x110')][_0x3493e7('0x264')][_0x3493e7('0x1dc')];}}else this[_0x2e5ff8('0x156')](_0x2e5ff8('0x32f'));}else{if(_0x4adfb5===0x2)this['startMotion'](_0x2e5ff8('0x4d0'));else{if(this['forceEscapeSprite']){if(_0x2e5ff8('0xa9')==='cEHcC'){function _0x39ac6a(){const _0x4f560b=_0x2e5ff8;this[_0x4f560b('0x6d3')]=_0x2d3110[_0x4f560b('0x35e')],this['processBattleCoreJS'](_0x4f560b('0x780')),_0xb71f9e[_0x4f560b('0x15b')][_0x4f560b('0x73')][_0x4f560b('0x709')](this),this[_0x4f560b('0x4c1')](_0x4f560b('0x31a'));}}else this[_0x2e5ff8('0x156')](_0x2e5ff8('0x26d'));}else{if(_0x4b7f51['isCharging']()){if(_0x2e5ff8('0x7d2')!=='Gkvrm')this[_0x2e5ff8('0x156')](_0x2e5ff8('0x246'));else{function _0x4054ea(){const _0x1efaf4=_0x2e5ff8;_0x41434b['_autoBattle']=!![],_0x3f7278['makeActions'](),this[_0x1efaf4('0x79e')](),_0x520cf0[_0x1efaf4('0x847')]()&&(_0x349886[_0x1efaf4('0x6de')]=![]);}}}else{if(_0x4b7f51['isChanting']())this['startMotion'](_0x2e5ff8('0x455'));else{if(_0x4b7f51[_0x2e5ff8('0x351')]()||_0x4b7f51[_0x2e5ff8('0x28e')]())this[_0x2e5ff8('0x156')](_0x2e5ff8('0x560'));else{if(_0x4adfb5===0x1){if('JvKTl'!==_0x2e5ff8('0x734'))this[_0x2e5ff8('0x156')](_0x2e5ff8('0x434'));else{function _0xb9bfdd(){const _0x3a1650=_0x2e5ff8;return this[_0x3a1650('0x98')]()['name']!=='';}}}else{if(_0x4b7f51[_0x2e5ff8('0x8e3')]())this[_0x2e5ff8('0x156')](_0x2e5ff8('0x16d'));else{if(_0x4b7f51['isUndecided']())this[_0x2e5ff8('0x156')](_0x2e5ff8('0x898'));else{if(_0x4b7f51['currentAction']()){if(_0x2e5ff8('0x23d')===_0x2e5ff8('0x23d'))this['startMotion'](_0x2e5ff8('0x246'));else{function _0x366221(){const _0x2f8eb0=_0x2e5ff8;if(!this['_mainSprite'])return;if(!this[_0x2f8eb0('0x145')])return;this[_0x2f8eb0('0x123')](),this[_0x2f8eb0('0xc7')]();}}}else{if(_0x2e5ff8('0x89b')===_0x2e5ff8('0x7ab')){function _0x3bdfbf(){const _0x3b594b=_0x2e5ff8;if(!_0xd6b900[_0x3b594b('0xe1')]())return;this[_0x3b594b('0xb7')]=_0x118da6;const _0xf6efaa=this[_0x3b594b('0x67b')]();if(_0xf6efaa)_0xf6efaa[_0x3b594b('0x396')]();}}else this[_0x2e5ff8('0x156')](_0x2e5ff8('0x898'));}}}}}}}}}}}}}},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x7aa')]=function(){const _0x4e5588=_0x467fb5,_0x4d0c37=0xa,_0x95ddab=0x12c*_0x4d0c37,_0x4d29e3=0x1e*_0x4d0c37;this[_0x4e5588('0x383')](_0x95ddab,0x0,_0x4d29e3);},Sprite_Actor[_0x467fb5('0xc9')]['onMoveEnd']=function(){const _0xc9997a=_0x467fb5;Sprite_Battler[_0xc9997a('0xc9')][_0xc9997a('0x60f')][_0xc9997a('0x709')](this);},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x8a2')]=function(){const _0x33c5f1=_0x467fb5;return Sprite_Battler[_0x33c5f1('0xf7')];},Sprite_Weapon[_0x467fb5('0xc9')][_0x467fb5('0x2f0')]=function(){const _0x4cd77f=_0x467fb5;return Sprite_Battler[_0x4cd77f('0xf7')];},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x3d4')]=function(){},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x340')]=function(){},Sprite_Actor[_0x467fb5('0xc9')]['updateMotionCount']=function(){const _0x1344cf=_0x467fb5;if(this['_motion']&&++this[_0x1344cf('0x444')]>=this[_0x1344cf('0x8a2')]()){if(this[_0x1344cf('0x71b')][_0x1344cf('0x70f')])this['_pattern']=(this['_pattern']+0x1)%0x4;else this[_0x1344cf('0x320')]<0x2?this['_pattern']++:this[_0x1344cf('0x1d2')]();this[_0x1344cf('0x444')]=0x0;}},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x684')]=function(_0x4c12d4){const _0x58d8f8=_0x467fb5;if(_0x4c12d4===_0x58d8f8('0x4d'))this[_0x58d8f8('0x61c')]=!![];if(this[_0x58d8f8('0x33a')]&&this[_0x58d8f8('0x33a')][_0x58d8f8('0xb2')]()){this[_0x58d8f8('0x71b')]=Sprite_Actor[_0x58d8f8('0x8a')][_0x58d8f8('0x32f')];return;}const _0x51d914=Sprite_Actor[_0x58d8f8('0x8a')][_0x4c12d4];this[_0x58d8f8('0x71b')]=_0x51d914,this[_0x58d8f8('0x444')]=0x0,this[_0x58d8f8('0x320')]=0x0;},Sprite_Actor['prototype']['forceWeaponAnimation']=function(_0x2ddb10){const _0x405411=_0x467fb5;this[_0x405411('0x215')](),this[_0x405411('0x1a7')][_0x405411('0x6c6')](_0x2ddb10),this['_actor'][_0x405411('0x257')]();},Sprite_Actor['prototype']['adjustWeaponSpriteOffset']=function(){const _0xd0e04=_0x467fb5;let _0x4d176f=-0x10,_0x1e23e0=this['height']*0.5;const _0x47e514=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x914ff6=this[_0xd0e04('0x33a')][_0xd0e04('0x4f3')]()[_0xd0e04('0xae')](_0x4b7e36=>_0x4b7e36&&_0x4b7e36[_0xd0e04('0x50e')][_0xd0e04('0x5e2')](_0x47e514)?Number(RegExp['$1']):0x0),_0x970680=this[_0xd0e04('0x33a')]['traitObjects']()[_0xd0e04('0xae')](_0x4022c2=>_0x4022c2&&_0x4022c2[_0xd0e04('0x50e')][_0xd0e04('0x5e2')](_0x47e514)?Number(RegExp['$2']):0x0);_0x4d176f=_0x914ff6[_0xd0e04('0x313')]((_0x261d06,_0x200adf)=>_0x261d06+_0x200adf,_0x4d176f),_0x1e23e0=_0x970680[_0xd0e04('0x313')]((_0x1d03ca,_0x58f7ef)=>_0x1d03ca+_0x58f7ef,_0x1e23e0),this[_0xd0e04('0x1a7')]['x']=_0x4d176f,this[_0xd0e04('0x1a7')]['y']=_0x1e23e0,this[_0xd0e04('0x1a7')]['update']();},Sprite_Weapon['prototype'][_0x467fb5('0x6c6')]=function(_0x1f020b){const _0x2512a2=_0x467fb5;this['_weaponImageId']=_0x1f020b,this[_0x2512a2('0x6ea')]=-0x1,this[_0x2512a2('0x320')]=0x0,this['loadBitmap'](),this[_0x2512a2('0x84f')]();},Sprite_Actor[_0x467fb5('0xc9')]['updateTargetPosition']=function(){},Sprite_Actor['prototype'][_0x467fb5('0x797')]=function(){const _0x3e1e06=_0x467fb5,_0x2fc0d7=VisuMZ[_0x3e1e06('0x15b')]['Settings']['ActionSequence'],_0x3c3e1e=_0x2fc0d7[_0x3e1e06('0x4ba')],_0x7b6795=_0x2fc0d7[_0x3e1e06('0x60d')],_0x5734f3=_0x2fc0d7[_0x3e1e06('0xe0')];this['startMove'](-_0x3c3e1e,-_0x7b6795,_0x5734f3);},VisuMZ[_0x467fb5('0x15b')]['Sprite_Actor_updateFrame']=Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x84f')],Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x84f')]=function(){const _0xd74b9e=_0x467fb5;this[_0xd74b9e('0x1b1')](),VisuMZ[_0xd74b9e('0x15b')][_0xd74b9e('0x52')][_0xd74b9e('0x709')](this);},Sprite_Actor[_0x467fb5('0xc9')][_0x467fb5('0x1b1')]=function(){const _0x35f2e1=_0x467fb5;if(this[_0x35f2e1('0x33a')]&&this['_battler'][_0x35f2e1('0x220')]){if(_0x35f2e1('0x840')!==_0x35f2e1('0x99')){const _0xaa1822=this[_0x35f2e1('0x33a')][_0x35f2e1('0x220')];this['_motion']=Sprite_Actor[_0x35f2e1('0x8a')][_0xaa1822[_0x35f2e1('0x2ac')]],this[_0x35f2e1('0x320')]=_0xaa1822[_0x35f2e1('0x165')];const _0x1343f1=this[_0x35f2e1('0x1a7')];_0x1343f1[_0x35f2e1('0x728')](_0xaa1822[_0x35f2e1('0x729')],_0xaa1822[_0x35f2e1('0x165')]),this['adjustWeaponSpriteOffset']();}else{function _0x43ee96(){const _0x40bf7a=_0x35f2e1;this['_partyCommandWindow'][_0x40bf7a('0x6c6')](),this[_0x40bf7a('0x402')]['close']();}}}},Sprite_Weapon[_0x467fb5('0xc9')]['freezeFrame']=function(_0x4391ad,_0x251646){const _0x177b93=_0x467fb5;this['_weaponImageId']=_0x4391ad,this[_0x177b93('0x6ea')]=-Infinity,this[_0x177b93('0x320')]=_0x251646,this['loadBitmap'](),this[_0x177b93('0x84f')]();},Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x6d1')]=function(){const _0x39c617=_0x467fb5;Sprite_Battler['prototype'][_0x39c617('0x6d1')][_0x39c617('0x709')](this),this[_0x39c617('0x311')]=null,this['_appeared']=![],this[_0x39c617('0x662')]='',this[_0x39c617('0x258')]=0x0,this[_0x39c617('0x1b')]=null,this['_effectDuration']=0x0,this[_0x39c617('0x6dd')]=0x0,this[_0x39c617('0x768')](),this[_0x39c617('0x5a1')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x309')]=Sprite_Enemy['prototype'][_0x467fb5('0x280')],Sprite_Enemy['prototype'][_0x467fb5('0x280')]=function(){const _0x22bc58=_0x467fb5;VisuMZ[_0x22bc58('0x15b')][_0x22bc58('0x309')]['call'](this),this[_0x22bc58('0x123')]();},Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x768')]=function(){const _0x52025d=_0x467fb5;this['_mainSprite']=new Sprite(),this[_0x52025d('0x3ad')][_0x52025d('0x1d6')]['x']=0.5,this['_mainSprite']['anchor']['y']=0x1,this[_0x52025d('0x209')](this[_0x52025d('0x3ad')]),this[_0x52025d('0x225')]();},Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x66')]=function(){const _0x745047=_0x467fb5;return this[_0x745047('0x2e0')]||this[_0x745047('0x3ad')]||this;},Sprite_Enemy[_0x467fb5('0xc9')]['loadBitmap']=function(_0x107efe){const _0x4dfa1d=_0x467fb5;this[_0x4dfa1d('0x30a')]=new Bitmap(0x1,0x1);if($gameSystem[_0x4dfa1d('0xe1')]())this['_mainSprite'][_0x4dfa1d('0x30a')]=ImageManager[_0x4dfa1d('0x5c5')](_0x107efe);else{if(_0x4dfa1d('0x151')===_0x4dfa1d('0x607')){function _0x229e89(){const _0x36db7d=_0x4dfa1d,_0x693d26=_0x57c54d(_0x504c02['$1']);return _0x2907a2[_0x36db7d('0x4dd')]()['filter'](_0x4a3a8d=>_0x4a3a8d[_0x36db7d('0x78c')]()===_0x693d26);}}else this['_mainSprite'][_0x4dfa1d('0x30a')]=ImageManager[_0x4dfa1d('0xb4')](_0x107efe);}this[_0x4dfa1d('0x3ad')][_0x4dfa1d('0x30a')]['addLoadListener'](this[_0x4dfa1d('0x73f')][_0x4dfa1d('0x3c1')](this));},Sprite_Enemy[_0x467fb5('0xc9')]['createEmptyBitmap']=function(){const _0x33815b=_0x467fb5,_0x113b44=this['_mainSprite'][_0x33815b('0x30a')];if(_0x113b44){if(_0x33815b('0xdc')===_0x33815b('0x410')){function _0x1b9c1e(){_0x447337=_0x49cff7['FrontViewSelect'];}}else this[_0x33815b('0x30a')]=new Bitmap(_0x113b44[_0x33815b('0x6c2')],_0x113b44[_0x33815b('0x41e')]);}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x706')]=Sprite_Enemy[_0x467fb5('0xc9')]['setHue'],Sprite_Enemy['prototype'][_0x467fb5('0x17c')]=function(_0x4f81b2){const _0x11faa0=_0x467fb5;this['_mainSprite']&&this[_0x11faa0('0x3ad')][_0x11faa0('0x17c')](_0x4f81b2);},VisuMZ[_0x467fb5('0x15b')]['Sprite_Enemy_initVisibility']=Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x86b')],Sprite_Enemy[_0x467fb5('0xc9')]['initVisibility']=function(){const _0x3201fd=_0x467fb5;if(this[_0x3201fd('0xfe')]()){if('AKPPS'==='AKPPS')VisuMZ[_0x3201fd('0x15b')][_0x3201fd('0x3f0')][_0x3201fd('0x709')](this);else{function _0x3002ad(){this['addPartyCommand']();}}}else this[_0x3201fd('0x5bd')]=!this[_0x3201fd('0x311')][_0x3201fd('0x8c2')](),!this[_0x3201fd('0x5bd')]&&(this[_0x3201fd('0x79a')]=0x0);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x7f5')]=Sprite_Enemy['prototype'][_0x467fb5('0x4ad')],Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x4ad')]=function(){const _0x1600f9=_0x467fb5;if(this[_0x1600f9('0xfe')]())VisuMZ[_0x1600f9('0x15b')]['Sprite_Enemy_updateCollapse'][_0x1600f9('0x709')](this);},Sprite_Enemy[_0x467fb5('0xc9')]['updateFrame']=function(){const _0x21f7c1=_0x467fb5;Sprite_Battler[_0x21f7c1('0xc9')][_0x21f7c1('0x84f')][_0x21f7c1('0x709')](this);const _0x58a0e5=this[_0x21f7c1('0x66')]()||this;if(!_0x58a0e5)return;!_0x58a0e5['bitmap']&&(_0x58a0e5[_0x21f7c1('0x30a')]=new Bitmap(this[_0x21f7c1('0x6c2')],this[_0x21f7c1('0x41e')]));if(this[_0x21f7c1('0x1b')]===_0x21f7c1('0x2ca'))this[_0x21f7c1('0x3ad')][_0x21f7c1('0x874')](0x0,0x0,this['_mainSprite'][_0x21f7c1('0x6c2')],this[_0x21f7c1('0x8a1')]);else{if('hJMWU'==='xHCnQ'){function _0x41c9bc(){const _0x1c73e8=_0x21f7c1;if(!_0x3d6bb4[_0x1c73e8('0x21')]())return;if(!this[_0x1c73e8('0x4a8')])this[_0x1c73e8('0xdb')]();this[_0x1c73e8('0x26c')]();const _0x3ef87e=this[_0x1c73e8('0x67b')]();if(_0x3ef87e)_0x3ef87e['setupDamagePopup']();}}else _0x58a0e5[_0x21f7c1('0x874')](0x0,0x0,_0x58a0e5[_0x21f7c1('0x30a')][_0x21f7c1('0x6c2')],this['bitmap'][_0x21f7c1('0x41e')]);}},VisuMZ['BattleCore'][_0x467fb5('0x218')]=Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x740')],Sprite_Enemy[_0x467fb5('0xc9')]['updateBossCollapse']=function(){const _0x583b57=_0x467fb5;if(this[_0x583b57('0xfe')]())VisuMZ[_0x583b57('0x15b')][_0x583b57('0x218')]['call'](this);},Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x84b')]=function(){const _0x527190=_0x467fb5;return Sprite_Battler[_0x527190('0xc9')][_0x527190('0x84b')][_0x527190('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3d3')]=Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x6a3')],Sprite_Enemy['prototype']['updateStateSprite']=function(){const _0xe8dae7=_0x467fb5;VisuMZ[_0xe8dae7('0x15b')][_0xe8dae7('0x3d3')][_0xe8dae7('0x709')](this),this[_0xe8dae7('0xc')]();},Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0xc')]=function(){const _0x2e3aa7=_0x467fb5;this['_stateIconSprite']['x']=0x0,this[_0x2e3aa7('0x697')]['x']+=this[_0x2e3aa7('0x33a')][_0x2e3aa7('0x377')](),this[_0x2e3aa7('0x697')]['y']=-this[_0x2e3aa7('0x30a')][_0x2e3aa7('0x41e')]-this[_0x2e3aa7('0x697')][_0x2e3aa7('0x41e')],this[_0x2e3aa7('0x697')]['y']+=this[_0x2e3aa7('0x33a')][_0x2e3aa7('0x179')](),this[_0x2e3aa7('0x697')][_0x2e3aa7('0x3e7')]['x']=0x1/(this[_0x2e3aa7('0x3e7')]['x']||0.001),this[_0x2e3aa7('0x697')][_0x2e3aa7('0x3e7')]['y']=0x1/(this['scale']['y']||0.001),this[_0x2e3aa7('0x11c')]()&&(this[_0x2e3aa7('0x48e')][_0x2e3aa7('0x520')][_0x2e3aa7('0x3e7')]['x']=-0x1/(this[_0x2e3aa7('0x3e7')]['x']||0.001),this[_0x2e3aa7('0x48e')][_0x2e3aa7('0x520')]['scale']['y']=0x1/(this[_0x2e3aa7('0x3e7')]['y']||0.001));},VisuMZ['BattleCore'][_0x467fb5('0x813')]=Sprite_Enemy['prototype'][_0x467fb5('0x1f2')],Sprite_Enemy['prototype'][_0x467fb5('0x1f2')]=function(_0x271450){const _0x3e6919=_0x467fb5;VisuMZ[_0x3e6919('0x15b')][_0x3e6919('0x813')][_0x3e6919('0x709')](this,_0x271450),this['setSvBattlerSprite'](_0x271450);},Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x14a')]=function(_0x19f408){const _0x15f106=_0x467fb5;if(!this[_0x15f106('0x48e')]){if(_0x15f106('0x64b')!==_0x15f106('0x640'))this[_0x15f106('0x48e')]=new Sprite_SvEnemy(_0x19f408),this[_0x15f106('0x225')]();else{function _0x413105(){const _0x4ca3fe=_0x15f106;this[_0x4ca3fe('0x320')]++;}}}this['_svBattlerSprite'][_0x15f106('0x1f2')](_0x19f408);},Sprite_Enemy[_0x467fb5('0xc9')]['hasSvBattler']=function(){const _0x63b56a=_0x467fb5;return this['_enemy']&&this[_0x63b56a('0x311')][_0x63b56a('0x11c')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x50d')]=Sprite_Enemy['prototype'][_0x467fb5('0xde')],Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0xde')]=function(_0x2621c1){const _0x4534b9=_0x467fb5;if(this[_0x4534b9('0x11c')]()){const _0x5a9c11=this['_enemy']['svBattlerData']();this['bitmap']=new Bitmap(_0x5a9c11[_0x4534b9('0x6c2')],_0x5a9c11[_0x4534b9('0x41e')]);}else VisuMZ[_0x4534b9('0x15b')][_0x4534b9('0x50d')][_0x4534b9('0x709')](this,_0x2621c1);},Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0xfe')]=function(){const _0x364099=_0x467fb5;if(this[_0x364099('0x11c')]()){if(_0x364099('0xe6')===_0x364099('0x8ce')){function _0x11c885(){const _0x1ad423=_0x364099;let _0x292feb=_0x42a89d(_0x184682['$1']);while(_0x292feb--){_0x385689[_0x1ad423('0x26f')](this[_0x1ad423('0x5be')]()[_0x1ad423('0x78e')]());}return this[_0x1ad423('0x717')](_0x50f39d);}}else return this['_enemy'][_0x364099('0xfe')]();}else{if(_0x364099('0x502')===_0x364099('0x72f')){function _0x142f9a(){const _0xe53329=_0x364099;for(const _0xe8125c of _0x450ba6){const _0x561b1a=_0x337bfa[0x0]['format'](_0xe8125c[0x0],_0x24b45c[0x0]),_0x4e3464=_0x4d7ee3[0x1][_0xe53329('0x11')](_0xe8125c[0x1],_0x378441[0x1])[_0xe53329('0x23e')](),_0x555034=new _0xfe2c3c(_0x2e5321[_0xe53329('0x11')](_0x4e3464),'i');_0x4b8eda[_0x561b1a]=_0x555034;}}}else return!![];}},Sprite_Enemy['prototype'][_0x467fb5('0x1d2')]=function(){const _0x338210=_0x467fb5;if(this[_0x338210('0x11c')]())this[_0x338210('0x48e')]['refreshMotion']();},Sprite_Enemy[_0x467fb5('0xc9')][_0x467fb5('0x684')]=function(_0x43552b){const _0x1a5621=_0x467fb5;if(this[_0x1a5621('0x11c')]())this['_svBattlerSprite']['forceMotion'](_0x43552b);},Sprite_Enemy[_0x467fb5('0xc9')]['forceWeaponAnimation']=function(_0x2c3340){const _0x9a1286=_0x467fb5;if(this[_0x9a1286('0x11c')]())this[_0x9a1286('0x48e')][_0x9a1286('0xea')](_0x2c3340);},Sprite_Enemy[_0x467fb5('0xc9')]['stepForward']=function(){const _0x2325e1=_0x467fb5,_0x1eb143=VisuMZ[_0x2325e1('0x15b')][_0x2325e1('0x110')][_0x2325e1('0x65d')],_0x411917=_0x1eb143[_0x2325e1('0x4ba')],_0x45a0be=_0x1eb143[_0x2325e1('0x60d')],_0x4e8921=_0x1eb143[_0x2325e1('0xe0')];this['startMove'](_0x411917,_0x45a0be,_0x4e8921);};function Sprite_SvEnemy(){const _0x2084c5=_0x467fb5;this[_0x2084c5('0x229')](...arguments);}Sprite_SvEnemy['prototype']=Object[_0x467fb5('0x452')](Sprite_Actor[_0x467fb5('0xc9')]),Sprite_SvEnemy[_0x467fb5('0xc9')]['constructor']=Sprite_SvEnemy,Sprite_SvEnemy[_0x467fb5('0xc9')]['initialize']=function(_0x43238d){const _0x389dca=_0x467fb5;Sprite_Actor[_0x389dca('0xc9')][_0x389dca('0x229')][_0x389dca('0x709')](this,_0x43238d),this[_0x389dca('0x3e7')]['x']=-0x1,this[_0x389dca('0x520')]['scale']['x']=-0x1;},Sprite_SvEnemy[_0x467fb5('0xc9')]['createShadowSprite']=function(){},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0xba')]=function(){},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0x531')]=function(_0x3427e2){},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0x4a6')]=function(){},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0xc7')]=function(){},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0x6a3')]=function(){const _0x576516=_0x467fb5;this[_0x576516('0x520')][_0x576516('0x735')]=![];},Sprite_SvEnemy[_0x467fb5('0xc9')]['updateBitmap']=function(){const _0x45235b=_0x467fb5;Sprite_Battler[_0x45235b('0xc9')][_0x45235b('0x4a7')][_0x45235b('0x709')](this);const _0x16d9eb=this[_0x45235b('0x621')][_0x45235b('0x3d5')]();if(this[_0x45235b('0x662')]!==_0x16d9eb){if('wgtow'===_0x45235b('0x371')){function _0x52ecc7(){const _0x31f1f8=_0x45235b,_0x2a0816=_0x4bc941[_0x31f1f8('0x317')]()?_0x5bb42d[_0x31f1f8('0x3fb')]:_0x1c0b45['message2'];_0x2a0816&&_0x37245b['BattleCore'][_0x31f1f8('0x110')]['BattleLog'][_0x31f1f8('0xa8')]&&(this[_0x31f1f8('0x26f')]('popBaseLine'),this[_0x31f1f8('0x26f')](_0x31f1f8('0x420')),this[_0x31f1f8('0x26f')](_0x31f1f8('0x7bb'),_0x2a0816[_0x31f1f8('0x11')](_0x115130[_0x31f1f8('0x22a')]())),this[_0x31f1f8('0x26f')]('wait')),_0x44304d['id']===_0x181cb4[_0x31f1f8('0x723')]()&&this[_0x31f1f8('0x26f')](_0x31f1f8('0x214'),_0x1687b9);}}else this[_0x45235b('0x662')]=_0x16d9eb,this[_0x45235b('0x3ad')]['bitmap']=ImageManager[_0x45235b('0x372')](_0x16d9eb);}if(this[_0x45235b('0x3ad')]&&this[_0x45235b('0x3ad')][_0x45235b('0x30a')]&&this[_0x45235b('0x33a')]){if(_0x45235b('0x1be')!==_0x45235b('0x1be')){function _0x3bc37c(){const _0x43aef7=_0x45235b,_0x56b7a5=this[_0x43aef7('0x16e')][this[_0x43aef7('0x16e')]['length']-0x1];_0x56b7a5&&(_0x5336f6['x']=_0x56b7a5['x']+_0x5c288e[_0x43aef7('0x4db')]*_0x4e8e37,_0x1995a6['y']=_0x56b7a5['y']+_0x1f57b9[_0x43aef7('0x4b3')]);}}else this[_0x45235b('0x3ad')]['bitmap'][_0x45235b('0x83e')]!==this['_battler'][_0x45235b('0x7f9')]()&&(this[_0x45235b('0x3ad')][_0x45235b('0x30a')][_0x45235b('0x83e')]=this[_0x45235b('0x33a')][_0x45235b('0x7f9')]());}},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0x7aa')]=function(){},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0x383')]=function(_0x5e11b6,_0x2756e2,_0x4ee0fa){const _0x36cccd=_0x467fb5;if(this[_0x36cccd('0x6')])this[_0x36cccd('0x6')][_0x36cccd('0x383')](_0x5e11b6,_0x2756e2,_0x4ee0fa);},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0x1d2')]=function(){const _0x36b0a0=_0x467fb5,_0x12feba=this['_actor'];if(_0x12feba){const _0x5a531a=_0x12feba[_0x36b0a0('0x8b4')]();if(_0x12feba[_0x36b0a0('0x8b')]()||_0x12feba[_0x36b0a0('0x2fd')]())this[_0x36b0a0('0x156')](_0x36b0a0('0x898'));else{if(_0x5a531a===0x3)this[_0x36b0a0('0x156')](_0x36b0a0('0x32f'));else{if(_0x5a531a===0x2){if(_0x36b0a0('0x298')===_0x36b0a0('0x298'))this[_0x36b0a0('0x156')](_0x36b0a0('0x4d0'));else{function _0x3cb51c(){const _0x57bd7f=_0x36b0a0;if(this[_0x57bd7f('0x11c')]())this[_0x57bd7f('0x48e')][_0x57bd7f('0xea')](_0x1d6573);}}}else{if(_0x12feba[_0x36b0a0('0x1e7')]())this[_0x36b0a0('0x156')]('chant');else{if(_0x12feba[_0x36b0a0('0x351')]()||_0x12feba[_0x36b0a0('0x28e')]())this[_0x36b0a0('0x156')](_0x36b0a0('0x560'));else{if(_0x5a531a===0x1)this[_0x36b0a0('0x156')](_0x36b0a0('0x434'));else{if(_0x12feba[_0x36b0a0('0x8e3')]())this[_0x36b0a0('0x156')](_0x36b0a0('0x16d'));else _0x12feba[_0x36b0a0('0x852')]()?this[_0x36b0a0('0x156')](_0x36b0a0('0x898')):this[_0x36b0a0('0x156')](_0x12feba[_0x36b0a0('0x98')]()[_0x36b0a0('0x33')]||_0x36b0a0('0x898'));}}}}}}}},Sprite_SvEnemy[_0x467fb5('0xc9')][_0x467fb5('0x4dc')]=function(){const _0x5711e3=_0x467fb5;if(this[_0x5711e3('0x6')]){if(_0x5711e3('0x7c5')!==_0x5711e3('0x86a'))return this[_0x5711e3('0x6')][_0x5711e3('0x1a6')]===0x0&&this[_0x5711e3('0x6')][_0x5711e3('0x28a')]===0x0;else{function _0x28a29c(){const _0x5d421b=_0x5711e3;if(!_0x587dbf[_0x5d421b('0x21')]())return;const _0x6e8155=_0x1bf9d4['_logWindow'];_0x6e8155[_0x5d421b('0x420')]();}}}else{if('zRxmh'!==_0x5711e3('0x4bf')){function _0x10f57b(){const _0x4558aa=_0x5711e3;return this[_0x4558aa('0x427')][_0x4558aa('0x66e')]();}}else return!![];}},Sprite_SvEnemy[_0x467fb5('0xc9')]['updateFlip']=function(){},Sprite_Damage[_0x467fb5('0xc9')]['setupBattleCore']=function(_0x3ca763){const _0x2c6c6e=_0x467fb5,_0x146491=_0x3ca763['getNextDamagePopup']()||_0x3ca763[_0x2c6c6e('0x3b0')]();if(_0x146491[_0x2c6c6e('0x61f')]||_0x146491[_0x2c6c6e('0x9b')])this['_colorType']=0x0,this[_0x2c6c6e('0x803')]();else{if(_0x146491[_0x2c6c6e('0x16f')]){if(_0x2c6c6e('0x34e')!==_0x2c6c6e('0x7fe'))this[_0x2c6c6e('0x391')]=_0x146491[_0x2c6c6e('0x5ec')]>=0x0?0x0:0x1,this[_0x2c6c6e('0x336')](_0x146491[_0x2c6c6e('0x5ec')]);else{function _0x2c5dc0(){const _0x826c0f=_0x2c6c6e;_0x59b108+=_0x2c05b2['Enemy']['OffsetX']||0x0,_0x4b154a+=_0x1e0713['Enemy'][_0x826c0f('0x101')]||0x0;}}}else _0x3ca763[_0x2c6c6e('0x70c')]()&&_0x146491[_0x2c6c6e('0x242')]!==0x0&&(this[_0x2c6c6e('0x391')]=_0x146491[_0x2c6c6e('0x242')]>=0x0?0x2:0x3,this[_0x2c6c6e('0x336')](_0x146491[_0x2c6c6e('0x242')]));}if(_0x146491['critical']){if('rnrNi'===_0x2c6c6e('0x253')){function _0x1fcf51(){if(!_0x2cf1a8['isSideView']())return![];return![];}}else this[_0x2c6c6e('0x5f0')]();}},Sprite_Damage[_0x467fb5('0xc9')][_0x467fb5('0x6c6')]=function(_0x424ae3){},Sprite_Damage[_0x467fb5('0xc9')][_0x467fb5('0x336')]=function(_0x16e0d2){const _0xc6100a=_0x467fb5;let _0x803abd=this[_0xc6100a('0x64')](_0x16e0d2);const _0x1c6e15=this[_0xc6100a('0x11e')](),_0x373722=Math[_0xc6100a('0x100')](_0x1c6e15*0.75);for(let _0x3e5372=0x0;_0x3e5372<_0x803abd[_0xc6100a('0x828')];_0x3e5372++){const _0x1d647b=this['createChildSprite'](_0x373722,_0x1c6e15);_0x1d647b[_0xc6100a('0x30a')]['drawText'](_0x803abd[_0x3e5372],0x0,0x0,_0x373722,_0x1c6e15,'center'),_0x1d647b['x']=(_0x3e5372-(_0x803abd[_0xc6100a('0x828')]-0x1)/0x2)*_0x373722,_0x1d647b['dy']=-_0x3e5372;}},Sprite_Damage[_0x467fb5('0xc9')][_0x467fb5('0x64')]=function(_0x58b459){const _0x2b1a0b=_0x467fb5;let _0x3884f1=Math[_0x2b1a0b('0x1c0')](_0x58b459)[_0x2b1a0b('0x1eb')]();this[_0x2b1a0b('0x2e7')]()&&(_0x3884f1=VisuMZ['GroupDigits'](_0x3884f1));const _0x5eac3a=VisuMZ['BattleCore'][_0x2b1a0b('0x110')][_0x2b1a0b('0x82c')];let _0x5a8b63='',_0x35fb0b='';switch(this[_0x2b1a0b('0x391')]){case 0x0:_0x5a8b63=_0x5eac3a[_0x2b1a0b('0x269')]||_0x2b1a0b('0x23a'),_0x35fb0b=TextManager['hp'];if(_0x58b459===0x0)_0x5a8b63='%1';break;case 0x1:_0x5a8b63=_0x5eac3a[_0x2b1a0b('0x7fc')]||_0x2b1a0b('0x2af'),_0x35fb0b=TextManager['hp'];break;case 0x2:_0x5a8b63=_0x5eac3a[_0x2b1a0b('0x74')]||_0x2b1a0b('0x644'),_0x35fb0b=TextManager['mp'];break;case 0x3:_0x5a8b63=_0x5eac3a[_0x2b1a0b('0x668')]||_0x2b1a0b('0x32'),_0x35fb0b=TextManager['mp'];break;}return _0x5a8b63[_0x2b1a0b('0x11')](_0x3884f1,_0x35fb0b)['trim']();},Sprite_Damage['prototype'][_0x467fb5('0x2e7')]=function(){const _0x27c80f=_0x467fb5;return Imported[_0x27c80f('0x3e')]?VisuMZ[_0x27c80f('0x55d')]['Settings'][_0x27c80f('0x2be')][_0x27c80f('0x349')]:![];},Sprite_Damage[_0x467fb5('0xc9')][_0x467fb5('0x5f0')]=function(){const _0x353949=_0x467fb5,_0x311a63=VisuMZ[_0x353949('0x15b')]['Settings'][_0x353949('0x82c')];this[_0x353949('0x35c')]=_0x311a63['CriticalColor']['slice'](0x0),this[_0x353949('0x354')]=_0x311a63[_0x353949('0x2cb')];},Sprite_Damage[_0x467fb5('0xc9')]['setupTextPopup']=function(_0x5c2afe,_0x131f4d){const _0x2ed95=_0x467fb5;this[_0x2ed95('0x35c')]=_0x131f4d['flashColor']||[0x0,0x0,0x0,0x0],this[_0x2ed95('0x35c')]=JsonEx[_0x2ed95('0x7d9')](this['_flashColor']),this[_0x2ed95('0x354')]=_0x131f4d['flashDuration']||0x0;const _0x412e85=this['fontSize'](),_0x2df59d=Math[_0x2ed95('0x100')](_0x412e85*0x1e),_0xdb422f=this['createChildSprite'](_0x2df59d,_0x412e85);_0xdb422f['bitmap']['textColor']=ColorManager[_0x2ed95('0xb3')](_0x131f4d[_0x2ed95('0x567')]),_0xdb422f[_0x2ed95('0x30a')]['drawText'](_0x5c2afe,0x0,0x0,_0x2df59d,_0x412e85,_0x2ed95('0x1f1')),_0xdb422f['dy']=0x0;},Sprite_Damage[_0x467fb5('0xc9')][_0x467fb5('0x68a')]=function(_0x333243,_0x11c432,_0x5cea5a){const _0x1d9d15=_0x467fb5,_0x23e545=Math[_0x1d9d15('0x6b9')](this[_0x1d9d15('0x11e')](),ImageManager['iconHeight']),_0x319a3c=Math[_0x1d9d15('0x100')](_0x23e545*0x1e),_0x1d16cb=this[_0x1d9d15('0x324')](_0x319a3c,_0x23e545),_0x55463e=ImageManager[_0x1d9d15('0x33f')]/0x2,_0x54739b=_0x1d16cb[_0x1d9d15('0x30a')][_0x1d9d15('0x89a')](_0x11c432+'\x20');_0x1d16cb['bitmap'][_0x1d9d15('0x567')]=ColorManager[_0x1d9d15('0xb3')](_0x5cea5a[_0x1d9d15('0x567')]),_0x1d16cb[_0x1d9d15('0x30a')]['drawText'](_0x11c432,_0x55463e,0x0,_0x319a3c-_0x55463e,_0x23e545,_0x1d9d15('0x1f1'));const _0x5914c2=Math[_0x1d9d15('0x1b2')]((_0x23e545-ImageManager[_0x1d9d15('0x3ca')])/0x2),_0x432ff1=_0x319a3c/0x2-ImageManager[_0x1d9d15('0x33f')]-_0x54739b/0x2+_0x55463e/0x2,_0x2ff16c=ImageManager['loadSystem']('IconSet'),_0x6a0d63=ImageManager[_0x1d9d15('0x33f')],_0x1bedb1=ImageManager[_0x1d9d15('0x3ca')],_0x500ad5=_0x333243%0x10*_0x6a0d63,_0xed6637=Math[_0x1d9d15('0x100')](_0x333243/0x10)*_0x1bedb1;_0x1d16cb[_0x1d9d15('0x30a')]['blt'](_0x2ff16c,_0x500ad5,_0xed6637,_0x6a0d63,_0x1bedb1,_0x432ff1,_0x5914c2),this[_0x1d9d15('0x35c')]=_0x5cea5a[_0x1d9d15('0x518')]||[0x0,0x0,0x0,0x0],this[_0x1d9d15('0x35c')]=JsonEx[_0x1d9d15('0x7d9')](this['_flashColor']),this[_0x1d9d15('0x354')]=_0x5cea5a['flashDuration']||0x0,_0x1d16cb['dy']=0x0;},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x275')]=Sprite_StateIcon[_0x467fb5('0xc9')]['updateFrame'],Sprite_StateIcon['prototype'][_0x467fb5('0x84f')]=function(){const _0x4eb646=_0x467fb5;VisuMZ[_0x4eb646('0x15b')][_0x4eb646('0x275')]['call'](this),this[_0x4eb646('0x735')]=this[_0x4eb646('0x553')]>0x0?!![]:![];},VisuMZ['BattleCore']['Sprite_Weapon_loadBitmap']=Sprite_Weapon['prototype']['loadBitmap'],Sprite_Weapon[_0x467fb5('0xc9')][_0x467fb5('0xde')]=function(){const _0x58e19a=_0x467fb5;VisuMZ[_0x58e19a('0x15b')][_0x58e19a('0x8bc')]['call'](this);if(this[_0x58e19a('0x30a')]){if(_0x58e19a('0x571')!==_0x58e19a('0x571')){function _0x366626(){const _0x3d09f0=_0x58e19a;_0x5ef20e['Damage']['PopupPosition']=_0x3d09f0('0x286');}}else this[_0x58e19a('0x30a')]['smooth']=VisuMZ['BattleCore'][_0x58e19a('0x110')]['Actor'][_0x58e19a('0x7a5')];}};function Sprite_HpGauge(){const _0x5e54c3=_0x467fb5;this[_0x5e54c3('0x229')](...arguments);}Sprite_HpGauge[_0x467fb5('0xc9')]=Object['create'](Sprite_Gauge[_0x467fb5('0xc9')]),Sprite_HpGauge['prototype'][_0x467fb5('0x7b9')]=Sprite_HpGauge,Sprite_HpGauge[_0x467fb5('0xc9')][_0x467fb5('0x229')]=function(){const _0x5cb2fe=_0x467fb5;Sprite_Gauge[_0x5cb2fe('0xc9')]['initialize'][_0x5cb2fe('0x709')](this);},Sprite_HpGauge[_0x467fb5('0xc9')][_0x467fb5('0x53a')]=function(){return 0x0;},Sprite_HpGauge[_0x467fb5('0xc9')][_0x467fb5('0x14c')]=function(){const _0x15c3ef=_0x467fb5;this[_0x15c3ef('0x30a')][_0x15c3ef('0x418')]();const _0x2bc9e8=this[_0x15c3ef('0x52c')]();!isNaN(_0x2bc9e8)&&this[_0x15c3ef('0x5c2')]();},VisuMZ['BattleCore']['Sprite_Battleback_adjustPosition']=Sprite_Battleback[_0x467fb5('0xc9')]['adjustPosition'],Sprite_Battleback['prototype']['adjustPosition']=function(){const _0x432d5b=_0x467fb5,_0x272c34=VisuMZ['BattleCore'][_0x432d5b('0x110')]['Battleback'];if(!_0x272c34)return VisuMZ[_0x432d5b('0x15b')][_0x432d5b('0x175')][_0x432d5b('0x709')](this);const _0x5c01bf=String(_0x272c34[_0x432d5b('0x3f1')])||'MZ';switch(_0x5c01bf){case'MZ':VisuMZ[_0x432d5b('0x15b')][_0x432d5b('0x175')]['call'](this);break;case _0x432d5b('0x479'):this[_0x432d5b('0x8b8')]();break;case _0x432d5b('0x15e'):this[_0x432d5b('0x14d')]();break;case'ScaleDown':this[_0x432d5b('0x1b5')]();break;case _0x432d5b('0x1c5'):this['adjustPosition_ScaleUp']();break;}},Sprite_Battleback[_0x467fb5('0xc9')][_0x467fb5('0x8b8')]=function(){const _0x24008e=_0x467fb5;this[_0x24008e('0x6c2')]=Graphics[_0x24008e('0x6c2')],this[_0x24008e('0x41e')]=Graphics['height'];const _0x427ee0=0x1;this[_0x24008e('0x3e7')]['x']=_0x427ee0,this[_0x24008e('0x3e7')]['y']=_0x427ee0,this['x']=0x0,this['y']=0x0;},Sprite_Battleback[_0x467fb5('0xc9')][_0x467fb5('0x14d')]=function(){const _0x4f16cc=_0x467fb5;this['width']=Graphics[_0x4f16cc('0x6c2')],this[_0x4f16cc('0x41e')]=Graphics['height'];const _0x523dc3=this[_0x4f16cc('0x6c2')]/this[_0x4f16cc('0x30a')]['width'],_0x25150d=this[_0x4f16cc('0x41e')]/this[_0x4f16cc('0x30a')][_0x4f16cc('0x41e')],_0x19bf0a=Math[_0x4f16cc('0x6b9')](_0x523dc3,_0x25150d);this['scale']['x']=_0x19bf0a,this['scale']['y']=_0x19bf0a,this['x']=(Graphics[_0x4f16cc('0x6c2')]-this['width'])/0x2,this['y']=Graphics[_0x4f16cc('0x41e')]-this[_0x4f16cc('0x41e')];},Sprite_Battleback[_0x467fb5('0xc9')][_0x467fb5('0x1b5')]=function(){const _0x494a36=_0x467fb5;this['width']=Graphics[_0x494a36('0x6c2')],this[_0x494a36('0x41e')]=Graphics[_0x494a36('0x41e')];const _0x292328=Math[_0x494a36('0x5e9')](0x1,this[_0x494a36('0x6c2')]/this[_0x494a36('0x30a')][_0x494a36('0x6c2')]),_0x32a6b6=Math[_0x494a36('0x5e9')](0x1,this[_0x494a36('0x41e')]/this[_0x494a36('0x30a')][_0x494a36('0x41e')]),_0x18a397=Math[_0x494a36('0x6b9')](_0x292328,_0x32a6b6);this[_0x494a36('0x3e7')]['x']=_0x18a397,this[_0x494a36('0x3e7')]['y']=_0x18a397,this['x']=(Graphics[_0x494a36('0x6c2')]-this[_0x494a36('0x6c2')])/0x2,this['y']=Graphics[_0x494a36('0x41e')]-this[_0x494a36('0x41e')];},Sprite_Battleback[_0x467fb5('0xc9')][_0x467fb5('0x1dd')]=function(){const _0x4e6507=_0x467fb5;this[_0x4e6507('0x6c2')]=Graphics[_0x4e6507('0x6c2')],this['height']=Graphics[_0x4e6507('0x41e')];const _0x725407=Math[_0x4e6507('0x6b9')](0x1,this[_0x4e6507('0x6c2')]/this[_0x4e6507('0x30a')][_0x4e6507('0x6c2')]),_0x4630fe=Math[_0x4e6507('0x6b9')](0x1,this[_0x4e6507('0x41e')]/this[_0x4e6507('0x30a')]['height']),_0x37148f=Math[_0x4e6507('0x6b9')](_0x725407,_0x4630fe);this['scale']['x']=_0x37148f,this[_0x4e6507('0x3e7')]['y']=_0x37148f,this['x']=(Graphics[_0x4e6507('0x6c2')]-this[_0x4e6507('0x6c2')])/0x2,this['y']=Graphics[_0x4e6507('0x41e')]-this['height'];},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x641')]=function(){const _0x3d64dc=_0x467fb5;if(!$gameSystem[_0x3d64dc('0xe1')]())return![];return![];},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x77')]=function(){return 0x0;},Spriteset_Battle['prototype']['animationNextDelay']=function(){return 0x0;},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x334')]=Spriteset_Battle['prototype'][_0x467fb5('0x374')],Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x374')]=function(){const _0x487003=_0x467fb5;VisuMZ['BattleCore'][_0x487003('0x334')][_0x487003('0x709')](this),this[_0x487003('0x442')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x61d')]=Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x280')],Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x280')]=function(){const _0x574ff7=_0x467fb5;VisuMZ[_0x574ff7('0x15b')][_0x574ff7('0x61d')]['call'](this),this[_0x574ff7('0x6b8')]();},Spriteset_Battle[_0x467fb5('0xc9')]['createWeather']=function(){const _0x51137f=_0x467fb5;this[_0x51137f('0x202')]=new Weather(),this[_0x51137f('0x29')][_0x51137f('0x209')](this[_0x51137f('0x202')]);},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x6b8')]=function(){const _0x4bddd5=_0x467fb5;this[_0x4bddd5('0x202')]['type']=$gameScreen['weatherType'](),this[_0x4bddd5('0x202')][_0x4bddd5('0x2e8')]=$gameScreen['weatherPower']();},Game_Interpreter['prototype'][_0x467fb5('0x4bc')]=function(_0x2dcc2c){const _0x2eeefd=_0x467fb5;$gameScreen[_0x2eeefd('0x752')](_0x2dcc2c[0x0],_0x2dcc2c[0x1],_0x2dcc2c[0x2]);if(_0x2dcc2c[0x3])this[_0x2eeefd('0x246')](_0x2dcc2c[0x2]);return!![];},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x535')]=Game_Interpreter[_0x467fb5('0xc9')][_0x467fb5('0x6b5')],Game_Interpreter['prototype'][_0x467fb5('0x6b5')]=function(_0x423ad2){const _0x6bea29=_0x467fb5;if(SceneManager[_0x6bea29('0x21')]()){if('RhAbh'==='RhAbh')return SceneManager[_0x6bea29('0x26e')][_0x6bea29('0x115')][_0x6bea29('0x3c5')](_0x423ad2[0x0],_0x423ad2[0x1]),!![];else{function _0x4cb5d5(){const _0x8de23d=_0x6bea29,_0x5de5ec=_0x18064a(_0x2ec7f9['$1']);return[_0x24f6b9['friendsUnit']()[_0x8de23d('0x4f')]()[_0x5de5ec]];}}}else{if(_0x6bea29('0x635')===_0x6bea29('0x635'))return VisuMZ['BattleCore'][_0x6bea29('0x535')][_0x6bea29('0x709')](this,_0x423ad2);else{function _0x40964c(){const _0x22596c=_0x6bea29;this[_0x22596c('0x402')][_0x22596c('0x809')](this[_0x22596c('0x47f')]),this[_0x22596c('0x1a0')][_0x22596c('0x809')](this[_0x22596c('0x47f')]);}}}},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x3e1')]=function(_0x2dd4b6,_0x3f843a){_0x2dd4b6['bitmap']=_0x3f843a;},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x3c5')]=function(_0x2c367d,_0xb51ca1){const _0x56b7d1=_0x467fb5;_0x2c367d=_0x2c367d||'',_0xb51ca1=_0xb51ca1||'';_0x2c367d===''&&_0xb51ca1===''&&(_0x2c367d=this[_0x56b7d1('0x111')][_0x56b7d1('0x556')](),_0xb51ca1=this[_0x56b7d1('0x762')][_0x56b7d1('0x2a1')]());const _0x2448fc=ImageManager['loadBattleback1'](_0x2c367d),_0x2df622=ImageManager[_0x56b7d1('0x102')](_0xb51ca1);_0x2448fc['addLoadListener'](this[_0x56b7d1('0x652')][_0x56b7d1('0x3c1')](this,this[_0x56b7d1('0x111')],this[_0x56b7d1('0x762')],_0x2448fc,_0x2df622));},Spriteset_Battle['prototype'][_0x467fb5('0x652')]=function(_0xb3c64a,_0x544e83,_0x534261,_0x421931){const _0x2dcc0c=_0x467fb5;_0x421931[_0x2dcc0c('0x2a2')](this[_0x2dcc0c('0x78d')][_0x2dcc0c('0x3c1')](this,_0xb3c64a,_0x544e83,_0x534261,_0x421931));},Spriteset_Battle[_0x467fb5('0xc9')]['updateBattlebackBitmap2']=function(_0x457677,_0x3cc183,_0x2b43b0,_0x3c7712){const _0x89b919=_0x467fb5;_0x457677[_0x89b919('0x30a')]=_0x2b43b0,_0x3cc183[_0x89b919('0x30a')]=_0x3c7712,_0x457677[_0x89b919('0x478')](),_0x3cc183[_0x89b919('0x478')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x306')]=Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x18f')],Spriteset_Battle[_0x467fb5('0xc9')]['createBattleField']=function(){const _0x15873a=_0x467fb5;VisuMZ['BattleCore'][_0x15873a('0x306')][_0x15873a('0x709')](this),this[_0x15873a('0xe3')]();},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0xe3')]=function(){const _0x278ca3=_0x467fb5;this['createBattleFieldContainer'](),this['createAnimationContainer'](),this['createDamageContainer'](),this[_0x278ca3('0x4d9')]();},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0xc6')]=function(){const _0x259a83=_0x467fb5;this[_0x259a83('0x77d')]=new Sprite(),this[_0x259a83('0x29')][_0x259a83('0x209')](this[_0x259a83('0x77d')]);},Spriteset_Battle['prototype'][_0x467fb5('0x7db')]=function(){const _0x3a8cbd=_0x467fb5;this[_0x3a8cbd('0x3cc')]=new Sprite(),this[_0x3a8cbd('0x29')][_0x3a8cbd('0x209')](this[_0x3a8cbd('0x3cc')]);},Spriteset_Battle['prototype'][_0x467fb5('0x35d')]=function(){const _0x482087=_0x467fb5;this[_0x482087('0xf8')]=new Sprite(),this[_0x482087('0xf8')]['x']=this['_battleField']['x'],this['_damageContainer']['y']=this[_0x482087('0x29')]['y'],this['addChild'](this['_damageContainer']);},Spriteset_Battle[_0x467fb5('0xc9')]['adjustFlippedBattlefield']=function(){const _0xce33a9=_0x467fb5;if(!this[_0xce33a9('0x641')]())return;this['_battlerContainer'][_0xce33a9('0x3e7')]['x']=-0x1,this[_0xce33a9('0x77d')]['x']=this[_0xce33a9('0x29')][_0xce33a9('0x6c2')],this['_animationContainer'][_0xce33a9('0x3e7')]['x']=-0x1,this[_0xce33a9('0x3cc')]['x']=this['_battleField'][_0xce33a9('0x6c2')],this[_0xce33a9('0xf8')]['scale']['x']=-0x1,this['_damageContainer']['x']=this[_0xce33a9('0x29')]['x']+this[_0xce33a9('0x29')][_0xce33a9('0x6c2')];},Spriteset_Battle['prototype']['createEnemies']=function(){const _0x28c237=_0x467fb5;Imported[_0x28c237('0x3e')]&&VisuMZ[_0x28c237('0x55d')][_0x28c237('0x110')]['UI'][_0x28c237('0x5e1')]&&this[_0x28c237('0x2b4')]();const _0x44d2e8=$gameTroop[_0x28c237('0x4f')](),_0x44fdbf=[];for(const _0x2deed3 of _0x44d2e8){if(_0x28c237('0x88d')!=='EWzhI')_0x44fdbf['push'](new Sprite_Enemy(_0x2deed3));else{function _0x250c9a(){const _0x2ab742=_0x28c237;return _0x1479ec[_0x2ab742('0x15b')][_0x2ab742('0x110')]['Damage'][_0x2ab742('0x4a3')][_0x2ab742('0x709')](this,_0x36a55c,_0xc1f8ec);}}}_0x44fdbf[_0x28c237('0x59')](this['compareEnemySprite'][_0x28c237('0x3c1')](this));for(const _0x55410a of _0x44fdbf){if(_0x28c237('0x26a')===_0x28c237('0x26a'))this[_0x28c237('0x77d')][_0x28c237('0x209')](_0x55410a);else{function _0x1e6d41(){const _0x47aa7f=_0x28c237;this[_0x47aa7f('0x2e0')][_0x47aa7f('0x209')](this['_dragonbonesSpriteContainer']);}}}this[_0x28c237('0x7c8')]=_0x44fdbf;},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x5')]=function(){const _0x5aa2cf=_0x467fb5;this[_0x5aa2cf('0x6f6')]=[];for(let _0x5c2996=0x0;_0x5c2996<$gameParty['maxBattleMembers']();_0x5c2996++){if(_0x5aa2cf('0x1d7')!==_0x5aa2cf('0x1d7')){function _0x1cb0fe(){return _0x397ba3['name'];}}else{const _0x32f824=$gameParty[_0x5aa2cf('0x41a')]()[_0x5c2996],_0x596f12=new Sprite_Actor();_0x596f12[_0x5aa2cf('0x33b')](_0x32f824),_0x596f12[_0x5aa2cf('0x1f2')](_0x32f824),_0x596f12[_0x5aa2cf('0x280')](),this['_actorSprites'][_0x5aa2cf('0x26f')](_0x596f12),this[_0x5aa2cf('0x77d')][_0x5aa2cf('0x209')](_0x596f12);}}},Spriteset_Battle['prototype'][_0x467fb5('0x890')]=function(_0x5f450a,_0x508601,_0x4d905d,_0x54ddde){const _0x17a2ed=_0x467fb5,_0x1d63a0=this[_0x17a2ed('0x591')](_0x508601),_0x44eaf6=new(_0x1d63a0?Sprite_AnimationMV:Sprite_Animation)(),_0x39435c=this[_0x17a2ed('0x368')](_0x5f450a);if(this[_0x17a2ed('0x8d0')](_0x5f450a[0x0])){if(_0x17a2ed('0x8c8')!==_0x17a2ed('0x875'))_0x4d905d=!_0x4d905d;else{function _0x3ef3b5(){const _0x4dfde3=_0x17a2ed;_0x426f5e[_0x4dfde3('0x847')]()?this[_0x4dfde3('0x250')]():_0x5db285[_0x4dfde3('0x15b')][_0x4dfde3('0x877')][_0x4dfde3('0x709')](this);}}}_0x44eaf6['targetObjects']=_0x5f450a,_0x44eaf6[_0x17a2ed('0x6c6')](_0x39435c,_0x508601,_0x4d905d,_0x54ddde),this[_0x17a2ed('0x364')](_0x44eaf6);},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x364')]=function(_0x265cd2){const _0x3a3673=_0x467fb5;if(this[_0x3a3673('0x2df')](_0x265cd2)){if('xmhZy'!=='nzYMD')this[_0x3a3673('0x503')]()[_0x3a3673('0x209')](_0x265cd2);else{function _0x3c80d4(){const _0x37c8fa=_0x3a3673;this[_0x37c8fa('0x163')]=_0x54b2b9[_0x37c8fa('0x163')];}}}else this[_0x3a3673('0x3cc')][_0x3a3673('0x209')](_0x265cd2);this[_0x3a3673('0x5d5')][_0x3a3673('0x26f')](_0x265cd2);},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x2df')]=function(_0x414760){const _0x21103e=_0x467fb5;if(!_0x414760)return![];if(!_0x414760['_animation'])return![];if(_0x414760['_animation'][_0x21103e('0x597')]!==0x0)return![];if(!_0x414760[_0x21103e('0x16a')][0x0])return![];if(!_0x414760[_0x21103e('0x16a')][0x0][_0x21103e('0x317')]())return![];if($gameSystem[_0x21103e('0xe1')]())return![];if(!this[_0x21103e('0x503')]())return![];return Window_BattleStatus[_0x21103e('0xc9')][_0x21103e('0x435')]()===_0x21103e('0x82');},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x503')]=function(){const _0x29378b=_0x467fb5;if(!SceneManager[_0x29378b('0x26e')])return;if(!SceneManager['_scene'][_0x29378b('0x841')])return;if(!SceneManager['_scene'][_0x29378b('0x841')]['_effectsContainer'])return;return SceneManager[_0x29378b('0x26e')][_0x29378b('0x841')][_0x29378b('0x7a7')];},Spriteset_Battle['prototype']['removeAnimation']=function(_0x3d67c6){const _0x582ab7=_0x467fb5;this[_0x582ab7('0x14b')](_0x3d67c6);for(const _0x42b857 of _0x3d67c6['targetObjects']){if(_0x582ab7('0x37c')==='WgeHR'){if(_0x42b857[_0x582ab7('0x6a4')]){if('LhSFe'!==_0x582ab7('0x57b')){function _0x2bfebe(){const _0x26f71=_0x582ab7;this[_0x26f71('0x86')](![]);}}else _0x42b857['endAnimation']();}}else{function _0x5836a1(){const _0x5e7e26=_0x582ab7,_0x12316c=_0x2df4e7['x']+_0x4f5c7c[_0x5e7e26('0x100')]((_0x213115[_0x5e7e26('0x6c2')]-_0x42c719)/0x2);this[_0x5e7e26('0x191')](_0x48eae1,_0x12316c,_0x5ad55d['y'],_0x1f9dd1);}}}_0x3d67c6['destroy']();},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x14b')]=function(_0x5cba9a){const _0x2264bc=_0x467fb5;this['_animationSprites'][_0x2264bc('0x14e')](_0x5cba9a);if(this['isAnimationShownOnBattlePortrait'](_0x5cba9a)){if(_0x2264bc('0x69a')!==_0x2264bc('0x4b1'))this[_0x2264bc('0x503')]()[_0x2264bc('0x55')](_0x5cba9a);else{function _0x11c70b(){const _0x6adc05=_0x2264bc;for(const _0x1a6f82 of _0x2fe61c){_0x1a6f82[_0x6adc05('0x5e2')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x10c3e0=_0x20f870(_0x2d8184['$1']),_0xc0e25=_0x370f54(_0x1646cf['$2']),_0x41ca38=_0xc0e25===0x1?this['_regionBattleback1']:this[_0x6adc05('0x7f2')],_0x5d559f=_0x234a7f(_0x33d641['$3']);_0x41ca38[_0x10c3e0]=_0x5d559f;}}}}else this[_0x2264bc('0x3cc')][_0x2264bc('0x55')](_0x5cba9a);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0xda')]=Spriteset_Battle[_0x467fb5('0xc9')]['updateActors'],Spriteset_Battle['prototype'][_0x467fb5('0xa5')]=function(){const _0x46511f=_0x467fb5;VisuMZ[_0x46511f('0x15b')][_0x46511f('0xda')][_0x46511f('0x709')](this),this[_0x46511f('0x7ba')]();},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x7ba')]=function(){const _0x5dfd5e=_0x467fb5;this[_0x5dfd5e('0x77d')][_0x5dfd5e('0xb9')][_0x5dfd5e('0x59')](this[_0x5dfd5e('0x1c7')][_0x5dfd5e('0x3c1')](this)),this[_0x5dfd5e('0x3df')]();},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x1c7')]=function(_0x1ae71c,_0x5b7fc9){const _0x2afd79=_0x467fb5;if(VisuMZ['BattleCore'][_0x2afd79('0x110')][_0x2afd79('0x231')]['PrioritySortActors']){if(_0x2afd79('0x197')==='yHPkr'){if(_0x1ae71c[_0x2afd79('0x33a')]&&_0x5b7fc9[_0x2afd79('0x33a')]){if(_0x1ae71c[_0x2afd79('0x33a')][_0x2afd79('0x317')]()&&_0x5b7fc9[_0x2afd79('0x33a')][_0x2afd79('0x8c6')]())return 0x1;else{if(_0x5b7fc9[_0x2afd79('0x33a')][_0x2afd79('0x317')]()&&_0x1ae71c[_0x2afd79('0x33a')]['isEnemy']())return-0x1;}}}else{function _0x3eb109(){const _0x51b9db=_0x2afd79;if(!_0xaf40f5[_0x51b9db('0x21')]())return;const _0x5cd7b5=_0x2a785c[_0x51b9db('0x26e')]['_statusWindow'];if(_0x5cd7b5)_0x5cd7b5[_0x51b9db('0x32d')]();}}}return _0x1ae71c[_0x2afd79('0x345')]!==_0x5b7fc9['_baseY']?_0x1ae71c[_0x2afd79('0x345')]-_0x5b7fc9[_0x2afd79('0x345')]:_0x5b7fc9[_0x2afd79('0x1a9')]-_0x1ae71c['spriteId'];},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x3df')]=function(){const _0x1299e7=_0x467fb5;if(!VisuMZ[_0x1299e7('0x15b')][_0x1299e7('0x110')][_0x1299e7('0x231')][_0x1299e7('0x5b1')])return;const _0x543255=BattleManager['_subject'];if(_0x543255){if(_0x1299e7('0x56d')==='PCGhb'){function _0x3ebf68(){const _0x58ca11=_0x1299e7;return this[_0x58ca11('0xed')]();}}else{if(_0x543255[_0x1299e7('0x317')]()&&!$gameSystem['isSideView']())return;const _0x3f9a45=_0x543255[_0x1299e7('0x67b')]();if(_0x3f9a45&&_0x543255[_0x1299e7('0x317')]())this[_0x1299e7('0x77d')][_0x1299e7('0x209')](_0x3f9a45);}}},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x654')]=function(){const _0x1cda6a=_0x467fb5;for(const _0x150006 of $gameParty['aliveMembers']()){if(_0x1cda6a('0xec')!=='ruFVi'){if(!_0x150006)continue;if(!_0x150006[_0x1cda6a('0x67b')]())continue;_0x150006['battler']()[_0x1cda6a('0x22')]=!![],_0x150006[_0x1cda6a('0x67b')]()[_0x1cda6a('0x7aa')]();}else{function _0xd4921e(){const _0xaab856=_0x1cda6a;this[_0xaab856('0x7bf')]=_0x24424e(_0xc120c4['$1']);}}}},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x40c')]=function(){return![];},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x32a')]=function(){const _0x41e744=_0x467fb5;return this[_0x41e744('0x7e5')]()[_0x41e744('0xdd')](_0x37b4b8=>_0x37b4b8[_0x41e744('0x52f')]());},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x193')]=function(){const _0x28bd07=_0x467fb5;return this[_0x28bd07('0x7e5')]()[_0x28bd07('0xdd')](_0x348218=>_0x348218['isJumping']());},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x318')]=function(){const _0x13b18a=_0x467fb5;return this[_0x13b18a('0x7e5')]()['some'](_0x6a8aad=>_0x6a8aad[_0x13b18a('0xa4')]());},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x4d3')]=function(){const _0x936c42=_0x467fb5;return this[_0x936c42('0x7e5')]()[_0x936c42('0xdd')](_0x144e7f=>_0x144e7f[_0x936c42('0x4c8')]());},Spriteset_Battle[_0x467fb5('0xc9')][_0x467fb5('0x36')]=function(){const _0x49f910=_0x467fb5;return this[_0x49f910('0x7e5')]()[_0x49f910('0xdd')](_0xe450fc=>_0xe450fc[_0x49f910('0x385')]());},Spriteset_Battle[_0x467fb5('0xc9')]['isAnyoneChangingOpacity']=function(){const _0x12bc8d=_0x467fb5;return this[_0x12bc8d('0x7e5')]()[_0x12bc8d('0xdd')](_0x5c5f51=>_0x5c5f51[_0x12bc8d('0x789')]());},VisuMZ['BattleCore']['Window_ItemList_maxCols']=Window_ItemList[_0x467fb5('0xc9')]['maxCols'],Window_ItemList[_0x467fb5('0xc9')][_0x467fb5('0x54d')]=function(){const _0x1e7966=_0x467fb5;if(SceneManager[_0x1e7966('0x21')]()){if(SceneManager[_0x1e7966('0x26e')][_0x1e7966('0x435')]()===_0x1e7966('0x5bc')){if('ZjyyK'===_0x1e7966('0x616'))return VisuMZ[_0x1e7966('0x15b')][_0x1e7966('0x110')][_0x1e7966('0x5e')]['SkillItemBorderCols'];else{function _0x2f0718(){const _0x20e98e=_0x1e7966;if(this[_0x20e98e('0x11c')]())this[_0x20e98e('0x48e')][_0x20e98e('0x684')](_0x3f91b8);}}}else return VisuMZ[_0x1e7966('0x15b')]['Settings'][_0x1e7966('0x5e')]['SkillItemStandardCols'];}else return VisuMZ['BattleCore'][_0x1e7966('0x236')]['call'](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x480')]=Window_SkillList[_0x467fb5('0xc9')][_0x467fb5('0x54d')],Window_SkillList[_0x467fb5('0xc9')]['maxCols']=function(){const _0x420ca0=_0x467fb5;return SceneManager['isSceneBattle']()?SceneManager[_0x420ca0('0x26e')][_0x420ca0('0x435')]()===_0x420ca0('0x5bc')?VisuMZ[_0x420ca0('0x15b')][_0x420ca0('0x110')][_0x420ca0('0x5e')][_0x420ca0('0x573')]:VisuMZ[_0x420ca0('0x15b')]['Settings'][_0x420ca0('0x5e')]['SkillItemStandardCols']:VisuMZ[_0x420ca0('0x15b')][_0x420ca0('0x480')][_0x420ca0('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x896')]=Window_Options[_0x467fb5('0xc9')][_0x467fb5('0x181')],Window_Options['prototype'][_0x467fb5('0x181')]=function(){const _0x11c52e=_0x467fb5;VisuMZ[_0x11c52e('0x15b')]['Window_Options_addGeneralOptions'][_0x11c52e('0x709')](this),this['addAutoBattleCommands'](),this['addShowHpGaugeCommand']();},Window_Options[_0x467fb5('0xc9')]['addAutoBattleCommands']=function(){const _0xfedbcc=_0x467fb5;if(VisuMZ[_0xfedbcc('0x15b')][_0xfedbcc('0x110')][_0xfedbcc('0x1b9')]['AddOption']){if(_0xfedbcc('0x65a')!==_0xfedbcc('0x634'))this['addBattleCoreAutoBattleStartupCommand'](),this[_0xfedbcc('0x328')]();else{function _0x4d41d2(){const _0x5d8896=_0xfedbcc;return this[_0x5d8896('0x4d4')]()?this[_0x5d8896('0x530')]()&&this[_0x5d8896('0x530')]()[_0x5d8896('0x19a')]()&&!this[_0x5d8896('0x530')]()[_0x5d8896('0x888')]():this['currentAction']()&&this[_0x5d8896('0x530')]()[_0x5d8896('0x19a')]()&&!this[_0x5d8896('0x530')]()[_0x5d8896('0x624')]();}}}},Window_Options[_0x467fb5('0xc9')][_0x467fb5('0x563')]=function(){const _0x4627bb=_0x467fb5;if(!VisuMZ[_0x4627bb('0x15b')]['Settings']['HpGauge'][_0x4627bb('0xf5')])return;const _0xa794d4=TextManager[_0x4627bb('0x5ae')],_0x230049=_0x4627bb('0x5ae');this['addCommand'](_0xa794d4,_0x230049);},Window_Options[_0x467fb5('0xc9')][_0x467fb5('0x17a')]=function(){const _0x3f8a48=_0x467fb5,_0x167331=TextManager[_0x3f8a48('0x2c')],_0x3796ba=_0x3f8a48('0x35e');this[_0x3f8a48('0x636')](_0x167331,_0x3796ba);},Window_Options[_0x467fb5('0xc9')][_0x467fb5('0x328')]=function(){const _0x384cec=_0x467fb5,_0x5cde4d=TextManager['autoBattleStyle'],_0x28fa3b=_0x384cec('0x163');this[_0x384cec('0x636')](_0x5cde4d,_0x28fa3b);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x2c0')]=Window_Options[_0x467fb5('0xc9')]['statusText'],Window_Options['prototype'][_0x467fb5('0x3ef')]=function(_0x39d185){const _0x58037b=_0x467fb5,_0x4668b4=this['commandSymbol'](_0x39d185);return _0x4668b4===_0x58037b('0x163')?this[_0x58037b('0x329')]():VisuMZ['BattleCore'][_0x58037b('0x2c0')][_0x58037b('0x709')](this,_0x39d185);},Window_Options[_0x467fb5('0xc9')][_0x467fb5('0x329')]=function(){const _0x11e10f=_0x467fb5,_0x82c23d=VisuMZ['BattleCore'][_0x11e10f('0x110')][_0x11e10f('0x1b9')],_0x49c77d=this[_0x11e10f('0x137')]('autoBattleUseSkills');return _0x49c77d?_0x82c23d[_0x11e10f('0x11f')]:_0x82c23d['StyleOFF'];},Window_ShopStatus[_0x467fb5('0xc9')][_0x467fb5('0x2ee')]=function(){const _0xeaff99=_0x467fb5,_0x58fbe0=DataManager[_0xeaff99('0x5cf')](this['_item']),_0x194e26=VisuMZ['DamageStyles'][_0x58fbe0];if(!_0x194e26)return this[_0xeaff99('0x529')]();const _0x1d90b9=_0xeaff99('0x8dc')[_0xeaff99('0x11')](this['_item'][_0xeaff99('0x554')][_0xeaff99('0xff')]),_0x222d98=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0xeaff99('0x22e')]['damage'][_0xeaff99('0xff')]];return _0x194e26[_0x1d90b9][_0xeaff99('0x11')](_0x222d98);},Window_ShopStatus[_0x467fb5('0xc9')][_0x467fb5('0x135')]=function(){const _0x3a2021=_0x467fb5,_0x50334d=DataManager[_0x3a2021('0x5cf')](this[_0x3a2021('0x22e')]),_0x2c6dd2=VisuMZ[_0x3a2021('0x1e0')][_0x50334d];if(!_0x2c6dd2)return this[_0x3a2021('0x763')]();return _0x2c6dd2[_0x3a2021('0x4f8')][_0x3a2021('0x709')](this);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6bf')]=Window_PartyCommand['prototype'][_0x467fb5('0x229')],Window_PartyCommand[_0x467fb5('0xc9')]['initialize']=function(_0x147b26){const _0x2dd53e=_0x467fb5;VisuMZ[_0x2dd53e('0x15b')]['Window_PartyCommand_initialize'][_0x2dd53e('0x709')](this,_0x147b26),this[_0x2dd53e('0x7a0')](_0x147b26);},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x7a0')]=function(_0x5a29bb){const _0x4e15cc=_0x467fb5,_0x3bb8ee=new Rectangle(0x0,0x0,_0x5a29bb[_0x4e15cc('0x6c2')],_0x5a29bb[_0x4e15cc('0x41e')]);this[_0x4e15cc('0x695')]=new Window_Base(_0x3bb8ee),this[_0x4e15cc('0x695')]['opacity']=0x0,this['addChild'](this[_0x4e15cc('0x695')]),this[_0x4e15cc('0x21a')]();},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x783')]=function(){const _0x26d914=_0x467fb5;Window_Command['prototype'][_0x26d914('0x783')]['call'](this);if(this[_0x26d914('0x695')])this['updateCommandNameWindow']();},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x21a')]=function(){const _0x45b890=_0x467fb5,_0x5c55df=this[_0x45b890('0x695')];_0x5c55df[_0x45b890('0x743')][_0x45b890('0x418')]();const _0x39aa98=this[_0x45b890('0x572')](this[_0x45b890('0x6b7')]());if(_0x39aa98===_0x45b890('0x2f')&&this[_0x45b890('0x659')]()>0x0){if('hhYar'!==_0x45b890('0x360')){const _0x48f1a7=this[_0x45b890('0x167')](this[_0x45b890('0x6b7')]());let _0xe8991a=this['commandName'](this['index']());_0xe8991a=_0xe8991a[_0x45b890('0x65f')](/\\I\[(\d+)\]/gi,''),_0x5c55df[_0x45b890('0x140')](),this[_0x45b890('0x8cd')](_0xe8991a,_0x48f1a7),this[_0x45b890('0x517')](_0xe8991a,_0x48f1a7),this['commandNameWindowCenter'](_0xe8991a,_0x48f1a7);}else{function _0x53d09d(){const _0x92c9f8=_0x45b890;_0x271aa1[_0x92c9f8('0x296')]=!![];}}}},Window_PartyCommand['prototype']['commandNameWindowDrawBackground']=function(_0x5cb6bc,_0x56855a){},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x517')]=function(_0x153196,_0x69787){const _0x119aaf=_0x467fb5,_0x269863=this[_0x119aaf('0x695')];_0x269863[_0x119aaf('0x2c4')](_0x153196,0x0,_0x69787['y'],_0x269863[_0x119aaf('0x851')],_0x119aaf('0x1f1'));},Window_PartyCommand['prototype'][_0x467fb5('0x19f')]=function(_0x483a2e,_0x530b23){const _0x5c56ed=_0x467fb5,_0x3b8318=this[_0x5c56ed('0x695')],_0x57cb46=$gameSystem[_0x5c56ed('0x84d')](),_0x5537a5=_0x530b23['x']+Math[_0x5c56ed('0x100')](_0x530b23[_0x5c56ed('0x6c2')]/0x2)+_0x57cb46;_0x3b8318['x']=_0x3b8318['width']/-0x2+_0x5537a5,_0x3b8318['y']=Math['floor'](_0x530b23['height']/0x2);},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x89d')]=function(){const _0x43e5b6=_0x467fb5;this[_0x43e5b6('0x856')](),this[_0x43e5b6('0x13')](),this[_0x43e5b6('0x303')](),this[_0x43e5b6('0x7e8')](),this[_0x43e5b6('0x6d4')]();},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x856')]=function(){const _0x1ffdc0=_0x467fb5,_0x54c6a5=this[_0x1ffdc0('0x581')](),_0x4ab90e=VisuMZ[_0x1ffdc0('0x15b')][_0x1ffdc0('0x110')][_0x1ffdc0('0x389')][_0x1ffdc0('0x361')],_0x3945bf=_0x54c6a5==='text'?TextManager['fight']:_0x1ffdc0('0x1f')['format'](_0x4ab90e,TextManager[_0x1ffdc0('0x7a6')]),_0x41ee3c=this[_0x1ffdc0('0x722')]();this[_0x1ffdc0('0x636')](_0x3945bf,'fight',_0x41ee3c);},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x722')]=function(){return!![];},Window_PartyCommand['prototype'][_0x467fb5('0x13')]=function(){const _0x109c39=_0x467fb5;if(!this['isAutoBattleCommandAdded']())return;const _0x2ac342=this[_0x109c39('0x581')](),_0x1167f3=VisuMZ[_0x109c39('0x15b')][_0x109c39('0x110')]['PartyCmd'][_0x109c39('0x239')],_0x347a17=_0x2ac342==='text'?TextManager['autoBattle']:_0x109c39('0x1f')['format'](_0x1167f3,TextManager[_0x109c39('0x61')]),_0x5d0d1f=this['isAutoBattleCommandEnabled']();this[_0x109c39('0x636')](_0x347a17,_0x109c39('0x61'),_0x5d0d1f);},Window_PartyCommand['prototype']['isAutoBattleCommandAdded']=function(){const _0x18b5c3=_0x467fb5;return VisuMZ[_0x18b5c3('0x15b')][_0x18b5c3('0x110')][_0x18b5c3('0x389')][_0x18b5c3('0x81d')];},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x1c2')]=function(){return!![];},Window_PartyCommand['prototype'][_0x467fb5('0x303')]=function(){},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x7e8')]=function(){const _0x54f2dd=_0x467fb5;if(!this['isOptionsCommandAdded']())return;const _0x633d1d=this['commandStyle'](),_0x49a5af=VisuMZ[_0x54f2dd('0x15b')]['Settings'][_0x54f2dd('0x389')]['CmdIconOptions'],_0x161024=_0x633d1d===_0x54f2dd('0x5c0')?TextManager[_0x54f2dd('0x1e')]:_0x54f2dd('0x1f')['format'](_0x49a5af,TextManager[_0x54f2dd('0x1e')]),_0x4a8086=this[_0x54f2dd('0x580')]();this[_0x54f2dd('0x636')](_0x161024,'options',_0x4a8086);},Window_PartyCommand['prototype'][_0x467fb5('0x7b6')]=function(){const _0x5e00e8=_0x467fb5;return VisuMZ['BattleCore'][_0x5e00e8('0x110')][_0x5e00e8('0x389')][_0x5e00e8('0x702')];},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x580')]=function(){return!![];},Window_PartyCommand['prototype']['addEscapeCommand']=function(){const _0x4a2d15=_0x467fb5,_0x35c2b0=this[_0x4a2d15('0x581')](),_0x3bb747=VisuMZ[_0x4a2d15('0x15b')][_0x4a2d15('0x110')][_0x4a2d15('0x389')][_0x4a2d15('0x300')],_0x525e43=_0x35c2b0===_0x4a2d15('0x5c0')?TextManager[_0x4a2d15('0x26d')]:_0x4a2d15('0x1f')['format'](_0x3bb747,TextManager[_0x4a2d15('0x26d')]),_0x2ce9e3=this[_0x4a2d15('0x817')]();this[_0x4a2d15('0x636')](_0x525e43,_0x4a2d15('0x26d'),_0x2ce9e3);},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x817')]=function(){return BattleManager['canEscape']();},Window_PartyCommand['prototype'][_0x467fb5('0x51d')]=function(){const _0xbd7e6a=_0x467fb5;return VisuMZ[_0xbd7e6a('0x15b')][_0xbd7e6a('0x110')][_0xbd7e6a('0x389')][_0xbd7e6a('0x8dd')];},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x56c')]=function(_0x4876a2){const _0x402ec8=_0x467fb5,_0x3732bd=this[_0x402ec8('0x572')](_0x4876a2);if(_0x3732bd===_0x402ec8('0x3be'))this[_0x402ec8('0x5dc')](_0x4876a2);else _0x3732bd===_0x402ec8('0x2f')?this[_0x402ec8('0x2a3')](_0x4876a2):Window_Command[_0x402ec8('0xc9')][_0x402ec8('0x56c')][_0x402ec8('0x709')](this,_0x4876a2);},Window_PartyCommand['prototype'][_0x467fb5('0x581')]=function(){const _0x2aa07d=_0x467fb5;return VisuMZ[_0x2aa07d('0x15b')][_0x2aa07d('0x110')][_0x2aa07d('0x389')]['CmdStyle'];},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x572')]=function(_0x430e50){const _0xb905ac=_0x467fb5;if(_0x430e50<0x0)return'text';const _0x2fb090=this['commandStyle']();if(_0x2fb090!=='auto'){if('JBWPY'===_0xb905ac('0x46d')){function _0x985381(){_0x134d7+=_0x21e48c(_0x3800f2['$1']);}}else return _0x2fb090;}else{if(this['maxItems']()>0x0){const _0x194daf=this[_0xb905ac('0x80c')](_0x430e50);if(_0x194daf['match'](/\\I\[(\d+)\]/i)){if(_0xb905ac('0x1fc')!==_0xb905ac('0x1fc')){function _0x492f1b(){const _0x330c35=_0xb905ac;let _0x4fec90=_0x330c35('0x377');if(this[_0x330c35('0x6b3')](_0x4fec90))return this[_0x330c35('0x825')][_0x4fec90];return this[_0x330c35('0x825')][_0x4fec90]=this[_0x330c35('0x526')](this[_0x330c35('0x3f9')]()),this[_0x330c35('0x825')][_0x4fec90];}}else{const _0x2aab33=this[_0xb905ac('0x167')](_0x430e50),_0x484a9d=this[_0xb905ac('0x726')](_0x194daf)['width'];return _0x484a9d<=_0x2aab33[_0xb905ac('0x6c2')]?_0xb905ac('0x3be'):'icon';}}}}return _0xb905ac('0x5c0');},Window_PartyCommand[_0x467fb5('0xc9')]['drawItemStyleIconText']=function(_0x4bb1ee){const _0x8d0f8c=_0x467fb5,_0x518d87=this['itemLineRect'](_0x4bb1ee),_0x3726f5=this[_0x8d0f8c('0x80c')](_0x4bb1ee),_0x29fd50=this['textSizeEx'](_0x3726f5)[_0x8d0f8c('0x6c2')];this['changePaintOpacity'](this['isCommandEnabled'](_0x4bb1ee));const _0xdd9228=this[_0x8d0f8c('0x51d')]();if(_0xdd9228===_0x8d0f8c('0x883')){if(_0x8d0f8c('0x71')===_0x8d0f8c('0x71'))this['drawTextEx'](_0x3726f5,_0x518d87['x']+_0x518d87[_0x8d0f8c('0x6c2')]-_0x29fd50,_0x518d87['y'],_0x29fd50);else{function _0x39ef09(){const _0x341989=_0x8d0f8c;this['_methods'][_0x341989('0x26f')](_0x49d22d);}}}else{if(_0xdd9228===_0x8d0f8c('0x1f1')){const _0x3bfa1c=_0x518d87['x']+Math['floor']((_0x518d87[_0x8d0f8c('0x6c2')]-_0x29fd50)/0x2);this[_0x8d0f8c('0x191')](_0x3726f5,_0x3bfa1c,_0x518d87['y'],_0x29fd50);}else{if(_0x8d0f8c('0x6ba')!==_0x8d0f8c('0x8d5'))this[_0x8d0f8c('0x191')](_0x3726f5,_0x518d87['x'],_0x518d87['y'],_0x29fd50);else{function _0x296d5b(){const _0x23a661=_0x8d0f8c,_0x364583=_0x38884b[_0x23a661('0x11')](_0x11d993['name'](),_0x533526[_0x23a661('0x3af')](_0x30cef1));this[_0x23a661('0x26f')](_0x23a661('0x4c')),this[_0x23a661('0x26f')](_0x23a661('0x420')),this[_0x23a661('0x26f')](_0x23a661('0x7bb'),_0x364583),this[_0x23a661('0x26f')](_0x23a661('0x246'));}}}}},Window_PartyCommand['prototype']['drawItemStyleIcon']=function(_0x24b625){const _0x222e00=_0x467fb5;this[_0x222e00('0x80c')](_0x24b625)[_0x222e00('0x5e2')](/\\I\[(\d+)\]/i);const _0x5491c0=Number(RegExp['$1'])||0x0,_0x4d2400=this[_0x222e00('0x167')](_0x24b625),_0x159568=_0x4d2400['x']+Math[_0x222e00('0x100')]((_0x4d2400[_0x222e00('0x6c2')]-ImageManager[_0x222e00('0x33f')])/0x2),_0xdd9d92=_0x4d2400['y']+(_0x4d2400[_0x222e00('0x41e')]-ImageManager[_0x222e00('0x3ca')])/0x2;this[_0x222e00('0x562')](_0x5491c0,_0x159568,_0xdd9d92);},Window_PartyCommand['prototype'][_0x467fb5('0x12d')]=function(){},Window_PartyCommand[_0x467fb5('0xc9')]['activate']=function(){const _0x4de96e=_0x467fb5;Window_Command['prototype'][_0x4de96e('0x3c8')]['call'](this);const _0x450494=this[_0x4de96e('0x435')]();if(_0x450494===_0x4de96e('0x5bc')){if(_0x4de96e('0x1ca')===_0x4de96e('0x1ca'))this[_0x4de96e('0x594')]();else{function _0x41f6b9(){const _0x4197fa=_0x4de96e;if(!this[_0x4197fa('0x33a')])return![];if(this['_battler'][_0x4197fa('0x317')]())return!![];const _0x451c17=this[_0x4197fa('0x33a')][_0x4197fa('0x3f9')]()[_0x4197fa('0x50e')];if(_0x451c17[_0x4197fa('0x5e2')](/<SHOW HP GAUGE>/i))return!![];if(_0x451c17[_0x4197fa('0x5e2')](/<HIDE HP GAUGE>/i))return![];const _0x12b017=_0x19d298[_0x4197fa('0x15b')]['Settings'][_0x4197fa('0x75b')];if(_0x12b017['RequiresDefeat']){if(_0x12b017['BTestBypass']&&_0x5c58d9['isBattleTest']())return!![];if(this[_0x4197fa('0x33a')][_0x4197fa('0x40b')])return![];return this[_0x4197fa('0x33a')][_0x4197fa('0x4e5')]();}return!![];}}}},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x435')]=function(){const _0x58ce58=_0x467fb5;if(this['_battleLayoutStyle'])return this[_0x58ce58('0x235')];return this[_0x58ce58('0x235')]=SceneManager['_scene']['battleLayoutStyle'](),this[_0x58ce58('0x235')];},Window_PartyCommand[_0x467fb5('0xc9')][_0x467fb5('0x488')]=function(){const _0x5a4299=_0x467fb5,_0x671dd9=VisuMZ['BattleCore'][_0x5a4299('0x110')]['PartyCmd'],_0x74d9ec=this[_0x5a4299('0x67c')]();switch(_0x74d9ec){case _0x5a4299('0x7a6'):this[_0x5a4299('0x47f')][_0x5a4299('0x379')](_0x671dd9[_0x5a4299('0x393')]);break;case'autoBattle':this[_0x5a4299('0x47f')]['setText'](_0x671dd9[_0x5a4299('0x5e8')]);break;case _0x5a4299('0x1e'):this['_helpWindow']['setText'](_0x671dd9[_0x5a4299('0x44')]);break;case _0x5a4299('0x26d'):this[_0x5a4299('0x47f')]['setText'](_0x671dd9[_0x5a4299('0x7ee')]);break;default:this[_0x5a4299('0x47f')][_0x5a4299('0x379')]('');break;}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x660')]=Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x229')],Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x229')]=function(_0x54fa89){const _0x481ed6=_0x467fb5;VisuMZ[_0x481ed6('0x15b')]['Window_ActorCommand_initialize'][_0x481ed6('0x709')](this,_0x54fa89),this[_0x481ed6('0x7a0')](_0x54fa89);},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x7a0')]=function(_0x8bb19a){const _0x43e76f=_0x467fb5,_0x483888=new Rectangle(0x0,0x0,_0x8bb19a[_0x43e76f('0x6c2')],_0x8bb19a['height']);this['_commandNameWindow']=new Window_Base(_0x483888),this[_0x43e76f('0x695')][_0x43e76f('0x79a')]=0x0,this[_0x43e76f('0x209')](this[_0x43e76f('0x695')]),this[_0x43e76f('0x21a')]();},Window_ActorCommand['prototype'][_0x467fb5('0x783')]=function(){const _0x417151=_0x467fb5;Window_Command[_0x417151('0xc9')][_0x417151('0x783')][_0x417151('0x709')](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x21a')]=function(){const _0x51eee1=_0x467fb5,_0x4052be=this[_0x51eee1('0x695')];_0x4052be[_0x51eee1('0x743')][_0x51eee1('0x418')]();const _0x51fca5=this[_0x51eee1('0x572')](this[_0x51eee1('0x6b7')]());if(_0x51fca5===_0x51eee1('0x2f')&&this['maxItems']()>0x0){const _0x52de44=this[_0x51eee1('0x167')](this[_0x51eee1('0x6b7')]());let _0x56546f=this['commandName'](this['index']());_0x56546f=_0x56546f[_0x51eee1('0x65f')](/\\I\[(\d+)\]/gi,''),_0x4052be[_0x51eee1('0x140')](),this[_0x51eee1('0x8cd')](_0x56546f,_0x52de44),this[_0x51eee1('0x517')](_0x56546f,_0x52de44),this[_0x51eee1('0x19f')](_0x56546f,_0x52de44);}},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x8cd')]=function(_0x7746fd,_0x404804){},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x517')]=function(_0x44bed1,_0x325177){const _0x5878a5=_0x467fb5,_0x3a151b=this[_0x5878a5('0x695')];_0x3a151b[_0x5878a5('0x2c4')](_0x44bed1,0x0,_0x325177['y'],_0x3a151b[_0x5878a5('0x851')],_0x5878a5('0x1f1'));},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x19f')]=function(_0x2d6087,_0x49eddf){const _0x9af364=_0x467fb5,_0x57ba3a=this[_0x9af364('0x695')],_0x3be463=$gameSystem[_0x9af364('0x84d')](),_0x2cbd43=_0x49eddf['x']+Math[_0x9af364('0x100')](_0x49eddf[_0x9af364('0x6c2')]/0x2)+_0x3be463;_0x57ba3a['x']=_0x57ba3a[_0x9af364('0x6c2')]/-0x2+_0x2cbd43,_0x57ba3a['y']=Math[_0x9af364('0x100')](_0x49eddf[_0x9af364('0x41e')]/0x2);},Window_ActorCommand['prototype'][_0x467fb5('0x89d')]=function(){const _0x3391be=_0x467fb5;if(!this[_0x3391be('0x621')])return;const _0x1b6179=this[_0x3391be('0x621')][_0x3391be('0x575')]();for(const _0x4088e7 of _0x1b6179){if(_0x3391be('0x692')===_0x3391be('0x10d')){function _0x51c7ff(){const _0x596ab5=_0x3391be;if(!_0x4146e9['isPlaytest']())return;_0x482f8b[_0x596ab5('0x107')](this[_0x596ab5('0x865')][_0x596ab5('0xae')](_0x243c4b=>_0x243c4b[_0x596ab5('0x22a')])[_0x596ab5('0x403')]('\x0a'));}}else this[_0x3391be('0x5a9')](_0x4088e7[_0x3391be('0x66a')]()[_0x3391be('0x23e')]());}},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x5a9')]=function(_0x566818){const _0xfb783d=_0x467fb5;_0x566818===_0xfb783d('0x887')&&this[_0xfb783d('0x829')]();[_0xfb783d('0xcb'),_0xfb783d('0x2a0')][_0xfb783d('0x790')](_0x566818)&&this[_0xfb783d('0x60c')]();_0x566818===_0xfb783d('0x3b8')&&this[_0xfb783d('0x6ef')]();_0x566818===_0xfb783d('0x80e')&&this[_0xfb783d('0x20c')]();_0x566818===_0xfb783d('0x889')&&this[_0xfb783d('0x6d4')]();if(_0x566818===_0xfb783d('0x2d8')){if('OMoMR'===_0xfb783d('0x42e')){function _0x53b66b(){const _0x3b2e34=_0xfb783d;if(!this[_0x3b2e34('0x6d5')]())return;if(_0x256a7a<=0x0)return;this[_0x3b2e34('0x682')]=_0x1a6ff2,this[_0x3b2e34('0x93')]=_0x18e7ba,this['_jumpWholeDuration']=_0x4540a3;}}else this[_0xfb783d('0x13')]();}if(_0x566818[_0xfb783d('0x5e2')](/STYPE: (\d+)/i)){const _0x224205=Number(RegExp['$1']);this[_0xfb783d('0x2ff')](_0x224205);}else{if(_0x566818['match'](/STYPE: (.*)/i)){if(_0xfb783d('0x540')!==_0xfb783d('0x8d3')){const _0x5b73b1=DataManager['getStypeIdWithName'](RegExp['$1']);this[_0xfb783d('0x2ff')](_0x5b73b1);}else{function _0x9cafc9(){const _0x14580=_0xfb783d;return _0x143d53['BattleCore'][_0x14580('0x67f')][_0x14580('0x709')](this);}}}}if(_0x566818===_0xfb783d('0x11d')){if(_0xfb783d('0x2eb')!==_0xfb783d('0x2eb')){function _0x4d8017(){const _0x429f23=_0xfb783d,_0x106478=this['itemLineRect'](this[_0x429f23('0x6b7')]());let _0x2d3c39=this['commandName'](this['index']());_0x2d3c39=_0x2d3c39[_0x429f23('0x65f')](/\\I\[(\d+)\]/gi,''),_0x220968[_0x429f23('0x140')](),this['commandNameWindowDrawBackground'](_0x2d3c39,_0x106478),this['commandNameWindowDrawText'](_0x2d3c39,_0x106478),this['commandNameWindowCenter'](_0x2d3c39,_0x106478);}}else this[_0xfb783d('0x1f6')]();}if(_0x566818[_0xfb783d('0x5e2')](/SKILL: (\d+)/i)){const _0x3b1fa5=Number(RegExp['$1']);this[_0xfb783d('0x686')]($dataSkills[_0x3b1fa5]);}else{if(_0x566818[_0xfb783d('0x5e2')](/SKILL: (.*)/i)){const _0x4b5a87=DataManager[_0xfb783d('0x6b2')](RegExp['$1']);this[_0xfb783d('0x686')]($dataSkills[_0x4b5a87]);}}_0x566818===_0xfb783d('0x73b')&&Imported[_0xfb783d('0x673')]&&this[_0xfb783d('0x3c7')]();},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x829')]=function(){const _0x18b44d=_0x467fb5,_0x9ea6d3=$dataSkills[this[_0x18b44d('0x621')][_0x18b44d('0x234')]()];if(!_0x9ea6d3)return;if(!this[_0x18b44d('0x457')](_0x9ea6d3))return;const _0x3789c3=this[_0x18b44d('0x581')](),_0x5abb72=DataManager[_0x18b44d('0x779')](_0x9ea6d3),_0x22e53f=DataManager[_0x18b44d('0x24d')](_0x9ea6d3),_0x1440e2=_0x3789c3===_0x18b44d('0x5c0')?_0x5abb72:_0x18b44d('0x1f')[_0x18b44d('0x11')](_0x22e53f,_0x5abb72);this[_0x18b44d('0x636')](_0x1440e2,'attack',this[_0x18b44d('0x621')][_0x18b44d('0x5bb')]());},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x6ef')]=function(){const _0x19cd78=_0x467fb5,_0x3c6d11=$dataSkills[this[_0x19cd78('0x621')]['guardSkillId']()];if(!_0x3c6d11)return;if(!this[_0x19cd78('0x457')](_0x3c6d11))return;const _0x3d288a=this['commandStyle'](),_0x1dc70d=DataManager[_0x19cd78('0x779')](_0x3c6d11),_0x4744e4=DataManager[_0x19cd78('0x24d')](_0x3c6d11),_0x16e040=_0x3d288a===_0x19cd78('0x5c0')?_0x1dc70d:'\x5cI[%1]%2'[_0x19cd78('0x11')](_0x4744e4,_0x1dc70d);this['addCommand'](_0x16e040,_0x19cd78('0x560'),this[_0x19cd78('0x621')][_0x19cd78('0x4c6')]());},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x20c')]=function(){const _0x536c4d=_0x467fb5,_0x317693=this['commandStyle'](),_0x5f5db4=VisuMZ[_0x536c4d('0x15b')][_0x536c4d('0x110')][_0x536c4d('0x2d6')][_0x536c4d('0xcf')],_0x29cae5=_0x317693===_0x536c4d('0x5c0')?TextManager['item']:_0x536c4d('0x1f')[_0x536c4d('0x11')](_0x5f5db4,TextManager[_0x536c4d('0x19a')]),_0xf355c9=this[_0x536c4d('0x4f5')]();this[_0x536c4d('0x636')](_0x29cae5,_0x536c4d('0x19a'),_0xf355c9);},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x4f5')]=function(){const _0x1c8c07=_0x467fb5;return this[_0x1c8c07('0x621')]&&this[_0x1c8c07('0x621')]['canUseItemCommand']();},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x60c')]=function(){const _0x23ee0b=_0x467fb5,_0x79629c=this[_0x23ee0b('0x621')][_0x23ee0b('0x2d4')]();for(const _0x334c5c of _0x79629c){if(_0x23ee0b('0x109')!=='AkFqX'){function _0x3a678a(){const _0x4f3ab3=_0x23ee0b;_0xdf3dd[_0x4f3ab3('0x3b0')]()[_0x4f3ab3('0x5ec')]>0x0&&!_0xe5f754[_0x4f3ab3('0x3b0')]()[_0x4f3ab3('0x7c0')]&&this[_0x4f3ab3('0x26f')]('performDamage',_0x4522c1),_0x9f8d70[_0x4f3ab3('0x3b0')]()[_0x4f3ab3('0x5ec')]<0x0&&this['push'](_0x4f3ab3('0x56'),_0x324bf4),_0x301934[_0x4f3ab3('0x15b')][_0x4f3ab3('0x110')][_0x4f3ab3('0x20')][_0x4f3ab3('0x1c3')]&&this[_0x4f3ab3('0x26f')](_0x4f3ab3('0x7bb'),this[_0x4f3ab3('0x459')](_0x13552f));}}else this[_0x23ee0b('0x2ff')](_0x334c5c);}},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x2ff')]=function(_0x2e402b){const _0x257ec2=_0x467fb5;let _0x96f69d=$dataSystem['skillTypes'][_0x2e402b];if(!_0x96f69d)return;let _0x42f5fb=_0x96f69d;const _0xf94198=this[_0x257ec2('0x581')]();if(_0xf94198==='text'){if('Autlc'!==_0x257ec2('0x873')){function _0x31c5fd(){return!![];}}else _0x42f5fb=_0x42f5fb['replace'](/\x1I\[(\d+)\]/gi,''),_0x42f5fb=_0x42f5fb[_0x257ec2('0x65f')](/\\I\[(\d+)\]/gi,'');}else{if(!_0x96f69d[_0x257ec2('0x5e2')](/\\I\[(\d+)\]/i)){if(_0x257ec2('0x205')===_0x257ec2('0x205')){const _0x2359c8=Imported['VisuMZ_1_SkillsStatesCore']?VisuMZ[_0x257ec2('0xbb')][_0x257ec2('0x110')][_0x257ec2('0x5ed')]:VisuMZ['BattleCore'][_0x257ec2('0x110')][_0x257ec2('0x2d6')],_0x35b111=$dataSystem[_0x257ec2('0x6c1')]['includes'](_0x2e402b),_0x26c351=_0x35b111?_0x2359c8[_0x257ec2('0x7ec')]:_0x2359c8[_0x257ec2('0x35')];_0x42f5fb=_0x257ec2('0x1f')[_0x257ec2('0x11')](_0x26c351,_0x96f69d);}else{function _0x35c82e(){const _0x4d171e=_0x257ec2;return _0x10db35[_0x4d171e('0xc9')][_0x4d171e('0x84b')][_0x4d171e('0x709')](this);}}}}this[_0x257ec2('0x636')](_0x42f5fb,_0x257ec2('0x590'),!![],_0x2e402b);},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x1f6')]=function(){const _0x51c0c1=_0x467fb5,_0x17c8d9=this[_0x51c0c1('0x621')]['skillTypes'](),_0x3e437e=this[_0x51c0c1('0x621')][_0x51c0c1('0x171')]();for(const _0x1ea912 of _0x3e437e){if(!_0x1ea912)continue;if(Imported[_0x51c0c1('0x5d3')]){const _0xc07e28=_0x17c8d9[_0x51c0c1('0x649')](_0x5fbef7=>DataManager[_0x51c0c1('0xd7')](_0x1ea912)[_0x51c0c1('0x790')](_0x5fbef7));if(_0xc07e28[_0x51c0c1('0x828')]<=0x0)continue;}else{if(!_0x17c8d9['includes'](_0x1ea912[_0x51c0c1('0x492')]))continue;}this['addSingleSkillCommand'](_0x1ea912);}},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x686')]=function(_0x535f06){const _0x4e1c64=_0x467fb5;if(!_0x535f06)return;if(!this['canAddSkillCommand'](_0x535f06))return;const _0x5172a3=this[_0x4e1c64('0x581')](),_0x331e88=DataManager['battleCommandName'](_0x535f06),_0x481af3=DataManager[_0x4e1c64('0x24d')](_0x535f06),_0x44611c=_0x5172a3==='text'?_0x331e88:_0x4e1c64('0x1f')[_0x4e1c64('0x11')](_0x481af3,_0x331e88),_0x3cb4d4=this[_0x4e1c64('0x621')]['canUse'](_0x535f06);this[_0x4e1c64('0x636')](_0x44611c,'singleSkill',_0x3cb4d4,_0x535f06['id']);},Window_ActorCommand[_0x467fb5('0xc9')]['canAddSkillCommand']=function(_0x5bf079){const _0x7afb26=_0x467fb5,_0x59cd43=_0x5bf079[_0x7afb26('0x50e')];if(_0x59cd43[_0x7afb26('0x5e2')](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0x7afb26('0x621')][_0x7afb26('0x67d')](_0x5bf079['id']))return![];}if(_0x59cd43[_0x7afb26('0x5e2')](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x7afb26('0x621')][_0x7afb26('0x10a')](_0x5bf079['id']))return![];}const _0x4cbb09=VisuMZ['BattleCore'][_0x7afb26('0x878')](_0x5bf079,'CommandVisible');if(VisuMZ['BattleCore']['JS'][_0x4cbb09]){if(_0x7afb26('0x485')!=='MDOnA'){if(!VisuMZ['BattleCore']['JS'][_0x4cbb09][_0x7afb26('0x709')](this,this['_actor'],_0x5bf079))return![];}else{function _0x31bfb2(){const _0x411a5a=_0x7afb26;_0x33ca57[_0x411a5a('0xc9')][_0x411a5a('0x280')][_0x411a5a('0x709')](this),this['updateRefresh'](),this['updateEffectContainers']();if(this[_0x411a5a('0x435')]()===_0x411a5a('0x5bc'))this[_0x411a5a('0x1fa')]();}}}return VisuMZ['BattleCore'][_0x7afb26('0x804')](_0x5bf079);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x804')]=function(_0xd35f84){const _0x39ff7b=_0x467fb5,_0x295d8b=_0xd35f84['note'];if(_0x295d8b[_0x39ff7b('0x5e2')](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('fOPUr'!==_0x39ff7b('0x755')){const _0x3aeb51=JSON[_0x39ff7b('0x665')]('['+RegExp['$1'][_0x39ff7b('0x5e2')](/\d+/g)+']');for(const _0x75a95 of _0x3aeb51){if(!$gameSwitches[_0x39ff7b('0x1b3')](_0x75a95))return![];}return!![];}else{function _0x447f8d(){const _0x31032d=_0x39ff7b;this[_0x31032d('0x3cc')][_0x31032d('0x55')](_0x274b6f);}}}if(_0x295d8b[_0x39ff7b('0x5e2')](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('jdyBJ'===_0x39ff7b('0x8ba')){const _0x51e82c=JSON[_0x39ff7b('0x665')]('['+RegExp['$1'][_0x39ff7b('0x5e2')](/\d+/g)+']');for(const _0x8c95e0 of _0x51e82c){if('kCWlH'===_0x39ff7b('0x184')){if(!$gameSwitches[_0x39ff7b('0x1b3')](_0x8c95e0))return![];}else{function _0x250b31(){const _0x4b287c=_0x39ff7b;this[_0x4b287c('0x79a')]=this[_0x4b287c('0x125')](this[_0x4b287c('0x79a')],this['_targetOpacity'],_0x3a60e6,_0x1a877e,_0x1dea23);}}}return!![];}else{function _0x5992b8(){const _0x50f565=_0x39ff7b;if(!_0x228a42['isSceneBattle']())return;const _0x44cee1=_0x10a4f0[_0x50f565('0x606')]();if(!_0x44cee1)return;_0x44cee1[_0x50f565('0x707')](_0x50f565('0x46'));}}}if(_0x295d8b[_0x39ff7b('0x5e2')](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c5831=JSON['parse']('['+RegExp['$1'][_0x39ff7b('0x5e2')](/\d+/g)+']');for(const _0x33e89a of _0x2c5831){if('NRjGV'===_0x39ff7b('0x4d5')){if($gameSwitches[_0x39ff7b('0x1b3')](_0x33e89a))return!![];}else{function _0x11af52(){_0x3f532c['command119']([_0x1f52dd]);}}}return![];}if(_0x295d8b['match'](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x39ff7b('0x297')===_0x39ff7b('0x6af')){function _0x38502e(){const _0x15e9de=_0x39ff7b;_0x58beda[_0x15e9de('0x670')]([this],_0x35772c,!!_0x2e2b0c);}}else{const _0x44efc2=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1de316 of _0x44efc2){if(!$gameSwitches[_0x39ff7b('0x1b3')](_0x1de316))return!![];}return![];}}if(_0x295d8b[_0x39ff7b('0x5e2')](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4227b5=JSON['parse']('['+RegExp['$1'][_0x39ff7b('0x5e2')](/\d+/g)+']');for(const _0xa8784e of _0x4227b5){if(!$gameSwitches[_0x39ff7b('0x1b3')](_0xa8784e))return!![];}return![];}if(_0x295d8b[_0x39ff7b('0x5e2')](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x119c62=JSON[_0x39ff7b('0x665')]('['+RegExp['$1'][_0x39ff7b('0x5e2')](/\d+/g)+']');for(const _0x4596ee of _0x119c62){if($gameSwitches['value'](_0x4596ee))return![];}return!![];}return!![];},Window_ActorCommand[_0x467fb5('0xc9')]['addEscapeCommand']=function(){const _0x4ec6c1=_0x467fb5,_0x1cf3d9=this[_0x4ec6c1('0x581')](),_0x341312=VisuMZ[_0x4ec6c1('0x15b')][_0x4ec6c1('0x110')][_0x4ec6c1('0x389')][_0x4ec6c1('0x300')],_0x8bdfd8=_0x1cf3d9===_0x4ec6c1('0x5c0')?TextManager[_0x4ec6c1('0x26d')]:_0x4ec6c1('0x1f')[_0x4ec6c1('0x11')](_0x341312,TextManager[_0x4ec6c1('0x26d')]),_0x2c9859=this[_0x4ec6c1('0x817')]();this[_0x4ec6c1('0x636')](_0x8bdfd8,'escape',_0x2c9859);},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x817')]=function(){const _0x2526f8=_0x467fb5;return BattleManager[_0x2526f8('0x461')]();},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x13')]=function(){const _0x556502=_0x467fb5,_0x16e287=this['commandStyle'](),_0x425106=VisuMZ[_0x556502('0x15b')][_0x556502('0x110')]['PartyCmd'][_0x556502('0x239')],_0x55df62=_0x16e287==='text'?TextManager[_0x556502('0x61')]:_0x556502('0x1f')[_0x556502('0x11')](_0x425106,TextManager[_0x556502('0x61')]),_0x48e798=this[_0x556502('0x1c2')]();this['addCommand'](_0x55df62,_0x556502('0x61'),_0x48e798);},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x1c2')]=function(){return!![];},Window_ActorCommand[_0x467fb5('0xc9')]['itemTextAlign']=function(){const _0x39d88c=_0x467fb5;return VisuMZ[_0x39d88c('0x15b')]['Settings']['ActorCmd'][_0x39d88c('0x8dd')];},Window_ActorCommand[_0x467fb5('0xc9')]['drawItem']=function(_0x3b28e8){const _0x5455fc=_0x467fb5,_0x4df0d1=this[_0x5455fc('0x572')](_0x3b28e8);if(_0x4df0d1==='iconText'){if('sHxhu'===_0x5455fc('0x506')){function _0x48eb5e(){const _0x2e7fb1=_0x5455fc,_0x5e25e9=_0x289e10(_0x469452['$1'])[_0x2e7fb1('0x23e')](),_0x1ecdf3=_0x42d3e0(_0x61cf4c['$2']);_0x3a5c17[_0x5e25e9]=_0x1ecdf3,_0xed8472+=_0x1ecdf3;}}else this['drawItemStyleIconText'](_0x3b28e8);}else _0x4df0d1===_0x5455fc('0x2f')?this[_0x5455fc('0x2a3')](_0x3b28e8):Window_Command[_0x5455fc('0xc9')][_0x5455fc('0x56c')][_0x5455fc('0x709')](this,_0x3b28e8);this['drawSingleSkillCost'](_0x3b28e8);},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x581')]=function(){const _0x24e403=_0x467fb5;return VisuMZ[_0x24e403('0x15b')]['Settings'][_0x24e403('0x2d6')][_0x24e403('0x4e0')];},Window_ActorCommand[_0x467fb5('0xc9')]['commandStyleCheck']=function(_0x2c0643){const _0x12bd37=_0x467fb5;if(_0x2c0643<0x0)return _0x12bd37('0x5c0');const _0x193ef1=this[_0x12bd37('0x581')]();if(_0x193ef1!==_0x12bd37('0x8d4')){if(_0x12bd37('0x3e3')!=='siCOg'){function _0x16581(){const _0x38bd66=_0x12bd37;this[_0x38bd66('0x156')](_0x38bd66('0x4d0'));}}else return _0x193ef1;}else{if(this[_0x12bd37('0x659')]()>0x0){const _0x430fcb=this[_0x12bd37('0x80c')](_0x2c0643);if(_0x430fcb['match'](/\\I\[(\d+)\]/i)){const _0x22385d=this[_0x12bd37('0x167')](_0x2c0643),_0x20987a=this[_0x12bd37('0x726')](_0x430fcb)[_0x12bd37('0x6c2')];return _0x20987a<=_0x22385d[_0x12bd37('0x6c2')]?_0x12bd37('0x3be'):'icon';}}}return _0x12bd37('0x5c0');},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x5dc')]=function(_0x35b598){const _0x92e8b8=_0x467fb5,_0x1b7498=this[_0x92e8b8('0x167')](_0x35b598),_0x466697=this['commandName'](_0x35b598),_0x6457ca=this[_0x92e8b8('0x726')](_0x466697)[_0x92e8b8('0x6c2')];this[_0x92e8b8('0x6e9')](this['isCommandEnabled'](_0x35b598));const _0x3566f1=this['itemTextAlign']();if(_0x3566f1===_0x92e8b8('0x883')){if('QHtaH'===_0x92e8b8('0x818'))this[_0x92e8b8('0x191')](_0x466697,_0x1b7498['x']+_0x1b7498[_0x92e8b8('0x6c2')]-_0x6457ca,_0x1b7498['y'],_0x6457ca);else{function _0x15a220(){const _0x59fd83=_0x92e8b8;this['commandName'](_0x5a37ff)[_0x59fd83('0x5e2')](/\\I\[(\d+)\]/i);const _0x4dcf81=_0x470ea1(_0x1bfe13['$1'])||0x0,_0x4ce69e=this[_0x59fd83('0x167')](_0x5c3f5c),_0x2c5359=_0x4ce69e['x']+_0x5d540c[_0x59fd83('0x100')]((_0x4ce69e[_0x59fd83('0x6c2')]-_0xb8abb3[_0x59fd83('0x33f')])/0x2),_0xf2235=_0x4ce69e['y']+(_0x4ce69e[_0x59fd83('0x41e')]-_0x4e5274['iconHeight'])/0x2;this[_0x59fd83('0x562')](_0x4dcf81,_0x2c5359,_0xf2235);}}}else{if(_0x3566f1===_0x92e8b8('0x1f1')){if('SXBpH'!==_0x92e8b8('0x886')){function _0x2ce1aa(){const _0x1770fb=_0x92e8b8;_0xeccbc9[_0x1770fb('0x6de')]=![];}}else{const _0x35922e=_0x1b7498['x']+Math[_0x92e8b8('0x100')]((_0x1b7498[_0x92e8b8('0x6c2')]-_0x6457ca)/0x2);this[_0x92e8b8('0x191')](_0x466697,_0x35922e,_0x1b7498['y'],_0x6457ca);}}else{if(_0x92e8b8('0x570')!==_0x92e8b8('0x3d7'))this['drawTextEx'](_0x466697,_0x1b7498['x'],_0x1b7498['y'],_0x6457ca);else{function _0x5a435b(){const _0x242060=_0x92e8b8,_0x1acc57=0xa,_0x4fb3c7=0x12c*_0x1acc57,_0xd60c06=0x1e*_0x1acc57;this[_0x242060('0x383')](_0x4fb3c7,0x0,_0xd60c06);}}}}},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x2a3')]=function(_0x18ea7c){const _0x17c3fc=_0x467fb5;this['commandName'](_0x18ea7c)['match'](/\\I\[(\d+)\]/i);const _0x45e96d=Number(RegExp['$1'])||0x0,_0x483ce4=this[_0x17c3fc('0x167')](_0x18ea7c),_0x388e35=_0x483ce4['x']+Math['floor']((_0x483ce4['width']-ImageManager[_0x17c3fc('0x33f')])/0x2),_0x3b3f08=_0x483ce4['y']+(_0x483ce4[_0x17c3fc('0x41e')]-ImageManager[_0x17c3fc('0x3ca')])/0x2;this[_0x17c3fc('0x562')](_0x45e96d,_0x388e35,_0x3b3f08);},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x64a')]=function(_0x4fd030){const _0x46d89e=_0x467fb5,_0x2bfcb9=this[_0x46d89e('0x1b8')](_0x4fd030);if(![_0x46d89e('0x87'),'guard',_0x46d89e('0x2f3')][_0x46d89e('0x790')](_0x2bfcb9))return;const _0x4782e3=this[_0x46d89e('0x167')](_0x4fd030);let _0x77fd20=null;if(_0x2bfcb9===_0x46d89e('0x87')){if(_0x46d89e('0x16c')===_0x46d89e('0x45')){function _0x376bae(){const _0x3d3b29=_0x46d89e;return _0x3201aa['getInputButtonString'](_0x3d3b29('0x4aa'));}}else _0x77fd20=$dataSkills[this[_0x46d89e('0x621')][_0x46d89e('0x234')]()];}else{if(_0x2bfcb9==='guard')_0x77fd20=$dataSkills[this['_actor'][_0x46d89e('0x45d')]()];else{if(_0x46d89e('0x6ed')===_0x46d89e('0x88b')){function _0x4f75f8(){const _0x2b18ce=_0x46d89e;_0x541d53['_scene'][_0x2b18ce('0x841')]['removeDamageSprite'](_0x289feb);}}else _0x77fd20=$dataSkills[this['_list'][_0x4fd030][_0x46d89e('0x437')]];}}this[_0x46d89e('0x741')](this[_0x46d89e('0x621')],_0x77fd20,_0x4782e3['x'],_0x4782e3['y'],_0x4782e3[_0x46d89e('0x6c2')]);},Window_ActorCommand[_0x467fb5('0xc9')]['drawSkillCost']=function(_0x3b645b,_0x50cc47,_0x7aa41d,_0x19a35e,_0x2c4167){const _0x667ce8=_0x467fb5;if(!_0x50cc47)return;Imported['VisuMZ_1_SkillsStatesCore']?Window_Command[_0x667ce8('0xc9')][_0x667ce8('0x741')]['call'](this,_0x3b645b,_0x50cc47,_0x7aa41d,_0x19a35e,_0x2c4167):Window_SkillList[_0x667ce8('0xc9')][_0x667ce8('0x741')]['call'](this,_0x50cc47,_0x7aa41d,_0x19a35e,_0x2c4167);},Window_ActorCommand[_0x467fb5('0xc9')]['hide']=function(){},Window_ActorCommand['prototype'][_0x467fb5('0x3c8')]=function(){const _0x1a30e8=_0x467fb5;Window_Command['prototype'][_0x1a30e8('0x3c8')][_0x1a30e8('0x709')](this);const _0x33bd97=this[_0x1a30e8('0x435')]();_0x33bd97===_0x1a30e8('0x5bc')&&this[_0x1a30e8('0x594')]();},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x435')]=function(){const _0x2ece12=_0x467fb5;if(this['_battleLayoutStyle'])return this[_0x2ece12('0x235')];return this[_0x2ece12('0x235')]=SceneManager[_0x2ece12('0x26e')][_0x2ece12('0x435')](),this[_0x2ece12('0x235')];},VisuMZ['BattleCore']['Window_ActorCommand_setup']=Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x6c6')],Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x6c6')]=function(_0x884225){const _0x221bd7=_0x467fb5,_0x3f5d7b=this[_0x221bd7('0x435')]();if(_0x884225&&['xp',_0x221bd7('0x82')]['includes'](_0x3f5d7b)){if(_0x221bd7('0x133')!==_0x221bd7('0x782'))this['resizeWindowXPStyle'](_0x884225);else{function _0x2b6eb0(){const _0x8ae231=_0x221bd7;_0x4fe277[_0x8ae231('0x15b')][_0x8ae231('0x6f4')][_0x8ae231('0x709')](this,_0x2bf85f),this['clearBattleCoreData'](),this['setupBattleCoreData']();const _0x133277=this[_0x8ae231('0x67b')]();if(_0x133277)_0x133277[_0x8ae231('0x1f2')](this);}}}else{if(_0x884225&&[_0x221bd7('0x5bc')][_0x221bd7('0x790')](_0x3f5d7b)){if(_0x221bd7('0x4cb')!=='lOGdI'){function _0x39aece(){const _0x3610a1=_0x221bd7;this[_0x3610a1('0x79e')]();}}else this[_0x221bd7('0x666')](_0x884225),this[_0x221bd7('0x594')]();}}VisuMZ[_0x221bd7('0x15b')][_0x221bd7('0x65c')][_0x221bd7('0x709')](this,_0x884225);if(_0x884225&&$gameTroop[_0x221bd7('0x4dd')]()[_0x221bd7('0x828')]>0x0){if(_0x221bd7('0x7a')===_0x221bd7('0x71f')){function _0x4f60c1(){const _0x1bb2f4=_0x221bd7;_0x3df7ac[_0x1bb2f4('0x15b')][_0x1bb2f4('0x3ff')][_0x1bb2f4('0x709')](this),_0x3d8d17['clearForcedGameTroopSettingsBattleCore']();}}else _0x884225['battler']()[_0x221bd7('0x797')]();}},Window_ActorCommand[_0x467fb5('0xc9')]['resizeWindowXPStyle']=function(_0x60a31b){const _0x352e7b=_0x467fb5,_0x3d9bfb=Math['round'](Graphics[_0x352e7b('0x314')]/0x3),_0x414b37=Math[_0x352e7b('0x1b2')](Graphics['boxWidth']/$gameParty[_0x352e7b('0x41a')]()['length']),_0x3693e1=Math[_0x352e7b('0x5e9')](_0x3d9bfb,_0x414b37),_0x239b11=this['fittingHeight'](VisuMZ[_0x352e7b('0x15b')][_0x352e7b('0x110')][_0x352e7b('0x5e')]['XPActorCommandLines']),_0xb1e902=_0x414b37*_0x60a31b[_0x352e7b('0x6b7')]()+(_0x414b37-_0x3693e1)/0x2,_0x3389b0=SceneManager[_0x352e7b('0x26e')][_0x352e7b('0x841')]['y']-_0x239b11;this[_0x352e7b('0x382')](_0xb1e902,_0x3389b0,_0x3693e1,_0x239b11),this[_0x352e7b('0x195')](),this[_0x352e7b('0x5d4')](0x1);},Window_ActorCommand[_0x467fb5('0xc9')]['resizeWindowBorderStyle']=function(_0x857cc){const _0x3e71aa=_0x467fb5,_0x5d47d4=SceneManager['_scene'][_0x3e71aa('0x864')]();this['move'](_0x5d47d4['x'],_0x5d47d4['y'],_0x5d47d4['width'],_0x5d47d4[_0x3e71aa('0x41e')]),this['createContents'](),this['setBackgroundType'](0x0);},Window_ActorCommand[_0x467fb5('0xc9')][_0x467fb5('0x2b9')]=function(){const _0xd7666f=_0x467fb5;if(this[_0xd7666f('0x473')]){const _0x3a8344=this[_0xd7666f('0x473')]['bitmap'],_0x58921d=this[_0xd7666f('0x6c2')]-0x8,_0x3f9f8a=this['height'],_0x16cfd3=this[_0xd7666f('0x35f')],_0xdc407a=ColorManager[_0xd7666f('0x466')](),_0x8c23ad=ColorManager[_0xd7666f('0x688')]();this['_dimmerSprite']['x']=0x4,_0x3a8344[_0xd7666f('0x2fa')](_0x58921d,_0x3f9f8a),_0x3a8344[_0xd7666f('0xd2')](0x0,0x0,_0x58921d,_0x16cfd3,_0x8c23ad,_0xdc407a,!![]),_0x3a8344[_0xd7666f('0x53b')](0x0,_0x16cfd3,_0x58921d,_0x3f9f8a-_0x16cfd3*0x2,_0xdc407a),_0x3a8344['gradientFillRect'](0x0,_0x3f9f8a-_0x16cfd3,_0x58921d,_0x16cfd3,_0xdc407a,_0x8c23ad,!![]),this['_dimmerSprite'][_0xd7666f('0x874')](0x0,0x0,_0x58921d,_0x3f9f8a);}},Window_ActorCommand[_0x467fb5('0xc9')]['updateHelp']=function(){const _0x1e4fcd=_0x467fb5;if(!this[_0x1e4fcd('0x621')])return;const _0x1ddf6b=VisuMZ['BattleCore']['Settings'][_0x1e4fcd('0x2d6')],_0x26a4ae=this[_0x1e4fcd('0x67c')]();switch(_0x26a4ae){case _0x1e4fcd('0x87'):this[_0x1e4fcd('0x46e')]($dataSkills[this[_0x1e4fcd('0x621')][_0x1e4fcd('0x234')]()]);break;case _0x1e4fcd('0x560'):this[_0x1e4fcd('0x46e')]($dataSkills[this[_0x1e4fcd('0x621')][_0x1e4fcd('0x45d')]()]);break;case _0x1e4fcd('0x590'):const _0x1f85da=_0x1ddf6b[_0x1e4fcd('0x5e7')],_0x2ac882=_0x1f85da[_0x1e4fcd('0x11')]($dataSystem[_0x1e4fcd('0x2d4')][this[_0x1e4fcd('0x17f')]()]);this['_helpWindow'][_0x1e4fcd('0x379')](_0x2ac882);break;case _0x1e4fcd('0x2f3'):this['setHelpWindowItem']($dataSkills[this[_0x1e4fcd('0x17f')]()]);break;case _0x1e4fcd('0x19a'):this['_helpWindow'][_0x1e4fcd('0x379')](_0x1ddf6b[_0x1e4fcd('0x472')]);break;case _0x1e4fcd('0x26d'):this[_0x1e4fcd('0x47f')]['setText'](_0x1ddf6b[_0x1e4fcd('0x7ee')]);break;case _0x1e4fcd('0x61'):this['_helpWindow']['setText'](_0x1ddf6b[_0x1e4fcd('0x5e8')]);break;default:this[_0x1e4fcd('0x47f')]['setText']('');break;}},VisuMZ[_0x467fb5('0x15b')]['Window_BattleStatus_initialize']=Window_BattleStatus[_0x467fb5('0xc9')]['initialize'],Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x229')]=function(_0x574c1d){const _0x2c714e=_0x467fb5;VisuMZ['BattleCore'][_0x2c714e('0x271')]['call'](this,_0x574c1d),this['initBattleCore']();},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x62e')]=function(){const _0x42b798=_0x467fb5;this[_0x42b798('0x1db')]=this['isFrameVisible']();},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x435')]=function(){const _0x5cf587=_0x467fb5;if(this[_0x5cf587('0x235')])return this['_battleLayoutStyle'];return this[_0x5cf587('0x235')]=SceneManager[_0x5cf587('0x26e')][_0x5cf587('0x435')](),this[_0x5cf587('0x235')];},Window_BattleStatus['prototype'][_0x467fb5('0x497')]=function(){const _0x22c196=_0x467fb5,_0x40b617=this[_0x22c196('0x435')]();switch(_0x40b617){case _0x22c196('0x34c'):case'border':return!![];break;case'default':case'xp':case _0x22c196('0x82'):default:return![];break;}},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x604')]=function(){const _0xcf4501=_0x467fb5;if(this['isFrameVisible']())return 0x0;else{if(_0xcf4501('0x646')===_0xcf4501('0x1b4')){function _0x10baaf(){const _0x33a4dd=_0xcf4501;return[_0x3b9039][_0x33a4dd('0x112')](_0x399153);}}else return 0xa;}},Window_BattleStatus[_0x467fb5('0xc9')]['maxCols']=function(){const _0x3cd3f7=_0x467fb5,_0x32860b=this[_0x3cd3f7('0x435')]();switch(_0x32860b){case'list':return 0x1;break;case'xp':case'portrait':return $gameParty[_0x3cd3f7('0x41a')]()[_0x3cd3f7('0x828')];break;case _0x3cd3f7('0x549'):default:return $gameParty[_0x3cd3f7('0x494')]();break;}},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x5f2')]=function(){const _0x19c8c0=_0x467fb5,_0x4292a8=this['battleLayoutStyle']();switch(_0x4292a8){case _0x19c8c0('0x34c'):return Window_StatusBase[_0x19c8c0('0xc9')]['itemHeight'][_0x19c8c0('0x709')](this);break;case _0x19c8c0('0x549'):case'xp':case'portrait':default:return this[_0x19c8c0('0x230')];break;}},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x44a')]=function(){const _0x53101e=_0x467fb5,_0x49086c=this['battleLayoutStyle']();switch(_0x49086c){case _0x53101e('0x34c'):return Window_StatusBase[_0x53101e('0xc9')][_0x53101e('0x44a')][_0x53101e('0x709')](this);break;case _0x53101e('0x549'):case'xp':case _0x53101e('0x82'):default:return 0x0;break;}},Window_BattleStatus[_0x467fb5('0xc9')]['updatePadding']=function(){const _0x3d56e0=_0x467fb5;if(this['isFrameVisible']())Window_StatusBase['prototype']['updatePadding'][_0x3d56e0('0x709')](this);else{if(_0x3d56e0('0x45e')===_0x3d56e0('0x45e'))this[_0x3d56e0('0x35f')]=0x8;else{function _0xf5d98c(){const _0x130208=_0x3d56e0,_0x41429c=_0x47e352[_0x130208('0x50e')];if(_0x41429c['match'](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x3ecf76=_0x38bd71(_0x19b9ff['$1']),_0x298c88=_0x4fc90b[_0x130208('0x15b')][_0x130208('0x878')](_0xec44d7,_0x130208('0x27f'));_0x244dfa[_0x130208('0x15b')][_0x130208('0x330')](_0x3ecf76,_0x298c88);}if(_0x41429c[_0x130208('0x5e2')](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x2a1bc9=_0x504105(_0x33631e['$1']),_0x15573c=_0x43973c[_0x130208('0x15b')][_0x130208('0x878')](_0x3af2ce,_0x130208('0x7ca'));_0x3115e0['BattleCore']['createCommandVisibleJS'](_0x2a1bc9,_0x15573c);}}}}},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x32d')]=function(){this['_requestRefresh']=!![];},Window_BattleStatus[_0x467fb5('0xc9')]['update']=function(){const _0x16324c=_0x467fb5;Window_StatusBase[_0x16324c('0xc9')][_0x16324c('0x280')][_0x16324c('0x709')](this),this[_0x16324c('0x833')](),this[_0x16324c('0x5ce')]();if(this['battleLayoutStyle']()===_0x16324c('0x5bc'))this[_0x16324c('0x1fa')]();},Window_BattleStatus['prototype'][_0x467fb5('0x833')]=function(){const _0x34da3e=_0x467fb5;this[_0x34da3e('0x7c9')]&&(this[_0x34da3e('0x7c9')]=![],this[_0x34da3e('0x6c5')]());},Window_BattleStatus['prototype'][_0x467fb5('0x759')]=function(){const _0x3f8a20=_0x467fb5;Window_StatusBase['prototype'][_0x3f8a20('0x759')][_0x3f8a20('0x709')](this);if(!$gameSystem[_0x3f8a20('0xe1')]())this[_0x3f8a20('0x6c5')]();},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x12d')]=function(){const _0xbbc9d0=_0x467fb5;if(this[_0xbbc9d0('0x7b9')]===Window_BattleStatus)return;Window_StatusBase['prototype']['hide'][_0xbbc9d0('0x709')](this);},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x8db')]=function(_0x35751a){const _0x2e31c8=_0x467fb5,_0x76ccb9=this[_0x2e31c8('0x435')]();switch(_0x76ccb9){case'xp':case'portrait':break;case _0x2e31c8('0x549'):case'list':default:return Window_StatusBase['prototype'][_0x2e31c8('0x8db')]['call'](this,_0x35751a);break;}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x375')]=Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x6b6')],Window_BattleStatus[_0x467fb5('0xc9')]['drawItemImage']=function(_0x5c701f){const _0x3f20da=_0x467fb5,_0x4bc20d=this[_0x3f20da('0x435')]();switch(_0x4bc20d){case _0x3f20da('0x34c'):this['drawItemImageListStyle'](_0x5c701f);break;case'xp':this[_0x3f20da('0x59a')](_0x5c701f);break;case _0x3f20da('0x82'):this['drawItemImagePortraitStyle'](_0x5c701f);break;case _0x3f20da('0x549'):case _0x3f20da('0x5bc'):default:VisuMZ[_0x3f20da('0x15b')][_0x3f20da('0x375')]['call'](this,_0x5c701f);break;}},Window_BattleStatus['prototype']['drawItemStatus']=function(_0xe652b7){const _0x1aba03=_0x467fb5,_0x84ee8b=this[_0x1aba03('0x435')]();if(!$gameSystem[_0x1aba03('0xe1')]())this[_0x1aba03('0x701')](_0xe652b7);switch(_0x84ee8b){case'list':this[_0x1aba03('0x373')](_0xe652b7);break;case'xp':case _0x1aba03('0x82'):case _0x1aba03('0x549'):default:this[_0x1aba03('0x3dc')](_0xe652b7);break;}},Window_BattleStatus[_0x467fb5('0xc9')]['refreshCursor']=function(){const _0x491b01=_0x467fb5,_0x2eacc5=this[_0x491b01('0x435')]();if(['xp'][_0x491b01('0x790')](_0x2eacc5)&&!$gameSystem[_0x491b01('0xe1')]()){this[_0x491b01('0x164')](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x491b01('0xc9')][_0x491b01('0x35b')][_0x491b01('0x709')](this);},Window_BattleStatus['prototype']['centerFrontViewSprite']=function(_0x564b24){const _0x41a5e2=_0x467fb5,_0x1ecd2e=this[_0x41a5e2('0x23')](_0x564b24)['battler']();if(!_0x1ecd2e)return;const _0x4138ab=this[_0x41a5e2('0x435')](),_0x4308b7=this['itemRect'](_0x564b24);let _0x1a5bac=Math['round'](_0x4308b7['x']+_0x4308b7[_0x41a5e2('0x6c2')]/0x2);if([_0x41a5e2('0x34c')]['includes'](_0x4138ab)){if('jAHxm'===_0x41a5e2('0x34f')){function _0x545400(){const _0x3d3b1a=_0x41a5e2;_0x4516c9[_0x3d3b1a('0x214')]();}}else _0x1a5bac=_0x4308b7['width']/$gameParty['battleMembers']()[_0x41a5e2('0x828')],_0x1a5bac*=_0x564b24,_0x1a5bac+=_0x4308b7['width']/$gameParty[_0x41a5e2('0x41a')]()['length']/0x2;}let _0x5732f5=Math[_0x41a5e2('0x1b2')](this[_0x41a5e2('0x1d9')](_0x564b24,_0x1ecd2e,_0x4308b7));_0x1ecd2e[_0x41a5e2('0x12a')](_0x1a5bac,_0x5732f5),this[_0x41a5e2('0x22c')](_0x1ecd2e,0x1),_0x1ecd2e[_0x41a5e2('0x759')]();},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x1d9')]=function(_0x4a08d6,_0xa204d9,_0x429606){const _0x3f6aa0=_0x467fb5,_0x15fe91=VisuMZ['BattleCore'][_0x3f6aa0('0x110')][_0x3f6aa0('0x5e')],_0x450142=this[_0x3f6aa0('0x435')]();if(_0x450142==='xp'){const _0x24e95b=_0x15fe91[_0x3f6aa0('0x622')];switch(_0x24e95b[_0x3f6aa0('0x118')]()[_0x3f6aa0('0x23e')]()){case'bottom':return _0x429606[_0x3f6aa0('0x41e')]-_0xa204d9[_0x3f6aa0('0x145')][_0x3f6aa0('0x41e')]/0x4;break;case _0x3f6aa0('0x1f1'):const _0x1ed5d4=_0x15fe91[_0x3f6aa0('0x638')];return(_0x429606[_0x3f6aa0('0x41e')]+(_0xa204d9[_0x3f6aa0('0x41e')]||_0x1ed5d4))/0x2;break;case'top':return 0x0;case'name':default:return this[_0x3f6aa0('0x8e1')](_0x429606);break;}}else{if(_0x450142===_0x3f6aa0('0x82')){}}return _0xa204d9[_0x3f6aa0('0x41e')];},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x786')]=function(_0x562945){const _0x30dae5=_0x467fb5;if(!VisuMZ[_0x30dae5('0x15b')][_0x30dae5('0x110')][_0x30dae5('0x5e')]['ShowFacesListStyle'])return;const _0x1b4caf=this[_0x30dae5('0x23')](_0x562945),_0x4e7939=this[_0x30dae5('0x711')](_0x562945);_0x4e7939[_0x30dae5('0x6c2')]=ImageManager[_0x30dae5('0x24f')],_0x4e7939['height']-=0x2,this[_0x30dae5('0x5f3')](_0x1b4caf,_0x4e7939['x']+0x1,_0x4e7939['y']+0x1,_0x4e7939[_0x30dae5('0x6c2')],_0x4e7939[_0x30dae5('0x41e')]);},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x373')]=function(_0x220eb3){const _0x564ce4=_0x467fb5,_0x111364=$dataSystem[_0x564ce4('0x49c')]?0x4:0x3,_0x3aebba=_0x111364*0x80+(_0x111364-0x1)*0x8+0x4,_0x394385=this[_0x564ce4('0x23')](_0x220eb3),_0x2561a0=this['itemRect'](_0x220eb3);let _0x319e94=_0x2561a0['x']+this[_0x564ce4('0x35f')];if(VisuMZ[_0x564ce4('0x15b')]['Settings'][_0x564ce4('0x5e')]['ShowFacesListStyle']){if(_0x564ce4('0x126')===_0x564ce4('0xcc')){function _0x6b80a6(){const _0xc26f6a=_0x564ce4;let _0x4315c9=-0x10,_0xb12dcf=this[_0xc26f6a('0x41e')]*0.5;const _0xb6aeb0=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x4c970a=this['_battler'][_0xc26f6a('0x4f3')]()[_0xc26f6a('0xae')](_0x4954d3=>_0x4954d3&&_0x4954d3['note'][_0xc26f6a('0x5e2')](_0xb6aeb0)?_0x30dd49(_0x17985c['$1']):0x0),_0x11f568=this[_0xc26f6a('0x33a')][_0xc26f6a('0x4f3')]()[_0xc26f6a('0xae')](_0x5e310f=>_0x5e310f&&_0x5e310f['note'][_0xc26f6a('0x5e2')](_0xb6aeb0)?_0x5ed669(_0x207159['$2']):0x0);_0x4315c9=_0x4c970a['reduce']((_0x29ce3a,_0x24b918)=>_0x29ce3a+_0x24b918,_0x4315c9),_0xb12dcf=_0x11f568[_0xc26f6a('0x313')]((_0x23fa94,_0x587092)=>_0x23fa94+_0x587092,_0xb12dcf),this['_weaponSprite']['x']=_0x4315c9,this[_0xc26f6a('0x1a7')]['y']=_0xb12dcf,this['_weaponSprite']['update']();}}else _0x319e94=_0x2561a0['x']+ImageManager[_0x564ce4('0x24f')]+0x8;}else _0x319e94+=ImageManager[_0x564ce4('0x33f')];const _0x10e8b0=Math['round'](Math[_0x564ce4('0x5e9')](_0x2561a0['x']+_0x2561a0['width']-_0x3aebba,_0x319e94)),_0x371c3c=Math[_0x564ce4('0x1b2')](_0x2561a0['y']+(_0x2561a0[_0x564ce4('0x41e')]-Sprite_Name[_0x564ce4('0xc9')][_0x564ce4('0x28d')]())/0x2),_0x3a86c4=Math[_0x564ce4('0x1b2')](_0x10e8b0-ImageManager[_0x564ce4('0x33f')]/0x2-0x4),_0x3656c1=Math[_0x564ce4('0x1b2')](_0x2561a0['y']+(_0x2561a0['height']-ImageManager['iconHeight'])/0x2+ImageManager[_0x564ce4('0x3ca')]/0x2);let _0xe07abe=_0x10e8b0+0x88;const _0x235a4f=_0x371c3c;this[_0x564ce4('0xbf')](_0x394385,_0x10e8b0-0x4,_0x371c3c),this['placeActorName'](_0x394385,_0x10e8b0,_0x371c3c),this[_0x564ce4('0x891')](_0x394385,_0x3a86c4,_0x3656c1),this[_0x564ce4('0x7bc')](_0x394385,'hp',_0xe07abe+0x88*0x0,_0x235a4f),this[_0x564ce4('0x7bc')](_0x394385,'mp',_0xe07abe+0x88*0x1,_0x235a4f);if($dataSystem[_0x564ce4('0x49c')]){if('ZrxbT'===_0x564ce4('0x104')){function _0x144ddb(){const _0x3c994f=_0x564ce4;_0x1692bc['BattleCore'][_0x3c994f('0x30b')]['call'](this);}}else this['placeGauge'](_0x394385,'tp',_0xe07abe+0x88*0x2,_0x235a4f);}},Window_BattleStatus[_0x467fb5('0xc9')]['drawItemImageXPStyle']=function(_0x4d9f7e){const _0x5e127c=_0x467fb5;if(!$gameSystem[_0x5e127c('0xe1')]())return;VisuMZ['BattleCore']['Window_BattleStatus_drawItemImage'][_0x5e127c('0x709')](this,_0x4d9f7e);},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x3dc')]=function(_0x229130){const _0x2054cf=_0x467fb5,_0x2c08db=this['actor'](_0x229130),_0x272597=this[_0x2054cf('0x711')](_0x229130),_0x2e6b43=Math['round'](_0x272597['x']+(_0x272597[_0x2054cf('0x6c2')]-0x80)/0x2),_0x476741=this[_0x2054cf('0x8e1')](_0x272597);let _0x1eeac7=_0x2e6b43-ImageManager['iconWidth']/0x2-0x4,_0xb5ee9f=_0x476741+ImageManager['iconHeight']/0x2;if(_0x1eeac7-ImageManager[_0x2054cf('0x33f')]/0x2<_0x272597['x']){if(_0x2054cf('0x20b')===_0x2054cf('0x832')){function _0x2e5646(){const _0x500810=_0x2054cf;this[_0x500810('0x707')](_0x500810('0x7ed'));}}else _0x1eeac7=_0x2e6b43+ImageManager[_0x2054cf('0x33f')]/0x2-0x4,_0xb5ee9f=_0x476741-ImageManager[_0x2054cf('0x3ca')]/0x2;}const _0x212e7=_0x2e6b43,_0x3ec145=this[_0x2054cf('0x4c9')](_0x272597);this[_0x2054cf('0xbf')](_0x2c08db,_0x2e6b43,_0x476741),this['placeActorName'](_0x2c08db,_0x2e6b43,_0x476741),this[_0x2054cf('0x891')](_0x2c08db,_0x1eeac7,_0xb5ee9f),this[_0x2054cf('0x4a2')](_0x2c08db,_0x212e7,_0x3ec145);},Window_BattleStatus[_0x467fb5('0xc9')]['showPortraits']=function(_0x189fbe){const _0x469e9c=_0x467fb5;if(!VisuMZ[_0x469e9c('0x15b')][_0x469e9c('0x110')]['BattleLayout']['ShowPortraits'])return![];if(_0x189fbe[_0x469e9c('0xed')]())return!![];return Imported[_0x469e9c('0x5ba')]&&_0x189fbe[_0x469e9c('0x419')]();},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x2bb')]=function(_0x4656b7){const _0x10b753=_0x467fb5,_0x325b80=this['actor'](_0x4656b7);if(this[_0x10b753('0x331')](_0x325b80)){const _0x19d009='actor%1-portrait'[_0x10b753('0x11')](_0x325b80[_0x10b753('0xa7')]()),_0x21f735=this[_0x10b753('0x4a9')](_0x19d009,Sprite),_0x49f56f=_0x325b80[_0x10b753('0x800')]();_0x49f56f!==''?_0x21f735[_0x10b753('0x30a')]=ImageManager[_0x10b753('0x46b')](_0x49f56f):_0x21f735[_0x10b753('0x30a')]=ImageManager['_emptyBitmap'];const _0x1d0a33=this['itemRect'](_0x4656b7);_0x21f735[_0x10b753('0x1d6')]['x']=0.5,_0x21f735[_0x10b753('0x1d6')]['y']=0x1;const _0x4cf5c2=Math[_0x10b753('0x1b2')](_0x1d0a33['x']+_0x1d0a33[_0x10b753('0x6c2')]/0x2)+this[_0x10b753('0x35f')],_0x243f65=Math[_0x10b753('0x1b2')](this[_0x10b753('0x41e')]);_0x21f735[_0x10b753('0x382')](_0x4cf5c2,_0x243f65);const _0x47a8b6=VisuMZ[_0x10b753('0x15b')][_0x10b753('0x110')]['BattleLayout'][_0x10b753('0x380')];_0x21f735[_0x10b753('0x3e7')]['x']=_0x47a8b6,_0x21f735['scale']['y']=_0x47a8b6,_0x21f735['show']();}else{if(_0x10b753('0x87c')!==_0x10b753('0x4a1')){const _0x316feb=this[_0x10b753('0x29b')](_0x4656b7);this[_0x10b753('0x5f3')](_0x325b80,_0x316feb['x'],_0x316feb['y'],_0x316feb['width'],_0x316feb[_0x10b753('0x41e')]);}else{function _0x41d69e(){const _0x2e0fa6=_0x10b753,_0x5d4f1b=_0x4c127b(_0x214d23['$1']);_0x5d4f1b!==_0x4c0eed[_0xde65e5][_0x2e0fa6('0xb8')]&&(_0xb9739c(_0x2e0fa6('0x1e4')['format'](_0x5569a1,_0x5d4f1b)),_0x1ba971[_0x2e0fa6('0x4c5')]());}}}},Window_BattleStatus[_0x467fb5('0xc9')]['createInnerPortrait']=function(_0x31591b,_0x165bcc){const _0x3200b1=_0x467fb5,_0x541760=this[_0x3200b1('0x45a')];if(_0x541760[_0x31591b])return _0x541760[_0x31591b];else{const _0x466499=new _0x165bcc();return _0x541760[_0x31591b]=_0x466499,this[_0x3200b1('0x8ee')](_0x466499),this['addChildToBack'](this['_cursorArea']),_0x466499;}},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x36b')]=function(){const _0x5613ed=_0x467fb5;this[_0x5613ed('0x5fe')](),this['_createEffectsContainer'](),Window_StatusBase[_0x5613ed('0xc9')][_0x5613ed('0x36b')][_0x5613ed('0x709')](this),this[_0x5613ed('0x861')]();},Window_BattleStatus['prototype']['_createCursorArea']=function(){const _0x2701dd=_0x467fb5;this['_cursorArea']=new Sprite(),this[_0x2701dd('0x538')][_0x2701dd('0xb5')]=[new PIXI[(_0x2701dd('0xb5'))][(_0x2701dd('0x447'))]()],this[_0x2701dd('0x538')]['filterArea']=new Rectangle(),this[_0x2701dd('0x538')][_0x2701dd('0x382')](this['_padding'],this[_0x2701dd('0x7e1')]),this['addChild'](this[_0x2701dd('0x538')]);},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x29c')]=function(){const _0x251ec4=_0x467fb5;this[_0x251ec4('0x7a7')]=new Sprite(),this[_0x251ec4('0x209')](this['_effectsContainer']);},Window_BattleStatus['prototype'][_0x467fb5('0x861')]=function(){const _0x4bf511=_0x467fb5;this[_0x4bf511('0xf8')]=new Sprite(),this[_0x4bf511('0x209')](this[_0x4bf511('0xf8')]);},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x470')]=function(){const _0x4a4318=_0x467fb5;this['_cursorSprite']=new Sprite();for(let _0x37b082=0x0;_0x37b082<0x9;_0x37b082++){this[_0x4a4318('0x128')][_0x4a4318('0x209')](new Sprite());}this[_0x4a4318('0x538')]['addChild'](this[_0x4a4318('0x128')]);},Window_BattleStatus[_0x467fb5('0xc9')]['_updateClientArea']=function(){const _0x3df54a=_0x467fb5;Window_StatusBase[_0x3df54a('0xc9')][_0x3df54a('0x491')][_0x3df54a('0x709')](this),this[_0x3df54a('0x73c')]();},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x73c')]=function(){const _0x1e1d10=_0x467fb5,_0x1f0b40=this[_0x1e1d10('0x7e1')];this[_0x1e1d10('0x538')][_0x1e1d10('0x382')](_0x1f0b40,_0x1f0b40),this[_0x1e1d10('0x538')]['x']=_0x1f0b40-this[_0x1e1d10('0x71c')]['x'],this[_0x1e1d10('0x538')]['y']=_0x1f0b40-this[_0x1e1d10('0x71c')]['y'];if(this[_0x1e1d10('0x851')]>0x0&&this['innerHeight']>0x0)this[_0x1e1d10('0x538')][_0x1e1d10('0x735')]=this[_0x1e1d10('0x3c4')]();else{if(_0x1e1d10('0x6cb')===_0x1e1d10('0x8cb')){function _0x1bd004(){const _0x56b9bc=_0x1e1d10;return _0x2997c5['BattleCore'][_0x56b9bc('0x110')][_0x56b9bc('0x231')][_0x56b9bc('0x2d1')];}}else this[_0x1e1d10('0x538')]['visible']=![];}},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x612')]=function(){const _0x57c363=_0x467fb5;Window_StatusBase[_0x57c363('0xc9')][_0x57c363('0x612')]['call'](this),this[_0x57c363('0x1a8')]();},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x1a8')]=function(){const _0x4348ec=_0x467fb5,_0x39412d=this[_0x4348ec('0x538')][_0x4348ec('0x7f3')]['apply'](new Point(0x0,0x0)),_0x13bcad=this[_0x4348ec('0x538')]['filterArea'];_0x13bcad['x']=_0x39412d['x']+this[_0x4348ec('0x71c')]['x'],_0x13bcad['y']=_0x39412d['y']+this[_0x4348ec('0x71c')]['y'],_0x13bcad[_0x4348ec('0x6c2')]=this[_0x4348ec('0x851')],_0x13bcad[_0x4348ec('0x41e')]=this[_0x4348ec('0x230')];},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x7dc')]=function(_0x1161fc){const _0x42d4d=_0x467fb5;if(this[_0x42d4d('0x435')]()!==_0x42d4d('0x82'))return;this[_0x42d4d('0x2bb')](_0x1161fc[_0x42d4d('0x6b7')]());},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x299')]=function(_0x495a37,_0x5a389d){const _0x145002=_0x467fb5;if(!this[_0x145002('0xf8')])return;if(!_0x495a37)return;if(!_0x5a389d)return;const _0x1697a6=this[_0x145002('0x711')](_0x5a389d[_0x145002('0x6b7')]());_0x1697a6['x']+=_0x1697a6[_0x145002('0x6c2')]/0x2+this['padding'],_0x495a37['x']=_0x1697a6['x'],_0x495a37['y']=_0x1697a6['y'],this['_damageContainer']['addChild'](_0x495a37);},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x2f9')]=function(_0x3926c0){const _0x2343c0=_0x467fb5;if(!this[_0x2343c0('0xf8')])return;if(!_0x3926c0)return;this[_0x2343c0('0xf8')][_0x2343c0('0x55')](_0x3926c0);},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x1fa')]=function(){const _0x2ef4a1=_0x467fb5;if(!this['isBorderStylePortraitShown']())return;if(!this['_borderPortraitSprite'])this[_0x2ef4a1('0x8eb')]();this['prepareBorderActor'](),this[_0x2ef4a1('0x81a')]();},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x823')]=function(){const _0x171520=_0x467fb5;if(this[_0x171520('0x7b9')]!==Window_BattleStatus)return![];if(!SceneManager[_0x171520('0x21')]())return![];return VisuMZ[_0x171520('0x15b')][_0x171520('0x110')][_0x171520('0x5e')][_0x171520('0x674')];},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x8eb')]=function(){const _0x44dc74=_0x467fb5;this['_borderPortraitSprite']=new Sprite();const _0x3ed4ef=SceneManager[_0x44dc74('0x26e')],_0x46b8ac=_0x3ed4ef['children']['indexOf'](_0x3ed4ef[_0x44dc74('0x8e6')]);_0x3ed4ef[_0x44dc74('0x22c')](this[_0x44dc74('0x433')],_0x46b8ac),this['_borderPortraitSprite']['anchor']['x']=0.5,this[_0x44dc74('0x433')][_0x44dc74('0x1d6')]['y']=0x1;const _0x7d5751=VisuMZ['BattleCore'][_0x44dc74('0x110')]['BattleLayout'][_0x44dc74('0x25e')];this[_0x44dc74('0x433')][_0x44dc74('0x3e7')]['x']=_0x7d5751,this[_0x44dc74('0x433')][_0x44dc74('0x3e7')]['y']=_0x7d5751,this[_0x44dc74('0x433')]['y']=this['y']+this[_0x44dc74('0x41e')],this['_borderPortraitDuration']=0x0;},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x599')]=function(){const _0x56641f=_0x467fb5;this[_0x56641f('0x433')]['visible']=BattleManager[_0x56641f('0x8b')]();const _0x40f2ff=BattleManager['actor']();if(_0x40f2ff===this[_0x56641f('0x433')][_0x56641f('0x23')])return;this[_0x56641f('0x433')][_0x56641f('0x23')]=_0x40f2ff||this[_0x56641f('0x433')][_0x56641f('0x23')];if(!_0x40f2ff)return;else{if(_0x40f2ff[_0x56641f('0x800')]()===''){this[_0x56641f('0x433')]['bitmap']=ImageManager[_0x56641f('0x139')];return;}else{const _0x488cf6=ImageManager[_0x56641f('0x46b')](_0x40f2ff[_0x56641f('0x800')]());_0x488cf6[_0x56641f('0x2a2')](this[_0x56641f('0x653')][_0x56641f('0x3c1')](this,_0x488cf6));}}},Window_BattleStatus[_0x467fb5('0xc9')]['processBorderActor']=function(_0x29bb6f){const _0x72898c=_0x467fb5;this['_borderPortraitDuration']=0x14,this[_0x72898c('0x433')][_0x72898c('0x30a')]=_0x29bb6f;if(SceneManager[_0x72898c('0x26e')][_0x72898c('0x5c3')]()){if(_0x72898c('0x188')===_0x72898c('0x423')){function _0x49412a(){const _0x329bf2=_0x72898c;if(this[_0x329bf2('0x4a0')]()>=0x1)return!![];return this[_0x329bf2('0x98')]()[_0x329bf2('0x296')];}}else this['_borderPortraitSprite']['x']=0x0,this[_0x72898c('0x7b7')]=Math[_0x72898c('0x2dc')](_0x29bb6f['width']/0x2);}else this['_borderPortraitSprite']['x']=this['width'],this[_0x72898c('0x7b7')]=this[_0x72898c('0x6c2')]*0x3/0x4;this[_0x72898c('0x433')]['opacity']=0x0;},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x81a')]=function(){const _0x5e1e80=_0x467fb5;if(this[_0x5e1e80('0x4c3')]>0x0){if(_0x5e1e80('0x52a')!==_0x5e1e80('0x52a')){function _0x1760dd(){const _0xe6747e=_0x5e1e80;return this[_0xe6747e('0x329')]();}}else{const _0x1b08bc=this[_0x5e1e80('0x4c3')],_0x48cf44=this['_borderPortraitSprite'];_0x48cf44['x']=(_0x48cf44['x']*(_0x1b08bc-0x1)+this[_0x5e1e80('0x7b7')])/_0x1b08bc,_0x48cf44[_0x5e1e80('0x79a')]=(_0x48cf44[_0x5e1e80('0x79a')]*(_0x1b08bc-0x1)+0xff)/_0x1b08bc,this[_0x5e1e80('0x4c3')]--;}}},Window_BattleStatus[_0x467fb5('0xc9')][_0x467fb5('0x5ce')]=function(){const _0x23cf08=_0x467fb5;return;if(this[_0x23cf08('0x7a7')]){if(_0x23cf08('0x602')===_0x23cf08('0x602'))this['_effectsContainer']['x']=this['x'],this['_effectsContainer']['y']=this['y'];else{function _0x34c4a4(){return this['_isBattlerFlipped'];}}}this[_0x23cf08('0xf8')]&&(this[_0x23cf08('0xf8')]['x']=this['x'],this['_damageContainer']['y']=this['y']);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3e6')]=Window_BattleEnemy[_0x467fb5('0xc9')][_0x467fb5('0x229')],Window_BattleEnemy[_0x467fb5('0xc9')][_0x467fb5('0x229')]=function(_0x296b0d){const _0x54d127=_0x467fb5;this['_lastEnemy']=null,VisuMZ[_0x54d127('0x15b')]['Window_BattleEnemy_initialize'][_0x54d127('0x709')](this,_0x296b0d);},Window_BattleEnemy[_0x467fb5('0xc9')][_0x467fb5('0x54d')]=function(){const _0x3542cf=_0x467fb5;return this[_0x3542cf('0x659')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x705')]=Window_BattleEnemy['prototype'][_0x467fb5('0x759')],Window_BattleEnemy[_0x467fb5('0xc9')]['show']=function(){const _0x2cc74f=_0x467fb5;VisuMZ[_0x2cc74f('0x15b')][_0x2cc74f('0x705')][_0x2cc74f('0x709')](this),this['y']=Graphics[_0x2cc74f('0x41e')]*0xa;},Window_BattleEnemy[_0x467fb5('0xc9')][_0x467fb5('0x713')]=function(){const _0x212efd=_0x467fb5;return $gameTroop[_0x212efd('0x4dd')]()[_0x212efd('0x85e')](0x0);},Window_BattleEnemy[_0x467fb5('0xc9')][_0x467fb5('0x6c5')]=function(){const _0x2ba21d=_0x467fb5;this['_enemies']=this['validTargets'](),this[_0x2ba21d('0x2f8')](),Window_Selectable[_0x2ba21d('0xc9')]['refresh']['call'](this);},Window_BattleEnemy[_0x467fb5('0xc9')][_0x467fb5('0x2f8')]=function(){const _0x3b2e51=_0x467fb5;this[_0x3b2e51('0xe4')]['sort']((_0x2fedfe,_0x1f6642)=>{const _0x39ece7=_0x3b2e51;return _0x2fedfe[_0x39ece7('0x67b')]()[_0x39ece7('0x5f6')]===_0x1f6642['battler']()[_0x39ece7('0x5f6')]?_0x2fedfe['battler']()[_0x39ece7('0x345')]-_0x1f6642['battler']()[_0x39ece7('0x345')]:_0x2fedfe['battler']()['_baseX']-_0x1f6642[_0x39ece7('0x67b')]()[_0x39ece7('0x5f6')];}),SceneManager[_0x3b2e51('0x5df')]()&&this['_enemies'][_0x3b2e51('0x78a')]();},Window_BattleEnemy['prototype']['autoSelect']=function(){const _0x19dfc5=_0x467fb5,_0x1d3723=VisuMZ['BattleCore'][_0x19dfc5('0x110')][_0x19dfc5('0x3a0')];if(_0x1d3723[_0x19dfc5('0x31f')])this[_0x19dfc5('0x1e1')]();else{if(_0x19dfc5('0x681')===_0x19dfc5('0x477')){function _0x49b3d4(){const _0x460168=_0x19dfc5;this[_0x460168('0x538')][_0x460168('0x735')]=![];}}else this[_0x19dfc5('0x46a')]();}},Window_BattleEnemy['prototype'][_0x467fb5('0x1e1')]=function(){const _0x2b5928=_0x467fb5;if(this[_0x2b5928('0x4c2')]&&this['_enemies'][_0x2b5928('0x790')](this['_lastEnemy'])){const _0xb54371=this[_0x2b5928('0xe4')][_0x2b5928('0x2d9')](this[_0x2b5928('0x4c2')]);this['forceSelect'](_0xb54371);}else{if(_0x2b5928('0x27c')!==_0x2b5928('0x5b'))this['autoSelectPriority']();else{function _0x2a6785(){const _0xd09305=_0x2b5928;this[_0xd09305('0x615')]();}}}},Window_BattleEnemy[_0x467fb5('0xc9')]['autoSelectPriority']=function(){const _0x3f0f14=_0x467fb5,_0x3629d4=VisuMZ[_0x3f0f14('0x15b')][_0x3f0f14('0x110')][_0x3f0f14('0x3a0')];let _0x92e932=![];$gameSystem['isSideView']()?_0x92e932=_0x3629d4['SideviewSelect']:_0x92e932=_0x3629d4[_0x3f0f14('0x82a')],this[_0x3f0f14('0x736')](_0x92e932?this['maxItems']()-0x1:0x0);},Window_BattleEnemy[_0x467fb5('0xc9')][_0x467fb5('0x5f4')]=function(){const _0x3173e6=_0x467fb5;Window_Selectable[_0x3173e6('0xc9')][_0x3173e6('0x5f4')][_0x3173e6('0x709')](this),this[_0x3173e6('0x4c2')]=this['enemy']();};function Window_AutoBattleCancel(){const _0x3198ec=_0x467fb5;this[_0x3198ec('0x229')](...arguments);}Window_AutoBattleCancel['prototype']=Object[_0x467fb5('0x452')](Window_Base[_0x467fb5('0xc9')]),Window_AutoBattleCancel[_0x467fb5('0xc9')][_0x467fb5('0x7b9')]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x467fb5('0xc9')]['initialize']=function(_0x4af344){const _0x1a692e=_0x467fb5;Window_Base[_0x1a692e('0xc9')]['initialize'][_0x1a692e('0x709')](this,_0x4af344),this[_0x1a692e('0x5d4')](this[_0x1a692e('0x46f')]()),this[_0x1a692e('0x6c5')]();},Window_AutoBattleCancel[_0x467fb5('0xc9')][_0x467fb5('0x46f')]=function(){const _0x5d79fa=_0x467fb5;return VisuMZ['BattleCore'][_0x5d79fa('0x110')][_0x5d79fa('0x1b9')][_0x5d79fa('0x7b2')];},Window_AutoBattleCancel[_0x467fb5('0xc9')][_0x467fb5('0x6c5')]=function(){const _0x1a8215=_0x467fb5;this[_0x1a8215('0x743')][_0x1a8215('0x418')]();const _0x13862e=VisuMZ['BattleCore'][_0x1a8215('0x110')][_0x1a8215('0x1b9')][_0x1a8215('0x5c1')],_0x359e64=_0x13862e[_0x1a8215('0x11')](this['okButtonText'](),this[_0x1a8215('0x81b')]()),_0x228cf9=this['textSizeEx'](_0x359e64)[_0x1a8215('0x6c2')],_0x3ea54c=Math[_0x1a8215('0x100')]((this[_0x1a8215('0x851')]-_0x228cf9)/0x2);this[_0x1a8215('0x191')](_0x359e64,_0x3ea54c,0x0,_0x228cf9);},Window_AutoBattleCancel[_0x467fb5('0xc9')][_0x467fb5('0x7eb')]=function(){const _0x48483f=_0x467fb5;if(Imported[_0x48483f('0x3e')]){if(_0x48483f('0x6f9')===_0x48483f('0x134')){function _0x532c26(){const _0x2ff4bb=_0x48483f;if(_0x3ee688[_0x2ff4bb('0x21')]()){const _0x39066e=this[_0x2ff4bb('0x67b')]();if(_0x39066e)_0x39066e[_0x2ff4bb('0xea')](_0x3864d0);}}}else return TextManager[_0x48483f('0x33c')]('ok');}else return VisuMZ[_0x48483f('0x15b')][_0x48483f('0x110')][_0x48483f('0x1b9')][_0x48483f('0x293')];},Window_AutoBattleCancel[_0x467fb5('0xc9')][_0x467fb5('0x81b')]=function(){const _0x555d66=_0x467fb5;return Imported[_0x555d66('0x3e')]?TextManager[_0x555d66('0x33c')]('cancel'):VisuMZ[_0x555d66('0x15b')][_0x555d66('0x110')][_0x555d66('0x1b9')]['AutoBattleCancel'];},Window_AutoBattleCancel[_0x467fb5('0xc9')][_0x467fb5('0x280')]=function(){const _0x1ca9a4=_0x467fb5;Window_Base['prototype'][_0x1ca9a4('0x280')][_0x1ca9a4('0x709')](this),this[_0x1ca9a4('0x88e')](),this[_0x1ca9a4('0x34d')]();},Window_AutoBattleCancel[_0x467fb5('0xc9')][_0x467fb5('0x88e')]=function(){const _0x2d967b=_0x467fb5;this[_0x2d967b('0x735')]=BattleManager['_autoBattle'];},Window_AutoBattleCancel[_0x467fb5('0xc9')]['updateCancel']=function(){const _0x83faa2=_0x467fb5;if(!BattleManager[_0x83faa2('0x6d3')])return;if(Input[_0x83faa2('0x7d6')]('ok')||Input['isTriggered'](_0x83faa2('0x4aa'))||TouchInput[_0x83faa2('0x97')]()||TouchInput[_0x83faa2('0x7a3')]()){if(_0x83faa2('0x7b1')===_0x83faa2('0x519')){function _0x2d38c1(){const _0x214f8e=_0x83faa2;this[_0x214f8e('0x156')](_0x214f8e('0x898'));}}else SoundManager[_0x83faa2('0x879')](),BattleManager['_autoBattle']=![],Input[_0x83faa2('0x418')](),TouchInput[_0x83faa2('0x418')]();}};function Window_EnemyName(){this['initialize'](...arguments);}Window_EnemyName['prototype']=Object[_0x467fb5('0x452')](Window_Base[_0x467fb5('0xc9')]),Window_EnemyName[_0x467fb5('0xc9')][_0x467fb5('0x7b9')]=Window_EnemyName,Window_EnemyName[_0x467fb5('0xc9')][_0x467fb5('0x229')]=function(_0x46eb8e){const _0x3c76d7=_0x467fb5;this[_0x3c76d7('0x871')]=_0x46eb8e,this[_0x3c76d7('0x846')]='';const _0x5a16a2=new Rectangle(0x0,0x0,Graphics[_0x3c76d7('0x314')],this[_0x3c76d7('0x228')]()*0x4);Window_Base[_0x3c76d7('0xc9')]['initialize'][_0x3c76d7('0x709')](this,_0x5a16a2),this[_0x3c76d7('0x5d4')](0x2),this[_0x3c76d7('0x82e')]=0x0;},Window_EnemyName['prototype'][_0x467fb5('0x52d')]=function(){const _0x7d1b0e=_0x467fb5;this[_0x7d1b0e('0x35f')]=0x0;},Window_EnemyName[_0x467fb5('0xc9')]['enemy']=function(){const _0x4183f3=_0x467fb5;return $gameTroop[_0x4183f3('0x4f')]()[this[_0x4183f3('0x871')]];},Window_EnemyName[_0x467fb5('0xc9')][_0x467fb5('0x280')]=function(){const _0x138128=_0x467fb5;Window_Base['prototype'][_0x138128('0x280')]['call'](this);if(this['enemy']()&&this['enemy']()[_0x138128('0x22a')]()!==this[_0x138128('0x846')])this[_0x138128('0x6c5')]();this[_0x138128('0x1c8')](),this[_0x138128('0x6fc')]();},Window_EnemyName['prototype'][_0x467fb5('0x1c8')]=function(){const _0x6bd168=_0x467fb5;if(!this['enemy']()){if(this[_0x6bd168('0x82e')]>0x0)this['contentsOpacity']-=0x10;}else{if(this[_0x6bd168('0x3f9')]()[_0x6bd168('0xb2')]()){if(this[_0x6bd168('0x82e')]>0x0)this['contentsOpacity']-=0x10;}else{if(SceneManager['_scene'][_0x6bd168('0x39c')]&&SceneManager[_0x6bd168('0x26e')]['_enemyWindow'][_0x6bd168('0x87e')]&&SceneManager[_0x6bd168('0x26e')][_0x6bd168('0x39c')][_0x6bd168('0xe4')][_0x6bd168('0x790')](this[_0x6bd168('0x3f9')]())){if('PSQTi'!==_0x6bd168('0x474')){function _0x1c0982(){const _0x224cce=_0x6bd168;if(this[_0x224cce('0xb2')]()&&this[_0x224cce('0x5cd')]!==_0x224cce('0x32f')){this[_0x224cce('0x738')](_0x224cce('0x32f'));return;}if(this[_0x224cce('0xb2')]()&&this[_0x224cce('0x5cd')]==='dead')return;if(!!this[_0x224cce('0x220')])return;if(this[_0x224cce('0x8c6')]()){this[_0x224cce('0x67b')]()[_0x224cce('0x1d2')](),this[_0x224cce('0x339')]();return;}if(this[_0x224cce('0x5cd')]==='victory')return;if(this[_0x224cce('0x5cd')]===_0x224cce('0x26d')&&!_0x350e27['isInputting']())return;if(this[_0x224cce('0x5cd')]===_0x224cce('0x560')&&!_0x5b36ce[_0x224cce('0x8b')]())return;this['clearMotion']();if(this[_0x224cce('0x67b')]()&&_0x3379e9[_0x224cce('0x8b')]()){this['battler']()[_0x224cce('0x1d2')](),this[_0x224cce('0x339')]();return;}}}else{if(this[_0x6bd168('0x82e')]<0xff)this['contentsOpacity']+=0x10;}}else this[_0x6bd168('0x82e')]>0x0&&(this[_0x6bd168('0x82e')]-=0x10);}}},Window_EnemyName['prototype']['updatePosition']=function(){const _0x26c907=_0x467fb5;if(!this[_0x26c907('0x3f9')]())return;SceneManager[_0x26c907('0x5df')]()?this['x']=Graphics['boxWidth']-this[_0x26c907('0x3f9')]()['battler']()['_baseX']:this['x']=this[_0x26c907('0x3f9')]()[_0x26c907('0x67b')]()[_0x26c907('0x5f6')];this['x']-=Math[_0x26c907('0x1b2')](this['width']/0x2),this['y']=this[_0x26c907('0x3f9')]()[_0x26c907('0x67b')]()['_baseY']-Math[_0x26c907('0x1b2')](this[_0x26c907('0x228')]()*1.5);const _0x5b55d3=VisuMZ[_0x26c907('0x15b')]['Settings']['Enemy'];this['x']+=_0x5b55d3[_0x26c907('0x1d1')]||0x0,this['y']+=_0x5b55d3['NameOffsetY']||0x0;},Window_EnemyName[_0x467fb5('0xc9')][_0x467fb5('0x140')]=function(){const _0x29c1bd=_0x467fb5;Window_Base[_0x29c1bd('0xc9')][_0x29c1bd('0x140')][_0x29c1bd('0x709')](this),this['contents']['fontSize']=VisuMZ['BattleCore'][_0x29c1bd('0x110')][_0x29c1bd('0x3a0')][_0x29c1bd('0x1e5')];},Window_EnemyName[_0x467fb5('0xc9')][_0x467fb5('0x6c5')]=function(){const _0x8ded24=_0x467fb5;this[_0x8ded24('0x743')]['clear']();if(!this[_0x8ded24('0x3f9')]())return;this[_0x8ded24('0x846')]=this['enemy']()['name']();const _0x240eb5=this[_0x8ded24('0x726')](this['_text'])[_0x8ded24('0x6c2')],_0x3048bb=Math[_0x8ded24('0x1b2')]((this[_0x8ded24('0x851')]-_0x240eb5)/0x2);this[_0x8ded24('0x191')](this[_0x8ded24('0x846')],_0x3048bb,0x0,_0x240eb5+0x8);},Window_BattleLog['prototype']['maxLines']=function(){const _0x3141f6=_0x467fb5;return VisuMZ[_0x3141f6('0x15b')][_0x3141f6('0x110')][_0x3141f6('0x20')][_0x3141f6('0x74c')];},Window_BattleLog[_0x467fb5('0xc9')]['messageSpeed']=function(){const _0x202442=_0x467fb5;return VisuMZ[_0x202442('0x15b')][_0x202442('0x110')][_0x202442('0x20')]['MessageWait'];},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x1de')]=function(){const _0x43ce70=_0x467fb5;return VisuMZ[_0x43ce70('0x15b')][_0x43ce70('0x110')]['BattleLog'][_0x43ce70('0x733')];},Window_BattleLog['prototype']['isFastForward']=function(){return![];},Window_BattleLog['prototype'][_0x467fb5('0x5b3')]=function(_0x51cef6,_0x2a41bd){const _0x30c974=_0x467fb5;this[_0x30c974('0x76')](_0x30c974('0x521')),BattleManager['invokeAction'](_0x51cef6,_0x2a41bd),this['callNextMethod']();},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x521')]=function(){const _0x1cf373=_0x467fb5;this[_0x1cf373('0x3a4')]();},Window_BattleLog['prototype']['push']=function(_0x53eedb){const _0x1e5520=_0x467fb5,_0x5e4b44=Array['prototype'][_0x1e5520('0x85e')][_0x1e5520('0x709')](arguments,0x1),_0x201a10={'name':_0x53eedb,'params':_0x5e4b44},_0x17a1e8=this[_0x1e5520('0x865')][_0x1e5520('0xae')](_0x11393e=>_0x11393e[_0x1e5520('0x22a')])[_0x1e5520('0x2d9')](_0x1e5520('0x521'));if(_0x17a1e8>=0x0)this[_0x1e5520('0x865')][_0x1e5520('0x5cb')](_0x17a1e8,0x0,_0x201a10);else{if(_0x1e5520('0x4ca')==='gUvCw'){function _0x405434(){const _0x79d415=_0x1e5520;_0x74c688[_0x79d415('0x15b')][_0x79d415('0x6f5')][_0x79d415('0x709')](this,_0x377d9a),this[_0x79d415('0x3a4')]();}}else this[_0x1e5520('0x865')][_0x1e5520('0x26f')](_0x201a10);}},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x76')]=function(_0x23af97){const _0x349e16=_0x467fb5,_0x5c83a5=Array[_0x349e16('0xc9')][_0x349e16('0x85e')][_0x349e16('0x709')](arguments,0x1);this['_methods'][_0x349e16('0x76')]({'name':_0x23af97,'params':_0x5c83a5});},Window_BattleLog['prototype'][_0x467fb5('0x273')]=function(){const _0x3531c4=_0x467fb5;if(!$gameTemp[_0x3531c4('0x56f')]())return;console[_0x3531c4('0x107')](this[_0x3531c4('0x865')]['map'](_0x724613=>_0x724613[_0x3531c4('0x22a')])[_0x3531c4('0x403')]('\x0a'));},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x413')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x6c5')],Window_BattleLog['prototype']['refresh']=function(){this['_requestRefresh']=!![];},VisuMZ[_0x467fb5('0x15b')]['Window_BattleLog_update']=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x280')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x280')]=function(){const _0x520ec4=_0x467fb5;VisuMZ[_0x520ec4('0x15b')][_0x520ec4('0x272')][_0x520ec4('0x709')](this);if(this[_0x520ec4('0x7c9')])this['processRefresh']();},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x4ea')]=function(){const _0xa52979=_0x467fb5;this['_requestRefresh']=![],VisuMZ[_0xa52979('0x15b')][_0xa52979('0x413')][_0xa52979('0x709')](this);},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x1c1')]=function(_0x3046bd){const _0x71d5ef=_0x467fb5;let _0x35cb18=VisuMZ['BattleCore'][_0x71d5ef('0x110')]['BattleLog'][_0x71d5ef('0x869')]['toLowerCase']()[_0x71d5ef('0x23e')](),_0x344cd8=this[_0x71d5ef('0x18b')][_0x3046bd];if(_0x344cd8[_0x71d5ef('0x5e2')](/<LEFT>/i))_0x35cb18='left';else{if(_0x344cd8[_0x71d5ef('0x5e2')](/<CENTER>/i)){if('Bpnug'!==_0x71d5ef('0x131'))_0x35cb18=_0x71d5ef('0x1f1');else{function _0x5787a9(){const _0x3fcd89=_0x71d5ef;this[_0x3fcd89('0x21f')]=(this[_0x3fcd89('0x21f')]*(_0x4c96e7-0x1)+this[_0x3fcd89('0x1fb')])/_0x38ffd8;}}}else _0x344cd8[_0x71d5ef('0x5e2')](/<RIGHT>/i)&&(_0x35cb18=_0x71d5ef('0x883'));}_0x344cd8=_0x344cd8['replace'](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x344cd8=_0x344cd8[_0x71d5ef('0x65f')](/\\I\[0\]/gi,'');const _0x185d75=this[_0x71d5ef('0x8cf')](_0x3046bd);this['contents'][_0x71d5ef('0x753')](_0x185d75['x'],_0x185d75['y'],_0x185d75[_0x71d5ef('0x6c2')],_0x185d75[_0x71d5ef('0x41e')]);const _0x3de03f=this[_0x71d5ef('0x726')](_0x344cd8)['width'];let _0x4880ba=_0x185d75['x'];if(_0x35cb18===_0x71d5ef('0x1f1'))_0x4880ba+=(_0x185d75['width']-_0x3de03f)/0x2;else{if(_0x35cb18===_0x71d5ef('0x883')){if('EScAI'===_0x71d5ef('0x64d')){function _0x5a36f1(){const _0x192c5d=_0x71d5ef;this['_forcedBattleLayout']=_0x192c5d('0x5bc');}}else _0x4880ba+=_0x185d75[_0x71d5ef('0x6c2')]-_0x3de03f;}}this['drawTextEx'](_0x344cd8,_0x4880ba,_0x185d75['y'],_0x3de03f+0x8);},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x7bb')]=function(_0x5a7deb){const _0x8d8993=_0x467fb5;this[_0x8d8993('0x18b')][_0x8d8993('0x26f')](_0x5a7deb),this[_0x8d8993('0x6c5')](),this[_0x8d8993('0x3a4')]();},Window_BattleLog['prototype'][_0x467fb5('0x672')]=function(){const _0x43b1ce=_0x467fb5;let _0x48a748=![];switch(this[_0x43b1ce('0x725')]){case _0x43b1ce('0x12f'):_0x48a748=this['_spriteset'][_0x43b1ce('0x27b')]();break;case _0x43b1ce('0x6e4'):_0x48a748=this[_0x43b1ce('0x115')][_0x43b1ce('0x47a')]();break;case'animation':_0x48a748=this['_spriteset'][_0x43b1ce('0x105')]();break;case _0x43b1ce('0x57'):_0x48a748=this[_0x43b1ce('0x115')]['isAnyoneFloating']();break;case _0x43b1ce('0x43b'):_0x48a748=this[_0x43b1ce('0x115')][_0x43b1ce('0x193')]();break;case'opacity':_0x48a748=this['_spriteset'][_0x43b1ce('0x60e')]();break;}if(!_0x48a748){if('OQWbC'!==_0x43b1ce('0x30c')){function _0x598a13(){const _0x3ae976=_0x43b1ce,_0x51b4c9=_0x2d84be(_0x52eddf['$1'])[_0x3ae976('0x7e0')](/[\r\n]+/)[_0x3ae976('0x14e')]('');_0x1fa6f1[_0x3ae976('0x22a')]=_0x565832['processRandomizedData'](_0x51b4c9);}}else this[_0x43b1ce('0x725')]='';}return _0x48a748;},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x712')]=function(){const _0x13dcbf=_0x467fb5;this[_0x13dcbf('0x707')]('animation');},Window_BattleLog['prototype'][_0x467fb5('0x781')]=function(){const _0x376601=_0x467fb5;this[_0x376601('0x707')](_0x376601('0x57'));},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x40a')]=function(){const _0x3a9e04=_0x467fb5;this[_0x3a9e04('0x707')](_0x3a9e04('0x43b'));},Window_BattleLog['prototype'][_0x467fb5('0x51f')]=function(){const _0x5a6336=_0x467fb5;this[_0x5a6336('0x707')]('opacity');},Window_BattleLog['prototype']['startTurn']=function(){const _0x1c41c9=_0x467fb5,_0x4ff6c4=VisuMZ[_0x1c41c9('0x15b')][_0x1c41c9('0x110')][_0x1c41c9('0x20')];if(!_0x4ff6c4[_0x1c41c9('0x1f0')])return;this[_0x1c41c9('0x26f')](_0x1c41c9('0x7bb'),_0x4ff6c4[_0x1c41c9('0x76c')][_0x1c41c9('0x11')]($gameTroop[_0x1c41c9('0x7d5')]())),this[_0x1c41c9('0x26f')](_0x1c41c9('0x8a5'),_0x4ff6c4[_0x1c41c9('0x3c9')]),this['push'](_0x1c41c9('0x418'));},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x281')]=function(_0x3cca39,_0x1435fa,_0x18a7cc){const _0x5809de=_0x467fb5;this[_0x5809de('0x1ac')](_0x1435fa)?BattleManager[_0x5809de('0x80d')]():this[_0x5809de('0x41b')](_0x3cca39,_0x1435fa,_0x18a7cc);},Window_BattleLog['prototype'][_0x467fb5('0x1ac')]=function(_0x47a679){const _0x53e26d=_0x467fb5;if(!SceneManager[_0x53e26d('0x21')]())return![];if(!_0x47a679)return![];if(!_0x47a679[_0x53e26d('0x19a')]())return![];if(_0x47a679['item']()[_0x53e26d('0x50e')]['match'](/<CUSTOM ACTION SEQUENCE>/i)){if(_0x53e26d('0x812')!=='MQIxN'){function _0x392b77(){const _0x142ce2=_0x53e26d;_0x29e984['BattleCore']['Sprite_Actor_updateShadow'][_0x142ce2('0x709')](this),this[_0x142ce2('0x798')]();}}else return!![];}return![];},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x41b')]=function(_0x147f01,_0x1d107c,_0x254b91){const _0x19004b=_0x467fb5,_0x156014=_0x1d107c[_0x19004b('0x19a')]();this[_0x19004b('0x7cb')](_0x147f01,_0x1d107c,_0x254b91),this[_0x19004b('0xb0')](_0x147f01,_0x1d107c,_0x254b91),this['finishActionSet'](_0x147f01,_0x1d107c,_0x254b91);},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x222')]=function(_0x801573,_0x45d55f){const _0x14b8a3=_0x467fb5,_0xea7ca5=VisuMZ[_0x14b8a3('0x15b')]['Settings'][_0x14b8a3('0x20')];_0xea7ca5[_0x14b8a3('0x267')]&&this[_0x14b8a3('0x26f')]('addText',_0x14b8a3('0x777')[_0x14b8a3('0x11')](DataManager[_0x14b8a3('0x1d0')](_0x45d55f)));if(DataManager[_0x14b8a3('0xc3')](_0x45d55f)){if('Lgvfj'!==_0x14b8a3('0x13c')){if(_0xea7ca5[_0x14b8a3('0x7c4')])this[_0x14b8a3('0x3d0')](_0x45d55f[_0x14b8a3('0x3fb')],_0x801573,_0x45d55f);if(_0xea7ca5[_0x14b8a3('0x3f3')])this['displayItemMessage'](_0x45d55f[_0x14b8a3('0x26')],_0x801573,_0x45d55f);}else{function _0x3949ed(){const _0x4c5db5=_0x14b8a3;this[_0x4c5db5('0xe4')][_0x4c5db5('0x78a')]();}}}else{if(_0xea7ca5[_0x14b8a3('0x61e')])this[_0x14b8a3('0x3d0')](TextManager[_0x14b8a3('0x2cc')],_0x801573,_0x45d55f);}},Window_BattleLog['prototype'][_0x467fb5('0x7cb')]=function(_0x36d967,_0x5be9d0,_0x3e0b1f){const _0x6f7547=_0x467fb5,_0x2aeeb2=_0x5be9d0[_0x6f7547('0x19a')]();this['displayAction'](_0x36d967,_0x2aeeb2),this[_0x6f7547('0x26f')](_0x6f7547('0x819'),_0x36d967,_0x3e0b1f,!![]),this['push'](_0x6f7547('0x15d'),_0x36d967,_0x5be9d0),this['push']('waitForMovement'),this[_0x6f7547('0x26f')](_0x6f7547('0x760'),_0x36d967,_0x5be9d0),this['push'](_0x6f7547('0x712'));},Window_BattleLog['prototype'][_0x467fb5('0xb0')]=function(_0x3e009a,_0x193433,_0x3d1241){const _0x2b1fcc=_0x467fb5;if(this['isMeleeSingleTargetAction'](_0x193433)){if('HoGKw'!==_0x2b1fcc('0x57d')){function _0xa4fb57(){const _0x2a3fb2=_0x2b1fcc;this[_0x2a3fb2('0x6d5')]()&&_0x4c4561[_0x2a3fb2('0x15b')][_0x2a3fb2('0x1ba')][_0x2a3fb2('0x709')](this,_0x3aa9d8,_0x396f35,_0x3da16d);}}else this[_0x2b1fcc('0x578')](_0x3e009a,_0x193433,_0x3d1241);}else{if(this[_0x2b1fcc('0x850')](_0x193433))this[_0x2b1fcc('0x5d6')](_0x3e009a,_0x193433,_0x3d1241);else{if(_0x193433[_0x2b1fcc('0x543')]()){if(_0x2b1fcc('0x7ac')!==_0x2b1fcc('0x189'))this[_0x2b1fcc('0x558')](_0x3e009a,_0x193433,_0x3d1241);else{function _0x1d8dc2(){const _0x1d91b5=_0x2b1fcc;_0x47d094('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1d91b5('0x11')](_0x20cbed,_0x130b00,_0x51bdd7)),_0x2d372a[_0x1d91b5('0x4c5')]();}}}else this[_0x2b1fcc('0x33e')](_0x3e009a,_0x193433,_0x3d1241);}}},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x85b')]=function(_0x394c66){const _0x546ea7=_0x467fb5;if(!_0x394c66[_0x546ea7('0x542')]())return![];if(!_0x394c66[_0x546ea7('0x178')]())return![];if(!_0x394c66[_0x546ea7('0x647')]())return![];return VisuMZ[_0x546ea7('0x15b')][_0x546ea7('0x110')][_0x546ea7('0x65d')]['AutoMeleeSolo'];},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x578')]=function(_0x5b4355,_0x1a8544,_0x48f4c2){const _0x45b030=_0x467fb5,_0x15373e=_0x5b4355[_0x45b030('0x18e')]()[_0x45b030('0xff')]<0x2,_0x1b493d=0x14,_0x2535af=0x30;if(_0x15373e){if(_0x45b030('0x5c6')===_0x45b030('0x72')){function _0x512314(){_0x382faa=_0x1f3514['CastMagical'];}}else this[_0x45b030('0x26f')]('performJump',[_0x5b4355],_0x2535af,_0x1b493d),this[_0x45b030('0x26f')]('performMoveToTargets',_0x5b4355,_0x48f4c2,'front\x20base',_0x1b493d,!![],_0x45b030('0x2f7'),!![]),this[_0x45b030('0x26f')]('requestMotion',[_0x5b4355],_0x45b030('0x898')),this[_0x45b030('0x26f')]('waitForMovement');}_0x1a8544[_0x45b030('0x19a')]()[_0x45b030('0x274')]<0x0?this[_0x45b030('0x558')](_0x5b4355,_0x1a8544,_0x48f4c2):this['wholeActionSet'](_0x5b4355,_0x1a8544,_0x48f4c2);if(_0x15373e){if(_0x45b030('0x6db')==='cjtes'){const _0x5a003d=_0x5b4355[_0x45b030('0x67b')]();this[_0x45b030('0x26f')](_0x45b030('0x5b8'),[_0x5b4355],_0x2535af,_0x1b493d),this[_0x45b030('0x26f')](_0x45b030('0x6c'),_0x5b4355,_0x5a003d[_0x45b030('0x1a')],_0x5a003d[_0x45b030('0x1b7')],_0x1b493d,![],_0x45b030('0x2f7')),this[_0x45b030('0x26f')](_0x45b030('0x738'),[_0x5b4355],_0x45b030('0x524')),this['push'](_0x45b030('0x284')),this[_0x45b030('0x26f')](_0x45b030('0x738'),[_0x5b4355],_0x45b030('0x898'));}else{function _0x567c62(){const _0x2e9c2b=_0x45b030;this[_0x2e9c2b('0x6f6')]=[];for(let _0x16785d=0x0;_0x16785d<_0x275708[_0x2e9c2b('0x494')]();_0x16785d++){const _0x2435a3=_0x28623d[_0x2e9c2b('0x41a')]()[_0x16785d],_0x1e36e0=new _0x4e7d29();_0x1e36e0[_0x2e9c2b('0x33b')](_0x2435a3),_0x1e36e0[_0x2e9c2b('0x1f2')](_0x2435a3),_0x1e36e0[_0x2e9c2b('0x280')](),this['_actorSprites'][_0x2e9c2b('0x26f')](_0x1e36e0),this[_0x2e9c2b('0x77d')][_0x2e9c2b('0x209')](_0x1e36e0);}}}}},Window_BattleLog['prototype'][_0x467fb5('0x850')]=function(_0x1445e3){const _0x11e895=_0x467fb5;if(!_0x1445e3[_0x11e895('0x542')]())return![];if(!_0x1445e3[_0x11e895('0x5db')]())return![];if(!_0x1445e3[_0x11e895('0x647')]())return![];return VisuMZ['BattleCore'][_0x11e895('0x110')]['ActionSequence'][_0x11e895('0x4d7')];},Window_BattleLog[_0x467fb5('0xc9')]['autoMeleeMultiTargetActionSet']=function(_0x569c4a,_0x344dcc,_0x3a8286){const _0x559abc=_0x467fb5,_0x3a0369=_0x569c4a['getAttackMotion']()[_0x559abc('0xff')]<0x2,_0x3820f4=0x14,_0x512362=0x30;_0x3a0369&&(this[_0x559abc('0x26f')]('performJump',[_0x569c4a],_0x512362,_0x3820f4),this[_0x559abc('0x26f')](_0x559abc('0x7d8'),_0x569c4a,_0x3a8286,_0x559abc('0x79d'),_0x3820f4,!![],_0x559abc('0x2f7'),!![]),this[_0x559abc('0x26f')](_0x559abc('0x738'),[_0x569c4a],_0x559abc('0x898')),this[_0x559abc('0x26f')]('waitForMovement'));this[_0x559abc('0x33e')](_0x569c4a,_0x344dcc,_0x3a8286);if(_0x3a0369){const _0x52a8dc=_0x569c4a['battler']();this[_0x559abc('0x26f')](_0x559abc('0x5b8'),[_0x569c4a],_0x512362,_0x3820f4),this[_0x559abc('0x26f')](_0x559abc('0x6c'),_0x569c4a,_0x52a8dc['_homeX'],_0x52a8dc[_0x559abc('0x1b7')],_0x3820f4,![],_0x559abc('0x2f7')),this[_0x559abc('0x26f')](_0x559abc('0x738'),[_0x569c4a],_0x559abc('0x524')),this[_0x559abc('0x26f')](_0x559abc('0x284')),this[_0x559abc('0x26f')](_0x559abc('0x738'),[_0x569c4a],_0x559abc('0x898'));}},Window_BattleLog['prototype'][_0x467fb5('0x558')]=function(_0x8d02e0,_0x1ca7ca,_0x4759b4){const _0x119e58=_0x467fb5,_0x4510f2=_0x1ca7ca[_0x119e58('0x19a')]();for(const _0x33d23d of _0x4759b4){if('ioiZI'===_0x119e58('0x39d')){function _0x3fe13b(){const _0x279c07=_0x119e58,_0x30f27e=_0x2e6f3b(_0x460fbf['$1']);this[_0x279c07('0x2ff')](_0x30f27e);}}else{if(!_0x33d23d)continue;this[_0x119e58('0x26f')](_0x119e58('0xad'),_0x8d02e0,_0x1ca7ca),this[_0x119e58('0x26f')](_0x119e58('0x8a5'),Sprite_Battler['_motionSpeed']),this[_0x119e58('0x26f')]('showAnimation',_0x8d02e0,[_0x33d23d],_0x4510f2['animationId']),this[_0x119e58('0x26f')](_0x119e58('0x8a5'),0x18),this['push'](_0x119e58('0x5b3'),_0x8d02e0,_0x33d23d);}}this[_0x119e58('0x26f')](_0x119e58('0x819'),_0x8d02e0,_0x4759b4,![]);},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x33e')]=function(_0x2908d1,_0x3979d0,_0x4d6eb5){const _0x4c58ab=_0x467fb5,_0x5a63fb=_0x3979d0[_0x4c58ab('0x19a')]();this['push'](_0x4c58ab('0xad'),_0x2908d1,_0x3979d0),this[_0x4c58ab('0x26f')](_0x4c58ab('0x8a5'),Sprite_Battler[_0x4c58ab('0xf7')]),this[_0x4c58ab('0x26f')](_0x4c58ab('0x569'),_0x2908d1,_0x4d6eb5[_0x4c58ab('0x68')](),_0x5a63fb[_0x4c58ab('0x274')]),this[_0x4c58ab('0x26f')](_0x4c58ab('0x712'));for(const _0x58faab of _0x4d6eb5){if(!_0x58faab)continue;this[_0x4c58ab('0x26f')](_0x4c58ab('0x5b3'),_0x2908d1,_0x58faab);}this[_0x4c58ab('0x26f')](_0x4c58ab('0x819'),_0x2908d1,_0x4d6eb5,![]);},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x53c')]=function(_0x101715,_0x16b34a,_0x523823){const _0x23dd4a=_0x467fb5,_0x136a18=_0x16b34a[_0x23dd4a('0x19a')]();this[_0x23dd4a('0x26f')]('applyImmortal',_0x101715,_0x523823,![]),this[_0x23dd4a('0x26f')](_0x23dd4a('0x7f')),this[_0x23dd4a('0x26f')](_0x23dd4a('0x5f7')),this['push'](_0x23dd4a('0x418')),this[_0x23dd4a('0x26f')](_0x23dd4a('0x57c'),_0x101715),this[_0x23dd4a('0x26f')](_0x23dd4a('0x284'));},Window_BattleLog[_0x467fb5('0xc9')]['endAction']=function(_0x1e8278){},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x7f6')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x548')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x548')]=function(_0xd9e1c){const _0x3f92da=_0x467fb5;if(!VisuMZ[_0x3f92da('0x15b')]['Settings'][_0x3f92da('0x20')][_0x3f92da('0x5fd')])return;VisuMZ[_0x3f92da('0x15b')][_0x3f92da('0x7f6')][_0x3f92da('0x709')](this,_0xd9e1c);},Window_BattleLog['prototype'][_0x467fb5('0x629')]=function(_0x2c7a02){const _0x26babd=_0x467fb5;this[_0x26babd('0x26f')](_0x26babd('0x4bd'),_0x2c7a02);if(VisuMZ['BattleCore'][_0x26babd('0x110')]['ActionSequence'][_0x26babd('0xeb')]){if(_0x26babd('0x8e8')!==_0x26babd('0x1bd'))this[_0x26babd('0x26f')](_0x26babd('0x569'),_0x2c7a02,[BattleManager[_0x26babd('0x3c0')]],-0x1);else{function _0x3f5c21(){const _0x20e0ab=_0x26babd;if(this[_0x20e0ab('0x8c6')]()&&!this[_0x20e0ab('0x11c')]())return;let _0x10befa=0x0;if(this[_0x20e0ab('0x317')]()){const _0x3dc439=this[_0x20e0ab('0x1fe')]();_0x10befa=_0x3dc439[0x0]?_0x3dc439[0x0][_0x20e0ab('0x2c7')]:0x0;}else this['isEnemy']()&&(_0x10befa=this['svBattlerData']()[_0x20e0ab('0x2c7')]||0x0);const _0x553e0d=_0x224937['attackMotions'][_0x10befa];_0x5ecbdb===_0x20e0ab('0x87')&&(_0x5428f2=[_0x20e0ab('0x6cf'),'swing',_0x20e0ab('0x141')][_0x553e0d['type']]||'swing'),this[_0x20e0ab('0x220')]={'motionType':_0x46896b,'weaponImageId':_0x44ba9b?_0x553e0d[_0x20e0ab('0x729')]:0x0,'pattern':_0xc0b030};}}}if(!VisuMZ['BattleCore'][_0x26babd('0x110')][_0x26babd('0x20')][_0x26babd('0x3c6')])return;this[_0x26babd('0x26f')]('addText',TextManager[_0x26babd('0x366')]['format'](_0x2c7a02['name']()));},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x248')]=function(_0x2f39cf){const _0x3df0bb=_0x467fb5;this[_0x3df0bb('0x26f')](_0x3df0bb('0x2ab'),_0x2f39cf);if(!VisuMZ['BattleCore'][_0x3df0bb('0x110')][_0x3df0bb('0x20')]['ShowReflect'])return;this[_0x3df0bb('0x26f')](_0x3df0bb('0x7bb'),TextManager[_0x3df0bb('0x13a')][_0x3df0bb('0x11')](_0x2f39cf['name']()));},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x83a')]=function(_0x542e9a,_0x5b88a3){const _0xaf4be7=_0x467fb5;if(VisuMZ['BattleCore'][_0xaf4be7('0x110')][_0xaf4be7('0x65d')][_0xaf4be7('0x537')]){const _0x1ea780=_0x5b88a3['item']();this[_0xaf4be7('0x26f')](_0xaf4be7('0x569'),_0x542e9a,[_0x542e9a],_0x1ea780['animationId']);}},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x71a')]=function(_0xb51bbf,_0x550a06){const _0x128b82=_0x467fb5;this['push']('performSubstitute',_0xb51bbf,_0x550a06);if(!VisuMZ[_0x128b82('0x15b')][_0x128b82('0x110')][_0x128b82('0x20')][_0x128b82('0x2fc')])return;const _0x5305eb=_0xb51bbf['name'](),_0x516a78=TextManager[_0x128b82('0x65e')]['format'](_0x5305eb,_0x550a06[_0x128b82('0x22a')]());this[_0x128b82('0x26f')](_0x128b82('0x7bb'),_0x516a78);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3f6')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x29f')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x29f')]=function(_0x5a6354){const _0x541274=_0x467fb5;if(!VisuMZ[_0x541274('0x15b')][_0x541274('0x110')][_0x541274('0x20')]['ShowFailure'])return;VisuMZ[_0x541274('0x15b')][_0x541274('0x3f6')][_0x541274('0x709')](this,_0x5a6354);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x55f')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0xf1')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0xf1')]=function(_0x29f3b3){const _0x2a4f90=_0x467fb5;if(!VisuMZ[_0x2a4f90('0x15b')][_0x2a4f90('0x110')][_0x2a4f90('0x20')][_0x2a4f90('0x79f')])return;VisuMZ['BattleCore']['Window_BattleLog_displayCritical'][_0x2a4f90('0x709')](this,_0x29f3b3);},VisuMZ[_0x467fb5('0x15b')]['Window_BattleLog_displayMiss']=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0xef')],Window_BattleLog['prototype'][_0x467fb5('0xef')]=function(_0x5a75d7){const _0xb16fe4=_0x467fb5;if(!VisuMZ[_0xb16fe4('0x15b')]['Settings'][_0xb16fe4('0x20')][_0xb16fe4('0x7ef')]){if(_0xb16fe4('0x7f7')===_0xb16fe4('0x796')){function _0x35c950(){const _0x558b73=_0xb16fe4,_0x107aca=this[_0x558b73('0x473')][_0x558b73('0x30a')],_0x196e58=this[_0x558b73('0x6c2')]-0x8,_0x4a987c=this['height'],_0x47636e=this[_0x558b73('0x35f')],_0x1ec271=_0x5c6046[_0x558b73('0x466')](),_0x1e51b5=_0x361030['dimColor2']();this[_0x558b73('0x473')]['x']=0x4,_0x107aca[_0x558b73('0x2fa')](_0x196e58,_0x4a987c),_0x107aca[_0x558b73('0xd2')](0x0,0x0,_0x196e58,_0x47636e,_0x1e51b5,_0x1ec271,!![]),_0x107aca['fillRect'](0x0,_0x47636e,_0x196e58,_0x4a987c-_0x47636e*0x2,_0x1ec271),_0x107aca[_0x558b73('0xd2')](0x0,_0x4a987c-_0x47636e,_0x196e58,_0x47636e,_0x1ec271,_0x1e51b5,!![]),this[_0x558b73('0x473')][_0x558b73('0x874')](0x0,0x0,_0x196e58,_0x4a987c);}}else this['push'](_0xb16fe4('0x7be'),_0x5a75d7);}else VisuMZ[_0xb16fe4('0x15b')][_0xb16fe4('0x1c')][_0xb16fe4('0x709')](this,_0x5a75d7);},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x75')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x720')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x720')]=function(_0x17abf2){const _0x2a4c06=_0x467fb5;if(!VisuMZ[_0x2a4c06('0x15b')][_0x2a4c06('0x110')][_0x2a4c06('0x20')]['ShowMissEvasion']){if(_0x2a4c06('0x49b')!==_0x2a4c06('0x287')){if(_0x17abf2['result']()[_0x2a4c06('0x7e4')]){if('xuyNT'!=='xuyNT'){function _0x5f5a55(){this['selectNextCommand']();}}else this[_0x2a4c06('0x26f')](_0x2a4c06('0x108'),_0x17abf2);}else this['push'](_0x2a4c06('0xc4'),_0x17abf2);}else{function _0x1fa0a9(){const _0x38b120=_0x2a4c06;_0x39239a-=_0x4bfa48[_0x38b120('0x680')]()/0x2;}}}else VisuMZ[_0x2a4c06('0x15b')]['Window_BattleLog_displayEvasion'][_0x2a4c06('0x709')](this,_0x17abf2);},Window_BattleLog[_0x467fb5('0xc9')]['displayHpDamage']=function(_0x1c9faf){const _0x27e23f=_0x467fb5;if(_0x1c9faf[_0x27e23f('0x3b0')]()['hpAffected']){if(_0x1c9faf[_0x27e23f('0x3b0')]()['hpDamage']>0x0&&!_0x1c9faf['result']()[_0x27e23f('0x7c0')]){if(_0x27e23f('0x476')!==_0x27e23f('0x476')){function _0x461fac(){const _0x310506=_0x27e23f;_0x566472[_0x310506('0x15b')]['Game_Battler_performActionStart'][_0x310506('0x709')](this,_0x4bb16a);if(!_0x1056c6[_0x310506('0x351')]()){const _0x295b80=this['battler']();if(_0x295b80)_0x295b80[_0x310506('0x797')]();}this[_0x310506('0x86')](![]);}}else this[_0x27e23f('0x26f')](_0x27e23f('0x44e'),_0x1c9faf);}_0x1c9faf[_0x27e23f('0x3b0')]()[_0x27e23f('0x5ec')]<0x0&&this[_0x27e23f('0x26f')](_0x27e23f('0x56'),_0x1c9faf),VisuMZ[_0x27e23f('0x15b')][_0x27e23f('0x110')][_0x27e23f('0x20')][_0x27e23f('0x1c3')]&&this[_0x27e23f('0x26f')](_0x27e23f('0x7bb'),this[_0x27e23f('0x459')](_0x1c9faf));}},VisuMZ['BattleCore'][_0x467fb5('0x57e')]=Window_BattleLog[_0x467fb5('0xc9')]['displayMpDamage'],Window_BattleLog['prototype'][_0x467fb5('0x2f4')]=function(_0xb3a5ab){const _0x3f1375=_0x467fb5;if(!VisuMZ[_0x3f1375('0x15b')][_0x3f1375('0x110')][_0x3f1375('0x20')]['ShowMpDmg'])return;VisuMZ[_0x3f1375('0x15b')][_0x3f1375('0x57e')][_0x3f1375('0x709')](this,_0xb3a5ab);},VisuMZ['BattleCore'][_0x467fb5('0x23f')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0xd')],Window_BattleLog[_0x467fb5('0xc9')]['displayTpDamage']=function(_0x35f3cd){const _0x5528b1=_0x467fb5;if(!VisuMZ[_0x5528b1('0x15b')]['Settings'][_0x5528b1('0x20')]['ShowTpDmg'])return;VisuMZ['BattleCore'][_0x5528b1('0x23f')][_0x5528b1('0x709')](this,_0x35f3cd);},Window_BattleLog['prototype'][_0x467fb5('0x8c9')]=function(_0x141f3d){const _0x4f88fc=_0x467fb5,_0x5596bf=_0x141f3d[_0x4f88fc('0x3b0')](),_0x21211e=_0x5596bf['addedStateObjects']();for(const _0x5e84f0 of _0x21211e){const _0x562704=_0x141f3d[_0x4f88fc('0x317')]()?_0x5e84f0[_0x4f88fc('0x3fb')]:_0x5e84f0[_0x4f88fc('0x26')];if(_0x562704&&VisuMZ[_0x4f88fc('0x15b')][_0x4f88fc('0x110')][_0x4f88fc('0x20')][_0x4f88fc('0xa8')]){if('CCaLK'!==_0x4f88fc('0x53d')){function _0x2a73be(){const _0x2565c9=_0x4f88fc;this[_0x2565c9('0x743')]['clear']();if(!this[_0x2565c9('0x3f9')]())return;this['_text']=this[_0x2565c9('0x3f9')]()[_0x2565c9('0x22a')]();const _0x429106=this[_0x2565c9('0x726')](this['_text'])['width'],_0x23e504=_0x35cd52[_0x2565c9('0x1b2')]((this[_0x2565c9('0x851')]-_0x429106)/0x2);this[_0x2565c9('0x191')](this['_text'],_0x23e504,0x0,_0x429106+0x8);}}else this[_0x4f88fc('0x26f')](_0x4f88fc('0x4c')),this[_0x4f88fc('0x26f')](_0x4f88fc('0x420')),this['push'](_0x4f88fc('0x7bb'),_0x562704[_0x4f88fc('0x11')](_0x141f3d[_0x4f88fc('0x22a')]())),this[_0x4f88fc('0x26f')](_0x4f88fc('0x246'));}_0x5e84f0['id']===_0x141f3d['deathStateId']()&&this[_0x4f88fc('0x26f')](_0x4f88fc('0x214'),_0x141f3d);}},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x4d8')]=function(_0x141768){const _0x4caded=_0x467fb5;if(!VisuMZ[_0x4caded('0x15b')][_0x4caded('0x110')][_0x4caded('0x20')][_0x4caded('0x1f7')])return;const _0x55b3dc=_0x141768[_0x4caded('0x3b0')](),_0x5ebfac=_0x55b3dc[_0x4caded('0x4e2')]();for(const _0x1aed93 of _0x5ebfac){if(_0x4caded('0x8d')!==_0x4caded('0x8e9')){if(_0x1aed93[_0x4caded('0x2c9')]){if(_0x4caded('0x7d0')===_0x4caded('0x40f')){function _0x5226f5(){const _0x519f0a=_0x4caded;return _0x47ab72['opponentsUnit']()[_0x519f0a('0x4dd')]()[_0x519f0a('0x649')](_0x4d6264=>_0x4d6264!==_0x449a6c);}}else this['push'](_0x4caded('0x4c')),this[_0x4caded('0x26f')](_0x4caded('0x420')),this[_0x4caded('0x26f')](_0x4caded('0x7bb'),_0x1aed93['message4']['format'](_0x141768[_0x4caded('0x22a')]())),this[_0x4caded('0x26f')](_0x4caded('0x246'));}}else{function _0x4396f0(){_0x477a64['changeCtbChargeTime'](_0x454d2d);}}}},Window_BattleLog['prototype'][_0x467fb5('0x2bc')]=function(_0x21807e){const _0x1c91d2=_0x467fb5,_0x31cf0e=VisuMZ[_0x1c91d2('0x15b')][_0x1c91d2('0x110')][_0x1c91d2('0x20')],_0x2e362f=_0x21807e[_0x1c91d2('0x3b0')]();if(_0x31cf0e['ShowAddedBuff'])this[_0x1c91d2('0x59e')](_0x21807e,_0x2e362f[_0x1c91d2('0x407')],TextManager[_0x1c91d2('0x831')]);if(_0x31cf0e['ShowAddedDebuff'])this[_0x1c91d2('0x59e')](_0x21807e,_0x2e362f[_0x1c91d2('0x568')],TextManager['debuffAdd']);if(_0x31cf0e['ShowRemovedBuff'])this[_0x1c91d2('0x59e')](_0x21807e,_0x2e362f[_0x1c91d2('0x262')],TextManager[_0x1c91d2('0x1b6')]);},Window_BattleLog['prototype']['displayBuffs']=function(_0x159ef7,_0x416241,_0x3d88e4){const _0x9f593=_0x467fb5;for(const _0x388524 of _0x416241){if(_0x9f593('0x7bd')!=='BzIwe'){function _0x5918f6(){const _0x3df560=_0x9f593;_0xeebcd3[_0x3df560('0x738')](_0x1d5e25);}}else{const _0x191b04=_0x3d88e4[_0x9f593('0x11')](_0x159ef7['name'](),TextManager[_0x9f593('0x3af')](_0x388524));this[_0x9f593('0x26f')](_0x9f593('0x4c')),this[_0x9f593('0x26f')](_0x9f593('0x420')),this['push']('addText',_0x191b04),this['push'](_0x9f593('0x246'));}}},VisuMZ['BattleCore']['Window_BattleLog_clear']=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x418')],Window_BattleLog[_0x467fb5('0xc9')]['clear']=function(){const _0x5be0f1=_0x467fb5;VisuMZ[_0x5be0f1('0x15b')]['Window_BattleLog_clear'][_0x5be0f1('0x709')](this),this[_0x5be0f1('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x158')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x420')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x420')]=function(){const _0xb20443=_0x467fb5;VisuMZ[_0xb20443('0x15b')][_0xb20443('0x158')][_0xb20443('0x709')](this),this[_0xb20443('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x463')]=Window_BattleLog['prototype']['popBaseLine'],Window_BattleLog[_0x467fb5('0xc9')]['popBaseLine']=function(){const _0x9a63ef=_0x467fb5;VisuMZ[_0x9a63ef('0x15b')][_0x9a63ef('0x463')]['call'](this),this[_0x9a63ef('0x6c5')](),this[_0x9a63ef('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3e4')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x54b')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x54b')]=function(_0x379cf6){const _0x58019f=_0x467fb5;VisuMZ[_0x58019f('0x15b')][_0x58019f('0x3e4')]['call'](this,_0x379cf6),this[_0x58019f('0x3a4')]();},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x7f')]=function(){const _0x25299c=_0x467fb5;let _0x3a3fb4=0x0;this[_0x25299c('0x8a9')]['length']>0x0&&(_0x3a3fb4=this['_baseLineStack'][this['_baseLineStack']['length']-0x1]);if(this['_lines'][_0x25299c('0x828')]>_0x3a3fb4){if(_0x25299c('0x233')==='NPMUv')this[_0x25299c('0x246')]();else{function _0x3d0281(){const _0xa4f187=_0x25299c,_0x3c59ad=_0x4c956d[_0xa4f187('0x2dc')](_0x3ccd91['width']/0x3),_0x33ee86=_0x2df270['round']((_0x172eb4[_0xa4f187('0x314')]-_0x3c59ad)/0x2),_0xf8e057=this['partyCommandWindowRectBorderStyle'](),_0x19ce88=_0xf8e057['y'],_0x3d50b4=_0xf8e057[_0xa4f187('0x41e')];return new _0x4172bb(_0x33ee86,_0x19ce88,_0x3c59ad,_0x3d50b4);}}}else{if(_0x25299c('0x7e6')===_0x25299c('0x7e6'))this['callNextMethod']();else{function _0x52c529(){const _0x547685=_0x25299c;if(!_0x59aabb[_0x547685('0x21')]())return;const _0x16391e=_0x37ad01[_0x547685('0x606')]();if(!_0x16391e)return;_0x16391e[_0x547685('0x707')](_0x547685('0x3d6'));}}}},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x62a')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x15d')],Window_BattleLog['prototype'][_0x467fb5('0x15d')]=function(_0x4ce5fc,_0x4e1031){const _0x1a5b5c=_0x467fb5;VisuMZ[_0x1a5b5c('0x15b')][_0x1a5b5c('0x62a')]['call'](this,_0x4ce5fc,_0x4e1031),this['callNextMethod']();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x4ab')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0xad')],Window_BattleLog[_0x467fb5('0xc9')]['performAction']=function(_0xbf800c,_0x3285e8){const _0x11645d=_0x467fb5;VisuMZ['BattleCore'][_0x11645d('0x4ab')][_0x11645d('0x709')](this,_0xbf800c,_0x3285e8),this['callNextMethod']();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x3b5')]=Window_BattleLog[_0x467fb5('0xc9')]['performActionEnd'],Window_BattleLog[_0x467fb5('0xc9')]['performActionEnd']=function(_0x4bfd22){const _0x4ff0ac=_0x467fb5;for(const _0x9b49b9 of BattleManager['allBattleMembers']()){if(!_0x9b49b9)continue;if(_0x9b49b9['isDead']())continue;_0x9b49b9[_0x4ff0ac('0x57c')]();}this[_0x4ff0ac('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')]['Window_BattleLog_performDamage']=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x44e')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x44e')]=function(_0x291378){const _0xfc7ecc=_0x467fb5;VisuMZ[_0xfc7ecc('0x15b')][_0xfc7ecc('0x826')][_0xfc7ecc('0x709')](this,_0x291378),this[_0xfc7ecc('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x268')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x7be')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x7be')]=function(_0x1d3873){const _0x1bd808=_0x467fb5;VisuMZ['BattleCore'][_0x1bd808('0x268')]['call'](this,_0x1d3873),this['callNextMethod']();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x2c8')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x56')],Window_BattleLog[_0x467fb5('0xc9')]['performRecovery']=function(_0x5e7358){const _0x382622=_0x467fb5;VisuMZ[_0x382622('0x15b')][_0x382622('0x2c8')][_0x382622('0x709')](this,_0x5e7358),this[_0x382622('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x6f5')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x108')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x108')]=function(_0x158515){const _0x4f3fa6=_0x467fb5;VisuMZ[_0x4f3fa6('0x15b')]['Window_BattleLog_performEvasion']['call'](this,_0x158515),this[_0x4f3fa6('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x5ef')]=Window_BattleLog['prototype']['performMagicEvasion'],Window_BattleLog[_0x467fb5('0xc9')]['performMagicEvasion']=function(_0xe9a544){const _0x49dc8c=_0x467fb5;VisuMZ[_0x49dc8c('0x15b')][_0x49dc8c('0x5ef')]['call'](this,_0xe9a544),this[_0x49dc8c('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x747')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x4bd')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x4bd')]=function(_0x456fdd){const _0x2dc1fc=_0x467fb5;VisuMZ['BattleCore'][_0x2dc1fc('0x747')][_0x2dc1fc('0x709')](this,_0x456fdd),this[_0x2dc1fc('0x3a4')]();},VisuMZ['BattleCore'][_0x467fb5('0x87b')]=Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x2ab')],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x2ab')]=function(_0x5ef05a){const _0x207be6=_0x467fb5;VisuMZ[_0x207be6('0x15b')][_0x207be6('0x87b')][_0x207be6('0x709')](this,_0x5ef05a),this[_0x207be6('0x3a4')]();},VisuMZ[_0x467fb5('0x15b')][_0x467fb5('0x46c')]=Window_BattleLog[_0x467fb5('0xc9')]['performSubstitute'],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x347')]=function(_0x7a3107,_0x4b502f){const _0x34c2c5=_0x467fb5;VisuMZ['BattleCore'][_0x34c2c5('0x46c')][_0x34c2c5('0x709')](this,_0x7a3107,_0x4b502f),this['callNextMethod']();},VisuMZ['BattleCore'][_0x467fb5('0x401')]=Window_BattleLog[_0x467fb5('0xc9')]['performCollapse'],Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x214')]=function(_0x368bc7){const _0x3a7ac8=_0x467fb5;VisuMZ['BattleCore'][_0x3a7ac8('0x401')]['call'](this,_0x368bc7),this['callNextMethod']();},Window_BattleLog['prototype'][_0x467fb5('0x760')]=function(_0x5f19ad,_0x4620ae){const _0x149787=_0x467fb5;_0x5f19ad['performCastAnimation'](_0x4620ae),this[_0x149787('0x3a4')]();},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x766')]=function(_0x55db4a,_0x41d644){const _0x26f8c2=_0x467fb5,_0x97eec1=_0x55db4a[_0x26f8c2('0x58a')]();if(_0x97eec1<=0x0)SoundManager[_0x26f8c2('0x7dd')]();else{if('bpQVq'==='rcVHu'){function _0x1c1d4c(){const _0x44e27a=_0x26f8c2;_0x396f97[_0x44e27a('0x155')]();}}else this[_0x26f8c2('0x6df')](_0x41d644,_0x97eec1);}},Window_BattleLog['prototype']['applyImmortal']=function(_0x336821,_0xb0df93,_0x32a203){const _0x5c0ddc=_0x467fb5,_0x3a52e8=[_0x336821][_0x5c0ddc('0x112')](_0xb0df93);for(const _0x4e5e0f of _0x3a52e8){if(_0x5c0ddc('0x626')!=='gGvfE'){if(!_0x4e5e0f)continue;_0x4e5e0f[_0x5c0ddc('0x16')](_0x32a203);}else{function _0x29b06e(){_0x15ab3a['bitmap']=_0x1fe0c8;}}}this[_0x5c0ddc('0x3a4')]();},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x8a5')]=function(_0x2736de){this['_waitCount']=_0x2736de;},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x738')]=function(_0x3c3aee,_0x17910b){const _0x1f1452=_0x467fb5;for(const _0x47a0b1 of _0x3c3aee){if('rxlYS'===_0x1f1452('0x199')){function _0x586b48(){const _0x6187b=_0x1f1452;return _0x238323['BattleCore']['Settings'][_0x6187b('0x1b9')][_0x6187b('0x3f4')];}}else{if(!_0x47a0b1)continue;_0x47a0b1[_0x1f1452('0x738')](_0x17910b);}}this[_0x1f1452('0x3a4')]();},Window_BattleLog[_0x467fb5('0xc9')]['performMoveToPoint']=function(_0x298816,_0x1273fe,_0x89000d,_0x4acb96,_0x3048c6,_0x15738f){const _0x4f366e=_0x467fb5;_0x298816[_0x4f366e('0x20a')](_0x1273fe,_0x89000d,_0x4acb96,_0x3048c6,_0x15738f,-0x1),this[_0x4f366e('0x3a4')]();},Window_BattleLog[_0x467fb5('0xc9')][_0x467fb5('0x7d8')]=function(_0x18910f,_0x1e854f,_0x354546,_0x8cace6,_0x10c035,_0x50082d,_0x27d696){const _0xb15b5c=_0x467fb5,_0x3ae05a=Math[_0xb15b5c('0x5e9')](..._0x1e854f['map'](_0x1cddd1=>_0x1cddd1[_0xb15b5c('0x67b')]()['_baseX']-_0x1cddd1['battler']()[_0xb15b5c('0x445')]()/0x2)),_0x513bee=Math['max'](..._0x1e854f[_0xb15b5c('0xae')](_0x62de40=>_0x62de40[_0xb15b5c('0x67b')]()[_0xb15b5c('0x5f6')]+_0x62de40[_0xb15b5c('0x67b')]()[_0xb15b5c('0x445')]()/0x2)),_0x117265=Math[_0xb15b5c('0x5e9')](..._0x1e854f[_0xb15b5c('0xae')](_0x6b963f=>_0x6b963f['battler']()['_baseY']-_0x6b963f[_0xb15b5c('0x67b')]()[_0xb15b5c('0x680')]())),_0x3d83f5=Math[_0xb15b5c('0x6b9')](..._0x1e854f[_0xb15b5c('0xae')](_0x85e40b=>_0x85e40b['battler']()[_0xb15b5c('0x345')])),_0x426f58=_0x1e854f[_0xb15b5c('0x649')](_0x22df07=>_0x22df07[_0xb15b5c('0x317')]())[_0xb15b5c('0x828')],_0x13d6a5=_0x1e854f[_0xb15b5c('0x649')](_0x265495=>_0x265495[_0xb15b5c('0x8c6')]())[_0xb15b5c('0x828')];let _0x3387ab=0x0,_0x463b6a=0x0;if(_0x354546[_0xb15b5c('0x5e2')](/front/i))_0x3387ab=_0x426f58>=_0x13d6a5?_0x3ae05a:_0x513bee;else{if(_0x354546['match'](/middle/i))_0x3387ab=(_0x3ae05a+_0x513bee)/0x2,_0x27d696=-0x1;else{if(_0x354546[_0xb15b5c('0x5e2')](/back/i)){if('fYzjF'!=='QpdDS')_0x3387ab=_0x426f58>=_0x13d6a5?_0x513bee:_0x3ae05a;else{function _0xb96be(){const _0x2a372e=_0xb15b5c;return _0x19e819[_0x2a372e('0x21')]()?(_0x2dbe5b[_0x2a372e('0x26e')]['_spriteset']['changeBattlebacks'](_0x2d690c[0x0],_0x4e51e4[0x1]),!![]):_0x4473a8['BattleCore']['Game_Interpreter_command283'][_0x2a372e('0x709')](this,_0x372989);}}}}}if(_0x354546[_0xb15b5c('0x5e2')](/head/i))_0x463b6a=_0x117265;else{if(_0x354546[_0xb15b5c('0x5e2')](/center/i))_0x463b6a=(_0x117265+_0x3d83f5)/0x2;else{if(_0x354546[_0xb15b5c('0x5e2')](/base/i)){if('WhkoU'===_0xb15b5c('0x8d2'))_0x463b6a=_0x3d83f5;else{function _0x37109e(){const _0x517363=_0xb15b5c;if(!_0x493d05[_0x517363('0x21')]())return;if(!_0x15b011[_0x517363('0x50c')])return;const _0x1befcb=_0x7187b9[_0x517363('0x606')]();if(!_0x1befcb)return;_0x1befcb[_0x517363('0x707')](_0x517363('0x1'));}}}}}_0x18910f[_0xb15b5c('0x20a')](_0x3387ab,_0x463b6a,_0x8cace6,_0x10c035,_0x50082d,_0x27d696),this[_0xb15b5c('0x3a4')]();},Window_BattleLog[_0x467fb5('0xc9')]['performJump']=function(_0x3309ab,_0x1245ef,_0x1925d6){const _0x78a13d=_0x467fb5;for(const _0x5467b6 of _0x3309ab){if(_0x78a13d('0x51e')!==_0x78a13d('0x51e')){function _0x51497c(){const _0x2d60d5=_0x78a13d;return _0x750cd2['BattleCore'][_0x2d60d5('0x110')][_0x2d60d5('0x389')][_0x2d60d5('0x4e0')];}}else{if(!_0x5467b6)continue;_0x5467b6[_0x78a13d('0x811')](_0x1245ef,_0x1925d6);}}this[_0x78a13d('0x3a4')]();};