import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/*
html5doctor.com Reset Stylesheet
v1.6.1
Last Updated: 2010-09-17
Author: Richard Clark - http://richclarkdesign.com
Twitter: @rich_clark
*/

  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hnote, menu, nav, section, summary,
  time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
  }

  body {
    line-height:1;
  }

  article,aside,details,figcaption,figure,
  footer,header,hnote,menu,nav,section {
    display:block;
  }

  nav ul {
    list-style:none;
  }

  blockquote, q {
    quotes:none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content:'';
    content:none;
  }

  a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
  }

  /* change colours to suit your needs */
  ins {
    background-color:#ff9;
    color:#000;
    text-decoration:none;
  }

  /* change colours to suit your needs */
  mark {
    background-color:#ff9;
    color:#000;
    font-style:italic;
    font-weight:bold;
  }

  del {
    text-decoration: line-through;
  }

  abbr[title], dfn[title] {
    border-bottom:1px dotted;
    cursor:help;
  }

  table {
    border-collapse:collapse;
    border-spacing:0;
  }

  /* change border colour to suit your needs */
  hr {
    display:block;
    height:1px;
    border:0;  
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
  }

  input, select {
    vertical-align:middle;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font: inherit;
  }
/* // Reset CSS */

  html, body {
    font-family: 'Lato', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ W3', 'Hiragino Sans', '游ゴシック体', YuGothic, '游ゴシック Medium', 'Yu Gothic Medium', '游ゴシック', 'Yu Gothic', 'メイリオ', 'ＭＳ Ｐゴシック', sans-serif;
    font-size: 62.5%;
    line-height: 1.5;
    overscroll-behavior: none;
    color: #555;
  }
  a, button, input[type="submit"] {
    cursor: pointer;
  }
  .quill {
    width: 100%;
    height: 100%;
  }
  .ql-toolbar {
    background-color: #eee;
    border-radius: 4px 4px 0 0;
  }
  .ql-container {
    border-radius: 0 0 4px 4px;
    padding: 12px 16px;
  }
  .ql-editor {
    background: none;
    padding: 0;
    max-height: 24rem;
    p {
      font-size: 1.6rem;
    }
  }
`;

export default GlobalStyle;
