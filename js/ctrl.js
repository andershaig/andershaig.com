app.controller('AppCtrl', ['$scope', '$timeout', '$interval', AppCtrl]);

/**
 * Main Controller
 */
function AppCtrl ($scope, $timeout, $interval) {
  var self = this;

  self.workplaces = {
    current: {
      company: 'Pattern',
      url: 'http://pattern.ai',
      logo: '',
      description: ''
    },
    previous: [
      {
        company: 'Google',
        url: 'http://google.com',
        logo: '',
        description: ''
      },
      {
        company: 'Wildfire',
        url: null,
        logo: '',
        description: ''
      }
    ]
  };

  self.letters = [
    {
      cnt: 'a',
      pos: 'tl',
      active: false
    },
    {
      cnt: 'n',
      pos: 'tm',
      active: false
    },
    {
      cnt: 'd',
      pos: 'tr',
      active: false
    },
    {
      cnt: 'e',
      pos: 'bl',
      active: false
    },
    {
      cnt: 'r',
      pos: 'bm',
      active: false
    },
    {
      cnt: 's',
      pos: 'br',
      active: false
    }
  ]

  var activeLetter = null;

  var rotateLetter = function () {
    var rand = Math.floor(Math.random() * 6);

    if (activeLetter) {
      activeLetter.active = false;
    }

    activeLetter = self.letters[rand];
    activeLetter.active = true;
  }

  $timeout( function () {
    $scope.loaded = true;
    // $interval(rotateLetter, 3000);
  }, 1000);


}
