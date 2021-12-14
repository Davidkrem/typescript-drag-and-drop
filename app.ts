//Instead of bind, will use an autobind decorator
//decorator is function that is called on a class
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor = {
    configurable: true,
    get: function () {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  //adjusted descriptor is returned
  return adjDescriptor;
}

//Using object oriented approach
//ProjectInput Classs
class ProjectInput {
  //My Fields
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    //telling typscript that this element will never be null with !
    this.templateElement = document.querySelector(
      '#project-input'
      //using casting to HTMLTemplateElement
    )! as HTMLTemplateElement;
    this.hostElement = document.querySelector('#app')! as HTMLDivElement;

    //render form
    //giving reference to the template element
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    //get access to different elements and store as properties
    this.titleInputElement = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;
    //attaching the form to the DOM
    this.configure();
    this.attach();
  }

  //PRIVATE METHODS
  //using private methods to keep it isolated to this class
  //using a TUPLE to limit the number of parameters and types
  //return a tuple...first element is the title, second is the description. third is the number of people
  //void means no return value
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    //trimming the whitespace
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert('Please enter valid values');
      return;
    } else {
      //adding + to convert string to number
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  //clear the form of any data
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  //@autobind decorator is used to bind the method to the class
  //Using so I dont have to manual bind the methods to the class
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    //getting the values from the form
    const userInput = this.gatherUserInput();
    //checking if user input is valid with array check since using tuple above
    if (Array.isArray(userInput)) {
      //destructuring the array
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    //configure the form. bind to preconfigured event
    this.element.addEventListener('submit', this.submitHandler);
  }

  //reaching out to the DOM
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}
//recompiling the app.ts here and run it.
const projectInput = new ProjectInput();
