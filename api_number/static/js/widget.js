var CategoryClass = {
    'qid': null,
    'render_data': function(parent, data){
    //console.log("Category data--- ",data);
    console.log("Category parent--- ",parent)
    let template = '<div id="{{it.qid}}" class="category" data-manage="derb" data-category="category">{{it.title}} <div class="children"> </div> </div>';
    //let template = `<div id="{{it.qid}}" class="category" draggable="true">{{it.title}} <div class="children"> <img src="{% static 'image/svg.svg' %}" alt="icon" class="button-icon" draggable="false"> </div> </div>`;

    this.qid = (Math.random() + 1).toString(36).substring(7);
    let result = Sqrl.render(template, {title:data.title, qid: this.qid});
    let bodydiv = $("#"+parent);
    //$(result).append("#"+parent)
    bodydiv.append(result);
    //console.log(bodydiv)

    //Probando el drag and drop
    // Agrega el código para habilitar la funcionalidad de arrastrar y soltar
    bodydiv.draggable({
      revert: "invalid",
      helper: "clone",
      appendTo: "body",
      axis: false,
      cursor: "move"
    });

    $("#content").droppable({
      accept: bodydiv, // Solo acepta elementos con el id "textBox" (el textbox draggable)
      activeClass: "activo",
      hoverClass: "deposito",
      drop: function(event, ui) {
      //ui.draggable.detach();
      //console.log("UI-- ",event)
      //console.log('Content--- ', ui.draggable.detach())
      //$(this).append(ui.draggable);
        var droppedItem = ui.helper.clone(); // Clona el elemento arrastrado
        console.log("CLON--- ",droppedItem)
        $(this).append(droppedItem); // Agrega el clon al contenedor
        //console.log("this--- ",$(this).append(droppedItem))
       var textboxHTML = '<div id="'+droppedItem.id+'" class="form-group border mb-2 mt-2 ms-2 ml-2">';
  textboxHTML += '<label for="textbox">Texto:</label>';
  textboxHTML += '<input type="text" id="textbox" name="textbox" class="form-control" value="Ejemplo de texto" readonly>';
  textboxHTML += '<div class="btn-group">';
    textboxHTML += '<button type="button" class="btn btn-primary" onclick="editTextbox()">Editar</button>';
    textboxHTML += '<button type="button" class="btn btn-danger" onclick="deleteTextbox()">Eliminar</button>';
  textboxHTML += '</div>';
textboxHTML += '</div>';
       /* var textboxHTML = '<div class="caja-texto form-group">';
  textboxHTML += '<label for="input-texto">Texto de ayuda:</label>';
  textboxHTML += '<input class="form-control" type="text" id="input-texto" placeholder="Ingrese texto de ayuda">';
  textboxHTML += '</div>';*/

  // Agrega la caja de texto al contenedor
  //$(this).append(textboxHTML);
        // Aquí puedes acceder a la data (características y validaciones) del textbox y aplicarlas al clon
        var textboxData = {
          'class': 'number',
          'description': 'test description',
          'placeholder': 'test',
          'minlength': 0,
          'maxlength': 0,
          'step': 0.1,
          'required': false,
          'children': [
            {
              'class': 'condition',
              'evaluate': '',
              'children': [

              ] // Más preguntas
            }
          ]
        };

        // Aplica las características y validaciones al clon del textbox
        // Puedes usar textboxData para acceder a los valores correspondientes

        // ... Código para aplicar características y validaciones al clon del textbox ...

        // Ejemplo: Establece el placeholder del textbox clonado
        droppedItem.attr('placeholder', textboxData.placeholder);

        // ... Resto del código para aplicar características y validaciones ...

        // Ejemplo: Agrega una clase CSS para estilizar el textbox clonado
        //droppedItem.addClass('custom-textbox');

        // ... Resto del código para aplicar características y validaciones ...

        // Puedes realizar más modificaciones al clon del textbox según tus necesidades

        // Luego puedes guardar o procesar los datos del formulario según lo requieras

      }
    });

    return this.qid;
    },
    'pre_submit': function(){

    }
}

var NumberClass = {
    'render_data': function(parent, data){}
}

var BooleanClass = {
    'render_data': function(parent, data){}
}

var ConditionClass = {
    'render_data': function(parent, data){}
}