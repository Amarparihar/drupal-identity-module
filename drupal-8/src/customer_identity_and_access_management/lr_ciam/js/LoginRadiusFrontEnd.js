jQuery(document).ready(function () {

    jQuery("#lr-loading").click(function () {
        jQuery('#lr-loading').hide();
    });
   
    if (window.location.href == window.location.origin + domainName + 'admin/people/create') {      
        jQuery('.form-item-mail label').attr('class', 'js-form-required form-required');
        jQuery('#edit-mail').attr('required', 'required');  
    } else {
        jQuery('#edit-mail').attr('disabled', 'disabled');  
        jQuery('#edit-mail').attr('style', 'background:#ededed');  
    }

    dropemailvalue = '';
    jQuery('.removeEmail').each(function () {
        jQuery(this).click(function () {
            jQuery('form[name="loginradius-removeemail"]').remove();
            var html = jQuery(this).parents('tr');
            dropemailvalue = jQuery(this).parents('tr').find('.form-email').val();
            showRemoveEmailPopup(html); 
        });
    });
    jQuery('#addEmail').attr('onClick', 'showAddEmailPopup()');
    showLoginTypeOptions();
    showAndHideRecaptchaOptions();
    showAndHide2faOptions();
});

var LRObject = new LoginRadiusV2(commonOptions);

function showRemoveEmailPopup(html) {
    jQuery('#removeemail-form').show();    
    initializeRemoveEmailCiamForms(html);   
}

function showAddEmailPopup() {
    jQuery('#addemail-form').show();
    initializeAddEmailCiamForms();
}

function lrCloseRemovePopup() {
    jQuery('form[name="loginradius-removeemail"]').remove();
    jQuery('#removeemail-form').hide();
}

function lrCloseAddEmailPopup() {
    jQuery('#addemail-form').hide();
}

function showLoginTypeOptions() {
    var loginType = jQuery('input[name=ciam_login_type]:checked').val();
  
    if (loginType == 'email') {
        jQuery('#edit-lr-phone-settings').hide();
        var verifyOptions = jQuery('input[name=ciam_email_verification_condition]:checked').val();
        if (verifyOptions == 2) {
            jQuery('fieldset[data-drupal-selector=email-verification-options],fieldset[data-drupal-selector=edit-ciam-instant-link-login],.form-item-ciam-instant-link-login-button-label,.form-item-ciam-instant-link-login-email-template').show();
            jQuery('fieldset[data-drupal-selector=edit-ciam-enable-login-on-email-verification],fieldset[data-drupal-selector=prompt-password],fieldset[data-drupal-selector=edit-ciam-enable-user-name],fieldset[data-drupal-selector=edit-ciam-ask-email-always-for-unverified]').hide();
        } else if (verifyOptions == 1) {
            jQuery('fieldset[data-drupal-selector=email-verification-options],fieldset[data-drupal-selector=edit-ciam-enable-login-on-email-verification],fieldset[data-drupal-selector=edit-ciam-ask-email-always-for-unverified],fieldset[data-drupal-selector=edit-ciam-instant-link-login],.form-item-ciam-instant-link-login-button-label,.form-item-ciam-instant-link-login-email-template').show();
            jQuery('fieldset[data-drupal-selector=prompt-password],fieldset[data-drupal-selector=edit-ciam-enable-user-name]').hide();
        } else {
            jQuery('fieldset[data-drupal-selector=email-verification-options],fieldset[data-drupal-selector=edit-ciam-enable-login-on-email-verification],fieldset[data-drupal-selector=prompt-password],fieldset[data-drupal-selector=edit-ciam-enable-user-name],fieldset[data-drupal-selector=edit-ciam-ask-email-always-for-unverified],fieldset[data-drupal-selector=edit-ciam-instant-link-login],.form-item-ciam-instant-link-login-button-label,.form-item-ciam-instant-link-login-email-template').show();
        }
    } else if(loginType == 'phone') {
        jQuery('fieldset[data-drupal-selector=email-verification-options],fieldset[data-drupal-selector=edit-ciam-enable-login-on-email-verification],fieldset[data-drupal-selector=prompt-password],fieldset[data-drupal-selector=edit-ciam-enable-user-name],fieldset[data-drupal-selector=edit-ciam-ask-email-always-for-unverified],fieldset[data-drupal-selector=edit-ciam-instant-link-login],.form-item-ciam-instant-link-login-button-label,.form-item-ciam-instant-link-login-email-template').hide();
        jQuery('#edit-lr-phone-settings').show();
        var phoneOptions = jQuery('input[name=ciam_enable_phone_login]:checked').val();
        if (phoneOptions == 'true') {
            jQuery('fieldset[data-drupal-selector=edit-ciam-exist-phone-number],fieldset[data-drupal-selector=edit-ciam-instant-otp-login],.form-item-ciam-sms-template,.form-item-ciam-sms-template-phone-verification,.form-item-ciam-instant-otp-login-button-label,.form-item-ciam-sms-template-one-time-passcode').show();
        } else {
            jQuery('fieldset[data-drupal-selector=edit-ciam-exist-phone-number],fieldset[data-drupal-selector=edit-ciam-instant-otp-login],.form-item-ciam-sms-template,.form-item-ciam-sms-template-phone-verification,.form-item-ciam-instant-otp-login-button-label,.form-item-ciam-sms-template-one-time-passcode').hide();
        }        
    }
}

