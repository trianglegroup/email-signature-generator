function toCapitalize(string) {
    return string.replace(/\-/g, ' ').replace(/\w\S*/g, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
}

let companies = [
    {
        name: 'Triangle Group',
        logo: 'resources/images/logos/triangle-group.png',
        phone: '+20 2 27250191-9',
        phoneUrl: 'tel:+20227250191',
        fax: '+20 2 27250180',
        faxUrl: 'fax:+20227250180',
    },
    {
        name: 'Triangle Energy',
        logo: 'resources/images/logos/triangle-energy.png',
        phone: '+20 2 27250191-9',
        phoneUrl: 'tel:+20227250191',
        fax: '+20 2 27250180',
        faxUrl: 'fax:+20227250180',
    },
    {
        name: 'Triangle Energy Projects',
        logo: 'resources/images/logos/triangle-energy-projects.png',
        phone: '+20 2 27250191-9',
        phoneUrl: 'tel:+20227250191',
        fax: '+20 2 27250180',
        faxUrl: 'fax:+20227250180',
    },
    {
        name: 'Triangle International Energy Service LTD',
        logo:
            'resources/images/logos/triangle-international-energy-service-ltd.png',
        phone: '+20 2 27250191-9',
        phoneUrl: 'tel:+20227250191',
        fax: '+20 2 27250180',
        faxUrl: 'fax:+20227250180',
    },
    {
        name: 'Triangle Oilfield Services',
        logo: 'resources/images/logos/triangle-oilfield-services.png',
        phone: '+20 2 27250191-9',
        phoneUrl: 'tel:+20227250191',
        fax: '+20 2 27250180',
        faxUrl: 'fax:+20227250180',
    },
    {
        name: 'Triangle Oilfield Services Free Zone',
        logo: 'resources/images/logos/triangle-oilfield-services-free-zone.png',
        phone: '+20 2 27250191-9',
        phoneUrl: 'tel:+20227250191',
        fax: '+20 2 27250180',
        faxUrl: 'fax:+20227250180',
    },
];

$('<select name="company"></select>')
    .append(
        '<option disabled selected value>Select a Company/Subsidiary</option>'
    )
    .appendTo('.changeables');

$.each(companies, function (index, company) {
    let companyName = company.name;
    $('select[name="company"]').append(new Option(companyName, companyName));
});

$('select[name="company"]').on('change', function () {
    let companyName = this.value,
        company = companies.find((company) => company.name === companyName);
    $('#logo').attr('src', company.logo).attr('alt', companyName);
    $('#phone').text(company.phone).attr('href', company.phoneUrl);
    $('#fax').text(company.fax).attr('href', company.faxUrl);
});

let departments = [
    'Administration',
    'Information Technology',
    'Human Resources',
];

$('<select name="department"></select>')
    .append('<option disabled selected value>Select a Department</option>')
    .appendTo('.changeables');

$.each(departments, function (index, department) {
    $('select[name="department"]').append(new Option(department, department));
});

$('select[name="department"]').on('change', function () {
    $('#department').text(this.value);
});

$('.changeable.text').each(function () {
    let changeable = $(this),
        identifier = $(this).attr('id'),
        title = toCapitalize(identifier),
        isCapitalize = changeable.hasClass('capitalize'),
        isLink = $(this).is('a');

    $('<input/>')
        .attr({
            type: 'text',
            name: identifier,
            placeholder: title,
        })
        .appendTo('.changeables')
        .on('input', function () {
            input = $(this).val();
            isCapitalize
                ? changeable.text(toCapitalize(input))
                : changeable.text(input);

            if (isLink) {
                let url = changeable.attr('href') || '',
                    prefix = url.includes(':')
                        ? url.substring(0, url.indexOf(':') + 1)
                        : false;
                prefix
                    ? changeable.attr('href', prefix + input)
                    : changeable.attr('href', input);
            }
        });
});

$('.code pre').text($('.email-signature table').prop('outerHTML'));

$('.email-signature').bind('DOMSubtreeModified', function () {
    $('.code pre').text($('.email-signature table').prop('outerHTML'));
});

$('.code').click(function () {
    let range = document.createRange(),
        sel = window.getSelection();
    range.setStartBefore(this.firstChild);
    range.setEndAfter(this.lastChild);
    sel.removeAllRanges();
    sel.addRange(range);
    try {
        var successful = document.execCommand('copy');
        alert('The signature were copied.');
    } catch (err) {
        console.error('Unable to copy the signature.');
    }
});
