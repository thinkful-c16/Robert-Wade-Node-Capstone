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
  name: {type: String, required: true},
  intelligence: {type: Number, max: 30, required: true},
  intelligenceModifier: Number,
  level: {type: Number, required: true},
  maxPrepared: Number,
  spellBook: [{
    spell_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Spell' },
    prepared: Boolean
  }]
});

const Spell=mongoose.model('Spell', SpellSchema);
const Wizard=mongoose.model('Wizard', WizardSchema);

module.exports={Spell, Wizard};