function showAndHide2faOptions() {
    var options = jQuery('input[name=ciam_enable_2fa]:checked').val();
    if (options == 'true') {
        jQuery('.form-item-ciam-2fa-flow,.form-item-ciam-sms-template-2fa,fieldset[data-drupal-selector=edit-ciam-google-authentication]').show();       
    } else {
        jQuery('.form-item-ciam-2fa-flow,.form-item-ciam-sms-template-2fa,fieldset[data-drupal-selector=edit-ciam-google-authentication]').hide();
    }
}
function showAndHideRecaptchaOptions() {
    var options = jQuery('input[name=ciam_enable_recaptcha]:checked').val();   
    if (options == 'true') {     
        jQuery('.form-item-ciam-v2-recaptcha-type,.form-item-ciam-v2-recaptcha-site-key').show();       
    } else {  
        jQuery('.form-item-ciam-v2-recaptcha-type,.form-item-ciam-v2-recaptcha-site-key').hide();
    }
}

function lrCheckValidJson() {
    jQuery('#add_custom_options').change(function () {
        var profile = jQuery('#add_custom_options').val();
        var response = '';
        try
        {
            response = jQuery.parseJSON(profile);
            if (response != true && response != false) {
                var validjson = JSON.stringify(response, null, '\t').replace(/</g, '&lt;');
                if (validjson != 'null') {
                    jQuery('#add_custom_options').val(validjson);
                    jQuery('#add_custom_options').css("border", "1px solid green");
                } else {
                    jQuery('#add_custom_options').css("border", "1px solid red");
                }
            } else {
                jQuery('#add_custom_options').css("border", "1px solid green");
            }
        } catch (e)
        {
            jQuery('#add_custom_options').css("border", "1px solid green");
        }
    });
}

function show_birthdate_date_block() {
    var maxYear = new Date().getFullYear();
    var minYear = maxYear - 100;
    if (jQuery('body').on) {
        jQuery('body').on('focus', '.loginradius-birthdate', function () {
            jQuery('.loginradius-birthdate').datepicker({
                dateFormat: 'mm-dd-yy',
                maxDate: new Date(),
                minDate: "-100y",
                changeMonth: true,
                changeYear: true,
                yearRange: (minYear + ":" + maxYear)
            });
        });
    } else {
        jQuery(".loginradius-birthdate").live("focus", function () {
            jQuery('.loginradius-birthdate').datepicker({
                dateFormat: 'mm-dd-yy',
                maxDate: new Date(),
                minDate: "-100y",
                changeMonth: true,
                changeYear: true,
                yearRange: (minYear + ":" + maxYear)
            });
        });
    }
}

