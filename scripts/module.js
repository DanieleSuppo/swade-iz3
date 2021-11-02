/*
1) Street Cred uso Skill, non serve altro
2) Cybertech li posso creare come abilità speciali, non serve altro
3) Strain viene tenuta come additional Stat ma viene ricalcolata quella attuale in fase di:
 - creazione del personaggio
 - update del personaggio
 Alternativa: vengono creati Active Effects sugli Item Cyberware che hanno strain per aumentare data.additionalStats.Strain.value
 Quella massima viene ricalcolata sulla base di un attributo (da controllare quale) in fase di updateActor o preUpdateActor
4) Aggiungere Strain agli item (solo di tipo Cyberware o tutti?)
Alternativa aggiungere AE che aumenta  data.additionalStats.Strain.value come detto sopra

 Capire come:
 - ricalcolare Strain facendo ciclo su tutti gli item

 */


import { createMaxStrain, updateMaxStrain} from "./utils/functions.js";

console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
    console.log("This code runs once the Foundry VTT software begins it's initialization workflow.");
    CONFIG.debug.hooks = true;
});

Hooks.on("ready", function() {
    console.log("This code runs once core initialization is ready and game data is available.");

    /*
    game.settings.set("swade", "settingFields",
        {
            "actor": {
                "strain": {
                    dtype: "Number",
                    hasMaxValue: true,
                    label: game.i18n.localize("SWADE.Strain")
                }
            }
        }
    );

     */
    //console.log(game.settings.get("swade", "settingFields").actor);

});

Hooks.on('createActor', async (actor) => {
    /*            Strain       */
    // await createMaxStrain(actor);

})

Hooks.on('updateActor', async (actor, updateData) => {
    // await updateMaxStrain(actor, updateData);
});

