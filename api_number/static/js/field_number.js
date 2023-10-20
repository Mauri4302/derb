
  var FormStructure = {
  'category': CategoryClass,
  'number': NumberClass,
  'boolean': BooleanClass,
  'condition': ConditionClass

  }

  function  FormManager(container_id, api_url){
    var fmanager = {
        'qid': null,
        'list': null,
        'id': container_id,
        'api_url': api_url,
        'form_data': {}, //Aqui va la informacion del formulario
        'init': function(){

            //this.repositionSaveButton();
            //this.delete_component();
            fetch(this.api_url,
            {
            headers: {'X-CSRFToken': getCookie('csrftoken'), 'Content-Type': 'application/json'}
            }
            ).then((response)=>{return response.json()}
                  ).then(this.base_request_success(this)).catch((error)=>{console.log(error)})

        },
        'base_request_success': function(instance){
            return function(data){
    //Aca esta llegadno la data
        //console.log("base_request_success-----   ",data);
        if (data && data['data']) {
        instance.form_data = data;
            instance.process_forms();

        } else {
            console.log('Error: Datos no válidos');
        }
    }
        },
        'process_forms': function(){
        let context = {'has_error': false, 'parent': this.id};
        //Aca esta llegando la data
        //console.log("ID: ",context['parent'])
        //console.log('Hola-- ',this.form_data['data']);
        this.process_children(this.form_data['data'], context);

        $("#form_content").droppable({
                accept: $('.builder-component'),
                activeClass: "active",
                hoverClass: "hover",
                drop: function (event, ui) {
                let idrandom = (Math.random() + 1).toString(36).substring(7);
                //console.log(ui)
                let droppedItem = ui.helper.clone();
                droppedItem.attr('id', 'textbox-'+idrandom);

                let data = droppedItem.data('forms'); // Accede al atributo data-forms del elemento clonado
                console.log("DATA DATA::: ",data)
                let template = fmanager.form_content(data); // Usar this.form_content
                    console.log("TEMPLATE:::: ", template);
                $(this).find('.form-components').append(template);
                fmanager.repositionSaveButton();

                fmanager.delete_component();
                $(document).on('click', '.edit-btn', function() {
                        let dataID = $(this).closest('.template').data('id');
                        console.log("DATAID::::: ", dataID);
                        fmanager.edit_component(dataID);

                    });
                }
            });

        },
        'repositionSaveButton':function(){
            let formContent = $('#form_content');
            let formComponents = formContent.find('.form-components');
            let saveButton = formContent.find('.save-button');

            formComponents.append(saveButton);
        },
        'delete_component': function(){
        $(document).on('click', '.delete-btn', function() {

        let component = $(this).closest('.template');
        let componentId = component.data('id');
        fmanager.delete_element_list(componentId);

        component.remove();

        });
        },
        'delete_element_list': function(id){
            this.list = this.list.filter(item => item.id !== id);
            console.log("LIST LIST:::: ",this.list)
        },
        'edit_component': function(dataID){
        $('#staticBackdrop').modal('show');
        let component = $(`[data-id="${dataID}"]`);
        console.log("BOTON CON EL ID::: ", component);
        let labelElement = component.find('label');
        let inputElement = component.find('input');
        let descriptionElement = component.find('.form-text');

        },
        'process_children': function(children, context){
            let keys = null;
            this.list = [];
            let indexclass = -1;
            let classM = null;
            let type = null;
            let parent = context['parent'];
            for(let i=0; i < children.length; i++){
                keys = Object.keys(children[i]);
                indexclass = keys.indexOf('type');
                if(indexclass != -1){
                  type = children[i].type;
            switch(type) {

                case 'textfield':
                    this.render_textfield(parent, children[i]);
                    //this.list.push(children[i]);
                    break;
                case 'number':
                    this.render_number(parent, children[i]);
                    //this.list.push(children[i]);
                    break;

                default:

                    break;
            }

               }
        }
    },
    'render_textfield': function(parent, data){
    //console.log("render_textfield::: ", data, "Parent::: ", parent)
    data.id = 1;
    let template=`
     <div class="builder-component hidden-content" id="children" data-forms='${JSON.stringify(data)}' tabindex="-1">
 <div class="field-type">${data.type}</div>

</div>
    `;

     let result = Sqrl.render(template, {title:data.type});
    let bodydiv = $("#"+parent);
    bodydiv.append(result);

//DRAG AND DROP
    let element = bodydiv.find("#children");
           this.makeElementDraggable(element);
    },
    'render_number': function(parent, data){
    data.id = 2;
    console.log('RENDER_NUMBER::: ', data, "PARENT:: ", parent)
    //this.qid = (Math.random() + 1).toString(36).substring(7);

    let template=`
     <div class="builder-component hidden-content" id="children" data-forms='${JSON.stringify(data)}' tabindex="-1">
    <div class="field-type">${data.type}</div>
</div>
    `;

     let result = Sqrl.render(template, {title:data.type});
    let bodydiv = $("#"+parent);
    //$(result).append("#"+parent)
    bodydiv.append(result);
       let element = bodydiv.find("#children");
           this.makeElementDraggable(element);

    },
    'makeElementDraggable': function(element) {
            this.qid = (Math.random() + 1).toString(36).substring(7);
            element.attr('id', 'textBox-' + this.qid);
            element.addClass('textbox card btn btn-info d-flex align-items-center justify-content-center');
            element.attr('draggable', true);

            element.draggable({
                revert: "invalid",
                helper: "clone",
                appendTo: "body",
                axis: false,
                cursor: "move"
            });

        },
        'form_content': function(data){

        console.log("FORM_CONTENT:::: ", data)
        let dataID = (Math.random() + 1).toString(36).substring(7);
        data.id = dataID;
        this.list.push(data);
        console.log("LIST__:::: ", this.list);
    let template = `
    <div class="card template" data-id="${dataID}" id="${data.id}">
    <div class="card-body  ${data.labelPosition}">
        <label for="input" class="form-label">${data.label}</label>
        <input type="${data.inputType}" id="input" class="form-control" aria-describedby="input" placeholder="${data.placeholder}" ${data.required ? 'required' : ''}>
        <div id="desciption" class="form-text">
            ${data.description}
        </div>
        <div class="button-container">
            <button type="button" class="btn btn-sm btn-primary edit-btn"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="fa fa-pencil-square" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-sm btn-danger delete-btn">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    </div>
</div>
    `;

    return template;
}
    }

    fmanager.init();
    return fmanager;
  }

 function process_form(container_id){
    var fmanager = FormManager(container_id, document.form_url.form_api);
    //fmanager.process_form();
    return fmanager;
 }

 process_form('component');


/*
'process_children': function(children, context){
            let keys = null;
            let indexclass = -1;
            let classM = null;
            let parent = context['parent'];

            //console.log("children---- ",children," --- ",context);
            for(let i=0; i < children.length; i++){
                console.log("KEYS: ",d, Object.keys(children[i]))
                keys = Object.keys(children[i]);
                indexclass = keys.indexOf('class');
                //console.log("CLASS: ", indexclass)
                if(indexclass != -1){
                  classM = FormStructure[children[i].class]
                  parent = classM.render_data(parent, children[i]);
                  context['parent'] = parent;
                }
                indexclass = keys.indexOf('children');
                console.log("CHILDREN: ", indexclass)
                if(indexclass !== -1){
                    this.process_children(children[i].children, context);
                }

            }
        }
*/