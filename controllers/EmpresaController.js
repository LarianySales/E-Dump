const Empresa = require("../models/empresa")
const bcrypt = require("bcrypt")

module.exports = class EmpresaController {
    static async empresa(request, response) {
        return response.render("partials/empresa")
    }
    static async regitrarEmpresa(request, response) {
        return response.render("partials/empresa")
    }
    static async registrarEmpresaPost(request, response) {
        const { name, cnpj, razaoSocial, inscricaoEstadual, parceria, email, password, telefone, repetsenha } = request.body

        if (password != repetsenha) {
            request.flash("message", "As senhas não batem")
            return response.render("partials/empresa")
        }

        const checkEmpresa = await User.findOne({ where: { email: email } })

        if (checkEmpresa) {
            request.flash("message", "O e-mail já está em uso")
            return response.render("partials/empresa")

        }
        const salt = bcrypt.genSaltSync(10)

        const hashedPassword = bcrypt.hashSync(password, salt);

        const empresa = {
            name,
            email,
            password: hashedPassword,
            cnpj,
            razaoSocial,
            inscricaoEstadual,
            telefone
        }
        try {
            const empresaCreate = Empresa.create(empresa)
            request.session.userId = createUser.id
            request.flash("message", "Cadastro realizado com sucesso");
            request.session.save(() => {
                response.render("partials/locais");
            })
        } catch (error) {
            console.log(error)
        }
    }


}