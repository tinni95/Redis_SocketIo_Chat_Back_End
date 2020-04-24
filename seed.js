 
var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb+srv://tinni:Chisana95@cluster0-fqkl1.mongodb.net/test?retryWrites=true&w=majority', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './models/client.js',
    './models/operator.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Client', 'Operator'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Operator',
        'documents': [
            {
                'email': 'joe@whatwapp.com',
                'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq' //hash for word password
            },
            {
				'email': 'jack@whatwapp.com',
                'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq' //hash for word password
            }
		],
	},
	{
		'model': 'Client',
        'documents': [
            {
				'email': 'bilbo@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq',
				'username': 'bilbo82',
            },
            {
				'email': 'jack@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq', 
				'username': 'daf23'
			},
			{
				'email': 'fabio@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq',
				'username': 'fabio92',
				'appversion':'2.1',
				'language':'IT'
            },
            {
				'email': 'fakemail@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq', 
				'username': 'albero12',
				'appversion':'2.2',
				'language':'IT',
				'status':"premium"
			},
			{
				'email': 'rac@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq',
				'username': 'dsa2',
            },
            {
				'email': 'va21@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq', 
				'username': 'dava2'
			},
			{
				'email': 'dario@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq',
				'username': 'fabio92',
				'appversion':'2.3',
				'language':'IT'
            },
            {
				'email': 'sonofalso@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq', 
				'username': 'java02',
				'appversion':'2.5',
				'language':'IT',
				'status':"premium"
			},
			{
				'email': 'baraba@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq',
				'username': 'babbino2',
            },
            {
				'email': 'fastino@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq', 
				'username': 'fsad2'
			},
			{
				'email': 'farad@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq',
				'username': 'jino99',
				'appversion':'2.1',
				'language':'IT'
            },
            {
				'email': 'fintissimi@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq', 
				'username': 'dafc2',
				'appversion':'1.5',
				'language':'IT',
				'status':"premium"
			},
			{
				'email': 'farlucco.dani@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq',
				'username': 'dafs3',
            },
            {
				'email': 'daf13fa@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq', 
				'username': 'dadf1'
			},
			{
				'email': 'denova@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq',
				'username': 'danilo99',
				'appversion':'2.3',
				'language':'IT'
            },
            {
				'email': 'veramail@gmail.com',
				'password': '$2y$12$PEKf.TZKSgOefDdDeSLSyuHCZn3Yu1DWK1V3D3rYOB.fUgp4WVplq', 
				'username': 'lalla00',
				'appversion':'2.5',
				'language':'IT',
				'status':"premium"
            }
        ]
    }
];