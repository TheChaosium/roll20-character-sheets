const characteristics = {
  movement: ["strength", "dexterity"],
  hp: ["size", "constitution", "total_hit_points_option"],
  majorWound: ["hit_points_max"],
  effortRoll: ["strength"],
  staminaRoll: ["constitution"],
  ideaRoll: ["intelligence"],
  luckRoll: ["power"],
  agilityRoll: ["dexterity"],
  charmRoll: ["charisma"],
  knowledgeRoll: ["education"],
  damageModifier: ["strength", "size"],
  combat: ["dexterity", "intelligence", "strength", "skill_category_bonus_option"],
  communication: ["intelligence", "power", "charisma", "skill_category_bonus_option"],
  manipulation: ["dexterity", "intelligence", "strength", "skill_category_bonus_option"],
  mental: ["intelligence", "power", "education", "education option", "skill_category_bonus_option"],
  perception: ["intelligence", "power", "constitution", "skill_category_bonus_option"],
  physical: ["dexterity", "strength", "constitution", "size", "skill_category_bonus_option"],
  experienceBonus: ["intelligence"],
  brawlCritical: ["brawl_damage"],
  grappleCritical: ["grapple_damage"],

};

//When performing calculations in King Arthur Pendragon, round
//0.5 and higher fractions upward and lesser fractions downward.
//For example, a character with a Damage value of 4.43 would
//have an effective value of 4, while a character with a Damage val-
//ue of 4.5 would have a 5.
const round = (sum) => (sum % 1 >= 0.5 ? Math.ceil(sum) : Math.floor(sum));

const total = (v) =>
  Object.values(v).reduce((partialSum, a) => partialSum + parseFloat(a), 0);

characteristics.movement.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.movement, (values) => {
      //Movement Rate = 10
      setAttrs({
        movement: 10,
      });
    });
  });
});

characteristics.hp.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.hp, (values) => {
      let total_hp = values['size'] * 1 + values['constitution'] * 1;
      if (values['total_hit_points_option'] != 'total hit points option') {
        total_hp = round(total_hp / 2);
      }
      setAttrs({
        hit_points_max: total_hp,
      });
    });
  });
});

characteristics.majorWound.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`major_wound_level`]: round(newValue / 2),
    });
  });
});

characteristics.effortRoll.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`effort_roll`]: newValue * 5,
    });
  });
});

characteristics.staminaRoll.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`stamina_roll`]: newValue * 5,
    });
  });
});


characteristics.ideaRoll.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`idea_roll`]: newValue * 5,
    });
  });
});


characteristics.luckRoll.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`luck_roll`]: newValue * 5,
    });
  });
});


characteristics.agilityRoll.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`agility_roll`]: newValue * 5,
    });
  });
});


characteristics.charmRoll.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`charm_roll`]: newValue * 5,
    });
  });
});

characteristics.knowledgeRoll.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`knowledge_roll`]: newValue * 5,
    });
  });
});

/*
  skll category bonuses
*/

characteristics.communication.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.communication, (values) => {
      switch (values['skill_category_bonus_option']) {
        case "standard":
          setAttrs({
            [`communication`]: values['intelligence'] - 10 + round((values['power'] - 10) / 2) + round((values['charisma'] - 10) / 2),
          });
          break;
        case "simple":
          setAttrs({
            [`communication`]: Math.ceil(values['intelligence'] / 2),
          });
          break;
        default:
          setAttrs({
            [`communication`]: 0,
          });
      };
    });
  });
});

characteristics.combat.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.combat, (values) => {

      switch (values['skill_category_bonus_option']) {
        case "standard":
          setAttrs({
            [`combat`]: values['dexterity'] - 10 + round((values['intelligence'] - 10) / 2) + round((values['strength'] - 10) / 2),
          });
          break;
        case "simple":
          setAttrs({
            [`combat`]: Math.ceil(values['dexterity'] / 2),
          });
          break;
        default:
          setAttrs({
            [`combat`]: 0,
          });
      }
    });
  });
});

characteristics.manipulation.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.manipulation, (values) => {

      switch (values['skill_category_bonus_option']) {
        case "standard":
          setAttrs({
            [`manipulation`]: values['dexterity'] - 10 + round((values['intelligence'] - 10) / 2) + round((values['strength'] - 10) / 2),
          });
          break;
        case "simple":
          setAttrs({
            [`manipulation`]: Math.ceil(values['dexterity'] / 2),
          });
          break;
        default:
          setAttrs({
            [`manipulation`]: 0,
          });
      }
    });
  });
});

