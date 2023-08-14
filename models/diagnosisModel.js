const mongoose = require('mongoose');

const {Schema} = mongoose;

const unifiedDiagnosisSchema = new Schema(
  {
    codigo: {type: Schema.Types.String, required: true},
    descripcion: {type: Schema.Types.String, required: true}
  }
)

const UnifiedDiagnosis = mongoose.model('UnifiedDiagnosis', unifiedDiagnosisSchema)

module.exports = {
  UnifiedDiagnosis
};