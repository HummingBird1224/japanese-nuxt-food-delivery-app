<template>
  <div class="Keyboards">
    <div class="Keyboards__child Keyboards__child--l">
      <div class="Keyboards-column">
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('A')">A</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('B')">B</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('C')">C</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('D')">D</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('E')">E</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('F')">F</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('G')">G</div>
      </div>
      <div class="Keyboards-column">
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('H')">H</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('I')">I</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('J')">J</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('K')">K</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('L')">L</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('M')">M</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('N')">N</div>
      </div>
      <div class="Keyboards-column">
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('O')">O</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('P')">P</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('Q')">Q</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('R')">R</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('S')">S</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('T')">T</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('U')">U</div>
      </div>
      <div class="Keyboards-column">
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('V')">V</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('W')">W</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('X')">X</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('Y')">Y</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('Z')">Z</div>
      </div>
    </div>
    <div class="Keyboards__child Keyboards__child--r">
      <div class="Keyboards-column">
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('1')">1</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('2')">2</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('3')">3</div>
      </div>
      <div class="Keyboards-column">
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('4')">4</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('5')">5</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('6')">6</div>
      </div>
      <div class="Keyboards-column">
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('7')">7</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('8')">8</div>
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('9')">9</div>
      </div>
      <div class="Keyboards-column">
        <div class="Keyboards-column__child Keyboards-key" @pointerdown="onClickInput('0')">0</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sound: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // キーボードクリック
    //keyboards.vue, It is very useful.
    onClickInput (value) {
      if (this.sound) {
        this.$sound.playClick()
      }
      this.$emit('input', value)
    }
  }
}
</script>
