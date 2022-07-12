export const createMaxStrain = async function (actor) {

    let newData = {
        data : {
            additionalStats : {
                "strain": {
                    dtype: "Number",
                    hasMaxValue: true,
                    label: game.i18n.localize("SWADE.Strain"),
                    //TODO for v10: replace with data or system check discord?
                    max : actor.system.attributes.vigor.die.sides,
                    value: 0
                }
            }
        }
    }
    await actor.update(newData);
}

export const updateMaxStrain = async function (actor, updateData) {

    let strain = null;
    let current = 0;
    //TODO for v10: replace with actor.system?
    if(actor.system.additionalStats["strain"] !== undefined
        && actor.system.additionalStats["strain"].value !== null) {
        current = actor.system.additionalStats["strain"].value;
        console.log(current);
    }

    //Add strain if not present
    //TODO for v10: replace with with actor.system?
    if(actor.system.additionalStats["strain"] === undefined) {
        strain = actor.system.attributes.vigor.die.sides;
    }

    //Changing the Vigor
    if ((updateData.data != null &&
        updateData.attributes != null
    && updateData.attributes.vigor != null
    )) {
        strain = updateData.attributes.vigor.die.sides;
    }
    //Changing the Max Strain, it wins over changes of Vigor
    if (updateData.additionalStats != null
        && updateData.additionalStats["strain"] != null
        && updateData.additionalStats["strain"].max != null
    ) {
        strain = updateData.additionalStats["strain"].max ;
    }

    if(strain !== null) {
        let newData = {
            data : {
                additionalStats : {
                    "strain": {
                        dtype: "Number",
                        hasMaxValue: true,
                        label: game.i18n.localize("SWADE.Strain"),
                        max : parseInt(strain),
                        value: current,
                    }
                }
            }
        }
        await actor.update(newData);
    }
}
