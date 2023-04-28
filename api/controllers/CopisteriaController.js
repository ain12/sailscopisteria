/**
 * CopisteriaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAllImpresoras: function (req, res) {
    if (req.params.id) {
      Copisteria.findOne({ id: req.params.id }).exec(function (
        err,
        copisteria
      ) {
        if (err) {
          return res.serverError(err);
        }
        if (!copisteria) {
          return res.notFound(
            `No se encontró una copisteria con el id ${req.params.id}`
          );
        }
        return res.json(copisteria);
      });
    } else {
      Copisteria.find().exec(function (err, copisterias) {
        if (err) {
          return res.serverError(err);
        }
        return res.json(copisterias);
      });
    }
  },

  updateImpresora: function (req, res) {
    let impresoraId = req.params.id;
    let negro = req.body.negro;
    let cian = req.body.cian;
    let amarillo = req.body.amarillo;
    let magenta = req.body.magenta;

    // Realizar la actualización de la impresora
    Copisteria.updateOne({ id: impresoraId })
      .set({ negro, cian, amarillo, magenta })
      .exec(function (err, updatedImpresora) {
        if (err) {
          return res.serverError(err);
        }
        if (!updatedImpresora) {
          return res.notFound(
            "No se encontró la impresora con el id proporcionado"
          );
        }
        return res.ok(updatedImpresora);
      });
  },
};
