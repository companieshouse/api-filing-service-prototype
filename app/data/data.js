module.exports = [
  {
    id: 0,
    app: 'My test application',
    description: 'My test application description',
    status: 'Test',
    appcreated: '22 July 2018',
    keys: [{keyname: 'REST API Key for testing',
            keydescription: "REST API key description", 
            type:'Rest',  
            key: 'ff78ff7b-542c-4a2c-85ba-c8ebe26ad23f',
            registered:'11 March 2020 - 10:56:14', 
            restrictedips:'194.75.36.81', 
            jsdomains:''},
           {keyname: 'Stream API Key for testing',
            keydescription: "Stream API key description", 
            type:'Stream',  
            key: 'ff78ff7b-542c-4a2c-85ba-c8ebe26ad23f',
            registered:'11 March 2020 - 10:56:14', 
            restrictedips:'194.75.36.81'},
           {keyname: 'Web API Key for testing',
            keydescription: "Web API key description", 
            type:'Web',  
            registered:'11 March 2020 - 10:56:14', 
            redirecturis:'https://app.domain./oauth/callback', 
            clientid:'ff78ff7b-542c-4a2c-85ba-c8ebe26ad23f',
            clientsecret:'ebc03087-d265-11e7-b8c6-83e29cd24f4c'}],
    apis: {
      type: 'Rest API key',
      created: '30 July 2019',
      key: 'ff78ff7b-542c-4a2c-85ba-c8ebe26ad23f',
    },
    ip: '194.75.36.81',
    javascript: '',
    keyname: 'REST API Key for testing',
    keydescription: "REST API key description",
    registered:"11 March 2020 - 10:56:14"
  },



  {
    id: 1,
    app: 'Live service',
    description: 'Live service description',
    status: 'Live',
    appcreated: '12 January 2016',
    apis: {
      type: 'Streaming API key',
      created: '30 July 2019',
      key: '2efb02c5-ad72-46fd-b97c-1374d394b5af',
    },
    ip: '194.75.36.81',
    javascript: '',
    keyname: 'Live API Key for my application'
  },
  {
    id: 2,
    app: 'Future testing',
    description: 'Future testing description',
    status: 'Future',
    appcreated: '30 July 2019',
    apis: {
      type: 'Rest API key',
      created: '30 July 2019',
      key: '3cf128f7-6a3d-4e94-b68b-9428bd6cc23a'
    },
    ip: '194.75.36.81',
    javascript: '',
    keyname: 'Future updates testing key'
  },
  {
    id: 3,
    app: 'In development service',
    description: 'In development service description',
    status: 'Test',
    appcreated: '1 August 2019',
    apis: {
      type: 'Web',
      created: '30 July 2019',
      test: '70553427-1842-470c-a82a-f10f49bd54c6',
      live: 'a3e57798-afdc-408d-8bc6-4bfc17825944',
      future: 'd0210533-e268-4bbc-a754-fc8a7e60d3a3'
    },
    ip: '194.75.36.81',
    javascript: '',
    keyname: 'New service test key'
  }
]
