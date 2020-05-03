<template>
  <h1>Editting note</h1>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'EditNote',
    data() {
        return {
            options: [
                { 
                    text: "Save and exit", 
                    icon: "mdi-content-save", 
                    type: "normal",
                    click: ()=>{this.saveAndExit()} 
                },
                { 
                    text: "Change color", 
                    icon: "mdi-palette", 
                    type: "dropdown",
                    first: "All", //change to note current color
                    options: [
                    "All",
                    "Orange",
                    "Green",
                    "Purple",
                    "Grey",
                    "Red",
                    "Yellow",
                    "Blue",
                    "Black",
                    "White"
                    ],
                    click: ()=>{this.changeColor()} 
                },
                { 
                    text: "Delete note", 
                    icon: "mdi-delete-empty", 
                    type: "normal",
                    click: ()=>{this.deleteNote()} 
                }
            ]
        }
    },
    methods: {
        ...mapActions(['setView']),
        saveAndExit() {
            //save to firebase, and in >-then-< method:
            this.$emit('changeView', 'Overview')
        },
        changeColor() {
            console.log('changeColor')
        },
        deleteNote() {
            console.log('deleteNote')
        }
    },
    created() {
        this.$emit('changeOptions', this.options)
        this.setView('EditNote')
    }
}
</script>