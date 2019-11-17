import {Record} from 'immutable';

type Model<T> = Record<T> & Readonly<T>;
type Person = Model<{ age: number, name: string}>;
type Programmer = Model<{ person: Person, language: string }>;

const personFactory = Record({age: 0, name: ''}, 'person');

const programmerFactory = Record<{ person: Person, language: string }>({
    person: personFactory(),
    language: ''
}, 'programmer');

const milan = personFactory({name: 'Milan', age: 30});
const milanLisper = programmerFactory({ person: milan, language: 'lisp' });

// typesafe
console.log(milan);
console.log(milan.name, milan.age);
console.log(milanLisper);
console.log(milanLisper.person.name, milanLisper.person.age);

// not typesafe
console.log(milanLisper.getIn(['person', 'age']));
// undefined; compiles
console.log(milanLisper.getIn(['person', 'foo']));
// this works
const A = milanLisper.setIn(['person', 'name'], 'Milan Lisper');
// this does nothing; but it compiles
const B = milanLisper.setIn(['person', 'foo'], 'Milan Lisper');
console.log(A);
console.log(B);

// we'd have to define model per entity
type Category = Model<{ title: string, priority: number }>
type Post = Model<{ title: string, content: string, categories: Category[]}>
type AppModel = Model<{
    categories: Category[],
    posts: Post[]
}>

// this'd be nice and typesafe
// const appModel: AppModel = ...;
// appModel.categories.forEach(_ => _.title);

