export const createMaxStrain = async function (actor) {

    let newData = {
        data : {
            additionalStats : {
                "strain": {
                    dtype: "Number",
                    hasMaxValue: true,
                    label: game.i18n.localize("SWADE.Strain"),
                    max : actor.data.data.attributes.vigor.die.sides,
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
    if(actor.data.data.additionalStats["strain"] !== undefined
        && actor.data.data.additionalStats["strain"].value !== null) {
        current = actor.data.data.additionalStats["strain"].value;
        console.log(current);
    }

    //Add strain if not present
    if(actor.data.data.additionalStats["strain"] === undefined) {
        strain = actor.data.data.attributes.vigor.die.sides;
    }

    //Changing the Vigor
    if ((updateData.data != null &&
        updateData.data.attributes != null
    && updateData.data.attributes.vigor != null
    )) {
        strain = updateData.data.attributes.vigor.die.sides;
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
