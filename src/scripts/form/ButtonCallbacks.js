import * as scenes from "../scenes/scenes.js";

export const BUTTON_CALLBACKS = {
    "PLAY": (game) => {
        game.scenes[game.numScenes] = new scenes.CharacterSelectScene(game);
        game.numScenes += 1;
        game.scene = game.scenes[game.numScenes - 1];
    },
    "SETTINGS": (game) => {
        game.scenes[game.numScenes] = new scenes.SettingsScene(game);
        game.numScenes += 1;
        game.scene = game.scenes[game.numScenes - 1]
    },
    "HOW": (game) => {
        game.scenes[game.numScenes] = new scenes.HowToScene(game);
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
        game.scene= game.scenes[game.numScenes - 1];
    }
}