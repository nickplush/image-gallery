import {Observable} from "rxjs";
import {map, startWith, tap} from "rxjs/operators";

export function createHttpObservable(url) {
    return new Observable(observer => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    observer.error("Request failed with status code" + res.status)
                }
            })
            .then(body => {
                observer.next(body)
                observer.complete()
            })
    })
}

export function getImages() {
    return createHttpObservable('https://pixabay.com/api/?key=19954753-72b52f5e511ce09611ec34483&per_page=100')
        .pipe(
            tap(() => console.log('HTTP request executed')),
            map(res => Object.values(res['hits'])),
            startWith([])
        )

}
