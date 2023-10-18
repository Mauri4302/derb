
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

        $("#content").droppable({
                accept: $('.builder-component'),
                activeClass: "active",
                hoverClass: "hover",
                drop: function (event, ui) {
                let idrandom = (Math.random() + 1).toString(36).substring(7);
                console.log(ui)
                    var droppedItem = ui.helper.clone();
                    droppedItem.attr('id', 'textbox-'+idrandom);

                    $(this).append(droppedItem);
                    console.log("HTML:::: ", $(this).append(droppedItem))
                    var dataForms = droppedItem.data('forms'); // Accede al atributo data-forms del elemento clonado
        console.log("Elemento arrastrado...", droppedItem);
        console.log("Data Forms:", dataForms);
                }
            });

        },
        'process_children': function(children, context){
            let keys = null;
            this.list = [];
            let indexclass = -1;
            let classM = null;
            let type = null;
            let parent = context['parent'];
            //console.log("ANTES---- ", children)
            for(let i=0; i < children.length; i++){
                //console.log("HIJOS---- ", children[i].type)
                //console.log("KEYS: ", Object.keys(children[i]))
                keys = Object.keys(children[i]);
                indexclass = keys.indexOf('type');
                //console.log("TYPE: ", indexclass)
                if(indexclass != -1){
                //this.list = children[i];
                  type = children[i].type;
                  console.log("DENTRO:---- ",type)
            switch(type) {

                case 'textfield':
                console.log('TEXT:::: ', children[i])
                    this.render_textfield(parent, children[i]);
                    this.list.push(children[i]);
                    break;
                case 'number':
                    console.log('NUMBER:::: ', children[i])
                    this.render_number(parent, children[i]);
                    this.list.push(children[i]);
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
    //$(result).append("#"+parent)
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