function handleResponse(isSuccess, message, show, status) {
    status = status ? 'messages--' + status : "messages--status";
    if (isSuccess) {
        jQuery('form').each(function () {
            this.reset();
        });
    }
    if (message != null && message != "") {
        jQuery('#lr-loading').hide();
        jQuery('.messages').text(message);
        jQuery(".messages__wrapper").show();
        jQuery(".messages").show();

        jQuery(".messages").removeClass("messages--error messages--status");
        jQuery(".messages").addClass(status);
        if(autoHideTime != "" && autoHideTime != "0"){
        setTimeout(fade_out, autoHideTime*1000);
        }

    } else {
        jQuery(".messages__wrapper").hide();
        jQuery('.messages').hide();
        jQuery('.messages').text("");
    }
}
function fade_out() {
    jQuery(".messages").hide();
}

LRObject.$hooks.register('startProcess', function () {
    jQuery('#lr-loading').show();
});

LRObject.$hooks.register('endProcess', function () {
    if (commonOptions.formRenderDelay) {
        setTimeout(function () {
            jQuery('#lr-loading').hide();
        }, commonOptions.formRenderDelay - 1);
    }
    jQuery('#lr-loading').hide();
});

LRObject.$hooks.call('setButtonsName', {
        removeemail: "Remove",  
        instantLinkLoginButtonLabel: commonOptions.instantLinkLoginButtonLabel,
        instantOTPLoginButtonLabel: commonOptions.instantOTPLoginButtonLabel
});

LRObject.$hooks.register('socialLoginFormRender', function () {
    //on social login form render
    jQuery('#lr-loading').hide();
    jQuery('#social-registration-form').show();
    show_birthdate_date_block();
});

        
function getBackupCodes() {
    LRObject.api.getBackupCode(accessToken,
            function (response) {
                jQuery('#backupcode-table-body').empty();
                for(var i=0; i < response.BackUpCodes.length; i++){ 
                     var html = '';
                        jQuery('#resettable').hide();
                        jQuery('#lr_ciam_reset_table').show();
                      
                        html += '<div class="form-item code-list" id="backup-codes-' + i + '-field">';
                        html += '<span class="backupCode">' + response.BackUpCodes[i] + '</span>';
                        html += '</div>';
              
                        jQuery('#backupcode-table-body').append(html);                        
                }
                jQuery('.mybackupcopy').click(function () {
                    setClipboard(jQuery(this).parent('.form-item').find('span').text());
                });
            }, function (errors) {
                   jQuery('#resettable').show();       
    })
}

function resetBackupCodes() {
    LRObject.api.resetBackupCode(accessToken,
            function (response) {    
                 
                jQuery('#backupcode-table-body').empty();
                for(var i=0; i < response.BackUpCodes.length; i++){ 
                     var html = '';
                        jQuery('#resettable').hide();
                        jQuery('#lr_ciam_reset_table').show();
                      
                        html += '<div class="form-item code-list" id="backup-codes-' + i + '-field">';
                        html += '<span class="backupCode">' + response.BackUpCodes[i] + '</span>';
                        html += '</div>';
              
                        jQuery('#backupcode-table-body').append(html);                        
                }
                jQuery('.mybackupcopy').click(function () {
                    setClipboard(jQuery(this).parent('.form-item').find('span').text());
                });
            }, function (errors) {   
    });
}

function setClipboard() {
    var value = '';
    jQuery('.code-list').find('span').each(function () {
        value += jQuery(this).html() + "\n";
    });
    var tempInput = document.createElement("textarea");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    jQuery('.copyMessage').show();
    setTimeout(removeCodeCss, 5000);
}

function removeCodeCss() {
    jQuery('.code-list').find('span').removeAttr('style');
    jQuery('.copyMessage').hide();
}

function changeIconColor() {
    jQuery('.code-list').find('span').css({'background-color': '#29d', 'color': '#fff'});
}

function callSocialInterface() {
    var custom_interface_option = {};
    custom_interface_option.templateName = 'loginradiuscustom_tmpl';   
    LRObject.customInterface(".interfacecontainerdiv", custom_interface_option);         
    jQuery('#lr-loading').hide();
}

