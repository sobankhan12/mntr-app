<template>
  <div class="file-upload-content">
    <file-upload
      ref="upload"
      v-model="files"
      v-if="!files.length"
      :multiple="false"
      :drop="true"
      :extensions="_extensions"
      :input-id="id"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
      <div>
        <v-icon
          left
          class="mb-1"
          :color="$vuetify.theme.themes[theme].text"
        >
          $mdiUpload
        </v-icon>
        <p class="mb-0">
          Drag file here or click <span class="color-lightskyblue">here to upload</span>
        </p>
      </div>
    </file-upload>
    <div v-else>
      <div class="file-upload__summary-content">
        <v-icon
          left
          class="mb-2"
          size="26"
          :color="'#5C6166'"
          style="opacity: 0.5"
        >
          $mdiFileImageOutline
        </v-icon>
        <div class="file-upload__summary">
          <div class="file-upload__summary--text">
            {{ files[0] && files[0].name }} ({{ files[0] && files[0].size }})
          </div> <div
            class="file-upload__close-button"
            @click="clear()"
          >
            <v-icon
              left
              size="17"
              :color="'#FE6F0A'"
            >
              $mdiCloseCircle
            </v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'

export default {
  name: 'FileUploadComponent',
  components: { FileUpload },
  props: {
    size: {
      type: Number,
      default: 25
    },
    extensions: {
      type: Array,
      default: () => {
        return ['tif','tiff','png','eps','raw']
      }
    },
    id:{
      required: true
    },
  },
  data() {
    return {
      files: [],
    }
  },
  computed:{
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    completed() {
      return this.validate(this.formData) ? true : false
    },
    _extensions() {
      const arr = [...this.extensions]
      return arr.toString()
    },
    readableExtensions() {
      const arr = [...this.extensions]
      return arr.join(', ')
    },
    regexExtensions() {
      const arr = [...this.extensions]
      const extString = arr.join('|')
      /* eslint-disable */
      return new RegExp('\.(' + extString + ')$', 'i')
    }
  },
  methods: {
    inputFile() {
      this.$emit('inputFile', this.files[0].file)
    },
    inputFilter(newFile, oldFile, prevent) {
      let maxSize = this.size * 1024
      if (newFile && !oldFile) {
        if (!this.regexExtensions.test(newFile.name)) {
          alert(`Invalid file type. Allowed file types are ${this.readableExtensions}`)
          return prevent()
        }
      }
      else if (newFile.size > maxSize) {
        alert(`File size cannot be bigger than ${this.size}MB`)
        return prevent()
      }
      else{
        this.$emit('inputFile', this.files[0].file)
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    },
    clear() {
      //this.$emit('clear')
      //this.$refs.upload.update(file, { active: false })
      this.files = []
    }
  }
}
</script>

<style lang="scss">
.file-upload {
  &__close-button{
    position: absolute;
    top: -12px;
    right: -17px;
  }
  &-content{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    label{
      cursor:pointer;
    }
  }
  .file-uploads{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__summary{
    background: #F8F8F8;
    border: 1px solid #DFDFDF;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 6px 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 138.19%;
    color: #5C6166;
    position: relative;
    &--text{
      opacity: 0.7;
    }
    &-content{
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      .v-icon{
        font-style: normal;
        font-weight: 900;
        font-size: 26px;
        line-height: 138.19%;
      }
    }
  }
}
</style>