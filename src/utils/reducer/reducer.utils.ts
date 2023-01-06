import { AnyAction} from 'redux';



type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
};


// Function declarations, overlaoding, these take in an AC function
export function withMatcher<AC extends () => AnyAction & {type: string}>( actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & {type:string}>(actionCreator: AC): Matchable<AC>;

// implementation of function
export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
       type,
       match(action: AnyAction) {
        return action.type === type;
       } 
    });
};

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}
// you do not want to say payload?: P; and make payload
// optional with TS, make 2 seaprate types

export type Action<T> = {
    type: T;
}


export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P){
  return { type, payload};  
};





// export const createAction = (type, payload) => (
//     {type, payload}
// );

