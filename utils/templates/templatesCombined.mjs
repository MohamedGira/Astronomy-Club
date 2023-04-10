import fs from 'fs'

import path, { relative } from "path";

import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const templatesdir=__dirname





export const confirmfrontStr=`    <style>
div {
    font-family: sans-serif;
    background-color: #EEEEEE;
    padding: 20px;
    max-width: 600px;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;
}


h1 {
    color: #303030;
    text-align: center;
    margin-top: 0;
}

p {
    color: #555;
    font-size: 18px;
    text-align: center;
}

a {
    display: block;
    margin: 0 auto;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease-in-out;
    width: 20%;
    
}


button:hover {
    background-color: #3e8e41;
}

img {
    display: block;
    float: left;
    margin-right: 10px;
    
    height: 50px;

}
</style>
<div>
<div>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2RKMn7FEPGoElxcUUQLpfNZHTescpPRbdEg&usqp=CAU" alt="Logo">
</div>
<div>
    <h1>Confirm Account</h1>
    <p>Thank you for signing up! To complete your registration, please click the button below to confirm your
        account:</p>
    <a href="{targetUrl}/api/v1/auth/confirmRegistration?token={myJWT}">Confirm</a>
    <p>this link will expire in {expiration_time} minutes</p>
</div>
</div>
`

/* export const resetfrontStr=`
<style>
div {
    font-family: sans-serif;
    background-color: #EEEEEE;
    padding: 20px;
    max-width: 600px;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;
}


h1 {
    color: #303030;
    text-align: center;
    margin-top: 0;
}

p {
    color: #555;
    font-size: 18px;
    text-align: center;
}

#submit {
    display: block;
    margin: 0 auto;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease-in-out;
    
}


button:hover {
    background-color: #3e8e41;
}

img {
    display: block;
    float: left;
    margin-right: 10px;
    
    height: 50px;

}
</style>
<div>
<div>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2RKMn7FEPGoElxcUUQLpfNZHTescpPRbdEg&usqp=CAU" alt="Logo">
</div>
<div>
    <h1>Reset password</h1>
    <p>Enter New password </p>

        <form style="text-align:center;" action="{targetUrl}/api/v1/auth/changePassword" method="post">
            <input type="hidden" name="token" value="{myJWT}"/>
            <label for="password">New Password:</label>
            <br>
            <input type="password" id="password" name="password" required><br><br>
            <label for="confirm_password">Confirm New Password:</label>
            <br>
            <input type="password" id="confirm_password" name="confirm_password" required><br><br>
            <input id="submit" type="submit" value="Reset Password">
        </form>
        
    <p>this link will expire in {expiration_time} minutes</p>
</div>
</div>
` */

