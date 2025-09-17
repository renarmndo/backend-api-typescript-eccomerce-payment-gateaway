import { body } from "express-validator";
export const registerValidator = [
    // memvalidasi fields
    body("name")
        .notEmpty()
        .withMessage("Nama tidak boleh kosong")
        .matches(/^[\p{L}\s]+$/u)
        .withMessage("Gunakan Kalimat yang valid, nama dan spapsi diperbolehkan"),
    // validasi email
    body("email")
        .notEmpty()
        .withMessage("email tidak boleh kosong")
        .isEmail()
        .withMessage("Format email tidak valid"),
    // password
    body("password")
        .notEmpty()
        .withMessage("Password Tidak Boleh Kosong")
        .isLength({
        min: 8,
    })
        .withMessage("Password Minimal 8 karakter"),
];
export const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage("email tidak boleh kosong")
        .isEmail()
        .withMessage("Format email tidak valid"),
    body("password").notEmpty().withMessage("Password Tidak Boleh Kosong"),
];
//# sourceMappingURL=auth.validator.js.map