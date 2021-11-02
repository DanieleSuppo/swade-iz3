export const createMaxStrain = async function (actor) {

    let newData = {
        data : {
            additionalStats : {
                "strain": {
                    dtype: "Number",
                    hasMaxValue: true,
                    label: game.i18n.localize("SWADE.Strain"),
                    max : actor.data.data.attributes.vigor.die.sides
                }
            }
        }
    }
    await actor.update(newData);
}

export const updateMaxStrain = async function (actor, updateData) {

    let strain = null;

    //Changing the Vigor
    if (updateData.data.attributes != null
    && updateData.data.attributes.vigor != null
    ) {
        strain = updateData.data.attributes.vigor.die.sides;
    }
    //Changing the Max Strain, it wins over changes of Vigor
    if (updateData.additionalStats != null
        && updateData.additionalStats["Strain"] != null
        && updateData.additionalStats["Strain"].max != null
    ) {
        console.log("HERE AM");
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
                        max : parseInt(strain)
                    }
                }
            }
        }
        await actor.update(newData);
    }
}
