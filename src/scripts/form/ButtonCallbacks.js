import * as scenes from "../scenes/scenes.js";

export const BUTTON_CALLBACKS = {
    "PLAY": (game) => {
        game.scenes.push(new scenes.CharacterSelectScene(game));
        game.numScenes += 1;
        game.scene = game.scenes[game.numScenes - 1];
    },
    "SETTINGS": (game) => {
        game.scenes.push(new scenes.SettingsScene(game));
        game.numScenes += 1;
        game.scene = game.scenes[game.numScenes - 1]
    },
    "HOW": (game) => {
        game.scenes.push(new scenes.HowToScene(game));
        game.numScenes += 1;
        game.scene = game.scenes[game.numScenes - 1];
    },
    "RETURN": (game) => {
        game.scenes.pop();
        game.numScenes -= 1;
        game.scene = game.scenes[game.numScenes - 1]
    },
    "CONFIRM": (game) => {
        let scene = game.scenes.pop();

        //update number of rounds and music on/off
        for (let setting of scene.settingsChoices) {
            game.gameSettings[setting.id] = setting.getSelection();
        }

        //update roundDuration and volume.
        game.gameSettings.roundDuration = scene.rangeSettings[0].getValue();
        game.gameSettings.volume = scene.rangeSettings[1].getValue();
        
        game.numScenes -=1;
        game.scene = game.scenes[game.numScenes - 1];
    },
    "MAIN": (game) => {
        console.log("Not implemented yet!");
    },
    "BATTLE": (game) => {
        let selectedFighters = game.scene.selectedCharacters;
        if (selectedFighters.length < 2) {
            alert ("PLease select two characters.");
            return;
        }//end if
        game.fighters[0] = selectedFighters[0].id;
        game.fighters[1] = selectedFighters[1].id; 
        
        game.scenes.pop();
        game.ctxHigh.clearRect(0, 0, game.ctxHigh.canvas.width, game.ctxHigh.canvas.height);
        game.scenes.push(new scenes.BattleScene(game));
        game.scene = game.scenes[game.numScenes-1];
    }
}