function initializeLoginCiamForm() {
    //initialize Login form
    var login_options = {};
    login_options.onSuccess = function (response) {        
        if (response.access_token) {
           handleResponse(true);
           ciamRedirect(response.access_token);
        } else {
            if (jQuery('#loginradius-login-username').length !== 0) {
               handleResponse(true, "An email has been sent to " + jQuery("#loginradius-login-username").val() + ".Please verify your email address");
            } else if(jQuery('#loginradius-login-emailid').length !== 0) {
                handleResponse(true, "An email has been sent to " + jQuery("#loginradius-login-emailid").val() + ".Please verify your email address");
            }            
        }
    };
    login_options.onError = function (response) {
        handleResponse(false, response[0].Description, "", "error");
    };
    login_options.container = "login-container";

    LRObject.init("login", login_options);
    jQuery('#lr-loading').hide();
}

function initializeRegisterCiamForm() {
    var registration_options = {}
    registration_options.onSuccess = function (response) {
        if (response.access_token != null && response.access_token != "") {
            handleResponse(true, "");
            ciamRedirect(response.access_token);
        } else {
            handleResponse(true, "An email has been sent to " + jQuery("#loginradius-registration-emailid").val() + ".Please verify your email address");
            jQuery('html, body').animate({ scrollTop: 0}, 1000);
        }
    };
    registration_options.onError = function (response) {
        if (response[0].Description != null) {
            handleResponse(false, response[0].Description, "", "error");
            jQuery('html, body').animate({ scrollTop: 0}, 1000);
        }
    };
    registration_options.container = "registration-container";  
        LRObject.init("registration", registration_options);    
    jQuery('#lr-loading').hide();
}

function initializeResetPasswordCiamForm(commonOptions) {
    //initialize reset password form and handel email verifaction
    var vtype = LRObject.util.getQueryParameterByName("vtype");
    if (vtype != null && vtype != "") {
        if (vtype == "reset") {
            var resetpassword_options = {};
            resetpassword_options.container = "resetpassword-container";
            jQuery('#login-container').hide();
            jQuery('.interfacecontainerdiv').hide();
            jQuery('#interfaceLabel').hide();
            resetpassword_options.onSuccess = function (response) {
                handleResponse(true, "Password reset successfully, Now you can login with changed password.");
                window.setTimeout(function () {
                    window.location.replace(commonOptions.verificationUrl);
                }, 3000);
            };
            resetpassword_options.onError = function (errors) {
                handleResponse(false, errors[0].Description, "", "error");
            }     
            LRObject.init("resetPassword", resetpassword_options);       
        } else if (vtype == "emailverification") {
            var verifyemail_options = {};
            verifyemail_options.onSuccess = function (response) {
                if (typeof response != 'undefined') {
                    if (!loggedIn && commonOptions.loginOnEmailVerification && typeof response.access_token != "undefined" && response.access_token != null && response.access_token != "") {
                        ciamRedirect(response.access_token);
                    } else if (!loggedIn && commonOptions.loginOnEmailVerification && response.Data != null && response.Data.access_token != null && response.Data.access_token != "") {
                        ciamRedirect(response.Data.access_token);
                    } else {
                        lrSetCookie('lr_message', 'Your email has been verified successfully.');
                        window.location.href = window.location.href.split('?')[0] + '?lrresponse=true';
                    }
                }   
            };
            verifyemail_options.onError = function (errors) {
                 lrSetCookie('lr_message', errors[0].Description);  
                 window.location.href = window.location.href.split('?')[0] + '?lrresponse=false';             
            }

            LRObject.init("verifyEmail", verifyemail_options);         
            
         } else if (vtype == "oneclicksignin") {     
            var options = {};
            options.onSuccess = function (response) {  
                ciamRedirect(response.access_token);               
            };
            options.onError = function (errors) {               
                handleResponse(false, errors[0].Description, "", "error");   
            };

            LRObject.init("instantLinkLogin", options);        
        }
    }
    jQuery('#lr-loading').hide();
}

