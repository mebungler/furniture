package templates

import "html/template"

var tpl *template.Template

func Init() {
	tpl = template.Must(template.ParseGlob("templates/*.gohtml"))
}

func Ref() *template.Template {
	return tpl
}
