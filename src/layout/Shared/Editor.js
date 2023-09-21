import React from 'react'
import SunEditor, { buttonList } from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import '../../assets/style/layout/editor.css'
import plugins from "suneditor/src/plugins"

const attributesList = [
    "username", 
    "email", 
    "phone", 
    "full_name", 
    "company_name", 
    "sender_name",
    "credit",
    "balance",
    "pricelist",
    "messages_count"
]

const UserAttributesPlugin = {
    name: 'UserAttributes',
    display: 'submenu',
    title: 'Insert User Attribute',
    buttonClass: '',
    innerHTML: '<i style="transform: scale(1.7)" class="fa-brands fa-creative-commons-by"></i>',
    add: function (core, targetElement) {

        let userAttrs = this.setSubmenu(core)
        userAttrs.querySelector('ul').addEventListener('click', this.pickup.bind(core))
        core.initMenuTarget(this.name, targetElement, userAttrs)
        userAttrs = null
    },

    setSubmenu: function (core) {
        const listDiv = core.util.createElement('DIV')

        listDiv.className = 'se-submenu se-list-layer se-list-font-size'

        let list = '<div class="se-list-inner">' +
                '<ul class="se-list-basic">' 

        for (let i = 0, len = attributesList.length, attr; i < len; i++) {
            attr = attributesList[i]
            list += '<li><button type="button" class="se-btn-list" data-value="' + attr + '" title="' + attr + '" aria-label="' + attr + '" style="font-size:' + attr + '">' + attr + '</button></li>'
        }
        list += '</ul></div>'

        listDiv.innerHTML = list

        return listDiv
    },

    pickup: function (e) {
        if (!/^BUTTON$/i.test(e.target.tagName)) return false
        
        e.preventDefault()
        e.stopPropagation()

        let value = e.target.getAttribute('data-value')

        if (value) {
            value = "{{" + value + "}}"
            let content = this.getContents()

            if (content === "<p><br></p>") {
                this.setContents("<p>" + value + "</p>")
            }
            else if (["</li></ol>", "</li></ul>"].includes(content.slice(-10))) {
                ["<br></li></ol>", "<br></li></ul>"].includes(content.slice(-14)) ?
                this.setContents(content.slice(0, -14) + value + content.slice(-10)) :
                this.setContents(content.slice(0, -10) + value + content.slice(-10))
            }
            else if (["</p>"].includes(content.slice(-4))) {
                this.setContents(content.slice(0, -4) + value + content.slice(-4))
            }
            else {
                this.setContents(content + value)
            }            
        }

        this.submenuOff()
    }
}




const Editor = ({ onContentChange, initialContent, templates }) => {
  const onChangeHandler = (content) => {
    onContentChange(content)
  }

  const toggleFullScreen = (isFullScreen) => {
    document.querySelector('.sun-editor').style.height = ''
    document.querySelector('div.se-wrapper-inner').style.minHeight = isFullScreen ? '650px' : '200px'
  }

  return (
    <SunEditor
      onChange={onChangeHandler}
      defaultValue={initialContent}
      placeholder="Please type here..."
      toggleFullScreen={toggleFullScreen}
      setOptions={{
        templates: templates,
        buttonList: [...buttonList.complex, ['UserAttributes']],
        plugins: {...plugins, UserAttributes: UserAttributesPlugin}
      }}
      setAllPlugins={true}
    />
  )
}

export default Editor