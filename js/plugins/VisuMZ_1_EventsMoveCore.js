//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.11] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s).
 *
 *   Region ID(s)
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x41c6=['YSPYm','requestRefresh','_stopCount','_characterSprites','Passability','Stop','Game_Map_setupEvents','Visible','Toggle','requestAnimation','metCPC','AllAllow','USER-DEFINED\x202','vrDNg','AutoBuffer','prepareSpawnedEventAtRegion','canPassDiagonally','characterIndex','isSmartEventCollisionOn','isMoveOnlyRegionPassable','_regionRules','Game_Map_events','parallelCommonEvents','tyHro','wixTp','VisibleRange','deleteSavedEventLocationKey','rWask','setupRegionRestrictions','_hidden','SLEEP','SPIN\x20CW','isDashing','NvTfU','none','add','COBWEB','meetActivationProximityConditions','directionOnLadderSpriteVS8dir','clearSelfTarget','processMoveRouteJumpToCharacter','direction','xZBty','EventId','DBcnG','SelfVariableID','USER-DEFINED\x205','_isObjectCharacter','qOlDF','startCallEvent','onDatabaseLoaded','BmwhT','Game_Interpreter_updateWaitMode','...','updateMoveSynch','_eventIcon','Game_Map_event','sHDSW','Game_SelfSwitches_value','checkSmartEventCollision','SwitchId','ZxBFE','reverse\x20mimic','_spawnData','Event','slice','Game_CharacterBase_initMembers','startMapCommonEventOnOK','delay','_forceCarrying','Scene_Boot_onDatabaseLoaded','Forbid','BoatSpeed','IORzc','hnEzz','isBigCharacter','isLandOk','RIGHT\x20TO\x20LEFT','turnAwayFromCharacter','match','feNTD','offsetX','onClickTrigger','MapId','rotation','onChange','getInputDirection','EventLabelRefresh','Game_CharacterBase_isDashing','uEPNI','drawTextEx','Setting','isPosing','blendMode','moveSynchTarget','Game_Interpreter_executeCommand','updateShadow','iconWidth','bKFxx','frontY','command108','setPlayerDiagonalSetting','ROViO','BULB','ARRAYJSON','moveDiagonally','EventForbid','spawnEventId','qKStb','turn180','QcqTX','spawnPreserved','getEventIconIndex','processMoveRouteTeleportTo','Window_NumberInput_start','clearEventCache','updateWaitMode','processOk','addLoadListener','Game_CommonEvent_isActive','update','EnableTurnInPlace','setDiagonalDirection','CPCsMet','Game_Event_event','forceMoveRoute','KNsyS','qMooc','isSelfSwitch','hasClickTrigger','PlayerForbid','nzpEj','WxrNe','OffsetX','Game_CharacterBase_hasStepAnime','processMoveRouteStepTo','DIAPa','min','removeTemporaryMapSpawnedEvents','NIpII','createLowerLayer','_eventOverload','Game_Interpreter_PluginCommand','PreloadMaps','posNt','setEventLabelsVisible','activationRegionList','CPRNF','turnTowardCharacter','LliEZ','height','_PreservedEventMorphData','FontSize','PosY','labelWindowText','isRegionDockable','setupMorphEvent','Game_CharacterBase_setDirection','lxpTt','gkAEN','XKfIo','GOwKk','_moveRoute','WYqMt','njTNX','CKcZp','addChild','UPPER\x20RIGHT','right','UNTITLED','offsetY','All','pRDjE','isMapPassable','vehicle','WalkForbid','VlxoG','getPreservedMorphEventData','_poseDuration','isAdvancedVariable','xOpsT','TiltLeft','VS8','_pageIndex','updateShadowChanges','destinationX','_CPCs','Game_Vehicle_isMapPassable','StopAutoMoveMessages','radius','IconBlendMode','disable','saveEventLocation','processMoveSynchAway','_waitMode','DashingEnable','VariableId','processMoveRouteMoveUntilStop','isSaveEventLocation','dashSpeedModifier','Sprite_Balloon_updatePosition','SxvSc','checkValidEventerMap','StopAutoMoveEvents','VariableGetSelfVariableID','isValid','checkEventTriggerHere','updatePose','getPlayerDiagonalSetting','processMoveRoutePatternLock','dfGdz','DOEbI','_activationProximity','ZrxLm','isRegionForbidPass','ilSse','randomInt','convertSelfVariableValuesInScriptCall','variables','execute','isJumping','moveStraight','ANGER','Self\x20Variable\x20%1','ARRAYSTRUCT','initMembers','ARRAYSTR','isBattleTest','_characterName','Game_Event_refresh','lineHeight','Game_CharacterBase_moveStraight','string','IAGue','RPjbY','ANNOYED','round','PostCopyJS','rqzlh','vDnNK','_callEventMap','Game_CharacterBase_screenY','UHlDC','AutoMoveEvents','LIGHTBULB','KnWZb','windowPadding','findTargetSprite','bind','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','mapId','WalkAllow','OperateValues','Window_ScrollText_startMessage','despawnEverything','forceDashing','Window_EventItem_onOk','BiVim','kzmrk','checkRegionEventTrigger','drawing','executeMoveDir8','Game_Character_processMoveCommand','Vehicle','createLabelWindowForTarget','setMoveSpeed','RegionOk','advancedFunc','some','Game_CharacterBase_increaseSteps','RemovePreserve','vznJP','ChmtI','_lastPluginCommandInterpreter','front','createLabelWindows','reverse','setupEventsMoveCoreCommentTags','VisibleEventLabels','meetsSwitchCondition','isDestinationValid','lastSpawnedEventID','FelTI','Region%1','setValue','Window_NumberInput_processOk','%1Dock','TargetVariableId','VehicleAllow','_spriteset','_trigger','moveTowardCharacter','opacitySpeed','startMessage','Game_Player_isMapPassable','%1Allow','setEventIconDataKey','Airship','MessageCore','setOpacity','processMoveSynchApproach','HURT','JZpdU','EXCLAMATION','sDNyp','PosX','Game_CharacterBase_realMoveSpeed','map','morphInto','isDashDisabled','initMoveSpeed','Name','_EventsMoveCoreSettings','innerWidth','exit','_shadowGraphic','Scene_Map_startEncounterEffect','nKAvt','deltaX','isShadowShrink','Collision','defaultFontSize','Operation','start','lastMovedDirection','Game_Player_increaseSteps','isNormalPriority','Game_SelfSwitches_setValue','VisuMZ_0_CoreEngine','pKwbG','processMoveRouteTeleportToCharacter','deletePreservedMorphEventDataKey','TiltRight','eventLabelsVisible','Game_Event_initialize','_eventIconSprite','SpawnEventAtXY','_text','FRryt','_clickTrigger','clearStepPattern','setupCopyEvent','updateSelfMovement','ROUTE_SCRIPT','list','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','HMPH','kFult','increaseSteps','PiaIA','WOALQ','lxERC','lastSpawnedEvent','updateParallel','_needsPeriodicRefresh','sCcYv','Game_Character_setMoveRoute','EventIconDelete','TargetSwitchId','checkEventTriggerAuto','SwitchGetSelfSwitchID','processMoveRouteSetIndex','hasStepAnime','LIGHT-BULB','setupPageSettings','Direction','Icon','event','IconSet','GUVHN','deltaY','KNEEL','eventsXy','zkZGh','OFF','EventLocationSave','SILENCE','PostSpawnJS','SpawnEventDespawnEventID','_pattern','roundXWithDirection','isPreventSelfMovement','NYiDx','processMoveRouteAnimation','square','LineHeight','_lastMovedDirection','findProperPageIndex','EventID','Game_Troop_meetsConditionsCPC','initEventsMoveCoreSettings','processMoveSynchReverseMimic','clearDestination','Game_Event_setupPageSettings','_moveOnlyRegions','Sprite_Character_update','$preloadedMap_%1','BPgnV','Allow','bufferY','meetsConditions','_SavedEventLocations','ShowShadows','IconIndex','horz\x20mirror','hideShadows','_needsRefresh','RSHNs','mXkwK','rBVvJ','firstSpawnedEvent','BkujX','concat','RmGGf','activationProximityDistance','LIGHT\x20BULB','reserveCommonEvent','zgcIv','moveRouteIndex','_commonEvents','cRvAB','moveAwayFromCharacter','yveFW','boat','nlrYY','hasAdvancedSwitchVariable','Game_CharacterBase_pattern','isActive','AdvancedSwitches','QUESTION','turnTowardPoint','_selfTargetNumberInput','clearPose','processDrawIcon','blt','LEFT\x20TO\x20RIGHT','qjMSc','SpawnEventDespawnEverything','setPlayerControlDisable','turnAwayFromPoint','random','TRUE','roundX','Game_CharacterBase_moveDiagonally','fittingHeight','initEventsMoveCore','initMembersEventsMoveCore','Ship','push','_eventId','_commonEventId','frameCount','_cpc','anchor','events','HFKYl','despawnEventId','adjustDir8MovementSpeed','LDHOa','processMoveSynch','LxRbz','HEART','processMoveSynchCustom','setFrame','isEventClickTriggered','isSpriteVS8dir','getDirectionToPoint','kXSBw','setPattern','width','target','indexOf','setLastPluginCommandInterpreter','replace','cqdyC','setBalloonPose','MUSIC-NOTE','YMgVm','getDirectionFromPoint','onJyn','Game_Switches_value','MorphEventRemove','isShip','_shadowOpacity','UMXuH','Game_CharacterBase_direction','_moveSpeed','moveTowardPoint','checkEventTriggerThere','zoomScale','bitmap','setupSpawnedEvents','WZNrp','TiltVert','AirshipSpeed','checkEventsMoveCoreStringTags','ZYcfz','shiftY','DFQmr','setupEventsMoveCoreNotetags','BwYMr','ggAqJ','copy','jumpHeight','_opacity','Hidden','clearDashing','isOnRope','length','OgLOt','Game_Character_forceMoveRoute','startMapCommonEventOnOKTarget','create','COLLAPSE','Game_Event_meetsConditionsCPC','charAt','isDashingAndMoving','SpawnEventAtRegion','_dragonbones','processMoveRouteFadeOut','DashEnableToggle','removeChild','Sprite_Character_characterPatternY','deleteEventLocation','meetsCPC','isCollidedWithEvents','ARRAYEVAL','DashModifier','isAllowCharacterTilt','moveSynchType','ZZZ','FUNC','PreSpawnJS','pluginCommandCallEvent','type','HmAGa','split','Sikni','yjzNI','NPhJe','Sprite_Character_setCharacterBitmap','regionList','TNyRP','yAajd','_PlayerDiagonalSetting','Sprite_Character_setTileBitmap','Game_Event_updateParallel','tzZUp','StrictCollision','terrainTag','BitmapSmoothing','Rope','template','OpacitySpeed','TUBhL','processMoveSynchMirrorVert','_interpreter','SCREEN','max','createSpawnedEventWithData','shadowY','GetMoveSynchTarget','processMoveSynchMimic','canStartLocalEvents','opacity','EnxZK','_eventCache','Game_Event_meetsConditions','CarryPose','return\x20%1','visibleRange','maJUf','loadCPC','Game_Map_isDashDisabled','VehicleDock','updateEventsMoveCoreTagChanges','TVszu','setWaitMode','isTile','resetFontSettings','Sprite_Character_initMembers','airship','DibjN','updateRoutineMove','isSaveEventLocations','ADDITIVE','nyYOQ','updateEventIconSprite','_saveEventLocations','dKPWz','VisuMZ_2_DragonbonesUnion','ConvertParams','regionId','onCancel','requestBalloon','Game_Switches_setValue','WKnfQ','trigger','reverse\x20copy','getPosingCharacterIndex','clearPageSettings','STRUCT','_activationProximityAutoTriggerBypass','SpawnEventDespawnRegions','roundYWithDirection','call','processMoveRouteMoveToCharacter','Game_Temp_setDestination','setPose','HpIQM','horizontal\x20mirror','fontSize','_labelWindow','_character','Slccx','ZYTgJ','uFiPW','Game_CharacterBase_update','RyraV','findDiagonalDirectionTo','isAutoBufferIcon','_EventIcons','includes','setNumberInput','JSON','LEFT','updatePattern','setMoveRoute','SwitchGetSelfSwitchABCD','iconSize','SelfVariables','Step2MapId','isAdvancedSwitch','ufsVn','posEventsMoveCore','registerCommand','AdvancedVariables','_tilemap','CustomPageConditions','dAneo','isNearTheScreen','sDudr','iSGbO','processMoveSynchRandom','contentsOpacity','registerSelfEvent','updateOpacity','DefaultShadow','XLvpL','setup','parameters','realMoveSpeed','_spriteOffsetY','boxWidth','SfSow','BalloonOffsetY','description','IconBufferX','ITEM','yHliY','zfSQK','iconIndex','_scene','canPass','textSizeEx','DiagonalSpeedMultiplier','isSpawnedEvent','Self\x20Switch\x20%1','DOWN','backX','MUSICNOTE','YpqJk','shadowFilename','checkEventTriggerEventsMoveCore','value','oUmrO','iCWCQ','Spriteset_Map_createShadow','default','pageId','setDirection','_type','mirror\x20vert','switchId','QEieq','EWlXA','isAnyEventStarting','turnLeft90','_transparent','erase','prepareSpawnedEventAtXY','text','PkKcJ','setupSpawnTest','ewpMJ','switches','_pose','isSelfVariable','Game_Event_checkEventTriggerAuto','isLabelVisible','isMoving','isTurnInPlace','hasEventIcon','deleteIconsOnEventsDataKey','_addedHitbox','screenY','PageId','setMovementSuccess','yLWgZ','process_VisuMZ_EventsMoveCore_Switches_Variables','_diagonalSupport','Game_Player_getInputDirection','Region','MUSIC\x20NOTE','reverseDir','switch1Id','TIGLi','executeCommand','TzTwd','CallEvent','isPlayerControlDisabled','getLastPluginCommandInterpreter','jump','remove','setDashingEnabled','makeDeepCopy','hasCPCs','down','USER-DEFINED\x204','isPassableByAnyDirection','conditions','_stepPattern','setCharacterBitmap','Game_CharacterBase_canPass','PreCopyJS','PlayerMovementDiagonal','trim','_inputTime','pos','JDUIA','toLowerCase','processMoveRouteStepFrom','despawnRegions','determineCommonEventsWithCPC','frontX','deleteIconsOnEventsData','UwSrw','processMoveRouteJumpForward','EVAL','characterPatternY','_selfTargetItemChoice','psANg','SpawnEventDespawnAtXY','EventTemplates','clearCarrying','_selfTarget','MCANX','setupDiagonalSupport','iconHeight','setDestination','updateText','removeMorph','activationProximityType','setSelfValue','Value','SPIN\x20CCW','characterPatternYVS8','ARRAYNUM','OvSoG','setAllowEventAutoMovement','ship','Window_Message_startMessage','Disable','contents','scale','onLoadSuccess','approach','clear','checkActivationProximity','Dock','XgWYn','Game_CharacterBase_characterIndex','IconBufferY','_eventMorphData','correctFacingDirection','aGAsk','Game_Message_setNumberInput','_spawnedEvents','Game_System_initialize','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','isInVehicle','_labelWindows','SelfSwitches','SWEAT','processMoveRouteFadeIn','turnRight90','isDashingEnabled','constructor','eventsXyNt','smooth','pages','Game_Map_setup','tGUng','timer','locate','_moveRouteIndex','juUhj','Game_Message_setItemChoice','Game_CharacterBase_updatePattern','CPC','startEncounterEffect','MoveAllSynchTargets','away','_forceDashing','isEventOverloaded','executeMove','createContents','OffsetY','updatePatternEventsMoveCore','hasDragonbones','FALSE','processMoveRouteMoveRepeat','Game_Player_isDashing','SommV','destinationY','Window_EventItem_onCancel','%1%2','_spriteOffsetX','Game_Player_checkEventTriggerHere','wwKgK','registerSelfTarget','EventIconChange','_target','setupEvents','_data','Game_Variables_value','Spriteset_Map_createLowerLayer','splice','abs','createSpawnedEvent','_callEventData','VJyCU','log','refresh','padZero','NORMAL','Boat','Sprite_Balloon_setup','setupSaveEventLocations','CcBxq','getEventIconData','processMoveRouteStepToCharacter','Map%1.json','Game_Map_update','meetActivationRegionConditions','processMoveRouteHugWall','Game_Vehicle_isLandOk','isPressed','SPIN\x20COUNTERCLOCKWISE','getPosingCharacterPattern','MULTIPLY','processMoveRouteMoveTo','PreMorphJS','eOPKy','PreloadedMaps','_mapId','characterName','findDirectionTo','LCdmp','%1DockRegionOnly','clearSpriteOffsets','bufferX','djuRv','isOnLadder','prototype','deleteSavedEventLocation','axJXO','Game_Map_refresh','_patternLocked','isShadowVisible','variableId','Preserve','Template','ePcdL','page','VICTORY','STR','_eventCopyData','TurnInPlaceDelay','EnableDashTilt','VisuMZ_Setup_Preload_Map','backY','distance','rQThE','restoreSavedEventPosition','JRlGk','screenX','isRunning','savePreservedMorphEventDataKey','rLvDR','hasMoveOnlyRegions','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','createIconSprite','deltaXFrom','absDistance','Game_Player_executeMove','_vehicleType','toUpperCase','_filename','labelWindowRange','pqfFZ','EjlIK','updateVS8BalloonOffsets','visible','Game_Message_add','hwjlm','isPlaytest','isEventRunning','Game_CharacterBase_screenX','vert\x20mirror','iZegZ','Step1MapId','updateBitmapSmoothing','clamp','Map%1-Event%2','DQmvo','_saveEventLocation','characterIndexVS8','canMove','klXIH','parse','isEventTest','getSelfTarget','List','_periodicRefreshTimer','_shadowSprite','EnableDir8','Step2EventId','Button','processMoveCommand','QsXCh','oQjGF','PlayerAllow','isAllowEventAutoMovement','checkAdvancedSwitchVariablePresent','command357','_duration','isDiagonalDirection','isPassable','setupChild','Game_Event_clearPageSettings','XqpcP','onOk','getPosingCharacterDirection','_counter','Enable','_selfEvent','Letter','AllForbid','_characterIndex','qnzwa','updateMove','vertical\x20mirror','setImage','UksJJ','zyJCE','startMapCommonEventOnTouch','_eventOverloadThreshold','Player','loadSystem','isAirshipPassable','BufferX','Settings','initialize','processMoveRouteBalloon','eventId','apply','enable','isTargetEventValidForLabelWindow','left','setItemChoice','isBoat','MorphEventTo','updatePeriodicRefresh','Label','Game_Enemy_meetsSwitchCondition','processMoveRouteSelfSwitch','refreshIfNeeded','getPose','deltaYFrom','ZTrZf','isRegionAllowPass','setTileBitmap','drawIcon','processMoveRouteSelfVariable','SlowerSpeed','sdmBO','_eventSpawnData','GDlxX','autosaveEventLocation','updatePosition','processMoveSynchMirrorHorz','Movement','LYeMy','parent','MapID','TemplateName','_alwaysUpdateMove','morphIntoTemplate','isSupportDiagonalMovement','Game_Vehicle_initMoveSpeed','floor','EventsMoveCore','PlayerIconDelete','Game_Map_parallelCommonEvents','_moveSynch','iNgUI','SelfSwitchID','jhejR','useCarryPoseForIcons','name','filename','jiTko','NOTE','autoEventIconBuffer','vjELn','code','checkNeedForPeriodicRefresh','setupSpawn','mntTN','createSaveEventLocationData','updateTilt','_DisablePlayerControl','SelfSwitchABCD','EventLocationCreate','KcobL','filter','SPIN\x20CLOCKWISE','variableValid','player','_event','setupEventsMoveCoreEffects','resizeWindow','_MapSpawnedEventData','initEventsMoveCoreEffects','createShadows','updateScale','KyBtS','adRwR','_advancedSwitchVariable','region','setBackgroundType','LFNLZ','note','switch2Valid','ZANQE','despawnAtXY','pattern','FfcTQ','forceCarrying','Step1EventId','selfValue','advancedValue','getMapSpawnedEventData','getInputDir8','format','moveAwayFromPoint','buHKo','createCharacterShadow','_spawnPreserved','MxKrE','EventLabelVisible','hytmt','Game_Event_updateSelfMovement','EventAutoMovement','kKRpi','Scene_Load_onLoadSuccess','Game_Player_checkEventTriggerThere','KJdiK','LrJiv'];(function(_0x1be573,_0x41c62f){const _0x3c5b4d=function(_0x1efdcb){while(--_0x1efdcb){_0x1be573['push'](_0x1be573['shift']());}};_0x3c5b4d(++_0x41c62f);}(_0x41c6,0x193));const _0x3c5b=function(_0x1be573,_0x41c62f){_0x1be573=_0x1be573-0x0;let _0x3c5b4d=_0x41c6[_0x1be573];return _0x3c5b4d;};const _0x3b3036=_0x3c5b;var label=_0x3b3036('0x261'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3b3036('0x279')](function(_0x2996e8){const _0x5e26a1=_0x3b3036;return _0x2996e8['status']&&_0x2996e8[_0x5e26a1('0xfd')]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x3b3036('0x239')]||{},VisuMZ[_0x3b3036('0xbc')]=function(_0x12aa7b,_0x3ec0e3){const _0x780c9f=_0x3b3036;for(const _0x1d802f in _0x3ec0e3){if(_0x1d802f[_0x780c9f('0x2f4')](/(.*):(.*)/i)){const _0x236c5a=String(RegExp['$1']),_0x4c327b=String(RegExp['$2'])[_0x780c9f('0x1f8')]()[_0x780c9f('0x14d')]();let _0x252bd8,_0x2af605,_0x3170c3;switch(_0x4c327b){case'NUM':_0x252bd8=_0x3ec0e3[_0x1d802f]!==''?Number(_0x3ec0e3[_0x1d802f]):0x0;break;case _0x780c9f('0x16c'):_0x2af605=_0x3ec0e3[_0x1d802f]!==''?JSON[_0x780c9f('0x20f')](_0x3ec0e3[_0x1d802f]):[],_0x252bd8=_0x2af605['map'](_0x2a292c=>Number(_0x2a292c));break;case _0x780c9f('0x159'):_0x252bd8=_0x3ec0e3[_0x1d802f]!==''?eval(_0x3ec0e3[_0x1d802f]):null;break;case _0x780c9f('0x7b'):_0x2af605=_0x3ec0e3[_0x1d802f]!==''?JSON[_0x780c9f('0x20f')](_0x3ec0e3[_0x1d802f]):[],_0x252bd8=_0x2af605[_0x780c9f('0x3d8')](_0x3c3628=>eval(_0x3c3628));break;case _0x780c9f('0xdd'):_0x252bd8=_0x3ec0e3[_0x1d802f]!==''?JSON[_0x780c9f('0x20f')](_0x3ec0e3[_0x1d802f]):'';break;case _0x780c9f('0x30d'):_0x2af605=_0x3ec0e3[_0x1d802f]!==''?JSON['parse'](_0x3ec0e3[_0x1d802f]):[],_0x252bd8=_0x2af605['map'](_0x4ac3e0=>JSON[_0x780c9f('0x20f')](_0x4ac3e0));break;case _0x780c9f('0x80'):_0x252bd8=_0x3ec0e3[_0x1d802f]!==''?new Function(JSON[_0x780c9f('0x20f')](_0x3ec0e3[_0x1d802f])):new Function('return\x200');break;case'ARRAYFUNC':_0x2af605=_0x3ec0e3[_0x1d802f]!==''?JSON[_0x780c9f('0x20f')](_0x3ec0e3[_0x1d802f]):[],_0x252bd8=_0x2af605[_0x780c9f('0x3d8')](_0x4fbd0e=>new Function(JSON[_0x780c9f('0x20f')](_0x4fbd0e)));break;case _0x780c9f('0x1e3'):_0x252bd8=_0x3ec0e3[_0x1d802f]!==''?String(_0x3ec0e3[_0x1d802f]):'';break;case _0x780c9f('0x387'):_0x2af605=_0x3ec0e3[_0x1d802f]!==''?JSON[_0x780c9f('0x20f')](_0x3ec0e3[_0x1d802f]):[],_0x252bd8=_0x2af605[_0x780c9f('0x3d8')](_0x3d1ea2=>String(_0x3d1ea2));break;case _0x780c9f('0xc6'):_0x3170c3=_0x3ec0e3[_0x1d802f]!==''?JSON[_0x780c9f('0x20f')](_0x3ec0e3[_0x1d802f]):{},_0x12aa7b[_0x236c5a]={},VisuMZ['ConvertParams'](_0x12aa7b[_0x236c5a],_0x3170c3);continue;case _0x780c9f('0x385'):_0x2af605=_0x3ec0e3[_0x1d802f]!==''?JSON['parse'](_0x3ec0e3[_0x1d802f]):[],_0x252bd8=_0x2af605['map'](_0x2bb7ca=>VisuMZ[_0x780c9f('0xbc')]({},JSON[_0x780c9f('0x20f')](_0x2bb7ca)));break;default:continue;}_0x12aa7b[_0x236c5a]=_0x252bd8;}}return _0x12aa7b;},(_0x2aebb7=>{const _0xb5b1d1=_0x3b3036,_0x58c684=_0x2aebb7[_0xb5b1d1('0x269')];for(const _0x4255b0 of dependencies){if(_0xb5b1d1('0x285')!==_0xb5b1d1('0x285')){function _0x2127b5(){const _0x3a976c=_0xb5b1d1;return _0x1808fd[_0x3a976c('0x261')][_0x3a976c('0x3d7')][_0x3a976c('0xca')](this)-this[_0x3a976c('0x53')];}}else{if(!Imported[_0x4255b0]){if(_0xb5b1d1('0x2f5')!==_0xb5b1d1('0x219')){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xb5b1d1('0x296')](_0x58c684,_0x4255b0)),SceneManager[_0xb5b1d1('0x3df')]();break;}else{function _0x9227aa(){const _0x806efd=_0xb5b1d1;return _0x506f3b[_0x806efd('0x2f7')](),!![];}}}}}const _0x481d2f=_0x2aebb7[_0xb5b1d1('0xfd')];if(_0x481d2f['match'](/\[Version[ ](.*?)\]/i)){const _0x13f831=Number(RegExp['$1']);_0x13f831!==VisuMZ[label]['version']&&(alert(_0xb5b1d1('0x182')[_0xb5b1d1('0x296')](_0x58c684,_0x13f831)),SceneManager[_0xb5b1d1('0x3df')]());}if(_0x481d2f[_0xb5b1d1('0x2f4')](/\[Tier[ ](\d+)\]/i)){const _0x6ed171=Number(RegExp['$1']);if(_0x6ed171<tier)alert(_0xb5b1d1('0x1f2')[_0xb5b1d1('0x296')](_0x58c684,_0x6ed171,tier)),SceneManager[_0xb5b1d1('0x3df')]();else{if(_0xb5b1d1('0x8b')===_0xb5b1d1('0x8b'))tier=Math[_0xb5b1d1('0x9b')](_0x6ed171,tier);else{function _0x557cd9(){const _0x33bfab=_0xb5b1d1;_0x34825d[_0x33bfab('0x1ab')](_0x5ba055['_selfTargetItemChoice']),_0x18b266['EventsMoveCore']['Window_EventItem_onOk'][_0x33bfab('0xca')](this),_0x3681ec[_0x33bfab('0x2cc')](),_0x3b7a6b[_0x33bfab('0x15b')]=_0x599376;}}}}VisuMZ[_0xb5b1d1('0xbc')](VisuMZ[label][_0xb5b1d1('0x239')],_0x2aebb7[_0xb5b1d1('0xf7')]);})(pluginData),VisuMZ[_0x3b3036('0x3a1')]=function(_0xbc584,_0x16282b,_0x223689){switch(_0x223689){case'=':return _0x16282b;break;case'+':return _0xbc584+_0x16282b;break;case'-':return _0xbc584-_0x16282b;break;case'*':return _0xbc584*_0x16282b;break;case'/':return _0xbc584/_0x16282b;break;case'%':return _0xbc584%_0x16282b;break;}return _0xbc584;},PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x398'),_0xafba67=>{const _0x3c7f24=_0x3b3036;VisuMZ[_0x3c7f24('0xbc')](_0xafba67,_0xafba67);switch(_0xafba67[_0x3c7f24('0x169')]){case'Allow':$gameSystem[_0x3c7f24('0x16e')](!![]);break;case _0x3c7f24('0x2aa'):$gameSystem[_0x3c7f24('0x16e')](![]);break;case _0x3c7f24('0x2ad'):$gameSystem[_0x3c7f24('0x16e')](!$gameSystem[_0x3c7f24('0x21c')]());break;}}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x13c'),_0x30cb3c=>{const _0x17b3c4=_0x3b3036;VisuMZ[_0x17b3c4('0xbc')](_0x30cb3c,_0x30cb3c);const _0x39c939=$gameTemp[_0x17b3c4('0x13e')](),_0x3ebf40={'mapId':_0x30cb3c[_0x17b3c4('0x2f8')],'eventId':_0x30cb3c[_0x17b3c4('0x2d0')]||_0x39c939['eventId'](),'pageId':_0x30cb3c[_0x17b3c4('0x12f')]};if(_0x3ebf40[_0x17b3c4('0x39f')]<=0x0)_0x3ebf40[_0x17b3c4('0x39f')]=$gameMap?$gameMap['mapId']():0x1;$gameTemp[_0x17b3c4('0x13e')]()[_0x17b3c4('0x82')](_0x3ebf40);}),PluginManager['registerCommand'](pluginData['name'],_0x3b3036('0x75'),_0x55b583=>{const _0x387a3a=_0x3b3036;VisuMZ[_0x387a3a('0xbc')](_0x55b583,_0x55b583);switch(_0x55b583[_0x387a3a('0x169')]){case _0x387a3a('0x228'):$gameSystem[_0x387a3a('0x141')](!![]);break;case _0x387a3a('0x171'):$gameSystem['setDashingEnabled'](![]);break;case _0x387a3a('0x2ad'):$gameSystem[_0x387a3a('0x141')](!$gameSystem['isDashingEnabled']());break;}}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x1ac'),_0x587e4a=>{const _0x564137=_0x3b3036;VisuMZ[_0x564137('0xbc')](_0x587e4a,_0x587e4a);const _0x28543b=$gameTemp[_0x564137('0x13e')]();_0x587e4a[_0x564137('0x2f8')]=_0x587e4a[_0x564137('0x2f8')]||$gameMap[_0x564137('0x39f')](),$gameSystem[_0x564137('0x3cd')](_0x587e4a['MapId'],_0x587e4a['EventId']||_0x28543b[_0x564137('0x23c')](),_0x587e4a[_0x564137('0x0')],_0x587e4a[_0x564137('0xfe')],_0x587e4a['IconBufferY'],_0x587e4a[_0x564137('0x363')]);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x40a'),_0x3c287b=>{const _0x36251b=_0x3b3036;VisuMZ[_0x36251b('0xbc')](_0x3c287b,_0x3c287b);const _0x2c2998=$gameTemp[_0x36251b('0x13e')]();_0x3c287b[_0x36251b('0x2f8')]=_0x3c287b[_0x36251b('0x2f8')]||$gameMap[_0x36251b('0x39f')](),$gameSystem['deleteIconsOnEventsDataKey'](_0x3c287b[_0x36251b('0x2f8')],_0x3c287b[_0x36251b('0x2d0')]||_0x2c2998['eventId']());}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x2fc'),_0x2bea3e=>{const _0x4048b6=_0x3b3036;if($gameMap)for(const _0x556d21 of $gameMap[_0x4048b6('0x33')]()){_0x556d21[_0x4048b6('0x1b8')]();}}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x29c'),_0x4fda39=>{const _0x256548=_0x3b3036;VisuMZ['ConvertParams'](_0x4fda39,_0x4fda39);switch(_0x4fda39['Visibility']){case _0x256548('0x2ac'):$gameSystem[_0x256548('0x336')](!![]);break;case _0x256548('0x66'):$gameSystem[_0x256548('0x336')](![]);break;case'Toggle':$gameSystem[_0x256548('0x336')](!$gameSystem[_0x256548('0x3f2')]());break;}}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x41c'),_0x3460ec=>{const _0xfae8cc=_0x3b3036;VisuMZ['ConvertParams'](_0x3460ec,_0x3460ec);if(!$gameMap)return;const _0x2a69b5=$gameMap['event'](_0x3460ec['EventId']);if(_0x2a69b5)_0x2a69b5[_0xfae8cc('0x365')]();}),PluginManager[_0x3b3036('0xe8')](pluginData['name'],_0x3b3036('0x277'),_0x437c2d=>{const _0x5b6ed9=_0x3b3036;VisuMZ[_0x5b6ed9('0xbc')](_0x437c2d,_0x437c2d);const _0x13e623=$gameTemp[_0x5b6ed9('0x13e')](),_0x1a2ce3=_0x437c2d[_0x5b6ed9('0x2f8')]||$gameMap[_0x5b6ed9('0x39f')](),_0x1e00aa=_0x437c2d[_0x5b6ed9('0x2d0')]||_0x13e623[_0x5b6ed9('0x23c')](),_0x3a8e24=_0x437c2d[_0x5b6ed9('0x3d6')]||0x0,_0x1ea5c4=_0x437c2d[_0x5b6ed9('0x33e')]||0x0,_0x5b67d1=_0x437c2d[_0x5b6ed9('0x412')]||0x2,_0x2c3636=((_0x437c2d['PageId']||0x1)-0x1)[_0x5b6ed9('0x208')](0x0,0x13),_0x483546=_0x437c2d['MoveRouteIndex']||0x0;$gameSystem[_0x5b6ed9('0x273')](_0x1a2ce3,_0x1e00aa,_0x3a8e24,_0x1ea5c4,_0x5b67d1,_0x2c3636,_0x483546);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],'EventLocationDelete',_0x4a8679=>{const _0x212dcc=_0x3b3036;VisuMZ['ConvertParams'](_0x4a8679,_0x4a8679);const _0x3f8182=$gameTemp[_0x212dcc('0x13e')](),_0x68548d=_0x4a8679['MapId']||$gameMap[_0x212dcc('0x39f')](),_0x517d21=_0x4a8679['EventId']||_0x3f8182['eventId']();$gameSystem[_0x212dcc('0x2bf')](_0x68548d,_0x517d21);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0xe1'),_0x2cefcc=>{const _0x4c7636=_0x3b3036;VisuMZ['ConvertParams'](_0x2cefcc,_0x2cefcc);const _0x4606af=$gameTemp[_0x4c7636('0x13e')]();_0x2cefcc[_0x4c7636('0x2f8')]=_0x2cefcc['MapId']||$gameMap[_0x4c7636('0x39f')]();const _0x1952a9=[_0x2cefcc[_0x4c7636('0x2f8')],_0x2cefcc[_0x4c7636('0x2d0')]||_0x4606af[_0x4c7636('0x23c')](),_0x2cefcc[_0x4c7636('0x22a')]],_0x5d57f4=_0x2cefcc['TargetSwitchId'],_0x3d5184=$gameSelfSwitches['value'](_0x1952a9)||![];$gameSwitches['setValue'](_0x5d57f4,_0x3d5184);}),PluginManager['registerCommand'](pluginData['name'],_0x3b3036('0x40d'),_0x51c302=>{const _0x430ff6=_0x3b3036;VisuMZ[_0x430ff6('0xbc')](_0x51c302,_0x51c302);const _0x2af11d=$gameTemp[_0x430ff6('0x13e')]();_0x51c302[_0x430ff6('0x2f8')]=_0x51c302['MapId']||$gameMap[_0x430ff6('0x39f')]();const _0x5b4ba9=[_0x51c302[_0x430ff6('0x2f8')],_0x51c302['EventId']||_0x2af11d[_0x430ff6('0x23c')](),_0x430ff6('0x108')[_0x430ff6('0x296')](_0x51c302[_0x430ff6('0x2e1')])],_0x29dcb2=_0x51c302[_0x430ff6('0x40b')],_0x4f30a1=$gameSelfSwitches['value'](_0x5b4ba9)||![];$gameSwitches['setValue'](_0x29dcb2,_0x4f30a1);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x371'),_0x545e4c=>{const _0x31325e=_0x3b3036;VisuMZ['ConvertParams'](_0x545e4c,_0x545e4c);const _0x3e792b=$gameTemp['getLastPluginCommandInterpreter']();_0x545e4c['MapId']=_0x545e4c[_0x31325e('0x2f8')]||$gameMap['mapId']();const _0x579450=[_0x545e4c[_0x31325e('0x2f8')],_0x545e4c['EventId']||_0x3e792b[_0x31325e('0x23c')](),_0x31325e('0x384')[_0x31325e('0x296')](_0x545e4c['VariableId'])],_0x3e8423=_0x545e4c[_0x31325e('0x3c4')],_0x2dc3a5=$gameSelfSwitches[_0x31325e('0x10f')](_0x579450)||![];$gameVariables[_0x31325e('0x3c1')](_0x3e8423,_0x2dc3a5);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x243'),_0x290886=>{const _0x349cc4=_0x3b3036;VisuMZ[_0x349cc4('0xbc')](_0x290886,_0x290886);if(!$gameMap)return;const _0x42ba67=$gameTemp[_0x349cc4('0x13e')](),_0x596260=_0x290886['Step2Preserve'];_0x290886['Step1MapId']=_0x290886[_0x349cc4('0x206')]||$gameMap['mapId'](),_0x290886['Step2MapId']=_0x290886[_0x349cc4('0xe4')]||$gameMap[_0x349cc4('0x39f')](),_0x290886[_0x349cc4('0x25b')]=_0x290886[_0x349cc4('0x25b')][_0x349cc4('0x1f8')]()[_0x349cc4('0x14d')]();if(!_0x596260&&_0x290886[_0x349cc4('0x206')]!==$gameMap[_0x349cc4('0x39f')]())return;if($gameMap[_0x349cc4('0x39f')]()===_0x290886[_0x349cc4('0x206')]){const _0x12eee0=$gameMap[_0x349cc4('0x414')](_0x290886[_0x349cc4('0x291')]||_0x42ba67[_0x349cc4('0x23c')]());if(!_0x12eee0)return;if(_0x290886[_0x349cc4('0x25b')]!=='UNTITLED')_0x12eee0['morphIntoTemplate'](_0x290886['TemplateName']);else{if(_0x349cc4('0x2e2')==='NQEHn'){function _0x3ebc35(){const _0x2a5504=_0x349cc4;_0x34d5f1[_0x2a5504('0x1ab')](_0x18c3f9[_0x2a5504('0x1c')]),_0x9b71d[_0x2a5504('0x261')][_0x2a5504('0x3c2')][_0x2a5504('0xca')](this),_0x41f2ec[_0x2a5504('0x2cc')](),_0x263640[_0x2a5504('0x1c')]=_0xc441ba;}}else _0x12eee0[_0x349cc4('0x3d9')](_0x290886[_0x349cc4('0xe4')],_0x290886[_0x349cc4('0x216')]||_0x42ba67['eventId']());}}if(_0x596260){if(_0x349cc4('0x5d')!==_0x349cc4('0x2a0'))$gameSystem['savePreservedMorphEventDataKey'](_0x290886[_0x349cc4('0x206')],_0x290886['Step1EventId'],_0x290886[_0x349cc4('0x25b')],_0x290886[_0x349cc4('0xe4')],_0x290886[_0x349cc4('0x216')]);else{function _0x4e83ab(){const _0x199b4c=_0x349cc4,_0x21bf88=this[_0x199b4c('0x105')](_0x1d8c92),_0x917bdc=_0xd51862['floor']((this[_0x199b4c('0x3de')]-_0x21bf88[_0x199b4c('0x42')])/0x2);this[_0x199b4c('0x2ff')](_0x17ba4e,_0x917bdc,_0x57b433),_0x5598a0+=_0x21bf88['height'];}}}}),PluginManager['registerCommand'](pluginData[_0x3b3036('0x269')],_0x3b3036('0x4e'),_0xdc2be2=>{const _0x5187f1=_0x3b3036;VisuMZ[_0x5187f1('0xbc')](_0xdc2be2,_0xdc2be2);if(!$gameMap)return;const _0x4aeb1e=$gameTemp[_0x5187f1('0x13e')]();_0xdc2be2[_0x5187f1('0x2f8')]=_0xdc2be2[_0x5187f1('0x2f8')]||$gameMap[_0x5187f1('0x39f')]();if($gameMap[_0x5187f1('0x39f')]()===_0xdc2be2[_0x5187f1('0x2f8')]){if(_0x5187f1('0x345')===_0x5187f1('0x345')){const _0x263393=$gameMap[_0x5187f1('0x414')](_0xdc2be2[_0x5187f1('0x2d0')]||_0x4aeb1e[_0x5187f1('0x23c')]());_0x263393[_0x5187f1('0x166')]();}else{function _0x5122f2(){const _0x2a03da=_0x5187f1;if([0x1,0x4,0x7][_0x2a03da('0xdb')](_0x28df92))_0x1f88e3-=0x1;if([0x3,0x6,0x9][_0x2a03da('0xdb')](_0x5caa24))_0x165282+=0x1;return this['roundX'](_0x281b94);}}}_0xdc2be2[_0x5187f1('0x3b3')]&&$gameSystem[_0x5187f1('0x3f0')](_0xdc2be2[_0x5187f1('0x2f8')],_0xdc2be2[_0x5187f1('0x2d0')]||_0x4aeb1e[_0x5187f1('0x23c')]());}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],'PlayerMovementChange',_0x4a0ca2=>{const _0x2ee326=_0x3b3036;VisuMZ['ConvertParams'](_0x4a0ca2,_0x4a0ca2),$gameSystem['setPlayerControlDisable'](!_0x4a0ca2[_0x2ee326('0x228')]);}),PluginManager[_0x3b3036('0xe8')](pluginData['name'],_0x3b3036('0x14c'),_0x40691b=>{const _0x3f3596=_0x3b3036;VisuMZ[_0x3f3596('0xbc')](_0x40691b,_0x40691b),$gameSystem[_0x3f3596('0x30a')](_0x40691b[_0x3f3596('0x300')]);}),PluginManager[_0x3b3036('0xe8')](pluginData['name'],'PlayerIconChange',_0x1f72be=>{const _0x1858d6=_0x3b3036;VisuMZ[_0x1858d6('0xbc')](_0x1f72be,_0x1f72be),$gameSystem['setEventIconData']($gamePlayer,_0x1f72be[_0x1858d6('0x0')],_0x1f72be['IconBufferX'],_0x1f72be[_0x1858d6('0x17b')],_0x1f72be[_0x1858d6('0x363')]);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x262'),_0xf975bf=>{const _0x521cf3=_0x3b3036;VisuMZ[_0x521cf3('0xbc')](_0xf975bf,_0xf975bf),$gameSystem[_0x521cf3('0x156')]($gamePlayer);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x276'),_0x5354a8=>{const _0x496ed1=_0x3b3036;VisuMZ[_0x496ed1('0xbc')](_0x5354a8,_0x5354a8);const _0x581107=$gameTemp[_0x496ed1('0x13e')]();_0x5354a8[_0x496ed1('0x2f8')]=_0x5354a8[_0x496ed1('0x2f8')]||$gameMap[_0x496ed1('0x39f')]();const _0x500b05=[_0x5354a8[_0x496ed1('0x2f8')],_0x5354a8[_0x496ed1('0x2d0')]||_0x581107['eventId'](),_0x5354a8[_0x496ed1('0x22a')]];switch(_0x5354a8[_0x496ed1('0x169')]){case'ON':$gameSelfSwitches[_0x496ed1('0x3c1')](_0x500b05,!![]);break;case _0x496ed1('0x41b'):$gameSelfSwitches[_0x496ed1('0x3c1')](_0x500b05,![]);break;case'Toggle':$gameSelfSwitches[_0x496ed1('0x3c1')](_0x500b05,!$gameSelfSwitches[_0x496ed1('0x10f')](_0x500b05));break;}}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x266'),_0x206959=>{const _0x36e4c8=_0x3b3036;VisuMZ[_0x36e4c8('0xbc')](_0x206959,_0x206959);const _0x165c96=$gameTemp['getLastPluginCommandInterpreter']();_0x206959[_0x36e4c8('0x2f8')]=_0x206959['MapId']||$gameMap[_0x36e4c8('0x39f')]();const _0x410f27=[_0x206959[_0x36e4c8('0x2f8')],_0x206959[_0x36e4c8('0x2d0')]||_0x165c96[_0x36e4c8('0x23c')](),_0x36e4c8('0x108')[_0x36e4c8('0x296')](_0x206959['SwitchId'])];switch(_0x206959[_0x36e4c8('0x169')]){case'ON':$gameSelfSwitches[_0x36e4c8('0x3c1')](_0x410f27,!![]);break;case _0x36e4c8('0x41b'):$gameSelfSwitches['setValue'](_0x410f27,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x410f27,!$gameSelfSwitches[_0x36e4c8('0x10f')](_0x410f27));break;}}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x2d2'),_0x1abbba=>{const _0x1453b3=_0x3b3036;VisuMZ[_0x1453b3('0xbc')](_0x1abbba,_0x1abbba);const _0x2fc835=$gameTemp['getLastPluginCommandInterpreter'](),_0x524402=[_0x1abbba['MapId'],_0x1abbba[_0x1453b3('0x2d0')]||_0x2fc835[_0x1453b3('0x23c')](),'Self\x20Variable\x20%1'[_0x1453b3('0x296')](_0x1abbba[_0x1453b3('0x369')])];_0x1abbba[_0x1453b3('0x2f8')]=_0x1abbba[_0x1453b3('0x2f8')]||$gameMap[_0x1453b3('0x39f')]();const _0x40c5db=VisuMZ[_0x1453b3('0x3a1')]($gameSelfSwitches[_0x1453b3('0x10f')](_0x524402),_0x1abbba[_0x1453b3('0x169')],_0x1abbba[_0x1453b3('0x3e7')]);$gameSelfSwitches[_0x1453b3('0x3c1')](_0x524402,_0x40c5db);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x3f5'),_0x383572=>{const _0x284c77=_0x3b3036;VisuMZ[_0x284c77('0xbc')](_0x383572,_0x383572);const _0x206892={'template':_0x383572['TemplateName'],'mapId':_0x383572[_0x284c77('0x2f8')],'eventId':_0x383572[_0x284c77('0x2d0')],'x':_0x383572[_0x284c77('0x3d6')],'y':_0x383572['PosY'],'spawnPreserved':_0x383572[_0x284c77('0x1de')],'spawnEventId':$gameMap[_0x284c77('0x180')][_0x284c77('0x69')]+0x3e8};$gameMap['prepareSpawnedEventAtXY'](_0x206892,_0x383572[_0x284c77('0x3e5')],_0x383572[_0x284c77('0x2a9')]);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x72'),_0x2eb6db=>{const _0x3a4a99=_0x3b3036;VisuMZ[_0x3a4a99('0xbc')](_0x2eb6db,_0x2eb6db);const _0x4c196d={'template':_0x2eb6db['TemplateName'],'mapId':_0x2eb6db[_0x3a4a99('0x2f8')],'eventId':_0x2eb6db['EventId'],'x':-0x1,'y':-0x1,'spawnPreserved':_0x2eb6db[_0x3a4a99('0x1de')],'spawnEventId':$gameMap['_spawnedEvents'][_0x3a4a99('0x69')]+0x3e8};$gameMap[_0x3a4a99('0x2b4')](_0x4c196d,_0x2eb6db[_0x3a4a99('0x135')],_0x2eb6db[_0x3a4a99('0x3e5')],_0x2eb6db[_0x3a4a99('0x2a9')]);}),PluginManager['registerCommand'](pluginData[_0x3b3036('0x269')],_0x3b3036('0x41f'),_0x51e216=>{const _0x2aa9f7=_0x3b3036;VisuMZ[_0x2aa9f7('0xbc')](_0x51e216,_0x51e216),$gameMap[_0x2aa9f7('0x35')](_0x51e216[_0x2aa9f7('0x429')]);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x15d'),_0x54317c=>{const _0x21f630=_0x3b3036;VisuMZ[_0x21f630('0xbc')](_0x54317c,_0x54317c);const _0x344152=_0x54317c[_0x21f630('0x3d6')],_0x3572ac=_0x54317c[_0x21f630('0x33e')];$gameMap[_0x21f630('0x28d')](_0x344152,_0x3572ac);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0xc8'),_0x3ab6d5=>{const _0x5a12f6=_0x3b3036;VisuMZ[_0x5a12f6('0xbc')](_0x3ab6d5,_0x3ab6d5),$gameMap[_0x5a12f6('0x153')](_0x3ab6d5[_0x5a12f6('0x135')]);}),PluginManager[_0x3b3036('0xe8')](pluginData[_0x3b3036('0x269')],_0x3b3036('0x22'),_0x4e4dde=>{const _0x514bee=_0x3b3036;VisuMZ[_0x514bee('0xbc')](_0x4e4dde,_0x4e4dde),$gameMap['despawnEverything']();}),VisuMZ[_0x3b3036('0x261')]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x3b3036('0x1d7')]['onDatabaseLoaded'],Scene_Boot[_0x3b3036('0x1d7')][_0x3b3036('0x2d7')]=function(){const _0x1b2943=_0x3b3036;VisuMZ[_0x1b2943('0x261')][_0x1b2943('0x2eb')]['call'](this),this[_0x1b2943('0x3fe')](),this[_0x1b2943('0x132')]();if(VisuMZ[_0x1b2943('0x261')][_0x1b2943('0xeb')])VisuMZ[_0x1b2943('0x261')][_0x1b2943('0xeb')]['initialize']();},VisuMZ[_0x3b3036('0x1cd')]=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x3b3036('0x1d7')]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x8972c4=_0x3b3036;if(DataManager[_0x8972c4('0x388')]()||DataManager['isEventTest']())return;const _0xc28490=VisuMZ[_0x8972c4('0x261')]['Settings'][_0x8972c4('0x1df')],_0x43abf7=_0xc28490[_0x8972c4('0x334')][_0x8972c4('0x2e6')](0x0);for(const _0x531e7d of _0xc28490[_0x8972c4('0x212')]){if(_0x8972c4('0x61')===_0x8972c4('0x2b2')){function _0x44dede(){const _0x390003=_0x8972c4;if(_0x1dd384[_0x390003('0x201')]())_0x488803[_0x390003('0x1b7')](_0x451c9c);}}else{_0x531e7d[_0x8972c4('0x3dc')]=_0x531e7d['Name'][_0x8972c4('0x1f8')]()[_0x8972c4('0x14d')](),VisuMZ[_0x8972c4('0x15e')][_0x531e7d[_0x8972c4('0x3dc')]]=_0x531e7d;if(!_0x43abf7[_0x8972c4('0xdb')](_0x531e7d['MapID']))_0x43abf7[_0x8972c4('0x2d')](_0x531e7d[_0x8972c4('0x25a')]);}}for(const _0x2aa2e0 of _0x43abf7){if(VisuMZ['PreloadedMaps'][_0x2aa2e0])continue;const _0x103a22=_0x8972c4('0x1c1')[_0x8972c4('0x296')](_0x2aa2e0[_0x8972c4('0x1b9')](0x3)),_0x30d2dd=_0x8972c4('0x431')[_0x8972c4('0x296')](_0x2aa2e0);DataManager['loadDataFile'](_0x30d2dd,_0x103a22),setTimeout(this[_0x8972c4('0x1e7')]['bind'](this,_0x2aa2e0,_0x30d2dd),0x64);}},Scene_Boot['prototype'][_0x3b3036('0x1e7')]=function(_0x18213a,_0x384f6d){const _0x330861=_0x3b3036;if(window[_0x384f6d]){if(_0x330861('0x100')!==_0x330861('0x100')){function _0x5a29eb(){const _0x43142f=_0x330861;this[_0x43142f('0x19a')]=!![];}}else VisuMZ[_0x330861('0x1cd')][_0x18213a]=window[_0x384f6d],window[_0x384f6d]=undefined;}else setTimeout(this[_0x330861('0x1e7')][_0x330861('0x39d')](this,_0x18213a,_0x384f6d),0x64);},VisuMZ[_0x3b3036('0x19')]=[],VisuMZ[_0x3b3036('0x185')]=[],VisuMZ['AdvancedVariables']=[],VisuMZ[_0x3b3036('0xe3')]=[],Scene_Boot[_0x3b3036('0x1d7')][_0x3b3036('0x132')]=function(){const _0x2775ce=_0x3b3036;for(let _0x56ec28=0x1;_0x56ec28<$dataSystem[_0x2775ce('0x124')]['length'];_0x56ec28++){if(_0x2775ce('0x3b4')==='vznJP'){if($dataSystem[_0x2775ce('0x124')][_0x56ec28][_0x2775ce('0x2f4')](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2775ce('0x19')]['push'](_0x56ec28);if($dataSystem[_0x2775ce('0x124')][_0x56ec28][_0x2775ce('0x2f4')](/<SELF>/i))VisuMZ[_0x2775ce('0x185')][_0x2775ce('0x2d')](_0x56ec28);}else{function _0x4f5d7d(){const _0x20a867=_0x2775ce;if(this[_0x20a867('0x3c7')]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x20a867('0x3a8')](![]))return;if(!this[_0x20a867('0x177')](![]))return;_0x3c5ca4[_0x20a867('0x261')][_0x20a867('0x127')][_0x20a867('0xca')](this);}}}for(let _0x458c39=0x1;_0x458c39<$dataSystem[_0x2775ce('0x37f')]['length'];_0x458c39++){if($dataSystem[_0x2775ce('0x37f')][_0x458c39][_0x2775ce('0x2f4')](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0x2775ce('0x2d')](_0x458c39);if($dataSystem[_0x2775ce('0x37f')][_0x458c39][_0x2775ce('0x2f4')](/<SELF>/i))VisuMZ[_0x2775ce('0xe3')][_0x2775ce('0x2d')](_0x458c39);}},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0xeb')]={},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0xeb')]['initialize']=function(){const _0x1b804a=_0x3b3036;this[_0x1b804a('0x99')]=new Game_CPCInterpreter(),this[_0x1b804a('0x154')]();},VisuMZ['EventsMoveCore'][_0x3b3036('0xeb')]['determineCommonEventsWithCPC']=function(){const _0x18271c=_0x3b3036;this[_0x18271c('0x10')]=[];for(const _0x33972a of $dataCommonEvents){if(!_0x33972a)continue;VisuMZ['EventsMoveCore'][_0x18271c('0xeb')]['loadCPC'](_0x33972a);if(_0x33972a[_0x18271c('0x196')][_0x18271c('0x69')]>0x0)this[_0x18271c('0x10')]['push'](_0x33972a['id']);}},VisuMZ[_0x3b3036('0x261')]['CustomPageConditions'][_0x3b3036('0x2af')]=function(_0xa30584,_0xd4862e){const _0x71268b=_0x3b3036;return this['_interpreter'][_0x71268b('0xf6')](_0xa30584,_0xd4862e),this[_0x71268b('0x99')][_0x71268b('0x380')](),this['_interpreter'][_0x71268b('0x31')];},VisuMZ['EventsMoveCore'][_0x3b3036('0xeb')]['loadCPC']=function(_0x3a8d77){const _0x40b930=_0x3b3036;let _0x46f343=![];_0x3a8d77[_0x40b930('0x196')]=[];for(const _0x2181ce of _0x3a8d77[_0x40b930('0x3fd')]){if(_0x40b930('0x251')!==_0x40b930('0x1be')){if([0x6c,0x198][_0x40b930('0xdb')](_0x2181ce[_0x40b930('0x26f')])){const _0x94b479=_0x2181ce[_0x40b930('0xf7')][0x0];if(_0x94b479[_0x40b930('0x2f4')](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x40b930('0x2c0')!==_0x40b930('0x8'))_0x46f343=!![];else{function _0x21e6ea(){const _0x5b2113=_0x40b930;if(this[_0x5b2113('0x422')]())return;_0x44bd9c['EventsMoveCore']['Game_Event_updateSelfMovement'][_0x5b2113('0xca')](this),this[_0x5b2113('0x129')]()&&_0x751c6d[_0x5b2113('0x198')](this[_0x5b2113('0x2e')]);}}}else{if(_0x94b479[_0x40b930('0x2f4')](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x40b930('0x47')===_0x40b930('0x111')){function _0x15c2ec(){const _0x5e9c16=_0x40b930;if(_0x5a5aa0[_0x5e9c16('0x202')]())return;if(_0x5470b7[_0x5e9c16('0x11b')]())return;let _0x29b6fe=_0x18aade[_0x5e9c16('0x261')][_0x5e9c16('0x239')][_0x5e9c16('0x3af')],_0x4b32d6=_0x19ee29[_0x5e9c16('0xbd')](_0x401922,_0x295ef9);const _0x272314=_0x5e9c16('0x3c0')[_0x5e9c16('0x296')](_0x4b32d6);_0x29b6fe[_0x272314]&&_0x3337aa[_0x5e9c16('0xd')](_0x29b6fe[_0x272314]);}}else _0x46f343=![];}}}_0x46f343&&_0x3a8d77[_0x40b930('0x196')][_0x40b930('0x2d')](_0x2181ce);}else{function _0x395fb5(){const _0x4709bc=_0x40b930,_0x1664d5=_0x4e5931[_0x4709bc('0x391')](_0x1bc615(_0x185310['$1'])/0x64*0xff);return this[_0x4709bc('0x3d0')](_0x1664d5[_0x4709bc('0x208')](0x0,0xff));}}}},getSelfSwitchValue=function(_0x4f9494,_0x207d93,_0x91dcce){const _0x5e1ef7=_0x3b3036;let _0x1f1eb4=[_0x4f9494,_0x207d93,'Self\x20Switch\x20%1'[_0x5e1ef7('0x296')](_0x91dcce)];if(typeof _0x91dcce===_0x5e1ef7('0x38d')){if(_0x5e1ef7('0x1a4')!==_0x5e1ef7('0x1a4')){function _0x7605a0(){return 0x0;}}else _0x1f1eb4=[_0x4f9494,_0x207d93,_0x91dcce['toUpperCase']()[_0x5e1ef7('0x14d')]()];}return $gameSelfSwitches['value'](_0x1f1eb4);},getSelfVariableValue=function(_0x1c56a7,_0x4afb01,_0x16fa6b){const _0x31e88f=_0x3b3036,_0x1a632f=[_0x1c56a7,_0x4afb01,_0x31e88f('0x384')['format'](_0x16fa6b)];return $gameSelfSwitches[_0x31e88f('0x10f')](_0x1a632f);},setSelfSwitchValue=function(_0x2edbbd,_0x57d9b5,_0x4d46a6,_0x3ecd87){const _0x18cc3b=_0x3b3036;let _0x3fd433=[_0x2edbbd,_0x57d9b5,_0x18cc3b('0x108')[_0x18cc3b('0x296')](_0x4d46a6)];typeof _0x4d46a6==='string'&&(_0x3fd433=[_0x2edbbd,_0x57d9b5,_0x4d46a6['toUpperCase']()[_0x18cc3b('0x14d')]()]);},setSelfVariableValue=function(_0x9bc80a,_0x278c24,_0x5d21e1,_0x3d0b4a){const _0x1581d4=_0x3b3036,_0x2d28cd=[_0x9bc80a,_0x278c24,_0x1581d4('0x384')[_0x1581d4('0x296')](_0x5d21e1)];},DataManager[_0x3b3036('0xe5')]=function(_0x25380f){const _0x177fb7=_0x3b3036;if(SceneManager[_0x177fb7('0x103')][_0x177fb7('0x18a')]===Scene_Debug)return![];return VisuMZ[_0x177fb7('0x19')]['includes'](_0x25380f);},DataManager[_0x3b3036('0x358')]=function(_0x2a0e6d){const _0x48d77b=_0x3b3036;if(SceneManager[_0x48d77b('0x103')][_0x48d77b('0x18a')]===Scene_Debug)return![];return VisuMZ[_0x48d77b('0xe9')][_0x48d77b('0xdb')](_0x2a0e6d);},DataManager[_0x3b3036('0x325')]=function(_0x4804c8){const _0x537a44=_0x3b3036;if(SceneManager['_scene'][_0x537a44('0x18a')]===Scene_Debug)return![];return VisuMZ['SelfSwitches'][_0x537a44('0xdb')](_0x4804c8);},DataManager[_0x3b3036('0x126')]=function(_0x75e612){const _0xf99c77=_0x3b3036;if(SceneManager[_0xf99c77('0x103')][_0xf99c77('0x18a')]===Scene_Debug)return![];return VisuMZ[_0xf99c77('0xe3')][_0xf99c77('0xdb')](_0x75e612);},VisuMZ['EventsMoveCore'][_0x3b3036('0xcc')]=Game_Temp[_0x3b3036('0x1d7')]['setDestination'],Game_Temp[_0x3b3036('0x1d7')][_0x3b3036('0x164')]=function(_0x541d1a,_0x41dbc2){const _0x327545=_0x3b3036;if(this[_0x327545('0x3d')](_0x541d1a,_0x41dbc2))return;VisuMZ['EventsMoveCore'][_0x327545('0xcc')][_0x327545('0xca')](this,_0x541d1a,_0x41dbc2);},Game_Temp['prototype']['isEventClickTriggered']=function(_0x3f0683,_0x3cf0f9){const _0x5d189c=_0x3b3036,_0x5eb78f=$gameMap[_0x5d189c('0x419')](_0x3f0683,_0x3cf0f9);for(const _0x311233 of _0x5eb78f){if(_0x5d189c('0x351')===_0x5d189c('0x349')){function _0x508cfa(){const _0x1115dc=_0x5d189c;_0x5b2210+=this[_0x1115dc('0x65')],this[_0x1115dc('0x3d0')](_0x4dd8be['clamp'](0x0,0xff));if(this['_opacity']<0xff)this['_moveRouteIndex']--;}}else{if(_0x311233&&_0x311233[_0x5d189c('0x326')]())return _0x311233[_0x5d189c('0x2f7')](),!![];}}return![];},Game_Temp[_0x3b3036('0x1d7')][_0x3b3036('0x45')]=function(_0x413a74){const _0xa85726=_0x3b3036;this[_0xa85726('0x3b6')]=_0x413a74;},Game_Temp[_0x3b3036('0x1d7')][_0x3b3036('0x13e')]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x3b3036('0x1d7')][_0x3b3036('0x1ab')]=function(_0x5669da){const _0x4e16e3=_0x3b3036;this[_0x4e16e3('0x160')]=_0x5669da;},Game_Temp[_0x3b3036('0x1d7')][_0x3b3036('0x2cc')]=function(){const _0x3548c3=_0x3b3036;this[_0x3548c3('0x160')]=undefined;},Game_Temp[_0x3b3036('0x1d7')][_0x3b3036('0x211')]=function(){const _0x18662c=_0x3b3036;return this[_0x18662c('0x160')];},VisuMZ[_0x3b3036('0x261')]['Game_System_initialize']=Game_System[_0x3b3036('0x1d7')]['initialize'],Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x23a')]=function(){const _0x542530=_0x3b3036;VisuMZ['EventsMoveCore'][_0x542530('0x181')][_0x542530('0xca')](this),this[_0x542530('0x2a')]();},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x2a')]=function(){const _0x3e3958=_0x3b3036;this[_0x3e3958('0x3dd')]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x3e3958('0xda')]={},this[_0x3e3958('0x280')]=[],this[_0x3e3958('0x33c')]={},this[_0x3e3958('0x436')]={},this['_DisablePlayerControl']=![],this[_0x3e3958('0x8d')]=_0x3e3958('0x113');},Game_System['prototype'][_0x3b3036('0x189')]=function(){const _0x5ae059=_0x3b3036;if(this[_0x5ae059('0x3dd')]===undefined)this[_0x5ae059('0x2a')]();if(this[_0x5ae059('0x3dd')][_0x5ae059('0x368')]===undefined)this[_0x5ae059('0x2a')]();return this[_0x5ae059('0x3dd')][_0x5ae059('0x368')];},Game_System['prototype'][_0x3b3036('0x141')]=function(_0x374b1a){const _0x22c022=_0x3b3036;if(this[_0x22c022('0x3dd')]===undefined)this[_0x22c022('0x2a')]();if(this['_EventsMoveCoreSettings'][_0x22c022('0x368')]===undefined)this[_0x22c022('0x2a')]();this['_EventsMoveCoreSettings']['DashingEnable']=_0x374b1a;},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x21c')]=function(){const _0x4852a2=_0x3b3036;if(this[_0x4852a2('0x3dd')]===undefined)this[_0x4852a2('0x2a')]();if(this[_0x4852a2('0x3dd')][_0x4852a2('0x29f')]===undefined)this[_0x4852a2('0x2a')]();return this[_0x4852a2('0x3dd')][_0x4852a2('0x29f')];},Game_System['prototype'][_0x3b3036('0x16e')]=function(_0x132dac){const _0x3e5f31=_0x3b3036;if(this[_0x3e5f31('0x3dd')]===undefined)this[_0x3e5f31('0x2a')]();if(this['_EventsMoveCoreSettings']['EventAutoMovement']===undefined)this[_0x3e5f31('0x2a')]();this[_0x3e5f31('0x3dd')][_0x3e5f31('0x29f')]=_0x132dac;},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x3f2')]=function(){const _0x26b250=_0x3b3036;if(this[_0x26b250('0x3dd')]===undefined)this[_0x26b250('0x2a')]();if(this[_0x26b250('0x3dd')]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();return this['_EventsMoveCoreSettings'][_0x26b250('0x3bb')];},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x336')]=function(_0x364c1e){const _0x236071=_0x3b3036;if(this[_0x236071('0x3dd')]===undefined)this[_0x236071('0x2a')]();if(this[_0x236071('0x3dd')][_0x236071('0x3bb')]===undefined)this[_0x236071('0x2a')]();this[_0x236071('0x3dd')][_0x236071('0x3bb')]=_0x364c1e;},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x13d')]=function(){const _0x5722f8=_0x3b3036;return this[_0x5722f8('0x275')]===undefined&&(this[_0x5722f8('0x275')]=![]),this['_DisablePlayerControl'];},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x23')]=function(_0x21a3b2){const _0x299412=_0x3b3036;this[_0x299412('0x275')]=_0x21a3b2;},Game_System['prototype'][_0x3b3036('0x375')]=function(){const _0x4b1e2c=_0x3b3036;return this[_0x4b1e2c('0x8d')];},Game_System[_0x3b3036('0x1d7')]['setPlayerDiagonalSetting']=function(_0x26b02a){this['_PlayerDiagonalSetting']=String(_0x26b02a)['toLowerCase']()['trim']();},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x1bf')]=function(_0x3917c7){const _0x1c26ee=_0x3b3036;if(this[_0x1c26ee('0xda')]===undefined)this[_0x1c26ee('0x2a')]();if(!_0x3917c7)return null;if(_0x3917c7===$gamePlayer){if(_0x1c26ee('0x311')!==_0x1c26ee('0x311')){function _0x3e51f1(){const _0x77fc33=_0x1c26ee;return _0x1a71fa['getEventIconData']()?_0x2823f5[_0x77fc33('0x1d7')][_0x77fc33('0x1bf')]['call'](this):this[_0x77fc33('0x2dc')];}}else return this[_0x1c26ee('0xda')][_0x1c26ee('0x235')];}else{const _0x5be193=_0x1c26ee('0x209')['format'](_0x3917c7['_mapId'],_0x3917c7[_0x1c26ee('0x2e')]);return this[_0x1c26ee('0xda')][_0x5be193];}},Game_System[_0x3b3036('0x1d7')]['setEventIconData']=function(_0x4de939,_0x41588f,_0x2fc416,_0x35d3a3,_0x4ad22a){const _0x552177=_0x3b3036;if(this[_0x552177('0xda')]===undefined)this[_0x552177('0x2a')]();const _0x1cbd2a=_0x4de939===$gamePlayer?_0x552177('0x235'):_0x552177('0x209')[_0x552177('0x296')](_0x4de939[_0x552177('0x1ce')],_0x4de939[_0x552177('0x2e')]);this['_EventIcons'][_0x1cbd2a]={'iconIndex':_0x41588f,'bufferX':_0x2fc416,'bufferY':_0x35d3a3,'blendMode':_0x4ad22a};},Game_System[_0x3b3036('0x1d7')]['setEventIconDataKey']=function(_0x2f2b3c,_0x283de7,_0xde7c3d,_0x2ed3b0,_0x3be461,_0x46bd95){const _0x3f2de2=_0x3b3036;if(this[_0x3f2de2('0xda')]===undefined)this[_0x3f2de2('0x2a')]();const _0x1ede91=_0x3f2de2('0x209')[_0x3f2de2('0x296')](_0x2f2b3c,_0x283de7);this[_0x3f2de2('0xda')][_0x1ede91]={'iconIndex':_0xde7c3d,'bufferX':_0x2ed3b0,'bufferY':_0x3be461,'blendMode':_0x46bd95};},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x156')]=function(_0x3547b0){const _0x31c100=_0x3b3036;if(this[_0x31c100('0xda')]===undefined)this[_0x31c100('0x2a')]();if(!_0x3547b0)return null;if(_0x3547b0===$gamePlayer){if('hDcUS'!==_0x31c100('0x10c'))delete this[_0x31c100('0xda')][_0x31c100('0x235')];else{function _0x3719b8(){const _0x13ad6e=_0x31c100;return this[_0x13ad6e('0x3e0')][_0x13ad6e('0x26a')];}}}else this[_0x31c100('0x12c')](_0x3547b0['_mapId'],_0x3547b0[_0x31c100('0x2e')]);},Game_System['prototype']['deleteIconsOnEventsDataKey']=function(_0x942028,_0x23b4f2){const _0x2626ac=_0x3b3036;if(this[_0x2626ac('0xda')]===undefined)this[_0x2626ac('0x2a')]();const _0x44a4fc=_0x2626ac('0x209')[_0x2626ac('0x296')](_0x942028,_0x23b4f2);delete this[_0x2626ac('0xda')][_0x44a4fc];},Game_System[_0x3b3036('0x1d7')]['getSavedEventLocation']=function(_0x21f06c){const _0x406c61=_0x3b3036;if(this[_0x406c61('0x436')]===undefined)this[_0x406c61('0x2a')]();if(!_0x21f06c)return null;const _0x2e9124=_0x406c61('0x209')['format'](_0x21f06c[_0x406c61('0x1ce')],_0x21f06c['_eventId']);return this[_0x406c61('0x436')][_0x2e9124];},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x365')]=function(_0xeae342){const _0x186611=_0x3b3036;if(this[_0x186611('0x436')]===undefined)this[_0x186611('0x2a')]();if(!_0xeae342)return;const _0x4209c1='Map%1-Event%2'[_0x186611('0x296')](_0xeae342[_0x186611('0x1ce')],_0xeae342[_0x186611('0x2e')]);this[_0x186611('0x436')][_0x4209c1]={'direction':_0xeae342[_0x186611('0x2ce')](),'x':Math[_0x186611('0x391')](_0xeae342['x']),'y':Math[_0x186611('0x391')](_0xeae342['y']),'pageIndex':_0xeae342[_0x186611('0x35c')],'moveRouteIndex':_0xeae342[_0x186611('0x192')]};},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x1d8')]=function(_0x55105f){const _0x4e580f=_0x3b3036;if(this[_0x4e580f('0x436')]===undefined)this[_0x4e580f('0x2a')]();if(!_0x55105f)return;this[_0x4e580f('0x2bf')](_0x55105f['_mapId'],_0x55105f[_0x4e580f('0x2e')]);},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x2bf')]=function(_0xa817e8,_0x3c30f2){const _0x2cb081=_0x3b3036;if(this[_0x2cb081('0x436')]===undefined)this[_0x2cb081('0x2a')]();const _0x3ecfea=_0x2cb081('0x209')[_0x2cb081('0x296')](_0xa817e8,_0x3c30f2);delete this['_SavedEventLocations'][_0x3ecfea];},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x273')]=function(_0x271ff5,_0x280b08,_0x3ac57e,_0x40d641,_0x35bc44,_0x3c8573,_0x483c80){const _0x4e6df0=_0x3b3036;if(this[_0x4e6df0('0x436')]===undefined)this[_0x4e6df0('0x2a')]();const _0x5119ac=_0x4e6df0('0x209')['format'](_0x271ff5,_0x280b08);this['_SavedEventLocations'][_0x5119ac]={'direction':_0x35bc44,'x':Math[_0x4e6df0('0x391')](_0x3ac57e),'y':Math['round'](_0x40d641),'pageIndex':_0x3c8573,'moveRouteIndex':_0x483c80};},Game_System[_0x3b3036('0x1d7')]['getPreservedMorphEventData']=function(_0x386de8){const _0x3cc8bf=_0x3b3036;if(this[_0x3cc8bf('0x33c')]===undefined)this[_0x3cc8bf('0x2a')]();if(!_0x386de8)return;const _0x4e38a4=_0x3cc8bf('0x209')[_0x3cc8bf('0x296')](_0x386de8['_mapId'],_0x386de8['_eventId']);return this[_0x3cc8bf('0x33c')][_0x4e38a4];},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x1ef')]=function(_0x6219ca,_0x251a39,_0x5cc379,_0x3977bf,_0x5f2991){const _0x3fa6ed=_0x3b3036;if(this[_0x3fa6ed('0x33c')]===undefined)this['initEventsMoveCore']();const _0x54108c='Map%1-Event%2'['format'](_0x6219ca,_0x251a39);this[_0x3fa6ed('0x33c')][_0x54108c]={'template':_0x5cc379,'mapId':_0x3977bf,'eventId':_0x5f2991};},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x3f0')]=function(_0x1a7d2f,_0x42e741){const _0x4636be=_0x3b3036;if(this['_PreservedEventMorphData']===undefined)this[_0x4636be('0x2a')]();const _0x3f1cdc=_0x4636be('0x209')[_0x4636be('0x296')](_0x1a7d2f,_0x42e741);delete this[_0x4636be('0x33c')][_0x3f1cdc];},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x294')]=function(_0x400228){const _0x1af043=_0x3b3036;if(this['_MapSpawnedEventData']===undefined)this[_0x1af043('0x2a')]();return this[_0x1af043('0x280')][_0x400228]=this[_0x1af043('0x280')][_0x400228]||[],this[_0x1af043('0x280')][_0x400228];},Game_System[_0x3b3036('0x1d7')][_0x3b3036('0x32f')]=function(_0x4f3e81){const _0x35b659=_0x3b3036,_0x22b219=this[_0x35b659('0x294')](_0x4f3e81);for(const _0x48ac40 of _0x22b219){if(_0x35b659('0x2a5')===_0x35b659('0x62')){function _0x5af710(){const _0x2b8bd5=_0x35b659;return _0x20514b[_0x2b8bd5('0x261')]['Settings'][_0x2b8bd5('0x245')]['IconSize'];}}else{if(!_0x48ac40)continue;if(_0x48ac40[_0x35b659('0x29a')])continue;const _0x4b12b0=_0x22b219[_0x35b659('0x44')](_0x48ac40);_0x22b219[_0x4b12b0]=null;}}},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x1ff')]=Game_Message[_0x3b3036('0x1d7')][_0x3b3036('0x2c8')],Game_Message[_0x3b3036('0x1d7')][_0x3b3036('0x2c8')]=function(_0x397b3c){const _0xad3e66=_0x3b3036;VisuMZ[_0xad3e66('0x261')][_0xad3e66('0x1ff')][_0xad3e66('0xca')](this,_0x397b3c),this[_0xad3e66('0x229')]=$gameTemp[_0xad3e66('0x211')]();},Game_Message[_0x3b3036('0x1d7')][_0x3b3036('0xf2')]=function(){const _0x417020=_0x3b3036;$gameTemp[_0x417020('0x1ab')](this['_selfEvent']);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x4d')]=Game_Switches['prototype'][_0x3b3036('0x10f')],Game_Switches[_0x3b3036('0x1d7')]['value']=function(_0x38a301){const _0x515d87=_0x3b3036;if(DataManager[_0x515d87('0xe5')](_0x38a301))return!!this[_0x515d87('0x293')](_0x38a301);else return DataManager[_0x515d87('0x325')](_0x38a301)?!!this[_0x515d87('0x292')](_0x38a301):VisuMZ[_0x515d87('0x261')][_0x515d87('0x4d')]['call'](this,_0x38a301);},Game_Switches[_0x3b3036('0x3b0')]={},Game_Switches[_0x3b3036('0x1d7')][_0x3b3036('0x293')]=function(_0x2288a6){const _0x5a048b=_0x3b3036;if(!Game_Switches[_0x5a048b('0x3b0')][_0x2288a6]){$dataSystem[_0x5a048b('0x124')][_0x2288a6][_0x5a048b('0x2f4')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x15c5ac=_0x5a048b('0xa6')[_0x5a048b('0x296')](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x2288a6]=new Function(_0x5a048b('0x118'),_0x15c5ac);}const _0x2decff=$gameTemp[_0x5a048b('0x211')]()||this;return Game_Switches['advancedFunc'][_0x2288a6]['call'](_0x2decff,_0x2288a6);},Game_Switches[_0x3b3036('0x1d7')][_0x3b3036('0x292')]=function(_0x33730d){const _0x44e9e9=_0x3b3036,_0x29dab5=$gameTemp[_0x44e9e9('0x211')]()||this;if(_0x29dab5[_0x44e9e9('0x18a')]!==Game_Event){if('ePcdL'===_0x44e9e9('0x1e0'))return VisuMZ[_0x44e9e9('0x261')][_0x44e9e9('0x4d')]['call'](this,_0x33730d);else{function _0x28cbc0(){const _0x3e7fda=_0x44e9e9;return _0x70da9a['EventsMoveCore'][_0x3e7fda('0x4d')][_0x3e7fda('0xca')](this,_0x864e1e);}}}else{if('TBBeW'===_0x44e9e9('0x278')){function _0x16b8c0(){const _0x4f70a1=_0x44e9e9;this[_0x4f70a1('0x1db')]=!![],this['setPattern'](_0x5fea3c);}}else{const _0x581957=[_0x29dab5[_0x44e9e9('0x1ce')],_0x29dab5[_0x44e9e9('0x2e')],_0x44e9e9('0x108')[_0x44e9e9('0x296')](_0x33730d)];return $gameSelfSwitches[_0x44e9e9('0x10f')](_0x581957);}}},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0xc0')]=Game_Switches[_0x3b3036('0x1d7')][_0x3b3036('0x3c1')],Game_Switches[_0x3b3036('0x1d7')]['setValue']=function(_0x398b15,_0x6895fe){const _0x5e8ba8=_0x3b3036;DataManager[_0x5e8ba8('0x325')](_0x398b15)?this[_0x5e8ba8('0x168')](_0x398b15,_0x6895fe):VisuMZ[_0x5e8ba8('0x261')]['Game_Switches_setValue'][_0x5e8ba8('0xca')](this,_0x398b15,_0x6895fe);},Game_Switches['prototype'][_0x3b3036('0x168')]=function(_0x3d21d6,_0x424ef6){const _0x1d14b3=_0x3b3036,_0x387241=$gameTemp[_0x1d14b3('0x211')]()||this;if(_0x387241[_0x1d14b3('0x18a')]!==Game_Event)VisuMZ[_0x1d14b3('0x261')][_0x1d14b3('0xc0')][_0x1d14b3('0xca')](this,_0x3d21d6,_0x424ef6);else{if('dJbSd'!==_0x1d14b3('0x377')){const _0x4651e2=[_0x387241['_mapId'],_0x387241['_eventId'],_0x1d14b3('0x108')[_0x1d14b3('0x296')](_0x3d21d6)];$gameSelfSwitches[_0x1d14b3('0x3c1')](_0x4651e2,_0x424ef6);}else{function _0x105e31(){const _0x149841=_0x1d14b3;return this[_0x149841('0x99')]['setup'](_0x177cd8,_0x4365e6),this[_0x149841('0x99')][_0x149841('0x380')](),this[_0x149841('0x99')]['_cpc'];}}}},VisuMZ['EventsMoveCore'][_0x3b3036('0x1b0')]=Game_Variables[_0x3b3036('0x1d7')]['value'],Game_Variables[_0x3b3036('0x1d7')][_0x3b3036('0x10f')]=function(_0x2601f0){const _0x29bcde=_0x3b3036;if(DataManager[_0x29bcde('0x358')](_0x2601f0))return this[_0x29bcde('0x293')](_0x2601f0);else return DataManager[_0x29bcde('0x126')](_0x2601f0)?this['selfValue'](_0x2601f0):VisuMZ[_0x29bcde('0x261')][_0x29bcde('0x1b0')][_0x29bcde('0xca')](this,_0x2601f0);},Game_Variables[_0x3b3036('0x3b0')]={},Game_Variables[_0x3b3036('0x1d7')]['advancedValue']=function(_0x218320){const _0x4c8f5e=_0x3b3036;if(!Game_Variables[_0x4c8f5e('0x3b0')][_0x218320]){if(_0x4c8f5e('0xd5')===_0x4c8f5e('0x13b')){function _0x5ae4f4(){const _0x351629=_0x4c8f5e;let _0x24b108=_0x260cfb['EventsMoveCore'][_0x351629('0x239')][_0x351629('0x257')]['FavorHorz']?_0x5f19fd:_0x3fdbb1;return this[_0x351629('0x382')](_0x24b108);}}else{$dataSystem[_0x4c8f5e('0x37f')][_0x218320][_0x4c8f5e('0x2f4')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x29a5d2=_0x4c8f5e('0xa6')[_0x4c8f5e('0x296')](String(RegExp['$1']));Game_Variables[_0x4c8f5e('0x3b0')][_0x218320]=new Function(_0x4c8f5e('0x1dd'),_0x29a5d2);}}const _0x32dc54=$gameTemp[_0x4c8f5e('0x211')]()||this;return Game_Variables['advancedFunc'][_0x218320][_0x4c8f5e('0xca')](_0x32dc54,_0x218320);},Game_Variables['prototype'][_0x3b3036('0x292')]=function(_0x42bb14){const _0xb61aef=_0x3b3036,_0x52078c=$gameTemp['getSelfTarget']()||this;if(_0x52078c[_0xb61aef('0x18a')]!==Game_Event){if(_0xb61aef('0x123')!==_0xb61aef('0x3b5'))return VisuMZ['EventsMoveCore']['Game_Variables_value']['call'](this,_0x42bb14);else{function _0x571321(){const _0x430e43=_0xb61aef;return _0x2dcc54[_0x430e43('0x261')]['Game_Map_event']['call'](this,_0x552c35);}}}else{const _0x46ee22=[_0x52078c[_0xb61aef('0x1ce')],_0x52078c[_0xb61aef('0x2e')],_0xb61aef('0x384')[_0xb61aef('0x296')](_0x42bb14)];return $gameSelfSwitches['value'](_0x46ee22);}},VisuMZ[_0x3b3036('0x261')]['Game_Variables_setValue']=Game_Variables[_0x3b3036('0x1d7')][_0x3b3036('0x3c1')],Game_Variables[_0x3b3036('0x1d7')][_0x3b3036('0x3c1')]=function(_0x50cc47,_0x28eaec){const _0x456aef=_0x3b3036;DataManager['isSelfVariable'](_0x50cc47)?this['setSelfValue'](_0x50cc47,_0x28eaec):VisuMZ[_0x456aef('0x261')]['Game_Variables_setValue'][_0x456aef('0xca')](this,_0x50cc47,_0x28eaec);},Game_Variables[_0x3b3036('0x1d7')][_0x3b3036('0x168')]=function(_0x20b87a,_0x75b6a0){const _0x562b06=_0x3b3036,_0x1ab560=$gameTemp[_0x562b06('0x211')]()||this;if(_0x1ab560[_0x562b06('0x18a')]!==Game_Event)VisuMZ['EventsMoveCore']['Game_Variables_setValue']['call'](this,_0x20b87a,_0x75b6a0);else{const _0x434311=[_0x1ab560[_0x562b06('0x1ce')],_0x1ab560[_0x562b06('0x2e')],_0x562b06('0x384')['format'](_0x20b87a)];$gameSelfSwitches['setValue'](_0x434311,_0x75b6a0);}},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x2df')]=Game_SelfSwitches[_0x3b3036('0x1d7')]['value'],Game_SelfSwitches[_0x3b3036('0x1d7')]['value']=function(_0x53a8a7){const _0x17b014=_0x3b3036;if(_0x53a8a7[0x2][_0x17b014('0x2f4')](/SELF/i)){if(_0x17b014('0x37')!==_0x17b014('0x37')){function _0x5a3be0(){const _0x3f6a68=_0x17b014;return this[_0x3f6a68('0x2cd')](_0x2654bb);}}else return this[_0x17b014('0x292')](_0x53a8a7);}else{return VisuMZ['EventsMoveCore']['Game_SelfSwitches_value'][_0x17b014('0xca')](this,_0x53a8a7);;}},Game_SelfSwitches[_0x3b3036('0x1d7')][_0x3b3036('0x292')]=function(_0x34685c){const _0x23df30=_0x3b3036;return _0x34685c[0x2][_0x23df30('0x2f4')](/VAR/i)?this['_data'][_0x34685c]||0x0:!!this[_0x23df30('0x1af')][_0x34685c];},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x3ec')]=Game_SelfSwitches['prototype'][_0x3b3036('0x3c1')],Game_SelfSwitches[_0x3b3036('0x1d7')][_0x3b3036('0x3c1')]=function(_0x852d58,_0x5a8496){const _0x5ac550=_0x3b3036;_0x852d58[0x2][_0x5ac550('0x2f4')](/SELF/i)?this[_0x5ac550('0x168')](_0x852d58,_0x5a8496):VisuMZ[_0x5ac550('0x261')][_0x5ac550('0x3ec')][_0x5ac550('0xca')](this,_0x852d58,_0x5a8496);},Game_SelfSwitches['prototype'][_0x3b3036('0x168')]=function(_0x8d8bbb,_0x7654a7){const _0x12a0cf=_0x3b3036;this[_0x12a0cf('0x1af')][_0x8d8bbb]=_0x8d8bbb[0x2][_0x12a0cf('0x2f4')](/VAR/i)?_0x7654a7:!!_0x7654a7,this[_0x12a0cf('0x2fa')]();},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x246')]=Game_Enemy[_0x3b3036('0x1d7')][_0x3b3036('0x3bc')],Game_Enemy[_0x3b3036('0x1d7')][_0x3b3036('0x3bc')]=function(_0x5e98be){const _0xd746da=_0x3b3036;$gameTemp[_0xd746da('0x1ab')](this);const _0x119fe2=VisuMZ[_0xd746da('0x261')][_0xd746da('0x246')]['call'](this,_0x5e98be);return $gameTemp[_0xd746da('0x2cc')](),_0x119fe2;},VisuMZ[_0x3b3036('0x261')]['Game_Troop_meetsConditions']=Game_Troop[_0x3b3036('0x1d7')][_0x3b3036('0x435')],Game_Troop[_0x3b3036('0x1d7')]['meetsConditions']=function(_0x30ceb3){const _0x25575b=_0x3b3036;$gameTemp['registerSelfTarget'](this);const _0x376bdf=VisuMZ[_0x25575b('0x261')]['Game_Troop_meetsConditions'][_0x25575b('0xca')](this,_0x30ceb3);return $gameTemp[_0x25575b('0x2cc')](),_0x376bdf;},VisuMZ[_0x3b3036('0x261')]['Game_Map_setup']=Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0xf6')],Game_Map[_0x3b3036('0x1d7')]['setup']=function(_0x298f19){const _0x1abbb8=_0x3b3036;this['removeTemporaryMapSpawnedEvents'](_0x298f19),this[_0x1abbb8('0x318')](),VisuMZ[_0x1abbb8('0x261')][_0x1abbb8('0x18e')]['call'](this,_0x298f19),this[_0x1abbb8('0x318')](),this[_0x1abbb8('0x162')](),this['setupRegionRestrictions'](),this[_0x1abbb8('0x1bd')](),this[_0x1abbb8('0x58')](),this[_0x1abbb8('0x318')]();},VisuMZ['EventsMoveCore'][_0x3b3036('0x2ab')]=Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x1ae')],Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x1ae')]=function(){const _0x2c0d1c=_0x3b3036;VisuMZ['EventsMoveCore'][_0x2c0d1c('0x2ab')][_0x2c0d1c('0xca')](this),this[_0x2c0d1c('0x248')]();},Game_Map[_0x3b3036('0x234')]=0xc8,Game_Map[_0x3b3036('0x1d7')]['determineEventOverload']=function(){const _0x476368=_0x3b3036,_0x311a2e=Game_Map[_0x476368('0x234')];this[_0x476368('0x332')]=this[_0x476368('0x33')]()[_0x476368('0x69')]>_0x311a2e;if(this[_0x476368('0x332')]&&$gameTemp['isPlaytest']()){}},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x19b')]=function(){const _0x322146=_0x3b3036;return this[_0x322146('0x332')];},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x318')]=function(){this['_eventCache']=undefined;},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x162')]=function(){const _0x11e8cd=_0x3b3036;this[_0x11e8cd('0x133')]=VisuMZ[_0x11e8cd('0x261')][_0x11e8cd('0x239')]['Movement'][_0x11e8cd('0x215')];const _0x4f2d96=$dataMap[_0x11e8cd('0x28a')]||'';if(_0x4f2d96['match'](/<DIAGONAL MOVEMENT: ON>/i))this[_0x11e8cd('0x133')]=!![];else _0x4f2d96['match'](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x11e8cd('0x133')]=![]);},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x25e')]=function(){const _0xc2ee94=_0x3b3036,_0x39fc87=$gameSystem['getPlayerDiagonalSetting']();if(_0x39fc87===_0xc2ee94('0x23e'))return!![];if(_0x39fc87===_0xc2ee94('0x364'))return![];if(this[_0xc2ee94('0x133')]===undefined)this[_0xc2ee94('0x162')]();return this[_0xc2ee94('0x133')];},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x421')]=function(_0x43c550,_0x275bbd){const _0x1f2597=_0x3b3036;if([0x1,0x4,0x7]['includes'](_0x275bbd))_0x43c550-=0x1;if([0x3,0x6,0x9][_0x1f2597('0xdb')](_0x275bbd))_0x43c550+=0x1;return this[_0x1f2597('0x27')](_0x43c550);},Game_Map['prototype']['roundYWithDirection']=function(_0x41070b,_0x28ac84){const _0x51148d=_0x3b3036;if([0x1,0x2,0x3]['includes'](_0x28ac84))_0x41070b+=0x1;if([0x7,0x8,0x9][_0x51148d('0xdb')](_0x28ac84))_0x41070b-=0x1;return this['roundY'](_0x41070b);},Game_Map[_0x3b3036('0x1d7')]['absDistance']=function(_0xd41384,_0x1dd3cf,_0x54b06b,_0x780a42){const _0x5c58fb=_0x3b3036;return Math[_0x5c58fb('0x9b')](Math[_0x5c58fb('0x1b3')](this[_0x5c58fb('0x3e3')](_0xd41384,_0x54b06b)),Math[_0x5c58fb('0x1b3')](this['deltaY'](_0x1dd3cf,_0x780a42)));},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x2c1')]=function(){const _0x56a7af=_0x3b3036,_0x240ebb=VisuMZ[_0x56a7af('0x261')][_0x56a7af('0x239')][_0x56a7af('0x135')],_0x1c593b={},_0x28f9dd=[_0x56a7af('0x433'),_0x56a7af('0x2ec'),_0x56a7af('0x178')],_0xfc098f=[_0x56a7af('0x350'),'Walk',_0x56a7af('0x235'),_0x56a7af('0x2e5'),_0x56a7af('0x3ac'),_0x56a7af('0x1bb'),_0x56a7af('0x2c'),_0x56a7af('0x3ce')];for(const _0x413c56 of _0x28f9dd){if(_0x56a7af('0xd3')!=='tpSqG')for(const _0x10adb6 of _0xfc098f){const _0xa7f154=_0x56a7af('0x1a7')[_0x56a7af('0x296')](_0x10adb6,_0x413c56);_0x240ebb[_0xa7f154]&&(_0x1c593b[_0xa7f154]=_0x240ebb[_0xa7f154][_0x56a7af('0x2e6')](0x0));}else{function _0x364c16(){const _0x5e0294=_0x56a7af;return _0x5c6187[_0x5e0294('0x261')][_0x5e0294('0x134')][_0x5e0294('0xca')](this);}}}const _0x31042e=$dataMap[_0x56a7af('0x28a')]||'',_0x29f43b=_0x31042e[_0x56a7af('0x2f4')](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x29f43b)for(const _0x143479 of _0x29f43b){_0x143479[_0x56a7af('0x2f4')](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x17bb04=String(RegExp['$1'])[_0x56a7af('0x151')]()['trim'](),_0x267d29=String(RegExp['$2'])[_0x56a7af('0x151')]()[_0x56a7af('0x14d')]();const _0x2b3442=JSON['parse']('['+RegExp['$3'][_0x56a7af('0x2f4')](/\d+/g)+']');_0x17bb04=_0x17bb04[_0x56a7af('0x70')](0x0)[_0x56a7af('0x1f8')]()+_0x17bb04[_0x56a7af('0x2e6')](0x1),_0x267d29=_0x267d29[_0x56a7af('0x70')](0x0)[_0x56a7af('0x1f8')]()+_0x267d29[_0x56a7af('0x2e6')](0x1);const _0x118cab=_0x56a7af('0x1a7')['format'](_0x17bb04,_0x267d29);if(_0x1c593b[_0x118cab])_0x1c593b[_0x118cab]=_0x1c593b[_0x118cab][_0x56a7af('0x9')](_0x2b3442);}this[_0x56a7af('0x2b9')]=_0x1c593b;},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x24c')]=function(_0x58ee5c,_0x6d3d42,_0x8ecb9a,_0x1780eb){const _0x895d05=_0x3b3036,_0x310278=this[_0x895d05('0x421')](_0x58ee5c,_0x8ecb9a),_0x2ef64a=this[_0x895d05('0xc9')](_0x6d3d42,_0x8ecb9a),_0x5d1892=this[_0x895d05('0xbd')](_0x310278,_0x2ef64a),_0x37bd6a=this['_regionRules'];if(_0x37bd6a[_0x895d05('0x2b0')][_0x895d05('0xdb')](_0x5d1892)){if(_0x895d05('0x139')===_0x895d05('0x1cc')){function _0x46f3e1(){const _0x33e9fa=_0x895d05;_0x43d985[_0x33e9fa('0xbc')](_0x196b85,_0x8546);const _0x1e9852={'template':_0x4214dd[_0x33e9fa('0x25b')],'mapId':_0x34d72e[_0x33e9fa('0x2f8')],'eventId':_0x121e9a[_0x33e9fa('0x2d0')],'x':-0x1,'y':-0x1,'spawnPreserved':_0x5de5d0[_0x33e9fa('0x1de')],'spawnEventId':_0x873197[_0x33e9fa('0x180')][_0x33e9fa('0x69')]+0x3e8};_0x231e67[_0x33e9fa('0x2b4')](_0x1e9852,_0x4b52e7['Region'],_0x1a66ea[_0x33e9fa('0x3e5')],_0x3f6220[_0x33e9fa('0x2a9')]);}}else return!![];}else{if(_0x1780eb===_0x895d05('0x27c')){if('sHDSW'!==_0x895d05('0x2de')){function _0x79f5b2(){const _0x1fb415=_0x895d05;_0x529837[_0x1fb415('0x1d7')][_0x1fb415('0x22e')]['call'](this),this[_0x1fb415('0x254')]();}}else return _0x37bd6a[_0x895d05('0x21b')][_0x895d05('0xdb')](_0x5d1892)||_0x37bd6a[_0x895d05('0x3a0')][_0x895d05('0xdb')](_0x5d1892);}else{if(_0x1780eb===_0x895d05('0x414')){if('onJyn'!==_0x895d05('0x4c')){function _0x149885(){const _0xd22363=_0x895d05;this[_0xd22363('0x264')][_0xd22363('0x43')]=0x0;}}else return _0x37bd6a['EventAllow']['includes'](_0x5d1892)||_0x37bd6a['WalkAllow'][_0x895d05('0xdb')](_0x5d1892);}else{if(_0x37bd6a[_0x895d05('0x3c5')]['includes'](_0x5d1892)){if(_0x895d05('0xf5')===_0x895d05('0x284')){function _0x46d7f1(){const _0x2d37bc=_0x895d05;return this[_0x2d37bc('0xd1')][_0x2d37bc('0x120')];}}else return!![];}else{const _0x57ef0b=_0x895d05('0x3cc')['format'](_0x1780eb[_0x895d05('0x70')](0x0)['toUpperCase']()+_0x1780eb['slice'](0x1));if(_0x37bd6a[_0x57ef0b])return _0x37bd6a[_0x57ef0b]['includes'](_0x5d1892);}}}}return![];},Game_Map[_0x3b3036('0x1d7')]['isRegionForbidPass']=function(_0x2acf3c,_0x3af471,_0x377465,_0x4a869c){const _0x449c26=_0x3b3036,_0x2a7153=this['roundXWithDirection'](_0x2acf3c,_0x377465),_0x1f80e4=this[_0x449c26('0xc9')](_0x3af471,_0x377465),_0x256e35=this['regionId'](_0x2a7153,_0x1f80e4),_0x3eed51=this[_0x449c26('0x2b9')];if(_0x3eed51[_0x449c26('0x22b')][_0x449c26('0xdb')](_0x256e35))return!![];else{if(_0x4a869c===_0x449c26('0x27c'))return _0x3eed51[_0x449c26('0x327')][_0x449c26('0xdb')](_0x256e35)||_0x3eed51[_0x449c26('0x354')][_0x449c26('0xdb')](_0x256e35);else{if(_0x4a869c===_0x449c26('0x414'))return _0x3eed51[_0x449c26('0x30f')][_0x449c26('0xdb')](_0x256e35)||_0x3eed51[_0x449c26('0x354')][_0x449c26('0xdb')](_0x256e35);else{if(_0x3eed51['VehicleForbid'][_0x449c26('0xdb')](_0x256e35))return!![];else{const _0x397743='%1Forbid'[_0x449c26('0x296')](_0x4a869c['charAt'](0x0)[_0x449c26('0x1f8')]()+_0x4a869c[_0x449c26('0x2e6')](0x1));if(_0x3eed51[_0x397743])return _0x3eed51[_0x397743][_0x449c26('0xdb')](_0x256e35);}}}}return![];},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x340')]=function(_0x3f4d2b,_0x35bb17,_0x208b36,_0x4ea5ba){const _0x47b0a0=_0x3b3036;_0x208b36=_0x4ea5ba==='airship'?0x5:_0x208b36;const _0x31c17e=this[_0x47b0a0('0x421')](_0x3f4d2b,_0x208b36),_0x3ada10=this['roundYWithDirection'](_0x35bb17,_0x208b36),_0x342dd2=this[_0x47b0a0('0xbd')](_0x31c17e,_0x3ada10),_0x6a7a32=this[_0x47b0a0('0x2b9')];if(_0x6a7a32[_0x47b0a0('0xab')][_0x47b0a0('0xdb')](_0x342dd2)){if(_0x47b0a0('0x30b')===_0x47b0a0('0x30b'))return!![];else{function _0x5f2b40(){const _0x540539=_0x47b0a0;_0x2c7af0[_0x540539('0x261')][_0x540539('0x181')][_0x540539('0xca')](this),this['initEventsMoveCore']();}}}else{if(_0x47b0a0('0x394')!==_0x47b0a0('0x394')){function _0x3c3d58(){const _0x18c923=_0x47b0a0,_0x552f2a=this[_0x18c923('0x7')]();return _0x552f2a?_0x552f2a[_0x18c923('0x2e')]:0x0;}}else{const _0x358d87=_0x47b0a0('0x3c3')[_0x47b0a0('0x296')](_0x4ea5ba[_0x47b0a0('0x70')](0x0)[_0x47b0a0('0x1f8')]()+_0x4ea5ba[_0x47b0a0('0x2e6')](0x1));if(_0x6a7a32[_0x358d87])return _0x6a7a32[_0x358d87][_0x47b0a0('0xdb')](_0x342dd2);}}return![];},VisuMZ['EventsMoveCore'][_0x3b3036('0x1da')]=Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x1b8')],Game_Map[_0x3b3036('0x1d7')]['refresh']=function(){const _0x4ad601=_0x3b3036;VisuMZ[_0x4ad601('0x261')][_0x4ad601('0x1da')][_0x4ad601('0xca')](this),this[_0x4ad601('0x270')]();},Game_Map['prototype']['checkNeedForPeriodicRefresh']=function(){const _0x106013=_0x3b3036;this[_0x106013('0x407')]=![];if(this[_0x106013('0x33')]()[_0x106013('0x3b1')](_0x1a9436=>_0x1a9436[_0x106013('0x16')]())){if(_0x106013('0x329')===_0x106013('0x329')){this[_0x106013('0x407')]=!![];return;}else{function _0xcf75f6(){const _0x2f6858=_0x106013,_0x5c828e=this[_0x2f6858('0x414')]();return this[_0x2f6858('0x18')]()&&_0x5c828e[_0x2f6858('0xc2')]>=0x1&&_0xe98dc8[_0x2f6858('0xe5')](_0x5c828e[_0x2f6858('0x118')]);}}}if(this[_0x106013('0x33')]()[_0x106013('0x3b1')](_0x59a8bd=>_0x59a8bd[_0x106013('0x143')]())){if(_0x106013('0x15')!==_0x106013('0x1aa')){this[_0x106013('0x407')]=!![];return;}else{function _0x19e12a(){const _0x55f7b8=_0x106013;_0x40e7cd[_0x55f7b8('0x1ab')](this);const _0x40b842=_0x57e5a6[_0x55f7b8('0x261')][_0x55f7b8('0x246')][_0x55f7b8('0xca')](this,_0x33ee8d);return _0x581a24[_0x55f7b8('0x2cc')](),_0x40b842;}}}if(this[_0x106013('0x10')]['some'](_0x31058c=>_0x31058c['hasAdvancedSwitchVariable']())){if(_0x106013('0x161')==='IMKXK'){function _0x2d6207(){const _0x5beff8=_0x106013;this[_0x5beff8('0x305')]();}}else{this['_needsPeriodicRefresh']=!![];return;}}if(this[_0x106013('0x10')][_0x106013('0x3b1')](_0x48af33=>_0x48af33[_0x106013('0x143')]())){if(_0x106013('0x131')===_0x106013('0x3bf')){function _0xefd7(){const _0x15fae0=_0x106013;this[_0x15fae0('0x407')]=!![];return;}}else{this[_0x106013('0x407')]=!![];return;}}},VisuMZ['EventsMoveCore'][_0x3b3036('0x1c2')]=Game_Map[_0x3b3036('0x1d7')]['update'],Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x31d')]=function(_0x98ecbf){const _0x44b411=_0x3b3036;this[_0x44b411('0x244')](),VisuMZ[_0x44b411('0x261')][_0x44b411('0x1c2')]['call'](this,_0x98ecbf);},Game_Map['prototype'][_0x3b3036('0x244')]=function(){const _0x479e38=_0x3b3036;if(!this[_0x479e38('0x407')])return;this[_0x479e38('0x213')]=this['_periodicRefreshTimer']||0x3c,this[_0x479e38('0x213')]--,this[_0x479e38('0x213')]<=0x0&&(this[_0x479e38('0x2a6')](),this[_0x479e38('0x213')]=0x3c);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0xaa')]=Game_Map[_0x3b3036('0x1d7')]['isDashDisabled'],Game_Map['prototype'][_0x3b3036('0x3da')]=function(){const _0x2ecec5=_0x3b3036;if(!$gameSystem[_0x2ecec5('0x189')]())return!![];return VisuMZ[_0x2ecec5('0x261')]['Game_Map_isDashDisabled'][_0x2ecec5('0xca')](this);},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x1bd')]=function(){const _0x5e8c85=_0x3b3036;this['_saveEventLocations']=![];const _0xa8f53e=$dataMap['note']||'';if(_0xa8f53e['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x5e8c85('0x338')!=='xQCsT')this[_0x5e8c85('0xb9')]=!![];else{function _0x28fd56(){const _0x148204=_0x5e8c85,_0x1e457d=this[_0x148204('0x65')]+_0x1be558[_0x148204('0x391')](_0x48b68d(_0x245e62['$1'])/0x64*0xff);return this[_0x148204('0x3d0')](_0x1e457d[_0x148204('0x208')](0x0,0xff));}}}},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0xb5')]=function(){const _0x52dc8f=_0x3b3036;if(this[_0x52dc8f('0xb9')]===undefined)this[_0x52dc8f('0x1bd')]();return this[_0x52dc8f('0xb9')];},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x32f')]=function(_0xd0181e){const _0x44c57d=_0x3b3036;_0xd0181e!==this[_0x44c57d('0x39f')]()&&$gamePlayer&&$gameSystem[_0x44c57d('0x32f')](this[_0x44c57d('0x39f')]());},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x58')]=function(){const _0x1f15ae=_0x3b3036;this[_0x1f15ae('0x180')]=$gameSystem[_0x1f15ae('0x294')](this[_0x1f15ae('0x39f')]()),this['_needsRefresh']=!![];},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x2ba')]=Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x33')],Game_Map[_0x3b3036('0x1d7')]['events']=function(){const _0x3bffeb=_0x3b3036;if(this[_0x3bffeb('0xa3')])return this['_eventCache'];const _0xa69a22=VisuMZ['EventsMoveCore']['Game_Map_events'][_0x3bffeb('0xca')](this),_0x36bd5e=_0xa69a22[_0x3bffeb('0x9')](this[_0x3bffeb('0x180')]||[]);return this[_0x3bffeb('0xa3')]=_0x36bd5e[_0x3bffeb('0x279')](_0x5613c5=>!!_0x5613c5),this[_0x3bffeb('0xa3')];},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x2dd')]=Game_Map[_0x3b3036('0x1d7')]['event'],Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x414')]=function(_0xa69e54){const _0x58e9ba=_0x3b3036;if(_0xa69e54>=0x3e8){if(_0x58e9ba('0x3a6')===_0x58e9ba('0x3a6'))return _0xa69e54-=0x3e8,this[_0x58e9ba('0x180')][_0xa69e54];else{function _0x3ddeee(){const _0x2ff1c7=_0x58e9ba;return this[_0x2ff1c7('0x3e')]()&&_0x5caa93[_0x2ff1c7('0x261')][_0x2ff1c7('0x239')]['VS8']['AutoBuffer'];}}}else return VisuMZ[_0x58e9ba('0x261')][_0x58e9ba('0x2dd')][_0x58e9ba('0xca')](this,_0xa69e54);},Game_Map[_0x3b3036('0x1d7')]['eraseEvent']=function(_0x3b33f0){const _0x1efac1=_0x3b3036,_0x566254=this[_0x1efac1('0x414')](_0x3b33f0);if(_0x566254)_0x566254[_0x1efac1('0x11e')]();},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x122')]=function(){const _0x259068=_0x3b3036,_0x2fffad={'template':_0x259068('0x217'),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x259068('0x180')][_0x259068('0x69')]+0x3e8};this[_0x259068('0x9c')](_0x2fffad);},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x9c')]=function(_0x1c7f6f){const _0x3a2e4b=_0x3b3036;$gameTemp[_0x3a2e4b('0x2e4')]=_0x1c7f6f;const _0x582107=new Game_Event(_0x1c7f6f['mapId'],_0x1c7f6f[_0x3a2e4b('0x23c')]);$gameTemp[_0x3a2e4b('0x2e4')]=undefined,this[_0x3a2e4b('0x180')]['push'](_0x582107),_0x582107['setupSpawn'](_0x1c7f6f),this[_0x3a2e4b('0x318')]();},Game_Map['prototype'][_0x3b3036('0x11f')]=function(_0x3966fc,_0x12b7ba,_0x53604b){const _0x15409a=_0x3b3036,_0x54984a=_0x3966fc['x'],_0x5789ca=_0x3966fc['y'];if(!this[_0x15409a('0x372')](_0x54984a,_0x5789ca))return;if(_0x12b7ba){if(_0x15409a('0x29b')===_0x15409a('0x41a')){function _0x165a5c(){const _0x676132=_0x15409a;return this[_0x676132('0x23b')](_0x195d0a(_0x5e1dc6['$1']));}}else{if(this[_0x15409a('0x419')](_0x54984a,_0x5789ca)[_0x15409a('0x69')]>0x0)return;if($gamePlayer['x']===_0x54984a&&$gamePlayer['y']===_0x5789ca)return;if(this[_0x15409a('0x14')]()[_0x15409a('0x335')](_0x54984a,_0x5789ca))return;if(this[_0x15409a('0x16f')]()['posNt'](_0x54984a,_0x5789ca))return;}}if(_0x53604b){if(!this['isPassableByAnyDirection'](_0x54984a,_0x5789ca))return;}this[_0x15409a('0x9c')](_0x3966fc);},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x2b4')]=function(_0x20e9c8,_0x40afbd,_0x1aeab6,_0x6f7115){const _0x4905ec=_0x3b3036,_0x3e8334=[],_0x151735=this[_0x4905ec('0x42')](),_0x45a800=this[_0x4905ec('0x33b')]();for(let _0x26377f=0x0;_0x26377f<_0x151735;_0x26377f++){for(let _0x53de4f=0x0;_0x53de4f<_0x45a800;_0x53de4f++){if(!_0x40afbd[_0x4905ec('0xdb')](this[_0x4905ec('0xbd')](_0x26377f,_0x53de4f)))continue;if(!this['isValid'](_0x26377f,_0x53de4f))continue;if(_0x1aeab6){if(_0x4905ec('0x1d5')!==_0x4905ec('0x1d5')){function _0x27a9a9(){const _0x4e906a=_0x4905ec,_0x2abbd0=_0x568ef8['eventsXy'](_0x334e36,_0x2738c1);for(const _0x15e4d0 of _0x2abbd0){if(_0x15e4d0&&_0x15e4d0[_0x4e906a('0x326')]())return _0x15e4d0['onClickTrigger'](),!![];}return![];}}else{if(this[_0x4905ec('0x419')](_0x26377f,_0x53de4f)[_0x4905ec('0x69')]>0x0)continue;if($gamePlayer['x']===_0x26377f&&$gamePlayer['y']===_0x53de4f)continue;if(this['boat']()[_0x4905ec('0x335')](_0x26377f,_0x53de4f))continue;if(this['ship']()[_0x4905ec('0x335')](_0x26377f,_0x53de4f))continue;}}if(_0x6f7115){if('DEdBS'==='lIxhq'){function _0x1444ac(){const _0x5c630e=_0x4905ec;this[_0x5c630e('0x2ea')]=!![];}}else{if(!this[_0x4905ec('0x146')](_0x26377f,_0x53de4f))continue;}}_0x3e8334['push']([_0x26377f,_0x53de4f]);}}if(_0x3e8334[_0x4905ec('0x69')]>0x0){if('RSHNs'!==_0x4905ec('0x4')){function _0x57db4e(){const _0x28df7e=_0x4905ec;return this[_0x28df7e('0x24f')](_0x5d7e92['$1'],_0x2894e8['$2']);}}else{const _0x2d747b=_0x3e8334[Math[_0x4905ec('0x37d')](_0x3e8334[_0x4905ec('0x69')])];_0x20e9c8['x']=_0x2d747b[0x0],_0x20e9c8['y']=_0x2d747b[0x1],this[_0x4905ec('0x9c')](_0x20e9c8);}}},Game_Map['prototype']['isPassableByAnyDirection']=function(_0x21bc37,_0x469f52){const _0x111079=_0x3b3036;if(this[_0x111079('0x221')](_0x21bc37,_0x469f52,0x2))return!![];if(this['isPassable'](_0x21bc37,_0x469f52,0x4))return!![];if(this[_0x111079('0x221')](_0x21bc37,_0x469f52,0x6))return!![];if(this[_0x111079('0x221')](_0x21bc37,_0x469f52,0x8))return!![];return![];},Game_Map[_0x3b3036('0x1d7')]['despawnEventId']=function(_0x169599){const _0x4dc2cd=_0x3b3036;if(_0x169599<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x1d0324=this[_0x4dc2cd('0x414')](_0x169599);_0x1d0324[_0x4dc2cd('0x191')](-0x1,-0x1),_0x1d0324[_0x4dc2cd('0x11e')](),this[_0x4dc2cd('0x180')][_0x169599-0x3e8]=null,this['clearEventCache']();},Game_Map[_0x3b3036('0x1d7')]['firstSpawnedEvent']=function(){for(const _0x4ce89e of this['_spawnedEvents']){if(_0x4ce89e)return _0x4ce89e;}return null;},Game_Map[_0x3b3036('0x1d7')]['firstSpawnedEventID']=function(){const _0x4d44ca=_0x3b3036,_0x7bf84b=this[_0x4d44ca('0x7')]();return _0x7bf84b?_0x7bf84b['_eventId']:0x0;},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x405')]=function(){const _0x524d11=_0x3b3036,_0x5b760f=this[_0x524d11('0x180')][_0x524d11('0x2e6')](0x0)[_0x524d11('0x3b9')]();for(const _0x26e2cf of _0x5b760f){if(_0x524d11('0x231')===_0x524d11('0x231')){if(_0x26e2cf)return _0x26e2cf;}else{function _0x17d94a(){const _0x7f15c6=_0x524d11;this['_labelWindow'][_0x7f15c6('0x34f')]=_0x33a3a2(_0xf7c707['$1']);}}}return null;},Game_Map['prototype'][_0x3b3036('0x3be')]=function(){const _0x15d80e=_0x3b3036,_0x22ee45=this[_0x15d80e('0x405')]();return _0x22ee45?_0x22ee45['_eventId']:0x0;},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x28d')]=function(_0x37af32,_0x3be583){const _0x556019=_0x3b3036,_0x4583e0=this[_0x556019('0x419')](_0x37af32,_0x3be583);for(const _0x3b910b of _0x4583e0){if(!_0x3b910b)continue;if(_0x3b910b[_0x556019('0x107')]())this[_0x556019('0x35')](_0x3b910b[_0x556019('0x2e')]);}},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x153')]=function(_0x5e947e){const _0x4351db=_0x3b3036;for(const _0xbb5fcf of this[_0x4351db('0x180')]){if(_0x4351db('0x6a')==='oBEOA'){function _0x440086(){const _0x36dcab=_0x4351db;if(_0x2ad563[_0x36dcab('0x24c')](_0x17ed6a,_0x1694c6,_0x256a09,'player'))return!![];if(_0x1eee72[_0x36dcab('0x37b')](_0x4479f2,_0x568460,_0x20de81,'player'))return![];return _0x291a09[_0x36dcab('0x261')][_0x36dcab('0x3cb')]['call'](this,_0x4459ed,_0x11d516,_0x177de8);}}else{if(!_0xbb5fcf)continue;if(_0x5e947e[_0x4351db('0xdb')](_0xbb5fcf[_0x4351db('0xbd')]())){if('ZcPrD'===_0x4351db('0x1ec')){function _0x480fe1(){if(_0x52ff21)this['processMoveRouteTeleportTo'](_0x57a066['x'],_0x3bf83b['y']);}}else this['despawnEventId'](_0xbb5fcf['_eventId']);}}}},Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x3a3')]=function(){const _0x3740e0=_0x3b3036;for(const _0x305785 of this[_0x3740e0('0x180')]){if(!_0x305785)continue;this[_0x3740e0('0x35')](_0x305785[_0x3740e0('0x2e')]);}},Game_CommonEvent[_0x3b3036('0x1d7')][_0x3b3036('0x16')]=function(){const _0x4d01ee=_0x3b3036,_0xd9ec=this[_0x4d01ee('0x414')]();return this['isActive']()&&_0xd9ec[_0x4d01ee('0xc2')]>=0x1&&DataManager['isAdvancedSwitch'](_0xd9ec['switchId']);},Game_CommonEvent[_0x3b3036('0x1d7')][_0x3b3036('0x143')]=function(){const _0x22f64c=_0x3b3036;return VisuMZ[_0x22f64c('0x261')][_0x22f64c('0xeb')][_0x22f64c('0x10')][_0x22f64c('0xdb')](this[_0x22f64c('0x2f')]);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x31c')]=Game_CommonEvent['prototype']['isActive'],Game_CommonEvent[_0x3b3036('0x1d7')][_0x3b3036('0x18')]=function(){const _0x6f85b=_0x3b3036;if(VisuMZ[_0x6f85b('0x261')][_0x6f85b('0x31c')][_0x6f85b('0xca')](this)){if(_0x6f85b('0x346')!==_0x6f85b('0x29d'))return!![];else{function _0x4b6ff4(){const _0x489fa6=_0x6f85b;this[_0x489fa6('0x1db')]=![],this[_0x489fa6('0x1d')](),this['clearDashing'](),this[_0x489fa6('0x1d3')](),this[_0x489fa6('0x3f9')]();}}}else{if(_0x6f85b('0x3d5')==='tgVjW'){function _0x3b9169(){const _0x1905c8=_0x6f85b;_0x284001[_0x1905c8('0x3dc')]=_0x454a16['Name']['toUpperCase']()['trim'](),_0x278dcd[_0x1905c8('0x15e')][_0x2f1256[_0x1905c8('0x3dc')]]=_0x516b0d;if(!_0x297166[_0x1905c8('0xdb')](_0x24b2f3[_0x1905c8('0x25a')]))_0x2c23a0[_0x1905c8('0x2d')](_0xe47757[_0x1905c8('0x25a')]);}}else return VisuMZ[_0x6f85b('0x261')][_0x6f85b('0xeb')][_0x6f85b('0x2af')](this[_0x6f85b('0x414')]()[_0x6f85b('0x196')],this[_0x6f85b('0x2f')]);}},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x263')]=Game_Map['prototype'][_0x3b3036('0x2bb')],Game_Map[_0x3b3036('0x1d7')][_0x3b3036('0x2bb')]=function(){const _0x1bf31b=_0x3b3036,_0x5a88d2=VisuMZ[_0x1bf31b('0x261')]['Game_Map_parallelCommonEvents'][_0x1bf31b('0xca')](this),_0x1f770f=VisuMZ[_0x1bf31b('0x261')][_0x1bf31b('0xeb')][_0x1bf31b('0x10')][_0x1bf31b('0x3d8')](_0x3f6c4c=>$dataCommonEvents[_0x3f6c4c]);return _0x5a88d2[_0x1bf31b('0x9')](_0x1f770f)[_0x1bf31b('0x279')]((_0x1a1628,_0x524727,_0x849156)=>_0x849156[_0x1bf31b('0x44')](_0x1a1628)===_0x524727);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x2e7')]=Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x386')],Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x386')]=function(){const _0x1fa468=_0x3b3036;VisuMZ['EventsMoveCore'][_0x1fa468('0x2e7')]['call'](this),this['initEventsMoveCoreSettings']();},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x42b')]=function(){const _0xf8981f=_0x3b3036;this[_0xf8981f('0x1db')]=![],this[_0xf8981f('0x1d')](),this['clearDashing'](),this[_0xf8981f('0x1d3')](),this['clearStepPattern']();},Game_CharacterBase[_0x3b3036('0x1d7')]['isSpriteVS8dir']=function(){const _0xedc4bc=_0x3b3036;if(this[_0xedc4bc('0x18a')]===Game_Player&&this[_0xedc4bc('0x183')]())return this[_0xedc4bc('0x353')]()[_0xedc4bc('0x1cf')]()[_0xedc4bc('0x2f4')](/\[VS8\]/i);else return Imported[_0xedc4bc('0xbb')]&&this[_0xedc4bc('0x1a0')]()?!![]:this[_0xedc4bc('0x1cf')]()[_0xedc4bc('0x2f4')](/\[VS8\]/i);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x52')]=Game_CharacterBase['prototype'][_0x3b3036('0x2ce')],Game_CharacterBase['prototype']['direction']=function(){const _0x199260=_0x3b3036;if(this[_0x199260('0x1d6')]()&&!this[_0x199260('0x381')]()&&this[_0x199260('0x3e')]()){if(_0x199260('0x101')!=='zfSQK'){function _0x540b3d(){return!![];}}else return this[_0x199260('0x2cb')]();}else{if(this[_0x199260('0x1d6')]()&&!this[_0x199260('0x381')]()){if('KJdiK'===_0x199260('0x2a3'))return 0x8;else{function _0x3fe8d9(){const _0x33be08=_0x199260;if(_0x17ec26===0x0||_0x148f48===0x0)return![];if(!_0x36f653[_0x33be08('0x1cd')][_0x33b726])return _0x4de357['isPlaytest']()&&_0x4baaf8['log'](_0x33be08('0x39e')['format'](_0x2a8e5b)),![];return!![];}}}else return this[_0x199260('0x301')]()&&this[_0x199260('0x3e')]()?this[_0x199260('0x226')]():VisuMZ[_0x199260('0x261')][_0x199260('0x52')]['call'](this);}},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x342')]=Game_CharacterBase['prototype'][_0x3b3036('0x115')],Game_CharacterBase[_0x3b3036('0x1d7')]['setDirection']=function(_0x2859ba){const _0xc82b4d=_0x3b3036;if(!this[_0xc82b4d('0x3e')]())_0x2859ba=this[_0xc82b4d('0x17d')](_0x2859ba);VisuMZ[_0xc82b4d('0x261')][_0xc82b4d('0x342')][_0xc82b4d('0xca')](this,_0x2859ba);},Game_CharacterBase[_0x3b3036('0x1d7')]['correctFacingDirection']=function(_0x23bfb2){const _0x28040d=_0x3b3036;if(_0x23bfb2===0x1)return this[_0x28040d('0x104')](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x23bfb2===0x3)return this[_0x28040d('0x104')](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x23bfb2===0x7)return this[_0x28040d('0x104')](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x23bfb2===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x23bfb2;},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x220')]=function(_0x56e1c9){const _0x213879=_0x3b3036;return[0x1,0x3,0x5,0x7,0x9][_0x213879('0xdb')](_0x56e1c9);},Game_CharacterBase['prototype'][_0x3b3036('0x3e9')]=function(){const _0x1a06b2=_0x3b3036;return this[_0x1a06b2('0x427')]||0x0;},VisuMZ['EventsMoveCore'][_0x3b3036('0x38c')]=Game_CharacterBase['prototype']['moveStraight'],Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x382')]=function(_0x37ea95){const _0x2f19f1=_0x3b3036;this[_0x2f19f1('0x427')]=_0x37ea95,VisuMZ[_0x2f19f1('0x261')][_0x2f19f1('0x38c')][_0x2f19f1('0xca')](this,_0x37ea95);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x3aa')]=function(_0x53060a){const _0x46df7c=_0x3b3036;if(!this[_0x46df7c('0x220')](_0x53060a))return this[_0x46df7c('0x382')](_0x53060a);let _0x358d65=0x0,_0x5c034c=0x0;switch(_0x53060a){case 0x1:_0x358d65=0x4,_0x5c034c=0x2;break;case 0x3:_0x358d65=0x6,_0x5c034c=0x2;break;case 0x7:_0x358d65=0x4,_0x5c034c=0x8;break;case 0x9:_0x358d65=0x6,_0x5c034c=0x8;break;}if(VisuMZ[_0x46df7c('0x261')][_0x46df7c('0x239')][_0x46df7c('0x257')][_0x46df7c('0x91')]){if('ZnLeQ'!==_0x46df7c('0xa8')){if(!this[_0x46df7c('0x104')](this['_x'],this['_y'],_0x358d65))return this[_0x46df7c('0x382')](_0x5c034c);if(!this[_0x46df7c('0x104')](this['_x'],this['_y'],_0x5c034c)){if(_0x46df7c('0x2ee')==='IORzc')return this[_0x46df7c('0x382')](_0x358d65);else{function _0x2ea172(){const _0x13c096=_0x46df7c;this[_0x13c096('0x15b')]=_0x3fea0b[_0x13c096('0x211')](),_0x5b5835[_0x13c096('0x261')][_0x13c096('0x194')]['call'](this,_0x307a02,_0x2039fc);}}}if(!this[_0x46df7c('0x2b5')](this['_x'],this['_y'],_0x358d65,_0x5c034c)){let _0x1dcc6e=VisuMZ[_0x46df7c('0x261')][_0x46df7c('0x239')][_0x46df7c('0x257')]['FavorHorz']?_0x358d65:_0x5c034c;return this['moveStraight'](_0x1dcc6e);}}else{function _0x3849cb(){const _0x58e645=_0x46df7c;this[_0x58e645('0xea')]['removeChild'](_0x4d2ee7[_0x58e645('0x214')]);}}}this[_0x46df7c('0x427')]=_0x53060a,this[_0x46df7c('0x30e')](_0x358d65,_0x5c034c);},VisuMZ['EventsMoveCore'][_0x3b3036('0x3d7')]=Game_CharacterBase[_0x3b3036('0x1d7')]['realMoveSpeed'],Game_CharacterBase[_0x3b3036('0x1d7')]['realMoveSpeed']=function(){const _0x2101da=_0x3b3036;let _0x1e3b62=this[_0x2101da('0x53')];if(this[_0x2101da('0x2c5')]()){if(_0x2101da('0x22d')===_0x2101da('0x22d'))_0x1e3b62+=this[_0x2101da('0x36c')]();else{function _0x2af794(){const _0x4542c5=_0x2101da;if(this[_0x4542c5('0x33c')]===_0x2ff230)this[_0x4542c5('0x2a')]();if(!_0x27e3ec)return;const _0x3a6dfe=_0x4542c5('0x209')[_0x4542c5('0x296')](_0x1154ca[_0x4542c5('0x1ce')],_0x1cefc8[_0x4542c5('0x2e')]);return this['_PreservedEventMorphData'][_0x3a6dfe];}}}return this[_0x2101da('0x36')](_0x1e3b62);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x36c')]=function(){const _0x61c41=_0x3b3036,_0x3d5490=VisuMZ[_0x61c41('0x261')][_0x61c41('0x239')][_0x61c41('0x257')];return _0x3d5490[_0x61c41('0x7c')]!==undefined?_0x3d5490[_0x61c41('0x7c')]:VisuMZ[_0x61c41('0x261')]['Game_CharacterBase_realMoveSpeed'][_0x61c41('0xca')](this)-this[_0x61c41('0x53')];},Game_CharacterBase[_0x3b3036('0x1d7')]['adjustDir8MovementSpeed']=function(_0x523136){const _0x9b9633=_0x3b3036,_0x39441a=VisuMZ[_0x9b9633('0x261')][_0x9b9633('0x239')][_0x9b9633('0x257')];if(!_0x39441a[_0x9b9633('0x250')])return _0x523136;return[0x1,0x3,0x7,0x9][_0x9b9633('0xdb')](this[_0x9b9633('0x427')])&&(_0x523136*=_0x39441a[_0x9b9633('0x106')]||0.01),_0x523136;},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x2fd')]=Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x2c5')],Game_CharacterBase[_0x3b3036('0x1d7')]['isDashing']=function(){const _0x16168d=_0x3b3036;if(this[_0x16168d('0x19a')])return!![];return VisuMZ[_0x16168d('0x261')][_0x16168d('0x2fd')][_0x16168d('0xca')](this);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x71')]=function(){const _0x59f4dc=_0x3b3036;return this[_0x59f4dc('0x2c5')]();},VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern']=Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x28e')],Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x28e')]=function(){const _0xd4dd61=_0x3b3036;if(this['isPosing']())return this['getPosingCharacterPattern']();else{if('HFKYl'!==_0xd4dd61('0x34')){function _0x3c11da(){const _0x3ee66e=_0xd4dd61;this['checkAdvancedSwitchVariablePresent'](_0x4032c9),_0x47ffc4[_0x3ee66e('0x1ab')](this);const _0x6a2f13=_0x941e99[_0x3ee66e('0x261')][_0x3ee66e('0xa4')]['call'](this,_0x3615c1);return _0x331488[_0x3ee66e('0x2cc')](),_0x6a2f13;}}else return VisuMZ[_0xd4dd61('0x261')]['Game_CharacterBase_pattern'][_0xd4dd61('0xca')](this);}},VisuMZ[_0x3b3036('0x261')]['Game_CharacterBase_increaseSteps']=Game_CharacterBase['prototype'][_0x3b3036('0x401')],Game_CharacterBase['prototype'][_0x3b3036('0x401')]=function(){const _0x1525b1=_0x3b3036;VisuMZ[_0x1525b1('0x261')][_0x1525b1('0x3b2')][_0x1525b1('0xca')](this),this['clearPose']();},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x17a')]=Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x2b6')],Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x2b6')]=function(){const _0x56b226=_0x3b3036;if(this[_0x56b226('0x3e')]())return this[_0x56b226('0x20c')]();return VisuMZ[_0x56b226('0x261')][_0x56b226('0x17a')][_0x56b226('0xca')](this);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x20c')]=function(){const _0x4680d6=_0x3b3036,_0x377ed8=this[_0x4680d6('0x2ce')]();if(this['isJumping']()){if([0x2,0x4,0x6,0x8][_0x4680d6('0xdb')](_0x377ed8))return 0x4;if([0x1,0x3,0x7,0x9][_0x4680d6('0xdb')](_0x377ed8))return 0x5;}else{if(this[_0x4680d6('0x1d6')]()){if('GztcJ'!==_0x4680d6('0x3d3'))return 0x6;else{function _0x285bcf(){const _0x1df09d=_0x4680d6;return _0x46e34b[_0x1df09d('0x7c')];}}}else{if(this['isPosing']()){if('nvucS'===_0x4680d6('0x324')){function _0x2fc2fa(){const _0x8cc7af=_0x4680d6;this[_0x8cc7af('0x1a8')]=_0x332055(_0x4cd8d8['$1']),this['_spriteOffsetY']=_0x47add9(_0x1d579c['$2']);}}else return this[_0x4680d6('0xc4')]();}else{if(this['_forceCarrying']){if(_0x4680d6('0x86')!==_0x4680d6('0x86')){function _0x33ee46(){const _0xcbf42c=_0x4680d6;return this[_0xcbf42c('0xe7')](_0x3f94e1,_0x112a7e);}}else{if([0x2,0x4,0x6,0x8][_0x4680d6('0xdb')](_0x377ed8))return 0x4;if([0x1,0x3,0x7,0x9][_0x4680d6('0xdb')](_0x377ed8))return 0x5;}}else{if(this['hasEventIcon']()&&this[_0x4680d6('0x268')]()){if(_0x4680d6('0xee')!==_0x4680d6('0xee')){function _0x588c2d(){this['initialize'](...arguments);}}else{if([0x2,0x4,0x6,0x8]['includes'](_0x377ed8))return 0x4;if([0x1,0x3,0x7,0x9][_0x4680d6('0xdb')](_0x377ed8))return 0x5;}}else{if(this[_0x4680d6('0x71')]()){if([0x2,0x4,0x6,0x8][_0x4680d6('0xdb')](_0x377ed8))return 0x2;if([0x1,0x3,0x7,0x9][_0x4680d6('0xdb')](_0x377ed8))return 0x3;}else{if(_0x4680d6('0x328')==='kQlMY'){function _0x4f997b(){const _0x346b20=_0x4680d6;this[_0x346b20('0x50')]=0xff;}}else{if([0x2,0x4,0x6,0x8]['includes'](_0x377ed8))return 0x0;if([0x1,0x3,0x7,0x9][_0x4680d6('0xdb')](_0x377ed8))return 0x1;}}}}}}}},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x268')]=function(){const _0x53e2b9=_0x3b3036;return VisuMZ[_0x53e2b9('0x261')][_0x53e2b9('0x239')][_0x53e2b9('0x35b')][_0x53e2b9('0xa5')];},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x68')]=function(){const _0x372cb1=_0x3b3036;return this[_0x372cb1('0x1d6')]()&&this[_0x372cb1('0x92')]()===VisuMZ[_0x372cb1('0x261')][_0x372cb1('0x239')]['TerrainTag'][_0x372cb1('0x94')];},Game_CharacterBase['prototype'][_0x3b3036('0x2cb')]=function(){const _0x4943e7=_0x3b3036;return this[_0x4943e7('0x68')]()?0x4:0x2;},VisuMZ[_0x3b3036('0x261')]['Game_CharacterBase_update']=Game_CharacterBase[_0x3b3036('0x1d7')]['update'],Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x31d')]=function(){const _0x3eda33=_0x3b3036;VisuMZ[_0x3eda33('0x261')]['Game_CharacterBase_update'][_0x3eda33('0xca')](this),this['updatePose']();},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x374')]=function(){const _0x2e2057=_0x3b3036;this[_0x2e2057('0x357')]=this[_0x2e2057('0x357')]||0x0;if(this[_0x2e2057('0x357')]>0x0){this['_poseDuration']--;if(this['_poseDuration']<=0x0&&this['_pose']!==_0x2e2057('0x7f'))this[_0x2e2057('0x1d')]();}},VisuMZ['EventsMoveCore']['Game_CharacterBase_moveDiagonally']=Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x30e')],Game_CharacterBase['prototype']['moveDiagonally']=function(_0xdb768e,_0x380320){const _0x53f86a=_0x3b3036;VisuMZ[_0x53f86a('0x261')][_0x53f86a('0x28')][_0x53f86a('0xca')](this,_0xdb768e,_0x380320);if(this[_0x53f86a('0x3e')]())this[_0x53f86a('0x31f')](_0xdb768e,_0x380320);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x31f')]=function(_0x377171,_0xa9d3db){const _0x4688e8=_0x3b3036;if(_0x377171===0x4&&_0xa9d3db===0x2)this[_0x4688e8('0x115')](0x1);if(_0x377171===0x6&&_0xa9d3db===0x2)this[_0x4688e8('0x115')](0x3);if(_0x377171===0x4&&_0xa9d3db===0x8)this['setDirection'](0x7);if(_0x377171===0x6&&_0xa9d3db===0x8)this[_0x4688e8('0x115')](0x9);},VisuMZ['EventsMoveCore'][_0x3b3036('0x32b')]=Game_CharacterBase['prototype'][_0x3b3036('0x40f')],Game_CharacterBase[_0x3b3036('0x1d7')]['hasStepAnime']=function(){const _0x15968e=_0x3b3036;if(this[_0x15968e('0x301')]()&&this[_0x15968e('0x249')]()===_0x15968e('0x7f'))return!![];return VisuMZ[_0x15968e('0x261')]['Game_CharacterBase_hasStepAnime']['call'](this);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0xcd')]=function(_0x10d0c6,_0x1a16d8){const _0x103b12=_0x3b3036;if(_0x10d0c6['match'](/Z/i))_0x10d0c6=_0x103b12('0x7f');if(_0x10d0c6['match'](/SLEEP/i))_0x10d0c6=_0x103b12('0x7f');if(this['isSpriteVS8dir']()){if(_0x103b12('0x2a4')===_0x103b12('0x37c')){function _0x4cc859(){const _0x332fcf=_0x103b12,_0x457841=this[_0x332fcf('0x4b')](_0x30b3e3,_0x21c582,![]);if(_0x457841)this[_0x332fcf('0x115')](_0x457841);}}else this[_0x103b12('0x125')]=_0x10d0c6[_0x103b12('0x1f8')]()[_0x103b12('0x14d')](),this[_0x103b12('0x357')]=_0x1a16d8||Infinity;}},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x249')]=function(){const _0x3f4b20=_0x3b3036;if(this[_0x3f4b20('0x3e')]()){if('rwrFb'===_0x3f4b20('0x423')){function _0x2e655c(){const _0x138c38=_0x3f4b20;return _0x499335[_0x138c38('0x414')](this['_eventId'])&&_0x4f1cff[_0x138c38('0x261')][_0x138c38('0xeb')][_0x138c38('0x2af')](_0x5a17d8[_0x138c38('0x196')],this[_0x138c38('0x2e')]);}}else return(this[_0x3f4b20('0x125')]||'')[_0x3f4b20('0x1f8')]()[_0x3f4b20('0x14d')]();}else return''[_0x3f4b20('0x1f8')]()['trim']();},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x48')]=function(_0x493aa4,_0x3bb8e1){const _0x331d55=_0x3b3036;if(this[_0x331d55('0x3e')]()){const _0x394b7a=['',_0x331d55('0x3d4'),_0x331d55('0x1a'),_0x331d55('0x136'),_0x331d55('0x3a'),_0x331d55('0x383'),'SWEAT',_0x331d55('0x2c9'),'SILENCE',_0x331d55('0xc'),_0x331d55('0x7f'),'','','','',''][_0x493aa4];this[_0x331d55('0xcd')](_0x394b7a,_0x3bb8e1);}},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x1d')]=function(){const _0x323cea=_0x3b3036;this[_0x323cea('0x125')]='',this['_poseDuration']=0x0;},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x301')]=function(){const _0x29a16c=_0x3b3036;return this[_0x29a16c('0x3e')]()&&!!this[_0x29a16c('0x125')];},Game_CharacterBase[_0x3b3036('0x1d7')]['getPosingCharacterIndex']=function(){const _0xd04a5d=_0x3b3036,_0x195e83=this['_pose'][_0xd04a5d('0x1f8')]();switch(this[_0xd04a5d('0x125')]['toUpperCase']()['trim']()){case _0xd04a5d('0xff'):case _0xd04a5d('0x3ff'):case'VICTORY':case _0xd04a5d('0x3d2'):case _0xd04a5d('0x418'):case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x3b3036('0x226')]=function(){const _0xe74f4=_0x3b3036;switch(this[_0xe74f4('0x125')]['toUpperCase']()){case _0xe74f4('0x3d4'):case _0xe74f4('0x1a'):case _0xe74f4('0x136'):return 0x2;break;case _0xe74f4('0x3a'):case'ANGER':case _0xe74f4('0x186'):return 0x4;break;case _0xe74f4('0xff'):case _0xe74f4('0x3ff'):case'VICTORY':case _0xe74f4('0x2c9'):case _0xe74f4('0x41d'):case _0xe74f4('0xc'):return 0x6;break;case _0xe74f4('0x3d2'):case _0xe74f4('0x418'):case _0xe74f4('0x6e'):case'ZZZ':case _0xe74f4('0x2c3'):return 0x8;break;default:return VisuMZ['EventsMoveCore'][_0xe74f4('0x342')]['call'](this);break;}},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x1c8')]=function(){const _0x2d745c=_0x3b3036;switch(this[_0x2d745c('0x125')][_0x2d745c('0x1f8')]()){case'ITEM':case _0x2d745c('0x3d2'):case _0x2d745c('0x3d4'):case _0x2d745c('0x3a'):case _0x2d745c('0x2c9'):return 0x0;break;case _0x2d745c('0x3ff'):case'KNEEL':case'QUESTION':case _0x2d745c('0x383'):case _0x2d745c('0x41d'):return 0x1;break;case _0x2d745c('0x1e2'):case _0x2d745c('0x6e'):case _0x2d745c('0x136'):case _0x2d745c('0x186'):case _0x2d745c('0xc'):return 0x2;break;default:return VisuMZ['EventsMoveCore'][_0x2d745c('0x17')][_0x2d745c('0xca')](this);break;}},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x290')]=function(){const _0x109cf6=_0x3b3036;this[_0x109cf6('0x2ea')]=!![];},Game_CharacterBase['prototype'][_0x3b3036('0x15f')]=function(){const _0x40cf2b=_0x3b3036;this[_0x40cf2b('0x2ea')]=![];},Game_CharacterBase['prototype'][_0x3b3036('0x3a4')]=function(){const _0x4f4981=_0x3b3036;this[_0x4f4981('0x19a')]=!![];},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x67')]=function(){const _0x426011=_0x3b3036;this[_0x426011('0x19a')]=![];},Game_CharacterBase['prototype'][_0x3b3036('0x1dc')]=function(){const _0x268645=_0x3b3036;if(this[_0x268645('0xaf')]())return![];if(this[_0x268645('0x2d4')])return![];if(this[_0x268645('0x11d')])return![];if(this[_0x268645('0x389')]==='')return![];if(this[_0x268645('0x18a')]===Game_Vehicle)return![];return!![];},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x3e4')]=function(){const _0x46790f=_0x3b3036;if(this[_0x46790f('0x1d6')]())return!![];if(this['constructor']===Game_Player&&this[_0x46790f('0x183')]())return!![];return![];},Game_CharacterBase[_0x3b3036('0x1d7')]['shadowFilename']=function(){const _0x4c8a70=_0x3b3036;return VisuMZ[_0x4c8a70('0x261')][_0x4c8a70('0x239')][_0x4c8a70('0x257')][_0x4c8a70('0xf4')];},Game_CharacterBase['prototype']['shadowX']=function(){const _0xc0a82d=_0x3b3036;return this[_0xc0a82d('0x1ed')]();},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x9d')]=function(){const _0x126004=_0x3b3036;return this[_0x126004('0x12e')]()+this[_0x126004('0x5e')]()+this[_0x126004('0x64')]();},Game_Character['prototype'][_0x3b3036('0xd8')]=function(_0x5d96fb,_0x148c5f){const _0x119bf4=_0x3b3036,_0x7b8c24=this['searchLimit'](),_0x61ef1=$gameMap[_0x119bf4('0x42')](),_0x3c87e0=[],_0x40469a=[],_0x24e02e=[],_0xb9e46d={};let _0x4567f3=_0xb9e46d;if(this['x']===_0x5d96fb&&this['y']===_0x148c5f)return 0x0;_0xb9e46d[_0x119bf4('0x259')]=null,_0xb9e46d['x']=this['x'],_0xb9e46d['y']=this['y'],_0xb9e46d['g']=0x0,_0xb9e46d['f']=$gameMap[_0x119bf4('0x1e9')](_0xb9e46d['x'],_0xb9e46d['y'],_0x5d96fb,_0x148c5f),_0x3c87e0[_0x119bf4('0x2d')](_0xb9e46d),_0x40469a[_0x119bf4('0x2d')](_0xb9e46d['y']*_0x61ef1+_0xb9e46d['x']);while(_0x3c87e0[_0x119bf4('0x69')]>0x0){if(_0x119bf4('0x3a7')!==_0x119bf4('0x3a7')){function _0x307812(){const _0x347ee6=_0x119bf4;this[_0x347ee6('0x233')]();}}else{let _0x53801e=0x0;for(let _0x2f29f2=0x0;_0x2f29f2<_0x3c87e0[_0x119bf4('0x69')];_0x2f29f2++){if(_0x3c87e0[_0x2f29f2]['f']<_0x3c87e0[_0x53801e]['f']){if(_0x119bf4('0x1d1')!=='aGEiB')_0x53801e=_0x2f29f2;else{function _0x285b7c(){const _0x22a9b6=_0x119bf4;_0x3b1c8d[_0x22a9b6('0x3a9')]&&this[_0x22a9b6('0x24e')](_0x13a9f9,_0x3ccac2['x']+0x2,_0x3a9724['y']),_0x4c854d['x']+=_0x55f430[_0x22a9b6('0x32e')](this['iconSize'](),_0x5a5c21['iconWidth'])+0x4;}}}}const _0x48d677=_0x3c87e0[_0x53801e],_0x32a209=_0x48d677['x'],_0x3f3a62=_0x48d677['y'],_0xedcee8=_0x3f3a62*_0x61ef1+_0x32a209,_0x1b3a4a=_0x48d677['g'];_0x3c87e0['splice'](_0x53801e,0x1),_0x40469a[_0x119bf4('0x1b2')](_0x40469a[_0x119bf4('0x44')](_0xedcee8),0x1),_0x24e02e[_0x119bf4('0x2d')](_0xedcee8);if(_0x48d677['x']===_0x5d96fb&&_0x48d677['y']===_0x148c5f){if(_0x119bf4('0x4a')==='tYSlF'){function _0x59eaf7(){return _0x15f23d['getEventIconData'](this);}}else{_0x4567f3=_0x48d677;break;}}if(_0x1b3a4a>=_0x7b8c24){if(_0x119bf4('0xc1')!=='WKnfQ'){function _0x108429(){const _0x22af05=_0x119bf4;if(this[_0x22af05('0x25c')])return!![];return _0xd3f317[_0x22af05('0x1d7')]['isNearTheScreen'][_0x22af05('0xca')](this);}}else continue;}for(let _0x17544c=0x1;_0x17544c<0xa;_0x17544c++){if(_0x17544c===0x5)continue;const _0x1ff106=_0x17544c,_0x728d3f=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6][_0x17544c],_0x3fa930=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8][_0x17544c],_0x22c5f5=$gameMap[_0x119bf4('0x421')](_0x32a209,_0x1ff106),_0x3a6f1c=$gameMap[_0x119bf4('0xc9')](_0x3f3a62,_0x1ff106),_0x504eef=_0x3a6f1c*_0x61ef1+_0x22c5f5;if(_0x24e02e[_0x119bf4('0xdb')](_0x504eef))continue;if(this[_0x119bf4('0x18a')]===Game_Player&&VisuMZ['EventsMoveCore'][_0x119bf4('0x239')][_0x119bf4('0x257')]['StrictCollision']){if(!this['canPass'](_0x32a209,_0x3f3a62,_0x728d3f))continue;if(!this[_0x119bf4('0x104')](_0x32a209,_0x3f3a62,_0x3fa930))continue;}if(!this[_0x119bf4('0x2b5')](_0x32a209,_0x3f3a62,_0x728d3f,_0x3fa930))continue;const _0x51c796=_0x1b3a4a+0x1,_0x5da1cb=_0x40469a[_0x119bf4('0x44')](_0x504eef);if(_0x5da1cb<0x0||_0x51c796<_0x3c87e0[_0x5da1cb]['g']){let _0x4be4d5={};_0x5da1cb>=0x0?_0x4be4d5=_0x3c87e0[_0x5da1cb]:(_0x3c87e0[_0x119bf4('0x2d')](_0x4be4d5),_0x40469a['push'](_0x504eef));_0x4be4d5[_0x119bf4('0x259')]=_0x48d677,_0x4be4d5['x']=_0x22c5f5,_0x4be4d5['y']=_0x3a6f1c,_0x4be4d5['g']=_0x51c796,_0x4be4d5['f']=_0x51c796+$gameMap[_0x119bf4('0x1e9')](_0x22c5f5,_0x3a6f1c,_0x5d96fb,_0x148c5f);if(!_0x4567f3||_0x4be4d5['f']-_0x4be4d5['g']<_0x4567f3['f']-_0x4567f3['g']){if(_0x119bf4('0x416')===_0x119bf4('0x15c')){function _0x1038b6(){return this['turnAwayFromCharacter'](_0x341ccc);}}else _0x4567f3=_0x4be4d5;}}}}}let _0x1ca75a=_0x4567f3;while(_0x1ca75a[_0x119bf4('0x259')]&&_0x1ca75a['parent']!==_0xb9e46d){if('rzzTP'==='rzzTP')_0x1ca75a=_0x1ca75a['parent'];else{function _0x153060(){const _0x1ece34=_0x119bf4;this[_0x1ece34('0x188')]();}}}const _0x2e03ca=$gameMap[_0x119bf4('0x3e3')](_0x1ca75a['x'],_0xb9e46d['x']),_0x2bf769=$gameMap[_0x119bf4('0x417')](_0x1ca75a['y'],_0xb9e46d['y']);if(_0x2e03ca<0x0&&_0x2bf769>0x0)return 0x1;if(_0x2e03ca>0x0&&_0x2bf769>0x0)return 0x3;if(_0x2e03ca<0x0&&_0x2bf769<0x0)return 0x7;if(_0x2e03ca>0x0&&_0x2bf769<0x0)return 0x9;if(_0x2bf769>0x0)return 0x2;if(_0x2e03ca<0x0)return 0x4;if(_0x2e03ca>0x0)return 0x6;if(_0x2bf769<0x0)return 0x8;const _0x4dd4d1=this[_0x119bf4('0x1f4')](_0x5d96fb),_0x50ce5c=this['deltaYFrom'](_0x148c5f);if(Math[_0x119bf4('0x1b3')](_0x4dd4d1)>Math[_0x119bf4('0x1b3')](_0x50ce5c)){if(_0x119bf4('0x13')===_0x119bf4('0x13'))return _0x4dd4d1>0x0?0x4:0x6;else{function _0x3efc4d(){return!![];}}}else{if(_0x50ce5c!==0x0)return _0x50ce5c>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x3b3036('0x261')]['Game_CharacterBase_canPass']=Game_CharacterBase['prototype'][_0x3b3036('0x104')],Game_CharacterBase[_0x3b3036('0x1d7')]['canPass']=function(_0xc250da,_0x121af5,_0x3be8be){const _0x45814d=_0x3b3036;return this[_0x45814d('0x1f7')]===_0x45814d('0xb2')?this[_0x45814d('0x353')]()['isAirshipPassable'](_0xc250da,_0x121af5,_0x3be8be):VisuMZ[_0x45814d('0x261')][_0x45814d('0x14a')][_0x45814d('0xca')](this,_0xc250da,_0x121af5,_0x3be8be);},Game_CharacterBase[_0x3b3036('0x1d7')]['clearSpriteOffsets']=function(){const _0x24ca81=_0x3b3036;this[_0x24ca81('0x1a8')]=0x0,this[_0x24ca81('0xf9')]=0x0;},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x203')]=Game_CharacterBase['prototype'][_0x3b3036('0x1ed')],Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x1ed')]=function(){const _0xc5ab5d=_0x3b3036;return VisuMZ[_0xc5ab5d('0x261')][_0xc5ab5d('0x203')][_0xc5ab5d('0xca')](this)+(this[_0xc5ab5d('0x1a8')]||0x0);},VisuMZ[_0x3b3036('0x261')]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x12e')],Game_CharacterBase[_0x3b3036('0x1d7')]['screenY']=function(){const _0x583a17=_0x3b3036;return VisuMZ['EventsMoveCore'][_0x583a17('0x396')][_0x583a17('0xca')](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x3f9')]=function(){const _0x411ea4=_0x3b3036;this[_0x411ea4('0x148')]='';},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x195')]=Game_CharacterBase['prototype'][_0x3b3036('0xdf')],Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0xdf')]=function(){const _0x2cf1fe=_0x3b3036;if(this[_0x2cf1fe('0x1db')])return;if(this[_0x2cf1fe('0x19f')]())return;VisuMZ['EventsMoveCore']['Game_CharacterBase_updatePattern'][_0x2cf1fe('0xca')](this);},Game_CharacterBase['prototype'][_0x3b3036('0x19f')]=function(){const _0x383cab=_0x3b3036;if(!this[_0x383cab('0x40f')]()&&this[_0x383cab('0x2a7')]>0x0)return![];switch(String(this['_stepPattern'])[_0x383cab('0x1f8')]()[_0x383cab('0x14d')]()){case _0x383cab('0x20'):this[_0x383cab('0x420')]+=0x1;if(this[_0x383cab('0x420')]>0x2)this[_0x383cab('0x41')](0x0);break;case _0x383cab('0x2f2'):this['_pattern']-=0x1;if(this['_pattern']<0x0)this['setPattern'](0x2);break;case _0x383cab('0x27a'):case _0x383cab('0x2c4'):this['turnRight90']();break;case _0x383cab('0x1c7'):case _0x383cab('0x16a'):case'SPIN\x20ANTICLOCKWISE':case'SPIN\x20ACW':this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x1bf')]=function(){const _0x27ab03=_0x3b3036;return $gameSystem[_0x27ab03('0x1bf')](this);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x12b')]=function(){const _0x4ec9be=_0x3b3036,_0x1aeccc=this['getEventIconData']();if(!_0x1aeccc)return![];return _0x1aeccc[_0x4ec9be('0x102')]>0x0;},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x155')]=function(){const _0x2432e7=this['direction']();return $gameMap['roundXWithDirection'](this['x'],_0x2432e7);},Game_CharacterBase['prototype'][_0x3b3036('0x308')]=function(){const _0x3023ac=_0x3b3036,_0x4c4ef4=this['direction']();return $gameMap[_0x3023ac('0xc9')](this['y'],_0x4c4ef4);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x10a')]=function(){const _0xa72e5b=_0x3b3036,_0x41d015=this[_0xa72e5b('0x137')](this[_0xa72e5b('0x2ce')]());return $gameMap[_0xa72e5b('0x421')](this['x'],_0x41d015);},Game_CharacterBase[_0x3b3036('0x1d7')][_0x3b3036('0x1e8')]=function(){const _0x1001e6=_0x3b3036,_0x58b769=this[_0x1001e6('0x137')](this[_0x1001e6('0x2ce')]());return $gameMap['roundYWithDirection'](this['y'],_0x58b769);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x409')]=Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0xe0')],Game_Character['prototype'][_0x3b3036('0xe0')]=function(_0x475804){const _0x5401d5=_0x3b3036;route=JsonEx[_0x5401d5('0x142')](_0x475804),VisuMZ[_0x5401d5('0x261')][_0x5401d5('0x409')][_0x5401d5('0xca')](this,route);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x6b')]=Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x322')],Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x322')]=function(_0xc9cc3c){const _0x13dd12=_0x3b3036;route=JsonEx[_0x13dd12('0x142')](_0xc9cc3c),VisuMZ['EventsMoveCore'][_0x13dd12('0x6b')][_0x13dd12('0xca')](this,route);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x3ab')]=Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x218')],Game_Character[_0x3b3036('0x1d7')]['processMoveCommand']=function(_0x3fc163){const _0x46a743=_0x3b3036,_0x5d3b06=Game_Character,_0xf82d11=_0x3fc163[_0x46a743('0xf7')];if(_0x3fc163[_0x46a743('0x26f')]===_0x5d3b06[_0x46a743('0x3fc')]){let _0x41c061=_0x3fc163[_0x46a743('0xf7')][0x0];_0x41c061=this['convertVariableValuesInScriptCall'](_0x41c061),_0x41c061=this[_0x46a743('0x37e')](_0x41c061),this['processMoveCommandEventsMoveCore'](_0x3fc163,_0x41c061);}else{if(_0x46a743('0x323')!==_0x46a743('0x323')){function _0x1a4268(){const _0x40e650=_0x46a743,_0x390b3c=_0x97f3a6['eventsXyNt'](_0x32b103,_0x27a273)[_0x40e650('0x279')](_0x1fc516=>_0x1fc516!==this);return _0x390b3c[_0x40e650('0x69')]>0x0;}}else VisuMZ[_0x46a743('0x261')][_0x46a743('0x3ab')][_0x46a743('0xca')](this,_0x3fc163);}},Game_Character[_0x3b3036('0x1d7')]['convertVariableValuesInScriptCall']=function(_0x315439){const _0x3e22ac=_0x3b3036,_0x42b0b2=/\$gameVariables\.value\((\d+)\)/gi,_0x55aaf4=/\\V\[(\d+)\]/gi;while(_0x315439[_0x3e22ac('0x2f4')](_0x42b0b2)){_0x315439=_0x315439[_0x3e22ac('0x46')](_0x42b0b2,(_0x301e98,_0x322635)=>$gameVariables[_0x3e22ac('0x10f')](parseInt(_0x322635)));}while(_0x315439['match'](_0x55aaf4)){_0x315439=_0x315439[_0x3e22ac('0x46')](_0x55aaf4,(_0x16553d,_0x5ad5b8)=>$gameVariables[_0x3e22ac('0x10f')](parseInt(_0x5ad5b8)));}return _0x315439;},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x37e')]=function(_0x32d01b){const _0x1c871e=_0x3b3036,_0x4ef8dc=/\\SELFVAR\[(\d+)\]/gi;while(_0x32d01b[_0x1c871e('0x2f4')](_0x4ef8dc)){_0x32d01b=_0x32d01b[_0x1c871e('0x46')](_0x4ef8dc,(_0x45acc8,_0x5d70c6)=>getSelfVariableValue(this[_0x1c871e('0x1ce')],this[_0x1c871e('0x2e')],parseInt(_0x5d70c6)));}return _0x32d01b;},Game_Character[_0x3b3036('0x1d7')]['processMoveCommandEventsMoveCore']=function(_0x48bce2,_0x35b4c8){const _0x19694e=_0x3b3036;if(_0x35b4c8[_0x19694e('0x2f4')](/ANIMATION:[ ](\d+)/i))return this[_0x19694e('0x424')](Number(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/BALLOON:[ ](.*)/i))return this[_0x19694e('0x23b')](String(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/FADE IN:[ ](\d+)/i))return this['processMoveRouteFadeIn'](Number(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/FADE OUT:[ ](\d+)/i))return this['processMoveRouteFadeOut'](Number(RegExp['$1']));if(_0x35b4c8['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x19694e('0x290')]();if(_0x35b4c8[_0x19694e('0x2f4')](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x19694e('0x15f')]();if(_0x35b4c8[_0x19694e('0x2f4')](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x19694e('0x3a4')]();if(_0x35b4c8[_0x19694e('0x2f4')](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x19694e('0x67')]();if(_0x35b4c8[_0x19694e('0x2f4')](/HUG:[ ]LEFT/i))return this[_0x19694e('0x1c4')](_0x19694e('0x240'));if(_0x35b4c8[_0x19694e('0x2f4')](/HUG:[ ]RIGHT/i))return this[_0x19694e('0x1c4')](_0x19694e('0x34d'));if(_0x35b4c8[_0x19694e('0x2f4')](/INDEX:[ ](\d+)/i)){if(_0x19694e('0x2d8')!==_0x19694e('0x34a'))return this[_0x19694e('0x40e')](Number(RegExp['$1']));else{function _0x4a0ff0(){const _0x2b91ac=_0x19694e;if(this[_0x2b91ac('0xda')]===_0x30603e)this[_0x2b91ac('0x2a')]();if(!_0x16078a)return null;_0x4b4e3e===_0x175161?delete this[_0x2b91ac('0xda')][_0x2b91ac('0x235')]:this[_0x2b91ac('0x12c')](_0x2c97e5[_0x2b91ac('0x1ce')],_0x1595cf['_eventId']);}}}if(_0x35b4c8[_0x19694e('0x2f4')](/INDEX:[ ]([\+\-]\d+)/i)){const _0x5dac7f=this[_0x19694e('0x22c')]+Number(RegExp['$1']);return this[_0x19694e('0x40e')](_0x5dac7f);}if(_0x35b4c8[_0x19694e('0x2f4')](/JUMP FORWARD:[ ](\d+)/i)){if(_0x19694e('0x1b6')===_0x19694e('0x121')){function _0x595879(){const _0xaf460f=_0x19694e;return this[_0xaf460f('0x1a2')](0x4,_0x13de24(_0x20ab23['$1']));}}else return this[_0x19694e('0x158')](Number(RegExp['$1']));}if(_0x35b4c8[_0x19694e('0x2f4')](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteJumpTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x35b4c8[_0x19694e('0x2f4')](/JUMP TO EVENT:[ ](\d+)/i)){const _0x237722=$gameMap[_0x19694e('0x414')](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x237722);}if(_0x35b4c8['match'](/JUMP TO PLAYER/i)){if(_0x19694e('0x20a')!==_0x19694e('0xe'))return this[_0x19694e('0x2cd')]($gamePlayer);else{function _0x59e4b0(){const _0x189a3f=_0x19694e,_0x2facd5=this[_0x189a3f('0x137')](this[_0x189a3f('0x2ce')]());return _0x397818['roundYWithDirection'](this['y'],_0x2facd5);}}}if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x2e276c=String(RegExp['$1']);return this['processMoveRouteMoveUntilStop'](_0x2e276c);}if(_0x35b4c8['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x19694e('0x205')!==_0x19694e('0x2d1')){const _0xcc652c=Number(RegExp['$1']),_0x2c57b0=Number(RegExp['$2']);return this[_0x19694e('0x1ca')](_0xcc652c,_0x2c57b0);}else{function _0x5e034b(){const _0x3a0b78=_0x19694e,_0x47ceb1=_0x47d440[_0x3a0b78('0x414')](_0x3316c5(_0x48b699['$1']));return this[_0x3a0b78('0x2f3')](_0x47ceb1);}}}if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE TO EVENT:[ ](\d+)/i)){if(_0x19694e('0xd4')===_0x19694e('0xd4')){const _0x154992=$gameMap[_0x19694e('0x414')](Number(RegExp['$1']));return this[_0x19694e('0xcb')](_0x154992);}else{function _0x169d98(){const _0x20ff21=_0x19694e,_0x2f640b=this[_0x20ff21('0x3f')](_0x70d9ec,_0x188604,!![]);if(_0x2f640b)this[_0x20ff21('0x3aa')](_0x2f640b);}}}if(_0x35b4c8['match'](/MOVE TO PLAYER/i)){if('UAjWB'===_0x19694e('0x2d5')){function _0x4a9083(){const _0x255d5c=_0x19694e;_0x45cc85['EventsMoveCore']['Game_Map_refresh'][_0x255d5c('0xca')](this),this[_0x255d5c('0x270')]();}}else return this['processMoveRouteMoveToCharacter']($gamePlayer);}if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x19694e('0x1a2')](0x1,Number(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE DOWN:[ ](\d+)/i))return this[_0x19694e('0x1a2')](0x2,Number(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x19694e('0x1a2')](0x3,Number(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x4,Number(RegExp['$1']));if(_0x35b4c8['match'](/MOVE RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE UPPER LEFT:[ ](\d+)/i)){if(_0x19694e('0x26b')!=='jiTko'){function _0x53b168(){const _0xe646de=_0x19694e;_0x1223fb[_0xe646de('0xbc')](_0x364d7b,_0x40566f),_0xadaf1[_0xe646de('0x35')](_0x4702dc[_0xe646de('0x429')]);}}else return this[_0x19694e('0x1a2')](0x7,Number(RegExp['$1']));}if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE UP:[ ](\d+)/i)){if(_0x19694e('0x393')==='xtXMg'){function _0x1f9921(){const _0xfe56d8=_0x19694e;return this[_0xfe56d8('0x12')](_0x313846);}}else return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));}if(_0x35b4c8[_0x19694e('0x2f4')](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x19694e('0x1a2')](0x9,Number(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/OPACITY:[ ](\d+)([%％])/i)){if('okYDE'==='NQvpI'){function _0x2c0a43(){const _0x53cd11=_0x19694e,_0xe1cd2c=_0x36d558[_0x53cd11('0x234')];this[_0x53cd11('0x332')]=this[_0x53cd11('0x33')]()[_0x53cd11('0x69')]>_0xe1cd2c;if(this[_0x53cd11('0x332')]&&_0x1592e2[_0x53cd11('0x201')]()){}}}else{const _0x4e56b1=Math[_0x19694e('0x391')](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x4e56b1[_0x19694e('0x208')](0x0,0xff));}}if(_0x35b4c8[_0x19694e('0x2f4')](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x5e3170=this[_0x19694e('0x65')]+Math[_0x19694e('0x391')](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x5e3170[_0x19694e('0x208')](0x0,0xff));}if(_0x35b4c8[_0x19694e('0x2f4')](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x104644=this[_0x19694e('0x65')]+Number(RegExp['$1']);return this[_0x19694e('0x3d0')](_0x104644[_0x19694e('0x208')](0x0,0xff));}if(_0x35b4c8['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0x19694e('0x376')](Number(RegExp['$1']));if(_0x35b4c8[_0x19694e('0x2f4')](/PATTERN UNLOCK/i))return this[_0x19694e('0x1db')]=![];if(_0x35b4c8[_0x19694e('0x2f4')](/POSE:[ ](.*)/i)){if(_0x19694e('0x87')!==_0x19694e('0x272')){const _0x2705c0=String(RegExp['$1'])[_0x19694e('0x1f8')]()['trim']();return this[_0x19694e('0xcd')](_0x2705c0);}else{function _0x1732c6(){const _0x5b8342=_0x19694e;_0x1fa5d8['_shadowSprite'][_0x5b8342('0x1f9')]=this[_0x5b8342('0x10d')](),_0x42f4ba[_0x5b8342('0x214')][_0x5b8342('0x57')]=_0x522175[_0x5b8342('0x236')](_0x2f400a['_shadowSprite'][_0x5b8342('0x1f9')]);}}}if(_0x35b4c8['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x12f311=Number(RegExp['$1']),_0x39f354=Number(RegExp['$2']);return this[_0x19694e('0x32c')](_0x12f311,_0x39f354);}if(_0x35b4c8[_0x19694e('0x2f4')](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x24a6b9=$gameMap[_0x19694e('0x414')](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x24a6b9);}if(_0x35b4c8[_0x19694e('0x2f4')](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToPlayer']($gamePlayer);if(_0x35b4c8[_0x19694e('0x2f4')](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x19694e('0x297')](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x35b4c8['match'](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if(_0x19694e('0x253')!==_0x19694e('0x253')){function _0xa0cc35(){const _0x5c741d=_0x19694e,_0x4d33d4=this[_0x5c741d('0x405')]();return _0x4d33d4?_0x4d33d4[_0x5c741d('0x2e')]:0x0;}}else{const _0x2463b0=$gameMap['event'](Number(RegExp['$1']));return this[_0x19694e('0x12')](_0x2463b0);}}if(_0x35b4c8['match'](/STEP AWAY FROM PLAYER/i))return this[_0x19694e('0x12')]($gamePlayer);if(_0x35b4c8[_0x19694e('0x2f4')](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x19694e('0x40')===_0x19694e('0x40'))return this[_0x19694e('0x54')](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x2de0b7(){const _0x37e2e5=_0x19694e;this[_0x37e2e5('0x299')](_0x212be1);}}}if(_0x35b4c8[_0x19694e('0x2f4')](/TURN TO EVENT:[ ](\d+)/i)){const _0x266fcf=$gameMap[_0x19694e('0x414')](Number(RegExp['$1']));return this[_0x19694e('0x339')](_0x266fcf);}if(_0x35b4c8['match'](/TURN TO PLAYER/i)){if(_0x19694e('0xa2')===_0x19694e('0xa2'))return this[_0x19694e('0x339')]($gamePlayer);else{function _0x20a423(){const _0x4458d4=_0x19694e;if(!_0x27e2f7&&_0x36a52f[_0x4458d4('0x202')]())return![];if(!_0x5c680d&&_0x279cbd[_0x4458d4('0x11b')]())return![];if([_0x4458d4('0x2c7'),_0x4458d4('0x287')][_0x4458d4('0xdb')](this[_0x4458d4('0x167')]()))return!![];return _0x26d79e[_0x4458d4('0x2ca')](this);}}}if(_0x35b4c8[_0x19694e('0x2f4')](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x19694e('0x24')](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x35b4c8[_0x19694e('0x2f4')](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x16e222=$gameMap[_0x19694e('0x414')](Number(RegExp['$1']));return this['turnAwayFromCharacter'](_0x16e222);}if(_0x35b4c8[_0x19694e('0x2f4')](/TURN AWAY FROM PLAYER/i))return this['turnAwayFromCharacter']($gamePlayer);if(_0x35b4c8['match'](/TURN LOWER LEFT/i))return this[_0x19694e('0x115')](0x1);if(_0x35b4c8[_0x19694e('0x2f4')](/TURN LOWER RIGHT/i)){if(_0x19694e('0x84')!==_0x19694e('0x84')){function _0x3fbc1d(){const _0x1aeb17=_0x19694e;return this[_0x1aeb17('0x54')](_0x499622(_0x60bef8['$1']),_0x5b1507(_0x1cb21c['$2']));}}else return this[_0x19694e('0x115')](0x3);}if(_0x35b4c8[_0x19694e('0x2f4')](/TURN UPPER LEFT/i))return this[_0x19694e('0x115')](0x7);if(_0x35b4c8['match'](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0x35b4c8['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x19694e('0x247')](RegExp['$1'],RegExp['$2']);if(_0x35b4c8['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x19694e('0x24f')](RegExp['$1'],RegExp['$2']);if(_0x35b4c8[_0x19694e('0x2f4')](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x19694e('0x316')](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x35b4c8[_0x19694e('0x2f4')](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x19694e('0x26e')!=='vjELn'){function _0x29a241(){const _0x50c594=_0x19694e;return _0x9d02d9['isPlaytest']()&&_0x4a28d6['log'](_0x50c594('0x39e')['format'](_0x98b505)),![];}}else{const _0x479dda=$gameMap['event'](Number(RegExp['$1']));return this[_0x19694e('0x3ef')](_0x479dda);}}if(_0x35b4c8[_0x19694e('0x2f4')](/TELEPORT TO PLAYER/i))return this[_0x19694e('0x3ef')]($gamePlayer);try{VisuMZ[_0x19694e('0x261')][_0x19694e('0x3ab')]['call'](this,_0x48bce2);}catch(_0x43597d){if($gameTemp[_0x19694e('0x201')]())console[_0x19694e('0x1b7')](_0x43597d);}},Game_Character[_0x3b3036('0x1d7')]['processMoveRouteAnimation']=function(_0x1b41f2){const _0x3b8df0=_0x3b3036;$gameTemp[_0x3b8df0('0x2ae')]([this],_0x1b41f2);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x23b')]=function(_0x5ef982){const _0x602112=_0x3b3036;let _0xca9d24=0x0;switch(_0x5ef982[_0x602112('0x1f8')]()[_0x602112('0x14d')]()){case'!':case _0x602112('0x3d4'):_0xca9d24=0x1;break;case'?':case _0x602112('0x1a'):_0xca9d24=0x2;break;case'MUSIC':case _0x602112('0x26c'):case _0x602112('0x136'):case _0x602112('0x49'):case _0x602112('0x10b'):_0xca9d24=0x3;break;case _0x602112('0x3a'):case'LOVE':_0xca9d24=0x4;break;case _0x602112('0x383'):_0xca9d24=0x5;break;case _0x602112('0x186'):_0xca9d24=0x6;break;case'COBWEB':case _0x602112('0x390'):case'FRUSTRATION':_0xca9d24=0x7;break;case _0x602112('0x41d'):case _0x602112('0x2da'):_0xca9d24=0x8;break;case'LIGHT':case _0x602112('0x30c'):case _0x602112('0xc'):case _0x602112('0x410'):case _0x602112('0x399'):_0xca9d24=0x9;break;case'Z':case'ZZ':case _0x602112('0x7f'):case _0x602112('0x2c3'):_0xca9d24=0xa;break;case'USER-DEFINED\x201':_0xca9d24=0xb;break;case _0x602112('0x2b1'):_0xca9d24=0xc;break;case'USER-DEFINED\x203':_0xca9d24=0xd;break;case _0x602112('0x145'):_0xca9d24=0xe;break;case _0x602112('0x2d3'):_0xca9d24=0xf;break;}$gameTemp[_0x602112('0xbf')](this,_0xca9d24);},Game_Character['prototype'][_0x3b3036('0x187')]=function(_0x52a6ff){const _0x4be7d5=_0x3b3036;_0x52a6ff+=this['_opacity'],this[_0x4be7d5('0x3d0')](_0x52a6ff[_0x4be7d5('0x208')](0x0,0xff));if(this[_0x4be7d5('0x65')]<0xff)this['_moveRouteIndex']--;},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x74')]=function(_0x2b8113){const _0x505a26=_0x3b3036;_0x2b8113=this['_opacity']-_0x2b8113,this[_0x505a26('0x3d0')](_0x2b8113['clamp'](0x0,0xff));if(this[_0x505a26('0x65')]>0x0)this[_0x505a26('0x192')]--;},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x1c4')]=function(_0x41a885){const _0x12ebed=_0x3b3036,_0x1e21ff=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x5ae5ad=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x307809=this[_0x12ebed('0x2ce')](),_0x5e6382=(_0x41a885===_0x12ebed('0x240')?_0x1e21ff:_0x5ae5ad)[_0x307809],_0x8b2acf=(_0x41a885==='left'?_0x5ae5ad:_0x1e21ff)[_0x307809];if(this[_0x12ebed('0x104')](this['x'],this['y'],_0x5e6382)){if('pRlqm'!==_0x12ebed('0x33a')){if(_0x41a885===_0x12ebed('0x240')){if(_0x12ebed('0xb7')!=='nyYOQ'){function _0x46f0c7(){return!![];}}else this[_0x12ebed('0x11c')]();}else this[_0x12ebed('0x188')]();}else{function _0x49bfa5(){const _0x899f60=_0x12ebed;return this[_0x899f60('0xc4')]();}}}else{if(!this[_0x12ebed('0x104')](this['x'],this['y'],this[_0x12ebed('0x2ce')]())){if(this['canPass'](this['x'],this['y'],_0x8b2acf)){if(_0x41a885==='left')this[_0x12ebed('0x188')]();else{if(_0x12ebed('0x16d')===_0x12ebed('0x16d'))this[_0x12ebed('0x11c')]();else{function _0x3423e4(){const _0x200cac=_0x12ebed;_0x122b38['EventsMoveCore'][_0x200cac('0xeb')][_0x200cac('0xa9')](_0x3caf25);}}}}else{if(_0x12ebed('0x307')!==_0x12ebed('0x59'))this[_0x12ebed('0x312')]();else{function _0x2122c2(){const _0xd88cc5=_0x12ebed;_0x17f3d0['EventsMoveCore'][_0xd88cc5('0x3b2')][_0xd88cc5('0xca')](this),this[_0xd88cc5('0x1d')]();}}}}}this[_0x12ebed('0x104')](this['x'],this['y'],this[_0x12ebed('0x2ce')]())&&this['moveForward']();},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x40e')]=function(_0x5d4e93){const _0x261155=_0x3b3036;if(ImageManager[_0x261155('0x2f0')](this['_characterName']))return;_0x5d4e93=_0x5d4e93['clamp'](0x0,0x7),this[_0x261155('0x230')](this[_0x261155('0x389')],_0x5d4e93);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x158')]=function(_0x3b67e1){const _0x119409=_0x3b3036;switch(this[_0x119409('0x2ce')]()){case 0x1:this[_0x119409('0x13f')](-_0x3b67e1,_0x3b67e1);break;case 0x2:this[_0x119409('0x13f')](0x0,_0x3b67e1);break;case 0x3:this['jump'](_0x3b67e1,_0x3b67e1);break;case 0x4:this[_0x119409('0x13f')](-_0x3b67e1,0x0);break;case 0x6:this[_0x119409('0x13f')](_0x3b67e1,0x0);break;case 0x7:this[_0x119409('0x13f')](-_0x3b67e1,-_0x3b67e1);break;case 0x8:this['jump'](0x0,-_0x3b67e1);break;case 0x9:this[_0x119409('0x13f')](_0x3b67e1,-_0x3b67e1);break;}},Game_Character[_0x3b3036('0x1d7')]['processMoveRouteJumpTo']=function(_0x1bf021,_0x4a1767){const _0x54d47d=_0x3b3036,_0x52cbf7=Math['round'](_0x1bf021-this['x']),_0x2affa8=Math[_0x54d47d('0x391')](_0x4a1767-this['y']);this[_0x54d47d('0x13f')](_0x52cbf7,_0x2affa8);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x2cd')]=function(_0x5c92cc){if(_0x5c92cc)this['processMoveRouteJumpTo'](_0x5c92cc['x'],_0x5c92cc['y']);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x32c')]=function(_0x24a512,_0x231de4){const _0xd8810f=_0x3b3036;let _0x3a3d9e=0x0;$gameMap[_0xd8810f('0x25e')]()?_0x3a3d9e=this['findDiagonalDirectionTo'](_0x24a512,_0x231de4):_0x3a3d9e=this[_0xd8810f('0x1d0')](_0x24a512,_0x231de4),this[_0xd8810f('0x3aa')](_0x3a3d9e),this[_0xd8810f('0x130')](!![]);},Game_Character['prototype'][_0x3b3036('0x1c0')]=function(_0x7e00f6){const _0x44b9c8=_0x3b3036;if(_0x7e00f6)this[_0x44b9c8('0x32c')](_0x7e00f6['x'],_0x7e00f6['y']);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x152')]=function(_0x713fb2,_0x4a47a0){const _0x53ca82=_0x3b3036,_0x4d6861=this[_0x53ca82('0x1f4')](_0x713fb2),_0x580fe8=this[_0x53ca82('0x24a')](_0x4a47a0);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x36a')]=function(_0x5dc191){const _0xf0dd21=_0x3b3036,_0x5b8a00=['','LOWER\x20LEFT',_0xf0dd21('0x109'),'LOWER\x20RIGHT',_0xf0dd21('0xde'),'','RIGHT','UPPER\x20LEFT','UP',_0xf0dd21('0x34c')],_0x2d5b45=_0x5b8a00[_0xf0dd21('0x44')](_0x5dc191[_0xf0dd21('0x1f8')]()[_0xf0dd21('0x14d')]());if(directioin<=0x0)return;this[_0xf0dd21('0x104')](this['x'],this['y'],_0x2d5b45)&&(this[_0xf0dd21('0x3aa')](_0x2d5b45),this[_0xf0dd21('0x192')]-=0x1);},Game_Character[_0x3b3036('0x1d7')]['processMoveRouteMoveTo']=function(_0x588fd7,_0x3e4895){const _0x3ed789=_0x3b3036;this['processMoveRouteStepTo'](_0x588fd7,_0x3e4895);if(this['x']!==_0x588fd7||this['y']!==_0x3e4895)this[_0x3ed789('0x192')]--;},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0xcb')]=function(_0x3042bd){const _0x522c1f=_0x3b3036;if(_0x3042bd)this[_0x522c1f('0x1ca')](_0x3042bd['x'],_0x3042bd['y']);},Game_Character['prototype']['processMoveRouteMoveRepeat']=function(_0x40280d,_0x221b34){const _0x2a21a9=_0x3b3036;_0x221b34=_0x221b34||0x0;const _0x3e14ce={'code':0x1,'indent':null,'parameters':[]};_0x3e14ce[_0x2a21a9('0x26f')]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x40280d],this['_moveRoute'][_0x2a21a9('0x3fd')][this[_0x2a21a9('0x192')]][_0x2a21a9('0xf7')][0x0]='';while(_0x221b34--){if(_0x2a21a9('0x97')!==_0x2a21a9('0x37a'))this[_0x2a21a9('0x347')]['list']['splice'](this['_moveRouteIndex']+0x1,0x0,_0x3e14ce);else{function _0x580915(){const _0x59aee8=_0x2a21a9;this[_0x59aee8('0x11c')]();}}}},Game_Character['prototype'][_0x3b3036('0x376')]=function(_0x26ca50){const _0x36ebfd=_0x3b3036;this[_0x36ebfd('0x1db')]=!![],this[_0x36ebfd('0x41')](_0x26ca50);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x247')]=function(_0x71cd5f,_0x2d7a1e){const _0x3d1eb0=_0x3b3036;if(this===$gamePlayer)return;const _0x13ec4a=[this[_0x3d1eb0('0x1ce')],this[_0x3d1eb0('0x2e')],'A'];if(_0x71cd5f[_0x3d1eb0('0x2f4')](/\b[ABCD]\b/i)){if(_0x3d1eb0('0x6')!==_0x3d1eb0('0xd7'))_0x13ec4a[0x2]=String(_0x71cd5f)[_0x3d1eb0('0x70')](0x0)['toUpperCase']()[_0x3d1eb0('0x14d')]();else{function _0x562a69(){this['_alwaysUpdateMove']=!![];}}}else _0x13ec4a[0x2]=_0x3d1eb0('0x108')[_0x3d1eb0('0x296')](_0x71cd5f);switch(_0x2d7a1e['toUpperCase']()[_0x3d1eb0('0x14d')]()){case'ON':case _0x3d1eb0('0x26'):$gameSelfSwitches[_0x3d1eb0('0x3c1')](_0x13ec4a,!![]);break;case _0x3d1eb0('0x41b'):case _0x3d1eb0('0x1a1'):$gameSelfSwitches[_0x3d1eb0('0x3c1')](_0x13ec4a,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x13ec4a,!$gameSelfSwitches['value'](_0x13ec4a));break;}},Game_Character['prototype'][_0x3b3036('0x24f')]=function(_0x558fc4,_0x13d6e5){const _0x5edefd=_0x3b3036;if(this===$gamePlayer)return;const _0x2b8e95=[this['_mapId'],this[_0x5edefd('0x2e')],'Self\x20Variable\x20%1'[_0x5edefd('0x296')](switchId)];$gameSelfSwitches[_0x5edefd('0x3c1')](_0x2b8e95,Number(_0x13d6e5));},Game_Character['prototype']['processMoveRouteTeleportTo']=function(_0x5d9981,_0x21a2d0){this['locate'](_0x5d9981,_0x21a2d0);},Game_Character[_0x3b3036('0x1d7')]['processMoveRouteTeleportToCharacter']=function(_0x4f5667){const _0x334fa0=_0x3b3036;if(_0x4f5667)this[_0x334fa0('0x316')](_0x4f5667['x'],_0x4f5667['y']);},Game_Character[_0x3b3036('0x1d7')]['turnRight90']=function(){const _0x5ad53b=_0x3b3036;switch(this[_0x5ad53b('0x2ce')]()){case 0x1:this[_0x5ad53b('0x115')](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this[_0x5ad53b('0x115')](0x1);break;case 0x4:this[_0x5ad53b('0x115')](0x8);break;case 0x6:this[_0x5ad53b('0x115')](0x2);break;case 0x7:this[_0x5ad53b('0x115')](0x9);break;case 0x8:this[_0x5ad53b('0x115')](0x6);break;case 0x9:this[_0x5ad53b('0x115')](0x3);break;}},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x11c')]=function(){const _0x4f1b80=_0x3b3036;switch(this[_0x4f1b80('0x2ce')]()){case 0x1:this[_0x4f1b80('0x115')](0x3);break;case 0x2:this[_0x4f1b80('0x115')](0x6);break;case 0x3:this[_0x4f1b80('0x115')](0x9);break;case 0x4:this[_0x4f1b80('0x115')](0x2);break;case 0x6:this[_0x4f1b80('0x115')](0x8);break;case 0x7:this[_0x4f1b80('0x115')](0x1);break;case 0x8:this[_0x4f1b80('0x115')](0x4);break;case 0x9:this[_0x4f1b80('0x115')](0x7);break;}},Game_Character[_0x3b3036('0x1d7')]['getDirectionToPoint']=function(_0x2b2293,_0x4df657,_0x598cc3){const _0x2f01b3=_0x3b3036,_0x1d843d=this['deltaXFrom'](_0x2b2293),_0x1798fb=this[_0x2f01b3('0x24a')](_0x4df657);if($gameMap[_0x2f01b3('0x25e')]()){if(_0x598cc3||this[_0x2f01b3('0x3e')]()){if('ZTrZf'!==_0x2f01b3('0x24b')){function _0x1e2e90(){const _0x3d6f29=_0x2f01b3;_0x1c347e[_0x3d6f29('0x261')][_0x3d6f29('0x89')]['call'](this),this[_0x3d6f29('0x57')][_0x3d6f29('0x31b')](this['updateBitmapSmoothing'][_0x3d6f29('0x39d')](this));}}else{if(_0x1d843d>0x0&&_0x1798fb<0x0)return 0x1;if(_0x1d843d<0x0&&_0x1798fb<0x0)return 0x3;if(_0x1d843d>0x0&&_0x1798fb>0x0)return 0x7;if(_0x1d843d<0x0&&_0x1798fb>0x0)return 0x9;}}}if(Math[_0x2f01b3('0x1b3')](_0x1d843d)>Math[_0x2f01b3('0x1b3')](_0x1798fb)){if(_0x2f01b3('0x330')!=='NIpII'){function _0x4f7379(){const _0x3fd68e=_0x2f01b3,_0xf45ec6=_0x57c1ae[_0x3fd68e('0x414')](_0x266e04(_0x5c412f['$1']));return this[_0x3fd68e('0x1c0')](_0xf45ec6);}}else return _0x1d843d>0x0?0x4:0x6;}else{if(_0x1798fb!==0x0){if('yowli'!==_0x2f01b3('0x403'))return _0x1798fb>0x0?0x8:0x2;else{function _0x4e6cc9(){const _0x116d18=_0x2f01b3;return this[_0x116d18('0x293')](_0x11a456);}}}}return 0x0;},Game_Character['prototype'][_0x3b3036('0x4b')]=function(_0x248612,_0x498310,_0x3be64f){const _0x44c00a=_0x3b3036,_0x1d1fa5=this['deltaXFrom'](_0x248612),_0x67e1ee=this['deltaYFrom'](_0x498310);if($gameMap[_0x44c00a('0x25e')]()){if(_0x3be64f||this[_0x44c00a('0x3e')]()){if(_0x44c00a('0x2bc')==='tyHro'){if(_0x1d1fa5>0x0&&_0x67e1ee<0x0)return 0x9;if(_0x1d1fa5<0x0&&_0x67e1ee<0x0)return 0x7;if(_0x1d1fa5>0x0&&_0x67e1ee>0x0)return 0x3;if(_0x1d1fa5<0x0&&_0x67e1ee>0x0)return 0x1;}else{function _0x1f86eb(){const _0x2aea83=_0x44c00a;if(this['_SavedEventLocations']===_0x36c1a3)this[_0x2aea83('0x2a')]();if(!_0x2fa4f8)return;const _0x1d4277=_0x2aea83('0x209')[_0x2aea83('0x296')](_0x5d7f6d[_0x2aea83('0x1ce')],_0x5b02ea[_0x2aea83('0x2e')]);this['_SavedEventLocations'][_0x1d4277]={'direction':_0x13127c[_0x2aea83('0x2ce')](),'x':_0x570373[_0x2aea83('0x391')](_0x154601['x']),'y':_0x56163f[_0x2aea83('0x391')](_0x1fdd5d['y']),'pageIndex':_0x25fee8[_0x2aea83('0x35c')],'moveRouteIndex':_0x522cf6[_0x2aea83('0x192')]};}}}}if(Math[_0x44c00a('0x1b3')](_0x1d1fa5)>Math[_0x44c00a('0x1b3')](_0x67e1ee)){if(_0x44c00a('0xa')!==_0x44c00a('0x36e'))return _0x1d1fa5>0x0?0x6:0x4;else{function _0x2f5326(){const _0x401cc6=_0x44c00a;this[_0x401cc6('0x168')](_0xbcb17,_0x1555a4);}}}else{if(_0x67e1ee!==0x0)return _0x67e1ee>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x54')]=function(_0x376b72,_0x34ec28){const _0x11b6ec=_0x3b3036,_0x195af6=this[_0x11b6ec('0x3f')](_0x376b72,_0x34ec28,!![]);if(_0x195af6)this[_0x11b6ec('0x3aa')](_0x195af6);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x297')]=function(_0x4f2f05,_0x29b6e4){const _0x183ead=_0x3b3036,_0x15bbf3=this['getDirectionFromPoint'](_0x4f2f05,_0x29b6e4,!![]);if(_0x15bbf3)this[_0x183ead('0x3aa')](_0x15bbf3);},Game_Character[_0x3b3036('0x1d7')][_0x3b3036('0x1b')]=function(_0x20ce35,_0x392a94){const _0x270446=_0x3b3036,_0x5df37f=this[_0x270446('0x3f')](_0x20ce35,_0x392a94,![]);if(_0x5df37f)this[_0x270446('0x115')](_0x5df37f);},Game_Character['prototype'][_0x3b3036('0x24')]=function(_0x6650e7,_0x194506){const _0x37fc18=_0x3b3036,_0x3c52b5=this[_0x37fc18('0x4b')](_0x6650e7,_0x194506,![]);if(_0x3c52b5)this[_0x37fc18('0x115')](_0x3c52b5);},Game_Character['prototype'][_0x3b3036('0x3c8')]=function(_0x570320){if(_0x570320)this['moveTowardPoint'](_0x570320['x'],_0x570320['y']);},Game_Character['prototype'][_0x3b3036('0x12')]=function(_0x2b4a53){const _0x370a22=_0x3b3036;if(_0x2b4a53)this[_0x370a22('0x297')](_0x2b4a53['x'],_0x2b4a53['y']);},Game_Character[_0x3b3036('0x1d7')]['turnTowardCharacter']=function(_0x52b3b2){const _0x357c2c=_0x3b3036;if(_0x52b3b2)this[_0x357c2c('0x1b')](_0x52b3b2['x'],_0x52b3b2['y']);},Game_Character['prototype'][_0x3b3036('0x2f3')]=function(_0x398a5e){const _0x16e718=_0x3b3036;if(_0x398a5e)this[_0x16e718('0x24')](_0x398a5e['x'],_0x398a5e['y']);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x1a3')]=Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x2c5')],Game_Player[_0x3b3036('0x1d7')]['isDashing']=function(){const _0x2ba6ce=_0x3b3036;if(this[_0x2ba6ce('0x19a')])return!![];return VisuMZ[_0x2ba6ce('0x261')][_0x2ba6ce('0x1a3')]['call'](this);},Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x71')]=function(){const _0x1f5804=_0x3b3036;return this[_0x1f5804('0x2c5')]()&&(this['isMoving']()||this['getInputDirection']()!==0x0&&this[_0x1f5804('0x104')](this['_x'],this['_y'],this[_0x1f5804('0x2fb')]())||$gameTemp['isDestinationValid']());},VisuMZ['EventsMoveCore'][_0x3b3036('0x134')]=Game_Player['prototype'][_0x3b3036('0x2fb')],Game_Player[_0x3b3036('0x1d7')]['getInputDirection']=function(){const _0x41a42c=_0x3b3036;return $gameMap[_0x41a42c('0x25e')]()?this[_0x41a42c('0x295')]():VisuMZ['EventsMoveCore'][_0x41a42c('0x134')][_0x41a42c('0xca')](this);},Game_Player['prototype']['getInputDir8']=function(){return Input['dir8'];},Game_Player[_0x3b3036('0x1d7')]['moveByInput']=function(){const _0x5bebff=_0x3b3036;if($gameSystem['isPlayerControlDisabled']())return 0x0;if(!this[_0x5bebff('0x129')]()&&this[_0x5bebff('0x20d')]()){let _0x53eaa6=this[_0x5bebff('0x2fb')]();if(_0x53eaa6>0x0)$gameTemp[_0x5bebff('0x42d')]();else{if($gameTemp['isDestinationValid']()){const _0x171086=$gameTemp[_0x5bebff('0x35e')](),_0x57cf4c=$gameTemp[_0x5bebff('0x1a5')]();if($gameMap[_0x5bebff('0x25e')]()){if('YyMWR'!==_0x5bebff('0x157'))_0x53eaa6=this['findDiagonalDirectionTo'](_0x171086,_0x57cf4c);else{function _0x219e3a(){const _0x5ec22c=_0x5bebff;this[_0x5ec22c('0x125')]='',this['_poseDuration']=0x0;}}}else{if(_0x5bebff('0xfb')===_0x5bebff('0xfb'))_0x53eaa6=this[_0x5bebff('0x1d0')](_0x171086,_0x57cf4c);else{function _0x10f74f(){const _0x26f1d8=_0x5bebff;this[_0x26f1d8('0x133')]=![];}}}}}_0x53eaa6>0x0?(this[_0x5bebff('0x14e')]=this[_0x5bebff('0x14e')]||0x0,this[_0x5bebff('0x12a')]()?this[_0x5bebff('0x115')](_0x53eaa6):this[_0x5bebff('0x19c')](_0x53eaa6),this['_inputTime']++):this[_0x5bebff('0x14e')]=0x0;}},Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x12a')]=function(){const _0x424677=_0x3b3036,_0x292573=VisuMZ[_0x424677('0x261')]['Settings']['Movement'];if(!_0x292573[_0x424677('0x31e')])return![];if($gameTemp[_0x424677('0x3bd')]())return![];if(this[_0x424677('0x2c5')]()||this[_0x424677('0x129')]()||this[_0x424677('0x1d6')]())return![];return this[_0x424677('0x14e')]<_0x292573['TurnInPlaceDelay'];},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x1f6')]=Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x19c')],Game_Player['prototype'][_0x3b3036('0x19c')]=function(_0x21ec6c){const _0x4dc5f1=_0x3b3036;$gameMap[_0x4dc5f1('0x25e')]()?this[_0x4dc5f1('0x3aa')](_0x21ec6c):VisuMZ[_0x4dc5f1('0x261')]['Game_Player_executeMove']['call'](this,_0x21ec6c);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x3cb')]=Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x352')],Game_Player[_0x3b3036('0x1d7')]['isMapPassable']=function(_0x414c2b,_0x2e91fd,_0x7c7a85){const _0x1b2946=_0x3b3036;if($gameMap[_0x1b2946('0x24c')](_0x414c2b,_0x2e91fd,_0x7c7a85,'player'))return!![];if($gameMap[_0x1b2946('0x37b')](_0x414c2b,_0x2e91fd,_0x7c7a85,_0x1b2946('0x27c')))return![];return VisuMZ[_0x1b2946('0x261')][_0x1b2946('0x3cb')][_0x1b2946('0xca')](this,_0x414c2b,_0x2e91fd,_0x7c7a85);},VisuMZ[_0x3b3036('0x261')]['Game_Player_checkEventTriggerHere']=Game_Player[_0x3b3036('0x1d7')]['checkEventTriggerHere'],Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x373')]=function(_0x3c6784){const _0x1572fe=_0x3b3036;VisuMZ['EventsMoveCore'][_0x1572fe('0x1a9')][_0x1572fe('0xca')](this,_0x3c6784);if(this[_0x1572fe('0xa0')]()){if('nPuPT'===_0x1572fe('0x32d')){function _0x49c7ca(){const _0x5c12f9=_0x1572fe;_0x3a5106['CPC']===_0x66da60&&_0x575edf['EventsMoveCore']['CustomPageConditions'][_0x5c12f9('0xa9')](_0x20634c);if(_0x2f8754[_0x5c12f9('0x196')][_0x5c12f9('0x69')]>0x0)return _0x193984['EventsMoveCore']['CustomPageConditions'][_0x5c12f9('0x2af')](_0xf64af0[_0x5c12f9('0x196')],0x0);return!![];}}else{this[_0x1572fe('0x10e')](_0x3c6784);if(_0x3c6784['includes'](0x0)&&this[_0x1572fe('0x6c')]()==='standing'){if(_0x1572fe('0x38f')===_0x1572fe('0x38f'))this[_0x1572fe('0x2e8')](this['x'],this['y']);else{function _0x5c56a3(){const _0x2de704=_0x1572fe;return _0x1fc3c8[_0x2de704('0x261')]['Game_Variables_value'][_0x2de704('0xca')](this,_0x5b79b9);}}}else(_0x3c6784[_0x1572fe('0xdb')](0x1)||_0x3c6784[_0x1572fe('0xdb')](0x2))&&this['startMapCommonEventOnTouch']();}}},VisuMZ['EventsMoveCore'][_0x3b3036('0x2a2')]=Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x55')],Game_Player[_0x3b3036('0x1d7')]['checkEventTriggerThere']=function(_0x14d0b5){const _0x6d9a10=_0x3b3036;VisuMZ[_0x6d9a10('0x261')][_0x6d9a10('0x2a2')][_0x6d9a10('0xca')](this,_0x14d0b5);if(this[_0x6d9a10('0xa0')]()&&_0x14d0b5['includes'](0x0)&&this[_0x6d9a10('0x6c')]()===_0x6d9a10('0x3b7')){if(_0x6d9a10('0xec')!=='dAneo'){function _0x4160a7(){const _0x56a898=_0x6d9a10;if(this[_0x56a898('0x33c')]===_0x9c32f)this[_0x56a898('0x2a')]();const _0x5d7a16=_0x56a898('0x209')['format'](_0x1ac3c1,_0x2b88be);this['_PreservedEventMorphData'][_0x5d7a16]={'template':_0xf4de4f,'mapId':_0x39c957,'eventId':_0x353dba};}}else{const _0x3ddcf2=this[_0x6d9a10('0x2ce')](),_0x2ef232=$gameMap['roundXWithDirection'](this['x'],_0x3ddcf2),_0x195f1e=$gameMap[_0x6d9a10('0xc9')](this['y'],_0x3ddcf2);this[_0x6d9a10('0x2e8')](_0x2ef232,_0x195f1e);}}},Game_Player[_0x3b3036('0x1d7')]['checkEventTriggerEventsMoveCore']=function(_0x280234){const _0x16d9b4=_0x3b3036;if($gameMap[_0x16d9b4('0x202')]())return;if($gameMap[_0x16d9b4('0x11b')]())return;const _0x2596b4=$gameMap[_0x16d9b4('0x33')]();for(const _0x15cce2 of _0x2596b4){if(_0x16d9b4('0x298')!==_0x16d9b4('0x265')){if(!_0x15cce2)continue;if(!_0x15cce2['isTriggerIn'](_0x280234))continue;if(this[_0x16d9b4('0x1c3')](_0x15cce2))return _0x15cce2[_0x16d9b4('0x3e8')]();if(this[_0x16d9b4('0x2ca')](_0x15cce2))return _0x15cce2['start']();}else{function _0x1f2a33(){_0x41f61d[_0x23c4a6]['f']<_0x4ea184[_0x416f8a]['f']&&(_0xac6f80=_0x27358d);}}}},Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x1c3')]=function(_0x6632b4){const _0x2e30e1=_0x3b3036;if($gameMap[_0x2e30e1('0x202')]())return![];if($gameMap[_0x2e30e1('0x11b')]())return![];return _0x6632b4['activationRegionList']()['includes'](this[_0x2e30e1('0xbd')]());},Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x2ca')]=function(_0x56dd1d){const _0x131c22=_0x3b3036;if($gameMap['isEventRunning']())return![];if($gameMap[_0x131c22('0x11b')]())return![];if([_0x131c22('0x2c7'),_0x131c22('0x287')]['includes'](_0x56dd1d[_0x131c22('0x167')]()))return![];const _0x19116e=_0x56dd1d[_0x131c22('0x167')](),_0x533d00=_0x56dd1d[_0x131c22('0xb')]();switch(_0x19116e){case _0x131c22('0x362'):const _0x5d3f9a=$gameMap[_0x131c22('0x1e9')](this['x'],this['y'],_0x56dd1d['x'],_0x56dd1d['y']);return _0x56dd1d[_0x131c22('0xb')]()>=_0x5d3f9a;break;case _0x131c22('0x425'):return _0x533d00>=Math[_0x131c22('0x1b3')](_0x56dd1d[_0x131c22('0x1f4')](this['x']))&&_0x533d00>=Math['abs'](_0x56dd1d[_0x131c22('0x24a')](this['y']));break;case'row':return _0x533d00>=Math[_0x131c22('0x1b3')](_0x56dd1d[_0x131c22('0x24a')](this['y']));break;case'column':return _0x533d00>=Math[_0x131c22('0x1b3')](_0x56dd1d['deltaXFrom'](this['x']));break;case _0x131c22('0x113'):return![];break;}},Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x2e8')]=function(_0x808a60,_0x29283a){const _0x17c138=_0x3b3036;if($gameMap[_0x17c138('0x202')]())return;if($gameMap['isAnyEventStarting']())return;let _0x46f15a=VisuMZ[_0x17c138('0x261')][_0x17c138('0x239')][_0x17c138('0x3af')],_0x2b3af3=$gameMap[_0x17c138('0xbd')](_0x808a60,_0x29283a);const _0x564b5b=_0x17c138('0x3c0')[_0x17c138('0x296')](_0x2b3af3);_0x46f15a[_0x564b5b]&&$gameTemp[_0x17c138('0xd')](_0x46f15a[_0x564b5b]);},Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x6c')]=function(){const _0x22e9f4=_0x3b3036;return VisuMZ[_0x22e9f4('0x261')][_0x22e9f4('0x239')]['RegionOkTarget'];},Game_Player['prototype']['startMapCommonEventOnTouch']=function(){const _0x5d221b=_0x3b3036;if($gameMap[_0x5d221b('0x202')]())return;if($gameMap['isAnyEventStarting']())return;let _0x2e4080=VisuMZ['EventsMoveCore']['Settings']['RegionTouch'];const _0x3029dc='Region%1'[_0x5d221b('0x296')](this[_0x5d221b('0xbd')]());if(_0x2e4080[_0x3029dc]){if('IAGue'===_0x5d221b('0x38e'))$gameTemp[_0x5d221b('0xd')](_0x2e4080[_0x3029dc]);else{function _0xd09f8f(){const _0x36b41b=_0x5d221b,_0x35c91d=this[_0x36b41b('0x137')](this[_0x36b41b('0x2ce')]());return _0x4718b4[_0x36b41b('0x421')](this['x'],_0x35c91d);}}}},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x3ea')]=Game_Player[_0x3b3036('0x1d7')][_0x3b3036('0x401')],Game_Player[_0x3b3036('0x1d7')]['increaseSteps']=function(){const _0x239b0d=_0x3b3036;VisuMZ[_0x239b0d('0x261')][_0x239b0d('0x3ea')][_0x239b0d('0xca')](this),VisuMZ[_0x239b0d('0x198')](0x0);},Game_Follower[_0x3b3036('0x1d7')][_0x3b3036('0x2c5')]=function(){const _0x21f689=_0x3b3036;return $gamePlayer[_0x21f689('0x2c5')]();},Game_Follower[_0x3b3036('0x1d7')][_0x3b3036('0x71')]=function(){const _0x30910b=_0x3b3036;return $gamePlayer[_0x30910b('0x71')]();},Game_Follower[_0x3b3036('0x1d7')][_0x3b3036('0xf8')]=function(){const _0x2a20e4=_0x3b3036;return $gamePlayer[_0x2a20e4('0xf8')]();},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x360')]=Game_Vehicle[_0x3b3036('0x1d7')][_0x3b3036('0x352')],Game_Vehicle[_0x3b3036('0x1d7')][_0x3b3036('0x352')]=function(_0x269509,_0x502e16,_0x339c21){const _0x555976=_0x3b3036;if($gameMap[_0x555976('0x24c')](_0x269509,_0x502e16,_0x339c21,this[_0x555976('0x116')]))return!![];if($gameMap[_0x555976('0x37b')](_0x269509,_0x502e16,_0x339c21,this[_0x555976('0x116')]))return![];return VisuMZ[_0x555976('0x261')][_0x555976('0x360')][_0x555976('0xca')](this,_0x269509,_0x502e16,_0x339c21);},Game_Vehicle['prototype'][_0x3b3036('0x237')]=function(_0x59095a,_0x53ba15,_0x4fe5e7){const _0x5d051c=_0x3b3036;if($gameMap[_0x5d051c('0x24c')](_0x59095a,_0x53ba15,_0x4fe5e7,this[_0x5d051c('0x116')]))return!![];if($gameMap[_0x5d051c('0x37b')](_0x59095a,_0x53ba15,_0x4fe5e7,this['_type']))return![];return VisuMZ[_0x5d051c('0x261')][_0x5d051c('0x14a')]['call']($gamePlayer,_0x59095a,_0x53ba15,_0x4fe5e7);},VisuMZ['EventsMoveCore'][_0x3b3036('0x1c5')]=Game_Vehicle[_0x3b3036('0x1d7')]['isLandOk'],Game_Vehicle['prototype'][_0x3b3036('0x2f1')]=function(_0x2a7eb8,_0x5cda40,_0x4d7e8c){const _0x50866c=_0x3b3036;if($gameMap[_0x50866c('0x340')](_0x2a7eb8,_0x5cda40,_0x4d7e8c,this['_type']))return!![];const _0x351d6b=this[_0x50866c('0x116')][_0x50866c('0x70')](0x0)[_0x50866c('0x1f8')]()+this['_type'][_0x50866c('0x2e6')](0x1),_0x44b9c9=_0x50866c('0x1d2')[_0x50866c('0x296')](_0x351d6b);if(VisuMZ[_0x50866c('0x261')]['Settings'][_0x50866c('0x135')][_0x44b9c9])return![];else{if(_0x50866c('0xe6')==='ufsVn')return VisuMZ[_0x50866c('0x261')]['Game_Vehicle_isLandOk'][_0x50866c('0xca')](this,_0x2a7eb8,_0x5cda40,_0x4d7e8c);else{function _0x117825(){const _0xd86fa8=_0x50866c;_0x5e6aba[_0xd86fa8('0x261')][_0xd86fa8('0xd6')][_0xd86fa8('0xca')](this),this[_0xd86fa8('0x374')]();}}}},VisuMZ['EventsMoveCore'][_0x3b3036('0x25f')]=Game_Vehicle[_0x3b3036('0x1d7')][_0x3b3036('0x3db')],Game_Vehicle[_0x3b3036('0x1d7')]['initMoveSpeed']=function(){const _0x5918cc=_0x3b3036;VisuMZ['EventsMoveCore']['Game_Vehicle_initMoveSpeed'][_0x5918cc('0xca')](this);const _0x14db5c=VisuMZ['EventsMoveCore'][_0x5918cc('0x239')][_0x5918cc('0x257')];if(this[_0x5918cc('0x242')]()){if(_0x14db5c[_0x5918cc('0x2ed')])this['setMoveSpeed'](_0x14db5c[_0x5918cc('0x2ed')]);}else{if(this[_0x5918cc('0x4f')]()){if(_0x5918cc('0x408')!=='qwyqJ'){if(_0x14db5c['ShipSpeed'])this[_0x5918cc('0x3ae')](_0x14db5c['ShipSpeed']);}else{function _0x8a30b0(){const _0x347e6d=_0x5918cc;return _0x1c1824[_0x347e6d('0x261')][_0x347e6d('0x239')][_0x347e6d('0x245')][_0x347e6d('0x96')];}}}else{if(this['isAirship']()){if(_0x14db5c[_0x5918cc('0x5b')])this[_0x5918cc('0x3ae')](_0x14db5c['AirshipSpeed']);}}}},VisuMZ['EventsMoveCore'][_0x3b3036('0x3f3')]=Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x23a')],Game_Event[_0x3b3036('0x1d7')]['initialize']=function(_0x27445a,_0xd073d9){const _0x10f0e0=_0x3b3036;VisuMZ[_0x10f0e0('0x261')]['Game_Event_initialize'][_0x10f0e0('0xca')](this,_0x27445a,_0xd073d9),this['setupCopyEvent'](),this[_0x10f0e0('0x341')](),this[_0x10f0e0('0x1eb')]();},VisuMZ['EventsMoveCore'][_0x3b3036('0x321')]=Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x414')],Game_Event[_0x3b3036('0x1d7')]['event']=function(){const _0x400fe4=_0x3b3036;if(this[_0x400fe4('0x17c')]!==undefined){if(_0x400fe4('0xad')===_0x400fe4('0x343')){function _0x201f2b(){const _0x5e7891=_0x400fe4,_0x58a81c=this[_0x5e7891('0x3f')](_0x53f01b,_0x6b90ec,![]);if(_0x58a81c)this[_0x5e7891('0x115')](_0x58a81c);}}else{const _0x51dd63=this[_0x400fe4('0x17c')][_0x400fe4('0x39f')],_0x458185=this['_eventMorphData']['eventId'];return VisuMZ[_0x400fe4('0x1cd')][_0x51dd63][_0x400fe4('0x33')][_0x458185];}}if(this[_0x400fe4('0x1e4')]!==undefined){const _0x116924=this[_0x400fe4('0x1e4')][_0x400fe4('0x39f')],_0x205490=this['_eventCopyData']['eventId'];return VisuMZ[_0x400fe4('0x1cd')][_0x116924][_0x400fe4('0x33')][_0x205490];}if(this[_0x400fe4('0x252')]!==undefined){const _0x2b9e23=this[_0x400fe4('0x252')][_0x400fe4('0x39f')],_0x268add=this[_0x400fe4('0x252')][_0x400fe4('0x23c')];return VisuMZ[_0x400fe4('0x1cd')][_0x2b9e23]['events'][_0x268add];}if($gameTemp[_0x400fe4('0x2e4')]!==undefined){const _0x5f0f53=$gameTemp[_0x400fe4('0x2e4')][_0x400fe4('0x39f')],_0x56bbcb=$gameTemp[_0x400fe4('0x2e4')]['eventId'];return VisuMZ[_0x400fe4('0x1cd')][_0x5f0f53][_0x400fe4('0x33')][_0x56bbcb];}return VisuMZ[_0x400fe4('0x261')][_0x400fe4('0x321')][_0x400fe4('0xca')](this);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x36f')]=function(_0x339951,_0x59d287){const _0x5dba0a=_0x3b3036;if(_0x339951===0x0||_0x59d287===0x0)return![];if(!VisuMZ[_0x5dba0a('0x1cd')][_0x339951]){if(_0x5dba0a('0x224')===_0x5dba0a('0x224')){if($gameTemp[_0x5dba0a('0x201')]()){if(_0x5dba0a('0x3e2')===_0x5dba0a('0x3e2'))console[_0x5dba0a('0x1b7')](_0x5dba0a('0x39e')['format'](_0x339951));else{function _0xe5d9b1(){const _0x11ff49=_0x5dba0a,_0x47365e='%1%2'[_0x11ff49('0x296')](_0xb1efe8,_0x57b63f);_0x534f8a[_0x47365e]&&(_0x1857b7[_0x47365e]=_0x7c302d[_0x47365e][_0x11ff49('0x2e6')](0x0));}}}return![];}else{function _0x505d88(){const _0x5bffa2=_0x5dba0a;this[_0x5bffa2('0x180')]=_0x216662[_0x5bffa2('0x294')](this[_0x5bffa2('0x39f')]()),this[_0x5bffa2('0x3')]=!![];}}}return!![];},VisuMZ[_0x3b3036('0x261')]['Game_Event_start']=Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x3e8')],Game_Event['prototype'][_0x3b3036('0x3e8')]=function(){const _0x535627=_0x3b3036;VisuMZ['EventsMoveCore']['Game_Event_start'][_0x535627('0xca')](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x535627('0x1c6')](VisuMZ[_0x535627('0x3cf')]['Settings']['General']['FastForwardKey'])&&Input['clear']();},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x3fa')]=function(){const _0x358743=_0x3b3036,_0x244199=this[_0x358743('0x414')]()[_0x358743('0x28a')];if(_0x244199==='')return;if(DataManager[_0x358743('0x388')]()||DataManager[_0x358743('0x210')]())return;const _0x258a0e=VisuMZ[_0x358743('0x261')]['Settings'][_0x358743('0x1df')];let _0x37679c=null,_0x29c4ba=0x0,_0x279bf2=0x0;if(_0x244199[_0x358743('0x2f4')](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){if(_0x358743('0xba')===_0x358743('0xba'))_0x29c4ba=Number(RegExp['$1']),_0x279bf2=Number(RegExp['$2']);else{function _0x643226(){const _0x53c117=_0x358743,_0x79f083=this[_0x53c117('0x180')][_0x53c117('0x2e6')](0x0)['reverse']();for(const _0x70d0d0 of _0x79f083){if(_0x70d0d0)return _0x70d0d0;}return null;}}}else{if(_0x244199[_0x358743('0x2f4')](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x29c4ba=Number(RegExp['$1']),_0x279bf2=Number(RegExp['$2']);else{if(_0x244199[_0x358743('0x2f4')](/<COPY EVENT:[ ](.*?)>/i)){if('mePOU'==='mePOU'){const _0x21d528=String(RegExp['$1'])[_0x358743('0x1f8')]()[_0x358743('0x14d')]();_0x37679c=VisuMZ[_0x358743('0x15e')][_0x21d528];if(!_0x37679c)return;_0x29c4ba=_0x37679c['MapID'],_0x279bf2=_0x37679c[_0x358743('0x429')];}else{function _0x58bdfa(){const _0x551c48=_0x358743;_0x23fac5[_0x551c48('0x261')][_0x551c48('0xeb')][_0x551c48('0xa9')](_0x5c0254),this[_0x551c48('0x35f')]=_0x34b0db['CPC'][_0x551c48('0x69')]>0x0;_0x372549['CPC']===_0xdfe2ae&&_0x45b793[_0x551c48('0x261')][_0x551c48('0xeb')][_0x551c48('0xa9')](_0x5dd3c9);if(_0x350e95[_0x551c48('0x196')][_0x551c48('0x69')]>0x0)return _0xf3f117[_0x551c48('0x414')](this[_0x551c48('0x2e')])&&_0x48b9be[_0x551c48('0x261')]['CustomPageConditions'][_0x551c48('0x2af')](_0x924289['CPC'],this[_0x551c48('0x2e')]);return!![];}}}}}if(!this[_0x358743('0x36f')](_0x29c4ba,_0x279bf2))return;_0x258a0e[_0x358743('0x14b')][_0x358743('0xca')](this,_0x29c4ba,_0x279bf2,this);if(_0x37679c)_0x37679c[_0x358743('0x14b')]['call'](this,_0x29c4ba,_0x279bf2,this);this['_eventCopyData']={'mapId':_0x29c4ba,'eventId':_0x279bf2},this[_0x358743('0x35c')]=-0x2,this[_0x358743('0x1b8')](),_0x258a0e[_0x358743('0x392')]['call'](this,_0x29c4ba,_0x279bf2,this);if(_0x37679c)_0x37679c[_0x358743('0x392')]['call'](this,_0x29c4ba,_0x279bf2,this);$gameMap[_0x358743('0x318')]();},Game_Event['prototype']['setupMorphEvent']=function(){const _0x1c9ac8=_0x3b3036,_0x3384ef=$gameSystem[_0x1c9ac8('0x356')](this);if(!_0x3384ef)return;const _0xfffdb=_0x3384ef[_0x1c9ac8('0x95')][_0x1c9ac8('0x1f8')]()[_0x1c9ac8('0x14d')]();if(_0xfffdb!==_0x1c9ac8('0x34e')){if(_0x1c9ac8('0x3ee')!=='CxDCD')this[_0x1c9ac8('0x25d')](_0xfffdb,!![]);else{function _0xf2c0c0(){const _0x3cdc8a=_0x1c9ac8;_0x57a8f5[_0x3cdc8a('0xbc')](_0x38f31e,_0x26af00);const _0x24023d={'template':_0x587ed6[_0x3cdc8a('0x25b')],'mapId':_0x333268[_0x3cdc8a('0x2f8')],'eventId':_0x9daf1a['EventId'],'x':_0x316446[_0x3cdc8a('0x3d6')],'y':_0x299b71[_0x3cdc8a('0x33e')],'spawnPreserved':_0x3bb3a8[_0x3cdc8a('0x1de')],'spawnEventId':_0x5d21b1[_0x3cdc8a('0x180')][_0x3cdc8a('0x69')]+0x3e8};_0x15f416['prepareSpawnedEventAtXY'](_0x24023d,_0x339856['Collision'],_0x16cde7[_0x3cdc8a('0x2a9')]);}}}else{if('EWlXA'!==_0x1c9ac8('0x11a')){function _0x40a511(){const _0x534aad=_0x1c9ac8;this[_0x534aad('0x312')]();}}else this[_0x1c9ac8('0x3d9')](_0x3384ef['mapId'],_0x3384ef[_0x1c9ac8('0x23c')],!![]);}},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x3d9')]=function(_0x1365d0,_0x2cc694,_0x5a09d5){const _0x5ba76c=_0x3b3036;if(!this[_0x5ba76c('0x36f')](_0x1365d0,_0x2cc694))return;const _0x4c3419=VisuMZ[_0x5ba76c('0x261')][_0x5ba76c('0x239')][_0x5ba76c('0x1df')];if(!_0x5a09d5)_0x4c3419[_0x5ba76c('0x1cb')]['call'](this,_0x1365d0,_0x2cc694,this);this[_0x5ba76c('0x17c')]={'mapId':_0x1365d0,'eventId':_0x2cc694},this[_0x5ba76c('0x35c')]=-0x2,this['refresh']();if(!_0x5a09d5)_0x4c3419['PostMorphJS'][_0x5ba76c('0xca')](this,_0x1365d0,_0x2cc694,this);$gameMap[_0x5ba76c('0x318')]();},Game_Event[_0x3b3036('0x1d7')]['morphIntoTemplate']=function(_0x56880c,_0x55b83c){const _0x15a416=_0x3b3036;_0x56880c=_0x56880c[_0x15a416('0x1f8')]()['trim']();const _0x43ac13=VisuMZ[_0x15a416('0x15e')][_0x56880c];if(!_0x43ac13)return;const _0x18c2a7=_0x43ac13[_0x15a416('0x25a')],_0x4cb1e7=_0x43ac13[_0x15a416('0x429')];if(!this[_0x15a416('0x36f')](_0x18c2a7,_0x4cb1e7))return;if(!_0x55b83c)_0x43ac13['PreMorphJS'][_0x15a416('0xca')](this,_0x18c2a7,_0x4cb1e7,this);this['morphInto'](_0x18c2a7,_0x4cb1e7,_0x55b83c);if(!_0x55b83c)_0x43ac13['PostMorphJS'][_0x15a416('0xca')](this,_0x18c2a7,_0x4cb1e7,this);this[_0x15a416('0x318')]();},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x166')]=function(){const _0xb67f0a=_0x3b3036;this['_eventMorphData']=undefined,this[_0xb67f0a('0x35c')]=-0x2,this[_0xb67f0a('0x1b8')]();},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x271')]=function(_0x11dea6){const _0x44ecad=_0x3b3036,_0xbc59e0=VisuMZ[_0x44ecad('0x261')][_0x44ecad('0x239')][_0x44ecad('0x1df')],_0x5b80cb=_0x11dea6[_0x44ecad('0x95')][_0x44ecad('0x1f8')]()[_0x44ecad('0x14d')](),_0x5f12a8=!['',_0x44ecad('0x34e')][_0x44ecad('0xdb')](_0x5b80cb);let _0x2a243c=0x0,_0x54369d=0x0;if(_0x5f12a8){if(_0x44ecad('0x18f')===_0x44ecad('0x18f')){const _0x5a488c=VisuMZ[_0x44ecad('0x15e')][_0x5b80cb];if(!_0x5a488c)return;_0x2a243c=_0x5a488c[_0x44ecad('0x25a')],_0x54369d=_0x5a488c[_0x44ecad('0x429')];}else{function _0x1a3258(){const _0x5974cf=_0x44ecad;_0x1a1c71[_0x5974cf('0x261')][_0x5974cf('0x1f6')][_0x5974cf('0xca')](this,_0x46e618);}}}else{if(_0x44ecad('0x28f')===_0x44ecad('0x378')){function _0x344db4(){const _0x20c0bd=_0x44ecad;this[_0x20c0bd('0x286')]=!![];}}else _0x2a243c=_0x11dea6[_0x44ecad('0x39f')],_0x54369d=_0x11dea6[_0x44ecad('0x23c')];}if(!this[_0x44ecad('0x36f')](_0x2a243c,_0x54369d))return;if(_0x5f12a8){const _0x4667ad=VisuMZ[_0x44ecad('0x15e')][_0x5b80cb];_0x4667ad[_0x44ecad('0x81')][_0x44ecad('0xca')](this,_0x2a243c,_0x54369d,this);}_0xbc59e0[_0x44ecad('0x81')][_0x44ecad('0xca')](this,_0x2a243c,_0x54369d,this),this[_0x44ecad('0x252')]=_0x11dea6,this[_0x44ecad('0x35c')]=-0x2,this[_0x44ecad('0x1ce')]=$gameMap[_0x44ecad('0x39f')](),this[_0x44ecad('0x2e')]=_0x11dea6[_0x44ecad('0x310')],this['_spawnPreserved']=_0x11dea6[_0x44ecad('0x314')],this[_0x44ecad('0x191')](_0x11dea6['x'],_0x11dea6['y']),this[_0x44ecad('0x115')](_0x11dea6[_0x44ecad('0x2ce')]),this[_0x44ecad('0x1b8')]();if(_0x5f12a8){if('wobmW'!==_0x44ecad('0x11')){const _0x25e5e4=VisuMZ['EventTemplates'][_0x5b80cb];if(!_0x25e5e4)return;_0x25e5e4['PostSpawnJS']['call'](this,_0x2a243c,_0x54369d,this);}else{function _0x5069d5(){const _0x27240=_0x44ecad;return this['isDashing']()&&(this[_0x27240('0x129')]()||this[_0x27240('0x2fb')]()!==0x0&&this[_0x27240('0x104')](this['_x'],this['_y'],this[_0x27240('0x2fb')]())||_0x346ce4[_0x27240('0x3bd')]());}}}_0xbc59e0[_0x44ecad('0x41e')][_0x44ecad('0xca')](this,_0x2a243c,_0x54369d,this);const _0x1784b9=SceneManager['_scene'];if(_0x1784b9&&_0x1784b9[_0x44ecad('0x3c6')])_0x1784b9[_0x44ecad('0x3c6')][_0x44ecad('0x1b4')](this);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x107')]=function(){const _0x2cf406=_0x3b3036;return!!this[_0x2cf406('0x252')];},VisuMZ['EventsMoveCore'][_0x3b3036('0x38a')]=Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x1b8')],Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x1b8')]=function(){const _0x1a3292=_0x3b3036;VisuMZ['EventsMoveCore']['Game_Event_refresh']['call'](this),this[_0x1a3292('0x27e')]();},VisuMZ['EventsMoveCore'][_0x3b3036('0x223')]=Game_Event['prototype'][_0x3b3036('0xc5')],Game_Event[_0x3b3036('0x1d7')]['clearPageSettings']=function(){const _0x38e340=_0x3b3036;VisuMZ[_0x38e340('0x261')][_0x38e340('0x223')][_0x38e340('0xca')](this),this['initEventsMoveCoreEffects']();},VisuMZ['EventsMoveCore'][_0x3b3036('0x42e')]=Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x411')],Game_Event[_0x3b3036('0x1d7')]['setupPageSettings']=function(){const _0x43b522=_0x3b3036;this[_0x43b522('0xc7')]=!![],VisuMZ[_0x43b522('0x261')]['Game_Event_setupPageSettings'][_0x43b522('0xca')](this),this[_0x43b522('0x27e')](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event['prototype'][_0x3b3036('0x27e')]=function(){const _0x5461f0=_0x3b3036;if(!this[_0x5461f0('0x414')]())return;this[_0x5461f0('0x281')](),this[_0x5461f0('0x60')](),this[_0x5461f0('0x3ba')](),this[_0x5461f0('0xac')]();},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x60')]=function(){const _0x48e227=_0x3b3036,_0x14eb25=this[_0x48e227('0x414')]()['note'];if(_0x14eb25==='')return;this[_0x48e227('0x5c')](_0x14eb25);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x3ba')]=function(){const _0x5c4e76=_0x3b3036;if(!this[_0x5c4e76('0x1e1')]())return;const _0x300333=this[_0x5c4e76('0x3fd')]();let _0x16c8f6='';for(const _0x4f7df9 of _0x300333){if([0x6c,0x198][_0x5c4e76('0xdb')](_0x4f7df9[_0x5c4e76('0x26f')])){if(_0x16c8f6!=='')_0x16c8f6+='\x0a';_0x16c8f6+=_0x4f7df9['parameters'][0x0];}}this[_0x5c4e76('0x5c')](_0x16c8f6);},Game_Event[_0x3b3036('0x1d7')]['initEventsMoveCoreEffects']=function(){const _0x5f0699=_0x3b3036,_0xba94e7=VisuMZ[_0x5f0699('0x261')][_0x5f0699('0x239')];this['_activationProximity']={'type':_0x5f0699('0x2c7'),'distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x5f0699('0x3f8')]=![],this[_0x5f0699('0x12d')]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x5f0699('0x2dc')]={'iconIndex':0x0,'bufferX':_0xba94e7[_0x5f0699('0x413')][_0x5f0699('0x238')],'bufferY':_0xba94e7[_0x5f0699('0x413')]['BufferY'],'blendMode':_0xba94e7['Icon']['BlendMode']},this[_0x5f0699('0xd1')]={'text':'','visibleRange':_0xba94e7[_0x5f0699('0x245')][_0x5f0699('0x2be')],'offsetX':_0xba94e7[_0x5f0699('0x245')][_0x5f0699('0x32a')],'offsetY':_0xba94e7['Label'][_0x5f0699('0x19e')]},this[_0x5f0699('0x42f')]=[],this[_0x5f0699('0x264')]={'target':-0x1,'type':'random','delay':0x1},this[_0x5f0699('0x20b')]=![],this[_0x5f0699('0x3e0')]={'visible':!![],'filename':_0xba94e7['Movement'][_0x5f0699('0xf4')]},this[_0x5f0699('0x1d3')](),this[_0x5f0699('0x3f9')]();},Game_Event['prototype'][_0x3b3036('0x5c')]=function(_0x12c966){const _0x404180=_0x3b3036;if(_0x12c966[_0x404180('0x2f4')](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x404180('0x432')===_0x404180('0x432'))this[_0x404180('0x379')][_0x404180('0x8a')]=JSON[_0x404180('0x20f')]('['+RegExp['$1'][_0x404180('0x2f4')](/\d+/g)+']'),this[_0x404180('0x379')][_0x404180('0x83')]=_0x404180('0x287');else{function _0x1ce665(){const _0x4f7356=_0x404180;_0x1f4d0d[_0x4f7356('0x261')][_0x4f7356('0x3ab')][_0x4f7356('0xca')](this,_0x50009c);}}}else{if(_0x12c966[_0x404180('0x2f4')](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if('yKwgV'!==_0x404180('0x51'))type=String(RegExp['$1'])['toLowerCase']()['trim'](),this[_0x404180('0x379')]['type']=type,this[_0x404180('0x379')]['distance']=Number(RegExp['$2']);else{function _0x44ccf1(){const _0x29992b=_0x404180;return this[_0x29992b('0x1a2')](0x2,_0x305891(_0x14f8cd['$1']));}}}}_0x12c966[_0x404180('0x2f4')](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x404180('0x25c')]=!![]);if(_0x12c966[_0x404180('0x2f4')](/<CLICK TRIGGER>/i)){if(_0x404180('0x355')===_0x404180('0x404')){function _0x177c7d(){const _0x586e77=_0x404180;return this['_moveSynch'][_0x586e77('0x43')];}}else this[_0x404180('0x3f8')]=!![];}const _0x39216a=_0x12c966['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x39216a){if(_0x404180('0x2ef')==='JUbzJ'){function _0x1b7b39(){const _0x31adc6=_0x404180;if(_0x5dae77||this[_0x31adc6('0x3e')]()){if(_0x520bfd>0x0&&_0x16b9e3<0x0)return 0x1;if(_0x42743d<0x0&&_0x249c2d<0x0)return 0x3;if(_0xf4fa4a>0x0&&_0x4a593b>0x0)return 0x7;if(_0x5ba46c<0x0&&_0x4eac19>0x0)return 0x9;}}}else for(const _0x496e0b of _0x39216a){if(_0x404180('0x1ea')===_0x404180('0x1ea')){if(_0x496e0b[_0x404180('0x2f4')](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x404180('0x39a')==='KnWZb'){const _0xaf5e66=String(RegExp['$1'])[_0x404180('0x151')]()[_0x404180('0x14d')](),_0x2c24c1=Number(RegExp['$2']);this[_0x404180('0x12d')][_0xaf5e66]=_0x2c24c1;}else{function _0xa2d881(){const _0xe5a05d=_0x404180;_0x697b64=_0x5b4aea[_0xe5a05d('0x46')](_0x412e66,(_0x394133,_0x1c951b)=>_0x2e48ff(this[_0xe5a05d('0x1ce')],this[_0xe5a05d('0x2e')],_0x52dd5d(_0x1c951b)));}}}}else{function _0x22ec3c(){const _0x41167d=_0x404180;_0x33de44[_0x41167d('0x124')][_0x25eec7][_0x41167d('0x2f4')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x8d54d3='return\x20%1'[_0x41167d('0x296')](_0x367443(_0x513ed2['$1']));_0x10cb53[_0x41167d('0x3b0')][_0x57598e]=new _0x1c73c5(_0x41167d('0x118'),_0x8d54d3);}}}}if(_0x12c966[_0x404180('0x2f4')](/<ICON:[ ](\d+)>/i)){if('LLZdj'===_0x404180('0x193')){function _0x49ed1a(){const _0x1a2162=_0x404180,_0x120563=_0x5d441e[_0x1a2162('0x414')](_0x2a906c(_0x31638f['$1']));return this[_0x1a2162('0x339')](_0x120563);}}else this[_0x404180('0x2dc')][_0x404180('0x102')]=Number(RegExp['$1']);}_0x12c966[_0x404180('0x2f4')](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x404180('0x2dc')][_0x404180('0x1d4')]=Number(RegExp['$1']));if(_0x12c966['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x404180('0x359')!==_0x404180('0x402'))this[_0x404180('0x2dc')][_0x404180('0x434')]=Number(RegExp['$1']);else{function _0x561766(){_0x4ac823=_0x3d03d3['max'](_0x3321a1,_0x4c9cbf);}}}if(_0x12c966[_0x404180('0x2f4')](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x404180('0x1d9')==='RzCXU'){function _0x53a073(){const _0x335ba0=_0x404180;if(this[_0x335ba0('0x104')](this['x'],this['y'],_0x36ccf0))_0x1c8d17[_0x335ba0('0x2d')](_0x48396f);}}else this[_0x404180('0x2dc')]['bufferX']=Number(RegExp['$1']),this[_0x404180('0x2dc')][_0x404180('0x434')]=Number(RegExp['$2']);}if(_0x12c966[_0x404180('0x2f4')](/<ICON BLEND MODE:[ ](.*?)>/i)){if(_0x404180('0x110')!==_0x404180('0x2cf')){const _0x32e422=String(RegExp['$1'])['toUpperCase']()[_0x404180('0x14d')](),_0x267932=[_0x404180('0x1ba'),_0x404180('0xb6'),_0x404180('0x1c9'),_0x404180('0x9a')];this['_eventIcon'][_0x404180('0x302')]=_0x267932[_0x404180('0x44')](_0x32e422)['clamp'](0x0,0x3);}else{function _0x5635c9(){const _0x1597fa=_0x404180,_0x512975=[_0x47c3c9,_0x4cbf1e,_0x1597fa('0x384')[_0x1597fa('0x296')](_0x1b45c5)];}}}if(_0x12c966[_0x404180('0x2f4')](/<LABEL:[ ](.*?)>/i)){if(_0x404180('0x119')!==_0x404180('0x119')){function _0x40e302(){const _0x11d09e=_0x404180;_0x529cc3['variables'][_0x3031a6][_0x11d09e('0x2f4')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x538735=_0x11d09e('0xa6')[_0x11d09e('0x296')](_0x2bce46(_0x52d0a1['$1']));_0x76621c[_0x11d09e('0x3b0')][_0x1a84aa]=new _0x3dbdf6(_0x11d09e('0x1dd'),_0x538735);}}else this[_0x404180('0xd1')]['text']=String(RegExp['$1'])[_0x404180('0x14d')]();}_0x12c966[_0x404180('0x2f4')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x404180('0xd1')][_0x404180('0x120')]=String(RegExp['$1'])[_0x404180('0x14d')]());_0x12c966[_0x404180('0x2f4')](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x404180('0x2f6')]=Number(RegExp['$1']));_0x12c966[_0x404180('0x2f4')](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x404180('0xd1')][_0x404180('0x34f')]=Number(RegExp['$1']));if(_0x12c966[_0x404180('0x2f4')](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x404180('0x348')!==_0x404180('0x179'))this[_0x404180('0xd1')][_0x404180('0x2f6')]=Number(RegExp['$1']),this[_0x404180('0xd1')]['offsetY']=Number(RegExp['$2']);else{function _0x4249fa(){const _0x296b11=_0x404180;_0x1c3ef1[_0x296b11('0x1d7')]['resetFontSettings'][_0x296b11('0xca')](this),this[_0x296b11('0x172')][_0x296b11('0xd0')]=this[_0x296b11('0x3e6')]();}}}$gameTemp[_0x404180('0x1ab')](this);for(;;){if(this[_0x404180('0xd1')][_0x404180('0x120')][_0x404180('0x2f4')](/\\V\[(\d+)\]/gi))this[_0x404180('0xd1')][_0x404180('0x120')]=this[_0x404180('0xd1')]['text'][_0x404180('0x46')](/\\V\[(\d+)\]/gi,(_0x37d31f,_0x381275)=>$gameVariables[_0x404180('0x10f')](parseInt(_0x381275)));else{if(_0x404180('0x28c')!==_0x404180('0x28c')){function _0x48f826(){const _0x34027d=_0x404180;_0x1d51c7=_0x2688d2[_0x34027d('0x259')];}}else break;}}$gameTemp[_0x404180('0x2cc')]();_0x12c966[_0x404180('0x2f4')](/<LABEL RANGE:[ ](\d+)>/i)&&(this['_labelWindow']['visibleRange']=Number(RegExp['$1']));if(_0x12c966[_0x404180('0x2f4')](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e75ba=JSON[_0x404180('0x20f')]('['+RegExp['$1'][_0x404180('0x2f4')](/\d+/g)+']');this[_0x404180('0x42f')]=this[_0x404180('0x42f')][_0x404180('0x9')](_0x1e75ba),this[_0x404180('0x42f')][_0x404180('0x140')](0x0);}if(_0x12c966[_0x404180('0x2f4')](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x479e77=String(RegExp['$1']);if(_0x479e77[_0x404180('0x2f4')](/PLAYER/i))this[_0x404180('0x264')][_0x404180('0x43')]=0x0;else{if(_0x479e77[_0x404180('0x2f4')](/EVENT[ ](\d+)/i)){if(_0x404180('0x344')!=='suGEX')this[_0x404180('0x264')][_0x404180('0x43')]=Number(RegExp['$1']);else{function _0x153d2a(){const _0x3a67d7=_0x404180;_0x5b0d63['EventsMoveCore']['Sprite_Character_update'][_0x3a67d7('0xca')](this),_0x218796[_0x3a67d7('0x261')][_0x3a67d7('0x239')]['Movement'][_0x3a67d7('0x1e6')]&&this['updateTilt'](),this[_0x3a67d7('0x214')]&&this[_0x3a67d7('0x305')](),this[_0x3a67d7('0x3f4')]&&this[_0x3a67d7('0xb8')]();}}}}}_0x12c966[_0x404180('0x2f4')](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch']['type']=String(RegExp['$1'])['toLowerCase']()[_0x404180('0x14d')]());if(_0x12c966['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if(_0x404180('0x1fb')!==_0x404180('0x1fb')){function _0x1dd813(){const _0x2262be=_0x404180;if(this[_0x2262be('0x1d6')]())return!![];if(this[_0x2262be('0x18a')]===_0x618b13&&this[_0x2262be('0x183')]())return!![];return![];}}else this[_0x404180('0x264')][_0x404180('0x2e9')]=Number(RegExp['$1']);}if(_0x12c966[_0x404180('0x2f4')](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x404180('0x150')!==_0x404180('0x88'))this['_saveEventLocation']=!![];else{function _0x3264d3(){const _0x5ae31b=_0x404180;if(_0x18d409[_0x5ae31b('0x103')][_0x5ae31b('0x18a')]===_0x5828bf)return![];return _0x5cbf5d[_0x5ae31b('0x185')][_0x5ae31b('0xdb')](_0x143a7f);}}}_0x12c966[_0x404180('0x2f4')](/<HIDE SHADOW>/i)&&(this[_0x404180('0x3e0')][_0x404180('0x1fe')]=![]);_0x12c966[_0x404180('0x2f4')](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x404180('0x3e0')][_0x404180('0x26a')]=String(RegExp['$1']));if(_0x12c966[_0x404180('0x2f4')](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x404180('0x21')==='qjMSc')this[_0x404180('0x1a8')]=Number(RegExp['$1']);else{function _0x117759(){const _0x3a7f03=_0x404180;if(_0xefd8e7[_0x3a7f03('0x3ed')]&&this[_0x3a7f03('0x2b7')]())return this[_0x3a7f03('0x2e0')](_0x132c12,_0x231f1d);else{const _0x207d34=_0x35f7a2['eventsXyNt'](_0x270988,_0x62af93)['filter'](_0x50d5b5=>_0x50d5b5!==this);return _0x207d34[_0x3a7f03('0x69')]>0x0;}}}}_0x12c966[_0x404180('0x2f4')](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x404180('0xf9')]=Number(RegExp['$1'])),_0x12c966[_0x404180('0x2f4')](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x404180('0x1a8')]=Number(RegExp['$1']),this[_0x404180('0xf9')]=Number(RegExp['$2'])),_0x12c966[_0x404180('0x2f4')](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x404180('0x148')]=String(RegExp['$1'])['toUpperCase']()[_0x404180('0x14d')]());},Game_Event['prototype'][_0x3b3036('0xac')]=function(){const _0x30732c=_0x3b3036;this[_0x30732c('0x35d')]();},Game_Event[_0x3b3036('0x1d7')]['isNearTheScreen']=function(){const _0xb2117d=_0x3b3036;if(this[_0xb2117d('0x25c')])return!![];return Game_Character[_0xb2117d('0x1d7')][_0xb2117d('0xed')]['call'](this);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x29e')]=Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x3fb')],Game_Event['prototype'][_0x3b3036('0x3fb')]=function(){const _0x4d88ae=_0x3b3036;if(this[_0x4d88ae('0x422')]())return;VisuMZ['EventsMoveCore']['Game_Event_updateSelfMovement'][_0x4d88ae('0xca')](this);if(this['isMoving']()){if(_0x4d88ae('0x17e')!==_0x4d88ae('0x17e')){function _0x180f1e(){const _0x5b54cd=_0x4d88ae;if(_0x14d4b8[_0x5b54cd('0x358')](_0x403032))return this['advancedValue'](_0x54aef5);else return _0x2e8abb['isSelfVariable'](_0x4cc3e6)?this['selfValue'](_0x1ee5cc):_0x5dc017[_0x5b54cd('0x261')][_0x5b54cd('0x1b0')][_0x5b54cd('0xca')](this,_0x488eff);}}else VisuMZ['MoveAllSynchTargets'](this[_0x4d88ae('0x2e')]);}},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x422')]=function(){const _0x398d05=_0x3b3036,_0xfcb4b3=VisuMZ[_0x398d05('0x261')][_0x398d05('0x239')][_0x398d05('0x257')];if($gameMap['isEventRunning']()&&_0xfcb4b3[_0x398d05('0x370')])return!![];if($gameMessage['isBusy']()&&_0xfcb4b3[_0x398d05('0x361')])return!![];if(!$gameSystem[_0x398d05('0x21c')]())return!![];if(this[_0x398d05('0x303')]()>=0x0)return!![];return![];},Game_Event['prototype']['updateShadowChanges']=function(){const _0x4f3a1d=_0x3b3036,_0x4a225b=SceneManager['_scene']['_spriteset'];if(_0x4a225b){if('bqKzD'!==_0x4f3a1d('0x200')){const _0x535286=_0x4a225b[_0x4f3a1d('0x39c')](this);_0x535286&&_0x535286[_0x4f3a1d('0x214')]&&_0x535286[_0x4f3a1d('0x214')]['_filename']!==this[_0x4f3a1d('0x10d')]()&&(_0x535286[_0x4f3a1d('0x214')][_0x4f3a1d('0x1f9')]=this[_0x4f3a1d('0x10d')](),_0x535286[_0x4f3a1d('0x214')][_0x4f3a1d('0x57')]=ImageManager[_0x4f3a1d('0x236')](_0x535286['_shadowSprite']['_filename']));}else{function _0xf38f41(){const _0x204fd3=_0x4f3a1d,_0x38747d=_0x17d1f2['EventTemplates'][_0x584345];if(!_0x38747d)return;_0x38747d[_0x204fd3('0x41e')][_0x204fd3('0xca')](this,_0x342d9f,_0x19ec4f,this);}}}},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x10d')]=function(){const _0x603013=_0x3b3036;return this[_0x603013('0x3e0')][_0x603013('0x26a')];},Game_Event['prototype']['isShadowVisible']=function(){const _0x49344a=_0x3b3036;if(!this[_0x49344a('0x3e0')]['visible'])return![];return Game_CharacterBase[_0x49344a('0x1d7')]['isShadowVisible'][_0x49344a('0xca')](this);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x33f')]=function(){const _0x31fa22=_0x3b3036;return this[_0x31fa22('0xd1')][_0x31fa22('0x120')];},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x1fa')]=function(){const _0x40202e=_0x3b3036;return this[_0x40202e('0xd1')][_0x40202e('0xa7')];},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x352')]=function(_0x586e91,_0x2d6aa6,_0x221f53){const _0xd60fc1=_0x3b3036;if(this[_0xd60fc1('0x1f1')]())return this[_0xd60fc1('0x2b8')](_0x586e91,_0x2d6aa6,_0x221f53);if($gameMap['isRegionAllowPass'](_0x586e91,_0x2d6aa6,_0x221f53,_0xd60fc1('0x414')))return!![];if($gameMap[_0xd60fc1('0x37b')](_0x586e91,_0x2d6aa6,_0x221f53,_0xd60fc1('0x414')))return![];return Game_Character[_0xd60fc1('0x1d7')][_0xd60fc1('0x352')][_0xd60fc1('0xca')](this,_0x586e91,_0x2d6aa6,_0x221f53);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x1f1')]=function(){const _0x205ce6=_0x3b3036;if(this[_0x205ce6('0x42f')]===undefined)this[_0x205ce6('0x281')]();return this[_0x205ce6('0x42f')][_0x205ce6('0x69')]>0x0;},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x2b8')]=function(_0x333f4,_0x1d7077,_0x2f3c18){const _0x15e04c=_0x3b3036,_0x11c2dd=$gameMap[_0x15e04c('0x421')](_0x333f4,_0x2f3c18),_0x2cf3d3=$gameMap[_0x15e04c('0xc9')](_0x1d7077,_0x2f3c18),_0xdbc789=$gameMap['regionId'](_0x11c2dd,_0x2cf3d3);return this[_0x15e04c('0x42f')]['includes'](_0xdbc789);},VisuMZ[_0x3b3036('0x261')]['Game_Event_findProperPageIndex']=Game_Event[_0x3b3036('0x1d7')]['findProperPageIndex'],Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x428')]=function(){const _0x428915=_0x3b3036;return this[_0x428915('0x286')]=![],this[_0x428915('0x35f')]=![],this[_0x428915('0x414')]()?VisuMZ[_0x428915('0x261')]['Game_Event_findProperPageIndex'][_0x428915('0xca')](this):-0x1;},VisuMZ['EventsMoveCore'][_0x3b3036('0xa4')]=Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x435')],Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x435')]=function(_0x65cccb){const _0x3d4772=_0x3b3036;this[_0x3d4772('0x21d')](_0x65cccb),$gameTemp[_0x3d4772('0x1ab')](this);const _0x1f6fb4=VisuMZ[_0x3d4772('0x261')][_0x3d4772('0xa4')]['call'](this,_0x65cccb);return $gameTemp['clearSelfTarget'](),_0x1f6fb4;},Game_Event[_0x3b3036('0x1d7')]['hasAdvancedSwitchVariable']=function(){return this['_advancedSwitchVariable'];},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x21d')]=function(_0x5427fe){const _0x404c10=_0x3b3036,_0x59a142=_0x5427fe[_0x404c10('0x147')];if(_0x59a142['switch1Valid']&&DataManager[_0x404c10('0xe5')](_0x59a142[_0x404c10('0x138')])){if(_0x404c10('0x20e')===_0x404c10('0x20e'))this[_0x404c10('0x286')]=!![];else{function _0x31cfbd(){return this['setDirection'](0x7);}}}else{if(_0x59a142[_0x404c10('0x28b')]&&DataManager[_0x404c10('0xe5')](_0x59a142['switch2Id']))this[_0x404c10('0x286')]=!![];else _0x59a142[_0x404c10('0x27b')]&&DataManager['isAdvancedVariable'](_0x59a142[_0x404c10('0x1dd')])&&(this[_0x404c10('0x286')]=!![]);}},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x326')]=function(){return this['_clickTrigger'];},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x2f7')]=function(){const _0x35ffee=_0x3b3036;$gameTemp[_0x35ffee('0x42d')](),this['start']();},Game_Event['prototype'][_0x3b3036('0x14f')]=function(_0x503aef,_0x4a1601){const _0x4c8238=_0x3b3036;if(this[_0x4c8238('0x12d')]){if('zyJCE'===_0x4c8238('0x232'))return this[_0x4c8238('0xe7')](_0x503aef,_0x4a1601);else{function _0x2cb4d6(){const _0xef7b56=_0x4c8238;if(!_0x470da8[_0xef7b56('0x189')]())return!![];return _0xb13962[_0xef7b56('0x261')]['Game_Map_isDashDisabled']['call'](this);}}}else return Game_Character[_0x4c8238('0x1d7')][_0x4c8238('0x14f')][_0x4c8238('0xca')](this,_0x503aef,_0x4a1601);},Game_Event['prototype'][_0x3b3036('0xe7')]=function(_0x16f1dd,_0x473978){const _0x894712=_0x3b3036;var _0x3a0bc4=this['x']-this[_0x894712('0x12d')][_0x894712('0x240')],_0x5c8622=this['x']+this[_0x894712('0x12d')][_0x894712('0x34d')],_0x46363c=this['y']-this['_addedHitbox']['up'],_0xb930ae=this['y']+this[_0x894712('0x12d')][_0x894712('0x144')];return _0x3a0bc4<=_0x16f1dd&&_0x16f1dd<=_0x5c8622&&_0x46363c<=_0x473978&&_0x473978<=_0xb930ae;},Game_Event['prototype'][_0x3b3036('0x104')]=function(_0x55a17,_0x49b510,_0x61b28b){const _0x3807c5=_0x3b3036;for(let _0x55e36c=-this[_0x3807c5('0x12d')][_0x3807c5('0x240')];_0x55e36c<=this[_0x3807c5('0x12d')][_0x3807c5('0x34d')];_0x55e36c++){for(let _0x40db11=-this[_0x3807c5('0x12d')]['up'];_0x40db11<=this[_0x3807c5('0x12d')][_0x3807c5('0x144')];_0x40db11++){if(_0x3807c5('0x2fe')===_0x3807c5('0x90')){function _0x1aa9ec(){const _0x252c08=_0x3807c5,_0x56e08d=_0x1a9a00[_0x252c08('0x261')][_0x252c08('0x239')][_0x252c08('0x257')];if(!_0x56e08d[_0x252c08('0x31e')])return![];if(_0x53b620[_0x252c08('0x3bd')]())return![];if(this[_0x252c08('0x2c5')]()||this[_0x252c08('0x129')]()||this[_0x252c08('0x1d6')]())return![];return this[_0x252c08('0x14e')]<_0x56e08d[_0x252c08('0x1e5')];}}else{if(!Game_Character[_0x3807c5('0x1d7')][_0x3807c5('0x104')][_0x3807c5('0xca')](this,_0x55a17+_0x55e36c,_0x49b510+_0x40db11,_0x61b28b)){if('xlQvN'===_0x3807c5('0x39')){function _0x1221bd(){const _0x148aef=_0x3807c5;_0x487598[_0x148aef('0x261')][_0x148aef('0x38a')]['call'](this),this[_0x148aef('0x27e')]();}}else return![];}}}}return!![];},Game_Event['prototype'][_0x3b3036('0x7a')]=function(_0xe973ab,_0x40c656){const _0x2dedaa=_0x3b3036;if(Imported[_0x2dedaa('0x3ed')]&&this[_0x2dedaa('0x2b7')]()){if(_0x2dedaa('0x5f')!==_0x2dedaa('0x5f')){function _0x2bae54(){const _0x4b7458=_0x2dedaa;_0x5c6f94!==this[_0x4b7458('0x39f')]()&&_0x57539c&&_0x59390d['removeTemporaryMapSpawnedEvents'](this[_0x4b7458('0x39f')]());}}else return this[_0x2dedaa('0x2e0')](_0xe973ab,_0x40c656);}else{if(_0x2dedaa('0x21a')!=='Xteyi'){const _0x23fe02=$gameMap[_0x2dedaa('0x18b')](_0xe973ab,_0x40c656)[_0x2dedaa('0x279')](_0x5984b9=>_0x5984b9!==this);return _0x23fe02['length']>0x0;}else{function _0x4f4d9e(){const _0x478e53=_0x2dedaa;return this[_0x478e53('0x295')]();}}}},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x2e0')]=function(_0x4c4d86,_0x311057){const _0x45cbeb=_0x3b3036;if(!this[_0x45cbeb('0x3eb')]())return![];else{const _0x51b617=$gameMap[_0x45cbeb('0x18b')](_0x4c4d86,_0x311057)[_0x45cbeb('0x279')](_0x1a31fc=>_0x1a31fc!==this&&_0x1a31fc[_0x45cbeb('0x3eb')]());return _0x51b617[_0x45cbeb('0x69')]>0x0;}},Game_Event[_0x3b3036('0x1d7')]['activationProximityType']=function(){const _0xb811f=_0x3b3036;return this['_activationProximity'][_0xb811f('0x83')]||'none';},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0xb')]=function(){const _0x977369=_0x3b3036;return this[_0x977369('0x379')][_0x977369('0x1e9')]||0x0;},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x337')]=function(){const _0x1cb3ef=_0x3b3036;return this[_0x1cb3ef('0x379')][_0x1cb3ef('0x8a')]||[];},Game_Event['prototype'][_0x3b3036('0x401')]=function(){const _0x129f9a=_0x3b3036;Game_Character[_0x129f9a('0x1d7')][_0x129f9a('0x401')][_0x129f9a('0xca')](this);if([_0x129f9a('0x2c7'),'region'][_0x129f9a('0xdb')](this['activationProximityType']()))return;$gamePlayer['checkEventTriggerEventsMoveCore']([0x2]);},VisuMZ[_0x3b3036('0x261')]['Game_Event_checkEventTriggerAuto']=Game_Event['prototype']['checkEventTriggerAuto'],Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x40c')]=function(){const _0x2ff707=_0x3b3036;if(this[_0x2ff707('0x3c7')]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x2ff707('0x3a8')](![]))return;if(!this[_0x2ff707('0x177')](![]))return;VisuMZ[_0x2ff707('0x261')]['Game_Event_checkEventTriggerAuto'][_0x2ff707('0xca')](this);},VisuMZ[_0x3b3036('0x261')]['Game_Event_updateParallel']=Game_Event['prototype'][_0x3b3036('0x406')],Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x406')]=function(){const _0x271d1f=_0x3b3036;if(!this[_0x271d1f('0x99')])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ['EventsMoveCore'][_0x271d1f('0x8f')][_0x271d1f('0xca')](this);},Game_Event[_0x3b3036('0x1d7')]['checkRegionEventTrigger']=function(_0x225513){const _0x621210=_0x3b3036;if(!_0x225513&&$gameMap['isEventRunning']())return![];if(!_0x225513&&$gameMap['isAnyEventStarting']())return![];if(this[_0x621210('0x337')]()<=0x0)return!![];return $gamePlayer[_0x621210('0x1c3')](this);},Game_Event[_0x3b3036('0x1d7')]['checkActivationProximity']=function(_0x34b852){const _0x41ba35=_0x3b3036;if(!_0x34b852&&$gameMap[_0x41ba35('0x202')]())return![];if(!_0x34b852&&$gameMap[_0x41ba35('0x11b')]())return![];if([_0x41ba35('0x2c7'),_0x41ba35('0x287')][_0x41ba35('0xdb')](this['activationProximityType']()))return!![];return $gamePlayer[_0x41ba35('0x2ca')](this);},VisuMZ[_0x3b3036('0x198')]=function(_0x32a569){const _0x553de5=_0x3b3036;for(const _0x3b1f2d of $gameMap[_0x553de5('0x33')]()){if(!_0x3b1f2d)continue;_0x3b1f2d[_0x553de5('0x303')]()===_0x32a569&&_0x3b1f2d[_0x553de5('0x2db')]();}},VisuMZ[_0x3b3036('0x9e')]=function(_0x2b0236){const _0x9482d1=_0x3b3036;if(_0x2b0236===0x0)return $gamePlayer;return $gameMap[_0x9482d1('0x414')](_0x2b0236);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x303')]=function(){const _0x353fdb=_0x3b3036;return this[_0x353fdb('0x264')][_0x353fdb('0x43')];},Game_Event['prototype'][_0x3b3036('0x7e')]=function(){const _0x5aa20d=_0x3b3036;return this[_0x5aa20d('0x264')][_0x5aa20d('0x83')];},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0xf8')]=function(){const _0x339215=_0x3b3036;if(this[_0x339215('0x303')]()>=0x0){const _0x4faf45=VisuMZ[_0x339215('0x9e')](this[_0x339215('0x303')]());if(_0x4faf45)return _0x4faf45[_0x339215('0xf8')]();}return Game_Character['prototype'][_0x339215('0xf8')][_0x339215('0xca')](this);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x2db')]=function(){const _0x4751ba=_0x3b3036;this[_0x4751ba('0x264')]['timer']=this[_0x4751ba('0x264')][_0x4751ba('0x190')]||0x0,this[_0x4751ba('0x264')][_0x4751ba('0x190')]--;if(this[_0x4751ba('0x264')][_0x4751ba('0x190')]>0x0)return;this['_moveSynch'][_0x4751ba('0x190')]=this['_moveSynch'][_0x4751ba('0x2e9')],this[_0x4751ba('0x38')]();},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x38')]=function(){const _0x5351f7=_0x3b3036;switch(this[_0x5351f7('0x7e')]()){case _0x5351f7('0x25'):this[_0x5351f7('0xf0')]();break;case _0x5351f7('0x175'):this[_0x5351f7('0x3d1')]();break;case _0x5351f7('0x199'):this['processMoveSynchAway']();break;case'custom':this[_0x5351f7('0x3b')]();break;case'mimic':case _0x5351f7('0x63'):this[_0x5351f7('0x9f')]();break;case _0x5351f7('0x2e3'):case _0x5351f7('0xc3'):this[_0x5351f7('0x42c')]();break;case'mirror\x20horizontal':case _0x5351f7('0xcf'):case'mirror\x20horz':case _0x5351f7('0x1'):this[_0x5351f7('0x256')]();break;case'mirror\x20vertical':case _0x5351f7('0x22f'):case _0x5351f7('0x117'):case _0x5351f7('0x204'):this[_0x5351f7('0x98')]();break;default:this[_0x5351f7('0xf0')]();break;}this[_0x5351f7('0x31d')]();},Game_Event['prototype'][_0x3b3036('0xf0')]=function(){const _0x509b4a=_0x3b3036,_0xb3bd23=[0x2,0x4,0x6,0x8];if($gameMap['isSupportDiagonalMovement']()){if(_0x509b4a('0x1f0')!==_0x509b4a('0x1f0')){function _0x30ee32(){const _0x1f8862=_0x509b4a,_0x1a2adc=_0x16d0f4(_0x1a96a['$1']);_0x1a2adc<_0x2858f2?(_0x5a9743(_0x1f8862('0x1f2')[_0x1f8862('0x296')](_0xd44aa6,_0x1a2adc,_0x17bde0)),_0x1599fc['exit']()):_0xbe240f=_0x2e65f4[_0x1f8862('0x9b')](_0x1a2adc,_0x1c8a38);}}else _0xb3bd23[_0x509b4a('0x2d')](0x1,0x3,0x7,0x9);}const _0x34f5d3=[];for(const _0x259bce of _0xb3bd23){if(this['canPass'](this['x'],this['y'],_0x259bce))_0x34f5d3['push'](_0x259bce);}if(_0x34f5d3[_0x509b4a('0x69')]>0x0){const _0x2d6dd7=_0x34f5d3[Math['randomInt'](_0x34f5d3['length'])];this[_0x509b4a('0x3aa')](_0x2d6dd7);}},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x3d1')]=function(){const _0x3c0859=_0x3b3036,_0x15450d=VisuMZ[_0x3c0859('0x9e')](this[_0x3c0859('0x303')]());this['moveTowardCharacter'](_0x15450d);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x366')]=function(){const _0x559132=_0x3b3036,_0x43a97f=VisuMZ[_0x559132('0x9e')](this[_0x559132('0x303')]());this['moveAwayFromCharacter'](_0x43a97f);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x3b')]=function(){const _0x323765=_0x3b3036;this[_0x323765('0xb4')]();},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x9f')]=function(){const _0x231df9=_0x3b3036,_0x413080=VisuMZ[_0x231df9('0x9e')](this[_0x231df9('0x303')]());this[_0x231df9('0x3aa')](_0x413080[_0x231df9('0x3e9')]());},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x42c')]=function(){const _0x43e6a5=_0x3b3036,_0x2b9b86=VisuMZ['GetMoveSynchTarget'](this[_0x43e6a5('0x303')]()),_0x5f68ab=this[_0x43e6a5('0x137')](_0x2b9b86[_0x43e6a5('0x3e9')]());this[_0x43e6a5('0x3aa')](this['reverseDir'](_0x2b9b86[_0x43e6a5('0x2ce')]()));},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x256')]=function(){const _0x4db330=_0x3b3036,_0x1a4b1d=VisuMZ[_0x4db330('0x9e')](this['moveSynchTarget']()),_0x3a1f68=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x1a4b1d[_0x4db330('0x3e9')]()];this['executeMoveDir8'](_0x3a1f68);},Game_Event['prototype'][_0x3b3036('0x98')]=function(){const _0x352c00=_0x3b3036,_0x2aa327=VisuMZ[_0x352c00('0x9e')](this['moveSynchTarget']()),_0x19d4ed=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x2aa327[_0x352c00('0x3e9')]()];this[_0x352c00('0x3aa')](_0x19d4ed);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x1eb')]=function(){const _0x487c8f=_0x3b3036,_0x16a859=$gameSystem['getSavedEventLocation'](this);if(!_0x16a859)return;this[_0x487c8f('0x191')](_0x16a859['x'],_0x16a859['y']),this[_0x487c8f('0x115')](_0x16a859[_0x487c8f('0x2ce')]),this[_0x487c8f('0x35c')]===_0x16a859['pageIndex']&&(this[_0x487c8f('0x192')]=_0x16a859[_0x487c8f('0xf')]);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x22e')]=function(){const _0x262641=_0x3b3036;Game_Character[_0x262641('0x1d7')]['updateMove'][_0x262641('0xca')](this),this[_0x262641('0x254')]();},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x36b')]=function(){const _0x2c8fda=_0x3b3036;if($gameMap[_0x2c8fda('0xb5')]())return!![];return this[_0x2c8fda('0x20b')];},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x254')]=function(){const _0x16a6ca=_0x3b3036;if(!this[_0x16a6ca('0x36b')]())return;this[_0x16a6ca('0x365')]();},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x365')]=function(){const _0x25c9b1=_0x3b3036;$gameSystem[_0x25c9b1('0x365')](this);},Game_Event['prototype'][_0x3b3036('0x78')]=function(){$gameSystem['deleteSavedEventLocation'](this);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x1bf')]=function(){const _0x16ecb0=_0x3b3036;if($gameSystem['getEventIconData']())return Game_Character[_0x16ecb0('0x1d7')][_0x16ecb0('0x1bf')][_0x16ecb0('0xca')](this);else{if('QcqTX'===_0x16ecb0('0x313'))return this[_0x16ecb0('0x2dc')];else{function _0x98ab61(){const _0x3e39d5=_0x16ecb0;_0x4f5cde=_0x4508a1[_0x3e39d5('0x39f')],_0x2441d8=_0x18e76d[_0x3e39d5('0x23c')];}}}},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x143')]=function(){const _0x2fe091=_0x3b3036;return this[_0x2fe091('0x35f')];},VisuMZ[_0x3b3036('0x261')]['Game_Event_meetsConditionsCPC']=Game_Event[_0x3b3036('0x1d7')]['meetsConditions'],Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x435')]=function(_0x535c8e){const _0x1210b9=_0x3b3036,_0x482f00=VisuMZ[_0x1210b9('0x261')][_0x1210b9('0x6f')][_0x1210b9('0xca')](this,_0x535c8e);if(!_0x482f00)return![];return this[_0x1210b9('0x79')](_0x535c8e);},Game_Event[_0x3b3036('0x1d7')][_0x3b3036('0x79')]=function(_0x4e0336){const _0x95a9fa=_0x3b3036;VisuMZ[_0x95a9fa('0x261')]['CustomPageConditions'][_0x95a9fa('0xa9')](_0x4e0336),this['_CPCs']=_0x4e0336[_0x95a9fa('0x196')][_0x95a9fa('0x69')]>0x0;_0x4e0336[_0x95a9fa('0x196')]===undefined&&VisuMZ['EventsMoveCore']['CustomPageConditions']['loadCPC'](_0x4e0336);if(_0x4e0336[_0x95a9fa('0x196')][_0x95a9fa('0x69')]>0x0)return $gameMap[_0x95a9fa('0x414')](this[_0x95a9fa('0x2e')])&&VisuMZ[_0x95a9fa('0x261')]['CustomPageConditions'][_0x95a9fa('0x2af')](_0x4e0336[_0x95a9fa('0x196')],this['_eventId']);return!![];},VisuMZ[_0x3b3036('0x261')]['Game_Troop_meetsConditionsCPC']=Game_Troop[_0x3b3036('0x1d7')][_0x3b3036('0x435')],Game_Troop[_0x3b3036('0x1d7')][_0x3b3036('0x435')]=function(_0x18ca98){const _0x10bc08=_0x3b3036;var _0x455222=VisuMZ['EventsMoveCore'][_0x10bc08('0x42a')]['call'](this,_0x18ca98);return _0x455222&&this[_0x10bc08('0x320')](_0x18ca98);},Game_Troop['prototype'][_0x3b3036('0x320')]=function(_0x527f8b){const _0x11bd6c=_0x3b3036;_0x527f8b[_0x11bd6c('0x196')]===undefined&&VisuMZ[_0x11bd6c('0x261')]['CustomPageConditions']['loadCPC'](_0x527f8b);if(_0x527f8b[_0x11bd6c('0x196')][_0x11bd6c('0x69')]>0x0)return VisuMZ[_0x11bd6c('0x261')][_0x11bd6c('0xeb')][_0x11bd6c('0x2af')](_0x527f8b[_0x11bd6c('0x196')],0x0);return!![];},VisuMZ['EventsMoveCore'][_0x3b3036('0x2d9')]=Game_Interpreter[_0x3b3036('0x1d7')][_0x3b3036('0x319')],Game_Interpreter[_0x3b3036('0x1d7')][_0x3b3036('0x319')]=function(){const _0x39bf2d=_0x3b3036;if(this[_0x39bf2d('0x367')]==='CallEvent'){if(window[this[_0x39bf2d('0x395')]]){if(_0x39bf2d('0xb3')!=='rrpjk')this[_0x39bf2d('0x367')]='',this['startCallEvent']();else{function _0x2f8824(){const _0x5bc394=_0x39bf2d;return _0x336ad2[_0x5bc394('0x261')][_0x5bc394('0x1c5')][_0x5bc394('0xca')](this,_0x570517,_0x2dc050,_0x213619);}}}else{if(_0x39bf2d('0x289')==='LFNLZ')return!![];else{function _0x5ea8cb(){const _0xa8d6bf=_0x39bf2d;return this[_0xa8d6bf('0x40e')](_0x1ab686(_0x2ae1fb['$1']));}}}}else return VisuMZ[_0x39bf2d('0x261')][_0x39bf2d('0x2d9')][_0x39bf2d('0xca')](this);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x304')]=Game_Interpreter[_0x3b3036('0x1d7')][_0x3b3036('0x13a')],Game_Interpreter[_0x3b3036('0x1d7')][_0x3b3036('0x13a')]=function(){const _0x36a0d7=_0x3b3036,_0x1bde86=$gameMap&&this[_0x36a0d7('0x2e')]?$gameMap['event'](this[_0x36a0d7('0x2e')]):null;$gameTemp[_0x36a0d7('0x1ab')](_0x1bde86);const _0x2ce638=VisuMZ[_0x36a0d7('0x261')][_0x36a0d7('0x304')][_0x36a0d7('0xca')](this);return $gameTemp[_0x36a0d7('0x2cc')](),_0x2ce638;},VisuMZ[_0x3b3036('0x261')]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x3b3036('0x1d7')][_0x3b3036('0x21e')],Game_Interpreter['prototype'][_0x3b3036('0x21e')]=function(_0x50cb02){const _0x57c8a3=_0x3b3036;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x57c8a3('0x261')][_0x57c8a3('0x333')][_0x57c8a3('0xca')](this,_0x50cb02);},Game_Interpreter[_0x3b3036('0x1d7')][_0x3b3036('0x82')]=function(_0x4b8e4e){const _0x52a4d6=_0x3b3036;this['_callEventData']=_0x4b8e4e;const _0x161ea4=_0x52a4d6('0x1c1')[_0x52a4d6('0x296')](_0x4b8e4e[_0x52a4d6('0x39f')][_0x52a4d6('0x1b9')](0x3));this[_0x52a4d6('0x395')]='$callEventMap'+Graphics[_0x52a4d6('0x30')]+'_'+this[_0x52a4d6('0x23c')](),DataManager['loadDataFile'](this[_0x52a4d6('0x395')],_0x161ea4),window[this['_callEventMap']]?this[_0x52a4d6('0x2d6')]():this[_0x52a4d6('0xae')]('CallEvent');},Game_Interpreter[_0x3b3036('0x1d7')][_0x3b3036('0x2d6')]=function(){const _0x3ce82c=_0x3b3036,_0x5d8710=this[_0x3ce82c('0x1b5')],_0x134bee=window[this[_0x3ce82c('0x395')]],_0x3fb3d0=_0x134bee[_0x3ce82c('0x33')][_0x5d8710[_0x3ce82c('0x23c')]];if(_0x3fb3d0&&_0x3fb3d0[_0x3ce82c('0x18d')][_0x5d8710[_0x3ce82c('0x114')]-0x1]){const _0x493689=_0x3fb3d0[_0x3ce82c('0x18d')][_0x5d8710['pageId']-0x1][_0x3ce82c('0x3fd')];this[_0x3ce82c('0x222')](_0x493689,this[_0x3ce82c('0x23c')]());}window[this[_0x3ce82c('0x395')]]=undefined,this['_callEventMap']=undefined,this[_0x3ce82c('0x1b5')]=undefined;};function Game_CPCInterpreter(){const _0x202cd3=_0x3b3036;this['initialize'][_0x202cd3('0x23d')](this,arguments);};Game_CPCInterpreter[_0x3b3036('0x1d7')]=Object[_0x3b3036('0x6d')](Game_Interpreter[_0x3b3036('0x1d7')]),Game_CPCInterpreter[_0x3b3036('0x1d7')]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x3b3036('0x1d7')][_0x3b3036('0x176')]=function(){const _0x246dd0=_0x3b3036;Game_Interpreter[_0x246dd0('0x1d7')]['clear'][_0x246dd0('0xca')](this),this[_0x246dd0('0x31')]=![];},Game_CPCInterpreter[_0x3b3036('0x1d7')]['execute']=function(){const _0x443744=_0x3b3036;while(this[_0x443744('0x1ee')]()){this[_0x443744('0x13a')]();}},Game_CPCInterpreter[_0x3b3036('0x1d7')]['command108']=function(_0x75df46){const _0x5f02f0=_0x3b3036;return Game_Interpreter[_0x5f02f0('0x1d7')][_0x5f02f0('0x309')]['call'](this,_0x75df46),this['_comments'][_0x5f02f0('0x3b1')](_0x60f758=>_0x60f758[_0x5f02f0('0x2f4')](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x5f02f0('0x31')]=!![]),!![];},VisuMZ['EventsMoveCore'][_0x3b3036('0x3e1')]=Scene_Map['prototype'][_0x3b3036('0x197')],Scene_Map[_0x3b3036('0x1d7')][_0x3b3036('0x197')]=function(){const _0x408e91=_0x3b3036;VisuMZ[_0x408e91('0x261')][_0x408e91('0x3e1')][_0x408e91('0xca')](this),this[_0x408e91('0x3c6')]['hideShadows']();},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x2a1')]=Scene_Load[_0x3b3036('0x1d7')][_0x3b3036('0x174')],Scene_Load['prototype'][_0x3b3036('0x174')]=function(){const _0x3ce876=_0x3b3036;if($gameMap)$gameMap[_0x3ce876('0x318')]();VisuMZ[_0x3ce876('0x261')]['Scene_Load_onLoadSuccess'][_0x3ce876('0xca')](this);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0xb1')]=Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x386')],Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x386')]=function(){const _0x52e940=_0x3b3036;VisuMZ[_0x52e940('0x261')][_0x52e940('0xb1')][_0x52e940('0xca')](this),this['initMembersEventsMoveCore'](),this[_0x52e940('0x1f3')]();},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x2b')]=function(){const _0x7ffa39=_0x3b3036;this[_0x7ffa39('0x50')]=0xff;},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x1f3')]=function(){const _0x375722=_0x3b3036;this[_0x375722('0x3f4')]=new Sprite(),this[_0x375722('0x3f4')][_0x375722('0x57')]=ImageManager[_0x375722('0x236')](_0x375722('0x415')),this[_0x375722('0x3f4')][_0x375722('0x57')][_0x375722('0x18c')]=![],this[_0x375722('0x3f4')][_0x375722('0x3c')](0x0,0x0,0x0,0x0),this[_0x375722('0x3f4')]['anchor']['x']=0.5,this[_0x375722('0x3f4')][_0x375722('0x32')]['y']=0x1,this[_0x375722('0x34b')](this[_0x375722('0x3f4')]);},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x3e')]=function(){const _0x19461b=_0x3b3036;return this[_0x19461b('0x389')]&&this['_characterName']['match'](/\[VS8\]/i);},Sprite_Character['prototype'][_0x3b3036('0xd9')]=function(){const _0x1191e8=_0x3b3036;return this[_0x1191e8('0x3e')]()&&VisuMZ[_0x1191e8('0x261')]['Settings'][_0x1191e8('0x35b')][_0x1191e8('0x2b3')];},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x430')]=Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x31d')],Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x31d')]=function(){const _0x41e5e6=_0x3b3036;VisuMZ['EventsMoveCore'][_0x41e5e6('0x430')][_0x41e5e6('0xca')](this);if(VisuMZ[_0x41e5e6('0x261')][_0x41e5e6('0x239')][_0x41e5e6('0x257')]['EnableDashTilt']){if(_0x41e5e6('0x2bd')==='wixTp')this[_0x41e5e6('0x274')]();else{function _0x4babc4(){return _0x466ddd>0x0?0x6:0x4;}}}this[_0x41e5e6('0x214')]&&this[_0x41e5e6('0x305')]();if(this[_0x41e5e6('0x3f4')]){if(_0x41e5e6('0x8c')!==_0x41e5e6('0x1fc'))this[_0x41e5e6('0xb8')]();else{function _0x584f34(){_0x26302c=_0x5b00a2[_0x30faac];}}}},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x8e')]=Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x24d')],Sprite_Character[_0x3b3036('0x1d7')]['setTileBitmap']=function(){const _0x19455c=_0x3b3036;VisuMZ[_0x19455c('0x261')]['Sprite_Character_setTileBitmap']['call'](this),this['bitmap'][_0x19455c('0x31b')](this['updateBitmapSmoothing'][_0x19455c('0x39d')](this));},VisuMZ['EventsMoveCore'][_0x3b3036('0x89')]=Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x149')],Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x149')]=function(){const _0x1645a6=_0x3b3036;VisuMZ[_0x1645a6('0x261')]['Sprite_Character_setCharacterBitmap'][_0x1645a6('0xca')](this),this[_0x1645a6('0x57')][_0x1645a6('0x31b')](this['updateBitmapSmoothing']['bind'](this));},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x207')]=function(){const _0x1b0815=_0x3b3036;if(!this[_0x1b0815('0x57')])return;this[_0x1b0815('0x57')][_0x1b0815('0x18c')]=!!VisuMZ[_0x1b0815('0x261')]['Settings'][_0x1b0815('0x257')][_0x1b0815('0x93')];},VisuMZ['EventsMoveCore'][_0x3b3036('0x77')]=Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x15a')],Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x15a')]=function(){const _0xe34625=_0x3b3036;if(this[_0xe34625('0x3e')]())return this['characterPatternYVS8']();else{if('mbdEq'===_0xe34625('0x3f7')){function _0x3e3b3d(){const _0x7f3039=_0xe34625;this[_0x7f3039('0x192')]=_0x10ec25[_0x7f3039('0xf')];}}else return VisuMZ[_0xe34625('0x261')][_0xe34625('0x77')][_0xe34625('0xca')](this);}},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x16b')]=function(){const _0x17712e=_0x3b3036,_0x124b1e=this['_character'][_0x17712e('0x2ce')](),_0x5ea3f9=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x5ea3f9[_0x124b1e]-0x2)/0x2;},Sprite_Character['prototype']['updateTilt']=function(){const _0x2e361f=_0x3b3036;this[_0x2e361f('0x2f9')]=0x0;if(this[_0x2e361f('0x7d')]()){const _0x4ab3e2=VisuMZ[_0x2e361f('0x261')][_0x2e361f('0x239')]['Movement'],_0x70e682=this[_0x2e361f('0xd2')][_0x2e361f('0x2ce')]();if([0x1,0x4,0x7]['includes'](_0x70e682))this[_0x2e361f('0x2f9')]=_0x4ab3e2[_0x2e361f('0x35a')];if([0x3,0x6,0x9][_0x2e361f('0xdb')](_0x70e682))this['rotation']=_0x4ab3e2[_0x2e361f('0x3f1')];[0x2,0x8][_0x2e361f('0xdb')](_0x70e682)&&(this['rotation']=[-_0x4ab3e2[_0x2e361f('0x5a')],0x0,_0x4ab3e2[_0x2e361f('0x5a')]][this[_0x2e361f('0xd2')][_0x2e361f('0x28e')]()]);}},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x7d')]=function(){const _0x1af8d0=_0x3b3036;if(this[_0x1af8d0('0x73')])return![];return this[_0x1af8d0('0xd2')]['isDashingAndMoving']()&&!this['_character'][_0x1af8d0('0x1d6')]()&&!this[_0x1af8d0('0xd2')][_0x1af8d0('0x301')]()&&this[_0x1af8d0('0x315')]()===0x0;},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x305')]=function(){const _0x34d227=_0x3b3036;this[_0x34d227('0x214')]['x']=this[_0x34d227('0xd2')]['shadowX'](),this['_shadowSprite']['y']=this[_0x34d227('0xd2')][_0x34d227('0x9d')](),this['_shadowSprite']['opacity']=this[_0x34d227('0xa1')],this[_0x34d227('0x214')][_0x34d227('0x1fe')]=this[_0x34d227('0xd2')][_0x34d227('0x1dc')](),this[_0x34d227('0x214')][_0x34d227('0x2c2')]=this[_0x34d227('0x2c2')],!this[_0x34d227('0xd2')][_0x34d227('0x3e4')]()?(this[_0x34d227('0x214')][_0x34d227('0x173')]['x']=Math[_0x34d227('0x32e')](0x1,this[_0x34d227('0x214')][_0x34d227('0x173')]['x']+0.1),this[_0x34d227('0x214')][_0x34d227('0x173')]['y']=Math[_0x34d227('0x32e')](0x1,this[_0x34d227('0x214')][_0x34d227('0x173')]['y']+0.1)):(this[_0x34d227('0x214')][_0x34d227('0x173')]['x']=Math['max'](0x0,this[_0x34d227('0x214')][_0x34d227('0x173')]['x']-0.1),this[_0x34d227('0x214')][_0x34d227('0x173')]['y']=Math[_0x34d227('0x9b')](0x0,this[_0x34d227('0x214')][_0x34d227('0x173')]['y']-0.1));},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0xb8')]=function(){const _0xb8c5b1=_0x3b3036,_0x1ebc6d=this[_0xb8c5b1('0x3f4')],_0x5cd5df=this[_0xb8c5b1('0x315')]();if(_0x5cd5df<=0x0){if(_0xb8c5b1('0xce')===_0xb8c5b1('0xce'))return _0x1ebc6d[_0xb8c5b1('0x3c')](0x0,0x0,0x0,0x0);else{function _0x3a96c0(){const _0x49860f=_0xb8c5b1;if(_0x4d568b===0x1)return this[_0x49860f('0x104')](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x3398c6===0x3)return this[_0x49860f('0x104')](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x332ff0===0x7)return this[_0x49860f('0x104')](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x20cd3a===0x9)return this[_0x49860f('0x104')](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x1578d4;}}}else{const _0x3a6f6c=ImageManager[_0xb8c5b1('0x306')],_0x251f8f=ImageManager[_0xb8c5b1('0x163')],_0x111b3b=_0x5cd5df%0x10*_0x3a6f6c,_0x3132e8=Math[_0xb8c5b1('0x260')](_0x5cd5df/0x10)*_0x251f8f;_0x1ebc6d['setFrame'](_0x111b3b,_0x3132e8,_0x3a6f6c,_0x251f8f),this[_0xb8c5b1('0x1fe')]=!![];}const _0x5dede9=this[_0xb8c5b1('0xd2')]['getEventIconData']();this[_0xb8c5b1('0xd9')]()?this[_0xb8c5b1('0x26d')](_0x1ebc6d):(_0x1ebc6d['x']=_0x5dede9?_0x5dede9['bufferX']:0x0,_0x1ebc6d['y']=_0x5dede9?-this[_0xb8c5b1('0x33b')]+_0x5dede9[_0xb8c5b1('0x434')]:0x0),_0x1ebc6d[_0xb8c5b1('0x302')]=_0x5dede9?_0x5dede9['blendMode']:0x0,this['removeChild'](_0x1ebc6d),this['addChild'](_0x1ebc6d),_0x1ebc6d['rotation']=-this[_0xb8c5b1('0x2f9')];},Sprite_Character[_0x3b3036('0x1d7')]['autoEventIconBuffer']=function(_0x95b576){const _0x5a0a3e=_0x3b3036;_0x95b576['x']=0x0,_0x95b576['y']=-this[_0x5a0a3e('0x33b')]+this[_0x5a0a3e('0x33b')]*0x2/0x5,this[_0x5a0a3e('0xd2')][_0x5a0a3e('0x28e')]()!==0x1&&(_0x95b576['y']+=0x1);},Sprite_Character[_0x3b3036('0x1d7')][_0x3b3036('0x315')]=function(){const _0x107ef7=_0x3b3036;if(!this[_0x107ef7('0xd2')])return 0x0;const _0x377aae=this[_0x107ef7('0xd2')][_0x107ef7('0x1bf')]();return _0x377aae?_0x377aae[_0x107ef7('0x102')]||0x0:0x0;},VisuMZ['EventsMoveCore'][_0x3b3036('0x1bc')]=Sprite_Balloon[_0x3b3036('0x1d7')]['setup'],Sprite_Balloon[_0x3b3036('0x1d7')][_0x3b3036('0xf6')]=function(_0x5c4835,_0x15187e){const _0x29ef44=_0x3b3036;VisuMZ['EventsMoveCore'][_0x29ef44('0x1bc')][_0x29ef44('0xca')](this,_0x5c4835,_0x15187e),VisuMZ['EventsMoveCore'][_0x29ef44('0x239')]['VS8']['AutoBalloon']&&this[_0x29ef44('0x1ad')][_0x29ef44('0xd2')][_0x29ef44('0x48')](_0x15187e,this[_0x29ef44('0x21f')]);},VisuMZ['EventsMoveCore'][_0x3b3036('0x36d')]=Sprite_Balloon[_0x3b3036('0x1d7')]['updatePosition'],Sprite_Balloon[_0x3b3036('0x1d7')][_0x3b3036('0x255')]=function(){const _0x1ed243=_0x3b3036;VisuMZ[_0x1ed243('0x261')][_0x1ed243('0x36d')][_0x1ed243('0xca')](this),this[_0x1ed243('0x1fd')]();},Sprite_Balloon[_0x3b3036('0x1d7')]['updateVS8BalloonOffsets']=function(){const _0x72ed55=_0x3b3036;this[_0x72ed55('0x1ad')][_0x72ed55('0xd2')][_0x72ed55('0x3e')]()&&(this['x']+=VisuMZ[_0x72ed55('0x261')][_0x72ed55('0x239')][_0x72ed55('0x35b')]['BalloonOffsetX'],this['y']+=VisuMZ['EventsMoveCore']['Settings'][_0x72ed55('0x35b')][_0x72ed55('0xfc')]);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x1b1')]=Spriteset_Map[_0x3b3036('0x1d7')][_0x3b3036('0x331')],Spriteset_Map[_0x3b3036('0x1d7')]['createLowerLayer']=function(){const _0x4b7e3c=_0x3b3036;VisuMZ[_0x4b7e3c('0x261')][_0x4b7e3c('0x1b1')]['call'](this),this[_0x4b7e3c('0x3b8')]();},VisuMZ[_0x3b3036('0x261')]['Spriteset_Map_createShadow']=Spriteset_Map[_0x3b3036('0x1d7')]['createShadow'],Spriteset_Map[_0x3b3036('0x1d7')]['createShadow']=function(){const _0x446d5e=_0x3b3036;VisuMZ['EventsMoveCore'][_0x446d5e('0x112')]['call'](this),this[_0x446d5e('0x282')]();},Spriteset_Map['prototype'][_0x3b3036('0x282')]=function(){const _0x126d46=_0x3b3036;if(!VisuMZ[_0x126d46('0x261')][_0x126d46('0x239')][_0x126d46('0x257')]['ShowShadows'])return;for(const _0x51a576 of this[_0x126d46('0x2a8')]){if(_0x126d46('0x258')===_0x126d46('0x258'))this[_0x126d46('0x299')](_0x51a576);else{function _0x29a7c8(){const _0xf4e645=_0x126d46;return _0x1f9723['setLastPluginCommandInterpreter'](this),_0x3893f0[_0xf4e645('0x261')]['Game_Interpreter_PluginCommand'][_0xf4e645('0xca')](this,_0x52eef0);}}}},Spriteset_Map[_0x3b3036('0x1d7')][_0x3b3036('0x299')]=function(_0x2b0eee){const _0x39872e=_0x3b3036;_0x2b0eee[_0x39872e('0x214')]=new Sprite(),_0x2b0eee[_0x39872e('0x214')]['_filename']=_0x2b0eee[_0x39872e('0xd2')][_0x39872e('0x10d')](),_0x2b0eee[_0x39872e('0x214')][_0x39872e('0x57')]=ImageManager[_0x39872e('0x236')](_0x2b0eee[_0x39872e('0x214')][_0x39872e('0x1f9')]),_0x2b0eee[_0x39872e('0x214')][_0x39872e('0x32')]['x']=0.5,_0x2b0eee[_0x39872e('0x214')]['anchor']['y']=0x1,_0x2b0eee['_shadowSprite']['z']=0x0,this[_0x39872e('0xea')][_0x39872e('0x34b')](_0x2b0eee[_0x39872e('0x214')]);},Spriteset_Map[_0x3b3036('0x1d7')][_0x3b3036('0x2')]=function(){const _0x145068=_0x3b3036;if(!VisuMZ['EventsMoveCore']['Settings']['Movement'][_0x145068('0x437')])return;for(const _0x47e496 of this[_0x145068('0x2a8')]){this[_0x145068('0xea')][_0x145068('0x76')](_0x47e496[_0x145068('0x214')]);}},Spriteset_Map[_0x3b3036('0x1d7')][_0x3b3036('0x3b8')]=function(){const _0x4f1aec=_0x3b3036;this[_0x4f1aec('0x184')]=[];for(const _0x21db5f of $gameMap['events']()){this[_0x4f1aec('0x3ad')](_0x21db5f);}},Spriteset_Map[_0x3b3036('0x1d7')][_0x3b3036('0x3ad')]=function(_0x596daf){const _0x398aba=_0x3b3036;if(!this[_0x398aba('0x23f')](_0x596daf))return;const _0x40f65d=new Window_EventLabel(_0x596daf);_0x40f65d['z']=0x8,_0x40f65d['spriteId']=Sprite[_0x398aba('0x227')]++,this[_0x398aba('0xea')][_0x398aba('0x34b')](_0x40f65d),this[_0x398aba('0x184')][_0x398aba('0x2d')](_0x40f65d);},Spriteset_Map[_0x3b3036('0x1d7')][_0x3b3036('0x23f')]=function(_0x36d243){const _0x2eeee4=_0x3b3036,_0xd9620c=_0x36d243[_0x2eeee4('0x414')]();if(_0xd9620c['note'][_0x2eeee4('0x2f4')](/<LABEL:[ ](.*?)>/i))return!![];if(_0xd9620c['note'][_0x2eeee4('0x2f4')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x532d1e of _0xd9620c[_0x2eeee4('0x18d')]){let _0x15e8fb='';for(const _0x5be662 of _0x532d1e['list']){if(_0x2eeee4('0xef')==='pCQPz'){function _0x2c2801(){const _0x2e4ffa=_0x2eeee4;_0x3c064b['prototype'][_0x2e4ffa('0x401')][_0x2e4ffa('0xca')](this);if([_0x2e4ffa('0x2c7'),'region']['includes'](this[_0x2e4ffa('0x167')]()))return;_0x4c52e1[_0x2e4ffa('0x10e')]([0x2]);}}else[0x6c,0x198][_0x2eeee4('0xdb')](_0x5be662['code'])&&(_0x15e8fb+=_0x5be662['parameters'][0x0]);}if(_0x15e8fb['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x15e8fb[_0x2eeee4('0x2f4')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x2eeee4('0x267')===_0x2eeee4('0x267'))return!![];else{function _0x47a44b(){const _0x3a6ca5=_0x2eeee4,_0x2eae3f=_0x5200f5(_0x37cd95['$1']);return this[_0x3a6ca5('0x36a')](_0x2eae3f);}}}}return![];},Spriteset_Map[_0x3b3036('0x1d7')][_0x3b3036('0x1b4')]=function(_0x25cc0c){const _0x515aba=_0x3b3036;this[_0x515aba('0x2a8')]=this[_0x515aba('0x2a8')]||[];const _0x2ee08e=new Sprite_Character(_0x25cc0c);this['_characterSprites'][_0x515aba('0x2d')](_0x2ee08e),this[_0x515aba('0xea')]['addChild'](_0x2ee08e),this[_0x515aba('0x299')](_0x2ee08e),this['createLabelWindowForTarget'](_0x25cc0c),_0x2ee08e[_0x515aba('0x31d')]();},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x17f')]=Game_Message[_0x3b3036('0x1d7')][_0x3b3036('0xdc')],Game_Message[_0x3b3036('0x1d7')]['setNumberInput']=function(_0x2793d4,_0x2d67ae){const _0x1b2d8b=_0x3b3036;this[_0x1b2d8b('0x1c')]=$gameTemp['getSelfTarget'](),VisuMZ[_0x1b2d8b('0x261')][_0x1b2d8b('0x17f')]['call'](this,_0x2793d4,_0x2d67ae);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x317')]=Window_NumberInput[_0x3b3036('0x1d7')][_0x3b3036('0x3e8')],Window_NumberInput['prototype'][_0x3b3036('0x3e8')]=function(){const _0xf59971=_0x3b3036;$gameTemp[_0xf59971('0x1ab')]($gameMessage[_0xf59971('0x1c')]),VisuMZ['EventsMoveCore']['Window_NumberInput_start'][_0xf59971('0xca')](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x3b3036('0x261')]['Window_NumberInput_processOk']=Window_NumberInput['prototype'][_0x3b3036('0x31a')],Window_NumberInput[_0x3b3036('0x1d7')][_0x3b3036('0x31a')]=function(){const _0x50ef67=_0x3b3036;$gameTemp[_0x50ef67('0x1ab')]($gameMessage[_0x50ef67('0x1c')]),VisuMZ['EventsMoveCore']['Window_NumberInput_processOk'][_0x50ef67('0xca')](this),$gameTemp[_0x50ef67('0x2cc')](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x194')]=Game_Message[_0x3b3036('0x1d7')]['setItemChoice'],Game_Message['prototype'][_0x3b3036('0x241')]=function(_0x198083,_0x5ad08f){const _0x1e631b=_0x3b3036;this['_selfTargetItemChoice']=$gameTemp[_0x1e631b('0x211')](),VisuMZ['EventsMoveCore'][_0x1e631b('0x194')][_0x1e631b('0xca')](this,_0x198083,_0x5ad08f);},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x3a5')]=Window_EventItem[_0x3b3036('0x1d7')][_0x3b3036('0x225')],Window_EventItem['prototype'][_0x3b3036('0x225')]=function(){const _0x4aeb39=_0x3b3036;$gameTemp['registerSelfTarget']($gameMessage[_0x4aeb39('0x15b')]),VisuMZ[_0x4aeb39('0x261')][_0x4aeb39('0x3a5')][_0x4aeb39('0xca')](this),$gameTemp[_0x4aeb39('0x2cc')](),$gameMessage[_0x4aeb39('0x15b')]=undefined;},VisuMZ[_0x3b3036('0x261')]['Window_EventItem_onCancel']=Window_EventItem['prototype'][_0x3b3036('0xbe')],Window_EventItem['prototype']['onCancel']=function(){const _0x2af617=_0x3b3036;$gameTemp[_0x2af617('0x1ab')]($gameMessage['_selfTargetItemChoice']),VisuMZ[_0x2af617('0x261')][_0x2af617('0x1a6')][_0x2af617('0xca')](this),$gameTemp[_0x2af617('0x2cc')](),$gameMessage[_0x2af617('0x15b')]=undefined;},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x170')]=Window_Message[_0x3b3036('0x1d7')][_0x3b3036('0x3ca')],Window_Message[_0x3b3036('0x1d7')][_0x3b3036('0x3ca')]=function(){const _0x38a074=_0x3b3036;$gameMessage[_0x38a074('0xf2')](),VisuMZ[_0x38a074('0x261')][_0x38a074('0x170')][_0x38a074('0xca')](this),$gameTemp[_0x38a074('0x2cc')]();},VisuMZ[_0x3b3036('0x261')][_0x3b3036('0x3a2')]=Window_ScrollText['prototype']['startMessage'],Window_ScrollText[_0x3b3036('0x1d7')][_0x3b3036('0x3ca')]=function(){const _0x19533d=_0x3b3036;$gameMessage[_0x19533d('0xf2')](),VisuMZ[_0x19533d('0x261')][_0x19533d('0x3a2')][_0x19533d('0xca')](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel[_0x3b3036('0x1d7')]=Object[_0x3b3036('0x6d')](Window_Base[_0x3b3036('0x1d7')]),Window_EventLabel[_0x3b3036('0x1d7')]['constructor']=Window_EventLabel,Window_EventLabel[_0x3b3036('0x1d7')][_0x3b3036('0x23a')]=function(_0x20de58){const _0x451e39=_0x3b3036;this[_0x451e39('0x27d')]=_0x20de58;const _0x20e191=new Rectangle(0x0,0x0,Graphics[_0x451e39('0xfa')]/0x4,this[_0x451e39('0x29')](0x1));Window_Base[_0x451e39('0x1d7')][_0x451e39('0x23a')][_0x451e39('0xca')](this,_0x20e191),this[_0x451e39('0x288')](0x2),this[_0x451e39('0x3f6')]='';},Window_EventLabel[_0x3b3036('0x1d7')]['update']=function(){const _0x41e112=_0x3b3036;Window_Base[_0x41e112('0x1d7')][_0x41e112('0x31d')][_0x41e112('0xca')](this),this[_0x41e112('0x165')](),this[_0x41e112('0x283')](),this['updatePosition'](),this[_0x41e112('0xf3')]();},Window_EventLabel['prototype']['updateText']=function(){const _0xd0c21b=_0x3b3036;this['_event']['labelWindowText']()!==this[_0xd0c21b('0x3f6')]&&(this['_text']=this[_0xd0c21b('0x27d')][_0xd0c21b('0x33f')](),this[_0xd0c21b('0x1b8')]());},Window_EventLabel[_0x3b3036('0x1d7')][_0x3b3036('0x283')]=function(){const _0x52ec58=_0x3b3036;this[_0x52ec58('0x173')]['x']=0x1/$gameScreen[_0x52ec58('0x56')](),this[_0x52ec58('0x173')]['y']=0x1/$gameScreen['zoomScale']();},Window_EventLabel['prototype'][_0x3b3036('0x255')]=function(){const _0x1c2ef3=_0x3b3036;if(!SceneManager[_0x1c2ef3('0x103')])return;if(!SceneManager['_scene'][_0x1c2ef3('0x3c6')])return;const _0x213555=SceneManager['_scene'][_0x1c2ef3('0x3c6')]['findTargetSprite'](this[_0x1c2ef3('0x27d')]);if(!_0x213555)return;this['x']=Math[_0x1c2ef3('0x391')](this[_0x1c2ef3('0x27d')][_0x1c2ef3('0x1ed')]()-Math[_0x1c2ef3('0x260')](this[_0x1c2ef3('0x42')]*this[_0x1c2ef3('0x173')]['x']/0x2)),this['x']+=this[_0x1c2ef3('0x27d')][_0x1c2ef3('0xd1')][_0x1c2ef3('0x2f6')],this['y']=this[_0x1c2ef3('0x27d')][_0x1c2ef3('0x12e')]()-_0x213555[_0x1c2ef3('0x33b')],this['y']+=Math[_0x1c2ef3('0x391')]($gameSystem[_0x1c2ef3('0x39b')]()*0.5),this['y']-=Math[_0x1c2ef3('0x391')](this[_0x1c2ef3('0x33b')]*this[_0x1c2ef3('0x173')]['y']),this['y']+=this[_0x1c2ef3('0x27d')][_0x1c2ef3('0xd1')][_0x1c2ef3('0x34f')];},Window_EventLabel['prototype'][_0x3b3036('0xf3')]=function(){const _0x38332d=_0x3b3036;if(this[_0x38332d('0x128')]()){if(_0x38332d('0x400')==='wBGsg'){function _0x16ec61(){const _0x8ce8d3=_0x38332d;return this[_0x8ce8d3('0x1a2')](0x8,_0x3876ae(_0x45ad1c['$1']));}}else this[_0x38332d('0xf1')]+=this[_0x38332d('0x3c9')]();}else{if(SceneManager[_0x38332d('0x103')]['_encounterEffectDuration']>0x0){if('UTFur'==='UTFur')this[_0x38332d('0xf1')]=0x0;else{function _0x1426bd(){const _0x1a4d53=_0x38332d;if(_0x629298[_0x1a4d53('0x2f4')](/Z/i))_0x48dde3=_0x1a4d53('0x7f');if(_0x222acb['match'](/SLEEP/i))_0x30659b=_0x1a4d53('0x7f');this['isSpriteVS8dir']()&&(this[_0x1a4d53('0x125')]=_0x5a07d1['toUpperCase']()[_0x1a4d53('0x14d')](),this['_poseDuration']=_0x3ceccd||_0x2d0b0e);}}}else this[_0x38332d('0xf1')]-=this[_0x38332d('0x3c9')]();}},Window_EventLabel['prototype'][_0x3b3036('0x128')]=function(){const _0x5cb544=_0x3b3036;if(!$gameSystem[_0x5cb544('0x3f2')]())return![];if(this['_event']?.['_erased'])return![];if(SceneManager[_0x5cb544('0x103')]['_encounterEffectDuration']>0x0)return![];const _0x5bb6f3=$gamePlayer['x'],_0x2127c8=$gamePlayer['y'],_0x54a7f9=this[_0x5cb544('0x27d')]['x'],_0x12c7d5=this[_0x5cb544('0x27d')]['y'];if($gameMap[_0x5cb544('0x1f5')](_0x5bb6f3,_0x2127c8,_0x54a7f9,_0x12c7d5)>this[_0x5cb544('0x27d')][_0x5cb544('0x1fa')]())return![];return!![];},Window_EventLabel[_0x3b3036('0x1d7')][_0x3b3036('0x3c9')]=function(){const _0x45434b=_0x3b3036;return VisuMZ[_0x45434b('0x261')]['Settings'][_0x45434b('0x245')][_0x45434b('0x96')];},Window_EventLabel[_0x3b3036('0x1d7')][_0x3b3036('0x27f')]=function(){const _0x50be30=_0x3b3036,_0x24a00e=this[_0x50be30('0x105')](this[_0x50be30('0x3f6')]);this[_0x50be30('0x42')]=_0x24a00e[_0x50be30('0x42')]+($gameSystem['windowPadding']()+this['itemPadding']())*0x2,this[_0x50be30('0x33b')]=Math['max'](this[_0x50be30('0x38b')](),_0x24a00e[_0x50be30('0x33b')])+$gameSystem['windowPadding']()*0x2,this[_0x50be30('0x19d')]();},Window_EventLabel[_0x3b3036('0x1d7')][_0x3b3036('0x38b')]=function(){const _0x31ade1=_0x3b3036;return VisuMZ[_0x31ade1('0x261')][_0x31ade1('0x239')][_0x31ade1('0x245')][_0x31ade1('0x426')];},Window_EventLabel[_0x3b3036('0x1d7')]['resetFontSettings']=function(){const _0x19d92e=_0x3b3036;Window_Base[_0x19d92e('0x1d7')][_0x19d92e('0xb0')][_0x19d92e('0xca')](this),this[_0x19d92e('0x172')]['fontSize']=this[_0x19d92e('0x3e6')]();},Window_EventLabel[_0x3b3036('0x1d7')][_0x3b3036('0x3e6')]=function(){const _0x41e13a=_0x3b3036;return VisuMZ[_0x41e13a('0x261')][_0x41e13a('0x239')][_0x41e13a('0x245')][_0x41e13a('0x33d')];},Window_EventLabel[_0x3b3036('0x1d7')]['refresh']=function(){const _0x225dfb=_0x3b3036;this[_0x225dfb('0x27f')](),this['contents'][_0x225dfb('0x176')]();const _0x3d1864=this[_0x225dfb('0x3f6')][_0x225dfb('0x85')](/[\r\n]+/);let _0x50e0a2=0x0;for(const _0x1ae6f1 of _0x3d1864){if(_0x225dfb('0x397')!==_0x225dfb('0x2c6')){const _0x59d606=this['textSizeEx'](_0x1ae6f1),_0x55f2a8=Math[_0x225dfb('0x260')]((this['innerWidth']-_0x59d606[_0x225dfb('0x42')])/0x2);this[_0x225dfb('0x2ff')](_0x1ae6f1,_0x55f2a8,_0x50e0a2),_0x50e0a2+=_0x59d606['height'];}else{function _0x2112f1(){return![];}}}},Window_EventLabel[_0x3b3036('0x1d7')][_0x3b3036('0x1e')]=function(_0x13c25b,_0x13c643){const _0x547829=_0x3b3036;if(_0x13c643[_0x547829('0x3a9')]){if(_0x547829('0x5')===_0x547829('0x5'))this[_0x547829('0x24e')](_0x13c25b,_0x13c643['x']+0x2,_0x13c643['y']);else{function _0xc25040(){const _0x397bf7=_0x547829;if(this[_0x397bf7('0x3dd')]===_0x25171f)this[_0x397bf7('0x2a')]();if(this[_0x397bf7('0x3dd')]['VisibleEventLabels']===_0x314556)this[_0x397bf7('0x2a')]();return this['_EventsMoveCoreSettings']['VisibleEventLabels'];}}}_0x13c643['x']+=Math[_0x547829('0x32e')](this['iconSize'](),ImageManager['iconWidth'])+0x4;},Window_EventLabel[_0x3b3036('0x1d7')]['drawIcon']=function(_0x407f68,_0x181b13,_0x21a969){const _0x50db2a=_0x3b3036,_0x16202f=ImageManager['loadSystem'](_0x50db2a('0x415')),_0x3b91b0=ImageManager[_0x50db2a('0x306')],_0xad3e0c=ImageManager[_0x50db2a('0x163')],_0x335ad6=_0x407f68%0x10*_0x3b91b0,_0x4a4f85=Math[_0x50db2a('0x260')](_0x407f68/0x10)*_0xad3e0c,_0x539b19=Math['min'](this['iconSize']()),_0x3ffc77=Math[_0x50db2a('0x32e')](this[_0x50db2a('0xe2')]());this[_0x50db2a('0x172')][_0x50db2a('0x1f')](_0x16202f,_0x335ad6,_0x4a4f85,_0x3b91b0,_0xad3e0c,_0x181b13,_0x21a969,_0x539b19,_0x3ffc77);},Window_EventLabel[_0x3b3036('0x1d7')][_0x3b3036('0xe2')]=function(){const _0x25f88e=_0x3b3036;return VisuMZ[_0x25f88e('0x261')]['Settings'][_0x25f88e('0x245')]['IconSize'];};