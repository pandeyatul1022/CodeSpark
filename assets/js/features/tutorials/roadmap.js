(function () {
  'use strict';

  const tracks = {
    html: {
      title: 'HTML learning path',
      levels: [
        ['HTML foundations', 'Learn what HTML is and how tags, elements, and attributes describe page content.', 'Identify the opening tag, closing tag, and content in a paragraph element.'],
        ['HTML Document Structure', 'Put together the doctype and the html, head, and body elements.', 'Create a valid blank HTML document in the editor.'],
        ['Headings and Text', 'Structure a page with headings and readable paragraphs.', 'Create a page with one main heading, a section heading, and two paragraphs.'],
        ['Links and Images', 'Connect pages with meaningful links and add images with useful text alternatives.', 'Create a page with a working link and an image that has appropriate alternative text.'],
        ['Lists and Grouping', 'Organize related content with lists and group content only when a semantic element does not fit.', 'Create a list of supplies and group related content in a page section.'],
        ['HTML Tables', 'Represent structured data in accessible rows and columns.', 'Build a data table with a caption, header cells, and clearly grouped rows.'],
        ['HTML Forms and Inputs', 'Collect user information with accessible forms and suitable input controls.', 'Build a labeled form with appropriate controls and built-in validation.'],
        ['Semantic HTML5', 'Choose meaningful HTML elements to describe the structure and purpose of page content.', 'Build a page layout using semantic landmarks and content elements.'],
        ['Media and Embedded Content', 'Add accessible audio and video, embed external content carefully, and serve images suited to each screen.', 'Add a video with controls, a titled iframe, and responsive image sources.'],
        ['Head, Metadata and SEO', 'Add document metadata that helps browsers and people understand and share each page.', 'Create a page head with a unique title, useful description, and relevant metadata.'],
        ['Accessibility and Best Practices', 'Build HTML that is understandable, operable, and robust for a wide range of people and devices.', 'Review a page for meaningful structure, accessible names, keyboard use, and valid markup.'],
        ['Advanced HTML5 Features', 'Use modern native HTML elements and browser capabilities when they suit the task.', 'Add a disclosure, a dialog, and reusable template content using native HTML features.'],
        ['HTML Practice Projects', 'Combine HTML structure, semantics, links, media, forms, and accessibility in complete practice pages.', 'Build and review a small multi-section website using the HTML skills from earlier levels.']
      ],
      examples: [
        '<p>Hello, web!</p>',
        '<!doctype html>\n<html lang="en">\n<head><title>My page</title></head>\n<body><h1>Hello</h1></body>\n</html>',
        '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My page</title>\n</head>',
        '<h1>My garden</h1>\n<h2>Flowers</h2>\n<p>Some flowers bloom in spring.</p>',
        '<p><strong>Warning:</strong> <em>hot surface</em>. Use <code>&lt;strong&gt;</code> for importance.</p>',
        '<!-- Main page heading -->\n<p>Use &lt; to display a less-than sign.</p>',
        '<a href="about.html">About us</a>\n<a href="#contact">Contact section</a>',
        '<img src="cat.jpg" alt="A ginger cat sleeping on a chair" width="640" height="480">',
        '<figure>\n  <picture><source media="(max-width: 600px)" srcset="small.jpg"><img src="large.jpg" alt="Snowy mountain" loading="lazy"></picture>\n  <figcaption>A mountain after snowfall</figcaption>\n</figure>',
        '<ol><li>Mix</li><li>Bake</li></ol>\n<ul><li>Flour</li><li>Water</li></ul>',
        '<table>\n  <caption>Weekly hours</caption>\n  <thead><tr><th scope="col">Day</th><th scope="col">Hours</th></tr></thead>\n  <tbody><tr><th scope="row">Monday</th><td>6</td></tr></tbody>\n</table>',
        '<div class="link-group"><a href="one.html">One</a> <a href="two.html">Two</a></div>',
        '<header>Site title</header><nav aria-label="Main"><a href="/">Home</a></nav><main><article><h1>News</h1></article></main><footer>Copyright</footer>',
        '<video controls>\n  <source src="clip.mp4" type="video/mp4">\n  Your browser does not support video.\n</video>'
      ],
      priorities: [
        'must', 'must', 'must', 'must', 'must', 'must', 'must', 'must', 'must', 'must',
        'must', 'must', 'must'
      ],
      lessonSteps: [
        {
          title: 'Introduction to HTML',
          explanation: 'HTML (HyperText Markup Language) gives a web page its structure and meaning. It tells the browser which content is a heading, paragraph, link, image, or other part of the page.',
          example: '<h1>Welcome to my page</h1>\n<p>This is my first paragraph.</p>'
        },
        {
          title: 'What Is HTML5?',
          explanation: 'HTML5 is the name commonly used for the modern generation of HTML. It brought widely used semantic elements such as main, header, and article, along with built-in audio, video, and graphics support. HTML continues to evolve as a living standard.',
          example: '<main>\n  <article>\n    <h1>My story</h1>\n    <p>Written with modern HTML.</p>\n  </article>\n</main>'
        },
        {
          title: 'How Websites Work',
          explanation: 'When you visit a website, your browser requests files from a web server. The browser reads HTML for structure, CSS for appearance, and JavaScript for behavior, then displays the page.',
          example: 'HTML      → page structure\nCSS       → colors and layout\nJavaScript → actions and interactivity'
        },
        {
          title: 'HTML Tags, Elements and Attributes',
          explanation: 'Tags are the markup inside angle brackets. An element is the complete piece made from tags and its content. Attributes add extra information in an opening tag, such as the destination of a link.',
          example: '<a href="https://example.com">Visit Example</a>\n\n<a> and </a> are tags; the whole link is an element; href is an attribute.'
        },
        {
          title: 'Opening Tags and Closing Tags',
          explanation: 'Most HTML elements have an opening tag and a closing tag. The closing tag has a forward slash. The content goes between them, and the tags together mark where that content begins and ends.',
          example: '<p>This is the content.</p>\n ^ opening tag       ^ closing tag'
        },
        {
          title: 'Nested Elements and Empty Elements',
          explanation: 'Elements can be placed inside other elements; this is called nesting. Close nested elements in the reverse order they were opened. Some elements have no content or closing tag; these are void (often called empty) elements.',
          example: '<p>Learn <strong>HTML</strong> today.</p>\n\n<img src="cat.jpg" alt="A cat">\n<!-- img is a void element -->'
        },
        {
          title: 'HTML Comments',
          explanation: 'Comments are notes in your source code. Browsers do not display them as page content. Use comments to explain sections, but do not put passwords or private information in them because visitors can view page source.',
          example: '<!-- This is a note for developers -->\n<h1>My page</h1>'
        },
        {
          title: 'Writing Your First HTML Program',
          explanation: 'A complete HTML document starts with the doctype, then has an html root element. The head holds page information, while the body contains the content visitors see. Save it as index.html and open it in a browser.',
          example: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n  <p>I made my first web page.</p>\n</body>\n</html>'
        }
      ],
      documentStructureSteps: [
        {
          title: 'The <!DOCTYPE html> Declaration',
          explanation: 'Place the doctype declaration at the very beginning of an HTML document. It tells browsers to use modern standards mode. It is a declaration, not an HTML element, and it does not need a closing tag.',
          example: '<!DOCTYPE html>\n<html lang="en">\n  ...\n</html>'
        },
        {
          title: 'The <html> Element',
          explanation: 'The html element is the root of the page: all other elements belong inside it. Add a lang attribute so browsers and assistive technologies know the page language, then close it after the head and body.',
          example: '<html lang="en">\n  <head>...</head>\n  <body>...</body>\n</html>'
        },
        {
          title: 'The <head> Element',
          explanation: 'The head contains information about the document rather than the main content shown on the page. It commonly includes the character encoding, responsive viewport setting, page title, and links to stylesheets.',
          example: '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My Website</title>\n</head>'
        },
        {
          title: 'The <body> Element',
          explanation: 'The body holds the page content that visitors interact with, such as headings, paragraphs, images, and links. A well-formed document has one head and one body inside its html element.',
          example: '<body>\n  <h1>Welcome</h1>\n  <p>This content appears on the page.</p>\n</body>'
        },
        {
          title: 'HTML Boilerplate Structure',
          explanation: 'A boilerplate is a reliable starting structure for a new page. The doctype comes first, followed by the html root, head metadata, and body content. The viewport setting helps the page display correctly on mobile screens.',
          example: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My Website</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n</body>\n</html>'
        },
        {
          title: 'Indentation and Proper Nesting',
          explanation: 'Indent child elements consistently to make the document structure easy to read. Close elements in the reverse order they were opened, and keep child elements inside their parent. Indentation improves readability but does not replace correct tags.',
          example: '<main>\n  <article>\n    <h1>News</h1>\n    <p>Today’s update.</p>\n  </article>\n</main>'
        }
      ],
      headingsTextSteps: [
        {
          title: 'Headings: <h1> to <h6>',
          explanation: 'HTML has six heading levels, from h1 (the most important heading) to h6. Use headings to organize sections in a meaningful hierarchy, not just to make text look bigger. A page usually has one clear main heading.',
          example: '<h1>Ocean Life</h1>\n<h2>Sharks</h2>\n<h3>How they live</h3>'
        },
        {
          title: 'Paragraphs: <p>',
          explanation: 'Use a p element for a paragraph of text. Browsers display paragraphs as separate blocks with space around them by default. Keep each paragraph focused on one idea.',
          example: '<p>Coral reefs are home to many kinds of sea life.</p>\n<p>They grow in warm, shallow water.</p>'
        },
        {
          title: 'Line Break: <br>',
          explanation: 'The br element creates a line break inside text where the line break is part of the content, such as a postal address or a poem. It is a void element, so it has no closing tag. Do not use repeated br elements to create page spacing.',
          example: '<p>\n  10 Main Street<br>\n  Jaipur, Rajasthan\n</p>'
        },
        {
          title: 'Horizontal Rule: <hr>',
          explanation: 'The hr element represents a thematic break between sections of content. Browsers usually show it as a horizontal line, but its meaning is a change of topic, not merely a decorative border. It is a void element.',
          example: '<p>First topic: the history of HTML.</p>\n<hr>\n<p>Next topic: modern web browsers.</p>'
        },
        {
          title: 'Bold and Importance: <b>, <strong>',
          explanation: 'The b element draws attention to text without adding extra importance. The strong element marks text with strong importance or urgency. Choose the element based on meaning, not only on its usual bold appearance.',
          example: '<p>Search for the <b>keyword</b> in the glossary.</p>\n<p><strong>Warning:</strong> Save your work before closing.</p>'
        },
        {
          title: 'Italic and Emphasis: <i>, <em>',
          explanation: 'The i element marks text set apart from the surrounding text, such as a technical term or a phrase in another language. The em element adds spoken emphasis. Browsers commonly render both in italics, but their meanings differ.',
          example: '<p>The word <i lang="fr">bonjour</i> is French.</p>\n<p>I <em>really</em> enjoyed the lesson.</p>'
        },
        {
          title: 'Superscript and Subscript',
          explanation: 'Use sup for superscript text, such as an exponent or a footnote marker. Use sub for subscript text, such as the numbers in a chemical formula. These elements affect how text is positioned and convey the notation’s meaning.',
          example: '<p>Area: 5 m<sup>2</sup></p>\n<p>Water: H<sub>2</sub>O</p>'
        },
        {
          title: 'Text Formatting and Preformatted Text',
          explanation: 'The mark element highlights text relevant in the current context, del marks removed text, and ins marks inserted text. The pre element preserves whitespace and line breaks, which is useful for examples such as code or poetry. Use code to identify computer code.',
          example: '<p>Remember to <mark>save your work</mark>.</p>\n<pre><code>line one\n  line two</code></pre>'
        }
      ],
      linksImagesSteps: [
        {
          title: 'Anchor Tag: <a>',
          explanation: 'The a (anchor) element creates a hyperlink. Set its destination with the href attribute and use clear, descriptive text between the opening and closing tags so visitors know where the link leads.',
          example: '<a href="about.html">Read about our team</a>'
        },
        {
          title: 'Absolute and Relative URLs',
          explanation: 'An absolute URL includes the full address, including scheme and domain. A relative URL points to a location based on the current page, making it useful for files and pages within your site.',
          example: '<a href="https://example.com/about">About Example</a>\n<a href="../contact.html">Contact</a>'
        },
        {
          title: 'Internal and External Links',
          explanation: 'Internal links navigate to another page or section on your site. External links navigate to another site. For a same-page link, use a fragment identifier that matches the destination element’s unique id.',
          example: '<a href="lessons.html">Other lessons</a>\n<a href="#examples">Jump to examples</a>\n\n<h2 id="examples">Examples</h2>'
        },
        {
          title: 'Email and Telephone Links',
          explanation: 'Use the mailto: scheme to create a link that can start an email, and tel: to create a link that can start a phone call on supported devices. Use readable link text to identify the action or contact.',
          example: '<a href="mailto:hello@example.com">Email our team</a>\n<a href="tel:+15551234567">Call +1 555 123 4567</a>'
        },
        {
          title: 'Image Tag: <img>',
          explanation: 'The img element embeds an image in the page. Its src attribute points to the image file and its alt attribute provides an appropriate text alternative. It is a void element and does not have a closing tag.',
          example: '<img src="images/forest.jpg" alt="Sunlight filtering through a green forest">'
        },
        {
          title: 'Image Attributes: src, alt, width, height',
          explanation: 'Use src for the image path, alt for its meaningful text alternative (or an empty value when decorative), and width and height for its intrinsic dimensions. Providing dimensions helps the browser reserve space and avoid layout shifts.',
          example: '<img src="images/park.jpg" alt="A path through the city park" width="800" height="500">'
        },
        {
          title: 'Linking Images and Understanding File Paths',
          explanation: 'An image can be placed inside an anchor to make it clickable. File paths are resolved from the HTML document: use a folder name for a child folder and ../ to move to its parent. Keep useful alt text on linked images so the link remains understandable.',
          example: '<a href="gallery.html">\n  <img src="images/park.jpg" alt="View the park photo gallery" width="800" height="500">\n</a>'
        }
      ],
      listsGroupingSteps: [
        {
          title: 'Unordered Lists: <ul>',
          explanation: 'Use an unordered list when the items belong together but their order does not matter. Put each item in its own li (list item) element inside the ul.',
          example: '<ul>\n  <li>Notebook</li>\n  <li>Pencil</li>\n  <li>Ruler</li>\n</ul>'
        },
        {
          title: 'Ordered Lists: <ol>',
          explanation: 'Use an ordered list when the sequence or ranking of items matters, such as instructions or a ranked set of results. Place each entry in an li element.',
          example: '<ol>\n  <li>Open the editor</li>\n  <li>Write your HTML</li>\n  <li>Preview the page</li>\n</ol>'
        },
        {
          title: 'List Items: <li>',
          explanation: 'The li element represents one item in an ordered or unordered list. Keep list items inside a ul or ol rather than using bullets or numbers typed into ordinary paragraphs.',
          example: '<ul>\n  <li><a href="guide.html">Read the guide</a></li>\n  <li>Try the practice task</li>\n</ul>'
        },
        {
          title: 'Description Lists: <dl>, <dt>, <dd>',
          explanation: 'Use a description list for groups of terms and their descriptions. The dl contains the list, dt identifies a term, and dd provides its description.',
          example: '<dl>\n  <dt>HTML</dt>\n  <dd>The language used to structure web content.</dd>\n  <dt>CSS</dt>\n  <dd>The language used to style web content.</dd>\n</dl>'
        },
        {
          title: 'Nested Lists, <div> and <span>',
          explanation: 'Nest a ul or ol inside an li when an item has related sub-items. The generic div groups block content and span groups inline text; use them for styling or scripting only when a more meaningful HTML element does not fit.',
          example: '<ul>\n  <li>Fruit\n    <ul>\n      <li>Apples</li>\n      <li>Oranges</li>\n    </ul>\n  </li>\n</ul>\n\n<div class="profile-card">\n  <p>Course status: <span class="status">In progress</span></p>\n</div>'
        }
      ],
      htmlTablesSteps: [
        {
          title: 'Table Structure: <table>',
          explanation: 'Use the table element to present data with meaningful row and column relationships, such as marks or schedules. Tables are for data, not page layout. Add a caption and clear headings so the information is understandable.',
          example: '<table>\n  <caption>Student marks</caption>\n  <!-- Table rows go here -->\n</table>'
        },
        {
          title: 'Rows and Cells: <tr>, <td>, <th>',
          explanation: 'Each tr creates a row. Use td for ordinary data and th for a heading that labels a row or column. The scope attribute on th helps connect headings to the data they describe.',
          example: '<tr>\n  <th scope="col">Student</th>\n  <th scope="col">Marks</th>\n</tr>\n<tr>\n  <th scope="row">Asha</th>\n  <td>92</td>\n</tr>'
        },
        {
          title: '<thead>, <tbody> and <tfoot>',
          explanation: 'Group column headings in thead, the main data rows in tbody, and optional summary rows in tfoot. These sections make the table structure clearer and keep related rows organized.',
          example: '<table>\n  <thead>\n    <tr><th scope="col">Student</th><th scope="col">Marks</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">Asha</th><td>92</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><th scope="row">Class average</th><td>86</td></tr>\n  </tfoot>\n</table>'
        },
        {
          title: 'Merge Cells with colspan and rowspan',
          explanation: 'Use colspan to make a cell span multiple columns and rowspan to span multiple rows. These attributes can represent grouped headings or shared labels; ensure the resulting table grid remains consistent.',
          example: '<tr>\n  <th colspan="2">Term 1</th>\n</tr>\n<tr>\n  <th rowspan="2" scope="row">Asha</th>\n  <td>Math: 92</td>\n</tr>\n<tr><td>Science: 88</td></tr>'
        },
        {
          title: 'Creating a Student Marks Table',
          explanation: 'Bring the table elements together: describe the table with a caption, use column and row header cells, group the main records in tbody, and include a summary in tfoot when useful.',
          example: '<table>\n  <caption>Class 8 student marks</caption>\n  <thead>\n    <tr><th scope="col">Student</th><th scope="col">Math</th><th scope="col">Science</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">Asha</th><td>92</td><td>88</td></tr>\n    <tr><th scope="row">Ravi</th><td>85</td><td>91</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><th scope="row">Class total</th><td>177</td><td>179</td></tr>\n  </tfoot>\n</table>'
        }
      ],
      formsInputsSteps: [
        {
          title: 'Introduction to Forms: <form>',
          explanation: 'The form element groups controls that collect user input. Its action identifies where data is sent and its method specifies how it is sent. A real site must process submissions and validate data on the server.',
          example: '<form action="/signup" method="post">\n  <!-- Labeled form controls go here -->\n  <button type="submit">Sign up</button>\n</form>'
        },
        {
          title: 'Text and Password Inputs',
          explanation: 'Use type="text" for short text and type="password" for secret text that should be visually obscured. Give controls a name so their values can be submitted, and use autocomplete tokens when appropriate.',
          example: '<label for="username">Username</label>\n<input id="username" name="username" type="text" autocomplete="username">\n\n<label for="password">Password</label>\n<input id="password" name="password" type="password" autocomplete="new-password">'
        },
        {
          title: 'Email, Number and Telephone Inputs',
          explanation: 'Choose email, number, and tel input types for the expected data. Browsers can provide useful input behavior, but server-side validation is still required. Use suitable labels and constraints such as min or max where relevant.',
          example: '<label for="email">Email</label>\n<input id="email" name="email" type="email" autocomplete="email">\n\n<label for="quantity">Quantity</label>\n<input id="quantity" name="quantity" type="number" min="1">\n\n<label for="phone">Telephone</label>\n<input id="phone" name="phone" type="tel" autocomplete="tel">'
        },
        {
          title: 'Radio Buttons and Checkboxes',
          explanation: 'Radio buttons with the same name form a group where the user chooses one option. Checkboxes allow independent choices. Give each control a label and a meaningful value for submission.',
          example: '<fieldset>\n  <legend>Preferred contact</legend>\n  <label><input type="radio" name="contact" value="email"> Email</label>\n  <label><input type="radio" name="contact" value="phone"> Phone</label>\n</fieldset>\n<label><input type="checkbox" name="updates" value="yes"> Send me updates</label>'
        },
        {
          title: 'Date, File, Range and Color Inputs',
          explanation: 'These specialized input types offer controls suited to particular values: a date, a selected file, a numeric range, or a color. For file uploads, the form typically needs method="post" and enctype="multipart/form-data"; validate uploaded files on the server.',
          example: '<label for="date">Visit date</label>\n<input id="date" name="date" type="date">\n<label for="photo">Choose a photo</label>\n<input id="photo" name="photo" type="file" accept="image/*">\n<label for="rating">Rating</label>\n<input id="rating" name="rating" type="range" min="1" max="5">\n<label for="color">Favorite color</label>\n<input id="color" name="color" type="color">'
        },
        {
          title: 'Labels and Placeholders',
          explanation: 'A label gives a control a persistent, accessible name; connect for to the matching unique id or wrap the control inside the label. A placeholder is only a short example or hint and should never replace a label.',
          example: '<label for="city">City</label>\n<input id="city" name="city" type="text" placeholder="e.g. Jaipur">'
        },
        {
          title: 'Dropdowns: <select> and <option>',
          explanation: 'Use select for a set of predefined choices, with each option describing one choice. Give the select a label and name, and set an explicit value for each option.',
          example: '<label for="course">Choose a course</label>\n<select id="course" name="course">\n  <option value="">Select a course</option>\n  <option value="html">HTML</option>\n  <option value="css">CSS</option>\n</select>'
        },
        {
          title: '<textarea>, <button> and Form Submission',
          explanation: 'Use textarea for multi-line input and a button with type="submit" to submit a form. Use type="button" for buttons that should not submit. Controls need names to contribute values to form submission.',
          example: '<label for="message">Message</label>\n<textarea id="message" name="message" rows="4"></textarea>\n<button type="submit">Send message</button>\n<button type="button">Preview</button>'
        },
        {
          title: 'Form Attributes and HTML Validation',
          explanation: 'Form attributes such as action, method, and autocomplete control submission behavior. Control attributes such as required, minlength, maxlength, min, and max provide browser-side checks. Client-side validation improves usability but never replaces server-side validation.',
          example: '<form action="/register" method="post" autocomplete="on">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required>\n  <label for="password">Password</label>\n  <input id="password" name="password" type="password" minlength="8" required>\n  <button type="submit">Register</button>\n</form>'
        }
      ],
      semanticHtmlSteps: [
        {
          title: 'What Is Semantic HTML?',
          explanation: 'Semantic HTML uses elements whose names describe the purpose or meaning of their content. Meaningful structure helps browsers, assistive technologies, and developers understand a page.',
          example: '<main>\n  <h1>City Garden</h1>\n  <p>Ideas for growing plants at home.</p>\n</main>'
        },
        {
          title: '<header> and <nav>',
          explanation: 'Use header for introductory content, such as a site or article heading. Use nav for a major group of navigation links, and give nav a label when a page has more than one navigation region.',
          example: '<header>\n  <a href="/">City Garden</a>\n  <nav aria-label="Main navigation">\n    <a href="/plants.html">Plants</a>\n    <a href="/tips.html">Tips</a>\n  </nav>\n</header>'
        },
        {
          title: '<main> and <section>',
          explanation: 'Use main for the page’s dominant, unique content; a document should generally have one visible main element. Use section to group a thematic part of the content, usually with its own heading.',
          example: '<main>\n  <h1>Growing herbs</h1>\n  <section>\n    <h2>Choose a location</h2>\n    <p>Start with a sunny windowsill.</p>\n  </section>\n</main>'
        },
        {
          title: '<article> and <aside>',
          explanation: 'Use article for self-contained content that could make sense on its own, such as a post or news story. Use aside for related but secondary content, such as a tip or related links.',
          example: '<article>\n  <h2>Growing mint</h2>\n  <p>Mint grows readily in containers.</p>\n  <aside>\n    <h3>Tip</h3>\n    <p>Use a pot to limit spreading.</p>\n  </aside>\n</article>'
        },
        {
          title: '<footer>, <figure> and <figcaption>',
          explanation: 'Use footer for information about its nearest page or section, such as author details. Use figure for self-contained content such as an illustration, and figcaption for its visible caption.',
          example: '<figure>\n  <img src="basil.jpg" alt="Fresh basil growing in a pot">\n  <figcaption>Basil growing on a sunny windowsill.</figcaption>\n</figure>\n<footer><p>Written by Maya Chen</p></footer>'
        },
        {
          title: 'Semantic Elements vs <div>',
          explanation: 'Prefer a semantic element when it accurately describes the content’s purpose. A div has no built-in meaning and is appropriate as a generic container for styling or scripting when no semantic element fits.',
          example: '<!-- Meaningful grouping -->\n<section>\n  <h2>Plant care</h2>\n  <p>Water when the soil is dry.</p>\n</section>\n\n<!-- Generic grouping when no semantic element fits -->\n<div class="card">...</div>'
        }
      ],
      mediaEmbeddedSteps: [
        {
          title: 'Audio: <audio>',
          explanation: 'Use the audio element to include sound in a page. Add controls so visitors can play, pause, and adjust playback. Include fallback text for browsers that do not support the element.',
          example: '<audio controls>\n  <source src="audio/podcast.mp3" type="audio/mpeg">\n  Your browser does not support audio playback.\n</audio>'
        },
        {
          title: 'Video: <video>',
          explanation: 'Use the video element to include a video. Provide controls and a poster image when useful. Add captions with a track element so spoken content is accessible to people who cannot hear the audio.',
          example: '<video controls width="640" poster="images/preview.jpg">\n  <source src="video/lesson.mp4" type="video/mp4">\n  <track src="captions/lesson-en.vtt" kind="captions" srclang="en" label="English">\n  Your browser does not support video playback.\n</video>'
        },
        {
          title: 'Media Attributes and Controls',
          explanation: 'The controls attribute exposes playback controls. Use muted or loop only when appropriate, and avoid autoplay with sound. Multiple source elements can offer alternate formats; the browser selects a supported source.',
          example: '<video controls preload="metadata" poster="images/preview.jpg">\n  <source src="video/lesson.webm" type="video/webm">\n  <source src="video/lesson.mp4" type="video/mp4">\n</video>'
        },
        {
          title: 'Embedding Content with <iframe>',
          explanation: 'An iframe embeds another page or service. Give it a descriptive title for assistive technology, set an appropriate size, and only embed trusted content. Use restrictive sandbox and permissions settings when the embedded content allows them.',
          example: '<iframe\n  src="https://example.com/map"\n  title="Map of the community garden"\n  width="600"\n  height="400"\n  loading="lazy"\n  sandbox="allow-scripts">\n</iframe>'
        },
        {
          title: 'Responsive Images: <picture>, srcset and sizes',
          explanation: 'Use srcset and sizes on img to let the browser choose an appropriate image based on viewport and display size. Use picture with source elements when providing alternate crops or formats. Keep meaningful alt text on the img element.',
          example: '<picture>\n  <source\n    type="image/avif"\n    srcset="images/garden-small.avif 480w, images/garden-large.avif 1000w"\n    sizes="(max-width: 600px) 100vw, 800px">\n  <img\n    src="images/garden-large.jpg"\n    srcset="images/garden-small.jpg 480w, images/garden-large.jpg 1000w"\n    sizes="(max-width: 600px) 100vw, 800px"\n    alt="Vegetable beds in a sunny community garden">\n</picture>'
        }
      ],
      headMetadataSeoSteps: [
        {
          title: 'Page Title: <title>',
          explanation: 'Give every page a concise, descriptive, unique title. Browsers use it in the tab and history, and search results may use it to describe the page. The title is placed inside head, not shown as the page’s visible heading.',
          example: '<head>\n  <title>Growing Basil at Home | Garden Journal</title>\n</head>\n<body>\n  <h1>Growing Basil at Home</h1>\n</body>'
        },
        {
          title: 'Character Encoding: charset',
          explanation: 'Declare UTF-8 character encoding near the start of head so text and symbols are interpreted consistently by browsers.',
          example: '<head>\n  <meta charset="utf-8">\n  <title>Garden Journal</title>\n</head>'
        },
        {
          title: 'Viewport Meta Tag',
          explanation: 'The viewport meta element helps a page use the device width on mobile screens. It does not make a page responsive by itself; the layout and styles must also adapt to different screen sizes.',
          example: '<meta name="viewport" content="width=device-width, initial-scale=1">'
        },
        {
          title: 'Meta Description and SEO Basics',
          explanation: 'Write a brief, accurate page description; search engines may use it in result snippets but can choose other text. Useful content, a descriptive title, logical headings, accessible images, and crawlable links matter more than repeating keywords. Metadata cannot guarantee rankings.',
          example: '<title>Growing Basil at Home | Garden Journal</title>\n<meta name="description" content="Learn how to grow healthy basil in a sunny spot.">'
        },
        {
          title: 'Adding a Favicon',
          explanation: 'A favicon is a small site icon commonly shown in browser tabs and bookmarks. Use a link element in head to point to the icon file and provide a suitable format and path.',
          example: '<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="icon" href="/icon.svg" type="image/svg+xml">'
        },
        {
          title: 'Linking CSS and JavaScript Files',
          explanation: 'Use link with rel="stylesheet" to connect an external CSS file. Load external JavaScript with script src; defer lets the browser download it while parsing HTML and execute it after parsing is complete.',
          example: '<head>\n  <link rel="stylesheet" href="styles.css">\n  <script src="app.js" defer></script>\n</head>'
        }
      ],
      accessibilityBestPracticesSteps: [
        {
          title: 'Accessible HTML Basics',
          explanation: 'Use meaningful native elements, clear structure, and text alternatives so people can understand and operate the page in different ways. Accessibility is part of the page from the start, not an extra visual feature.',
          example: '<main>\n  <h1>Contact the garden team</h1>\n  <a href="mailto:hello@example.com">Email us</a>\n  <button type="button">Show opening hours</button>\n</main>'
        },
        {
          title: 'Images and Alternative Text',
          explanation: 'Give informative images concise alt text that communicates their relevant information. Use an empty alt value for decorative images, and provide captions or transcripts for media when needed.',
          example: '<img src="garden-map.png" alt="Map showing the garden entrance and accessible path">\n<img src="leaf-decoration.svg" alt="">'
        },
        {
          title: 'Proper Labels and Form Accessibility',
          explanation: 'Give every control a persistent, programmatic label by matching a label’s for attribute with the control’s unique id, or by wrapping the control inside the label. Group related controls with fieldset and legend, and associate helpful instructions with the control.',
          example: '<label for="email">Email address</label>\n<input id="email" name="email" type="email" aria-describedby="email-help" required>\n<p id="email-help">We will use this to reply.</p>'
        },
        {
          title: 'ARIA Basics and When to Use ARIA',
          explanation: 'Prefer native HTML elements because they already expose roles and behaviors. Add ARIA only when native HTML cannot express the needed accessible name or state, and ensure custom interactive widgets also implement keyboard behavior.',
          example: '<button type="button" aria-expanded="false" aria-controls="details">\n  Show details\n</button>\n<div id="details" hidden>More information</div>'
        },
        {
          title: 'HTML Entities, Symbols and Special Characters',
          explanation: 'Use character references to display reserved markup characters as text or to include symbols that are not easy to type. For example, &lt; displays a less-than sign, &amp; displays an ampersand, and numeric references can represent Unicode characters.',
          example: '<p>Use &lt;section&gt; to mark a section.</p>\n<p>Research &amp; design</p>\n<p>&copy; 2026 Garden Journal</p>'
        },
        {
          title: 'HTML Validation and Common Mistakes',
          explanation: 'Validate markup to catch issues such as missing required attributes, duplicate ids, incorrect nesting, or unclosed elements. Then test with a keyboard and assistive technology where available; automated validation cannot determine whether content is understandable.',
          example: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Garden access guide</title>\n</head>\n<body>\n  <main><h1>Garden access guide</h1></main>\n</body>\n</html>'
        }
      ],
      advancedHtmlFeaturesSteps: [
        {
          title: 'SVG in HTML',
          explanation: 'SVG describes vector graphics that stay crisp at different sizes. Inline SVG can be styled and scripted; give meaningful graphics an accessible name, while decorative SVG can be hidden from assistive technology.',
          example: '<svg viewBox="0 0 100 100" role="img" aria-labelledby="icon-title">\n  <title id="icon-title">A green leaf</title>\n  <circle cx="50" cy="50" r="40" fill="green"></circle>\n</svg>'
        },
        {
          title: 'Canvas Basics',
          explanation: 'The canvas element provides a bitmap drawing surface that JavaScript can update. Include fallback content for unsupported contexts and provide equivalent accessible information because drawn pixels are not automatically exposed as semantic content.',
          example: '<canvas id="chart" width="300" height="150">\n  A chart showing monthly garden harvest totals.\n</canvas>'
        },
        {
          title: '<details> and <summary>',
          explanation: 'The details element creates a native disclosure that users can expand and collapse. Its first summary child provides the visible label and built-in interaction.',
          example: '<details>\n  <summary>What is HTML?</summary>\n  <p>HTML describes the structure and meaning of web content.</p>\n</details>'
        },
        {
          title: '<dialog> Element',
          explanation: 'The dialog element represents a dialog box. JavaScript can open it modally with showModal(); provide an accessible name, a clear way to close it, and appropriate focus management.',
          example: '<dialog id="notice" aria-labelledby="notice-title">\n  <h2 id="notice-title">Saved</h2>\n  <p>Your changes have been saved.</p>\n  <form method="dialog"><button>Close</button></form>\n</dialog>'
        },
        {
          title: 'Native Drag and Drop',
          explanation: 'The Drag and Drop API can transfer data during drag operations. Make draggable content identifiable, handle drag and drop events carefully, and provide keyboard-accessible controls because dragging alone is not accessible to everyone.',
          example: '<div draggable="true" id="item">Garden plan</div>\n<div id="drop-zone">Drop plan here</div>\n\n<!-- Add keyboard-accessible alternatives for moving the item. -->'
        },
        {
          title: 'HTML Web Storage Concepts',
          explanation: 'Web Storage provides localStorage for data that persists across browser sessions and sessionStorage for data scoped to a tab session. Store only suitable non-sensitive data, handle unavailable storage, and remember that client-side data can be read or changed by users.',
          example: 'localStorage.setItem("theme", "dark");\nconst theme = localStorage.getItem("theme");\n\nsessionStorage.setItem("draft-step", "2");'
        }
      ],
      htmlPracticeProjectsSteps: [
        {
          title: 'First Personal Webpage',
          explanation: 'Create a first page with a valid document structure, a descriptive title, one main heading, and a few paragraphs. Save it as index.html and open it in a browser to check how the browser renders your markup.',
          example: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My First Webpage</title>\n</head>\n<body>\n  <main>\n    <h1>Welcome to My Webpage</h1>\n    <p>My name is Alex.</p>\n    <p>I am learning how to build websites with HTML.</p>\n  </main>\n</body>\n</html>'
        },
        {
          title: 'Student Profile Page',
          explanation: 'Build a student profile with an introduction, subjects, interests, and contact information. Use semantic sections and lists, descriptive link text, and appropriate alternative text if you include a profile image.',
          example: '<main>\n  <h1>Student Profile: Asha</h1>\n  <section>\n    <h2>About Me</h2>\n    <p>I enjoy science and learning web development.</p>\n  </section>\n  <section>\n    <h2>Favorite Subjects</h2>\n    <ul><li>Science</li><li>Art</li></ul>\n  </section>\n  <p><a href="mailto:asha@example.com">Email Asha</a></p>\n</main>'
        },
        {
          title: 'Timetable and Marks Table',
          explanation: 'Use a table when information is genuinely tabular. Add a caption, column headings, and row headings so the schedule or marks can be understood. Keep table cells in a consistent row and column structure.',
          example: '<table>\n  <caption>Class 8 weekly timetable</caption>\n  <thead>\n    <tr><th scope="col">Day</th><th scope="col">First period</th><th scope="col">Second period</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">Monday</th><td>Math</td><td>Science</td></tr>\n    <tr><th scope="row">Tuesday</th><td>English</td><td>Art</td></tr>\n  </tbody>\n</table>\n\n<table>\n  <caption>Student marks</caption>\n  <tr><th scope="col">Subject</th><th scope="col">Marks</th></tr>\n  <tr><th scope="row">Math</th><td>92</td></tr>\n</table>'
        },
        {
          title: 'Registration Form',
          explanation: 'Create a registration form with properly associated labels, suitable input types, required fields, and a submit button. Browser validation helps users, but real submitted data must also be validated and handled securely on the server.',
          example: '<form action="/register" method="post">\n  <label for="full-name">Full name</label>\n  <input id="full-name" name="fullName" autocomplete="name" required>\n\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" autocomplete="email" required>\n\n  <label for="password">Password</label>\n  <input id="password" name="password" type="password" minlength="8" required>\n\n  <button type="submit">Register</button>\n</form>'
        },
        {
          title: 'Personal Portfolio Structure',
          explanation: 'Plan a portfolio page with a clear introduction, projects, skills, and contact details. Use semantic landmarks and headings, descriptive links to project pages, and meaningful alt text for informative images.',
          example: '<header>\n  <h1>Jordan Lee</h1>\n  <p>Student and beginner web developer</p>\n</header>\n<nav aria-label="Main navigation">\n  <a href="#projects">Projects</a>\n  <a href="#contact">Contact</a>\n</nav>\n<main>\n  <section id="projects">\n    <h2>Projects</h2>\n    <article>\n      <h3>Student Profile</h3>\n      <p>A profile page built with semantic HTML.</p>\n      <a href="profile.html">View the student profile project</a>\n    </article>\n  </section>\n  <section id="contact"><h2>Contact</h2><a href="mailto:jordan@example.com">Email me</a></section>\n</main>\n<footer><p>Portfolio of Jordan Lee</p></footer>'
        }
      ]
    },
    css: {
      title: 'CSS learning path',
      levels: [
        ['CSS Fundamentals', 'Learn the basics of CSS syntax, selectors, properties, and how styles change how a page looks.', 'Write a rule that changes the color of a heading or paragraph.'],
        ['CSS Selectors', 'Target elements by tag, class, ID, and more advanced selector patterns to style the right content.', 'Apply a class selector and an element selector to different parts of a page.'],
        ['Colors and Backgrounds', 'Choose readable text colors and background colors, then use simple patterns or images to improve visual hierarchy.', 'Style a heading and a section background with contrasting colors.'],
        ['Text and Typography', 'Choose readable fonts, sizes, weights, spacing, and alignment so text is easy to scan and understand.', 'Style a heading and paragraph with a comfortable reading rhythm.'],
        ['CSS Box Model', 'Understand content, padding, border, margin, and box-sizing so layout sizing stays predictable.', 'Add padding and margin to a card while keeping its total width steady.'],
        ['Display and Visibility', 'Control how elements flow, whether they are hidden, and how layout responds when content is shown or removed.', 'Hide a message with CSS while keeping the page layout stable.'],
        ['CSS Positioning', 'Control where elements sit on the page using static, relative, absolute, fixed, and sticky positioning with careful stacking behavior.', 'Place a badge in the corner of a card without breaking the surrounding layout.'],
        ['Flexbox Layout', 'Use Flexbox to align and distribute items in rows or columns while building responsive UI patterns.', 'Create a nav bar or card row with centered items and spacing.'],
        ['CSS Grid', 'Use CSS Grid to build two-dimensional layouts with rows, columns, and precise placement for pages and components.', 'Create a two-column card section with a content list and an image tile.'],
        ['Responsive Web Design', 'Design pages that adapt to different screen sizes using flexible layout patterns, media queries, and readable proportions.', 'Turn a multi-column layout into a single-column mobile layout using media queries.'],
        ['Borders, Shadows and UI Styling', 'Use borders, shadows, radius, and subtle surface treatments to build clean UI components that feel polished and readable.', 'Style a card with a border, rounded corners, and a soft shadow.'],
        ['Transitions and Animations', 'Use motion thoughtfully to communicate state changes, feedback, and emphasis without distracting the user.', 'Add a smooth hover transition to a button or card.'],
        ['Advanced CSS Concepts', 'Go beyond the basics with cascade logic, inheritance, custom properties, functions, selectors, and layering for more maintainable CSS.', 'Use a custom property and a clamp() value to build a flexible heading or card layout.'],
        ['CSS Best Practices', 'Write maintainable, accessible, and scalable CSS by organizing rules, keeping selectors clear, and checking design decisions against real user needs.', 'Refactor repeated styles into a consistent rule structure and improve readability.'],
        ['CSS Practical Projects', 'Apply CSS in complete mini-projects that combine layout, colors, typography, responsiveness, and polish into a real interface.', 'Build a small landing page or product card section using the CSS techniques learned so far.']
      ],
      examples: [
        'h1 {\n  color: navy;\n}\n\np {\n  font-size: 1rem;\n}',
        '.card {\n  border: 1px solid #ddd;\n}\n#hero {\n  background: #f5f5f5;\n}',
        'body {\n  background: linear-gradient(#f8fafc, #e2e8f0);\n  color: #0f172a;\n}',
        'body {\n  font-family: "Segoe UI", sans-serif;\n  line-height: 1.6;\n}\nh1 {\n  font-size: 2rem;\n  font-weight: 700;\n}',
        '.card {\n  width: 280px;\n  padding: 1rem;\n  border: 1px solid #cbd5e1;\n  margin: 1rem auto;\n  box-sizing: border-box;\n}',
        '.message {\n  display: none;\n}\n.inline-tag {\n  display: inline-block;\n  padding: 0.2rem 0.5rem;\n}',
        '.badge {\n  position: absolute;\n  top: 0.75rem;\n  right: 0.75rem;\n}\n.card {\n  position: relative;\n}',
        '.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}',
        '.grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}',
        '.layout {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n@media (min-width: 768px) {\n  .layout {\n    grid-template-columns: 2fr 1fr;\n  }\n}',
        '.card {\n  border: 1px solid #dbe2ea;\n  border-radius: 12px;\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n}',
        '<link rel="stylesheet" href="styles.css">',
        '.notice { color: darkred; }\n#main { max-width: 60rem; }\ninput[type="email"] { width: 100%; }',
        'p { color: slateblue; }\n.article p { color: darkslategray; }',
        'body { color: #243047; background-color: #f7f8fb; }',
        'body { font-family: system-ui, sans-serif; line-height: 1.6; }\nh1 { font-size: 2rem; }',
        '.page { width: min(100%, 60rem); margin-inline: auto; gap: max(0.5rem, calc(1vw + 0.25rem)); }\n.page-title { font-size: clamp(1.5rem, 4vw, 3rem); }',
        '.card { box-sizing: border-box; padding: 1rem; border: 1px solid #ddd; margin: 1rem; }',
        '.card { border: 1px solid #ddd; border-radius: 0.75rem; box-shadow: 0 2px 8px #0001; }',
        '.badge { display: inline-block; padding: 0.25rem 0.5rem; }\n.panel { overflow: auto; }',
        '.navigation { display: flex; align-items: center; gap: 1rem; }',
        '.cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }',
        '.card { position: relative; }\n.card__badge { position: absolute; top: 0.5rem; right: 0.5rem; }',
        '.cards { display: grid; grid-template-columns: repeat(2, 1fr); }\n@media (max-width: 40rem) { .cards { grid-template-columns: 1fr; } }',
        'a:hover { color: rebeccapurple; }\na:focus-visible { outline: 2px solid currentColor; }\n.note::before { content: "Note: "; }',
        '.button { transition: transform 160ms ease; }\n.button:hover { transform: translateY(-2px); }',
        ':root { --color-accent: #6941c6; }\n.link { color: var(--color-accent); }',
        ':root { --space: 1rem; }\n.card { padding: var(--space); }\n.button { margin-top: var(--space); }',
        '@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; }\n}',
        'input:focus-visible { outline: 2px solid #6941c6; outline-offset: 2px; }\ninput:invalid { border-color: firebrick; }',
        '/* Inspect the computed value and the rule that wins in DevTools. */\n.card { width: min(100%, 40rem); }',
        '.thumbnail { aspect-ratio: 16 / 9; object-fit: cover; }',
        '.card-list { display: grid; grid-template-columns: 1fr; }\n@container (min-width: 32rem) { .card-list { grid-template-columns: 1fr 1fr; } }',
        '.layout { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }\n@media (max-width: 40rem) { .layout { grid-template-columns: 1fr; } }',
        '/* SCSS source */\n$accent: rebeccapurple;\n.button { color: $accent; }',
        '.shape { clip-path: polygon(50% 0, 100% 100%, 0 100%); }',
        '/* Follow the conventions already used in the project. */\n.card {}\n@media print { nav { display: none; } }',
        '.button {\n  transition: transform 200ms ease;\n}\n.button:hover {\n  transform: translateY(-2px) scale(1.01);\n}',
        '.hero-title {\n  font-size: clamp(2rem, 4vw, 4rem);\n  color: var(--accent);\n}\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.04); }\n}',
        '.card {\n  padding: 1rem;\n  border-radius: 0.75rem;\n}\n.card__title { font-weight: 700; }\n@media (max-width: 600px) { .card { padding: 0.75rem; } }',
        '.hero { padding: clamp(1rem, 4vw, 3rem); }\n.feature-grid { display: grid; gap: 1rem; }\n@media (min-width: 700px) { .feature-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }'
      ],
      cssFundamentalsSteps: [
        {
          title: 'Introduction to CSS',
          explanation: 'CSS (Cascading Style Sheets) is the language that controls the look of a web page. It lets you set colors, spacing, layout, and typography without changing the page structure.',
          example: 'h1 {\n  color: navy;\n}\np {\n  line-height: 1.6;\n}'
        },
        {
          title: 'What Is CSS and Why Is It Used?',
          explanation: 'CSS separates presentation from content. It helps designers keep pages consistent, improve readability, and adjust visual styles for different screen sizes or devices.',
          example: 'body {\n  font-family: sans-serif;\n  color: #222;\n}'
        },
        {
          title: 'How CSS Works with HTML',
          explanation: 'HTML gives a page its structure, while CSS tells the browser how each part should look. A selector identifies the HTML element, and a declaration block defines the styles to apply.',
          example: '<h1>Welcome</h1>\n\nh1 {\n  color: darkgreen;\n}'
        },
        {
          title: 'Inline, Internal and External CSS',
          explanation: 'You can add CSS inline inside an HTML tag, inside a style element in the head, or in an external stylesheet file. External CSS is usually the most maintainable option for larger projects.',
          example: '<p style="color: blue;">Inline style</p>\n<style>p { color: red; }</style>\n<link rel="stylesheet" href="styles.css">'
        },
        {
          title: 'CSS Syntax: Selectors and Declarations',
          explanation: 'A CSS rule starts with a selector and then a block of declarations. Each declaration has a property and a value, separated by a colon and ending with a semicolon.',
          example: 'h2 {\n  color: #1f2937;\n  font-size: 2rem;\n}'
        },
        {
          title: 'CSS Properties and Values',
          explanation: 'Properties describe the style you want to change, such as color, font-size, margin, or border. Values are the settings assigned to those properties, such as hex colors or pixel sizes.',
          example: 'button {\n  background-color: #6941c6;\n  padding: 0.75rem 1.25rem;\n}'
        },
        {
          title: 'CSS Comments',
          explanation: 'Comments help explain sections of CSS without affecting the page. They are useful for documenting what a rule does or why a style is there.',
          example: '/* This rule makes headings stand out */\nh1 {\n  color: teal;\n}'
        },
        {
          title: 'Writing Your First CSS Program',
          explanation: 'A simple CSS program can style a heading, paragraph, and button. Start with clear selectors and a few declarations to build confidence before adding more complex layout rules.',
          example: 'body {\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #0d9488;\n}\n\np {\n  color: #374151;\n}'
        }
      ],
      cssSelectorsSteps: [
        {
          title: 'Universal Selector *',
          explanation: 'The universal selector * matches every element in the document. It is useful for resetting margins, padding, or box-sizing across a page, but it is broad so it should be used carefully.',
          example: '* {\n  box-sizing: border-box;\n  margin: 0;\n}'
        },
        {
          title: 'Element Selector',
          explanation: 'An element selector targets all matching HTML tags in the document. It is useful when you want a consistent style across many elements of the same kind.',
          example: 'p {\n  color: #374151;\n}\nh1 {\n  font-weight: 700;\n}'
        },
        {
          title: 'Class Selector .class',
          explanation: 'A class selector begins with a dot and matches any element with that class name. Use classes to style groups of elements while keeping other elements unchanged.',
          example: '.warning {\n  color: firebrick;\n  font-weight: bold;\n}'
        },
        {
          title: 'ID Selector #id',
          explanation: 'An ID selector begins with a hash and targets one unique element on the page. IDs should be unique, so they are best used when one specific element needs a special style.',
          example: '#hero {\n  background: #f3f4f6;\n  padding: 2rem;\n}'
        },
        {
          title: 'Grouping Selectors',
          explanation: 'You can apply the same declarations to multiple selectors by separating them with commas. This keeps CSS shorter and easier to maintain.',
          example: 'h1, h2, h3 {\n  color: navy;\n  margin-bottom: 0.5rem;\n}'
        },
        {
          title: 'Descendant and Child Selectors',
          explanation: 'Descendant selectors match elements nested anywhere inside another element, while child selectors match only direct children. These patterns help apply styles to specific parts of a layout.',
          example: '.nav a {\n  color: #2563eb;\n}\n.card > .title {\n  font-weight: 600;\n}'
        },
        {
          title: 'Attribute Selectors',
          explanation: 'Attribute selectors target elements that match a specific attribute or attribute value. They are useful when you want to style things like email fields, links with a target, or custom data attributes.',
          example: 'input[type="email"] {\n  border: 1px solid #cbd5e1;\n}\na[href^="https"] {\n  color: #0f766e;\n}'
        },
        {
          title: 'Pseudo-classes: :hover, :focus, :first-child',
          explanation: 'Pseudo-classes allow styling based on an element’s state or position in the document. For example, :hover for pointer hover, :focus for keyboard focus, and :first-child for the first child in a parent.',
          example: 'button:hover {\n  background: #4f46e5;\n}\ninput:focus {\n  outline: 2px solid #2563eb;\n}\nli:first-child {\n  font-weight: bold;\n}'
        },
        {
          title: 'Pseudo-elements: ::before, ::after, ::first-letter',
          explanation: 'Pseudo-elements style specific parts of an element rather than the whole element. Use ::before and ::after to add decorative text or icons, and ::first-letter to style the first letter of a paragraph.',
          example: '.note::before {\n  content: "Note: ";\n  font-weight: bold;\n}\n.quote::first-letter {\n  font-size: 2rem;\n  color: #7c3aed;\n}'
        }
      ],
      colorsBackgroundsSteps: [
        {
          title: 'Named Colors',
          explanation: 'CSS supports named colors such as red, blue, green, and navy. Named values are easy to read and useful for quick prototypes, but they are less precise than numeric color systems.',
          example: 'h1 {\n  color: navy;\n}\nbody {\n  background-color: lightgray;\n}'
        },
        {
          title: 'HEX Color Codes',
          explanation: 'HEX colors use a six-digit value such as #3b82f6 or a shorthand three-digit version such as #0af. They are common in web design because they are compact and precise.',
          example: '.button {\n  background-color: #3b82f6;\n  color: #ffffff;\n}'
        },
        {
          title: 'RGB and RGBA',
          explanation: 'RGB uses red, green, and blue channel values, and RGBA adds an alpha channel for transparency. This makes it easy to control exact colors and opacity.',
          example: '.card {\n  background: rgba(15, 23, 42, 0.8);\n  color: rgb(255, 255, 255);\n}'
        },
        {
          title: 'HSL and HSLA',
          explanation: 'HSL describes a color using hue, saturation, and lightness. HSLA adds an alpha channel, which helps create soft overlays and transparent effects.',
          example: '.badge {\n  background: hsl(210, 100%, 50%);\n  color: hsla(0, 0%, 100%, 0.95);\n}'
        },
        {
          title: 'background-color',
          explanation: 'The background-color property fills the background of an element with a solid color. Use it carefully so text remains readable and sections are visually distinct.',
          example: 'section {\n  background-color: #f8fafc;\n  color: #0f172a;\n}'
        },
        {
          title: 'Background Images',
          explanation: 'Background images can add texture, branding, or visual interest to a section. Remember that text should remain readable and the image should not overpower the content.',
          example: '.hero {\n  background-image: url("images/cover.jpg");\n  background-size: cover;\n}'
        },
        {
          title: 'Background Position, Size and Repeat',
          explanation: 'Use background-position to place an image, background-size to control scaling, and background-repeat to decide whether the image repeats. These properties help build polished backgrounds without awkward tiling.',
          example: '.banner {\n  background-image: url("pattern.svg");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n}'
        },
        {
          title: 'Gradients and Background Shorthand',
          explanation: 'Linear and radial gradients create smooth color transitions without needing an image file. The background shorthand can combine color, image, repeat, and position in one declaration for cleaner code.',
          example: 'body {\n  background: linear-gradient(135deg, #dbeafe, #eff6ff);\n}\n.card {\n  background: #fff url("texture.png") center/cover no-repeat;\n}'
        }
      ],
      textTypographySteps: [
        {
          title: 'font-family',
          explanation: 'The font-family property chooses which typeface is used for text. Use system fonts for speed and fallbacks for compatibility, and choose a family that matches the page’s tone and readability goals.',
          example: 'body {\n  font-family: "Segoe UI", Tahoma, sans-serif;\n}\nh1 {\n  font-family: Georgia, serif;\n}'
        },
        {
          title: 'font-size',
          explanation: 'Font size controls how large the letters are on screen. Use a clear hierarchy with larger sizes for headings and smaller sizes for body text, while keeping the reading area comfortable.',
          example: 'body {\n  font-size: 1rem;\n}\nh2 {\n  font-size: 1.5rem;\n}'
        },
        {
          title: 'font-weight and font-style',
          explanation: 'font-weight adjusts emphasis, and font-style can make text italic. Use these properties to create hierarchy without relying on color or size alone.',
          example: 'strong {\n  font-weight: 700;\n}\nem {\n  font-style: italic;\n}'
        },
        {
          title: 'color and text-align',
          explanation: 'color changes the text paint, and text-align controls whether text sits left, center, or right. These basic properties support readability and visual rhythm across a page.',
          example: 'p {\n  color: #1f2937;\n  text-align: justify;\n}\nh1 {\n  text-align: center;\n}'
        },
        {
          title: 'text-decoration and text-transform',
          explanation: 'text-decoration can underline or strike text, while text-transform controls uppercase, lowercase, or capitalized text. Use them carefully for emphasis and labels, not for all-caps paragraphs.',
          example: 'a {\n  text-decoration: none;\n}\n.logo {\n  text-transform: uppercase;\n}'
        },
        {
          title: 'line-height',
          explanation: 'line-height sets the spacing between lines of text. A comfortable line-height improves readability and helps body text feel less cramped, especially on long paragraphs.',
          example: 'p {\n  line-height: 1.7;\n}\n.card {\n  line-height: 1.5;\n}'
        },
        {
          title: 'letter-spacing and word-spacing',
          explanation: 'letter-spacing adjusts spacing between letters, while word-spacing affects spacing between words. These are useful for small design adjustments but should be used sparingly.',
          example: 'h1 {\n  letter-spacing: 0.08em;\n}\n.tag {\n  word-spacing: 0.2em;\n}'
        },
        {
          title: 'Web Fonts and @font-face Basics',
          explanation: 'Web fonts let you use custom typefaces from a server or service. The @font-face rule defines the font file and family name, and you should keep performance in mind when choosing a font package.',
          example: '@font-face {\n  font-family: "Brand Serif";\n  src: url("fonts/brand-serif.woff2") format("woff2");\n}\nbody {\n  font-family: "Brand Serif", serif;\n}'
        }
      ],
      cssBoxModelSteps: [
        {
          title: 'Understanding the Box Model',
          explanation: 'Every HTML element is a rectangular box with content, padding, border, and margin. Understanding this model helps you predict spacing and layout behavior.',
          example: '.card {\n  width: 240px;\n  padding: 16px;\n  border: 1px solid #ddd;\n  margin: 12px;\n}'
        },
        {
          title: 'width and height',
          explanation: 'The width and height properties set the size of an element’s content box. These values control the visible size of the box unless box-sizing alters the sizing model.',
          example: '.button {\n  width: 160px;\n  height: 48px;\n}'
        },
        {
          title: 'min-width, max-width, min-height, max-height',
          explanation: 'Minimum and maximum size constraints help content adapt without overflowing or becoming too small. These are especially useful for flexible layouts and responsive components.',
          example: '.card {\n  min-width: 200px;\n  max-width: 480px;\n  min-height: 120px;\n}'
        },
        {
          title: 'Padding',
          explanation: 'Padding adds space inside an element, between its content and its border. It helps keep text away from edges and creates breathing room inside cards or buttons.',
          example: '.card {\n  padding: 1rem;\n  background: #f8fafc;\n}'
        },
        {
          title: 'Border and Border Radius',
          explanation: 'Borders add a visible outline around an element, and border-radius rounds the corners. These properties help separate sections and soften interface shapes.',
          example: '.panel {\n  border: 1px solid #cbd5e1;\n  border-radius: 12px;\n}'
        },
        {
          title: 'Margin and Auto Margins',
          explanation: 'Margin creates space outside an element, separating it from nearby content. Auto margins can center block elements horizontally when the width is fixed and the parent has a width.',
          example: '.card {\n  width: 300px;\n  margin: 0 auto;\n}'
        },
        {
          title: 'box-sizing: border-box',
          explanation: 'With box-sizing: border-box, the width and height include padding and border. This makes sizing more predictable and reduces layout surprises when designing cards and forms.',
          example: '.card {\n  box-sizing: border-box;\n  width: 280px;\n  padding: 16px;\n}'
        }
      ],
      displayVisibilitySteps: [
        {
          title: 'display: block',
          explanation: 'A block-level element starts on a new line and takes the full available width. This is the default for elements such as div, p, h1, and section.',
          example: 'p {\n  display: block;\n}\n.card {\n  display: block;\n  width: 100%;\n}'
        },
        {
          title: 'display: inline',
          explanation: 'Inline elements flow with surrounding text and do not start on a new line. They do not accept width or height values the same way block elements do.',
          example: 'span {\n  display: inline;\n  color: #2563eb;\n}'
        },
        {
          title: 'display: inline-block',
          explanation: 'Inline-block keeps inline flow while allowing width, height, padding, and margin. It is useful for buttons, badges, and small components that need layout control.',
          example: '.tag {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 999px;\n}'
        },
        {
          title: 'display: none',
          explanation: 'display: none removes the element from the layout completely, so it takes no space and is not rendered. Use it for optional content that should not appear at all.',
          example: '.hidden-message {\n  display: none;\n}'
        },
        {
          title: 'visibility and opacity',
          explanation: 'visibility: hidden hides an element while leaving its layout space intact, whereas opacity: 0 keeps the element in the layout but makes it transparent. These are useful when you want a visual fade or a temporary hide effect.',
          example: '.toast {\n  visibility: hidden;\n}\n.card {\n  opacity: 0.4;\n}'
        },
        {
          title: 'overflow: hidden, auto, scroll',
          explanation: 'The overflow property controls what happens when an element’s content is larger than its box. hidden clips content, auto adds scrollbars only when needed, and scroll always shows them.',
          example: '.panel {\n  overflow: auto;\n  max-height: 200px;\n}\n.image-box {\n  overflow: hidden;\n}'
        }
      ],
      cssPositioningSteps: [
        {
          title: 'Understanding CSS Positioning',
          explanation: 'Positioning lets you control where an element sits in relation to normal document flow. Each positioning mode changes how the element is placed and how it interacts with surrounding content.',
          example: '.card {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 0.5rem;\n  right: 0.5rem;\n}'
        },
        {
          title: 'static',
          explanation: 'static is the default positioning value. Elements stay in normal document flow, and no special offset is applied unless you switch to a different position value.',
          example: 'p {\n  position: static;\n}'
        },
        {
          title: 'relative',
          explanation: 'relative positioning keeps the element in the normal flow, but lets you shift it from its original spot using top, right, bottom, or left. It is often used as a positioning context for children.',
          example: '.note {\n  position: relative;\n  left: 8px;\n  top: 4px;\n}'
        },
        {
          title: 'absolute',
          explanation: 'absolute positioning removes the element from normal flow and positions it relative to the nearest positioned ancestor or the page. It is useful for badges, overlays, and labels.',
          example: '.menu-item {\n  position: absolute;\n  top: 0;\n  right: 0;\n}'
        },
        {
          title: 'top, right, bottom, left',
          explanation: 'The top, right, bottom, and left properties offset a positioned element from its reference box. These properties work together with the positioning mode to control alignment and spacing precisely.',
          example: '.badge {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  bottom: auto;\n  left: auto;\n}'
        },
        {
          title: 'fixed',
          explanation: 'fixed positioning anchors an element to the viewport, so it stays in the same place while the page scrolls. This is commonly used for sticky headers or floating action buttons.',
          example: '.topbar {\n  position: fixed;\n  top: 0;\n  width: 100%;\n}'
        },
        {
          title: 'sticky',
          explanation: 'sticky positioning is a hybrid of relative and fixed positioning. The element behaves normally until it reaches a defined scroll threshold, then it sticks in place.',
          example: '.sidebar {\n  position: sticky;\n  top: 1rem;\n}'
        },
        {
          title: 'z-index and stacking context',
          explanation: 'z-index controls the stacking order of positioned elements. Higher values are drawn in front of lower values, but stacking rules depend on the element’s stacking context and position.',
          example: '.modal {\n  position: fixed;\n  z-index: 20;\n}\n.header {\n  z-index: 10;\n}'
        }
      ],
      flexboxLayoutSteps: [
        {
          title: 'Introduction to Flexbox',
          explanation: 'Flexbox is a one-dimensional layout system that arranges items in rows or columns with less manual positioning. It is ideal for navigation bars, cards, and alignment patterns.',
          example: '.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}'
        },
        {
          title: 'Flex Container and Flex Items',
          explanation: 'A flex container is the parent element with display: flex; its direct children become flex items. The container manages layout while each item can respond to spacing and sizing rules.',
          example: '.row {\n  display: flex;\n}\n.row > .item {\n  flex: 1;\n}'
        },
        {
          title: 'flex-direction',
          explanation: 'flex-direction sets the main axis of a flex container. Use row for horizontal layout and column for vertical stacking, with reverse values when needed.',
          example: '.menu {\n  display: flex;\n  flex-direction: column;\n}'
        },
        {
          title: 'justify-content',
          explanation: 'justify-content distributes flex items along the main axis. Use values like center, space-between, space-around, and flex-end to shape the layout.',
          example: '.toolbar {\n  display: flex;\n  justify-content: space-between;\n}'
        },
        {
          title: 'align-items and align-content',
          explanation: 'align-items controls cross-axis alignment for items in a single line, while align-content handles alignment across multiple lines. These properties help create balanced vertical layouts.',
          example: '.row {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  align-content: space-between;\n}'
        },
        {
          title: 'flex-wrap and gap',
          explanation: 'flex-wrap allows items to move to new lines when space is limited, and gap adds space between items without extra margins. Together they make responsive layouts cleaner.',
          example: '.tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}'
        },
        {
          title: 'flex-grow, flex-shrink and flex-basis',
          explanation: 'These properties control how flex items grow, shrink, and size themselves within the layout. They are essential when building flexible components that adapt to screen sizes.',
          example: '.card {\n  flex: 1 1 220px;\n}\n.sidebar {\n  flex: 0 0 240px;\n}'
        },
        {
          title: 'align-self and order',
          explanation: 'align-self overrides alignment for one item, while order changes the visual order of flex items without editing the markup. Use these carefully to fine-tune layout behavior.',
          example: '.feature {\n  align-self: flex-start;\n}\n.primary {\n  order: 1;\n}\n.secondary {\n  order: 2;\n}'
        }
      ],
      cssGridSteps: [
        {
          title: 'Introduction to CSS Grid',
          explanation: 'CSS Grid is a two-dimensional layout system for arranging items into rows and columns. It is useful when you need precise placement, alignment, and responsive page layouts.',
          example: '.grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}'
        },
        {
          title: 'Grid Container and Grid Items',
          explanation: 'The grid container is the parent element with display: grid. Its direct children become grid items and can be placed anywhere in the grid using row and column positions.',
          example: '.layout {\n  display: grid;\n}\n.layout > .card {\n  background: #f8fafc;\n}'
        },
        {
          title: 'grid-template-columns and grid-template-rows',
          explanation: 'These properties define the size of columns and rows in the grid. They let you build layouts like two-column dashboards, product galleries, or centered content areas.',
          example: '.gallery {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  grid-template-rows: auto 1fr;\n}'
        },
        {
          title: 'gap, row-gap and column-gap',
          explanation: 'The gap property adds space between grid cells. row-gap and column-gap let you control vertical and horizontal spacing separately when a design needs more precision.',
          example: '.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  row-gap: 1.5rem;\n}'
        },
        {
          title: 'grid-column and grid-row',
          explanation: 'grid-column and grid-row control where a grid item starts and ends. This makes it easy to place content across multiple tracks without changing the markup structure.',
          example: '.feature {\n  grid-column: 1 / 3;\n  grid-row: 1;\n}'
        },
        {
          title: 'repeat() and minmax()',
          explanation: 'repeat() creates repeated column or row patterns, while minmax() allows each track to shrink or grow within a defined range. Together they simplify responsive, flexible grid definitions.',
          example: '.layout {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}'
        },
        {
          title: 'auto-fit, auto-fill and fr',
          explanation: 'auto-fit and auto-fill help create responsive grids that adapt to available space, while fr represents a flexible fraction of the remaining space. These are essential for fluid layouts.',
          example: '.portfolio {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}'
        },
        {
          title: 'Responsive Grid Layouts',
          explanation: 'Responsive grids combine media queries and flexible track sizing so layouts can change smoothly across devices. This helps maintain readability and structure on small screens.',
          example: '.dashboard {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n@media (min-width: 768px) {\n  .dashboard {\n    grid-template-columns: 2fr 1fr;\n  }\n}'
        }
      ],
      responsiveWebDesignSteps: [
        {
          title: 'What Is Responsive Design?',
          explanation: 'Responsive design means a website adapts to different devices and screen sizes so content remains readable, accessible, and usable without awkward zooming or horizontal scrolling.',
          example: '.layout {\n  display: grid;\n  gap: 1rem;\n}\n@media (min-width: 768px) {\n  .layout {\n    grid-template-columns: 2fr 1fr;\n  }\n}'
        },
        {
          title: 'Relative Units: %, em, rem',
          explanation: 'Relative units help page elements scale predictably. Percentages are relative to the parent, em is based on the parent font size, and rem is based on the root font size.',
          example: '.container {\n  width: 90%;\n}\n.card {\n  padding: 1.5em;\n  font-size: 1rem;\n}'
        },
        {
          title: 'Viewport Units: vw, vh, dvh',
          explanation: 'Viewport units scale with the browser window, which can be useful for hero sections, full-height layouts, and fluid spacing. dvh is especially helpful when browser UI changes as the page scrolls.',
          example: '.hero {\n  min-height: 60vh;\n}\n.banner {\n  height: 100dvh;\n}'
        },
        {
          title: 'CSS Media Queries',
          explanation: 'Media queries apply different styles at different screen widths or conditions. They are the core mechanism for breakpoints in responsive design.',
          example: '@media (max-width: 640px) {\n  .nav {\n    flex-direction: column;\n  }\n}'
        },
        {
          title: 'Mobile-First Design',
          explanation: 'Mobile-first design starts by styling for the smallest screens and then enhances the layout for larger screens. This prioritizes essential content and makes progressive enhancement easier.',
          example: '.card-list {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n@media (min-width: 720px) {\n  .card-list {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}'
        },
        {
          title: 'Responsive Images and Containers',
          explanation: 'Images and container elements should adapt to the available width without overflowing. max-width: 100% and flexible container widths help maintain structure across devices.',
          example: 'img, video {\n  max-width: 100%;\n  height: auto;\n}\n.container {\n  width: min(100%, 72rem);\n  margin-inline: auto;\n}'
        },
        {
          title: 'Responsive Navigation and Layouts',
          explanation: 'Navigation and page layouts often change at different breakpoints. Stacked mobile navigation, collapsible menus, and multi-column desktop layouts are common responsive patterns.',
          example: '.nav {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n@media (max-width: 600px) {\n  .nav {\n    flex-direction: column;\n  }\n}'
        }
      ],
      uiStylingSteps: [
        {
          title: 'Border Styles and Widths',
          explanation: 'Borders define outlines around an element and help separate sections or controls. You can control width, style, and color to create subtle or prominent boundaries.',
          example: '.card {\n  border: 1px solid #dbe2ea;\n  border-top: 3px solid #2563eb;\n}'
        },
        {
          title: 'border-radius',
          explanation: 'border-radius rounds corners and softens the visual shape of elements. Small radius values create subtle UI cards, while larger values are common for pills and badges.',
          example: '.button {\n  border-radius: 999px;\n}\n.card {\n  border-radius: 12px;\n}'
        },
        {
          title: 'box-shadow',
          explanation: 'box-shadow adds depth and separation without changing layout. It helps UI elements feel elevated and can guide attention toward important cards or panels.',
          example: '.panel {\n  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);\n}'
        },
        {
          title: 'text-shadow',
          explanation: 'text-shadow creates a shadow behind letters for emphasis, such as headings or key callouts. Use it judiciously so text remains readable and elegant.',
          example: '.hero-title {\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);\n}'
        },
        {
          title: 'outline',
          explanation: 'outline creates a visible focus ring or highlight around an element without affecting its box size. It is often used to provide keyboard access cues.',
          example: 'button:focus-visible {\n  outline: 3px solid #93c5fd;\n  outline-offset: 2px;\n}'
        },
        {
          title: 'cursor and user-select',
          explanation: 'cursor changes how the pointer appears on hover, while user-select controls whether users can select text. These details improve usability and interaction clarity.',
          example: 'button {\n  cursor: pointer;\n}\n.label {\n  user-select: none;\n}'
        },
        {
          title: 'Styling Buttons, Cards and Badges',
          explanation: 'Buttons, cards, and badges benefit from consistent border, spacing, radius, and shadow rules. Styling these shared patterns makes the interface feel cohesive and easy to navigate.',
          example: '.badge {\n  display: inline-block;\n  padding: 0.25rem 0.6rem;\n  border-radius: 999px;\n  background: #e0f2fe;\n  color: #075985;\n}\n.card {\n  border: 1px solid #dbe2ea;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);\n}'
        }
      ],
      transitionsAnimationsSteps: [
        {
          title: 'CSS Transforms',
          explanation: 'Transforms change the visual position or shape of an element without altering the document flow. They are useful for subtle hover feedback and motion polish when used carefully.',
          example: '.card:hover {\n  transform: translateY(-4px) scale(1.01);\n}'
        },
        {
          title: 'translate(), rotate() and scale()',
          explanation: 'translate() moves an element, rotate() turns it, and scale() changes its size. These functions are the building blocks of interactive motion and responsive hover states.',
          example: '.badge {\n  transform: translateX(8px) rotate(4deg);\n}\n.logo:hover {\n  transform: scale(1.08);\n}'
        },
        {
          title: 'transition-property and transition-duration',
          explanation: 'transition-property chooses which CSS property animates, while transition-duration controls the time it takes. Together they create smooth state changes that feel deliberate instead of abrupt.',
          example: '.button {\n  transition-property: background-color, transform;\n  transition-duration: 200ms;\n}'
        },
        {
          title: 'transition-timing-function and transition-delay',
          explanation: 'transition-timing-function controls the pacing of the animation, while transition-delay adds a wait before the transition begins. These settings help create natural, readable motion.',
          example: '.card {\n  transition: transform 180ms ease-out 50ms;\n}'
        },
        {
          title: '@keyframes',
          explanation: 'Keyframes define intermediate animation states across time. You can animate transforms, opacity, and color to make an element move or pulse in a controlled way.',
          example: '@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-8px); }\n}\n.card { animation: float 2s ease-in-out infinite; }'
        },
        {
          title: 'Animation Duration, Delay and Iteration',
          explanation: 'animation-duration sets how long the cycle runs, animation-delay waits before starting, and animation-iteration-count determines how many times it repeats. These values shape the timing and rhythm of motion.',
          example: '.alert {\n  animation-name: pulse;\n  animation-duration: 1.5s;\n  animation-delay: 0.2s;\n  animation-iteration-count: infinite;\n}'
        },
        {
          title: 'Hover Effects and Reduced Motion',
          explanation: 'Hover states can provide visual feedback, but motion should remain subtle and purposeful. Respect prefers-reduced-motion so animations are reduced or removed for users who prefer a calmer experience.',
          example: '@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}'
        }
      ],
      advancedCssConceptsSteps: [
        {
          title: 'Specificity and the Cascade',
          explanation: 'The cascade decides which declarations win when several rules target the same element. Specificity, source order, and importance are key parts of that process, so it is important to understand how styles are resolved.',
          example: 'p { color: darkslategray; }\n.article p { color: rebeccapurple; }'
        },
        {
          title: 'Inheritance and Initial Values',
          explanation: 'Some CSS properties inherit values from parent elements, while others start at their initial value unless a rule overrides them. Understanding inheritance helps reduce repetition and keeps styles predictable.',
          example: 'body { color: #1f2937; }\n.card { font-family: inherit; }'
        },
        {
          title: '!important and When to Avoid It',
          explanation: 'The !important flag overrides normal CSS specificity and cascade rules. It can be useful for edge cases, but overusing it makes debugging harder and can create brittle, hard-to-maintain styles.',
          example: '.warning { color: #b91c1c !important; }'
        },
        {
          title: 'CSS Custom Properties (Variables)',
          explanation: 'Custom properties store reusable values like colors, spacing, and type scale in a readable, central place. They make design tokens easier to update across a whole stylesheet.',
          example: ':root {\n  --brand: #4f46e5;\n  --space-md: 1rem;\n}\n.button { color: var(--brand); padding: var(--space-md); }'
        },
        {
          title: 'calc(), min(), max() and clamp()',
          explanation: 'These CSS functions let you create flexible, responsive values by combining lengths and numbers. They are especially useful for spacing, typography, and width calculations that adapt to different screens.',
          example: '.title { font-size: clamp(2rem, 4vw, 3.5rem); }\n.card { width: min(100%, 40rem); }'
        },
        {
          title: ':is(), :where() and :not()',
          explanation: 'Functional pseudo-classes such as :is(), :where(), and :not() let you target more expressive selector groups. They improve readability and help reduce repeated selectors in larger stylesheets.',
          example: ':is(h1, h2, h3):not(.hero-title) { margin-top: 1rem; }'
        },
        {
          title: 'CSS Nesting',
          explanation: 'CSS nesting lets you write selectors in a hierarchical way that mirrors HTML structure. This can improve readability, but the project should choose a nesting style that aligns with browser support and maintainability standards.',
          example: '.card {\n  padding: 1rem;\n  .title { font-weight: 700; }\n}'
        },
        {
          title: 'CSS Layers: @layer',
          explanation: 'CSS layers control the order in which styles are applied, independent of source order. They are useful for organizing base styles, components, and utilities without relying on complex specificity overrides.',
          example: '@layer base, components, utilities;\n@layer components { .card { border: 1px solid #ddd; } }'
        }
      ],
      cssBestPracticesSteps: [
        {
          title: 'Organizing CSS Files',
          explanation: 'A clear CSS file structure makes a stylesheet easier to scan, maintain, and update. Grouping related rules and using predictable sections keeps large projects manageable.',
          example: '/* Base */\nbody { ... }\n\n/* Components */\n.card { ... }\n\n/* Utilities */\n.text-center { ... }'
        },
        {
          title: 'Naming Classes and BEM Basics',
          explanation: 'Consistent class naming reduces confusion and makes selectors easier to reason about. BEM encourages meaningful, reusable names such as card__title or button--primary.',
          example: '.card { ... }\n.card__title { font-weight: 700; }\n.card--featured { border-color: #2563eb; }'
        },
        {
          title: 'Reusable CSS Components',
          explanation: 'Reusable components keep styling consistent across pages and reduce duplication. Components like buttons, cards, alerts, and nav items should be designed to work in more than one place.',
          example: '.button { display: inline-block; padding: 0.75rem 1rem; border-radius: 0.5rem; }'
        },
        {
          title: 'Browser Developer Tools',
          explanation: 'Developer Tools help you inspect styles, test overrides, and debug layout quickly. They provide a fast way to see which rules apply and which ones are being ignored.',
          example: '/* Open DevTools, inspect the element, and check the computed styles panel. */'
        },
        {
          title: 'Debugging CSS Layout Issues',
          explanation: 'Layout bugs often come from unexpected box sizing, collapsing margins, overflow, or positioning issues. A systematic check of the box model and computed styles makes debugging easier.',
          example: '.card { box-sizing: border-box; overflow: hidden; }'
        },
        {
          title: 'Accessibility, Performance and Maintainability',
          explanation: 'Great CSS is not only visually nice; it also remains accessible, performant, and easy to maintain. Favor readable selectors, sufficient contrast, reduced motion support, and minimal redundant code.',
          example: '@media (prefers-reduced-motion: reduce) {\n  * { animation: none; }\n}\nbody { color: #1f2937; }'
        }
      ],
      cssPracticalProjectsSteps: [
        {
          title: 'Personal Profile Card',
          explanation: 'A profile card is a great first CSS project. It combines typography, spacing, colors, and layout while staying small enough to debug quickly.',
          example: '.profile-card { max-width: 20rem; padding: 1.5rem; border-radius: 1rem; background: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }'
        },
        {
          title: 'Stylish Login Form',
          explanation: 'A login form practice project helps you style labels, inputs, buttons, and states like focus, hover, and validation without losing usability.',
          example: 'input { border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.75rem; }\nbutton:hover { transform: translateY(-1px); }'
        },
        {
          title: 'Responsive Navigation Bar',
          explanation: 'Navigation is a common practical CSS exercise because it combines flexbox, spacing, hover states, and responsiveness across screen sizes.',
          example: '.nav { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }\n@media (max-width: 600px) { .nav { flex-direction: column; } }'
        },
        {
          title: 'Product Card Grid',
          explanation: 'A product card grid helps you practice repeated component styling, gap control, responsive columns, and consistent visual rhythm.',
          example: '.products { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }'
        },
        {
          title: 'Responsive Landing Page',
          explanation: 'A landing page project brings together hero layout, sections, typography, buttons, and media queries. It is a strong example of real-world CSS design.',
          example: '.hero { display: grid; gap: 1.5rem; }\n@media (min-width: 720px) { .hero { grid-template-columns: 1.2fr 0.8fr; } }'
        },
        {
          title: 'Dashboard Layout with Grid and Flexbox',
          explanation: 'Dashboard layouts are a practical way to combine CSS Grid for content structure and Flexbox for alignment within panels and toolbars.',
          example: '.dashboard { display: grid; grid-template-columns: 220px 1fr; gap: 1rem; }\n.toolbar { display: flex; justify-content: space-between; align-items: center; }'
        },
        {
          title: 'Complete Responsive Portfolio Website',
          explanation: 'A portfolio website combines everything from color and spacing to responsive layout and component reuse. It is the best capstone for learning practical CSS design.',
          example: 'body { font-family: system-ui, sans-serif; }\n.container { width: min(100%, 72rem); margin-inline: auto; }\n@media (max-width: 640px) { .nav { flex-direction: column; } }'
        }
      ],
      priorities: [
        'must', 'must', 'must', 'must', 'must', 'must', 'must', 'must', 'must', 'must', 'must', 'should', 'must',
        'must', 'must', 'must', 'must', 'must', 'should', 'must', 'should', 'must', 'must',
        'must', 'must', 'must', 'should', 'should', 'project', 'project', 'project'
      ]
    }
  };

  const progressPrefix = 'codespark-roadmap-progress-v4-';
  window.CodeSparkRoadmap = {
    getTrackLevels() {
      return Object.fromEntries(
        Object.entries(tracks).map(([category, track]) => [
          category,
          track.levels.map(([title, description, task]) => ({ title, description, task })),
        ])
      );
    },
  };

  const roadmap = document.getElementById('tutorialRoadmap');
  if (!roadmap) return;
  const tabs = Array.from(document.querySelectorAll('.tutorial-category-btn'));
  const dialog = document.getElementById('roadmapLessonDialog');
  const standardLesson = document.getElementById('roadmapStandardLesson');
  const slidesSection = document.getElementById('roadmapSlides');
  const closeButton = document.getElementById('roadmapLessonClose');
  const lessonLabel = document.getElementById('roadmapLessonLabel');
  const lessonTitle = document.getElementById('roadmapLessonTitle');
  const lessonDescription = document.getElementById('roadmapLessonDescription');
  const lessonTask = document.getElementById('roadmapLessonTask');
  const lessonExample = document.getElementById('roadmapLessonExample');
  const lessonActions = document.getElementById('roadmapLessonActions');
  const startQuizButton = document.getElementById('roadmapStartQuiz');
  const quizSection = document.getElementById('roadmapQuiz');
  const quizForm = document.getElementById('roadmapQuizForm');
  const quizQuestions = document.getElementById('roadmapQuizQuestions');
  const quizFeedback = document.getElementById('roadmapQuizFeedback');
  const retryQuizButton = document.getElementById('roadmapRetryQuiz');
  const backToLessonButton = document.getElementById('roadmapBackToLesson');
  const slideCounter = document.getElementById('roadmapSlideCounter');
  const slideProgress = document.getElementById('roadmapSlideProgress');
  const slideTitle = document.getElementById('roadmapSlideTitle');
  const slideDescription = document.getElementById('roadmapSlideDescription');
  const slideExample = document.getElementById('roadmapSlideExample');
  const slideFeedback = document.getElementById('roadmapSlideFeedback');
  const slideNavigation = document.getElementById('roadmapSlideNavigation');
  const slideBackButton = document.getElementById('roadmapSlideBack');
  const slideNextButton = document.getElementById('roadmapSlideNext');
  const foundationActions = document.getElementById('roadmapSlideCompletion');
  const completeFoundationButton = document.getElementById('roadmapCompleteSlideLesson');
  let activeCategory = 'html';
  let activeLevel = null;
  let activeSlide = 0;
  let nextLevelAfterClose = null;

  function getCompleted(category) {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(progressPrefix + category) || '[]');
    } catch (error) {
      console.error(`Unable to read ${category} roadmap progress.`, error);
      return [];
    }
    if (!Array.isArray(saved)) return [];
    return [...new Set(saved.filter((level) =>
      Number.isInteger(level) && level >= 0 && level < tracks[category].levels.length
    ))].sort((left, right) => left - right);
  }

  function renderTrack() {
    const track = tracks[activeCategory];
    const completed = getCompleted(activeCategory);
    const priorities = track.priorities;
    const requiredIndexes = priorities
      .map((priority, index) => priority === 'project' ? null : index)
      .filter((index) => index !== null);
    const requiredCompleted = requiredIndexes.filter((index) => completed.includes(index)).length;
    const nextRequiredIndex = requiredIndexes.find((index) => !completed.includes(index));
    const heading = document.createElement('div');
    heading.className = 'roadmap-track-heading';

    const title = document.createElement('h3');
    title.textContent = track.title;
    const progress = document.createElement('p');
    progress.textContent = `${requiredCompleted} of ${requiredIndexes.length} core levels complete`;
    heading.append(title, progress);

    const progressBar = document.createElement('progress');
    progressBar.className = 'roadmap-progress';
    progressBar.max = requiredIndexes.length;
    progressBar.value = requiredCompleted;
    progressBar.setAttribute('aria-label', `${requiredCompleted} of ${requiredIndexes.length} core levels complete`);

    const list = document.createElement('ol');
    list.className = 'roadmap-levels';
    track.levels.forEach(([name, description], index) => {
      const isComplete = completed.includes(index);
      const priority = priorities[index];
      const isUnlocked = isComplete ||
        (priority === 'project' && nextRequiredIndex === undefined) ||
        index === nextRequiredIndex;
      const item = document.createElement('li');
      item.className = `roadmap-stop ${index % 2 === 0 ? 'roadmap-stop-left' : 'roadmap-stop-right'}`;
      item.classList.toggle('is-complete', isComplete);
      item.classList.toggle('is-locked', !isUnlocked);
      item.classList.add(`priority-${priority}`);

      const marker = document.createElement('span');
      marker.className = 'roadmap-marker';
      marker.setAttribute('aria-hidden', 'true');
      marker.textContent = isComplete ? '✓' : String(index + 1);

      const button = document.createElement('button');
      button.className = 'roadmap-level-button';
      button.type = 'button';
      const isFoundationItem = activeCategory === 'html' && index === 0;
      button.disabled = !isUnlocked;
      button.setAttribute('aria-label', isFoundationItem ? 'Level 1: HTML Fundamentals, unlocked' : `Level ${index + 1}: ${name}${isComplete ? ', completed' : isUnlocked ? ', unlocked' : ', locked'}`);

      const number = document.createElement('span');
      number.className = 'roadmap-level-number';
      number.textContent = `LEVEL ${String(index + 1).padStart(2, '0')}`;
      const label = document.createElement('strong');
      label.className = 'roadmap-level-name';
      label.textContent = isFoundationItem ? 'HTML Fundamentals' : name;
      const summary = document.createElement('small');
      summary.className = 'roadmap-level-summary';
      summary.textContent = isFoundationItem ? 'Learn the building blocks of a web page' : description;
      const state = document.createElement('span');
      state.className = 'roadmap-level-state';
      state.textContent = isComplete ? 'Completed' : isUnlocked ? 'Start level' : 'Locked';
      const priorityLabel = document.createElement('span');
      priorityLabel.className = 'roadmap-priority-label';
      priorityLabel.textContent = priority === 'must' ? 'Must know' : priority === 'should' ? 'Should know' : 'Learn when needed';
      button.append(number, label, summary, priorityLabel, state);
      if (isFoundationItem) {
        button.addEventListener('click', () => openLevel(index));
      } else {
        button.addEventListener('click', () => openLevel(index));
      }

      item.append(marker, button);
      list.appendChild(item);
    });

    roadmap.replaceChildren(heading, progressBar, list);
  }

  function selectCategory(category) {
    activeCategory = category;
    tabs.forEach((tab) => {
      const selected = tab.dataset.category === category;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('aria-pressed', String(selected));
    });
    renderTrack();
  }

  function getSlideLesson(category, levelIndex) {
    if (category === 'html') {
      if (levelIndex === 0) return tracks.html.lessonSteps;
      if (levelIndex === 1) return tracks.html.documentStructureSteps;
      if (levelIndex === 2) return tracks.html.headingsTextSteps;
      if (levelIndex === 3) return tracks.html.linksImagesSteps;
      if (levelIndex === 4) return tracks.html.listsGroupingSteps;
      if (levelIndex === 5) return tracks.html.htmlTablesSteps;
      if (levelIndex === 6) return tracks.html.formsInputsSteps;
      if (levelIndex === 7) return tracks.html.semanticHtmlSteps;
      if (levelIndex === 8) return tracks.html.mediaEmbeddedSteps;
      if (levelIndex === 9) return tracks.html.headMetadataSeoSteps;
      if (levelIndex === 10) return tracks.html.accessibilityBestPracticesSteps;
      if (levelIndex === 11) return tracks.html.advancedHtmlFeaturesSteps;
      if (levelIndex === 12) return tracks.html.htmlPracticeProjectsSteps;
      return null;
    }

    if (category === 'css') {
      if (levelIndex === 0) return tracks.css.cssFundamentalsSteps;
      if (levelIndex === 1) return tracks.css.cssSelectorsSteps;
      if (levelIndex === 2) return tracks.css.colorsBackgroundsSteps;
      if (levelIndex === 3) return tracks.css.textTypographySteps;
      if (levelIndex === 4) return tracks.css.cssBoxModelSteps;
      if (levelIndex === 5) return tracks.css.displayVisibilitySteps;
      if (levelIndex === 6) return tracks.css.cssPositioningSteps;
      if (levelIndex === 7) return tracks.css.flexboxLayoutSteps;
      if (levelIndex === 8) return tracks.css.cssGridSteps;
      if (levelIndex === 9) return tracks.css.responsiveWebDesignSteps;
      if (levelIndex === 10) return tracks.css.uiStylingSteps;
      if (levelIndex === 11) return tracks.css.transitionsAnimationsSteps;
      if (levelIndex === 12) return tracks.css.advancedCssConceptsSteps;
      if (levelIndex === 13) return tracks.css.cssBestPracticesSteps;
      if (levelIndex === 14) return tracks.css.cssPracticalProjectsSteps;
      return null;
    }

    return null;
  }

  function renderLessonSlide(index) {
    const slides = getSlideLesson(activeCategory, activeLevel);
    if (!slides || !slides[index]) return;

    activeSlide = index;
    const slide = slides[index];
    const [levelName] = tracks[activeCategory].levels[activeLevel];
    slideCounter.textContent = `Level ${String(activeLevel + 1).padStart(2, '0')} — ${levelName} · Slide ${index + 1} of ${slides.length}`;
    slideProgress.max = slides.length;
    slideProgress.value = index + 1;
    slideTitle.textContent = slide.title;
    slideDescription.textContent = slide.explanation;
    slideExample.textContent = slide.example;
    slideFeedback.textContent = '';
    slideBackButton.disabled = index === 0;
    slideNavigation.hidden = index === slides.length - 1;
    foundationActions.hidden = index !== slides.length - 1;
    completeFoundationButton.textContent = getCompleted(activeCategory).includes(activeLevel)
      ? 'Next Level'
      : 'Complete & Next Level';
    slideTitle.focus();
  }

  function completeSlideLessonAndContinue() {
    const slides = getSlideLesson(activeCategory, activeLevel);
    if (!slides || activeSlide !== slides.length - 1) {
      return;
    }

    const completed = getCompleted(activeCategory);
    if (!completed.includes(activeLevel)) {
      completed.push(activeLevel);
      try {
        localStorage.setItem(progressPrefix + activeCategory, JSON.stringify(completed));
      } catch (error) {
        console.error(`Unable to save ${activeCategory} level ${activeLevel + 1} progress.`, error);
        slideFeedback.textContent = 'Your progress could not be saved. Check browser storage and try again.';
        return;
      }
    }

    renderTrack();
    const nextLevel = tracks[activeCategory].priorities.findIndex((priority, index) =>
      index > activeLevel && priority !== 'project' && !completed.includes(index)
    );
    nextLevelAfterClose = nextLevel === -1 ? null : nextLevel;
    dialog.close();
  }

  function openLevel(index) {
    activeLevel = index;
    const [name, description, task] = tracks[activeCategory].levels[index];
    const priority = tracks[activeCategory].priorities[index];
    const priorityLabel = priority === 'must' ? 'Must know' : priority === 'should' ? 'Should know' : 'Learn when needed';
    const hasSlideLesson = getSlideLesson(activeCategory, index) !== null;
    standardLesson.hidden = hasSlideLesson;
    slidesSection.hidden = !hasSlideLesson;
    dialog.setAttribute('aria-labelledby', hasSlideLesson ? 'roadmapSlideTitle' : 'roadmapLessonTitle');
    if (hasSlideLesson) {
      renderLessonSlide(0);
      dialog.showModal();
      return;
    }

    lessonLabel.textContent = `${activeCategory.toUpperCase()} · LEVEL ${String(index + 1).padStart(2, '0')} · ${priorityLabel.toUpperCase()}`;
    lessonTitle.textContent = name;
    lessonDescription.textContent = description;
    lessonTask.textContent = task;
    lessonExample.textContent = tracks[activeCategory].examples[index];
    lessonActions.hidden = false;
    quizSection.hidden = true;
    quizQuestions.replaceChildren();
    quizFeedback.textContent = '';
    retryQuizButton.hidden = true;
    startQuizButton.textContent = getCompleted(activeCategory).includes(index) ? 'Review quiz' : 'Take level quiz';
    dialog.showModal();
  }

  function makeChoices(levelIndex, fieldIndex) {
    const levels = tracks[activeCategory].levels;
    const examples = tracks[activeCategory].examples;
    const current = fieldIndex === 3 ? levels[levelIndex][0] : fieldIndex === 4 ? examples[levelIndex] : levels[levelIndex][fieldIndex];
    const offsets = [1, 2, 3];
    const choices = [{ text: current, correct: true }];
    offsets.forEach((offset) => {
      const otherIndex = (levelIndex + offset) % levels.length;
      const value = fieldIndex === 3 ? levels[otherIndex][0] : fieldIndex === 4 ? examples[otherIndex] : levels[otherIndex][fieldIndex];
      if (!choices.some((choice) => choice.text === value)) choices.push({ text: value, correct: false });
    });
    for (let i = choices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices;
  }

  function addQuizQuestion(questionNumber, prompt, fieldIndex) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'roadmap-quiz-question';
    const legend = document.createElement('legend');
    legend.textContent = `${questionNumber}. ${prompt}`;
    fieldset.appendChild(legend);
    makeChoices(activeLevel, fieldIndex).forEach((choice, choiceIndex) => {
      const label = document.createElement('label');
      label.className = 'roadmap-quiz-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `roadmap-question-${questionNumber}`;
      input.value = String(choiceIndex);
      input.dataset.correct = String(choice.correct);
      input.required = true;
      const answer = document.createElement('span');
      answer.textContent = choice.text;
      label.append(input, answer);
      fieldset.appendChild(label);
    });
    quizQuestions.appendChild(fieldset);
  }

  function startQuiz() {
    if (activeLevel === null) return;
    const [name] = tracks[activeCategory].levels[activeLevel];
    quizQuestions.replaceChildren();
    addQuizQuestion(1, 'Which topic does this level teach?', 3);
    addQuizQuestion(2, 'Which explanation matches this level?', 1);
    addQuizQuestion(3, 'Which code example belongs to this topic?', 4);
    addQuizQuestion(4, 'Which practice task should you complete?', 2);
    quizSection.querySelector('#roadmapQuizTitle').textContent = `${name} quiz`;
    quizFeedback.textContent = '';
    retryQuizButton.hidden = true;
    lessonActions.hidden = true;
    quizSection.hidden = false;
    quizSection.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function submitQuiz(event) {
    event.preventDefault();
    if (!quizForm.reportValidity() || activeLevel === null) return;
    const answers = Array.from(quizQuestions.querySelectorAll('input[type="radio"]:checked'));
    const correctCount = answers.filter((answer) => answer.dataset.correct === 'true').length;
    const score = Math.round((correctCount / 4) * 100);
    if (score >= 70) {
      const completed = getCompleted(activeCategory);
      if (!completed.includes(activeLevel)) {
        completed.push(activeLevel);
        try {
          localStorage.setItem(progressPrefix + activeCategory, JSON.stringify(completed));
        } catch (error) {
          console.error('Unable to save roadmap progress.', error);
          quizFeedback.textContent = `You scored ${score}%. The pass mark is 70%, but progress could not be saved. Check browser storage and try again.`;
          return;
        }
      }
      quizFeedback.textContent = `Passed — ${score}%. Level complete; the next level is now unlocked.`;
      retryQuizButton.hidden = true;
      renderTrack();
    } else {
      quizFeedback.textContent = `Not quite — ${score}%. You need at least 70%. Review the lesson and try again.`;
      retryQuizButton.hidden = false;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => selectCategory(tab.dataset.category));
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (nextLevelAfterClose === null) return;
    const nextLevel = nextLevelAfterClose;
    nextLevelAfterClose = null;
    openLevel(nextLevel);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  slideBackButton.addEventListener('click', () => {
    if (activeSlide > 0) renderLessonSlide(activeSlide - 1);
  });
  slideNextButton.addEventListener('click', () => {
    const slides = getSlideLesson(activeCategory, activeLevel);
    if (slides && activeSlide < slides.length - 1) renderLessonSlide(activeSlide + 1);
  });
  completeFoundationButton.addEventListener('click', completeSlideLessonAndContinue);
  startQuizButton.addEventListener('click', startQuiz);
  quizForm.addEventListener('submit', submitQuiz);
  retryQuizButton.addEventListener('click', startQuiz);
  backToLessonButton.addEventListener('click', () => {
    quizSection.hidden = true;
    lessonActions.hidden = false;
  });

  renderTrack();
})();