export const resetfrontNew=`
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title></title>
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
#outlook a{padding:0;}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}p{display:block;margin:0;}
</style>
<!--[if mso]> <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<!--[if lte mso 11]>
<style type="text/css">
.ogf{width:100% !important;}
</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Ubuntu:700,400" rel="stylesheet" type="text/css">
<style type="text/css">

</style>
<!--<![endif]-->
<style type="text/css">
@media only screen and (min-width:599px){.pc100{width:100%!important;max-width:100%;}.xc536{width:536px!important;max-width:536px;}.xc600{width:600px!important;max-width:600px;}}
</style>
<style media="screen and (min-width:599px)">.moz-text-html .pc100{width:100%!important;max-width:100%;}.moz-text-html .xc536{width:536px!important;max-width:536px;}.moz-text-html .xc600{width:600px!important;max-width:600px;}
</style>
<style type="text/css">
@media only screen and (max-width:599px){table.fwm{width:100%!important;}td.fwm{width:auto!important;}}
</style>
<style type="text/css">
u+.emailify .gs{background:#000;mix-blend-mode:screen;display:inline-block;padding:0;margin:0;}u+.emailify .gd{background:#000;mix-blend-mode:difference;display:inline-block;padding:0;margin:0;}u+.emailify a,#MessageViewBody a,a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important;}span.MsoHyperlink{mso-style-priority:99;color:inherit;}span.MsoHyperlinkFollowed{mso-style-priority:99;color:inherit;}td.b .klaviyo-image-block{display:inline;vertical-align:middle;}
@media only screen and (max-width:599px){.emailify{height:100%!important;margin:0!important;padding:0!important;width:100%!important;}u+.emailify .glist{margin-left:1em!important;}td.ico.v>div.il>a.l.m,td.ico.v .mn-label{padding-right:0!important;padding-bottom:16px!important;}td.x{padding-left:0!important;padding-right:0!important;}.fwm img{max-width:100%!important;height:auto!important;}.aw img{width:auto!important;margin-left:auto!important;margin-right:auto!important;}.ah img{height:auto!important;}td.b.nw>table,td.b.nw a{width:auto!important;}td.stk{border:0!important;}td.tgtr{line-height:0!important;}td.u{height:auto!important;}br.sb{display:none!important;}.thd-1 .i-thumbnail{display:inline-block!important;height:auto!important;overflow:hidden!important;}.hd-1{display:block!important;height:auto!important;overflow:visible!important;}.ht-1{display:table!important;height:auto!important;overflow:visible!important;}.hr-1{display:table-row!important;height:auto!important;overflow:visible!important;}.hc-1{display:table-cell!important;height:auto!important;overflow:visible!important;}div.r.pr-16>table>tbody>tr>td,div.r.pr-16>div>table>tbody>tr>td{padding-right:16px!important}div.r.pl-16>table>tbody>tr>td,div.r.pl-16>div>table>tbody>tr>td{padding-left:16px!important}div.r.pt-0>table>tbody>tr>td,div.r.pt-0>div>table>tbody>tr>td{padding-top:0px!important}div.r.pr-0>table>tbody>tr>td,div.r.pr-0>div>table>tbody>tr>td{padding-right:0px!important}div.r.pb-0>table>tbody>tr>td,div.r.pb-0>div>table>tbody>tr>td{padding-bottom:0px!important}div.r.pl-0>table>tbody>tr>td,div.r.pl-0>div>table>tbody>tr>td{padding-left:0px!important}td.b.fw-1>table{width:100%!important}td.fw-1>table>tbody>tr>td>a{display:block!important;width:100%!important;padding-left:0!important;padding-right:0!important;}td.b.fw-1>table{width:100%!important}td.fw-1>table>tbody>tr>td{width:100%!important;padding-left:0!important;padding-right:0!important;}}
</style>
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<!--[if gte mso 9]>
<style>li{text-indent:-1em;}
</style>
<![endif]-->
</head>
<body lang="en" link="#DD0000" vlink="#DD0000" class="emailify" style="mso-line-height-rule:exactly;word-spacing:normal;background-color:#1e1e1e;"><div class="bg" style="background-color:#1e1e1e;">
<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r  pr-16 pl-16" style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="none" style="background:#000000;background-color:#000000;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:16px 32px 16px 32px;text-align:left;">
<!--[if mso | IE]>
<table role="none" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="width:536px;">
<![endif]--><div class="pc100 ogf" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
<!--[if mso | IE]>
<table border="0" cellpadding="0" cellspacing="0" role="none"><tr><td style="vertical-align:middle;width:536px;">
<![endif]--><div class="pc100 ogf c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100.0000%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="i" style="font-size:0;padding:0;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border-collapse:collapse;border-spacing:0;"><tbody><tr><td style="width:50px;"> <img alt="" height="auto" src="https://astronomy-club.vercel.app/images/Logo3.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="150">
</td></tr></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]--></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r  pr-16 pl-16" style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="none" style="background:#000000;background-color:#000000;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:16px 32px 16px 32px;text-align:left;">
<!--[if mso | IE]>
<table role="none" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:536px;">
<![endif]--><div class="xc536 ogf c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x" style="font-size:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;"><span style="font-size:24px;font-family:Ubuntu,Arial,sans-serif;font-weight:700;color:#ffffff;line-height:113%;">Reset Your AstronomyClub Password</span></p></div>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pt-0-outlook pr-0-outlook pb-0-outlook pl-0-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r  pt-0 pr-0 pb-0 pl-0" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="none" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:0;text-align:left;">
<!--[if mso | IE]>
<table role="none" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:600px;">
<![endif]--><div class="xc600 ogf c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="center" class="i  fw-1" style="font-size:0;padding:0;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border-collapse:collapse;border-spacing:0;" class="fwm"><tbody><tr><td style="width:600px;" class="fwm"> <img alt="" height="auto" src="https://astronomy-club.vercel.app/images/reset_password.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="600">
</td></tr></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r  pr-16 pl-16" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="none" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:32px 32px 32px 32px;text-align:left;">
<!--[if mso | IE]>
<table role="none" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:536px;">
<![endif]--><div class="xc536 ogf c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x" style="font-size:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">We're sorry to hear that you're having trouble accessing your AstronomyClub account. Don't worry, we're here to help you reset your password.</span></p><p style="Margin:0;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">&nbsp;</span></p><p style="Margin:0;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">To reset your password, please click on the following link:</span></p></div>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r  pr-16 pl-16" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="none" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:0px 32px 0px 32px;text-align:left;">
<!--[if mso | IE]>
<table role="none" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:536px;">
<![endif]--><div class="xc536 ogf c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" vertical-align="middle" class="b  fw-1" style="font-size:0;padding:0;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border-collapse:separate;width:170px;line-height:100%;"><tbody><tr><td align="center" bgcolor="#000000" role="none" style="border:none;border-radius:60px 60px 60px 60px;cursor:auto;mso-padding-alt:12px 0px 12px 0px;background:#000000;" valign="middle">
     <a href="{targetUrl}?token={myJWT}" style="display:inline-block;width:170px;background:#000000;color:#ffffff;font-family:Ubuntu,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:100%;margin:0;text-decoration:none;text-transform:none;padding:12px 0px 12px 0px;mso-padding-alt:0;border-radius:60px 60px 60px 60px;" target="_blank"> <span style="font-size:14px;font-family:Ubuntu,Arial,sans-serif;font-weight:700;color:#ffffff;line-height:114%;">Reset Password</span></a>
</td></tr></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r  pr-16 pl-16" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="none" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:32px 32px 56px 32px;text-align:left;">
<!--[if mso | IE]>
<table role="none" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:536px;">
<![endif]--><div class="xc536 ogf c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x" style="font-size:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">You'll be taken to a page where you can enter a new password for your account. If you didn't request this password reset, please ignore this email.</span></p><p style="Margin:0;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">&nbsp;</span></p><p style="Margin:0;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">If you have any questions or concerns, please don't hesitate to contact us on our&nbsp;</span><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;text-decoration:underline;"><a href="https://www.facebook.com/astronomyauc" style="color:#777777;text-decoration:underline;" target="_blank">Facebook Page</a></span><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">. We're here to help!</span></p><p style="Margin:0;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">&nbsp;</span></p><p style="Margin:0;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">Best regards,</span></p><p style="Margin:0;"><span style="font-size:16px;font-family:Ubuntu,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">AstronomyClub Team.</span></p></div>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]--></div>
</body>
</html>
`

export const getResetTemplate=()=>{
    return fs.readFileSync((__dirname+'\\reset_password_new.html').replace(/\\/,'/')).toString()
}
export const getResetejs=()=>{
    return fs.readFileSync((__dirname+'\\resetPasswordNew.ejs').replace(/\\/,'/')).toString()
}
export const getconfirmTemplate=()=>{
    return fs.readFileSync((__dirname+'\\confirm_registration.html').replace(/\\/,'/')).toString()
}
