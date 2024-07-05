import $ from 'jquery';

const backendUrl = "http://localhost:8765";

class ModelInter {
  constructor(data) {
    this.data = data;
    for(let key in data) this[key] = data[key];
  }
}
class User extends ModelInter {
  static get(id, callback) {
    $.ajax({
      dataType: "json",
      url: backendUrl + `/users/${id}.json`,
      data: null,
      success: function(data) {
        if(data.ok) {
          callback(new User(data.user));
        } else {
          callback(null);
        }
      }
    });
  }
  static get_current(callback) {
    $.ajax({
      dataType: "json",
      url: backendUrl + `/user.json`,
      data: null,
      success: function(data) {
        if(data.ok) {
          callback(new User(data.user));
        } else {
          callback();
        }
      }
    });
  }
  static signin(email, password, callback) {
    $.ajax({
      dataType: "json",
      url: backendUrl + `/signin`,
      data: { email, password },
      success: function(data) {
        if(data.ok) {
          callback(new User(data.user), null);
        } else {
          callback(null, data.err);
        }
      }
    });
  }
  constructor(data) {
    super(data);
    this.classrooms = [];
    let obj = this;
    for(let classroom of data.classrooms) {
      obj.classrooms.push(new Classroom(classroom));
    }
    this.profile = `/users/${this.data.id}/profile.png`;
  }
  modified() {
    return (
      this.name != this.data.name || this.bio != this.data.bio
    );
  }
  save(callback) {
    let user = this;
    $.ajax({
      url: backendUrl + '/settings/profile/submit/',
      success: function(data) {
        flashMessage("green", "Updated profile succesfuly");
        user.data.bio = user.bio;
        user.data.name = user.name;
        if(callback) callback();
      },
      error: function(zer) {
        flashMessage("red" , "Could not save profile");
      },
      type: 'GET',
      data: this.serialize(),
      dataType: 'JSON',
    });
  }
  serialize() {
    return {
      bio: this.bio,
      name: this.name,
    };
  }
}
class QuizzUser extends ModelInter {
  static get(id, callback) {
    $.ajax({
      url: backendUrl + `/quizz/users/${id}.json`,
      success: function(data) {
        if(data.ok) callback(new QuizzUser(data.user));
      },
      error: function(zer) {
        console.error("error loading profile");
      },
      type: 'GET',
      data: null,
    });
  }
  static get_current($http, callback) {
    $.ajax({
      url: backendUrl + `/quizz/user.json`,
      success: function(data) {
        if(data.ok) callback(new QuizzUser(data.user));
      },
      error: function(zer) {
        console.error("error loading profile");
      },
      type: 'GET',
      data: null,
    });
  }
  constructor(data) {
    super(data);
    this.sbook = new User(data.sbook);
  }
}


class Classroom extends ModelInter {
  static get(id, $http, callback) {
    $.ajax({
      url: backendUrl + `/school/classroom/${id}.json`,
      success: function(data) {
        if(data.ok) {
          callback(new Classroom(data.classroom));
        } else {
          callback(null);
        }
      },
      error: function(zer) {
        console.error("error loading profile");
      },
      type: 'GET',
      data: null,
    });
  }
  static all($http, callback) {
    $.ajax({
      url: backendUrl + `/school/classrooms.json`,
      success: function(data) {
        if(data.ok) {
          callback(
            data.classrooms.map((d) => new Classroom(d)),
          );
        } else {
          callback(null);
        }
      },
      error: function(zer) {
        console.error("error loading profile");
      },
      type: 'GET',
      data: null,
    });
  }
  constructor(data) {
    super(data);
    this.profile = backendUrl + `/school/classroom/profile/${this.id}.png`;
    this.url = backendUrl + `/school/classroom/${this.id}`
  }
  is_admin(user) {
    for(let admin of this.admins) {
      if(admin.id == user.id) return true;
    }
    return false;
  }
  is_teacher(user) {
    for(let teacher of this.teachers) {
      if(teacher.id == user.id) return true;
    }
    return false;
  }
  is_students(user) {
    for(let students of this.studentss) {
      if(students.id == user.id) return true;
    }
    return false;
  }
}



