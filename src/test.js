class user{
    constructor(name ='', email=''){
      this._name = name
      this._email = email
      this._status = 'Active'
      this._tag = []
    }
    get name(){
        return this._name
    }
    set name(name) {
        this._name = name
    }
    get email(){
        return this._email
    }
    set email(email) {
        this._email = email
    }
  }


  let user1 = new user('tester1', 'tester@t1')
  let user2 = new user('tester2', 'tester@t2')
  let user3 = new user('tester3', 'tester@t3')
  let user4 = new user('tester4', 'tester@t4')
  let user5 = new user('tester5', 'tester@t5')

  console.log(user1)
  console.log(false||false&&true)
  console.log(false||true&&false)