characteristics.mental.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.mental, (values) => {

      switch (values['skill_category_bonus_option']) {
        case "standard":
          if (values['education_option'] == 'education option') {
            setAttrs({
              [`mental`]: values['intelligence'] - 10 + round((values['power'] - 10) / 2) + round((values['education'] - 10) / 2),
            });
          } else {
            setAttrs({
              [`mental`]: values['intelligence'] - 10 + round((values['power'] - 10) / 2),
            });
          }
          break;
        case "simple":
          setAttrs({
            [`mental`]: Math.ceil(values['intelligence'] / 2),
          });
          break;
        default:
          setAttrs({
            [`mental`]: 0,
          });
      }

    });
  });
});

characteristics.perception.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.perception, (values) => {
      switch (values['skill_category_bonus_option']) {
        case "standard":
          setAttrs({
            [`perception`]: values['intelligence'] - 10 + round((values['power'] - 10) / 2) + round((values['constitution'] - 10) / 2),
          });
          break;
        case "simple":
          setAttrs({
            [`perception`]: Math.ceil(values['intelligence'] / 2),
          });
          break;
        default:
          setAttrs({
            [`perception`]: 0,
          });
      }
    });
  });
});

characteristics.physical.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.physical, (values) => {
      switch (values['skill_category_bonus_option']) {
        case "standard":
          setAttrs({
            [`physical`]: values['dexterity'] - 10 + round((values['strength'] - 10) / 2) + round((values['constitution'] - 10) / 2) - values['size'] + 10,
          });
          break;
        case "simple":
          setAttrs({
            [`physical`]: Math.ceil(values['dexterity'] / 2),
          });
          break;
        default:
          setAttrs({
            [`physical`]: 0,
          });
      }
    });
  });
});

characteristics.experienceBonus.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.experienceBonus, (values) => {
      setAttrs({
        [`experience_bonus`]: Math.ceil(values['intelligence'] / 2),
      });
    });
  });
});

characteristics.damageModifier.forEach((attr) => {
  on(`change:${attr}`, () => {
    getAttrs(characteristics.damageModifier, (values) => {
      let totalRating = total(values);
      if (totalRating < 13) {
        setAttrs({
          [`damage_modifier`]: '-1D6',
          [`roll20_damage_modifier`]: '1D6',
          [`roll20_damage_modifier_sign`]: '-',
        });
      } else if (totalRating < 17) {
        setAttrs({
          [`damage_modifier`]: '-1D4',
          [`roll20_damage_modifier`]: '1D4',
          [`roll20_damage_modifier_sign`]: '-',
        });
      } else if (totalRating < 24) {
        setAttrs({
          [`damage_modifier`]: 'None',
          [`roll20_damage_modifier`]: '',
          [`roll20_damage_modifier_sign`]: '',
        });
      } else if (totalRating < 33) {
        setAttrs({
          [`damage_modifier`]: '+1D4',
          [`roll20_damage_modifier`]: '1D4',
          [`roll20_damage_modifier_sign`]: '+',
        });
      } else {
        let numberOfSixes = Math.trunc(totalRating / 16);
        setAttrs({
          [`damage_modifier`]: '+' + numberOfSixes.toString() + 'D6',
          [`roll20_damage_modifier`]: numberOfSixes.toString() + 'D6',
          [`roll20_damage_modifier_sign`]: '+',
        });
      }
    });
  });
});

characteristics.brawlCritical.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`brawl_critical`]: newValue.replace("D", "*"),
    });
  });
});


characteristics.grappleCritical.forEach((attr) => {
  on(`change:${attr}`, ({ newValue }) => {
    setAttrs({
      [`grapple_critical`]: newValue.replace("D", "*"),
    });
  });
});

on(`change:sheet_select`, ({ newValue }) => {
  setAttrs({
    sheet_type: newValue === "pc" ? "character" : newValue,
    character_type: "pc",
  });
});

on(`change:category_bonus_select`, ({ newValue }) => {
  setAttrs({
    skill_category_bonus_option: newValue,
  });
});

on(`change:repeating_events:new_glory`, ({ triggerName }) => {
  const repeatingRow = helpers.getReprowid(triggerName);

  getSectionIDs("events", (idArray) => {
    let characteristics = [];
    idArray.forEach((id) =>
      characteristics.push(`repeating_events_${id}_new_glory`)
    );

    getAttrs(characteristics, (values) => {
      const parsedNums = helpers.parseIntegers(values);
      const gloryValues = Object.values(parsedNums);
      const sum = helpers.sumIntegers(gloryValues);

      setAttrs({
        glory_total: sum,
        [`${repeatingRow}_total_glory`]: sum,
      });
    });
  });
});
