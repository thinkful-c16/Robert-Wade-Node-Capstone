'use strict';

const mongoose=require('mongoose');
const SpellSchema=new mongoose.Schema({
  casting_time: String,
  classes: [String],
  components: {
    material: Boolean,
    materials_needed: [String],
    raw: String,
    somatic: Boolean,
    verbal: Boolean
  },
  description: String,
  duration: String,
  higher_levels: String,
  level: String,
  name: String,
  range: String,
  ritual: Boolean,
  school: String,
  tags: [String],
  type: String
});

const WizardSchema=new mongoose.Schema({
  name: String,
  intelligence: {type: Number, max: 30},
  intelligenceModifier: Number,
  level: Number,
  maxPrepared: Number,
  spellBook: {
    spell_id: String,
    prepared: Boolean
  }
});

