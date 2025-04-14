import * as scenes from "../scenes/scenes.js";

export const BUTTON_CALLBACKS = {
    "PLAY": (game) => {
        game.addScene(new scenes.CharacterSelectScene(game));
    },
    "SETTINGS": (game) => {
        game.addScene(new scenes.SettingsScene(game));
    },
    "HOW": (game) => {
        game.addScene(new scenes.HowToScene(game));
    },
    "RETURN": (game) => {
        if (game.scenes.length === 1) return;      
        game.ctxHigh.clearRect(0, 0, game.ctxHigh.canvas.width, game.ctxHigh.canvas.height);
        game.removeScene();
    },
    "RESUME": (game) => {
        game.ctxHigh.clearRect(0, 0, game.ctxHigh.canvas.width, game.ctxHigh.canvas.height);
        game.removeScene();
    },
    "CONFIRM": (game) => {
        const scene = game.removeScene();

        for (let setting of scene.settingsChoices) {
            game.gameSettings[setting.id] = setting.getSelection();
        }

        game.gameSettings.roundDuration = scene.rangeSettings[0].getValue();
        game.gameSettings.volume = scene.rangeSettings[1].getValue();

        const sounds = document.querySelectorAll("audio");
        for (const sound of sounds) {
            sound.volume = .5 * (game.gameSettings.volume/100);
        }//end for
        
    },
    "MAIN": (game) => {
        game.scenes = game.scenes.slice(0, 1);
        game.numScenes = 1;
        game.scene = game.scenes[game.numScenes-1];
        game.bgm.pause();
        game.bgm.currentTime = 0;
    },
    "BATTLE": (game) => {
        const scene = game.scene;
        let selectedFighters = scene.selectedCharacters;
        if (selectedFighters.length < 2) {
            alert ("PLease select two characters.");
            return;
        }//end if
        game.removeScene();

        game.fighters[0] = selectedFighters[0].id;
        game.fighters[1] = selectedFighters[1].id; 
        
        game.ctxHigh.clearRect(0, 0, game.ctxHigh.canvas.width, game.ctxHigh.canvas.height);
        game.addScene(new scenes.BattleScene(game));
    },
    "REMATCH": (game) => {
        game.removeScene();
        game.removeScene();
        game.addScene(new scenes.BattleScene(game))
    }//REMATCH
}