(function(){ //CHOICE MULTI
    var cm = function  (ctx){
        var f = ctx.ListSchema.Field[0];
        spBsCtrls.optsWrap.customRenderedFields.push(f.Name);
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var controlId = f.Id;
        var choices = ctx.CurrentFieldSchema.MultiChoices;
        var values = spBsCtrls.common.getChoicesArrayFromString(ctx.CurrentItem[f.Name]);
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            var normChoices = choices;//$.map(choices, function(choice){ return {text: choice.LookupValue, id:choice.LookupId}  });
            $('#'+controlId)
                .select2({
                    data: normChoices,
                    multiple: true
                })
                .on('change', function (e) {
                    var data = spBsCtrls.common.getChoicesStringFromArray($(e.target).val());
                    ctx.FormContext.updateControlValue(f.Name, data);
                })
                .select2('val', values);
        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $('#'+controlId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(controlId, errorResult);
        });

        var text = '<div><select type="text" class="" id="'+controlId+'" /></div>';


        return text;

    };
    $.extend(window.spBsCtrls, {choiceMulti: cm});

})();