function initializeSocialRegisterCiamForm() {
    var sl_options = {};
    sl_options.onSuccess = function (response) {
        if (response.access_token != null && response.access_token != "") {
            handleResponse(true, "");
            ciamRedirect(response.access_token);
            jQuery('#lr-loading').hide();       
        } else if (response.IsPosted) {
            handleResponse(true, "An email has been sent to " + jQuery("#loginradius-socialRegistration-emailid").val() + ".Please verify your email address.");
            jQuery('#social-registration-form').hide();
            jQuery('#lr-loading').hide();
        }        
    };
    sl_options.onError = function (response) {
        if (response[0].Description != null) {
            handleResponse(false, response[0].Description, "", "error");
            jQuery('#social-registration-form').hide();
            jQuery('#lr-loading').hide();
        }
    };
    sl_options.container = "social-registration-container";

        LRObject.init('socialLogin', sl_options);
        jQuery('#lr-loading').show();
   
    jQuery('#lr-loading').hide();
}

function initializeForgotPasswordCiamForms() {
    //initialize forgot password form
    var forgotpassword_options = {};
    forgotpassword_options.container = "forgotpassword-container";
    forgotpassword_options.onSuccess = function (response) {
        if(commonOptions.phoneLogin){
            handleResponse(true, "Password reset successfully");
        }else{        
           handleResponse(true, "An email has been sent to " + jQuery("#loginradius-forgotpassword-emailid").val() + " with reset Password link");
        }        
    };
    forgotpassword_options.onError = function (response) {
        if (response[0].Description != null) {
            handleResponse(false, response[0].Description, "", "error");
        }
    }
   
    LRObject.init("forgotPassword", forgotpassword_options);   
    jQuery('#lr-loading').hide();
}

function initializeAccountLinkingCiamForms() {
    var la_options = {};
    la_options.container = "interfacecontainerdiv";
    la_options.templateName = 'loginradiuscustom_tmpl_link';
    la_options.onSuccess = function (response) {
        if (response.IsPosted != true) {
            handleResponse(true, "");
            ciamRedirect(response);
        } else {
            lrSetCookie('lr_message', 'Account linked successfully');    
            window.location.href = window.location.href.split('?')[0] + '?lrresponse=true'; 
            window.setTimeout(function () {
                window.location.reload();
            }, 3000);

        }
    };
    la_options.onError = function (errors) {
        if (errors[0].Description != null) {
            lrSetCookie('lr_message', errors[0].Description);    
            window.location.href = window.location.href.split('?')[0] + '?lrresponse=false'; 
        }
    }

    var unlink_options = {};
    unlink_options.onSuccess = function (response) {
        if (response.IsDeleted == true) {
            lrSetCookie('lr_message', 'Account unlinked successfully');    
            window.location.href = window.location.href.split('?')[0] + '?lrresponse=true'; 
            window.setTimeout(function () {
                window.location.reload();
            }, 3000);
        }
    };
    unlink_options.onError = function (errors) {
        if (errors[0].Description != null) {
            lrSetCookie('lr_message', errors[0].Description);    
            window.location.href = window.location.href.split('?')[0] + '?lrresponse=false'; 
        }
    }

        LRObject.init("linkAccount", la_options);
        LRObject.init("unLinkAccount", unlink_options);
 
    jQuery('#lr-loading').hide();
}

function initializeTwoFactorAuthenticator() {
    //initialize two factor authenticator button
    var authentication_options = {};
    authentication_options.container = "authentication-container";
    authentication_options.onSuccess = function(response) {
        if (response.IsDeleted) {
                lrSetCookie('lr_message', 'Disabled successfully.');
                window.location.href = window.location.href.split('?')[0] + '?lrresponse=true'; 
                jQuery('html, body').animate({ scrollTop: 0}, 1000);
            } else {
                lrSetCookie('lr_message', 'Verified successfully.');
                window.location.href = window.location.href.split('?')[0] + '?lrresponse=true';  
                jQuery('html, body').animate({ scrollTop: 0}, 1000);
            }        
    };
    authentication_options.onError = function(errors) { 
        if (errors[0].Description != null) {
            lrSetCookie('lr_message', errors[0].Description);    
            window.location.href = window.location.href.split('?')[0] + '?lrresponse=false'; 
        }
    }
    LRObject.init("createTwoFactorAuthentication", authentication_options);   
}
function initializePhoneUpdate() {
    var updatephone_options = {};
    updatephone_options.container = "updatephone-container";
    updatephone_options.onSuccess = function (response) {
         lrSetCookie('lr_message', 'Updated successfully.');        
         window.location.href = window.location.href.split('?')[0] + '?lrresponse=true';  
         jQuery('html, body').animate({ scrollTop: 0}, 1000);
    };
    updatephone_options.onError = function (errors) {
        if (errors[0].Description != null) {
            lrSetCookie('lr_message', errors[0].Description);    
            window.location.href = window.location.href.split('?')[0] + '?lrresponse=false';    
            jQuery('html, body').animate({ scrollTop: 0}, 1000);
        }
    };
    LRObject.init("updatePhone", updatephone_options);      
}