class Question extends ModelInter {
  constructor(id, {question, options}) {
    let opts = {};
    if(options) for(let [k, v] of options) opts[k] = v;
    super({question, id, options: opts});
  }
  serialize() {
    let obj = {
      question: this.question,
      options: {},
    };
    for(let i = 0; i < this.options.length; i++) {
      obj.options[
        String.fromCodePoint(i+'A'.charCodeAt(0)).toString()
      ] = this.options[i].text;
    }
    return obj;
  }
  addOption(k, v) {
    if(Object.keys(this.options).length > 10) {
      flashMessage("#f93",`Oh, ${Object.keys(this.options).length} thats many options, don't you think?`);
      return;
    }
    if(k == null) k = String.fromCodePoint(
      Object.keys(this.options).length+'A'.charCodeAt(0)
    ).toString()
    this.options[k] = v;
  }
}
class Quizz extends ModelInter {
  static get(id) {
    return new Promise(function(resolve) {
      $.ajax({
        dataType: "json",
        url: `/quizz/quizzes/${id}.json`,
        data: null,
        success: function(data) {
          if(data.ok) {
            resolve(new Quizz(data.quizz));
          } else {
            resolve(false);
          }
        }
      });
    });
  }
  static all($http, callback) {
    $http.get(`/quizz/quizzes.json`).then(function(res) {
      let data = res.data;
      if(data.ok) {
        let quizzes = [];
        for(let qd of data.quizzes) {
          callback(new Quizz(qd));
        }
      }
    });
  }
  constructor(data) {
    super(data);
    let i = 0;
    this.questions = data.questions.map((q) => new Question(i++ ,q));
    this.authors = data.authors.map((q) => new QuizzUser(q));
  }
  modified() {
    return (
      this.name != this.data.name ||
      this.bio != this.data.bio
    )
  }
  save(callback) {
    let user = this;
    $.ajax({
      url: '/settings/profile/submit/',
      success: function(data) {
        flashMessage("green", "Updated profile succesfuly");
        user.data.bio = user.bio;
        user.data.name = user.name;
        if(callback) callback();
      },
      error: function(zer) {
        flashMessage("red" , "Could not save question");
      },
      type: 'GET',
      data: this.serialize(),
      dataType: 'JSON',
    });
  }
  serialize() {
    return {
      bio: this.bio,
      name: this.name,
    };
  }
}
class NoteUser extends ModelInter {
  static get(id, $http, callback) {
    $.ajax({
      url: backendUrl + `/note/users/${id}.json`,
      success: function(data) {
        flashMessage("green", "Updated profile succesfuly");
        user.data.bio = user.bio;
        user.data.name = user.name;
        if(data.ok) {
          callback(new NoteUser(data.user));
        }
      },
      error: function(zer) {
        flashMessage("red" , "Could not save question");
      },
      type: 'GET',
      data: this.serialize(),
      dataType: 'JSON',
    });
  }
  static get_current($http, callback) {
    $.ajax({
      url: backendUrl + `/note/user.json`,
      success: function(data) {
        flashMessage("green", "Updated profile succesfuly");
        user.data.bio = user.bio;
        user.data.name = user.name;
        if(data.ok) {
          callback(new NoteUser(data.user));
        }
      },
      error: function(zer) {
        flashMessage("red" , "Could not save question");
      },
      type: 'GET',
      data: this.serialize(),
      dataType: 'JSON',
    });
  }
  constructor(data) {
    super(data);
    this.notes = data.notes.map((n) => new Note(n));
    this.sbook = new User(data.sbook);
  }
}
class Note extends ModelInter {
  constructor(data) {
    super(data);
    this.profile = backendUrl + `/note/profile/note/${this.id}.png`;
  }
}


function flashMessage(stat, text) {
  $.toast({
    text : text,
    showHideTransition : 'slide',  // It can be plain, fade or slide
    bgColor : stat,              // Background color for toast
    textColor : '#fff',            // text color
    allowToastClose : false,       // Show the close button or not
    hideAfter : 5000,              // `false` to make it sticky or time in miliseconds to hide after
    stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
    textAlign : 'left',            // Alignment of text i.e. left, right, center
    position : 'bottom-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
  });
}

class Sbook {
  static renderMarkdown() {
    for(let elt of document.getElementsByClassName('raw-markdown')) {
      if(!elt.textContent.trim()) {
        continue;
      }
      $.ajax({
        url: backendUrl + '/markdown/',
        success: function(data) {
          console.log(data);
          if(data.ok) {
            elt.innerHTML = data.html;
            elt.classList.remove('raw-markdown');
          }
        },
        type: 'GET',
        data: {
          md: btoa(elt.innerHTML.trim()),
        },
        dataType: 'JSON',
      });
    }
  }
}

export {Sbook, User, NoteUser, Note, Classroom, Quizz, QuizzUser, Question, flashMessage};
