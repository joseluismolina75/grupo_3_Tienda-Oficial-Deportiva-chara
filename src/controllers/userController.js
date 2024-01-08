const controller = {
  getLogin: (req, res) => {
    // Lógica del controlador para la página de inicio
    res.render('users/login'); // Renderiza la plantilla 'login.ejs' en la carpeta 'views'
  },
  
  
  postLogin: (req, res) => {
    res.send(req.body);

		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('Login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('Login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},


  
  getRegister: (req, res) => {
    // Lógica del controlador para la página de inicio
    res.render('users/register'); // Renderiza la plantilla 'register.ejs' en la carpeta 'views'
  },
};

module.exports = controller;