var global_score; 
var seconds1;
class GameApp {
  
    constructor() {
      this.calcPoints();
      this.gunShot();
      this.restart();
      this.hardModeStart(); // Call the function when the page is loaded
      // this.cursorTracking();
   
    }
  
    
    calcPoints() {
      let self = this;
      let points = 0;
  
      $('[class^=circle]').mousedown(function() {
        const numberOfPoint = $(this).attr('data-label');
        points += parseInt(numberOfPoint);
        $('.score').text(points + ' pts');
        console.log(`${points}`);
        global_score = points;
     
        
      });
  
      $('.hardMode').click(function() {
        $('.score').text('0 point');
        points = 0;
        self.hardModeStart();
      });
    }
  

    gunShot() {
      $('.target').mousedown(function(e) {
        const bulletHole = $('<div class="bulletHole">');
        const gunShotSound = new Audio('https://raw.githubusercontent.com/raychang2017/f2e-portfolio/master/07%20-%20JavaScript%20%E6%A8%99%E9%9D%B6%E9%81%8A%E6%88%B2%20%E2%80%93%20%E6%BB%91%E9%BC%A0%E4%BD%A0%E4%B8%80%E5%88%86%E9%90%98%E8%83%BD%E6%8C%89%E5%B9%BE%E4%B8%8B%EF%BC%9F/audio/5.56-AR15-Single-Close-GunShot-A.mp3');
        const BulletShellFallingSound = new Audio('https://raw.githubusercontent.com/raychang2017/f2e-portfolio/master/07%20-%20JavaScript%20%E6%A8%99%E9%9D%B6%E9%81%8A%E6%88%B2%20%E2%80%93%20%E6%BB%91%E9%BC%A0%E4%BD%A0%E4%B8%80%E5%88%86%E9%90%98%E8%83%BD%E6%8C%89%E5%B9%BE%E4%B8%8B%EF%BC%9F/audio/empty-bullet-shell-fall-01.mp3');
    
        const circleClicked = $(e.target).closest('[data-label="6"]');
    
        if (circleClicked.length > 0) {
          // Add a moving <p>6+</p> tag
          const movingText = $('<p class="moving-text">6+</p>').appendTo('body');
    
          // Set the starting position of the moving text
          movingText.css({
            position: 'absolute',
            left: e.pageX + 'px',
            top: e.pageY + 'px'
          });
    
          // Move the text upward
          movingText.animate({
            top: '-50px',  // You can adjust the distance the text moves
            opacity: 0
          }, 1000, function() {
            $(this).remove();  // Remove the text after animation
          });
        }
    
        // Because the upper left corner is positioned with .target as the center, the offset needs to be adjusted offset()
        // After changing body to cursor: cell, it will be offset again, so adjust it back to 8 px
        bulletHole.css({
          // clientX、pageX、screenX (https://segmentfault.com/a/1190000002405897)
          left: e.pageX - $(this).offset().left - 8 + 'px',
          top: e.pageY - $(this).offset().top - 8 + 'px'
        });
  
        $(this).append(bulletHole);
        gunShotSound.play();
        // setTimeout(() => BulletShellFallingSound.play(), 500);
      });
     
    }
    
    
    
    
    
    restart() {
      // 'enter', 'delete' does not need to use function(e) and if (e.key == 'enter')
      $('.restart').click(function() {
        // After the Hard mode timer returns to zero, the bullet holes and scores are unbind() and restored using this page refresh
        window.location = window.location.href; // can refresh the previous page
      });
    }
  
    hardModeStart() {
      $('#nextToQuizBtn').hide();
      $('.hardMode').hide();
      $('.bulletHole').remove();
      $('.target').addClass('moving');
  
      // Count down 60 seconds, and the remaining 10 seconds will turn into big red text
      let sec = 15;
      // The recursive version of setTimeout can ensure that the delay between each execution is accurate, but setInterval cannot, because the execution time of func offsets part of the interval time. In extreme cases, if the execution time of the function exceeds the time set by delay, there will be no pause every time setTimeout is called.
      (function count() {
        $('.remainingTime').text(sec);
  
        if (sec === 0) {
          $('#nextToQuizBtn').show();
          $('.target').removeClass('moving');
          $('.remainingTime').text('0');
          $('body').css('cursor', 'default');
          // Stop the scoring event, stop the bullet hole event, stop the mode switching event
          $('[class^=circle]').unbind();
          $('.target').unbind();
          $('.hardMode').unbind();
          
          // Generally speaking, using JS to add or reduce classes is better than directly modifying CSS (the browser will re-render, and using mobile platforms may cause slower problems). Here, modifying CSS directly is for convenience.
        } else if (sec <= 10) {
          $('.remainingTime').css({
            color: '#dc0404',
            'font-size': '30px'
          });
        }
         else {
          $('.remainingTime').css({
            color: 'white',
            'font-size': '25px'
          });
        }
  
        if (sec > 0) {
          setTimeout(count, 1000);
        }
  
        sec--;
      })();
      seconds1 = sec;

    }
  
    cursorTracking() {
      // The cross mark moves with the mouse
      $(window).mousemove(function(e) {
        // console.log(e.pageX+','+e.pageY)
        $('.crossSign').css({
          left: e.pageX + 'px',
          top: e.pageY + 'px'
        });
      });
    }
}



//   new code********************************************



function calcPoints() {
    let self = this;
    let points = 0;
  
    $('[class^=circle]').mousedown(function () {
      const numberOfPoint = $(this).attr('data-label');
      points += parseInt(numberOfPoint);
      $('.score').text(points + ' pts');
      // console.log(`${score}`);

    });
  
    $('.hardMode').click(function () {
      $('.score').text('0 point');
      points = 0;
      self.hardModeStart();
    });

 
  }
  
//  function hardModeStart() {
//     $('.hardMode').hide();
//     $('.bulletHole').remove();
//     $('.target').addClass('moving');
  
//     let sec = 150;
//     (function count() {
//       $('.remainingTime').text(sec);
  
//       if (sec === 0) {
//         $('.target').removeClass('moving');
//         $('.remainingTime').text('0');
//         $('body').css('cursor', 'default');
//         $('[class^=circle]').unbind();
//         $('.target').unbind();
//         $('.hardMode').unbind();
//       } else if (sec <= 10) {
//         $('.remainingTime').css({
//           color: '#fe5b45',
//           'font-size': '50px'
//         });
//       } else {
//         $('.remainingTime').css({
//           color: 'black',
//           'font-size': '30px'
//         });
//       }
  
//       if (sec > 0) {
//         setTimeout(count, 1000);
//       }
  
//       sec--;
//     })();
//   }
//   
  var Game = new GameApp();


