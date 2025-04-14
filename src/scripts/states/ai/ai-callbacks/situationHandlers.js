import { isIncoming } from "../../../utils/AiUtils.js";
import { SP_2 } from "../../fighterStates.js";

export const situationHandlers = {
    PRESSURE: ({distance}) => {
        const decisions = [];
        if (distance > 26) decisions.push({ action: "APPROACH", weight: 50 });
        decisions.push({ action: "ENGAGE", weight: 1 });

        return decisions;
    },

    PROJECTILE: ({opponent, distance}) => {
        const decisions = [];
        decisions.push({ action: "CROUCHAI", weight: 100 });

        if (opponent.isAttacking && !opponent.attack instanceof SP_2) decisions.push({action: "DEFEND", weight: 100});
        if (distance > 70) decisions.push({action: "JUMP", weight: 20});

        return decisions;
    },
   
    // LOW_ENERGY: () =>
    //     { action: "RETREAT", weight: 70 },
    //     { action: "ENGAGE", weight: 30 }
    // ,

    HURT_OR_BLOCKING: (context) => {
        const { self, opponent, distance } = context;
        const decisions = [];

        if (opponent.isinStartup && distance < 45)
            decisions.push({ action: "DEFEND", weight: 70 });

        decisions.push({ action: "ENGAGE", weight: 40 });

        if (self.isCornered) decisions.push({ action: "JUMP", weight: 40 });
        else decisions.push({ action: "RETREAT", weight: 80 });

        return decisions;
    },

    ANTI_AIR: ({ self, opponent, distance }) => {
        const decisions = [];

        decisions.push({action: "ANTI_AIR", weight: 10});
        decisions.push({action: "DEFEND", weight: 50});
        
        if (distance > 40) decisions.push({action: "APPROACH", weight: 50});

        return decisions;
    },

    DEFENSE: ({ self, opponent, distance }) => {
        const decisions = [];

        if (opponent.isAttacking && distance < 40)
            decisions.push({ action: "DEFEND", weight: 150 });

        if (self.isLowEnergy) decisions.push({action: "RETREAT", weight: 150});

        if (self.isCornered) decisions.push({ action: "JUMP", weight: 120 });

        decisions.push({ action: "ENGAGE", weight: 50 });

        return decisions;
    },

    IDLE_OPPONENT: ({ distance }) => {
        const decisions = [];
        if (distance < 20) decisions.push({action: "ENGAGE", weight: 40});
        decisions.push({action: "APPROACH", weight: 10});

        return decisions;
    },

    FOOTSIES: ({self, opponent, distance}) => {
        const decisions = [];

        if (self.isCornered || opponent.isCornered) decisions.push({action: "ENGAGE", weight: 100});
        
        if ((self.isWalkingFwd && distance > 20) || opponent.isWalkingBwd) decisions.push({action: "APPROACH", weight: 1});
        if ((self.isWalkingBwd && distance < 20) || opponent.isWalkingFwd) decisions.push({action: "RETREAT", weight: 1});

        if (self.isLowEnergy && !self.iscornered) decisions.push({action: "RETREAT", weight: 10});

        if (distance < 30) decisions.push({action: "ENGAGE", weight: 50});
        if (opponent.isAttacking) decisions.push({action: "DEFEND", weight: 20});

        if (opponent.hasProjectiles && opponent.projectiles.some(proj => isIncoming(self, proj))) {
            decisions.push({action: "CROUCHAI", weight: 20});
        }//end if

        if (decisions.length === 0) decisions.push({action: "OBSERVE", weight: 1});
        return decisions;
    },

    SELF_RETREAT: ({self, opponent, distance}) => {
        const decisions = [];
        if (!opponent.isAttacking && distance < 48) decisions.push({action:"ENGAGE", weight: 50});
        if (!self.isBlocking || !self.isHurt || !self.isLowEnergy) decisions.push({action: "APPROACH",  weight: 50});
        decisions.push({action: "RETREAT", weight: 1});
        return decisions;
    },

    SELF_WALKING_FORWARD: ({opponent, distance}) => {
        const decisions = [];
        if (distance < 20) decisions.push({action: "ENGAGE", weight: 10});

        if (opponent.isAttacking && !opponent.attack instanceof SP_2) {
            decisions.push({aciton: "DEFEND", weight: 20});
        } else {
            decisions.push({action:"CROUCHAI", weight: 20});
        }
        decisions.push({action: "APPROACH", weight: 1});
        return decisions;
    },

    SELF_WALKING_BACKWARD: ({opponent, distance}) => {
        const decisions = [];
        if (distance > 50 || self.isCornered) decisions.push({action: "APPROACH", weight: 50});
        if (opponent.isWalkingFwd) decisions.push({action: "ENGAGE", weight: 50});

        return decisions;
    },

    SELF_CROUCHING: ({opponent, distance}) => {
        const decisions = [];
        if (!opponent.attack instanceof SP_2) decisions.push({action: "RETREAT", weight: 50});
        if (!opponent.attack) decisions.push({action: "APPROACH", weight: 50});
        decisions.push({action: "CROUCHAI", weight: 1});
        
        return decisions;
    },

    CORNER_PRESSURE: ({ opponent }) =>
        opponent.isLowHealth || opponent.isLowEnergy
            ? [{ action: "ENGAGE", weight: 100 }]
            : [
                  { action: "RETREAT", weight: 60 },
                  { action: "ENGAGE", weight: 40 }
              ],

    CROUCHING: ({ distance }) => {
        const decisions = [];
        if (distance < 40) decisions.push({ action: "ENGAGE", weight: 50 });
        decisions.push({ action: "APPROACH", weight: 40 });
        return decisions;
    },

    AIRBORNE: ({ opponent, distance }) => {
        const  decisions = [];
        if (distance < 30) decisions.push({action: "ENGAGE", weight: 40});
        if (opponent.isAttacking) decisions.push({action: "RETREAT", weight: 40});
        decisions.push({action: "APPROACH", weight: 20});
        return decisions;
    },

    DEFAULT: () => [{ action: "OBSERVE", weight: 1 }]
};
