TODO: 

  --> Revisar todos los catch (sobretodo de login y register) y sacar el toast con el error

  --> Hacer el CRUD de cuentas (solo update y crear) -- bloquear el boton de crear cuenta si ya hay dos

  --> COMPONENTE Performance de los campos que funcionan mejor

  --> Hacer filtros para las tablas

  --> Hacer una pestaña LIVE donde vaya guiando paso por paso segun el trading plan
      por ejemplo: empiezas a tradear e identificas la tendecia entonces te dice las probabilidades (%) de compra y de venta 
                  es una manipulacion te dice si hay confirmacion

  --> Comprobar al iniciar si la cuenta esta conectada, si no lo esta mandar a /accounts

  --> Hacer como una cuenta BACKTEST, que no haga llamadas de metatrader y poder poner manualmente los trades
    Para que te calcule las estadisticas


FIELDS
  --> Hacer la pestaña de CONFIG donde puedas crear los campos necesarios para tu estrategia 
      (Esos campos se guardaran en el BACK) y se crearan los formularios a partir de esos campos
      (Tambien gestionar el orden con el que se muestran en el trade details)

  --> el comments pasarlo a los fields con una property que sea full y así sale entero en el formulario
  (al ser full tambien tenerlo en cuenta en la parte de trade details y mostrarlo con un Vstack)

  --> Cuando se tengan las diferentes estrategias (fields) guardados en el back hacer otra TAB que sea un comparador de estrategias entre ellas


CAMPOS STRATEGIA MTDA
  --> timeframe: 
      D1-H1-M5
      H4-M15-M1
      H1-M5-M1