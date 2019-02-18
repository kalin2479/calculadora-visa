<template lang="pug">
  #app
    .container
      p.subtitle
        | Con esta herramienta podrás estimadar cuánto te vamos a depositar por
        | cada una de tus ventas con tarjeta.
      .boxCalculadora
        .boxBotones
          a#Credito.active(href='javascript:void(0)', v-on:click='btnCredito') CRédito
          a#Debito(href='javascript:void(0)', v-on:click='btnDebito') débito
        .boxDetail
          .columns
            .column
              p
                | Colocar monto de
                br
                | venta con tarjeta
            .column.mascara(v-bind:class='{ activeMask }')
              span.simboloMoneda S./
              input(type='text', v-model='maskprice', placeholder='S./ 00.00', v-on:keyup='mascara')
              .hiddenMoney {{ maskprice }}
          .columns
            .column
              p
                | Comisión
                span ({{ comision }}%)
            .column
              span.valor S/ {{ valorComision }}
          .columns
            .column
              p IGV*
            .column
              span.valor S/ {{ valorIGV }}
          .columns.result
            .column
              p Tu recibes
            .column
              span.valor S/ {{ valorResultado }}
          .columns
            .column.left
              p *Monto de IGV referencial. Sujeto a normativa vigente
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      maskMonto: '',
      maskprice: '',
      comision: 3.99,
      price: 0,
      activeMask : 'active',
      igv: 0.14,
      totalIGV : 0,
      totalComision : 0
    }
  },
  computed : {
    valorResultado: function(){
      var nuevoCadena = this.maskprice.replace(/,/g, '')
      var arr = nuevoCadena.split('.');

      var cad1 = arr[0];
      var cad2 = arr[1];
      var valor = 0;
      var resultado = 0;

      if (parseInt(cad2) > 0){
        valor = parseFloat(cad1+'.'+cad2);
        // console.log(">>>" + cad1+'.'+cad2);
      }else
        valor = parseInt(cad1);

      // console.log(valor);
      // console.log(this.valorIGV);
      // console.log(this.valorComision);
      if (this.valorIGV <= 0){
        return "00.00";
      }else{
        var sumaTotal = parseFloat(this.totalIGV) + parseFloat(this.totalComision);
        resultado = valor - sumaTotal ;
        // console.log("suma" + sumaTotal);
        // console.log("resultado" + resultado);
        return this.darFormato(resultado.toFixed(2));
      }
    },
    valorIGV: function(){
      var nuevoCadena = this.maskprice.replace(/,/g, '')
      var arr = nuevoCadena.split('.');

      var cad1 = arr[0];
      var cad2 = arr[1];
      var valor = 0;
      var resultado = 0;

      if (parseInt(cad2) > 0){
        valor = parseFloat(cad1+'.'+cad2);
        // console.log(">>>" + cad1+'.'+cad2);
      }else
        valor = parseInt(cad1);
      // console.log(valor);
      resultado = (valor*(this.igv/100)).toFixed(3)
      this.totalIGV = resultado;
      // console.log("ZZZ"+this.totalIGV)
      if (this.maskprice === ""){
        return "00.00";
      }else{
        // console.log(resultado)
        return this.darFormato(resultado);

      }

    },
    valorComision: function(){

      var nuevoCadena = this.maskprice.replace(/,/g, '')
      var arr = nuevoCadena.split('.');

      var cad1 = arr[0];
      var cad2 = arr[1];
      var valor = 0;
      var resultado = 0;

      if (parseInt(cad2) > 0){
        valor = parseFloat(cad1+'.'+cad2);
        // console.log(">>>" + cad1+'.'+cad2);
      }else
        valor = parseInt(cad1);
      // console.log(valor);
      resultado = (valor*(this.comision/100)).toFixed(3)
      this.totalComision = resultado;
      if (this.maskprice === ""){
        this.activeMask = '';
        return "00.00";
      }else{
        this.activeMask = 'active'


        return this.darFormato(resultado);
      }
    }
  },
  watch : {
    maskprice: function(newVal, oldVal){
      setTimeout(function(){
        var t = $(".hiddenMoney").width()+20;
        $(".simboloMoneda").css("right",t);
      },30)

    }
  },
  methods : {
    btnDebito : function(event){
      console.log(event);
      $("#Credito").removeClass('active');
      $("#Debito").addClass('active');
      this.comision = 2.99;
      this.igv = 0.11
    },
    btnCredito : function(event){
      $("#Debito").removeClass('active');
      $("#Credito").addClass('active');
      this.comision = 3.99;
      this.igv = 0.14
    },
    mascara : function(){
      // console.log(this.maskprice);
      this.maskprice = this.darFormato(this.maskprice);
    },
    darFormato : function(data){
      var v = data;
      v=v.replace(/([^0-9\.]+)/g,'');
  		v=v.replace(/^[\.]/,'');
  		v=v.replace(/[\.][\.]/g,'');
  		v=v.replace(/\.(\d)(\d)(\d)/g,'.$1$2');
  		v=v.replace(/\.(\d{1,2})\./g,'.$1');
  		v = v.toString().split('').reverse().join('').replace(/(\d{3})/g,'$1,');
  		v = v.split('').reverse().join('').replace(/^[\,]/,'');
      return v;
    }
  }
}
</script>

<style lang="sass">
  @import './sass/main.sass'
</style>
