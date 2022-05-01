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

Hooks.on("ready", function() {
    console.log("This code runs once core initialization is ready and game data is available.");

    const strainSetting = {
        "strain": {
            dtype: "Number",
            hasMaxValue: true,
            label: game.i18n.localize("SWADE.Strain")
        }
    }

    //Adding strain if doesn't exist
    game.settings.set('swade', 'settingFields',
        {
            actor: mergeObject(game.settings.get('swade', 'settingFields').actor, strainSetting),
            item: game.settings.get('swade', 'settingFields').item
        }
    );

});

Hooks.on('createActor', async (actor) => {
    /*            Strain       */
    await createMaxStrain(actor);

})

Hooks.on('updateActor', async (actor, updateData) => {
    await updateMaxStrain(actor, updateData);
});

Hooks.on('preUpdateSetting',  (actor, updateData) => {
    //nothing for now, maybe alert about removing strain
});
Hooks.on('updateSetting',  (actor, updateData) => {
    const isActive = JSON.parse(updateData.value)['swade-iz3'];
    if(!isActive) {
        console.log("TODO: remove custom additionalStats strain");
    }
});

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag('swade-iz3');
});