function initializeAddEmailCiamForms() {
    var addemail_options = {};
    addemail_options.container = "addemail-container";
    addemail_options.onSuccess = function (response) {
        jQuery('#addemail-form').hide(); 
         lrSetCookie('lr_message', 'Email added successfully, Please verify your email address.');
         window.location.href = window.location.href.split('?')[0] + '?lrresponse=true';
         jQuery('html, body').animate({ scrollTop: 0}, 1000);
    };
    addemail_options.onError = function (errors) {
            jQuery('#addemail-form').hide();  
            lrSetCookie('lr_message', errors[0].Description);    
            window.location.href = window.location.href.split('?')[0] + '?lrresponse=false';
            jQuery('html, body').animate({ scrollTop: 0}, 1000);
    };
        
    LRObject.init("addEmail", addemail_options);  
    jQuery('#lr-loading').hide();
}

function initializeRemoveEmailCiamForms(divhtml) {
    var removeemail_options = {};
    removeemail_options.container = "removeemail-container";
    removeemail_options.onSuccess = function (response) {
         jQuery('#removeemail-form').hide(); 
         lrSetCookie('lr_message', 'Email has been removed successfully.');
         window.location.href = window.location.href.split('?')[0] + '?lrresponse=true';
         divhtml.remove();  
         jQuery('html, body').animate({ scrollTop: 0}, 1000);
    };
    removeemail_options.onError = function (errors) {
            jQuery('#removeemail-form').hide();           
            lrSetCookie('lr_message', errors[0].Description);    
            window.location.href = window.location.href.split('?')[0] + '?lrresponse=false';
            jQuery('html, body').animate({ scrollTop: 0}, 1000);
    };        
    LRObject.init("removeEmail", removeemail_options);   
    jQuery('#lr-loading').hide();
}

function initializeChangePasswordCiamForms() {
    var changepassword_options = {};
    changepassword_options.container = "changepassword-container";
    changepassword_options.onSuccess = function (response) {
        handleResponse(true, "Password has been updated successfully.");
    };
    changepassword_options.onError = function (errors) {
        handleResponse(false, errors[0].Description, "", "error");
    };

    LRObject.init("changePassword", changepassword_options); 
    jQuery('#lr-loading').hide();
}

function ciamRedirect(token, name) {
    if (window.redirect) {
        redirect(token, name);
    } else {
        var token_name = name ? name : 'token';
        var source = typeof lr_source != 'undefined' && lr_source ? lr_source : '';

        var form = document.createElement('form');
        form.action = LocalDomain;
        form.method = 'POST';

        var hiddenToken = document.createElement('input');
        hiddenToken.type = 'hidden';
        hiddenToken.value = token;
        hiddenToken.name = token_name;
        form.appendChild(hiddenToken);

        document.body.appendChild(form);
        form.submit();
    }
}

LRObject.$hooks.register('afterFormRender', function (name) {
    if (name == "socialRegistration") {
        jQuery('#login-container').find('form[name=loginradius-socialRegistration]').parent().addClass('socialRegistration');
    }
    if (name == "removeemail") {
       jQuery('#loginradius-removeemail-emailid').val(dropemailvalue);      
    }    
});

function lrSetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
