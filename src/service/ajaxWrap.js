import { http } from './http'

export const fetch= ( { commit, dispatch ,
                               params, method, url,
                               success, error, before, after,
                              } ) => {
  if (before) { before() }
  return http[method]( url, params)
    .then((res) => {
      if (success) {  
        success({ res, commit, dispatch }) }
      if (after) { after() }
    })
    .catch(( err ) => {
      console.log(err)
      if (error) { error({ err, commit, dispatch }) }
      if (after) { after() }
    });
};

